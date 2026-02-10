import { useEffect } from "react";

const BURST_HEARTS = ["❤️", "💕", "💖", "💗", "🩷", "💘", "✨", "💝"];

const ClickHeartBurst = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        const heart = document.createElement("span");
        heart.textContent = BURST_HEARTS[Math.floor(Math.random() * BURST_HEARTS.length)];
        heart.style.position = "fixed";
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999";
        heart.style.fontSize = `${Math.random() * 14 + 12}px`;
        heart.style.transition = "all 0.7s cubic-bezier(.25,.46,.45,.94)";
        heart.style.opacity = "1";
        document.body.appendChild(heart);

        const angle = (Math.PI * 2 * i) / 8;
        const dist = 40 + Math.random() * 50;

        requestAnimationFrame(() => {
          heart.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0.2)`;
          heart.style.opacity = "0";
        });

        setTimeout(() => heart.remove(), 800);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
};

export default ClickHeartBurst;
