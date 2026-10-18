"use client";

import React from "react";
import { PORTFOLIO_DATA, Project } from "@/lib/portfolioData";
import { ArrowUpRight, Github, ShieldCheck, Database, Layers, Cpu, Code2, CheckCircle2, Lock } from "lucide-react";

const getDomainIcon = (category: string) => {
  if (category.toLowerCase().includes("sql") || category.toLowerCase().includes("database") || category.toLowerCase().includes("fintech")) {
    return <Database size={16} className="text-cyan-400" />;
  }
  if (category.toLowerCase().includes("acquisition") || category.toLowerCase().includes("user") || category.toLowerCase().includes("flow")) {
    return <Layers size={16} className="text-purple-400" />;
  }
  if (category.toLowerCase().includes("pos") || category.toLowerCase().includes("infrastructure") || category.toLowerCase().includes("erp")) {
    return <Cpu size={16} className="text-amber-400" />;
  }
  return <Code2 size={16} className="text-emerald-400" />;
};

export default function Projects() {
  return (
    <section id="work" className="w-full scroll-mt-4 bg-surface text-white py-24 md:py-32 relative z-10 rounded-t-[2.5rem] md:rounded-t-[3.5rem] -mt-10 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-cyan-400/80" />
              <span className="text-xs uppercase tracking-[0.25em] text-muted font-mono">02 / Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-tight text-white">
              Selected Works
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted max-w-md font-sans leading-relaxed">
            Engineered systems, transactional data pipelines, and full-stack software built for production resilience and scale.
          </p>
        </div>
        
        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} total={PORTFOLIO_DATA.projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ 
  project, 
  index, 
  total 
}: { 
  project: Project; 
  index: number; 
  total: number;
}) => {
  const projectNumber = String(index + 1).padStart(2, "0");
  const totalCount = String(total).padStart(2, "0");

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/10 hover:border-white/20 p-7 md:p-8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/5">
      {/* Subtle Top Accent Glow */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover:via-cyan-400/50 transition-all duration-500" />

      {/* Card Upper Section */}
      <div>
        {/* Header Metadata Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              {getDomainIcon(project.category)}
            </div>
            <span className="text-xs uppercase font-mono tracking-wider text-muted">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400/90 font-semibold tracking-wider">
              SYS {projectNumber}/{totalCount}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted">
              {project.year}
            </span>
          </div>
        </div>

        {/* Role Tag if present */}
        {project.role && (
          <div className="mb-2">
            <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-muted/80">
              Role: <span className="text-gray-300 font-medium">{project.role}</span>
            </span>
          </div>
        )}

        {/* Project Title */}
        <h3 className="text-2xl font-playfair font-bold text-white group-hover:text-primary transition-colors mb-3 leading-snug">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-300/85 leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Key Architectural Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6 rounded-xl bg-black/40 border border-white/5 p-4 space-y-2.5">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Core Technical Highlights
            </p>
            <ul className="space-y-2">
              {project.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="text-xs text-gray-300/90 flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 size={13} className="text-cyan-400/80 mt-0.5 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Bottom Section */}
      <div className="pt-4 border-t border-white/5">
        {/* Tech Stack Chips */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-md text-xs font-mono tracking-wide text-gray-300 bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link / Enterprise Status */}
        <div className="flex items-center justify-between pt-2">
          {project.githubUrl ? (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-gray-200 transition-all duration-200 shadow-md group-hover:shadow-cyan-500/10"
            >
              <Github size={14} />
              <span>View Source</span>
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-muted">
              <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
              <span className="text-gray-300">Enterprise Internal System</span>
              <Lock size={11} className="text-muted/60 ml-1" />
            </div>
          )}

          <span className="text-[11px] font-mono text-muted/60 uppercase tracking-widest hidden sm:inline-block">
            Production Ready
          </span>
        </div>
      </div>
    </div>
  );
};
