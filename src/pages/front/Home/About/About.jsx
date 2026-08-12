"use client";

import React from "react";
import Link from "next/link";
import image from '../../../../assets/img/IQBAL.jpg'

const About = () => {
  const skills = [
    { label: "Full Stack Dev", color: "#00BDCA" },
    { label: "MERN Stack", color: "#61DAFB" },
    { label: "PHP / MySQL", color: "#818cf8" },
    { label: "REST APIs", color: "#34d399" },
    { label: "Responsive UI", color: "#FF592C" },
    { label: "Database Design", color: "#f472b6" },
  ];

  return (
    <section
      id="about"
      className="py-12 md:py-16 relative overflow-hidden "
    >
      {/* Background Glows */}
      <div
        className="absolute top-0 right-0 w-125 h-125 rounded-none blur-[160px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #00BDCA, transparent 70%)",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-100 h-100 rounded-none blur-[130px] pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, #FF592C, transparent 70%)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Tag */}
        <div className="flex justify-center mb-1">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-none bg-[#00BDCA] animate-pulse inline-block"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
              About Me
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">
          {/* Left Side: Profile Card */}
          <div className="flex flex-col gap-5">
            <div
              className="relative rounded-md overflow-hidden w-full group"
              style={{
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
              }}
            >
              <img
                src={image.src || image}
                alt="Iqbal — Software Engineer"
                className="w-full h-112.5 object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-md font-black text-white">
                  Md Iqbal Hossen
                </h3>
                <p className="text-sm font-bold text-[#00BDCA]">
                  Software Engineer
                </p>
              </div>
            </div>

            {/* Education Card */}
            <div className="grid grid-cols-1 gap-4">
              <div
                className="p-4 rounded-md flex items-center gap-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="w-10 h-10 rounded-md bg-[#00BDCA]/10 flex items-center justify-center text-[#00BDCA]">
                  <i className="fa-solid fa-graduation-cap text-sm"></i>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Education
                  </p>
                  <p className="text-xs font-bold text-white leading-tight">
                    BSc in CSE, Asian University of Bangladesh (AUB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Description & Experience */}
          <div className="flex flex-col gap-8 lg:pt-4">
            <div>
              <h2 className="text-xl md:text-4xl font-black text-white leading-[1.1] mb-4">
                I build digital solutions that <br />
                <span
                  style={{
                    background: "linear-gradient(135deg,#00BDCA,#FF592C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Drive Strategic Growth.
                </span>
              </h2>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-3xl">
                Hey, I'm <span className="text-white font-bold">Iqbal</span> — a
                dedicated Software Engineer with a passion for building
                high-performance web applications. I specialize in the{" "}
                <span className="text-white font-semibold">
                  MERN Stack & PHP
                </span>
                , focusing on clean architecture and seamless user experiences.
              </p>
            </div>

            {/* Work History Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <div
                className="p-3 md:p-5 rounded-md relative overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="absolute top-0 right-0 p-2 md:p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <i className="fa-solid fa-briefcase text-md md:text-4xl text-[#FF592C]"></i>
                </div>
                <p className="text-[#FF592C] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">
                  2025 - Present
                </p>
                <h4 className="text-sm md:text-lg font-black text-white leading-tight">
                  SetsTech
                </h4>
                <p className="text-[10px] md:text-sm text-slate-500 font-medium">
                  Full Stack Dev
                </p>
              </div>

              <div
                className="p-3 md:p-5 rounded-md relative overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="absolute top-0 right-0 p-2 md:p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <i className="fa-solid fa-clock-rotate-left text-md md:text-4xl text-[#00BDCA]"></i>
                </div>
                <p className="text-[#00BDCA] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">
                  2024 - 2025
                </p>
                <h4 className="text-sm md:text-lg font-black text-white leading-tight">
                  TeamCipher
                </h4>
                <p className="text-[10px] md:text-sm text-slate-500 font-medium">
                  Software Engineer
                </p>
              </div>
            </div>

            {/* Core Skills Tags */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((sk, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-[11px] font-black border border-white/5 bg-white/5"
                    style={{ color: sk.color }}
                  >
                    {sk.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row items-center gap-3 mt-4">
              <Link href="/projects"
                className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-black text-white text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00BDCA, #009aa6)",
                  boxShadow: "0 4px 15px rgba(0,189,202,0.3)",
                }}
              >
                View Projects
              </Link>
              <Link href="/contact"
                className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-black text-white text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #FF592C, #e04a1f)",
                  boxShadow: "0 4px 15px rgba(255,89,44,0.3)",
                }}
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
