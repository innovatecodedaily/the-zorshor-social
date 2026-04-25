"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatWeBuild = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "DIGITAL EXPERIENCES",
      category: "DESIGN / DEV",
      number: "01",
      image: "/showcase/digital.png",
    },
    {
      title: "BRAND IDENTITY",
      category: "ART DIRECTION",
      number: "02",
      image: "/showcase/brand.png",
    },
    {
      title: "CINEMATIC CONTENT",
      category: "PRODUCTION",
      number: "03",
      image: "/showcase/cinema.png",
    },
    {
      title: "SOCIAL STRATEGY",
      category: "MARKETING",
      number: "04",
      image: "/showcase/social.png",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#080808] px-6 md:px-12 overflow-hidden"
    >
      {/* Hero-style Grid Lines (Vertical Only) */}
      <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-white/10 z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-6 md:right-12 w-[1px] h-full bg-white/10 z-0 pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-2 md:gap-4">
          <div className="max-w-4xl">
            <span className="font-mono text-[#EAB308] text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
              Capabilities
            </span>
            <h2
              ref={headingRef}
              className="font-bebas text-[clamp(60px,12vw,180px)] leading-[0.85] text-[#F2E8D9] uppercase"
            >
              WHAT WE <span className="text-[#EAB308]">BUILD</span>
            </h2>
          </div>
          <div className="max-w-[90%] md:max-w-xl">
            <p className="font-dm text-white/50 text-sm md:text-xl">
              We merge high-fidelity design with technical precision to build brands that command attention in the digital age. Our ecosystem is built on the intersection of culture and performance.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative bg-[#080808] p-6 md:p-10 h-[280px] md:h-[380px] flex flex-col justify-between transition-colors duration-500 overflow-hidden cursor-pointer"
            >
              {/* Background Image with Enhanced Visibility Overlay */}
              <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${project.image}')` }}
              >
                {/* Gradient to ensure bottom text is super clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono text-white text-[10px] md:text-xs tracking-widest opacity-70">{project.number}</span>
                <span className="font-mono text-[#EAB308] text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  EXPLORE CASE
                </span>
              </div>

              <div className="relative z-10">
                <span className="font-mono text-[#EAB308] text-[10px] md:text-xs tracking-widest uppercase mb-1 block">
                  {project.category}
                </span>
                <h3 className="font-bebas text-3xl md:text-5xl text-white tracking-wide transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Hover Line Animation */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EAB308] transition-all duration-700 ease-in-out group-hover:w-full z-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
