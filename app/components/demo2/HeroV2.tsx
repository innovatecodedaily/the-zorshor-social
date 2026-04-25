"use client";

import React, { useEffect, useRef } from "react";
import TypewriterV2 from "./TypewriterV2";

export default function HeroV2({ shouldAnimate }: { shouldAnimate: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* CINEMATIC TYPEWRITER HEADER */}
      <div className="absolute top-[10vh] md:top-24 left-6 md:left-12 right-4 z-50 pointer-events-none">
        <div className="font-bebas font-bold leading-[1.05] tracking-normal whitespace-pre overflow-visible drop-shadow-lg" style={{ fontSize: "clamp(35px, 6.6vw, 106px)" }}>
          <TypewriterV2
            prefix="We build "
            words={["Brand Stories", "Brand Loyalty", "Brand Impact"]}
            shouldAnimate={shouldAnimate}
            className="text-[#F2E8D9]"
          />
        </div>
      </div>

      {/* Immersive Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
      </div>

      {/* BRAND COLOR PERIMETER FRAME */}
      <div className="absolute inset-0 border-[2px] md:border-[5px] border-[#0d5b45] z-20 pointer-events-none opacity-40"></div>

      {/* FULL BORDER LAYOUT - ENHANCED TRACER */}
      <div className="absolute inset-1 md:inset-2 z-30 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Static Base Border */}
          <path
            d="M 0,0 L 100,0 L 100,100 L 0,100 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.05"
            className="opacity-10"
          />
          {/* Animated Tracer */}
          <path
            d="M 0,0 L 100,0 L 100,100 L 0,100 Z"
            fill="none"
            stroke="#0d5b45"
            strokeWidth="0.3"
            strokeDasharray="15 85"
            className="v2-tracer-path opacity-90"
          />
        </svg>
      </div>

      {/* BOTTOM CONTENT AREA */}
      <div className="absolute bottom-16 left-8 md:bottom-24 md:left-12 z-50 text-left max-w-5xl">
        <h2 className="font-dm text-white text-4xl md:text-5xl leading-[1.1] tracking-tight uppercase mb-6">
          Zorshor® <br />
          <span className="text-white/40 italic">Digital-first</span> Content <br />
          Agency* <span className="text-white/60 text-xl md:text-3xl align-top ml-2">©2026</span>
        </h2>

        {/* EXPLORE MORE BUTTON (Relocated) */}
        <button
          onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
          className="group relative px-6 py-3 overflow-hidden bg-white border border-white transition-all duration-500 hover:bg-transparent"
        >
          <span className="relative z-10 font-mono text-black group-hover:text-white text-sm tracking-[0.4em] uppercase transition-colors">
            EXPLORE WORK
          </span>
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-white text-sm tracking-[0.4em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
            EXPLORE WORK
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes tracer-move {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .v2-tracer-path {
          animation: tracer-move 6s linear infinite;
        }
      `}</style>
    </section>
  );
}
