"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  // PHP এর date('Y') এর পরিবর্তে জাভাস্ক্রিপ্ট ইয়ার
  const currentYear = new Date().getFullYear();

  // Social Media Data
  const socials = [
    { icon: "fa-github", href: "https://github.com/Iqbalhossen07", label: "GitHub", c: "#ffffff" },
    { icon: "fa-linkedin", href: "https://www.linkedin.com/in/md-iqbal-hossen-cse/", label: "LinkedIn", c: "#14b8a6" },
    { icon: "fa-twitter", href: "https://twitter.com", label: "Twitter", c: "#f97316" },
    { icon: "fa-facebook", href: "https://www.facebook.com/iqbalhossen03", label: "Facebook", c: "#14b8a6" },
    { icon: "fa-youtube", href: "https://youtube.com", label: "YouTube", c: "#f97316" },
  ];

  // Quick Links Data
  const links = [
    { label: "Home", href: "/", icon: "fa-house" },
    { label: "About", href: "#about", icon: "fa-user" },
    { label: "Projects", href: "/projects", icon: "fa-layer-group" },
    { label: "Services", href: "#services", icon: "fa-gear" },
    { label: "Skills", href: "#skills", icon: "fa-code" },
    { label: "Contact", href: "/contact", icon: "fa-envelope" },
  ];

  // Services Data
  const servs = [
    "Web Development",
    "Backend & APIs",
    "Full Stack Apps",
    "Video Editing",
    "Graphic Design",
    "Maintenance",
  ];

  return (
    <footer className="relative overflow-hidden ">
      {/* Top Divider Line */}
      <div className="h-px w-full"></div>

      {/* Bottom Glow Effect */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-none blur-[160px] pointer-events-none opacity-[0.08]"
        style={{ background: "linear-gradient(135deg, #14b8a6, #0d9488)" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <Link href="/"
                className="inline-flex items-center gap-2 mb-4 group relative"
              >
                <img
                  className="w-20 md:w-20 transition-transform duration-300 group-hover:scale-105"
                  src="/logo.png"
                  alt="Iqbal Hossen Logo"
                />
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Full Stack Web Developer & Digital Creative based in Bangladesh.
                Building fast, scalable, and beautiful digital products — one
                project at a time.
              </p>
            </div>

            {/* Social Icons with Hover Logic */}
            <div className="flex items-center gap-3">
              {socials.map((s, index) => (
                <a
                  key={index}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-md flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(148,163,184,0.7)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = s.c;
                    e.currentTarget.style.borderColor = `${s.c}44`;
                    e.currentTarget.style.background = `${s.c}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(148,163,184,0.7)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.06)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <i className={`fa-brands ${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>

            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md w-fit"
              style={{
                background: "rgba(20, 184, 166, 0.08)",
                border: "1px solid rgba(20, 184, 166, 0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse inline-block"></span>
              <span className="text-[11px] font-black text-teal-400">
                Open to work — Let's connect!
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {links.map((l, index) => (
                <Link
                  key={index}
                  href={l.href}
                  className="flex items-center gap-2.5 text-sm font-semibold text-slate-500 transition-all duration-200 hover:text-white group/link w-fit"
                >
                  <i
                    className={`fa-solid ${l.icon} text-[10px] text-slate-800 group-hover/link:text-teal-400 transition-colors duration-200`}
                  ></i>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services List */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              {servs.map((sv, index) => (
                <span
                  key={index}
                  className="text-sm font-semibold text-slate-500 flex items-center gap-2 hover:text-slate-300 transition-colors duration-200 cursor-default"
                >
                  <span
                    className="w-1 h-1 rounded-none flex-shrink-0"
                    style={{ background: "#14b8a6" }}
                  ></span>
                  {sv}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div
          className="rounded-md p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <a
              href="mailto:iqbalhossen0711@gmail.com"
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors duration-200"
            >
              <i className="fa-solid fa-envelope text-teal-400 text-xs"></i>
              iqbalhossen0711@gmail.com
            </a>
            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
            <a
              href="tel:+8801781834638"
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors duration-200"
            >
              <i className="fa-solid fa-phone text-orange-400 text-xs"></i>
              +880 1781834638
            </a>
            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
            <span className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <i className="fa-solid fa-location-dot text-teal-400 text-xs"></i>
              Bangladesh
            </span>
          </div>

          <Link href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-black text-xs text-white transition-all duration-200 hover:scale-105 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              boxShadow: "0 4px 14px rgba(20, 184, 166, 0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Hire Me
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>

        {/* Copyright Bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[12px] font-semibold text-slate-700">
            © {currentYear} <span className="text-slate-600">Iqbal Hossen</span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
