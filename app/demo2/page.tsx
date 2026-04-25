"use client";

import React, { useState } from "react";
import PreloaderV2 from "../components/demo2/PreloaderV2";
import HeroV2 from "../components/demo2/HeroV2";
import Navbar from "../components/Navbar";
import WhatWeBuild from "../components/WhatWeBuild";

export default function Demo2Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-[#080808] selection:bg-white selection:text-black">
      {!isLoaded && <PreloaderV2 onComplete={() => setIsLoaded(true)} />}
      
      <Navbar shouldAnimate={isLoaded} />
      <HeroV2 shouldAnimate={isLoaded} />
      
      {/* Existing Process Section */}
      <WhatWeBuild showOrder={false} showBorder={false} />
      
      <footer className="py-20 px-6 md:px-12 bg-black border-t border-white/5 text-center">
        <h2 className="font-bebas text-[15vw] text-white/10 leading-none mb-12">ZORSHOR</h2>
        <div className="flex justify-center space-x-12 font-mono text-white/40 text-[10px] tracking-[0.4em] uppercase">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Twitter</span>
        </div>
      </footer>
    </main>
  );
}
