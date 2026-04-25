"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import RecordingFrame from "./RecordingFrame";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelARef = useRef<HTMLDivElement>(null);
  const panelBRef = useRef<HTMLDivElement>(null);
  const panelCRef = useRef<HTMLDivElement>(null);
  const panelDRef = useRef<HTMLDivElement>(null);

  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide preloader entirely
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    // Fade in text one by one
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 30, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "start"
    );
    tl.fromTo(text1Ref.current,
      { opacity: 0, y: 30, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "start+=0.4"
    );
    tl.fromTo(text2Ref.current,
      { opacity: 0, y: 30, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "start+=0.8"
    );

    // Fade out all text before curtain
    tl.to([logoRef.current, text1Ref.current, text2Ref.current], {
      opacity: 0,
      y: -40,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.in"
    }, "start+=2.6");

    // Step 3: Multi-Color Curtain Wipe (3.4s onwards)
    tl.to(panelARef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "start+=3.4");

    tl.to(panelBRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "start+=3.55"); // Cream

    tl.to(panelCRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "start+=3.7"); // Yellow

    tl.to(panelDRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, "start+=3.85"); // Red

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none select-none">
      {/* Panel D (Red - bottom layer) */}
      <div
        ref={panelDRef}
        className="absolute inset-0 w-full h-[100vh] bg-[#C8102E]"
      ></div>

      {/* Panel C (Yellow) */}
      <div
        ref={panelCRef}
        className="absolute inset-0 w-full h-[100vh] bg-[#EAB308]"
      ></div>

      {/* Panel B (Cream) */}
      <div
        ref={panelBRef}
        className="absolute inset-0 w-full h-[100vh] bg-[#F2E8D9]"
      ></div>

      {/* Panel A (Black - topmost overlay) */}
      <div
        ref={panelARef}
        className="absolute inset-0 w-full h-[100vh] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Solid Black Background */}
        <div className="absolute inset-0 bg-black z-0"></div>

        {/* Recording Frame UI */}
        <div className="absolute top-[48px] md:top-[80px] left-6 md:left-12 right-6 md:right-12 bottom-8 md:bottom-12 z-0 overflow-hidden flex items-center justify-center">
          <RecordingFrame />
        </div>

        <div className="flex flex-col items-center justify-center z-10 relative h-full w-full">
          {/* Logo */}
          <div ref={logoRef} className="mb-4 opacity-0">
            <img src="/zorshor-logo.png" alt="ZORSHOR Logo" className="w-80 md:w-[480px] object-contain" />
          </div>

          {/* Text Box with Borders and Yellow Squares */}
          <div className="relative py-4 px-6 md:py-6 md:px-10 flex flex-col items-center justify-center space-y-[-0.2em]">

            {/* Double Horizontal Lines (constrained to vertical edges) */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-0"></div>
            <div className="absolute top-[10px] left-0 right-0 h-[1px] bg-white/10 z-0"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20 z-0"></div>
            <div className="absolute bottom-[10px] left-0 right-0 h-[1px] bg-white/10 z-0"></div>

            {/* Double Vertical Lines (fading out sharply) */}
            {/* Left Pair */}
            <div className="absolute top-[-100vh] bottom-[-100vh] left-0 w-[1px] bg-[linear-gradient(to_bottom,transparent_30%,rgba(255,255,255,0.2)_50%,transparent_70%)] pointer-events-none z-0"></div>
            <div className="absolute top-[-100vh] bottom-[-100vh] left-[10px] w-[1px] bg-[linear-gradient(to_bottom,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)] pointer-events-none z-0"></div>

            {/* Right Pair */}
            <div className="absolute top-[-100vh] bottom-[-100vh] right-0 w-[1px] bg-[linear-gradient(to_bottom,transparent_30%,rgba(255,255,255,0.2)_50%,transparent_70%)] pointer-events-none z-0"></div>
            <div className="absolute top-[-100vh] bottom-[-100vh] right-[10px] w-[1px] bg-[linear-gradient(to_bottom,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)] pointer-events-none z-0"></div>

            {/* Yellow corner squares */}
            <div className="absolute -top-[5px] -left-[5px] w-[11px] h-[11px] bg-[#EAB308] z-10"></div>
            <div className="absolute -top-[5px] -right-[5px] w-[11px] h-[11px] bg-[#EAB308] z-10"></div>
            <div className="absolute -bottom-[5px] -left-[5px] w-[11px] h-[11px] bg-[#EAB308] z-10"></div>
            <div className="absolute -bottom-[5px] -right-[5px] w-[11px] h-[11px] bg-[#EAB308] z-10"></div>

            <h1
              ref={text1Ref}
              className="font-bebas text-[#F2E8D9] m-0 leading-none uppercase text-center relative z-10"
              style={{ fontSize: "clamp(60px, 10vw, 136px)" }}
            >
              BUILDING
            </h1>
            <h1
              ref={text2Ref}
              className="font-bebas text-[#F2E8D9] m-0 leading-none uppercase text-center relative z-10"
              style={{ fontSize: "clamp(60px, 10vw, 136px)", opacity: 0 }}
            >
              CREATIVE TRUST
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
