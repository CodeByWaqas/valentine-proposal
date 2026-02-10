import { useEffect } from "react";

const EMOJIS = ["✨", "🎉", "🥳", "💫", "🎊", "⭐", "🌟", "💥"];

const SparkleEmojis = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const emoji = document.createElement("span");
      emoji.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      emoji.style.position = "fixed";
      emoji.style.left = `${Math.random() * 90 + 5}%`;
      emoji.style.top = `${Math.random() * 90 + 5}%`;
      emoji.style.fontSize = `${Math.random() * 30 + 20}px`;
      emoji.style.pointerEvents = "none";
      emoji.style.zIndex = "50";
      emoji.style.transition = "all 1s ease-out";
      emoji.style.opacity = "1";
      document.body.appendChild(emoji);

      requestAnimationFrame(() => {
        emoji.style.transform = `scale(1.8) translateY(-20px)`;
        emoji.style.opacity = "0";
      });

      setTimeout(() => emoji.remove(), 1100);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SparkleEmojis;
