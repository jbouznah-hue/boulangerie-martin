import './style.css';

/* ============================================
   BOULANGERIE MARTIN - Interactions & Animations
   ============================================ */

// --- Scroll Reveal ---
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));
}

// --- Navigation scroll behavior ---
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
      lastScroll = scrollY;
    },
    { passive: true }
  );

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-active');
    links.classList.toggle('is-open');
    document.body.style.overflow = links.classList.contains('is-open')
      ? 'hidden'
      : '';
  });

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle.classList.remove('is-active');
      links.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

// --- Smooth scroll for anchor links ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// --- Floating particles (flour dust) ---
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 12 : 25;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * -10;
    const dx = (Math.random() - 0.5) * 80;
    const dy = (Math.random() - 0.5) * 80;

    particle.style.cssText = `
      --size: ${size}px;
      --duration: ${duration}s;
      --delay: ${delay}s;
      --dx: ${dx}px;
      --dy: ${dy}px;
      left: ${x}%;
      top: ${y}%;
    `;

    container.appendChild(particle);
  }
}

// --- Subtle card tilt on hover ---
function initCardTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        translateY(-8px)
        perspective(800px)
        rotateY(${x * 6}deg)
        rotateX(${-y * 6}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// --- Parallax on hero ---
function initParallax() {
  const heroContent = document.querySelector('.hero__content');
  const heroScroll = document.querySelector('.hero__scroll');

  if (!heroContent) return;

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
        heroContent.style.opacity = 1 - progress * 1.2;

        if (heroScroll) {
          heroScroll.style.opacity = 1 - progress * 3;
        }
      }
    },
    { passive: true }
  );
}

// --- Timeline line animation ---
function initTimelineAnimation() {
  const line = document.querySelector('.timeline__line');
  if (!line) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          line.style.transition = 'height 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.height = '100%';
        }
      });
    },
    { threshold: 0.1 }
  );

  line.style.height = '0%';
  observer.observe(line.parentElement);
}

// --- Init all ---
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNav();
  initSmoothScroll();
  initParticles();
  initCardTilt();
  initParallax();
  initTimelineAnimation();
});
