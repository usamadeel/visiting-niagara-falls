/**
 * Layout Loader - Dynamically loads and injects shared header/navbar and footer
 * This ensures all pages have consistent header and footer without duplication
 */

(function() {
  'use strict';

  // Configuration
  const PATHS = {
    navbar: '/navbar.html',
    footer: '/footer.html'
  };

  const PLACEHOLDERS = {
    navbar: 'navbar-placeholder',
    footer: 'footer-placeholder'
  };

  /**
   * Load HTML file and return as text
   */
  async function loadHTML(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
      return await response.text();
    } catch (error) {
      console.error('Layout Loader Error:', error);
      return '';
    }
  }

  /**
   * Insert HTML into placeholder and initialize scripts
   */
  function insertHTML(elementId, html) {
    const placeholder = document.getElementById(elementId);
    if (placeholder) {
      placeholder.innerHTML = html;
    }
  }

  /**
   * Initialize shared functionality after loading
   */
  function initializeSharedScripts() {
    // Initialize navbar
    if (typeof initNavbar === 'function') {
      initNavbar();
    }

    // Initialize scroll to top button
    if (typeof initScrollTop === 'function') {
      initScrollTop();
    }

    // Initialize hamburger menu if it exists
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    if (hamburger && mobileMenu && mobileClose) {
      hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      });

      mobileClose.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });

      // Close menu when a link is clicked
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /**
   * Load all layout components
   */
  async function loadLayout() {
    const navbarHTML = await loadHTML(PATHS.navbar);
    const footerHTML = await loadHTML(PATHS.footer);

    insertHTML(PLACEHOLDERS.navbar, navbarHTML);
    insertHTML(PLACEHOLDERS.footer, footerHTML);

    // Initialize after all components are loaded
    setTimeout(initializeSharedScripts, 100);
  }

  // Load layout when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLayout);
  } else {
    loadLayout();
  }
})();
