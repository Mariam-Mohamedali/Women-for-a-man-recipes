
(function () {
  'use strict';

  const SLIDES = [
    {
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=900&fit=crop',
      label: 'Middle Eastern Cuisine'
    },
    {
      url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1400&h=900&fit=crop',
      label: 'Fresh Flavours'
    },
    {
      url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1400&h=900&fit=crop',
      label: 'Made With Love'
    }
  ];

  const SLIDE_DURATION = 5500;
  const TRANSITION_MS = 1200;

  let current = 0;
  let timer = null;
  let progTimer = null;
  let isPaused = false;

  let section, originalImg, heroWrap, slideEls, dotsEl, dotEls,
    progressEl, heroText;

  function init() {
    section = document.querySelector('section:first-of-type');
    originalImg = section.querySelector('img');
    if (!section || !originalImg) return;

    buildDOM();
    preloadImages();
    goTo(0, true);
    startAuto();
    bindEvents();
    initScrollReveal();
    initParallax();
  }

  function buildDOM() {
    heroWrap = document.createElement('div');
    heroWrap.className = 'hero-wrap';

    slideEls = SLIDES.map(function (s, i) {
      const el = document.createElement('div');
      el.className = 'hero-slide';
      el.style.backgroundImage = 'url(' + s.url + ')';
      el.dataset.index = i;
      heroWrap.appendChild(el);
      return el;
    });

    const existingH2 = section.querySelector('h2');
    const existingPs = section.querySelectorAll('p');

    heroText = document.createElement('div');
    heroText.className = 'hero-text';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'hero-eyebrow';
    eyebrow.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>';
    eyebrow.appendChild(document.createTextNode(' Middle Eastern Cuisine'));

    const h2 = document.createElement('h2');
    h2.textContent = existingH2 ? existingH2.textContent : 'Welcome to Women For A Man';

    heroText.appendChild(eyebrow);
    heroText.appendChild(h2);

    existingPs.forEach(function (p) {
      const clone = document.createElement('p');
      clone.innerHTML = p.innerHTML;
      heroText.appendChild(clone);
    });

    heroWrap.appendChild(heroText);

    /* 4 — navigation dots */
    dotsEl = document.createElement('div');
    dotsEl.className = 'hero-dots';
    dotEls = SLIDES.map(function (_, i) {
      const btn = document.createElement('button');
      btn.className = 'hero-dot';
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.addEventListener('click', function () {
        stopAuto();
        goTo(i);
        startAuto();
      });
      dotsEl.appendChild(btn);
      return btn;
    });
    heroWrap.appendChild(dotsEl);

    /* 5 — progress bar */
    progressEl = document.createElement('div');
    progressEl.className = 'hero-progress';
    heroWrap.appendChild(progressEl);


    /* 7 — replace original img with wrap; hide original text nodes */
    section.insertBefore(heroWrap, section.firstChild);
    originalImg.style.display = 'none';
    section.querySelectorAll('br').forEach(function (el) { el.style.display = 'none'; });
    if (existingH2) existingH2.style.display = 'none';
    existingPs.forEach(function (p) { p.style.display = 'none'; });
  }

  function goTo(index, instant) {
    const prev = current;
    current = (index + SLIDES.length) % SLIDES.length;

    /* Update slides */
    slideEls.forEach(function (el, i) {
      el.classList.toggle('active', i === current);
    });

    /* Update dots */
    dotEls.forEach(function (el, i) {
      el.classList.toggle('active', i === current);
    });

    /* Animate text in */
    heroText.classList.remove('revealed');
    void heroText.offsetWidth; /* reflow */
    setTimeout(function () {
      heroText.classList.add('revealed');
    }, instant ? 100 : TRANSITION_MS * 0.4);

    /* Update eyebrow label */
    const eyebrow = heroText.querySelector('.hero-eyebrow');
    if (eyebrow) {
      eyebrow.lastChild.textContent = ' ' + SLIDES[current].label;
    }

    startProgress();
  }

  function startProgress() {
    clearInterval(progTimer);
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';
    void progressEl.offsetWidth;
    progressEl.style.transition = 'width ' + SLIDE_DURATION + 'ms linear';
    progressEl.style.width = '100%';
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(function () {
      if (!isPaused) goTo(current + 1);
    }, SLIDE_DURATION);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  function bindEvents() {
    /* Pause on hover */
    heroWrap.addEventListener('mouseenter', function () { isPaused = true; });
    heroWrap.addEventListener('mouseleave', function () { isPaused = false; });

    /* Touch swipe */
    let touchX = 0;
    heroWrap.addEventListener('touchstart', function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    heroWrap.addEventListener('touchend', function (e) {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        stopAuto();
        goTo(current + (diff > 0 ? 1 : -1));
        startAuto();
      }
    }, { passive: true });

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
      if (e.key === 'ArrowLeft') { stopAuto(); goTo(current - 1); startAuto(); }
    });
  }

  function preloadImages() {
    SLIDES.forEach(function (s) {
      const img = new Image();
      img.src = s.url;
    });
  }

  function initParallax() {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight) return;
      const shift = scrollY * 0.28;
      slideEls.forEach(function (el) {
        el.style.transform = el.classList.contains('active')
          ? 'scale(1.0) translateY(' + shift + 'px)'
          : 'scale(1.06) translateY(' + shift + 'px)';
      });
      /* Fade hero text on scroll */
      const fade = Math.max(0, 1 - scrollY / 320);
      heroText.style.opacity = fade;
      heroText.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
    }, { passive: true });
  }

  function initScrollReveal() {
    const items = document.querySelectorAll('.why-join-section ul li');
    if (!items.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.20 });

    items.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
