"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // ইঞ্জিন ইনিশিয়ালাইজেশন
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 0, // জাস্ট ব্যাকগ্রাউন্ডে রাখার জন্য ০ সেট করলাম
      },
      particles: {
        number: {
          value: 80, // আপনার আগের ডিজাইনের ভ্যালু
          density: { enable: true, area: 800 },
        },
        color: {
          value: "#14b8a6", // ওশান ব্লু / টিল কালার
        },
        shape: { type: "circle" },
        opacity: {
          value: 0.3, // হালকা অপাসিটি
          random: false,
        },
        size: {
          value: { min: 1, max: 2 }, // ছোট সাইজ প্রফেশনাল লাগে
          random: true,
        },
        links: {
          enable: true,
          distance: 150,
          color: "#14b8a6",
          opacity: 0.15, // হালকা লাইন
          width: 1,
        },
        move: {
          enable: true,
          speed: 1, // শান্ত মুভমেন্ট
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        detect_on: "window",
        events: {
          onHover: {
            enable: true,
            mode: "grab", // আপনার পছন্দের গ্র্যাব মোড
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            links: { opacity: 0.5 }, // মাউস নিলে কানেকশন উজ্জ্বল হবে
          },
          push: {
            quantity: 4,
          },
        },
      },
      retina_detect: true,
      // মাউস যাতে পেছনের কন্টেন্টে ক্লিক করতে পারে (pointer-events-none এর কাজ)
      style: {
        pointerEvents: "none",
      },
    }),
    [],
  );

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return null;
};

export default ParticlesBackground;
