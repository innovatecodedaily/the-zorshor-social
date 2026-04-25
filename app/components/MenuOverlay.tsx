"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const menuLinks = [
    { name: "HOME", href: "/" },
    { name: "PROCESS", href: "#process" },
    { name: "CULTURE", href: "#" },
    { name: "TEAM", href: "#" },
  ];

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

    if (isOpen) {
      // Recreate timeline on open to ensure fresh DOM nodes are captured
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = gsap.timeline({ paused: true });

      // Animate overlay background
      tlRef.current.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" }
      );

      // Animate brand underline
      tlRef.current.fromTo(".brand-underline", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");

      // Animate left links
      const leftLinks = gsap.utils.toArray(".menu-link-left", menuItemsRef.current);
      tlRef.current.fromTo(
        leftLinks,
        { y: "130%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.5"
      );

      // Animate right side
      const rightAnims = gsap.utils.toArray(".menu-right-anim", menuItemsRef.current);
      tlRef.current.fromTo(
        rightAnims,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.6"
      );

      // Animate footer
      const bottomLinks = gsap.utils.toArray(".menu-bottom-link", bottomRef.current);
      tlRef.current.fromTo(
        bottomLinks,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" },
        "-=0.5"
      );

      gsap.set(overlayRef.current, { display: "flex" });
      tlRef.current.play();
    } else if (tlRef.current) {
      // If closing, reverse the existing timeline
      tlRef.current.reverse().then(() => {
        if (!isOpen && overlayRef.current) {
          gsap.set(overlayRef.current, { display: "none" });
        }
      });
    }

    return () => {
      // Cleanup on unmount, but don't kill the timeline on every isOpen toggle 
      // unless we're opening a new one.
    };
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

      {/* Main Menu Content */}
      <div ref={menuItemsRef} className="flex-grow flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between px-6 md:px-24 py-10 md:py-20 gap-10">
        
        {/* Left Side: Navigation Links */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2">
          {menuLinks.map((item, index) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <div key={index} className="overflow-hidden" style={{ padding: '0.4em 0' }}>
                <a
                  href={item.href}
                  onClick={handleClose}
                  className={`menu-link-left relative flex items-center font-dm uppercase leading-none tracking-tight transition-all duration-500 font-bold px-6 py-3 ${
                    isActive ? "text-[#0d5b45] md:pl-12 md:pr-20" : "text-black hover:opacity-60 md:px-12"
                  } text-5xl sm:text-7xl md:text-[5.2vw]`}
                  style={{ transformOrigin: "bottom" }}
                >
                  {isActive && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      {/* Outer Border */}
                      <div className="absolute inset-0 border border-black/10"></div>
                      {/* Inner Border (Offset) */}
                      <div className="absolute inset-1.5 border border-black/5"></div>
                      
                      {/* Corner Accents (Technical Style) */}
                      <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-[#0d5b45]"></div>
                      <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-[#0d5b45]"></div>
                      <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-[#0d5b45]"></div>
                      <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-[#0d5b45]"></div>
                    </div>
                  )}
                  <span className="relative flex items-center z-10">
                    {item.name}
                  </span>
                  {!isActive && (
                    <span
                      className="font-black leading-none ml-2 md:ml-4 relative z-10"
                      style={{ 
                        fontSize: '0.4em', 
                        transform: "scaleY(0.8)", 
                        marginTop: '-0.1em', 
                        WebkitTextStroke: '0.08em black',
                        color: 'transparent'
                      }}
                    >
                      ↗
                    </span>
                  )}
                </a>
              </div>
            );
          })}

          {/* Mobile-only Contact Button (hidden on desktop because it's on the right) */}
          <div className="md:hidden overflow-hidden pt-8">
            <button className="menu-link-left bg-black text-[#00FF00] px-10 py-4 font-dm font-bold text-xl tracking-wider hover:bg-[#0d5b45] hover:text-white transition-all duration-300">
              CONTACT US
            </button>
          </div>
        </div>

        {/* Right Side: Desktop Info (Hidden on mobile) */}
        <div className="hidden md:flex flex-col items-end justify-between h-full py-4 text-right max-w-sm">
          <div className="space-y-12">
            <div className="menu-right-anim">
              <span className="font-mono text-black/40 text-xs tracking-widest uppercase block mb-4">Get in Touch</span>
              <button className="bg-black text-[#00FF00] px-12 py-5 font-dm font-bold text-2xl tracking-wider hover:bg-[#0d5b45] hover:text-white transition-all duration-300">
                CONTACT US
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="menu-right-anim">
                <span className="font-mono text-black/40 text-xs tracking-widest uppercase block mb-2">Social</span>
                <a
                  href="https://www.instagram.com/thezorshorsocial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-dm text-black text-2xl hover:opacity-60 transition-opacity font-medium"
                >
                  INSTAGRAM ↗
                </a>
              </div>
              
              <div className="menu-right-anim">
                <span className="font-mono text-black/40 text-xs tracking-widest uppercase block mb-2">Email</span>
                <a href="mailto:hello@zorshor.social" className="block font-dm text-black text-2xl hover:opacity-60 transition-opacity font-medium">
                  HELLO@ZORSHOR.SOCIAL
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div ref={bottomRef} className="w-full flex flex-col md:flex-row items-center md:justify-between px-6 md:px-12 pb-8 md:pb-12 font-dm text-black font-medium tracking-widest text-xs shrink-0 gap-4">
        <p className="menu-bottom-link opacity-40 uppercase">© 2026 ZORSHOR ALL RIGHTS RESERVED</p>
        <div className="hidden md:flex gap-8 opacity-40 uppercase menu-bottom-link">
          <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Terms of Use</a>
        </div>
        <a
          href="https://www.instagram.com/thezorshorsocial/"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden menu-bottom-link hover:opacity-60 transition-opacity uppercase"
        >
          Instagram ↗
        </a>
      </div>
    </div>
  );
}
