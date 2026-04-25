"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "DISCOVERY & STRATEGY",
    description: "We dive deep into your brand's DNA, identifying cultural triggers and market gaps to build a bulletproof roadmap.",
    icon: "◎"
  },
  {
    number: "02",
    title: "CREATIVE IDEATION",
    description: "Where data meets storytelling. We craft concepts that don't just look good, but move the needle and spark conversation.",
    icon: "◇"
  },
  {
    number: "03",
    title: "PRODUCTION & CRAFT",
    description: "Execution with technical precision. High-fidelity visuals, seamless code, and cinematic production values.",
    icon: "△"
  },
  {
    number: "04",
    title: "DEPLOYMENT & SCALE",
    description: "Launching into the wild with strategic distribution to ensure your message hits with maximum impact and scalability.",
    icon: "▽"
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".process-card");
      
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: i * 0.1,
        });
      });

      // Animate the vertical line
      gsap.from(".process-line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-black px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-white/20"></div>
        <div className="absolute top-0 right-6 md:right-12 w-[1px] h-full bg-white/20"></div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10" ref={containerRef}>
        <div className="mb-20 md:mb-32">
          <span className="font-mono text-[#EAB308] text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
            HOW WE OPERATE
          </span>
          <h2 className="font-bebas text-[clamp(60px,10vw,150px)] leading-[0.85] text-[#F2E8D9] uppercase">
            OUR <span className="text-[#0d5b45]">PROCESS</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Background Animated Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 z-0 -translate-y-1/2 overflow-hidden">
            <div className="process-line w-full h-full bg-[#0d5b45] origin-left"></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="process-card group relative flex flex-col items-start">
              {/* Technical Indicator */}
              <div className="relative mb-8 w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border border-white/10 group-hover:border-[#0d5b45] transition-colors duration-500"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#EAB308]"></div>
                <span className="font-mono text-2xl text-white/20 group-hover:text-[#0d5b45] transition-colors duration-500">
                  {step.icon}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-3">
                  <span className="font-mono text-[#0d5b45] text-sm">{step.number}</span>
                  <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-wide group-hover:text-[#F2E8D9] transition-colors">
                    {step.title}
                  </h3>
                </div>
                <p className="font-dm text-white/40 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors duration-500 max-w-[280px]">
                  {step.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-4 bg-[#0d5b45]/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
