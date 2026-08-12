"use client";

import React from "react";
import Link from "next/link";

const Process = () => {
  const steps = [
    {
      num: "01",
      icon: "fa-comments",
      title: "Discovery",
      short: "Listen first, build second",
      desc: "Deep dive into your goals, audience & budget. I turn every conversation into a crystal-clear project brief so nothing gets lost in translation.",
      gfrom: "#3b82f6",
      gto: "#06b6d4",
      glow: "rgba(59,130,246,0.4)",
      items: [
        "Goal alignment",
        "Scope & timeline",
        "Budget planning",
        "Tech consultation",
      ],
    },
    {
      num: "02",
      icon: "fa-pen-ruler",
      title: "Design",
      short: "Blueprint before bricks",
      desc: "Wireframes, architecture, and data flow — all mapped out before a single line of code. This phase prevents 90% of problems before they happen.",
      gfrom: "#7c3aed",
      gto: "#a855f7",
      glow: "rgba(124,58,237,0.4)",
      items: [
        "UI/UX wireframes",
        "DB schema",
        "API design",
        "Tech stack lock-in",
      ],
    },
    {
      num: "03",
      icon: "fa-code",
      title: "Development",
      short: "Clean code, fast delivery",
      desc: "Focused sprints with daily updates. Clean, documented, scalable code — frontend, backend, and database all built to last.",
      gfrom: "#10b981",
      gto: "#059669",
      glow: "rgba(16,185,129,0.4)",
      items: [
        "Agile sprints",
        "Daily check-ins",
        "Git versioning",
        "Code quality",
      ],
    },
    {
      num: "04",
      icon: "fa-vial",
      title: "Testing",
      short: "Zero tolerance for bugs",
      desc: "Cross-browser, cross-device, performance, and security — every inch tested before anything ships. No shortcuts.",
      gfrom: "#f59e0b",
      gto: "#f97316",
      glow: "rgba(245,158,11,0.4)",
      items: [
        "Functional QA",
        "Mobile testing",
        "Speed audit",
        "Security scan",
      ],
    },
    {
      num: "05",
      icon: "fa-rocket",
      title: "Launch",
      short: "Ship it right",
      desc: "Smooth zero-downtime deployment. SSL, DNS, server config, CI/CD — everything handled so you go live without breaking a sweat.",
      gfrom: "#ec4899",
      gto: "#f43f5e",
      glow: "rgba(236,72,153,0.4)",
      items: [
        "Server deploy",
        "SSL & DNS",
        "CI/CD pipeline",
        "Go-live checklist",
      ],
    },
    {
      num: "06",
      icon: "fa-headset",
      title: "Support",
      short: "Always in your corner",
      desc: "Post-launch monitoring, bug fixes, feature updates — the relationship doesn't end at launch. I'm here to help you grow.",
      gfrom: "#8b5cf6",
      gto: "#3b82f6",
      glow: "rgba(139,92,246,0.4)",
      items: [
        "Live monitoring",
        "Bug fixes",
        "Feature updates",
        "Growth strategy",
      ],
    },
  ];

  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&q=80",
  ];

  return (
    <section
      id="process"
      className="py-12 md:py-16 relative overflow-hidden "
    >
      {/* Background Glows */}
      <div
        className="absolute top-[20%] left-[-100px] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-none blur-[120px] md:blur-[180px] pointer-events-none opacity-[0.12]"
        style={{ background: "#3b82f6" }}
      ></div>
      <div
        className="absolute bottom-[10%] right-[-100px] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-none blur-[120px] md:blur-[180px] pointer-events-none opacity-[0.12]"
        style={{ background: "#7c3aed" }}
      ></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none mb-6"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-none bg-purple-400 animate-pulse inline-block"></span>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
              How I Work
            </span>
          </div>
          <h2 className="text-xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-4">
            From Idea to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #14b8a6, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Launch
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg max-w-lg leading-relaxed">
            A clear, battle-tested process that keeps every project on track —
            no surprises, just results.
          </p>
        </div>

        {/* Desktop Timeline Visual */}
        <div className="hidden lg:block relative mb-12">
          <div className="flex justify-between items-center px-12 relative">
            <div
              className="absolute top-1/2 left-12 right-12 h-px -translate-y-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #3b82f6, #7c3aed, #ec4899)",
                opacity: 0.25,
              }}
            ></div>

            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center gap-2 z-10"
              >
                <div
                  className="w-8 h-8 rounded-none flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${s.gfrom}, ${s.gto})`,
                    boxShadow: `0 0 0 3px rgba(0,0,0,1), 0 0 0 5px ${s.gfrom}55, 0 4px 16px ${s.glow}`,
                  }}
                >
                  <span className="text-[9px] font-black text-white">
                    {s.num}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="process-card rounded-md p-7 relative overflow-hidden group transition-all duration-300 hover:-translate-y-2"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.11) inset, 0 -1px 0 rgba(0,0,0,0.6) inset, 0 24px 56px rgba(0,0,0,0.55)",
              }}
            >
              {/* Decorative Large Number */}
              <div
                className="absolute top-5 right-6 font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "72px",
                  background: `linear-gradient(135deg, ${s.gfrom}18, ${s.gto}08)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.num}
              </div>

              {/* Glow Effect */}
              <div
                className="absolute -bottom-10 -right-10 w-44 h-44 rounded-none blur-[70px] opacity-[0.07] group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: s.gfrom }}
              ></div>

              <div
                className="w-14 h-14 rounded-md flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, ${s.gfrom}, ${s.gto})`,
                  boxShadow: `0 6px 24px ${s.glow}, 0 1px 0 rgba(255,255,255,0.25) inset`,
                }}
              >
                <i className={`fa-solid ${s.icon} text-white text-xl`}></i>
              </div>

              <div className="mb-1">
                <span
                  className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em]"
                  style={{ color: s.gfrom }}
                >
                  {s.short}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-black text-white mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {s.desc}
              </p>

              <div
                className="w-full h-px mb-5"
                style={{
                  background: `linear-gradient(to right, ${s.gfrom}44, transparent)`,
                }}
              ></div>

              <div className="flex flex-col gap-2.5">
                {s.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-none flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${s.gfrom}18`,
                        border: `1px solid ${s.gfrom}33`,
                      }}
                    >
                      <i
                        className="fa-solid fa-check text-[9px]"
                        style={{ color: s.gfrom }}
                      ></i>
                    </div>
                    <span className="text-[12px] font-semibold text-slate-400">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default Process;
