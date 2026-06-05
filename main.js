/* ============================================================
   T.F.M. Construct BV — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Hamburger / Mobile menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Nav scroll ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---------- IntersectionObserver for .reveal / .reveal-r ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-r');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Hide sticky CTA when #contact is in viewport ---------- */
  var stickyCta = document.querySelector('.sticky-cta');
  var contactSection = document.querySelector('#contact');
  if (stickyCta && contactSection) {
    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        stickyCta.classList.toggle('hidden', entry.isIntersecting);
      });
    }, { threshold: 0.2 });
    ctaObserver.observe(contactSection);
  }

  /* ---------- Smooth scroll for anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navH = nav ? nav.offsetHeight : 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navH - 8;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- WhatsApp tracking ---------- */
  var waBtn = document.querySelector('.wa-float');
  if (waBtn) {
    waBtn.addEventListener('click', function () {
      console.log('[TFM] WhatsApp button clicked');
    });
  }

  /* ---------- Contact form ---------- */
  var forms = document.querySelectorAll('.contact-form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Verstuurd ✓';
        btn.disabled = true;
        btn.style.background = '#28a745';
        btn.style.color = '#fff';
      }
    });
  });

  /* ---------- Map tooltip ---------- */
  var provinces = document.querySelectorAll('.province');
  var tooltip = document.querySelector('.map-tooltip');
  if (tooltip) {
    provinces.forEach(function (prov) {
      prov.addEventListener('mouseenter', function (e) {
        tooltip.textContent = (prov.dataset.name || '') + ' — Wij zijn hier actief';
        tooltip.style.opacity = '1';
      });
      prov.addEventListener('mousemove', function (e) {
        tooltip.style.left = (e.pageX + 12) + 'px';
        tooltip.style.top = (e.pageY - 32) + 'px';
      });
      prov.addEventListener('mouseleave', function () {
        tooltip.style.opacity = '0';
      });
    });
  }

})();
