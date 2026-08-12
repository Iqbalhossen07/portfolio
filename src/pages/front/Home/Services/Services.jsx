"use client";

import React from "react";
import Link from "next/link";

const Services = () => {
  const services = [
    {
      icon: "fa-display",
      title: "Web Development",
      tagline: "Pixel-perfect. Lightning-fast.",
      desc: "From landing pages to complex web applications — I build responsive, performant websites that look great and work flawlessly on every device.",
      gfrom: "#3b82f6",
      gto: "#06b6d4",
      glow: "rgba(59,130,246,0.35)",
      badge: "Core Skill",
      badge_c: "#3b82f6",
      features: [
        "React / Next.js frontend",
        "Fully responsive design",
        "SEO optimized structure",
        "Performance tuned",
      ],
      featured: true,
    },
    {
      icon: "fa-server",
      title: "Backend & API Dev",
      tagline: "Scalable. Secure. Solid.",
      desc: "Robust server-side systems, RESTful APIs, and database architecture designed to handle growth without breaking a sweat.",
      gfrom: "#7c3aed",
      gto: "#a855f7",
      glow: "rgba(124,58,237,0.35)",
      badge: null,
      features: [
        "Laravel / Node.js APIs",
        "JWT & role-based auth",
        "MySQL / MongoDB design",
        "API documentation",
      ],
      featured: false,
    },
    {
      icon: "fa-layer-group",
      title: "Full Stack Projects",
      tagline: "End-to-end ownership.",
      desc: "I take full ownership of your project — UI to database, auth to deployment. One engineer, zero handoff headaches.",
      gfrom: "#10b981",
      gto: "#059669",
      glow: "rgba(16,185,129,0.35)",
      badge: "Specialized",
      badge_c: "#10b981",
      features: [
        "Complete project ownership",
        "Frontend + backend + DB",
        "CI/CD & deployment",
        "Ongoing post-launch support",
      ],
      featured: false,
    }
  ];

  return (
    <section
      id="services"
      className="py-12 md:py-16 relative overflow-hidden "
    >
      {/* Background Glows */}
      <div
        className="absolute top-[10%] right-[-150px] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-none blur-[150px] md:blur-[200px] pointer-events-none opacity-[0.11]"
        style={{ background: "#7c3aed" }}
      ></div>
      <div
        className="absolute bottom-[10%] left-[-150px] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-none blur-[150px] md:blur-[200px] pointer-events-none opacity-[0.11]"
        style={{ background: "#3b82f6" }}
      ></div>
      <div
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-none blur-[120px] md:blur-[180px] pointer-events-none opacity-[0.06]"
        style={{ background: "#ec4899" }}
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
            <span className="w-1.5 h-1.5 rounded-none bg-pink-400 animate-pulse inline-block"></span>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
              My Expertise
            </span>
          </div>
          <h2 className="text-xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-4">
            Skills Built for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #14b8a6, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Results
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl leading-relaxed px-2">
            Every skill I've honed is designed with one goal in mind — to build
            digital products that are stronger, faster, and more impactful.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((sv, i) => (
            <div
              key={i}
              className="service-card group relative rounded-md overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2"
              style={{
                border: `1px solid rgba(255,255,255,${sv.featured ? "0.14" : "0.08"})`,
                boxShadow: `0 1px 0 rgba(255,255,255,${sv.featured ? "0.14" : "0.10"}) inset, 0 -1px 0 rgba(0,0,0,0.60) inset, 1px 0 0 rgba(255,255,255,0.06) inset, -1px 0 0 rgba(255,255,255,0.06) inset, ${sv.featured ? "0 0 0 1px " + sv.gfrom + "33," : ""} 0 28px 60px rgba(0,0,0,0.55)`,
              }}
            >
              <div
                className="h-px w-full flex-shrink-0"
                style={{
                  background: `linear-gradient(to right, transparent, ${sv.gfrom}, ${sv.gto}, transparent)`,
                  opacity: sv.featured ? "0.8" : "0.4",
                }}
              ></div>

              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-none blur-[80px] opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500 pointer-events-none"
                style={{ background: sv.gfrom }}
              ></div>

              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${sv.gfrom}, ${sv.gto})`,
                      boxShadow: `0 6px 24px ${sv.glow}, 0 1px 0 rgba(255,255,255,0.25) inset`,
                    }}
                  >
                    <i
                      className={`fa-solid ${sv.icon} text-white text-lg md:text-xl`}
                    ></i>
                  </div>
                  {sv.badge && (
                    <span
                      className="px-3 py-1 rounded-none text-[9px] md:text-[10px] font-black"
                      style={{
                        background: `${sv.badge_c}18`,
                        border: `1px solid ${sv.badge_c}44`,
                        color: sv.badge_c,
                      }}
                    >
                      ✦ {sv.badge}
                    </span>
                  )}
                </div>

                <div className="mb-1">
                  <span
                    className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em]"
                    style={{ color: sv.gfrom }}
                  >
                    {sv.tagline}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-white mb-3 leading-tight">
                  {sv.title}
                </h3>
                <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed mb-6">
                  {sv.desc}
                </p>

                <div className="flex flex-col gap-2.5 mb-7 flex-1">
                  {sv.features.map((feat, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-none flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${sv.gfrom}18`,
                          border: `1px solid ${sv.gfrom}33`,
                        }}
                      >
                        <i
                          className="fa-solid fa-check text-[9px]"
                          style={{ color: sv.gfrom }}
                        ></i>
                      </div>
                      <span className="text-[11px] md:text-[12px] font-semibold text-slate-400">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default Services;
