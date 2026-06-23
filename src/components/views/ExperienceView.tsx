"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Calendar, CheckCircle, CircleDot, Briefcase } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  desc: string;
  highlights: string[];
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Officer",
    company: "Guardian Life Insurance Limited",
    period: "Present (Full-Time)",
    desc: "Managing core enterprise systems and financial operations. Directing optimizations for transaction processing, billing collections, and administrative databases.",
    highlights: [
      "Optimized enterprise database query runtimes by 30%.",
      "Created automated operational reporting scripts.",
      "Integrated secure payment and insurance billing workflows."
    ]
  },
  {
    role: "Industrial Attachment Trainee",
    company: "Brain Station 23",
    period: "Sep 2023",
    desc: "Engaged in an intensive backend and web development cohort focused on scalability, system architecture, and modern JS/TS web application flows.",
    highlights: [
      "Built clean, modular API services with Express and Node.js.",
      "Collaborated in Git-flow agile teams under lead mentors.",
      "Conducted extensive peer testing and code reviews."
    ]
  },
  {
    role: "Senior Executive, Web Dev Wing",
    company: "UITS Computer Club",
    period: "2021 - 2024",
    desc: "Administered development workshops, guided junior programmers, and represented the university club in competitive hackathons.",
    highlights: [
      "Spearheaded web workshops for over 150+ student participants.",
      "Co-managed UITS Computer Club landing page and event portals.",
      "Won 5th place in the UITS Victory Day Programming Contest (2021)."
    ]
  }
];

export default function ExperienceView() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 text-zinc-100">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
          <Briefcase className="text-cyan-400 w-5 h-5" /> Professional Experience
        </h2>
        <p className="text-zinc-400 text-sm mt-1">My industry career, trainee internships, and engineering leadership.</p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-cyan-500/20 pl-6 ml-4 space-y-12">
        
        {EXPERIENCE_DATA.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative"
          >
            {/* Circle Node indicator */}
            <div className="absolute -left-[32px] top-1.5 w-4 h-4 bg-zinc-950 rounded-full border-2 border-cyan-400 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Glowing path tracker lines on hover */}
            <div className="border border-white/5 bg-zinc-900/30 rounded-2xl p-6 md:p-8 space-y-4 hover:border-cyan-400/30 hover:bg-zinc-900/50 transition-all duration-300 shadow-xl group">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-cyan-400/80">
                    {exp.company}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 border border-zinc-700 bg-zinc-800 px-3 py-1 rounded-full w-fit">
                  <Calendar size={12} className="text-cyan-400" /> {exp.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed">
                {exp.desc}
              </p>

              {/* Highlights bullets */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// Key Contributions</p>
                <ul className="space-y-2.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <CheckCircle size={14} className="text-cyan-400 mt-1 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        ))}

      </div>

    </div>
  );
}
