"use client";

import React from "react";
import Link from "next/link";

const CTA = () => {
  const trust = [
    { icon: "fa-rocket", c: "#14b8a6", text: "Fast Learner" },
    { icon: "fa-puzzle-piece", c: "#14b8a6", text: "Problem Solver" },
    { icon: "fa-users", c: "#f97316", text: "Team Player" },
    { icon: "fa-calendar-check", c: "#f97316", text: "Open for Work" },
  ];

  return (
    <section
      id="cta"
      className="py-12 md:py-16 relative overflow-hidden "
    >
      {/* Background Glow */}
      <div
        className="absolute bottom-[-80px] right-[25%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-none blur-[120px] md:blur-[180px] pointer-events-none opacity-[0.12]"
        style={{ background: "#14b8a6" }}
      ></div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-10">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          }}
        >
          {/* Top Decorative Line */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, #14b8a6 30%, #f97316 70%, transparent)",
              opacity: 0.6,
            }}
          ></div>

          {/* Radial Light Effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% -10%, rgba(20, 184, 166, 0.12) 0%, transparent 60%)",
            }}
          ></div>

          <div className="relative z-10 px-6 md:px-14 py-12 md:py-16 text-center">
            {/* Status Badge */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md"
                style={{
                  background: "rgba(20, 184, 166, 0.08)",
                  border: "1px solid rgba(20, 184, 166, 0.2)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse inline-block"></span>
                <span className="text-[10px] md:text-[11px] font-black text-slate-300 tracking-wider uppercase">
                  Available for new opportunities
                </span>
              </div>
            </div>

            <h2 className="text-xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-4 px-2">
              Looking for a dedicated Software Engineer?
              <br className="hidden md:block" />
              <span
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let's build something great.
              </span>
            </h2>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10 px-4">
              From frontend interfaces to robust backend architectures — I'm ready to bring my expertise to your team and turn ideas into reality.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 px-6 sm:px-0">
              <Link href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-md font-black text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                  boxShadow: "0 8px 24px rgba(20, 184, 166, 0.3)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
                Get in Touch
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>

              <Link href="/projects"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-md font-black text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i className="fa-solid fa-eye text-xs"></i>
                View My Work
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-4 px-4">
              {trust.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <i
                    className={`fa-solid ${t.icon} text-[10px] md:text-xs`}
                    style={{ color: t.c }}
                  ></i>
                  <span className="text-[11px] md:text-[12px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-wide">
                    {t.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Decorative Line */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, #f97316 40%, #14b8a6 75%, transparent)",
              opacity: 0.3,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
