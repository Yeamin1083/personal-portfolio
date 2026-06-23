"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Code2, ArrowRight } from "lucide-react";
import SectionHoverEffect from "@/components/3d/SectionHoverEffect";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  githubUrl?: string | null;
  image?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Enterprise Insurance & Payment Systems",
    category: "FinTech & Enterprise",
    year: "2024",
    description: "Enterprise-grade workflows for premium collection, transaction processing, and operational reporting automation. Engineered with scalability, security, and high reliability.",
    tech: ["Oracle SQL", "REST APIs", "Automation", "Reporting"],
    image: "/projects/p1.png"
  },
  {
    id: 2,
    title: "Self-Onboarding Platform",
    category: "User Acquisition Flow",
    year: "2023",
    description: "Developed secure onboarding systems featuring OTP verification, complex multi-step form workflows, and dynamic UI handling for frictionless customer registration.",
    tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/p2.png"
  },
  {
    id: 3,
    title: "Retail POS & Management Dashboard",
    category: "Infrastructure",
    year: "2022",
    description: "Cloud-based Point of Sale and inventory workflow system featuring real-time dashboards, user role management, operational interfaces, and sales charts.",
    tech: ["Laravel", "PHP", "MySQL", "MVC"],
    image: "/projects/p3.png"
  },
  {
    id: 4,
    title: "Automotive Job & Listing Platform",
    category: "Full-Stack Web App",
    year: "2021",
    description: "Laravel and Python-based listing platform with secure authentication, image-based job posts, robust search pagination, and custom filters.",
    tech: ["Java", "Django", "Python", "MySQL"],
    githubUrl: "https://github.com/Yeamin1083/Java-Car-Application",
    image: "/projects/p4.png"
  }
];

export default function ProjectsView() {
  const [filterTech, setFilterTech] = useState<string | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (!filterTech) return true;
    return p.tech.includes(filterTech);
  });

  // Get all unique tech tags
  const allTechTags = Array.from(
    new Set(PROJECTS_DATA.flatMap((p) => p.tech))
  );

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 text-zinc-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
            <Sparkles className="text-cyan-400 w-5 h-5 animate-pulse" /> Production Projects
          </h2>
          <p className="text-zinc-400 text-sm mt-1">Enterprise systems, platforms, and application suites.</p>
        </div>

        {/* Tech Tag Filters */}
        <div className="flex flex-wrap gap-1.5 max-w-md">
          <button
            onClick={() => setFilterTech(null)}
            className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-all ${
              !filterTech
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                : "bg-zinc-800 border-zinc-700 hover:border-zinc-600 text-zinc-400"
            }`}
          >
            ALL
          </button>
          {allTechTags.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilterTech(tech)}
              className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-all ${
                filterTech === tech
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                  : "bg-zinc-800 border-zinc-700 hover:border-zinc-600 text-zinc-400"
              }`}
            >
              {tech.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <SectionHoverEffect
            key={project.id}
            glowColor="0,229,255"
            glowIntensity={0.06}
            enableParticles={true}
            enableEdgeGlow={true}
            as="div"
            className="border border-white/5 bg-zinc-900/20 rounded-3xl p-6 md:p-8 hover:bg-zinc-900/40 transition-colors overflow-hidden group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Info Pane */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-0.5 rounded-full">
                    {project.year}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="pt-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-cyan-400 transition-colors"
                    >
                      <Github size={14} /> View Source Code <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-zinc-500 font-mono text-xs cursor-default select-none">
                      🔐 Source Code Closed (Enterprise IP)
                    </span>
                  )}
                </div>
              </div>

              {/* Image Pane */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full aspect-[16/10] bg-black/60 border border-white/5 group-hover:border-cyan-500/30 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 shadow-2xl">
                  {project.image ? (
                    <>
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay z-10 pointer-events-none" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-50 group-hover:opacity-90 transition-all duration-[1.2s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 pointer-events-none" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]" />
                      <Code2 size={40} className="text-zinc-600 group-hover:text-cyan-400/50 group-hover:scale-110 transition-all duration-500" />
                    </>
                  )}
                </div>
              </div>

            </div>
          </SectionHoverEffect>
        ))}
      </div>

    </div>
  );
}
