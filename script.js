
(() => {
  "use strict";

  /* helpers */
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /*PRELOADER*/
  window.addEventListener("load", () => {
    setTimeout(() => {
      const pre = $("#preloader");
      if (pre) pre.classList.add("done");
    }, 1200);
  });

  /*AOS INIT*/
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 750, easing: "ease-out-cubic", once: true, offset: 80 });
    }
  });

  /*SCROLL PROGRESS BAR*/
  window.addEventListener("scroll", () => {
    const el = $("#progressBar");
    if (!el) return;
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    el.style.width = (scrolled / max * 100) + "%";
  });

  /*NAVBAR*/
  const navbar = $("#navbar");
  const sections = $$("section[id]");

  window.addEventListener("scroll", () => {
    /* shrink */
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);

    /* back-to-top */
    const btn = $("#backToTop");
    if (btn) btn.classList.toggle("show", window.scrollY > 500);

    /* active nav link */
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    $$(".nav-link").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });

  /*BACK TO TOP*/
  document.addEventListener("click", e => {
    if (e.target.closest("#backToTop")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  /*HAMBURGER (mobile)*/
  const hamburger = $("#hamburger");
  const mobileMenu = $("#mainMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });
  }

  /* close mobile menu when a link is tapped */
  $$(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (hamburger) hamburger.classList.remove("open");
      if (mobileMenu) mobileMenu.classList.remove("open");
    });
  });

  /*SMOOTH SCROLL*/
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = $(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /*LIGHTBOX*/
  const lightbox = $("#lightbox");
  const lbImg    = $("#lightboxImg");
  const lbTitle  = $("#lightboxTitle");

  document.addEventListener("click", e => {
    /* open */
    const trigBtn = e.target.closest(".lightbox-btn");
    if (trigBtn && lightbox && lbImg && lbTitle) {
      lbImg.src   = trigBtn.dataset.src;
      lbTitle.textContent = trigBtn.dataset.title || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      return;
    }
    /* close*/
    if (lightbox && lightbox.classList.contains("open")) {
      if (e.target === lightbox || e.target.closest(".lightbox-close")) {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
      }
    }
  });
  /* close lightbox with ESC */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  /*TOAST HELPER*/
  function showToast(msg) {
    const toast = $("#toast");
    const msgEl = $("#toastMsg");
    if (!toast || !msgEl) return;
    msgEl.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /*COLLECTION FILTER*/
  const filterBtns = $$(".filter-btn");
  const cards      = $$(".card[data-category]");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const show = cat === "all" || card.dataset.category === cat;
        card.style.display = show ? "" : "none";
        if (show) {
          card.classList.remove("aos-animate");
          void card.offsetWidth; /* reflow */
          card.classList.add("aos-animate");
        }
      });
    });
  });

  /*toast feedback*/
  document.addEventListener("click", e => {
    const orderBtn = e.target.closest(".order-btn");
    if (orderBtn) {
      const title = orderBtn.dataset.title || "Item";
      showToast("✨  " + title + " — we'll be in touch soon!");
    }
  });

  /*LIVE SEARCH*/
  const searchInput = $("#searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (!q || text.includes(q)) ? "" : "none";
      });
      /* scroll to collection */
      if (q) {
        const sec = $("#salescollection");
        if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /*BOOKING FORM + EMAIL*/
  const form = $("#bookingForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name  = $("#formName")?.value.trim();
      const email = $("#formEmail")?.value.trim();
      const msg   = $("#formMessage")?.value.trim();

      if (!name || !email || !msg) {
        showToast("⚠️  Please fill all fields.");
        return;
      }

      // EmailJS configuration
      const SERVICE_ID = "YOUR_SERVICE_ID";      
      const TEMPLATE_ID = "YOUR_TEMPLATE_ID";    
      const PUBLIC_KEY = "YOUR_PUBLIC_KEY";      

      // Show loading toast
      showToast("📤  Sending message...");

      // Send email using EmailJS
      emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        message: msg,
        to_name: "Craft Gallery Team",
      }, PUBLIC_KEY)
      .then(() => {
        showToast("✅  Message sent! We'll reply soon, " + name + ".");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showToast("❌  Failed to send. Please try again.");
      });
    });
  }

})();