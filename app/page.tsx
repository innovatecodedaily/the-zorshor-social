"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import Preloader from "./components/Preloader";
import WhatWeBuild from "./components/WhatWeBuild";

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <main className="min-h-screen bg-transparent font-sans">
      {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}
      {/* We keep Hero mounted but pass the state so it knows when to animate */}
      <Hero shouldAnimate={preloaderComplete} />
      {preloaderComplete && <WhatWeBuild />}
    </main>
  );
}
