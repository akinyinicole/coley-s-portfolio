/* ==========================================================================
   1. MOUSE PARALLAX — background shapes & floating dolls
   ========================================================================== */
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  document.querySelectorAll('.shape').forEach((shape, index) => {
    const factor = (index + 1) * 15;
    shape.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
  });

  document.querySelectorAll('.doll').forEach((doll, index) => {
    const factor = (index + 1) * 8;
    doll.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px) rotate(${mouseX * 10}deg)`;
  });
});

/* ==========================================================================
   2. SMOOTH SCROLLING FOR ANCHOR LINKS
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', link.getAttribute('href'));
  });
});

/* ==========================================================================
   3. SCROLL REVEAL — fade / slide sections in as they enter the viewport
   ========================================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  revealObserver.observe(el);
});

/* ==========================================================================
   4. ANIMATED SKILL BARS
   ========================================================================== */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const level = entry.target.dataset.level;
      entry.target.style.width = `${level}%`;
      barObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.bar__fill').forEach((fill) => barObserver.observe(fill));

/* ==========================================================================
   5. TYPING EFFECT — hero tagline
   ========================================================================== */
const typedEl = document.getElementById('typed');
const phrases = [
  'I build web and mobile applications.',
  'Hackathon platforms that solve real problems.',
  'Skincare routines, one ingredient at a time.',
  'Clean, reliable software — with care.',
];

if (typedEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = phrases[phraseIndex];
    typedEl.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(type, 45);
    } else if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 22);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 350);
    }
  };

  type();
} else if (typedEl) {
  typedEl.textContent = phrases[0];
}

/* ==========================================================================
   6. SCROLL PROGRESS BAR + ACTIVE NAV LINK
   ========================================================================== */
const progressBar = document.getElementById('progressBar');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav__links a')];

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (progressBar) progressBar.style.width = `${ratio * 100}%`;

  const fromTop = window.scrollY + window.innerHeight / 3;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= fromTop) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ==========================================================================
   7. TILT ON HOVER — project cards lean toward the cursor
   ========================================================================== */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
