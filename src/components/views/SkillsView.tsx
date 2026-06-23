"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Server, Layout, Database, Sparkles, Cpu, CheckCircle } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // Percentage out of 100 for display
  desc: string;
}

const SKILL_CATEGORIES = [
  {
    name: "Backend Development",
    icon: Server,
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.15)",
    items: [
      { name: "PHP", level: 90, desc: "Laravel web apps & backend logic" },
      { name: "Python", level: 85, desc: "Django, data pipelines & scripts" },
      { name: "Go (Golang)", level: 75, desc: "Concurrent systems & microservices" },
      { name: "Java", level: 70, desc: "Object-oriented core systems" },
      { name: "REST APIs", level: 92, desc: "Secure endpoints & integrations" },
    ]
  },
  {
    name: "Frontend Development",
    icon: Layout,
    color: "from-purple-500 to-pink-500",
    glow: "rgba(168,85,247,0.15)",
    items: [
      { name: "Next.js", level: 88, desc: "Server-side rendering & layouts" },
      { name: "React.js", level: 90, desc: "Component architecture & hooks" },
      { name: "TypeScript", level: 85, desc: "Strongly-typed web logic" },
      { name: "Tailwind CSS", level: 95, desc: "Utility-first design & UI" },
      { name: "Three.js / React Three Fiber", level: 68, desc: "Immersive 3D web spaces" },
    ]
  },
  {
    name: "Database Systems",
    icon: Database,
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
    items: [
      { name: "Oracle SQL", level: 88, desc: "PL/SQL, enterprise procedures" },
      { name: "MySQL", level: 85, desc: "Relational modeling & queries" },
      { name: "PostgreSQL", level: 80, desc: "JSON query schemas & indices" },
      { name: "Operational Reporting", level: 90, desc: "Business data compilation" }
    ]
  },
  {
    name: "DevOps & Core Tools",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.15)",
    items: [
      { name: "Git & GitHub", level: 90, desc: "Version control & collaboration" },
      { name: "Agile / Scrum", level: 85, desc: "Project lifecycle management" },
      { name: "Docker", level: 70, desc: "Container deployment" },
      { name: "CI/CD", level: 72, desc: "Automated test & deploy pipelines" }
    ]
  }
];

export default function SkillsView() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 text-zinc-100">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
          <Sparkles className="text-cyan-400 w-5 h-5 animate-pulse" /> Technical Arsenal
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Click on any skill to run an diagnostic query on it.</p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.name}
              className="border border-white/5 bg-zinc-900/40 rounded-2xl p-6 space-y-6 hover:border-cyan-400/20 transition-all duration-300"
              style={{ boxShadow: `0 8px 32px ${category.glow}` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-black`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold font-orbitron text-white">{category.name}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-200 group-hover:text-cyan-400 font-medium transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-zinc-400 text-xs font-mono">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Terminal Diagnostic Console */}
      <div className="border border-white/10 bg-black/70 rounded-2xl p-5 font-mono text-xs md:text-sm text-green-400 shadow-2xl relative overflow-hidden">
        <div className="absolute top-2 right-4 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </div>
        <p className="text-zinc-500 select-none mb-3">// Interactive Skill Diagnostic Terminal</p>
        
        {selectedSkill ? (
          <div className="space-y-2">
            <p className="text-zinc-400">guest@yeamin-portfolio:~$ <span className="text-white">diagnose-skill --target "{selectedSkill.name}"</span></p>
            <p className="text-cyan-400">Analyzing capability module: {selectedSkill.name}...</p>
            <p className="text-zinc-300">Description: {selectedSkill.desc}</p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">Level Index:</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 border ${i < selectedSkill.level / 10 ? "bg-cyan-500 border-cyan-400" : "border-zinc-700"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-green-400 flex items-center gap-1.5 animate-pulse mt-2">
              <CheckCircle size={14} /> Diagnostic successful. Module fully responsive.
            </p>
          </div>
        ) : (
          <div className="text-zinc-400 flex items-center gap-2 h-20">
            <span className="animate-ping block w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Awaiting diagnostic query. Click on a skill to run status check.</span>
          </div>
        )}
      </div>

    </div>
  );
}
