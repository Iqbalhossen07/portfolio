"use client";

import React from "react";

const LogoMarquee = () => {
  const logos = [
    {
      name: "Google",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    },
    {
      name: "Facebook",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    },
    {
      name: "Instagram",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png",
    },
    {
      name: "YouTube",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/youtube/youtube-original.svg",
    },
    {
      name: "GitHub",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "LinkedIn",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    },
    {
      name: "Discord",
      img: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
    },
    {
      name: "Slack",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    },
    {
      name: "Twitter/X",
      img: "https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png",
    },
    {
      name: "Spotify",
      img: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    },
    {
      name: "WhatsApp",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/120px-WhatsApp.svg.png",
    },
    {
      name: "TikTok",
      img: "https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png",
    },
  ];

  //Seamless লুপের জন্য ডুপ্লিকেট অ্যারে
  const doubleLogos = [...logos, ...logos];

  return (
    <section className="logo-marquee-section py-12 md:py-16 overflow-hidden relative">
      {/* দুই পাশের ফেড ইফেক্ট (Gradient Overlay) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none select-none"
        style={{
          background:
            "linear-gradient(to right, var(--bg-body) 0%, transparent 15%, transparent 85%, var(--bg-body) 100%)",
        }}
      ></div>

      <div className="text-center mb-8 md:mb-10 relative z-20 px-4">
        <p
          className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]"
          style={{ color: "var(--text-muted)" }}
        >
          Technologies & Platforms I Work With
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* ইনফিনিট অ্যানিমেশন কন্টেইনার */}
        <div className="flex gap-4 md:gap-6 animate-logo-marquee whitespace-nowrap">
          {doubleLogos.map((logo, index) => (
            <div
              key={index}
              className="logo-pill flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-md transition-all duration-300 border border-white/10 bg-white/5 hover:bg-[#14b8a6]/10 hover:border-[#14b8a6]/30"
              style={{ background: "rgba(255, 255, 255, 0.03)" }}
            >
              <img
                src={logo.img}
                alt={logo.name}
                className="w-4 h-4 md:w-5 md:h-5 object-contain"
                loading="lazy"
              />
              <span className="text-sm md:text-base font-bold text-slate-300 hover:text-white transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
