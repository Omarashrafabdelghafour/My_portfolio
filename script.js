/**
 * Omar Ashraf — Interactive Portfolio Logic
 * Featuring: Typewriter effect, Project Filters, Interactive Phone Mockup,
 * Dynamic Project Lightbox Modal, Metric Counters, and Clipboard utils.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Typewriter Effect
  const typewriterElement = document.getElementById("typewriter-text");
  const titles = [
    "Mobile App Developer (Frontend & UI/UX)",
    "Data Analyst (Power BI & KPI Dashboards)",
    "Data Scientist (TensorFlow & Machine Learning)",
    "Full-Stack Software Engineer"
  ];
  
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeWriter() {
    if (!typewriterElement) return;

    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 1800; // Pause at end of sentence
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400; // Brief pause before typing next
    }

    setTimeout(typeWriter, typingSpeed);
  }
  typeWriter();

  // 2. Navbar Scroll Behavior
  const navbar = document.querySelector(".navbar-custom");
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }
  });

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 3. Project Filter System
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item-col");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // 4. Interactive Phone Screen Switcher (Tal2a Showcase)
  const phoneScreen = document.getElementById("activePhoneScreen");
  const phoneTabs = document.querySelectorAll(".phone-tab-btn");

  phoneTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      phoneTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const targetImgSrc = tab.getAttribute("data-screen-src");
      if (phoneScreen && targetImgSrc) {
        phoneScreen.style.opacity = "0.2";
        setTimeout(() => {
          phoneScreen.src = targetImgSrc;
          phoneScreen.style.opacity = "1";
        }, 180);
      }
    });
  });

  // 5. Dynamic Project Lightbox Modal
  const previewModal = new bootstrap.Modal(document.getElementById("projectPreviewModal"));
  const modalImg = document.getElementById("modalProjectImg");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalCategory = document.getElementById("modalProjectCategory");
  const modalDesc = document.getElementById("modalProjectDesc");
  const modalHighlights = document.getElementById("modalProjectHighlights");
  const modalTags = document.getElementById("modalProjectTags");

  document.querySelectorAll(".open-project-modal").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const parentCard = trigger.closest(".project-card");
      if (!parentCard) return;

      const title = parentCard.dataset.title || "Project Overview";
      const category = parentCard.dataset.categoryLabel || "Featured Project";
      const categoryClass = parentCard.dataset.categoryClass || "badge-mobile";
      const imgSrc = parentCard.dataset.img || "";
      const desc = parentCard.dataset.desc || "";
      const highlights = JSON.parse(parentCard.dataset.highlights || "[]");
      const tags = JSON.parse(parentCard.dataset.tags || "[]");

      if (modalImg) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) {
        modalCategory.textContent = category;
        modalCategory.className = `project-category-badge ${categoryClass}`;
      }
      if (modalDesc) modalDesc.textContent = desc;

      if (modalHighlights) {
        modalHighlights.innerHTML = highlights
          .map(item => `<li><i class="fa-solid fa-check text-primary me-2"></i> ${item}</li>`)
          .join("");
      }

      if (modalTags) {
        modalTags.innerHTML = tags
          .map(tag => `<span class="project-tech-tag">${tag}</span>`)
          .join("");
      }

      // Reset zoom whenever modal opens
      resetModalZoom();

      previewModal.show();
    });
  });

  // Modal Zoom Functionality
  let currentZoom = 1;
  const zoomInBtn = document.getElementById("modalZoomIn");
  const zoomOutBtn = document.getElementById("modalZoomOut");
  const zoomResetBtn = document.getElementById("modalZoomReset");

  function applyZoom() {
    if (modalImg) {
      modalImg.style.transform = `scale(${currentZoom})`;
      modalImg.style.cursor = currentZoom > 1 ? "grab" : "default";
    }
  }

  function resetModalZoom() {
    currentZoom = 1;
    applyZoom();
  }

  zoomInBtn?.addEventListener("click", () => {
    if (currentZoom < 2.5) {
      currentZoom = Math.min(2.5, currentZoom + 0.3);
      applyZoom();
    }
  });

  zoomOutBtn?.addEventListener("click", () => {
    if (currentZoom > 0.8) {
      currentZoom = Math.max(0.8, currentZoom - 0.3);
      applyZoom();
    }
  });

  zoomResetBtn?.addEventListener("click", resetModalZoom);

  // Dynamic Cursor Spotlight
  const spotlight = document.getElementById("cursorSpotlight");
  if (spotlight && window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }

  // 6. Interactive Toast Notification & Clipboard Copy
  const toast = document.getElementById("toastNotice");
  const toastMsg = document.getElementById("toastMessage");

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  document.querySelectorAll(".copy-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const copyVal = btn.getAttribute("data-copy");
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Copied to clipboard: ${copyVal}`);
        }).catch(() => {
          showToast(`Copied: ${copyVal}`);
        });
      }
    });
  });

  // 7. Animated Metric Counter on Scroll
  const metricValues = document.querySelectorAll(".metric-number");
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        metricValues.forEach(el => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const suffix = el.getAttribute("data-suffix") || "";
          let current = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = Math.ceil(target / steps);

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById("metrics");
  if (metricsSection) {
    countObserver.observe(metricsSection);
  }
});
