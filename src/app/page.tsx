"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Contact from "@/components/sections/Contact";
import { Github, Linkedin, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [first, last] = PORTFOLIO_DATA.profile.name.split(" ");

  return (
    <main className="w-full bg-background selection:bg-white/30 text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full px-9 md:px-14 py-9 md:py-11 grid grid-cols-2 md:grid-cols-3 items-center z-50 mix-blend-difference text-white">
        <a href="#top" className="text-[11px] uppercase tracking-[0.4em]">
          <span className="font-semibold">{first}</span> <span className="text-white/50">{last}</span>
        </a>

        <nav className="hidden md:flex justify-center gap-12 text-[10px] uppercase tracking-[0.45em] text-white/70">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex justify-end gap-5 text-white/70">
          <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">
            <Github size={16} />
          </a>
          <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} aria-label="Email" className="hover:text-white transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </header>

      <Hero />
      <About />
      <Projects />
      <ExperienceTimeline />
      <Contact />
    </main>
  );
}
