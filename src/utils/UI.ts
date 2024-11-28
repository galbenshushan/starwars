export const createStar = () => {
  const starsContainer = document.querySelector(".stars-container");
  if (starsContainer) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 4 + 2;
    const speed = Math.random() * 2 + 3;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;
    const directionX = (Math.random() - 0.5) * 4000;
    const directionY = (Math.random() - 0.5) * 4000;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${centerX + offsetX}px`;
    star.style.top = `${centerY + offsetY}px`;
    star.style.animationDuration = `${speed}s`;
    star.style.setProperty("--random-x", `${directionX}px`);
    star.style.setProperty("--random-y", `${directionY}px`);
    star.style.boxShadow = `
        0 0 15px rgba(255, 255, 255, 1),
        0 0 30px rgba(255, 255, 255, 0.8),
        0 0 50px rgba(255, 255, 255, 0.5)
      `;
    starsContainer.appendChild(star);

    star.addEventListener("animationend", () => {
      star.remove();
    });
  }
};

setInterval(() => {
  for (let i = 0; i < 5; i++) {
    createStar();
  }
}, 100);
