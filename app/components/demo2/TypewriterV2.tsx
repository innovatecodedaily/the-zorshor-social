"use client";

import React, { useEffect, useState } from "react";

interface TypewriterV2Props {
  prefix: string;
  words: string[];
  shouldAnimate: boolean;
  speed?: number;
  delayBetweenWords?: number;
  className?: string;
}

export default function TypewriterV2({
  prefix,
  words,
  shouldAnimate,
  speed = 100,
  delayBetweenWords = 2000,
  className = "",
}: TypewriterV2Props) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const currentWord = words[wordIndex];

  useEffect(() => {
    if (!shouldAnimate) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentWord.length) {
            setDisplayText(currentWord.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => {
              setIsDeleting(true);
            }, delayBetweenWords);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentWord.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, currentWord, isDeleting, speed, delayBetweenWords, wordIndex, words, shouldAnimate]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const isIdle = charIndex === currentWord.length && !isDeleting;

  return (
    <div className={`flex flex-col items-start ${className}`}>
      {/* Static Prefix - Subtle Gray/White & Slightly Larger */}
      <span className="text-[0.39em] tracking-[0.2em] md:tracking-[0.3em] text-white/70 font-bold mb-2">
        {prefix}
      </span>
      
      {/* Dynamic Cursive Word - Pure White Focal Point */}
      <div className="flex items-center">
        <span className="font-satisfy italic text-[1.2em] text-white leading-none flex items-center relative" style={{ fontFamily: 'var(--font-satisfy)' }}>
          {displayText}
          {/* White Cursor for White Text */}
          <span
            className="text-white ml-2 transition-opacity duration-75 inline"
            style={{ opacity: (isIdle && showCursor) || !isIdle ? 1 : 0 }}
          >
            .
          </span>
        </span>
      </div>
    </div>
  );
}
