"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { Cpu, Layers, Database, MapPin, Sparkles } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Backend Engine": <Cpu size={16} className="text-cyan-400" />,
  "Frontend Deck": <Layers size={16} className="text-purple-400" />,
  "Database Layer": <Database size={16} className="text-amber-400" />,
};

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = PORTFOLIO_DATA.profile.bio.split(" ");

  return (
    <section ref={container} className="w-full py-20 md:py-28 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-[1px] bg-muted/60" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted font-mono">01 / Summary</span>
        </div>

        {/* Streamlined Statement / Bio */}
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair leading-[1.35] text-primary/95 max-w-5xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Quick Highlights Strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/10 py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <MapPin size={14} className="text-muted" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Location</p>
              <p className="text-sm font-medium text-primary">Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Sparkles size={14} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Core Focus</p>
              <p className="text-sm font-medium text-primary">Full-Stack & Data Pipelines</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Availability</p>
              <p className="text-sm font-medium text-primary">Open to Technical Roles</p>
            </div>
          </div>
        </div>

        {/* Streamlined Skills Capability Matrix */}
        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Technical Disciplines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PORTFOLIO_DATA.skills.map((group, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold tracking-wider text-primary">{group.category}</h4>
                    {categoryIcons[group.category] || <Sparkles size={16} className="text-muted" />}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:border-white/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

const Word = ({ children, progress, range }: { children: string; progress: any; range: number[] }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span 
      style={{ opacity }} 
      className="inline-block mr-[0.32em] text-white font-medium transition-opacity"
    >
      {children}
    </motion.span>
  );
};
