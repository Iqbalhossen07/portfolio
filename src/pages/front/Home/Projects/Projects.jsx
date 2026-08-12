"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-teal-400 animate-pulse">Loading Projects...</div>;
  }

  return (
    <section id="projects" className="py-12 md:py-16 relative overflow-hidden ">
      {/* Background Glows - হুবহু আপনার পজিশন অনুযায়ী */}
      <div
        className="absolute top-[15%] -right-50 w-75 md:w-150 h-75 md:h-150 rounded-none blur-[150px] md:blur-[200px] pointer-events-none opacity-[0.08]"
        style={{ background: "#14b8a6" }}
      ></div>
      <div
        className="absolute bottom-[10%] -left-50 w-75 md:w-150 h-75 md:h-150 rounded-none blur-[150px] md:blur-[200px] pointer-events-none opacity-[0.08]"
        style={{ background: "#f97316" }}
      ></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
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

        {/* Projects List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {projects.slice(0, 3).map((p, pi) => (
            <div
              key={pi}
              className={`group relative rounded-md overflow-hidden transition-all duration-500 hover:scale-[1.005] ${pi === 0 ? "lg:col-span-2" : "col-span-1"}`}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className={`grid grid-cols-1 ${pi === 0 ? "lg:grid-cols-2" : "lg:grid-cols-1"} items-center`}>
                {/* Project Image */}
                <div className={`relative overflow-hidden ${pi === 0 ? "h-[250px] md:h-[350px] lg:h-[480px]" : "h-[250px] md:h-[300px]"}`}>
                  <img
                    src={p.mainImageUrl || "https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1169"}
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
                      ★ {p.year || "2024"} PROJECT
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8 md:p-12 lg:p-16 relative">
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black"
                      style={{
                        background: "rgba(20, 184, 166, 0.1)",
                        border: "1px solid rgba(20, 184, 166, 0.2)",
                        color: "#2dd4bf",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse"></span>
                      {p.category || "Live Project"}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-3xl  font-black text-white mb-4 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-8 max-w-md">
                    {p.shortDescription || p.type}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {Array.isArray(p.techs) && p.techs.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-md text-[10px] font-bold border border-white/5 bg-white/5 text-slate-500"
                      >
                        {tag.icon && <i className={`${tag.icon} mr-1`}></i>}
                        {tag.name || tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link href={`/project-details/${p.id}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5  text-xs font-black text-white transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, #14b8a6, #0d9488)`,
                          boxShadow: `0 10px 20px -5px rgba(20, 184, 166, 0.3)`,
                        }}
                      >
                        Details
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
                        <a href={p.liveLink} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5  text-xs font-black text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/10"
                          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i> Live
                        </a>
                      )}

                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-black text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/10"
                          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          <i className="fa-brands fa-github text-sm"></i> Code
                        </a>
                      )}
                    </div>
                    <span className="text-slate-800 font-black text-sm italic tracking-tighter">
                      #0{pi + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="flex justify-center mt-16 md:mt-24">
          <Link href="/projects"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-md font-black text-xs text-slate-500 border border-white/10 transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-[#14b8a6]"
          >
            See All Projects
            <div className="flex items-center -space-x-1">
              <div className="w-1.5 h-1.5 rounded-none bg-[#14b8a6]"></div>
              <div className="w-1.5 h-1.5 rounded-none bg-[#f97316]"></div>
            </div>
            <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
          </Link>
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/10 hover:border-teal-400 hover:bg-teal-400/10 text-white font-bold text-sm uppercase tracking-wider rounded-md transition-all duration-300 group"
          >
            View All Projects
            <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
