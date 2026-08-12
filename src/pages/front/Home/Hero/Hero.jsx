"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const phrases = [
    "Software Engineer",
    "MERN & Laravel Expert",
    "Next.js & Node Developer",
    "Backend Developer",
    "Problem Solver",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/api/hero");
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };
    fetchHeroData();
  }, []);

  // Typing Effect Logic
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 90;
    const pauseTime = isDeleting ? 400 : 1800;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative pt-44 w-full flex items-center justify-center overflow-hidden  px-6 md:px-12 py-16"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#808080 1px, transparent 1px), linear-gradient(to right, #808080 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 95%)",
        }}
      ></div>

      {/* Radial Glow */}
      <div className="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] pointer-events-none z-10 opacity-40">
        <div className="absolute inset-0 rounded-none bg-[radial-gradient(circle_at_center,_#7B61FF_0%,_#4F8CFF_50%,_transparent_100%)] blur-[100px] md:blur-[180px]"></div>
      </div>

      {/* Floating Card 1: Experience */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hfc absolute z-20 pointer-events-none hidden xl:block top-[30%] left-[8%]"
      >
        <div className="hfc-card w-[195px] p-4 rounded-md backdrop-blur-xl -rotate-[5deg]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-briefcase text-white text-[10px]"></i>
            </div>
            <span className="text-[11px] font-bold text-[var(--text-muted)]">
              Experience
            </span>
          </div>
          <div className="text-3xl font-black text-[var(--text-primary)]">
            2+ yrs
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-green-400 animate-pulse inline-block"></span>
            <span className="text-[10px] font-semibold text-green-400">
              Available for opportunities
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 2: Tech Stack */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="hfc absolute z-20 pointer-events-none hidden xl:block bottom-[22%] left-[10%]"
      >
        <div className="hfc-card w-[210px] p-4 rounded-md backdrop-blur-xl rotate-[3deg]">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-solid fa-code text-blue-400 text-xs"></i>
            <span className="text-[11px] font-bold text-[var(--text-muted)]">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 items-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-none bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#61DAFB">
                  <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47m-7.94-6.31c-.63.35-.82 1.82-.31 3.96.8-.1 1.61-.24 2.4-.36.48-.67.99-1.31 1.51-1.9-1.59-1.5-2.97-2.08-3.6-1.7m11.27 0c-.63-.38-2.01.2-3.6 1.7.52.59 1.03 1.23 1.51 1.9.79.12 1.6.26 2.4.36.51-2.14.32-3.61-.31-3.96m.71 5.74c-.1-.3-.2-.58-.29-.86l-.29.51-.3.51c.31-.05.61-.1.88-.16m-3.19 4.19c1.59 1.5 2.97 2.08 3.6 1.7.63-.35.82-1.82.31-3.96-.8.1-1.61.24-2.4.36-.48.67-.99 1.31-1.51 1.9" />
                </svg>
              </div>
              <span className="text-[8px] font-black text-blue-400">React</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-none bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#339933">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8z" />
                </svg>
              </div>
              <span className="text-[8px] font-black text-green-400">
                Node.js
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-none bg-white/10 border border-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#ffffff">
                  <path d="M18.666 5.333H5.334v13.334h13.332V5.333zM16.592 16h-1.424l-3.957-5.918v5.918H10.15V8h1.423l3.957 5.917V8h1.062v8z" />
                </svg>
              </div>
              <span className="text-[8px] font-black text-white">
                Next.js
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-none bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#FF2D20">
                  <path d="M22.617 7.027l-9.988-5.32c-.382-.207-.867-.207-1.25 0L1.383 7.027A1.218 1.218 0 00.75 8.082v7.836c0 .445.244.85.633 1.055l9.996 5.319a1.267 1.267 0 001.242 0l9.996-5.319a1.219 1.219 0 00.633-1.055V8.082c0-.445-.244-.85-.633-1.055zm-11.45-3.385c.195-.11.433-.11.629 0l8.035 4.281-8.35 4.542-8.35-4.542 8.036-4.281zm-9.155 5.5l7.918 4.305v9.117L2.012 18.26V9.142zm19.976 9.118l-7.918 4.304v-9.117l7.918-4.305v9.118z" />
                </svg>
              </div>
              <span className="text-[8px] font-black text-red-400">
                Laravel
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 3: Projects Done */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="hfc absolute z-20 pointer-events-none hidden xl:block top-[20%] right-[8%]"
      >
        <div className="hfc-card w-[205px] p-4 rounded-md backdrop-blur-xl rotate-[4deg]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[var(--text-muted)]">
              Projects Done
            </span>
            <span className="flex items-center gap-1 text-[9px] font-black text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-none border border-green-400/20">
              <span className="w-1.5 h-1.5 rounded-none bg-green-400 animate-pulse inline-block"></span>{" "}
              ACTIVE
            </span>
          </div>
          <div className="flex items-end gap-1 h-10 mb-2">
            <div className="flex-1 rounded-t-sm bg-blue-500/40 h-[35%]"></div>
            <div className="flex-1 rounded-t-sm bg-blue-500/60 h-[65%]"></div>
            <div className="flex-1 rounded-t-sm bg-blue-600 h-[100%]"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-black text-[var(--text-primary)]">
              18+
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">
              completed
            </span>
          </div>
        </div>
      </motion.div>
      {/* Floating Card 3: Projects Done */}

      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="hfc absolute z-20 pointer-events-none animate-[bounce_6s_ease-in-out_infinite_1.8s] hidden xl:block bottom-[12%] right-[12%]"
      >
        <div className="">
          <div className="w-[190px] p-5 rounded-none backdrop-blur-2xl border border-white/10 bg-white/5 -rotate-3 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <i className="fa-solid fa-bolt text-[#048DF0] text-xl"></i>
              <span className="text-[12px] font-bold text-slate-300">
                Fast Response
              </span>
            </div>
            <div className="text-3xl font-black text-white">≤ 30 Minutes</div>
            <div className="mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
              Average Wait Time
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-20 w-full max-w-[860px] mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-white/15 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 bg-green-400 animate-pulse inline-block"></span>
          <span className="text-xs md:text-sm font-semibold text-[#C7C9FF]">
            Open to work &nbsp;·&nbsp; Software Engineer ✨
          </span>
        </div>

        <h1 className="text-xl md:text-4xl font-black leading-[1.1] tracking-tight mb-8 max-w-4xl mx-auto text-white">
          <span>Hi, I'm Iqbal —</span>
          <br />
          <span
            style={{
              display: "inline",
              background: "linear-gradient(135deg,#00BDCA,#FF592C)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {displayText}
          </span>
          <span style={{ color: "#FF592C" }} className="animate-pulse">
            |
          </span>
        </h1>

        <p className="text-[var(--text-muted)] text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-12 px-4">
          I build fast, scalable & beautiful web applications — from frontend UI to backend APIs. Let's turn your idea into reality.
        </p>

        <div className="flex flex-row flex-wrap items-center justify-center gap-3 w-full px-4 max-w-xl sm:max-w-none">
          <a href={heroData?.cvLink || "#"} download target="_blank" rel="noreferrer"
            className="group relative flex-1 sm:flex-none px-6 py-2.5  font-black transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <span className="text-sm md:text-base whitespace-nowrap">
              {heroData?.cvText || "Download CV"}
            </span>
            <i className="fa-solid fa-download text-sm transition-transform group-hover:-translate-y-1"></i>
          </a>

          <Link href="/projects"
            className="group relative flex-1 sm:flex-none px-5 py-2.5  font-black transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              color: "#ffffff",
              boxShadow:
                "0 4px 15px rgba(20, 184, 166, 0.3), 0 1px 0 rgba(255,255,255,0.2) inset",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="text-sm md:text-base whitespace-nowrap">
              View Work
            </span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </Link>

          
        </div>
      </div>
    </section>
  );
};

export default Hero;
