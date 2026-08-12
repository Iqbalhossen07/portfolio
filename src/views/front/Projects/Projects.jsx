"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb/Breadcrumb"; // পাথ নিশ্চিত করুন

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">

      {/* ব্রেডক্রাম্ব এখানে ডাটা সহ কল করলাম */}
      <Breadcrumb title="Projects" pageName="All Projects" />

      {/* PROJECTS LIST SECTION */}
      <section
        id="projects"
        className="py-12 md:py-16 relative overflow-hidden "
      >
        {/* Floating Glows */}
        <div
          className="absolute top-[15%] right-[-200px] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-none blur-[150px] md:blur-[200px] pointer-events-none opacity-[0.08]"
          style={{ background: "#14b8a6" }}
        ></div>
        <div
          className="absolute bottom-[10%] left-[-200px] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-none blur-[150px] md:blur-[200px] pointer-events-none opacity-[0.08]"
          style={{ background: "#f97316" }}
        ></div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-12 md:mb-20">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md mb-6"
              style={{
                border: "1px solid rgba(20, 184, 166, 0.2)",
                background: "rgba(20, 184, 166, 0.05)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-none bg-[#14b8a6] animate-pulse inline-block"></span>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                Featured Portfolio
              </span>
            </div>
            <h2 className="text-xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-4">
              Projects That{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#14b8a6,#f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ship.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              <div className="text-center py-20">
                 <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-slate-400 font-bold tracking-wider">LOADING PROJECTS...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 text-slate-500 font-bold">No projects found.</div>
            ) : projects.map((p, pi) => {
              const accentColor = pi % 2 === 0 ? "#14b8a6" : "#f97316";
              
              // Process tags (first 4 techs)
              let tags = [];
              try {
                 const techsArray = Array.isArray(p.techs) ? p.techs : (p.techs ? JSON.parse(p.techs) : []);
                 tags = techsArray.slice(0, 4).map(t => t.name);
              } catch(e) {}

              return (
                <div
                  key={p.id}
                  className="group relative rounded-md overflow-hidden transition-all duration-500 hover:scale-[1.005]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                      <img
                        src={p.mainImageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <span
                          className="px-3 py-1.5 rounded-md text-[10px] font-black text-white backdrop-blur-md"
                          style={{
                            background: "rgba(0,0,0,0.5)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          ★ {p.year || new Date().getFullYear()} PROJECT
                        </span>
                      </div>
                    </div>

                    <div className="p-5 md:p-6 flex flex-col flex-grow relative">
                      <div className="flex items-center gap-2 mb-6">
                        <span
                          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-black"
                          style={{
                            background: "rgba(20, 184, 166, 0.1)",
                            border: "1px solid rgba(20, 184, 166, 0.2)",
                            color: "#2dd4bf",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse"></span>
                          {p.liveLink ? "Live Project" : "Completed"}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-white mb-2 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2">
                        {p.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-md text-[9px] font-bold border border-white/5 bg-white/5 text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <Link href={`/project-details/${p.id}`}
                          className="inline-flex items-center gap-2 px-5 py-2  font-black text-xs text-white transition-all duration-300 hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                          }}
                        >
                          Project Details
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </Link>
                        {p.liveLink && (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
              <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black text-white mb-3">
                Let's work together.
              </h2>
              <p className="text-slate-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
                I'm always open to exciting projects and new challenges. Let's
                build something great.
              </p>
              <div className="flex flex-row items-center justify-center gap-2 md:gap-3 w-full px-2">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-7 md:py-3.5 
                   font-black text-[11px] md:text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 flex-1 sm:flex-none"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                    boxShadow: "0 6px 20px rgba(20, 184, 166, 0.3)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <i className="fa-solid fa-paper-plane text-[10px] md:text-xs"></i>
                  <span className="whitespace-nowrap">Get in Touch</span>
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 md:px-7 md:py-3.5 r
                   font-black text-[11px] md:text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 flex-1 sm:flex-none"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <i className="fa-solid fa-comments text-[10px] md:text-xs"></i>
                  <span className="whitespace-nowrap">Let's Talk</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
