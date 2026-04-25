"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuOverlay from "../MenuOverlay";

export default function NavbarV2() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] px-8 md:px-16 py-8 flex justify-between items-center transition-all duration-700`}>
        {/* Left: Logo */}
        <Link href="/" className="relative w-32 h-8">
          <Image 
            src="/zorshor-logo-transparent.png" 
            alt="Zorshor Logo" 
            fill 
            className="object-contain"
          />
        </Link>

        {/* Center: Glyph */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-6 h-6 border border-white/20 rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Right: Diamond Menu */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center space-x-4 group cursor-pointer"
        >
          <span className="font-dm text-white text-xs tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            Menu
          </span>
          <div className="w-5 h-5 border border-white/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          </div>
        </button>
      </nav>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
