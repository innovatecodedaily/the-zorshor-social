"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => setIsClosing(false), 800);
    }, 400);
  };

  useEffect(() => {
    if (!overlayRef.current || !menuItemsRef.current || !bottomRef.current) return;

    if (!tlRef.current) {
      tlRef.current = gsap.timeline({ paused: true });

      // Animate overlay background (curtain reveal from top)
      tlRef.current.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" }
      );

      // Animate brand underline
      tlRef.current.fromTo(
        ".brand-underline",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // Animate menu links
      const links = gsap.utils.toArray(".menu-link", menuItemsRef.current);
      tlRef.current.fromTo(
        links,
        { y: "130%" },
        { y: "0%", duration: 0.6, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );

      // Animate bottom footer items
      const bottomLinks = gsap.utils.toArray(".menu-bottom-link", bottomRef.current);
      tlRef.current.fromTo(
        bottomLinks,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (isOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      tlRef.current.play();
    } else {
      tlRef.current.reverse().then(() => {
        if (!isOpen && overlayRef.current) {
          gsap.set(overlayRef.current, { display: "none" });
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#00FF00] flex flex-col justify-between"
      style={{ display: "none" }}
    >
      {/* Top Header / Close Button */}
      <div className="w-full h-[48px] md:h-[80px] px-6 pt-4 md:px-12 flex justify-between items-center shrink-0">
        <div className="relative inline-block overflow-hidden pb-1">
          <h1 className="font-bebas border-b-3 border-black text-black text-[32px] md:text-[45px] tracking-widest uppercase m-0 leading-none relative z-10">
            ZORSHOR
          </h1>
          <div className="brand-underline absolute bottom-0 left-0 w-full h-[3px] bg-black origin-left scale-x-0 z-20"></div>
        </div>
        {/* Close Button */}
        <div
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className={`relative w-4 h-4 transition-all duration-400 ease-in-out ${isClosing ? 'scale-75 rotate-180' : 'rotate-0'}`}>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#00FF00] transform -translate-y-1/2 rotate-45"></div>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#00FF00] transform -translate-y-1/2 -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Main Menu Items */}
      <div ref={menuItemsRef} className="flex flex-col items-center justify-center flex-grow -mt-10 space-y-4 sm:space-y-6 md:space-y-8">
        {["WORK", "CULTURE", "TEAM", "JOBS"].map((item, index) => (
          <div key={index} className="overflow-hidden" style={{ padding: '0.4em 0.2em 0.2em 0.2em' }}>
            <a
              href="#"
              className="menu-link flex items-center justify-center font-dm text-black text-5xl sm:text-7xl md:text-[8rem] lg:text-[9rem] uppercase leading-none tracking-wide hover:opacity-60 transition-opacity font-semibold"
              style={{ transform: "scaleY(1.3)", transformOrigin: "bottom" }}
            >
              {item}
              <span
                className="font-black leading-none ml-2 sm:ml-4 md:ml-6"
                style={{ fontSize: '0.6em', transform: "scaleY(0.77)", marginTop: '-0.3em', WebkitTextStroke: '0.06em black' }}
              >
                ↗
              </span>
            </a>
          </div>
        ))}

        {/* Contact Us Button in Menu */}
        <div className="overflow-hidden pt-8 md:pt-12">
          <button className="menu-link bg-black text-[#00FF00] px-10 py-4 md:px-16 md:py-6 font-dm font-bold text-xl md:text-3xl tracking-wider hover:bg-white hover:text-black transition-all duration-300">
            CONTACT US
          </button>
        </div>
      </div>

      {/* Bottom Footer (Cleaned Up) */}
      <div ref={bottomRef} className="w-full flex flex-col items-center pb-12 md:pb-16 font-dm text-black font-medium tracking-widest text-xs md:text-sm shrink-0">
        <p className="menu-bottom-link opacity-40 uppercase">© 2026 ZORSHOR ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
}
