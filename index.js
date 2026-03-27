/* ===== AI in a Box — Interactive JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar scroll effect ────────────────────────────────
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ─── Mobile nav toggle ───────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ─── Scroll reveal (Intersection Observer) ──────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── (ROI section is now a static snapshot — no JS needed) ──

  // ─── FAQ Accordion ──────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ─── Contact Form Validation ────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = (fieldId) => {
    document.getElementById(fieldId).classList.add('error');
  };

  const clearErrors = () => {
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    const name = document.getElementById('inputName').value.trim();
    const company = document.getElementById('inputCompany').value.trim();
    const email = document.getElementById('inputEmail').value.trim();

    if (!name) { showError('fieldName'); valid = false; }
    if (!company) { showError('fieldCompany'); valid = false; }
    if (!email || !validateEmail(email)) { showError('fieldEmail'); valid = false; }

    if (valid) {
      // Simulate form submission
      contactForm.style.display = 'none';
      formSuccess.classList.add('visible');
    }
  });

  // ─── Smooth scroll for anchor links (fallback) ──────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
