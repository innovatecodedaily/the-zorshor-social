"use client";
import React, { useEffect, useState } from "react";

export default function RecordingFrame() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Increment time every second
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    // Append a fake frame counter that loops quickly
    const f = Math.floor(Math.random() * 24).toString().padStart(2, "0");
    return `00:${m}:${s}:${f}`;
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {/* Corner Brackets (Single Line Style at Edges) */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-6 h-6 md:w-10 md:h-10 border-t-[1.5px] border-l-[1.5px] border-white/50"></div>
      
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-6 h-6 md:w-10 md:h-10 border-t-[1.5px] border-r-[1.5px] border-white/50"></div>
      
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-6 h-6 md:w-10 md:h-10 border-b-[1.5px] border-l-[1.5px] border-white/50"></div>
      
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-6 h-6 md:w-10 md:h-10 border-b-[1.5px] border-r-[1.5px] border-white/50"></div>

      {/* Top UI Elements */}
      <div className="absolute top-1 left-2 md:top-2 md:left-3 flex items-center space-x-2">
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-600 animate-pulse"></div>
        <span className="text-white font-mono text-[9px] md:text-[11px] tracking-widest uppercase">REC</span>
      </div>

      <div className="absolute top-1 right-2 md:top-2 md:right-3 text-white font-mono text-[9px] md:text-[11px] tracking-widest uppercase">
        {formatTime(time)}
      </div>

      {/* Bottom UI Elements */}
      <div className="absolute bottom-1 left-2 md:bottom-2 md:left-3 text-white/70 font-mono text-[9px] md:text-[11px] tracking-widest uppercase flex flex-col space-y-0.5">
        <span>ISO 800</span>
        <span>f/2.8</span>
      </div>

      <div className="absolute bottom-1 right-2 md:bottom-2 md:right-3 text-white/70 font-mono text-[9px] md:text-[11px] tracking-widest uppercase flex flex-col items-end space-y-0.5">
        <span>4K RAW</span>
        <span>24 FPS</span>
      </div>
    </div>
  );
}
