import { useEffect } from "react";

const TRAIL_HEARTS = ["💗", "💕", "❤️", "🩷"];

const CursorHearts = () => {
  useEffect(() => {
    let throttle = false;

    const handleMove = (e: MouseEvent) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => (throttle = false), 60);

      const heart = document.createElement("span");
      heart.textContent = TRAIL_HEARTS[Math.floor(Math.random() * TRAIL_HEARTS.length)];
      heart.style.position = "fixed";
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.fontSize = `${Math.random() * 12 + 10}px`;
      heart.style.transition = "all 0.8s ease-out";
      heart.style.opacity = "1";
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translateY(-${40 + Math.random() * 30}px) translateX(${(Math.random() - 0.5) * 40}px) scale(0.3)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => heart.remove(), 900);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
};

export default CursorHearts;
