"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  speed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  cursorChar?: string;
  startTyping?: boolean;
  deleteLimit?: number;
}

export function Typewriter({
  words,
  speed = 100,
  delayBetweenWords = 2000,
  cursor = true,
  cursorChar = "|",
  startTyping = true,
  deleteLimit = 0,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const currentWord = words[wordIndex];

  useEffect(() => {
    if (!startTyping) return;

    const timeout = setTimeout(
      () => {
        // Typing logic
        if (!isDeleting) {
          if (charIndex < currentWord.length) {
            setDisplayText(currentWord.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            // Word is complete, wait before deleting
            setTimeout(() => {
              setIsDeleting(true);
            }, delayBetweenWords);
          }
        } else {
          // Deleting logic
          if (charIndex > deleteLimit) {
            setDisplayText(currentWord.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            // Word is deleted down to the limit, move to next word
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, currentWord, isDeleting, speed, delayBetweenWords, wordIndex, words, startTyping, deleteLimit]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  // Determine if the typewriter is actively typing or deleting
  const isIdle = charIndex === currentWord.length && !isDeleting;

  return (
    <span className="inline">
      {displayText}
      {cursor && (
        <span
          className="text-[#EAB308] transition-opacity duration-75 inline"
          style={{ opacity: (isIdle && showCursor) ? 1 : 0 }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
