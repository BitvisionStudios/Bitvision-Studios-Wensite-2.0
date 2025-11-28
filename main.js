document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js wurde geladen ✅");

  // Jahr im Footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Navigation
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Slider-Logik für alle slider-container
  document.querySelectorAll(".slider-container").forEach((slider) => {
    const images = slider.querySelectorAll(".slide-img");
    const prevBtn = slider.querySelector(".btn-prev");
    const nextBtn = slider.querySelector(".btn-next");
    const zoomBtn = slider.querySelector(".btn-zoom");

    if (!images.length) return;
    let currentIndex = 0;

    function updateSlide(index) {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide(currentIndex);
      });
    }

    if (zoomBtn) {
      zoomBtn.addEventListener("click", () => {
        const activeImg = slider.querySelector(".slide-img.active");
        const modalOverlay = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-image-element");
        if (modalOverlay && modalImg && activeImg) {
          modalImg.src = activeImg.src;
          modalOverlay.classList.add("active");
        }
      });
    }
  });

  // Modals (Impressum, Datenschutz, AGB, Bildmodal)
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  function closeAllModals() {
    modalOverlays.forEach((overlay) => {
      overlay.classList.remove("active");
    });
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-open-modal");
      const overlay = document.getElementById(targetId);
      if (overlay) {
        overlay.classList.add("active");
      }
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeAllModals();
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Demo-Kontaktformular (noch ohne Backend)
  const contactForm = document.querySelector(".kontakt-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Vielen Dank für Ihre Nachricht! Dieses Formular ist aktuell ein Demo und muss noch mit einem Mail-Backend verbunden werden."
      );
      contactForm.reset();
    });
  }

  // Cookie-Banner / Consent
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");
  const STORAGE_KEY = "bitvision_cookie_consent"; // "accepted" / "declined"

  console.log("Cookie-Banner Elemente:", { banner, acceptBtn, declineBtn });

  if (banner && acceptBtn && declineBtn) {
    const existingConsent = localStorage.getItem(STORAGE_KEY);
    console.log("Vorhandener Consent:", existingConsent);

    // Nur anzeigen, wenn noch keine Entscheidung getroffen wurde
    if (!existingConsent) {
      banner.classList.add("show");
      banner.setAttribute("aria-hidden", "false");
      console.log("Cookie-Banner angezeigt.");
    } else {
      banner.classList.remove("show");
      banner.setAttribute("aria-hidden", "true");
      console.log("Cookie-Banner versteckt, Consent schon vorhanden.");
    }

    function setConsent(value) {
      localStorage.setItem(STORAGE_KEY, value);
      banner.classList.remove("show");
      banner.setAttribute("aria-hidden", "true");
      console.log("Consent gesetzt auf:", value);

      // optional: nach Schließen nach oben scrollen
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    acceptBtn.addEventListener("click", () => {
      setConsent("accepted");
      // hier später z.B. Analytics nur nach Zustimmung laden
    });

    declineBtn.addEventListener("click", () => {
      setConsent("declined");
    });
  } else {
    console.warn("Cookie-Banner-Elemente nicht gefunden.");
  }
});
