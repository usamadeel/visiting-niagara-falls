/* ============================================================
   blog.js — Visiting Niagara Falls
   Blog page functionality: filtering, search, infinite scroll, newsletter
============================================================ */

(function () {
  'use strict';

  /* ---- Additional posts data ---- */
  const MORE_POSTS = [
    {
      category: 'travel-tips',
      tag: 'Travel Tips',
      color: '1e40af',
      text: 'Packing+Tips',
      alt: 'Packing for Niagara Falls',
      date: 'Feb 28, 2025',
      title: 'What to Pack for Niagara Falls: The Ultimate Checklist',
      excerpt: 'From waterproof gear to comfortable walking shoes, here is everything you need to pack to make your Niagara Falls trip comfortable and memorable.',
      avatar: '👩',
      author: 'Sarah Mitchell',
      read: '6 min read',
    },
    {
      category: 'guide',
      tag: 'Guide',
      color: '0369a1',
      text: 'Budget+Guide',
      alt: 'Budget guide for Niagara Falls',
      date: 'Feb 24, 2025',
      title: 'Niagara Falls on a Budget: How to Visit Without Breaking the Bank',
      excerpt: 'Enjoy all the magic of Niagara Falls without emptying your wallet. Our budget guide covers free attractions, affordable dining, and money-saving tips.',
      avatar: '👨',
      author: 'James Chen',
      read: '9 min read',
    },
    {
      category: 'attraction',
      tag: 'Attractions',
      color: '7c3aed',
      text: 'Skylon+Tower',
      alt: 'Skylon Tower Niagara Falls',
      date: 'Feb 20, 2025',
      title: 'Skylon Tower: The Best Views of Niagara Falls from Above',
      excerpt: 'Soar above the mist and take in panoramic views of both the American and Horseshoe Falls from Skylon Tower\'s revolving dining room and observation deck.',
      avatar: '🧑',
      author: 'Emma Rodriguez',
      read: '5 min read',
      badge: true,
    },
    {
      category: 'food',
      tag: 'Food & Dining',
      color: 'd97706',
      text: 'Best+Restaurants',
      alt: 'Best restaurants near Niagara Falls',
      date: 'Feb 16, 2025',
      title: 'Top 10 Restaurants Near Niagara Falls for Every Budget',
      excerpt: 'From romantic waterfront dining to casual family eateries, explore the best restaurants near Niagara Falls on both the US and Canadian sides.',
      avatar: '👩',
      author: 'Maria Santos',
      read: '8 min read',
    },
    {
      category: 'visitor-story',
      tag: 'Visitor Story',
      color: '06b6d4',
      text: 'Honeymoon+Trip',
      alt: 'Honeymoon at Niagara Falls',
      date: 'Feb 12, 2025',
      title: 'Our Niagara Falls Honeymoon: A Love Story in the Mist',
      excerpt: 'How we planned the perfect romantic getaway to Niagara Falls, from surprise reservations at the Skylon to a magical evening watching the illuminated falls.',
      avatar: '💑',
      author: 'Priya & Raj Sharma',
      read: '7 min read',
    },
    {
      category: 'travel-tips',
      tag: 'Travel Tips',
      color: '059669',
      text: 'Photography+Tips',
      alt: 'Photography tips at Niagara Falls',
      date: 'Feb 8, 2025',
      title: 'How to Photograph Niagara Falls: Pro Tips for Stunning Shots',
      excerpt: 'Master the art of waterfall photography with our expert guide covering the best angles, golden hour timing, and camera settings for breathtaking Niagara photos.',
      avatar: '👨',
      author: 'David Park',
      read: '11 min read',
    },
    {
      category: 'guide',
      tag: 'Guide',
      color: '0369a1',
      text: 'Kids+Guide',
      alt: 'Niagara Falls with kids',
      date: 'Feb 4, 2025',
      title: 'Niagara Falls with Kids: The Family-Friendly Activity Guide',
      excerpt: 'Planning a family trip to Niagara Falls? Discover the best kid-friendly attractions, safe spots to view the falls, and tips to keep everyone happy.',
      avatar: '👩',
      author: 'Lisa Thompson',
      read: '9 min read',
    },
    {
      category: 'attraction',
      tag: 'Attractions',
      color: '7c3aed',
      text: 'Journey+Behind',
      alt: 'Journey Behind the Falls',
      date: 'Jan 30, 2025',
      title: 'Journey Behind the Falls: An Underground Niagara Experience',
      excerpt: 'Step inside the rock and experience the thunderous power of Horseshoe Falls from tunnels carved directly behind the curtain of water — a truly unforgettable adventure.',
      avatar: '🧑',
      author: 'Emma Rodriguez',
      read: '6 min read',
      badge: true,
    },
    {
      category: 'food',
      tag: 'Food & Dining',
      color: 'd97706',
      text: 'Wine+Country',
      alt: 'Niagara wine country',
      date: 'Jan 26, 2025',
      title: 'Niagara Wine Country: A Guide to the Region\'s Best Wineries',
      excerpt: 'Just minutes from the falls lies one of Canada\'s finest wine regions. Explore award-winning wineries, ice wine tastings, and vineyard tours in Niagara-on-the-Lake.',
      avatar: '👩',
      author: 'Maria Santos',
      read: '10 min read',
    },
    {
      category: 'visitor-story',
      tag: 'Visitor Story',
      color: '06b6d4',
      text: 'Solo+Adventure',
      alt: 'Solo travel at Niagara Falls',
      date: 'Jan 22, 2025',
      title: 'Solo at Niagara: What I Discovered Traveling Alone to the Falls',
      excerpt: 'I was nervous about going solo, but Niagara Falls turned out to be one of the most welcoming destinations I\'ve ever visited. Here\'s my honest story.',
      avatar: '🧳',
      author: 'Alex Rivera',
      read: '8 min read',
    },
    {
      category: 'travel-tips',
      tag: 'Travel Tips',
      color: '1e40af',
      text: 'Border+Crossing',
      alt: 'US Canada border crossing tips',
      date: 'Jan 18, 2025',
      title: 'Crossing the Border at Niagara Falls: Everything You Need to Know',
      excerpt: 'Navigating the US-Canada border at Niagara Falls can be confusing. Our step-by-step guide covers documents, wait times, duty-free rules, and insider tips.',
      avatar: '👨',
      author: 'James Chen',
      read: '7 min read',
    },
    {
      category: 'guide',
      tag: 'Guide',
      color: '0369a1',
      text: 'Winter+Guide',
      alt: 'Niagara Falls in winter',
      date: 'Jan 14, 2025',
      title: 'Niagara Falls in Winter: A Magical Frozen Wonderland',
      excerpt: 'Few sights rival Niagara Falls in winter, when ice formations and frozen mist transform the landscape into a breathtaking wonderland. Here\'s how to visit safely.',
      avatar: '👩',
      author: 'Sarah Mitchell',
      read: '8 min read',
    },
  ];

  /* ---- Build card HTML from data object ---- */
  function createCard(post) {
    const imgSrc = `https://via.placeholder.com/400x240/${post.color}/ffffff?text=${post.text}`;
    const badge = post.badge
      ? `<span class="blog-card-guide-badge">Complete Attraction Guide 2025</span>`
      : '';
    return `<article class="blog-card blog-card--new" data-category="${post.category}">
  <div class="blog-card-img">
    <img src="${imgSrc}" alt="${post.alt}" loading="lazy">
    <span class="blog-card-tag">${post.tag}</span>
  </div>
  <div class="blog-card-body">
    ${badge}
    <time class="blog-card-date">${post.date}</time>
    <h2 class="blog-card-title"><a href="#">${post.title}</a></h2>
    <p class="blog-card-excerpt">${post.excerpt}</p>
    <div class="blog-card-meta">
      <span class="blog-card-author">
        <div class="blog-card-author-avatar">${post.avatar}</div>
        <span>${post.author}</span>
      </span>
      <span>${post.read}</span>
    </div>
  </div>
</article>`;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const filterBtns       = document.querySelectorAll('.blog-filter-btn');
    const sidebarCategories = document.querySelectorAll('.sidebar-category');
    const blogSearch       = document.getElementById('blogSearch');
    const blogGrid         = document.querySelector('.blog-grid');
    const sentinel         = document.getElementById('blog-sentinel');
    const loadIndicator    = document.getElementById('blog-load-indicator');

    /* ---- Helpers: always re-query live DOM ---- */
    function getCards() {
      return document.querySelectorAll('.blog-card');
    }
    function activeCategory() {
      const active = document.querySelector('.blog-filter-btn.active');
      return active ? active.dataset.category : 'all';
    }

    /* ---- Category Filtering ---- */
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
          if (b.dataset.category === filter) b.classList.add('active');
        });
        filterBlog(filter);
      });
    });

    function filterBlog(category) {
      getCards().forEach(card => {
        const show = category === 'all' || card.dataset.category === category;
        card.style.display = show ? '' : 'none';
        if (show) setTimeout(() => card.classList.add('revealed'), 10);
        else card.classList.remove('revealed');
      });
    }

    /* ---- Search ---- */
    if (blogSearch) {
      blogSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        getCards().forEach(card => {
          const title   = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
          const excerpt = card.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';
          card.style.display = title.includes(term) || excerpt.includes(term) ? '' : 'none';
        });
      });
    }

    /* ---- Infinite Scroll ---- */
    let postIndex  = 0;
    let loading    = false;
    let allLoaded  = false;

    function loadMorePosts() {
      if (loading || allLoaded || !blogGrid) return;
      loading = true;
      loadIndicator && loadIndicator.classList.add('active');

      setTimeout(() => {
        const batch = MORE_POSTS.slice(postIndex, postIndex + 4);
        postIndex += batch.length;

        batch.forEach(post => {
          const html = createCard(post);
          const temp = document.createElement('div');
          temp.innerHTML = html;
          const card = temp.firstElementChild;
          blogGrid.appendChild(card);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => card.classList.add('revealed', 'fade-in-up'));
          });
        });

        loading = false;

        if (postIndex >= MORE_POSTS.length) {
          allLoaded = true;
          if (loadIndicator) {
            loadIndicator.innerHTML = '<p class="blog-load-end">You\'ve reached the end — <a href="/Tours.html">book a tour</a> to start your adventure!</p>';
            loadIndicator.classList.add('active', 'done');
          }
          observer.disconnect();
        } else {
          loadIndicator && loadIndicator.classList.remove('active');
        }

        /* Re-apply active filter to newly added cards */
        const cat = activeCategory();
        if (cat !== 'all') {
          batch.forEach(post => {
            if (post.category !== cat) {
              const cards = blogGrid.querySelectorAll('.blog-card--new');
              cards.forEach(c => {
                if (c.dataset.category !== cat) c.style.display = 'none';
              });
            }
          });
        }
      }, 800);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMorePosts();
    }, { rootMargin: '200px' });

    if (sentinel) observer.observe(sentinel);

    /* ---- Sidebar Newsletter Form ---- */
    const sidebarForm = document.getElementById('sidebarNewsletter');
    if (sidebarForm) {
      sidebarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn  = sidebarForm.querySelector('button');
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

    initNavbar();
    initScrollTop();
  });

  /* ---- Navbar Behaviours ---- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');
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
      const href     = link.getAttribute('href') || '';
      const linkPath = href.split('#')[0];
      if (linkPath && linkPath !== '/' && path.startsWith(linkPath)) {
        link.classList.add('active');
      } else if (linkPath === '/' && path === '/') {
        link.classList.add('active');
      }
    });
  }

  /* ---- Scroll to Top Button ---- */
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

})();
