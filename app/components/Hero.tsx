"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Typewriter } from "./Typewriter";
import MenuOverlay from "./MenuOverlay";
import Navbar from "./Navbar";

interface HeroProps {
  shouldAnimate: boolean;
}

const DesktopBottomContent = ({ onScroll }: { onScroll: () => void }) => (
  <div className="hidden md:block">
    {/* Bottom Left Button */}
    <div className="absolute bottom-12 left-12 z-20">
      <button
        onClick={onScroll}
        className="hero-bottom-anim opacity-0 bg-[#C8102E] text-white px-8 py-4 font-dm font-bold text-lg tracking-wider hover:bg-red-700 transition rounded-none"
      >
        EXPLORE OUR ECOSYSTEM
      </button>
    </div>

    {/* Bottom Right Text */}
    <div className="absolute bottom-12 right-12 z-20 w-auto max-w-4xl flex flex-col items-end text-right">
      <div className="font-dm text-[#F2E8D9] text-[24px] space-y-8 flex flex-col items-end text-right">
        <p className="hero-bottom-anim opacity-0 leading-snug">
          <strong className="font-bold text-white uppercase">OWLED</strong> blends <strong className="font-bold text-white">AI-powered strategy,</strong> human storytelling, and unmatched scale to
          create work that breaks through the noise across marketing campaigns,<br /> films, social media marketing, influencer marketing and digital IPs.
        </p>
        <p className="hero-bottom-anim opacity-0 leading-snug">
          If you want work that moves culture, not just metrics, <br /> you've come to the right place.
        </p>
      </div>
    </div>
  </div>
);

const MobileBottomContent = ({ onScroll }: { onScroll: () => void }) => (
  <div className="md:hidden absolute bottom-24 right-6 z-20 flex flex-col items-end text-right w-[86vw]">
    <button
      onClick={onScroll}
      className="hero-bottom-anim opacity-0 bg-[#C8102E] text-white px-6 py-3 font-dm font-bold text-sm tracking-wider mb-6 hover:bg-red-700 transition rounded-none"
    >
      EXPLORE OUR ECOSYSTEM
    </button>

    <div className="font-dm text-[#F2E8D9] text-[15.5px] space-y-4 flex flex-col items-end text-right">
      <p className="hero-bottom-anim opacity-0 leading-snug">
        <strong className="font-bold text-white">ZORSHOR</strong> blends <strong className="font-bold text-white">strategy, storytelling,</strong> and <strong className="font-bold text-white">scale</strong> to create work that <br /> breaks through the noise-across films, social, and digital IPs.
      </p>
      <p className="hero-bottom-anim opacity-0 leading-snug">
        If you want work that moves culture, <br /> not just metrics, you've come <br /> to the right place.
      </p>
    </div>
  </div>
);

export default function Hero({ shouldAnimate }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const weRef = useRef<HTMLDivElement>(null);

  const [startTyping, setStartTyping] = useState(false);

  const scrollToNext = () => {
    const nextSection = document.getElementById("what-we-build");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!shouldAnimate) return;

    const revealTl = gsap.timeline();

    revealTl.fromTo(videoRef.current, {
      scale: 1.05,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, 0);

    revealTl.fromTo(headerRef.current, {
      y: 20, opacity: 0
    }, {
      y: 0, opacity: 1, duration: 1, ease: "power2.out"
    }, 0.2);

    revealTl.fromTo(weRef.current, {
      y: 30, opacity: 0
    }, {
      y: 0, opacity: 1, duration: 1, ease: "power2.out"
    }, 0.5);

    revealTl.call(() => {
      setStartTyping(true);
    }, [], 0.5);

    const bottomElements = gsap.utils.toArray(".hero-bottom-anim");
    revealTl.fromTo(bottomElements, {
      y: 30, opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.4,
      ease: "power2.out"
    }, 1.5);

    return () => {
      revealTl.kill();
    };
  }, [shouldAnimate]);

  const words = [
    "WE OPERATE ON\nOVERDRIVE",
    "WE THINK IN\nINSIGHT"
  ];

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen w-full bg-transparent flex flex-col"
      >
        {/* Background Video (Fixed for cinematic merge) */}
        <div className="fixed inset-0 z-[-10] pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-0"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Main Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Bottom Fade to Merge with Next Section */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#080808] to-transparent z-[6] pointer-events-none"></div>

        {/* Grid Lines */}
        <div className="absolute top-[60px] left-0 w-full h-[1px] bg-white/10 z-10 pointer-events-none"></div>
        <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-white/10 z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-6 md:right-12 w-[1px] h-full bg-white/10 z-10 pointer-events-none"></div>

        <Navbar ref={headerRef} shouldAnimate={shouldAnimate} />

        {/* Hero Content - Inline WE + Typewriter */}
        <div ref={weRef} className="absolute top-[10vh] md:top-24 left-6 md:left-12 right-4 z-10 flex flex-col items-start opacity-0">
          <div className="font-bebas font-bold text-[#F2E8D9] leading-[1.05] uppercase tracking-normal whitespace-pre overflow-visible drop-shadow-lg min-h-[2.1em] flex flex-col items-start justify-start" style={{ fontSize: "clamp(66px, 12vw, 165px)" }}>
            <Typewriter
              words={words}
              speed={80}
              delayBetweenWords={2000}
              cursorChar="."
              startTyping={startTyping}
              deleteLimit={3}
            />
          </div>
        </div>

        {/* Split Content: Separate logic for Desktop vs Mobile */}
        <DesktopBottomContent onScroll={scrollToNext} />
        <MobileBottomContent onScroll={scrollToNext} />
      </section>
    </>
  );
}
