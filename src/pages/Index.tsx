import { useState, useRef, useCallback, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CursorHearts from "@/components/CursorHearts";
import ClickHeartBurst from "@/components/ClickHeartBurst";
import Confetti from "@/components/Confetti";
import SparkleEmojis from "@/components/SparkleEmojis";

const FUNNY_TEXTS = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again! 🤔",
  "Pls? 🥺",
  "Don't do this 😢",
  "I'll be sad 😭",
  "You're breaking my heart!",
  "I'll cry! 💔",
  "Fine... just kidding!",
  "Noooo! 😩",
  "😭😭😭",
  "I'm not giving up!",
  "PLEASE 🙏",
  "Last chance!",
];

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noText, setNoText] = useState("No");
  const [escapeCount, setEscapeCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  const [isEscaped, setIsEscaped] = useState(false);
  const [shaking, setShaking] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    const btn = noBtnRef.current;
    if (!btn) return;

    setIsEscaped(true);

    const padding = 20;
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    const newCount = escapeCount + 1;
    setEscapeCount(newCount);
    setNoText(
      newCount < FUNNY_TEXTS.length
        ? FUNNY_TEXTS[newCount]
        : FUNNY_TEXTS[Math.floor(Math.random() * FUNNY_TEXTS.length)]
    );

    // Shrink no button, grow yes button
    const shrink = Math.max(0.5, 1 - newCount * 0.04);
    setNoStyle({
      position: "fixed",
      left: `${randomX}px`,
      top: `${randomY}px`,
      zIndex: 50,
      transform: `scale(${shrink})`,
    });
    setYesScale(Math.min(2.2, 1 + newCount * 0.08));

    // Screen shake
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
  }, [escapeCount]);

  // Dancing bear frames
  const [bearFrame, setBearFrame] = useState(0);
  const bearFrames = ["🧸", "🐻", "🧸", "🐻"];
  useEffect(() => {
    if (!accepted) return;
    const interval = setInterval(() => {
      setBearFrame((f) => (f + 1) % bearFrames.length);
    }, 400);
    return () => clearInterval(interval);
  }, [accepted]);

  if (accepted) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-valentine-gradient select-none">
        <FloatingHearts />
        <CursorHearts />
        <ClickHeartBurst />
        <Confetti />
        <SparkleEmojis />

        <div className="z-10 text-center animate-bounce-in">
          <div
            className="text-[120px] sm:text-[150px] leading-none animate-heartbeat"
            aria-hidden
          >
            ❤️
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-valentine-red drop-shadow-lg font-serif animate-bounce-in-delay">
            Yaaay! I knew it! 🥰
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-valentine-dark font-serif">
            You just made me the happiest person ever!
          </p>
          <p className="mt-6 text-3xl sm:text-4xl font-serif animate-pulse-slow">
            💕 Happy Valentine's Day! 💕
          </p>
          {/* Dancing bear */}
          <div className="mt-6 text-7xl animate-wiggle" aria-hidden>
            {bearFrames[bearFrame]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-valentine-gradient select-none ${shaking ? "animate-shake" : ""}`}
    >
      <FloatingHearts />
      <CursorHearts />
      <ClickHeartBurst />

      <div className="z-10 text-center">
        <div className="text-[80px] sm:text-[100px] leading-none animate-bounce-bear" aria-hidden>
          🧸
        </div>
        <h1 className="mt-2 text-3xl sm:text-[2.8rem] font-bold text-valentine-red drop-shadow-lg font-serif animate-pulse-heading leading-tight">
          Will you be my Valentine? 💘
        </h1>

        <div className="mt-10 flex gap-8 items-center justify-center min-h-[80px]">
          <button
            onClick={() => setAccepted(true)}
            className="px-10 sm:px-14 py-4 sm:py-5 text-xl sm:text-2xl font-bold text-white rounded-full bg-gradient-to-br from-valentine-pink to-valentine-red shadow-valentine cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-valentine-lg font-serif tracking-wide animate-glow"
            style={{ transform: `scale(${yesScale})` }}
          >
            Yes! 💖
          </button>

          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            onClick={moveNoButton}
            className="px-10 sm:px-14 py-4 sm:py-5 text-xl sm:text-2xl font-bold text-white rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg cursor-pointer font-serif tracking-wide transition-transform duration-150"
            style={isEscaped ? noStyle : undefined}
          >
            {noText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
