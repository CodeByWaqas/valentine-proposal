import { useEffect, useRef } from "react";

const HEARTS = ["❤️", "💕", "💗", "💖", "💘", "🩷", "💝"];

const FloatingHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const heart = document.createElement("span");
      heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      heart.style.position = "absolute";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${Math.random() * 20 + 14}px`;
      heart.style.opacity = "0";
      heart.style.pointerEvents = "none";
      heart.style.animation = `floatUp ${Math.random() * 6 + 6}s linear ${Math.random() * 10}s infinite`;
      container.appendChild(heart);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default FloatingHearts;
