"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Contact from "@/components/sections/Contact";
import { Github, Linkedin, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";

export default function Home() {
  return (
    <main className="w-full bg-black selection:bg-white/30 text-white min-h-screen">
      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
        <div className="font-playfair font-bold tracking-widest uppercase">
          Yeamin.
        </div>
        
        <div className="flex gap-6 pointer-events-auto">
          <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noreferrer" className="hover:text-gray-400 transition-colors">
            <Github size={20} />
          </a>
          <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-gray-400 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="hover:text-gray-400 transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>

      <Hero />
      <About />
      <Projects />
      <ExperienceTimeline />
      <Contact />
    </main>
  );
}