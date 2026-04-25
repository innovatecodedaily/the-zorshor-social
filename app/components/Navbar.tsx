"use client";

import React, { useState } from "react";
import MenuOverlay from "./MenuOverlay";

interface NavbarProps {
  shouldAnimate: boolean;
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(({ shouldAnimate }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIconAnimating, setIsIconAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    if (isIconAnimating) return;
    setIsIconAnimating(true);
    setTimeout(() => {
      setIsMenuOpen(true);
      setTimeout(() => setIsIconAnimating(false), 500);
    }, 400);
  };

  return (
    <>
      <nav
        ref={ref}
        className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-2 flex justify-between items-center transition-all duration-500 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : shouldAnimate ? "opacity-100" : "opacity-0"
        } ${
          scrolled && !isMenuOpen
            ? "bg-[#080808]/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <h1 className="font-bebas text-[#F2E8D9] text-[32px] md:text-[50px] tracking-widest uppercase m-0 leading-none drop-shadow-2xl">
          ZORSHOR
        </h1>

        {/* Diamond Menu Button */}
        <div
          onClick={handleMenuClick}
          className="h-12 flex items-center justify-end cursor-pointer bg-transparent group"
        >
          <div className={`grid grid-cols-2 gap-2 transition-all duration-400 ease-in-out ${isIconAnimating ? 'scale-50 rotate-180 opacity-0' : 'group-hover:rotate-90'}`}>
            <div className="w-1.5 h-1.5 bg-white transform rotate-45"></div>
            <div className="w-1.5 h-1.5 bg-white transform rotate-45"></div>
            <div className="w-1.5 h-1.5 bg-white transform rotate-45"></div>
            <div className="w-1.5 h-1.5 bg-white transform rotate-45"></div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Navigation Menu */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
