"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumb from "../Contact/Breadcrumb/Breadcrumb";


// আলাদা ছোট কম্পোনেন্ট: Contact Card (হোভার ইফেক্ট ঠিক রাখার জন্য)
const ContactLink = ({ c }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={c.href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 p-4 rounded-md group transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: isHovered ? `${c.gfrom}0a` : "rgba(255,255,255,0.02)",
        border: `1px solid ${isHovered ? `${c.gfrom}44` : "rgba(255,255,255,0.05)"}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${c.gfrom}, ${c.gto})`,
          boxShadow: `0 4px 14px ${c.glow}`,
        }}
      >
        <i
          className={`${c.icon.includes("fa-brands") ? c.icon : "fa-solid " + c.icon} text-white text-sm`}
        ></i>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] font-black uppercase tracking-wider text-slate-600">
          {c.label}
        </div>
        <div className="text-sm font-bold text-slate-300 truncate mt-0.5">
          {c.val}
        </div>
      </div>
      <i className="fa-solid fa-arrow-up-right-from-square text-slate-700 text-xs group-hover:text-teal-400 transition-colors duration-200"></i>
    </a>
  );
};

// আলাদা ছোট কম্পোনেন্ট: Social Link (হোভার ইফেক্ট ঠিক রাখার জন্য)
const SocialLink = ({ s }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={s.href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-black transition-all duration-200 hover:scale-105"
      style={{
        background: isHovered ? `${s.c}0a` : "rgba(255,255,255,0.03)",
        border: `1px solid ${isHovered ? `${s.c}33` : "rgba(255,255,255,0.06)"}`,
        color: isHovered ? s.c : "rgba(148,163,184,0.7)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className={`fa-brands ${s.icon} text-sm`}></i>
      {s.label}
    </a>
  );
};

const Contact = () => {
  const [selectedBudget, setSelectedBudget] = useState("");

  const budgets = ["< $100", "$100–$300", "$300–$600", "$600–$1000", "$1000+"];

  const avail = [
    {
      label: "Response Time",
      val: "Within 24 hours",
      icon: "fa-bolt",
      c: "#14b8a6",
    },
    { label: "Availability", val: "Everyday", icon: "fa-clock", c: "#f97316" },
    {
      label: "Timezone",
      val: "BST (UTC+6)",
      icon: "fa-earth-asia",
      c: "#14b8a6",
    },
    {
      label: "Preferred",
      val: "Email / WhatsApp",
      icon: "fa-comments",
      c: "#f97316",
    },
  ];

  const contacts = [
    {
      icon: "fa-envelope",
      label: "Email",
      val: "iqbalhossen0711@gmail.com",
      href: "mailto:iqbalhossen0711@gmail.com",
      gfrom: "#14b8a6",
      gto: "#0d9488",
      glow: "rgba(20,184,166,0.3)",
    },
    {
      icon: "fa-brands fa-whatsapp",
      label: "WhatsApp",
      val: "+880 1781834638",
      href: "https://wa.me/8801781834638",
      gfrom: "#f97316",
      gto: "#ea580c",
      glow: "rgba(249,115,22,0.3)",
    },
    {
      icon: "fa-brands fa-linkedin",
      label: "LinkedIn",
      val: "linkedin.com/in/md-iqbal-hossen-cse",
      href: "https://www.linkedin.com/in/md-iqbal-hossen-cse/",
      gfrom: "#0A66C2",
      gto: "#0284c7",
      glow: "rgba(10,102,194,0.3)",
    },
  ];

  const socials = [
    { icon: "fa-github", href: "https://github.com/Iqbalhossen07", label: "GitHub", c: "#ffffff" },
    { icon: "fa-linkedin", href: "https://www.linkedin.com/in/md-iqbal-hossen-cse/", label: "LinkedIn", c: "#14b8a6" },
    { icon: "fa-twitter", href: "https://twitter.com", label: "Twitter", c: "#f97316" },
    { icon: "fa-facebook", href: "https://www.facebook.com/iqbalhossen03", label: "Facebook", c: "#14b8a6" },
    { icon: "fa-youtube", href: "https://youtube.com", label: "YouTube", c: "#f97316" },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // ফর্ম সাবমিটের এপিআই (API) কল এখানে বসবে
    console.log("Form Submitted", { selectedBudget });
  };

  return (
    <main className=" min-h-screen">
      {/* Breadcrumb Section */}
      <Breadcrumb title="Contact" pageName="Contact" />

      {/* Ambient glows */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-none blur-[220px] pointer-events-none opacity-[0.08] -z-0"
        style={{ background: "#14b8a6" }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-none blur-[200px] pointer-events-none opacity-[0.08] -z-0"
        style={{ background: "#f97316" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 pt-20 lg:grid-cols-[1fr_480px] gap-10 items-start">
          {/* ==================== LEFT — Contact Form ==================== */}
          <section
            className="rounded-md p-8 md:p-10 relative overflow-hidden transition-all duration-300"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, #14b8a6 30%, #f97316 70%, transparent)",
                opacity: 0.6,
              }}
            ></div>
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-none blur-[80px] opacity-[0.08] pointer-events-none"
              style={{ background: "#14b8a6" }}
            ></div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #f97316)",
                    boxShadow:
                      "0 4px 16px rgba(20, 184, 166, 0.3), 0 1px 0 rgba(255,255,255,0.2) inset",
                  }}
                >
                  <i className="fa-solid fa-paper-plane text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">
                    Send a Message
                  </div>
                  <h2 className="text-xl font-black text-white leading-tight">
                    Let's talk about your project
                  </h2>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Fill in the form below and I'll get back to you within 30
                Minutes.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                    Your Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-teal-400">
                      <i className="fa-solid fa-user text-slate-700 text-xs"></i>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Iqbal Hossen"
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-md text-sm font-semibold text-white placeholder-slate-700 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                    Email Address <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-teal-400">
                      <i className="fa-solid fa-envelope text-slate-700 text-xs"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-md text-sm font-semibold text-white placeholder-slate-700 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Subject <span className="text-orange-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-teal-400">
                    <i className="fa-solid fa-tag text-slate-700 text-xs"></i>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project inquiry / Collaboration..."
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-md text-sm font-semibold text-white placeholder-slate-700 outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Service Needed
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-teal-400">
                    <i className="fa-solid fa-gear text-slate-700 text-xs"></i>
                  </div>
                  <select
                    name="service"
                    className="w-full pl-10 pr-4 py-3.5 rounded-md text-sm font-semibold text-slate-400 outline-none appearance-none transition-all duration-200 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <option value="" style={{ background: "#0a0a0f" }}>
                      Select a service...
                    </option>
                    <option value="web-dev" style={{ background: "#0a0a0f" }}>
                      Web Development
                    </option>
                    <option value="backend" style={{ background: "#0a0a0f" }}>
                      Backend & API Dev
                    </option>
                    <option value="fullstack" style={{ background: "#0a0a0f" }}>
                      Full Stack Project
                    </option>
                    <option value="video" style={{ background: "#0a0a0f" }}>
                      Video Editing
                    </option>
                    <option value="design" style={{ background: "#0a0a0f" }}>
                      Graphic Design
                    </option>
                    <option value="other" style={{ background: "#0a0a0f" }}>
                      Other / Not Sure
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-700">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedBudget(b)}
                      className={`px-4 py-2 rounded-md text-xs font-black transition-all duration-200 border ${
                        selectedBudget === b
                          ? "border-teal-500/50 bg-teal-500/10 text-teal-400"
                          : "border-white/5 bg-white/5 text-slate-500 hover:text-teal-400 hover:border-teal-500/30"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Your Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-3.5 rounded-md text-sm font-semibold text-white placeholder-slate-700 outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-md font-black text-sm text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] mt-2"
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                  boxShadow: "0 8px 24px rgba(20, 184, 166, 0.3)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
                <span>Send Message</span>
              </button>
            </form>
          </section>

          {/* ==================== RIGHT — Info sidebar ==================== */}
          <div className="flex flex-col gap-5">
            {/* Currently Available Card */}
            <div
              className="rounded-md p-6 relative overflow-hidden transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 24px 56px rgba(0,0,0,0.50)",
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-none blur-[65px] opacity-[0.08] pointer-events-none"
                style={{ background: "#14b8a6" }}
              ></div>

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(20, 184, 166, 0.1)",
                    border: "1px solid rgba(20, 184, 166, 0.25)",
                  }}
                >
                  <i className="fa-solid fa-circle-check text-teal-400 text-sm"></i>
                </div>
                <div>
                  <div className="text-sm font-black text-white">
                    Currently Available
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider">
                    Taking on new projects
                  </div>
                </div>
                <span className="ml-auto w-2.5 h-2.5 rounded-none bg-teal-400 animate-pulse flex-shrink-0"></span>
              </div>

              <div className="flex flex-col gap-2.5">
                {avail.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-md transition-colors hover:bg-white/5"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <i
                      className={`fa-solid ${a.icon} text-[10px] flex-shrink-0`}
                      style={{ color: a.c }}
                    ></i>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                        {a.label}
                      </span>
                      <span className="text-[11px] font-black text-slate-300">
                        {a.val}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Card */}
            <div
              className="rounded-md p-6 relative overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">
                Direct Contact
              </div>
              <div className="flex flex-col gap-3">
                {contacts.map((c, idx) => (
                  <ContactLink key={idx} c={c} />
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div
              className="rounded-md p-6"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">
                Find Me Online
              </div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s, idx) => (
                  <SocialLink key={idx} s={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
