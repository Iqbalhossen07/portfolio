"use client";

import React from "react";
import Link from "next/link";

const Breadcrumb = ({ title }) => {
  return (
    <section
      className="relative overflow-hidden pt-36 md:pt-48 pb-12 md:pb-16"
      style={{ background: "var(--bg-body)" }}
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)",
        }}
      ></div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      ></div>

      {/* Top Gradient Line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background:
            "linear-gradient(to right, transparent, #14b8a6 30%, #f97316 70%, transparent)",
          opacity: 0.5,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Breadcrumb Nav */}
        <nav className="flex items-center justify-center md:justify-start gap-2 mb-6 md:mb-5 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2 md:pb-0">
          <Link href="/"
            className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-500 hover:text-white transition-colors duration-200"
          >
            <i className="fa-solid fa-house text-[9px] md:text-[10px]"></i>
            Home
          </Link>

          <i className="fa-solid fa-chevron-right text-[8px] md:text-[9px] text-slate-700"></i>

          <Link href="/projects"
            className="text-[10px] md:text-xs font-bold text-slate-500 hover:text-white transition-colors duration-200"
          >
            Projects
          </Link>

          <i className="fa-solid fa-chevron-right text-[8px] md:text-[9px] text-slate-700"></i>

          <span
            className="text-[10px] md:text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Project Details
          </span>
        </nav>

        <div className="flex flex-col md:flex-row items-center md:items-end md:justify-between gap-6 md:gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight max-w-3xl">
              {title}
            </h1>
          </div>

          <div
            className="w-fit flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-md"
            style={{
              background: "rgba(20, 184, 166, 0.04)",
              border: "1px solid rgba(20, 184, 166, 0.15)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse inline-block"></span>
            <span className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.18em]">
              Case Study
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      ></div>
    </section>
  );
};

export default Breadcrumb;
