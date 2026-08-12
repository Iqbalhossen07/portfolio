"use client";

import React from "react";
import Link from "next/link";
import Bredcrumb from "./Bredcrumb/Bredcrumb";


const AboutPage = () => {
  const values = [
    {
      icon: "fa-graduation-cap",
      title: "Academic Core",
      desc: "CSE graduate with strong fundamentals.",
      c: "#14b8a6",
    },
    {
      icon: "fa-briefcase",
      title: "UK Market Exp",
      desc: "Handled 18+ high-end UK projects.",
      c: "#f97316",
    },
    {
      icon: "fa-laptop-code",
      title: "MERN & PHP",
      desc: "Full-stack expertise in modern tech.",
      c: "#0ea5e9",
    },
    {
      icon: "fa-user-check",
      title: "Mentored",
      desc: "Industry-standard training & ethics.",
      c: "#10b981",
    },
  ];

  const funfacts = [
    { icon: "fa-mug-hot", text: "Ambition fueled by curiosity", c: "#14b8a6" },
    {
      icon: "fa-microchip",
      text: "CSE Background & Theoretical Depth",
      c: "#f97316",
    },
    {
      icon: "fa-globe",
      text: "Delivered 18+ projects for UK firms",
      c: "#0ea5e9",
    },
    { icon: "fa-user-tie", text: "2+ Years of Pro Development", c: "#10b981" },
    {
      icon: "fa-book",
      text: "Courses, W3Schools & YouTube self-taught",
      c: "#8b5cf6",
    },
    {
      icon: "fa-heart",
      text: "Living the dream of building web",
      c: "#f43f5e",
    },
  ];

  const experiences = [
    {
      role: "Software Engineer (Remote)",
      company: "SetsTech",
      period: "2025 — Present",
      desc: "Leading the development of scalable web applications using the MERN stack. Architecting robust backend solutions and crafting intuitive user interfaces.",
      gfrom: "#14b8a6",
      gto: "#0ea5e9",
      current: true,
    },
    {
      role: "Software Engineer (Remote)",
      company: "TeamCipher",
      period: "2024 — 2025",
      desc: "Developed and maintained complex web platforms using PHP and the MERN stack. Collaborated with teams to deliver secure digital products.",
      gfrom: "#f97316",
      gto: "#ea580c",
      current: false,
    },
  ];

  const edu = [
    {
      degree: "BSc in Computer Science & Engineering",
      inst: "Asian University of Bangladesh (AUB)",
      period: "2025 — Present",
      desc: "Currently pursuing advanced studies in Software Architecture, AI, and Advanced Web Technologies.",
      gfrom: "#14b8a6",
      gto: "#0ea5e9",
    },
    {
      degree: "Diploma in CSE",
      inst: "Dhaka Polytechnic Institute",
      period: "2021 — 2024",
      desc: "Gained solid foundational knowledge in DS, Algorithms, and Database Management. Top performer.",
      gfrom: "#f97316",
      gto: "#ea580c",
    },
  ];

  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&q=80",
  ];

  return (
    <main className=" min-h-screen overflow-hidden">
      <Bredcrumb />

      {/* MY STORY SECTION */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-none pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">
            <div className="flex flex-col gap-6">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md mb-5"
                  style={{
                    border: "1px solid rgba(20, 184, 166, 0.2)",
                    background: "rgba(20, 184, 166, 0.05)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse inline-block"></span>
                  <span className="text-[11px] font-black uppercase tracking-[0.22em] text-teal-500/80">
                    My Narrative
                  </span>
                </div>
                <h2 className="text-xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-6">
                  From Childhood Curiosity to
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #14b8a6, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Digital Craftsmanship.
                  </span>
                </h2>
              </div>

              <div className="space-y-5">
                <p className="text-slate-400 text-lg leading-relaxed">
                  As a child, every time I visited Google or other websites, a
                  burning question lived in my mind:{" "}
                  <span className="text-white font-semibold">
                    "Who builds these, and how?"
                  </span>{" "}
                  That innocent curiosity turned into a deep-rooted ambition to
                  become a creator of the web myself.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed">
                  To turn this dream into reality, I pursued a degree in{" "}
                  <span className="text-white font-semibold">
                    Computer Science & Engineering (CSE)
                  </span>
                  . This academic foundation allowed me to grasp everything from
                  core theoretical concepts to practical implementation. I
                  complemented my formal education with relentless self-learning
                  through platforms like{" "}
                  <span className="text-teal-400 font-bold">YouTube</span> and{" "}
                  <span className="text-orange-400 font-bold">W3Schools</span>.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed">
                  My professional journey truly accelerated under the mentorship
                  of a senior expert who guided me into the industry. Today,
                  with over{" "}
                  <span className="text-white font-semibold">
                    2+ years of professional experience
                  </span>
                  , I have successfully delivered{" "}
                  <span className="text-teal-400 font-bold">
                    18+ high-end projects in the UK market
                  </span>
                  , mastering both the MERN stack and PHP.
                </p>
              </div>

              {/* Value Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {values.map((v, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-md"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${v.c}15`,
                        border: `1px solid ${v.c}30`,
                      }}
                    >
                      <i
                        className={`fa-solid ${v.icon} text-sm`}
                        style={{ color: v.c }}
                      ></i>
                    </div>
                    <div>
                      <div className="text-sm font-black text-white mb-1">
                        {v.title}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        {v.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Snapshots Column */}
            <div className="flex flex-col gap-4 lg:mt-24">
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-600 mb-2 px-2">
                Professional Snapshots
              </h3>
              {funfacts.map((ff, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-md transition-all duration-300 hover:-translate-x-2 group/ff"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${ff.c}15`,
                      border: `1px solid ${ff.c}25`,
                    }}
                  >
                    <i
                      className={`fa-solid ${ff.icon} text-xs`}
                      style={{ color: ff.c }}
                    ></i>
                  </div>
                  <span className="text-sm font-bold text-slate-400 group-hover/ff:text-white transition-colors duration-200">
                    {ff.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-12 md:py-16 relative overflow-hidden ">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md mb-5"
              style={{
                border: "1px solid rgba(20, 184, 166, 0.2)",
                background: "rgba(20, 184, 166, 0.05)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse inline-block"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-teal-500/80">
                Experience
              </span>
            </div>
            <h2 className="text-xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black text-white leading-[1.1] tracking-tight">
              Where I've{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Worked & Built
              </span>
            </h2>
          </div>

          <div className="relative flex flex-col gap-0">
            <div
              className="absolute left-6 md:left-6 top-6 bottom-6 w-px pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, #14b8a6, #f97316)",
                opacity: 0.2,
              }}
            ></div>
            {experiences.map((exp, i) => (
              <div key={i} className="relative flex gap-4 md:gap-8 pb-10 group">
                <div className="flex flex-col items-center flex-shrink-0 z-10">
                  <div
                    className="w-12 h-12 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg,${exp.gfrom},${exp.gto})`,
                      boxShadow: `0 0 0 4px rgba(0,0,0,1), 0 0 20px ${exp.gfrom}44`,
                    }}
                  >
                    <i className="fa-solid fa-briefcase text-white text-sm"></i>
                  </div>
                </div>
                <div
                  className="flex-1 rounded-md p-5 md:p-6 relative overflow-hidden transition-all duration-300 hover:border-white/20"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-none blur-[50px] opacity-[0.05] pointer-events-none"
                    style={{ background: exp.gfrom }}
                  ></div>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base md:text-lg font-black text-white leading-tight">
                        {exp.role}
                      </h3>
                      <div
                        className="text-sm font-bold mt-1"
                        style={{ color: exp.gfrom }}
                      >
                        @ {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exp.current && (
                        <span
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider"
                          style={{
                            background: "rgba(20, 184, 166, 0.1)",
                            border: "1px solid rgba(20, 184, 166, 0.3)",
                            color: "#2dd4bf",
                          }}
                        >
                          <span className="w-1 h-1 rounded-none bg-teal-400 animate-pulse"></span>
                          Current
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="py-12 md:py-16 relative overflow-hidden ">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md mb-5"
              style={{
                border: "1px solid rgba(20, 184, 166, 0.2)",
                background: "rgba(20, 184, 166, 0.05)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse inline-block"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-teal-500/80">
                Education
              </span>
            </div>
            <h2 className="text-xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black text-white leading-[1.1] tracking-tight">
              My{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Academic
              </span>{" "}
              Background
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {edu.map((e, i) => (
              <div
                key={i}
                className="group flex flex-col md:flex-row gap-6 p-6 rounded-md relative overflow-hidden transition-all duration-300 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-none blur-[50px] opacity-[0.05] pointer-events-none"
                  style={{ background: e.gfrom }}
                ></div>
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg,${e.gfrom},${e.gto})`,
                    boxShadow: `0 6px 20px ${e.gfrom}44`,
                  }}
                >
                  <i className="fa-solid fa-graduation-cap text-white text-base"></i>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base md:text-lg font-black text-white leading-tight">
                        {e.degree}
                      </h3>
                      <div
                        className="text-sm font-bold mt-1"
                        style={{ color: e.gfrom }}
                      >
                        {e.inst}
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap bg-white/5 px-2 py-1 rounded-md">
                      {e.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI CTA SECTION */}
      <section className="py-12 md:py-16 ">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div
            className="rounded-md relative overflow-hidden text-center px-8 md:px-14 py-14"
            style={{
              
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% -10%, rgba(20, 184, 166, 0.12) 0%, transparent 65%)",
              }}
            ></div>
            <div
              className="h-px w-full absolute top-0 left-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, #14b8a6 30%, #f97316 70%, transparent)",
                opacity: 0.6,
              }}
            ></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black text-white mb-3">
                Let's work together.
              </h2>
              <p className="text-slate-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
                I'm always open to exciting projects and new challenges. Let's
                build something great.
              </p>
              <div className="flex flex-row items-center justify-center gap-2 md:gap-3 w-full px-2">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-7 md:py-3.5  font-black text-[11px] md:text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 flex-1 sm:flex-none"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                    boxShadow: "0 6px 20px rgba(20, 184, 166, 0.3)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <i className="fa-solid fa-paper-plane text-[10px] md:text-xs"></i>
                  Get in Touch
                </Link>
                <Link href="/projects"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-7 md:py-3.5 font-black text-[11px] md:text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 flex-1 sm:flex-none"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <i className="fa-solid fa-eye text-[10px] md:text-xs"></i>View
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
