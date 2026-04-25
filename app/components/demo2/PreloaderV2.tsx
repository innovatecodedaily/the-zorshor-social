"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function PreloaderV2({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    let isPaused = false;
    const milestones = [37, 67];

    const updateProgress = () => {
      if (isPaused) return;

      // Ensure we hit milestones exactly
      let nextMilestone = milestones[0] || 100;
      let step = Math.floor(Math.random() * 4) + 1;
      
      if (currentProgress + step >= nextMilestone && milestones.length > 0) {
        currentProgress = nextMilestone;
        setProgress(currentProgress);
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          milestones.shift();
          updateProgress();
        }, 900);
        return;
      }

      currentProgress = Math.min(100, currentProgress + step);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        const nextTick = Math.floor(Math.random() * 36) + 45;
        setTimeout(updateProgress, nextTick);
      }
    };

    const initialTimeout = setTimeout(updateProgress, 500);
    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => onComplete()
      });

      // Smooth Cross-fade to Brand Colors
      tl.to(".pre-panel", {
        backgroundColor: (i, target) => target.getAttribute('data-color'),
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.inOut"
      }, 0);

      // Staggered Panel Exit
      tl.to(".pre-panel", {
        yPercent: -100,
        duration: 1.5,
        stagger: {
          each: 0.1,
          from: "random"
        },
        ease: "expo.inOut"
      }, 0.3);

      // Counter Fade
      tl.to(".pre-counter", {
        opacity: 0,
        y: -100,
        duration: 0.8,
        ease: "power4.in"
      }, 0);

      // Background Fade
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "none"
      }, "-=0.3");
    }
  }, [progress, onComplete]);

  const getStatusText = (prog: number) => {
    if (prog < 37) return "CRAFTING BRAND STORIES";
    if (prog < 67) return "DEVELOPING SOCIAL ECOSYSTEMS";
    return "PRODUCING CINEMATIC IMPACT";
  };

  const brandColors = [
    '#0d5b45', // Forest Green
    '#EAB308', // Yellow
    '#C8102E', // Red
    '#F2E8D9', // Cream
    '#080808', // Black
    '#0d5b45', // Forest Green
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 z-[2000] overflow-hidden flex flex-col items-center justify-center bg-[#080808]">
      {/* Background Panels */}
      <div className="absolute inset-0 flex">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="pre-panel relative flex-1 border-r border-white/5 origin-top h-full"
            style={{ backgroundColor: "#080808" }}
            data-color={brandColors[i]}
          >
            {/* Dark Atmospheric Flicker */}
            <div className="absolute inset-0 bg-black animate-pulse opacity-[0.02]"></div>
          </div>
        ))}
      </div>

      {/* Central Content Area */}
      <div className="pre-counter relative z-[2100] flex flex-col items-center select-none w-full max-w-[1440px]">
        {/* Logo Integration (Centered & Prominent) */}
        <div className="mb-12 md:mb-16">
          <img 
            src="/zorshor-logo.png" 
            alt="ZORSHOR Logo" 
            className="w-48 md:w-80 object-contain opacity-90" 
          />
        </div>

        {/* Hero Status Text */}
        <div className="relative w-full px-8 text-center flex flex-col items-center justify-center min-h-[12rem] md:min-h-[16rem]">
          <span 
            key={getStatusText(progress)} 
            className="font-mono text-2xl md:text-5xl lg:text-6xl text-white font-bold tracking-[0.05em] md:tracking-[0.1em] uppercase leading-tight text-balance animate-fade-in"
          >
            {getStatusText(progress)}
          </span>
          
          {/* Minimalist Tech Bar (Wide & Precise) */}
          <div className="mt-16 md:mt-20 w-full max-w-[300px] md:max-w-[600px] h-[2px] bg-white/5 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-white/20 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
            {/* Active Highlight Tracer */}
            <div 
              className="absolute top-0 right-0 h-full w-20 bg-white blur-md transition-all duration-300"
              style={{ left: `calc(${progress}% - 80px)` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Atmospheric Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[2200]"></div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}
