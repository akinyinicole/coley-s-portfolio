// Interactive mouse parallax movement for background elements
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  // Move glowing gradient orbs
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, index) => {
    const factor = (index + 1) * 15;
    shape.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
  });

  // Tilt and float SVG dolls
  const dolls = document.querySelectorAll('.doll');
  dolls.forEach((doll, index) => {
    const factor = (index + 1) * 8;
    doll.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px) rotate(${mouseX * 10}deg)`;
  });
});