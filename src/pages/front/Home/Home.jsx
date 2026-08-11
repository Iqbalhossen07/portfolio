"use client";

import React from "react";
import Hero from "./Hero/Hero";
import LogoMarquee from "./LogoMarquee/LogoMarquee";
import About from "./About/About";
import Projects from "./Projects/Projects";
import Services from "./Services/Services";
import Process from "./Process/Process";
import CTA from "./CTA/CTA";


const Home = () => {
  return (
    <div>
      <Hero />
      <LogoMarquee />
      <About />
      <Projects />
      <Services />
      <Process />
      <CTA />
    </div>
  );
};

export default Home;
