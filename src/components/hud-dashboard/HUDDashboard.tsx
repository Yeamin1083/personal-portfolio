"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Github, ExternalLink, Mail, Phone, MapPin, CheckCircle, Activity, Server, Layout, Database } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import SectionHoverEffect from "@/components/3d/SectionHoverEffect";

export default function HUDDashboard() {
  const [filterTech, setFilterTech] = useState<string | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (!filterTech) return true;
    return p.tech.includes(filterTech);
  });

  const allTechTags = Array.from(
    new Set(PORTFOLIO_DATA.projects.flatMap((p) => p.tech))
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-20 text-zinc-100 select-text">
      
      {/* SECTION 1: HUD HERO PROFILE */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-b border-white/5 pb-16">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border rounded-full border-cyan-500/30 bg-cyan-950/20 text-cyan-400">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cyan-400"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400"></span>
            </span>
            Active System: {PORTFOLIO_DATA.profile.title} @ Guardian Life
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-orbitron leading-[1.1] text-white">
            Yeamin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">Islam</span>
          </h1>
          <h2 className="text-lg md:text-xl font-mono text-cyan-400/80 tracking-wider">
            &gt; Software Engineer // Backend &amp; Data Optimizations
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
            {PORTFOLIO_DATA.profile.bio} Specializing in database refactoring, automation triggers, FinTech frameworks, and responsive interactive web experiences.
          </p>

          {/* Quick HUD specs table */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 max-w-xl">
            <div className="p-3 border border-white/5 bg-zinc-900/30 rounded-xl">
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">Location</span>
              <span className="text-sm font-semibold text-zinc-200">Dhaka, Bangladesh</span>
            </div>
            <div className="p-3 border border-white/5 bg-zinc-900/30 rounded-xl">
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">Degree Specialization</span>
              <span className="text-sm font-semibold text-zinc-200">Data Science</span>
            </div>
            <div className="p-3 border border-white/5 bg-zinc-900/30 rounded-xl col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">Operations Engine</span>
              <span className="text-sm font-semibold text-cyan-400 font-mono">NextJS / Oracle SQL</span>
            </div>
          </div>
        </div>

        {/* Cyber Hologram Sphere Graphic */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative w-56 h-56 rounded-full border border-cyan-500/20 bg-cyan-950/5 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.06)] group">
            {/* Spinning ring 1 */}
            <div className="absolute w-[95%] h-[95%] rounded-full border-2 border-dashed border-cyan-400/10 animate-[spin_30s_linear_infinite]" />
            {/* Spinning ring 2 */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
            {/* Core core */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-500">
              <Activity className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYSTEM ARSENAL (SKILLS) */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
            <Sparkles className="text-cyan-400 w-5 h-5 animate-pulse" /> Technical Capabilites
          </h2>
          <p className="text-zinc-400 text-sm mt-1">Classified technical skillsets mapped by stack layer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((group, idx) => {
            const isBackend = group.category.includes("Backend");
            const isFrontend = group.category.includes("Frontend");
            const Icon = isBackend ? Server : isFrontend ? Layout : Database;

            return (
              <div
                key={idx}
                className="border border-white/5 bg-zinc-900/25 p-6 rounded-2xl space-y-4 hover:border-cyan-400/20 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Accent glow corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${group.color} opacity-5 group-hover:opacity-10 blur-xl transition-opacity`} />
                
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-850 flex items-center justify-center text-cyan-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold font-orbitron tracking-wide text-zinc-100">{group.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs bg-zinc-950/80 border border-white/5 rounded-md text-zinc-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: FILTERED PROJECTS */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
              <Activity className="text-cyan-400 w-5 h-5" /> Production Releases
            </h2>
            <p className="text-zinc-400 text-sm mt-1">Enterprise systems, portal interfaces, and applications.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5 max-w-md">
            <button
              onClick={() => setFilterTech(null)}
              className={`px-2.5 py-1 text-xs rounded border font-mono transition-all ${
                !filterTech
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              ALL
            </button>
            {allTechTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTech(tag)}
                className={`px-2.5 py-1 text-xs rounded border font-mono transition-all ${
                  filterTech === tag
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <SectionHoverEffect
              key={project.id}
              glowColor="6,182,212"
              glowIntensity={0.05}
              enableParticles={false}
              as="div"
              className="border border-white/5 bg-zinc-900/20 p-6 rounded-2xl flex flex-col justify-between hover:bg-zinc-900/40 transition-colors group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                    {project.year}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-xs leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[9px] font-mono bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-400 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Github size={14} /> Repository <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="text-zinc-500 cursor-default select-none">
                    🔐 Protected Payload
                  </span>
                )}
              </div>
            </SectionHoverEffect>
          ))}
        </div>
      </section>

      {/* SECTION 4: TIMELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-white/5 pt-16">
        {/* Experience */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-orbitron text-white">Career Log</h2>
            <p className="text-zinc-400 text-sm mt-1">Professional timeline logs.</p>
          </div>

          <div className="border-l border-zinc-800 pl-4 ml-2 space-y-8">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-cyan-400 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-cyan-400" />
                </div>
                <div className="flex justify-between items-start text-xs font-mono text-zinc-400">
                  <span className="text-cyan-400 font-semibold uppercase">{exp.role}</span>
                  <span>{exp.period}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{exp.company}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-orbitron text-white">Academics</h2>
            <p className="text-zinc-400 text-sm mt-1">Degree archives.</p>
          </div>

          <div className="border-l border-zinc-800 pl-4 ml-2 space-y-8">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-purple-500 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-purple-500" />
                </div>
                <div className="text-xs font-mono text-purple-400 font-semibold uppercase">
                  {edu.degree}
                </div>
                <h4 className="text-sm font-bold text-white">{edu.institution}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT SECURE FORM */}
      <section className="border-t border-white/5 pt-16 max-w-xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-orbitron text-white flex items-center justify-center gap-2">
            <Mail className="text-cyan-400 w-5 h-5" /> secure_connect.sh
          </h2>
          <p className="text-zinc-400 text-sm mt-1">Send a direct message packet to my inbox endpoint.</p>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            alert("Packet transmission request compiled! Connecting to endpoint...");
          }} 
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-zinc-900 border border-zinc-850 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-zinc-900 border border-zinc-850 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white"
              required
            />
          </div>
          <textarea
            placeholder="Payload Details..."
            rows={4}
            className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-400 focus:outline-none rounded-xl p-3 text-xs text-white resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-500 font-bold text-xs text-black transition-all hover:scale-[1.01]"
          >
            TRANSMIT PACKET
          </button>
        </form>

        <div className="flex justify-center gap-6 pt-4 text-xs font-mono text-zinc-500">
          <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            GITHUB
          </a>
          <span>/</span>
          <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            LINKEDIN
          </a>
        </div>
      </section>

    </div>
  );
}
