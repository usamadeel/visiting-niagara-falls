/* ============================================================
   blog.js — Visiting Niagara Falls
   Blog page functionality: filtering, search, pagination, newsletter
============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    /* Blog Category Filtering */
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const sidebarCategories = document.querySelectorAll('.sidebar-category');
    const blogSearch = document.getElementById('blogSearch');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterBlog(btn.dataset.category);
      });
    });

    sidebarCategories.forEach(category => {
      category.addEventListener('click', () => {
        const filter = category.dataset.filter;
        filterBtns.forEach(b => {
          b.classList.remove('active');
          if (b.dataset.category === filter) {
            b.classList.add('active');
          }
        });
        filterBlog(filter);
      });
    });

    function filterBlog(category) {
      blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          setTimeout(() => card.classList.add('revealed'), 10);
        } else {
          card.style.display = 'none';
          card.classList.remove('revealed');
        }
      });
    }

    /* Blog Search */
    if (blogSearch) {
      blogSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        blogCards.forEach(card => {
          const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
          const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
          const matches = title.includes(searchTerm) || excerpt.includes(searchTerm);
          card.style.display = matches ? '' : 'none';
        });
      });
    }

    /* Pagination */
    const paginationBtns = document.querySelectorAll('.pagination-num');
    const paginationNavBtns = document.querySelectorAll('.pagination-btn');

    paginationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        paginationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    paginationNavBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const activePage = document.querySelector('.pagination-num.active');
        const currentPage = parseInt(activePage.textContent);
        let nextPage = currentPage;

        if (e.target.textContent.includes('Prev')) {
          nextPage = Math.max(1, currentPage - 1);
        } else if (e.target.textContent.includes('Next')) {
          nextPage = currentPage + 1;
        }

        if (nextPage !== currentPage) {
          paginationBtns.forEach(b => b.classList.remove('active'));
          paginationBtns.forEach(b => {
            if (b.textContent === nextPage.toString()) b.classList.add('active');
          });
        }
      });
    });

    /* Sidebar Newsletter Form */
    const sidebarForm = document.getElementById('sidebarNewsletter');
    if (sidebarForm) {
      sidebarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = sidebarForm.querySelector('button');
        const orig = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.cssText = 'background:#2E7D32;color:#fff;';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.cssText = '';
          sidebarForm.reset();
        }, 3000);
      });
    }

    /* Initialize Navbar & Scroll */
    initNavbar();
    initScrollTop();
  });

  /* Navbar Behaviours */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

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

  /* Scroll to Top Button */
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

})();
