"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);
  const [fadeComplete, setFadeComplete] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem("hasSeenSplash", "true");

      const timer1 = setTimeout(() => {
        setFadeComplete(true);
      }, 2500);

      const timer2 = setTimeout(() => {
        setShowSplash(false);
      }, 3300); // 2500 + 800ms fade duration

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0B2240] flex flex-col justify-center items-center transition-opacity duration-800 ease-in-out ${
        fadeComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center animate-in fade-in zoom-in-90 duration-1000 fill-mode-forwards">
        <img src="/logo.png" alt="Rotary Logo" className="h-24 w-24 md:h-32 md:w-32 animate-fade-in mb-8" />
        <p className="text-white text-lg md:text-2xl font-semibold tracking-widest text-center px-6 opacity-0 animate-[fadeIn_1s_ease-in-out_0.5s_forwards]">
          Rotary International &mdash; Connected Globally, Impacting Locally.
        </p>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
