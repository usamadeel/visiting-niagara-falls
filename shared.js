/* ============================================================
   shared.js — Visiting Niagara Falls
   Injects shared navbar & footer, then runs all shared behaviours.
   Include on EVERY page:  <script src="/js/shared.js"></script>
   Place ONE empty placeholder div in your HTML:
     <div id="shared-navbar"></div>   ← before page content
     <div id="shared-footer"></div>   ← after page content
============================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. FETCH & INJECT PARTIALS
  ------------------------------------------------------------------ */
  function injectPartial(elementId, url, callback) {
    const el = document.getElementById(elementId);
    if (!el) return;
    fetch(url)
      .then(r => r.text())
      .then(html => {
        el.outerHTML = html;
        if (callback) callback();
      })
      .catch(() => {
        // Fallback: partials not found (e.g. direct file:// open)
        // Silently skip — page still works, just without injected partial
      });
  }

  /* Resolve the root-relative path to partials regardless of page depth */
  function rootPath(path) {
    // Count depth of current page from root
    const parts = window.location.pathname.split('/').filter(Boolean);
    const depth = parts.length > 0 && parts[parts.length - 1].includes('.') ? parts.length - 1 : parts.length;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return prefix + path;
  }

  /* ------------------------------------------------------------------
     2. NAVBAR BEHAVIOURS (navbar scroll, hamburger, active link)
  ------------------------------------------------------------------ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Scroll shrink
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Mobile hamburger
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    function openMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.add('open');
      mobileMenu.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      hamburger && hamburger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
      setTimeout(() => { mobileMenu.style.display = ''; }, 350);
    }

    hamburger  && hamburger.addEventListener('click', openMenu);
    mobileClose && mobileClose.addEventListener('click', closeMenu);
    mobileMenu  && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    mobileMenu  && mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });

    // Mark active nav link
    const path = window.location.pathname;
    document.querySelectorAll('#navbar .nav-links a, #mobileMenu a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.split('#')[0];
      if (linkPath && linkPath !== '/' && path.startsWith(linkPath)) {
        link.classList.add('active');
      } else if (linkPath === '/' && path === '/') {
        link.classList.add('active');
      }
    });
  }

  /* ------------------------------------------------------------------
     3. SCROLL TO TOP BUTTON
  ------------------------------------------------------------------ */
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ------------------------------------------------------------------
     4. REVEAL ON SCROLL
  ------------------------------------------------------------------ */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.revealDelay || 0, 10);
          setTimeout(() => e.target.classList.add('revealed'), delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }

  /* ------------------------------------------------------------------
     5. COUNTER ANIMATION
  ------------------------------------------------------------------ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseFloat(e.target.dataset.count);
          const suffix = e.target.dataset.suffix || '';
          let current = 0;
          const step   = target / 60;
          const iv = setInterval(() => {
            current = Math.min(current + step, target);
            e.target.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
            if (current >= target) clearInterval(iv);
          }, 25);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }

  /* ------------------------------------------------------------------
     6. FAQ ACCORDION
  ------------------------------------------------------------------ */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item   = q.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ------------------------------------------------------------------
     7. SEARCH TABS (homepage hero)
  ------------------------------------------------------------------ */
  function initSearchTabs() {
    document.querySelectorAll('.search-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.search-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      });
    });
  }

  /* ------------------------------------------------------------------
     8. TOUR FILTER BUTTONS (homepage tours section)
  ------------------------------------------------------------------ */
  function initTourFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  /* ------------------------------------------------------------------
     9. WISHLIST TOGGLE
  ------------------------------------------------------------------ */
  function initWishlist() {
    document.querySelectorAll('.tour-card-wishlist').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const active = btn.dataset.active === 'true';
        btn.dataset.active = String(!active);
        btn.textContent = active ? '🤍' : '❤️';
      });
    });
  }

  /* ------------------------------------------------------------------
     10. REVIEW BAR ANIMATION (homepage reviews)
  ------------------------------------------------------------------ */
  function initReviewBars() {
    const bars = document.querySelectorAll('.review-bar-fill');
    if (!bars.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => { e.target.style.width = e.target.dataset.width || '0%'; }, 200);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => { b.style.width = '0%'; obs.observe(b); });
  }

  /* ------------------------------------------------------------------
     11. NEWSLETTER FORM
  ------------------------------------------------------------------ */
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.nl-btn');
      const orig = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.cssText = 'background:#2E7D32;color:#fff;';
      setTimeout(() => { btn.textContent = orig; btn.style.cssText = ''; form.reset(); }, 3000);
    });
  }

  /* ------------------------------------------------------------------
     12. HERO PARTICLES
  ------------------------------------------------------------------ */
  function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('span');
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 14) + 's';
      p.style.animationDelay    = (Math.random() * 12) + 's';
      p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
      container.appendChild(p);
    }
  }

  /* ------------------------------------------------------------------
     BOOT — run after DOM is ready
  ------------------------------------------------------------------ */
  function boot() {
    initNavbar();
    initScrollTop();
    initReveal();
    initCounters();
    initFAQ();
    initSearchTabs();
    initTourFilter();
    initWishlist();
    initReviewBars();
    initNewsletter();
    initParticles();
  }

  /* Inject partials then boot, OR boot directly if no placeholders */
  const hasNavPlaceholder    = !!document.getElementById('shared-navbar');
  const hasFooterPlaceholder = !!document.getElementById('shared-footer');

  if (hasNavPlaceholder || hasFooterPlaceholder) {
    const navUrl    = rootPath('navbar.html');
    const footerUrl = rootPath('footer.html');
    let pending = 0;
    if (hasNavPlaceholder)    pending++;
    if (hasFooterPlaceholder) pending++;

    function onDone() { if (--pending === 0) boot(); }
    if (hasNavPlaceholder)    injectPartial('shared-navbar', navUrl, onDone);
    if (hasFooterPlaceholder) injectPartial('shared-footer', footerUrl, onDone);
  } else {
    // Navbar/footer already in HTML (legacy pages) — just boot
    boot();
  }

})();
