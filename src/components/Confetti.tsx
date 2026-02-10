import { useEffect } from "react";

const COLORS = ["#e91e63", "#f44336", "#ff5722", "#ff9800", "#ffeb3b", "#4caf50", "#2196f3", "#9c27b0"];

const Confetti = () => {
  useEffect(() => {
    for (let i = 0; i < 120; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.top = "-10px";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        confetti.style.zIndex = "100";
        confetti.style.pointerEvents = "none";
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4500);
      }, i * 25);
    }
  }, []);

  return null;
};

export default Confetti;
