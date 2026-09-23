// Reveal each project block as it scrolls into view.
const projects = document.querySelectorAll(".project");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.2 }
);

projects.forEach((project) => observer.observe(project));

// Generate floating glitter sparkles across the page with matching neon theme colors.
const glitterContainer = document.querySelector(".glitter");
const SPARKLE_COUNT = 35;
const sparkleColors = ["#ffffff", "#FF5376", "#B066FE"];

for (let i = 0; i < SPARKLE_COUNT; i++) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";

  const size = 3 + Math.random() * 5; // 3px–8px
  const left = Math.random() * 100; // vw
  const floatDuration = 6 + Math.random() * 8; // seconds
  const twinkleDuration = 1.5 + Math.random() * 2.5;
  const delay = Math.random() * 10;
  const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${left}vw`;
  sparkle.style.bottom = `-10px`;
  sparkle.style.background = color;
  sparkle.style.boxShadow = `0 0 6px 2px ${color}, 0 0 12px 4px ${color}`;
  sparkle.style.animationDuration = `${floatDuration}s, ${twinkleDuration}s`;
  sparkle.style.animationDelay = `${delay}s, ${delay}s`;

  glitterContainer.appendChild(sparkle);
}