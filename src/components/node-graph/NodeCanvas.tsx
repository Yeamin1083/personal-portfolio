"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, HelpCircle, Activity, RefreshCw } from "lucide-react";
import { PORTFOLIO_DATA, Project, SkillGroup } from "@/lib/portfolioData";
import PortfolioNode from "./PortfolioNode";

interface Position {
  x: number;
  y: number;
}

interface PositionsMap {
  [key: string]: Position;
}

export default function NodeCanvas() {
  // Initial coordinates on desktop
  const [positions, setPositions] = useState<PositionsMap>({
    profile: { x: 30, y: 150 },
    backend: { x: 400, y: 40 },
    frontend: { x: 400, y: 280 },
    database: { x: 400, y: 520 },
    filters: { x: 740, y: 40 },
    projects: { x: 740, y: 250 },
    timeline: { x: 740, y: 580 }
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (id: string, x: number, y: number) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x, y }
    }));
  };

  const resetPositions = () => {
    setPositions({
      profile: { x: 30, y: 150 },
      backend: { x: 400, y: 40 },
      frontend: { x: 400, y: 280 },
      database: { x: 400, y: 520 },
      filters: { x: 740, y: 40 },
      projects: { x: 740, y: 250 },
      timeline: { x: 740, y: 580 }
    });
  };

  // Node dimensions & socket offsets configuration
  const nodeSpecs: Record<string, { w: number; h: number; sockets: { inputs: Position[]; outputs: Position[] } }> = {
    profile: {
      w: 310,
      h: 280,
      sockets: {
        inputs: [],
        outputs: [
          { x: 310, y: 70 },  // Connects to backend
          { x: 310, y: 140 }, // Connects to frontend
          { x: 310, y: 210 }  // Connects to database
        ]
      }
    },
    backend: {
      w: 280,
      h: 200,
      sockets: {
        inputs: [{ x: 0, y: 100 }],
        outputs: [{ x: 280, y: 100 }]
      }
    },
    frontend: {
      w: 280,
      h: 200,
      sockets: {
        inputs: [{ x: 0, y: 100 }],
        outputs: [{ x: 280, y: 100 }]
      }
    },
    database: {
      w: 280,
      h: 200,
      sockets: {
        inputs: [{ x: 0, y: 100 }],
        outputs: [{ x: 280, y: 100 }]
      }
    },
    filters: {
      w: 280,
      h: 180,
      sockets: {
        inputs: [],
        outputs: [{ x: 280, y: 90 }] // Connects to projects
      }
    },
    projects: {
      w: 350,
      h: 300,
      sockets: {
        inputs: [
          { x: 0, y: 60 },  // from backend output
          { x: 0, y: 150 }, // from frontend output
          { x: 0, y: 240 }  // from database output
        ],
        outputs: []
      }
    },
    timeline: {
      w: 350,
      h: 200,
      sockets: {
        inputs: [{ x: 0, y: 100 }],
        outputs: []
      }
    }
  };

  // Helper to retrieve absolute socket position in the container coords
  const getSocketCoord = (nodeId: string, type: "input" | "output", socketIndex: number): Position => {
    const pos = positions[nodeId];
    const spec = nodeSpecs[nodeId];
    if (!pos || !spec) return { x: 0, y: 0 };
    
    const socket = type === "input" 
      ? spec.sockets.inputs[socketIndex] 
      : spec.sockets.outputs[socketIndex];
      
    if (!socket) return { x: 0, y: 0 };
    
    return {
      x: pos.x + socket.x,
      y: pos.y + socket.y
    };
  };

  // Connection definitions mapping
  const connections = [
    // Profile outputs to Skill inputs
    { from: { id: "profile", idx: 0 }, to: { id: "backend", idx: 0 }, color: "#06B6D4", skillMatch: null },
    { from: { id: "profile", idx: 1 }, to: { id: "frontend", idx: 0 }, color: "#A855F7", skillMatch: null },
    { from: { id: "profile", idx: 2 }, to: { id: "database", idx: 0 }, color: "#F59E0B", skillMatch: null },
    
    // Skills to Projects inputs
    { from: { id: "backend", idx: 0 }, to: { id: "projects", idx: 0 }, color: "#06B6D4", skillMatch: "backend" },
    { from: { id: "frontend", idx: 0 }, to: { id: "projects", idx: 1 }, color: "#A855F7", skillMatch: "frontend" },
    { from: { id: "database", idx: 0 }, to: { id: "projects", idx: 2 }, color: "#F59E0B", skillMatch: "database" },
  ];

  // Filtering projects and highlighting paths
  const allTechTags = Array.from(new Set(PORTFOLIO_DATA.projects.flatMap((p) => p.tech)));

  const isPathActive = (connection: typeof connections[0]) => {
    if (!activeFilter) return true;
    
    // Filter node highlights based on tags
    const projects = PORTFOLIO_DATA.projects;
    const isTagMatchedInSkill = (skillGroup: string) => {
      const skills = PORTFOLIO_DATA.skills.find(s => s.category.toLowerCase().includes(skillGroup));
      return skills?.skills.includes(activeFilter);
    };

    if (connection.skillMatch) {
      return isTagMatchedInSkill(connection.skillMatch);
    }
    
    // Highlight correct profile -> skill path
    if (connection.to.id === "backend" && isTagMatchedInSkill("backend")) return true;
    if (connection.to.id === "frontend" && isTagMatchedInSkill("frontend")) return true;
    if (connection.to.id === "database" && isTagMatchedInSkill("database")) return true;

    return false;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-[1160px] h-[800px] bg-zinc-950/70 border border-white/5 rounded-3xl overflow-hidden shadow-3xl bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      
      {/* HUD Header */}
      <div className="absolute top-4 left-6 z-20 flex items-center justify-between right-6 pointer-events-none select-none">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1">
            <Activity size={14} /> Neural Logic Blueprint Editor
          </h2>
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={resetPositions}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-[10px] text-zinc-400 hover:text-white rounded-md transition-colors"
          >
            <RefreshCw size={10} /> Align Nodes
          </button>
          <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
            <HelpCircle size={12} /> Drag panels to bend connectors.
          </div>
        </div>
      </div>

      {/* SVG CONNECTIONS CANVAS LAYER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {connections.map((conn, idx) => {
          const start = getSocketCoord(conn.from.id, "output", conn.from.idx);
          const end = getSocketCoord(conn.to.id, "input", conn.to.idx);
          
          // Draw a smooth bezier curve between sockets
          const controlOffset = Math.abs(end.x - start.x) * 0.5;
          const dPath = `M ${start.x} ${start.y} C ${start.x + controlOffset} ${start.y}, ${end.x - controlOffset} ${end.y}, ${end.x} ${end.y}`;
          
          const active = isPathActive(conn);

          return (
            <g key={idx}>
              {/* Glow line underlay */}
              <path
                d={dPath}
                fill="none"
                stroke={conn.color}
                strokeWidth={active ? 4 : 1.5}
                opacity={active ? 0.3 : 0.08}
                className="transition-all duration-300"
                style={{ filter: active ? "blur(3px)" : "none" }}
              />
              
              {/* Primary line */}
              <path
                d={dPath}
                fill="none"
                stroke={conn.color}
                strokeWidth={active ? 2 : 1}
                opacity={active ? 1 : 0.15}
                className="transition-all duration-300"
              />

              {/* Glowing animated data particle */}
              {active && (
                <circle r="3.5" fill="#FFF" className="shadow-[0_0_10px_#FFF]">
                  <animateMotion 
                    dur={`${2.2 + idx * 0.3}s`} 
                    repeatCount="indefinite" 
                    path={dPath} 
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* NODE INTERACTIVE PANELS LAYER */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Node 1: Profile (Core Node) */}
        <PortfolioNode
          id="profile"
          title="Developer: Core Profile"
          accent="from-pink-500 to-purple-500"
          position={positions.profile}
          onDragUpdate={(x, y) => updatePosition("profile", x, y)}
          width={nodeSpecs.profile.w}
          height={nodeSpecs.profile.h}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-orbitron">{PORTFOLIO_DATA.profile.name}</h3>
              <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest">{PORTFOLIO_DATA.profile.title}</p>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">{PORTFOLIO_DATA.profile.bio}</p>
            
            <div className="border-t border-white/5 pt-3 space-y-1 font-mono text-[10px] text-zinc-500">
              <p>📍 Location: Dhaka, Bangladesh</p>
              <p>📧 Email: yeaminislamemon02@gmail.com</p>
            </div>
          </div>
        </PortfolioNode>

        {/* Skill Node 2: Backend */}
        <PortfolioNode
          id="backend"
          title="Module: Backend Stack"
          accent="from-cyan-500 to-blue-500"
          position={positions.backend}
          onDragUpdate={(x, y) => updatePosition("backend", x, y)}
          width={nodeSpecs.backend.w}
          height={nodeSpecs.backend.h}
          highlight={!activeFilter || PORTFOLIO_DATA.skills[0].skills.includes(activeFilter)}
        >
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">// Engine Layer</h4>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills[0].skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    activeFilter === skill
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </PortfolioNode>

        {/* Skill Node 3: Frontend */}
        <PortfolioNode
          id="frontend"
          title="Module: Frontend Deck"
          accent="from-purple-500 to-pink-500"
          position={positions.frontend}
          onDragUpdate={(x, y) => updatePosition("frontend", x, y)}
          width={nodeSpecs.frontend.w}
          height={nodeSpecs.frontend.h}
          highlight={!activeFilter || PORTFOLIO_DATA.skills[1].skills.includes(activeFilter)}
        >
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-purple-400 uppercase tracking-wider">// Render Layer</h4>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills[1].skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    activeFilter === skill
                      ? "bg-purple-500/20 border-purple-400 text-purple-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </PortfolioNode>

        {/* Skill Node 4: Databases */}
        <PortfolioNode
          id="database"
          title="Module: Database Layer"
          accent="from-amber-500 to-orange-500"
          position={positions.database}
          onDragUpdate={(x, y) => updatePosition("database", x, y)}
          width={nodeSpecs.database.w}
          height={nodeSpecs.database.h}
          highlight={!activeFilter || PORTFOLIO_DATA.skills[2].skills.includes(activeFilter)}
        >
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">// Query Schema</h4>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills[2].skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    activeFilter === skill
                      ? "bg-amber-500/20 border-amber-400 text-amber-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </PortfolioNode>

        {/* Node 5: Interactive Filters */}
        <PortfolioNode
          id="filters"
          title="Bypass Panel: Tech Filters"
          accent="from-yellow-400 to-amber-500"
          position={positions.filters}
          onDragUpdate={(x, y) => updatePosition("filters", x, y)}
          width={nodeSpecs.filters.w}
          height={nodeSpecs.filters.h}
        >
          <div className="space-y-3">
            <p className="text-[10px] font-mono text-zinc-500">// Toggling flags directs the flow</p>
            <div className="flex flex-wrap gap-1.5 max-h-[8rem] overflow-y-auto">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                  !activeFilter
                    ? "bg-yellow-400/25 border-yellow-400 text-yellow-400 font-bold"
                    : "bg-zinc-900 border-zinc-850 hover:border-zinc-700 text-zinc-400"
                }`}
              >
                BYPASS_ALL
              </button>
              {allTechTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                    activeFilter === tag
                      ? "bg-yellow-400/25 border-yellow-400 text-yellow-400 font-bold"
                      : "bg-zinc-900 border-zinc-850 hover:border-zinc-700 text-zinc-400"
                  }`}
                >
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </PortfolioNode>

        {/* Node 6: Projects Output */}
        <PortfolioNode
          id="projects"
          title="Terminal: Filtered Projects"
          accent="from-emerald-500 to-teal-600"
          position={positions.projects}
          onDragUpdate={(x, y) => updatePosition("projects", x, y)}
          width={nodeSpecs.projects.w}
          height={nodeSpecs.projects.h}
        >
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              // Database Query Results ({PORTFOLIO_DATA.projects.filter(p => !activeFilter || p.tech.includes(activeFilter)).length})
            </h4>
            
            <div className="space-y-2 max-h-[14rem] overflow-y-auto pr-1 select-scrollbar">
              {PORTFOLIO_DATA.projects
                .filter((p) => !activeFilter || p.tech.includes(activeFilter))
                .map((project) => (
                  <div
                    key={project.id}
                    className="p-2.5 rounded-lg border border-white/5 bg-zinc-900/50 space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="text-[11px] font-bold text-white font-orbitron">{project.title}</h5>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">{project.year}</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-normal">{project.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8px] font-mono bg-zinc-950 px-1 text-zinc-500 rounded border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </PortfolioNode>

        {/* Node 7: Experience Timeline */}
        <PortfolioNode
          id="timeline"
          title="Module: Operational Journey"
          accent="from-blue-500 to-indigo-600"
          position={positions.timeline}
          onDragUpdate={(x, y) => updatePosition("timeline", x, y)}
          width={nodeSpecs.timeline.w}
          height={nodeSpecs.timeline.h}
        >
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-blue-400 uppercase tracking-wider">// Work Timeline</h4>
            <div className="space-y-2.5 max-h-[8rem] overflow-y-auto pr-1 select-scrollbar">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="border-l border-blue-500/30 pl-2 ml-1 text-[10px] space-y-0.5">
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="font-bold">{exp.role}</span>
                    <span className="text-zinc-500 text-[8px] font-mono">{exp.period}</span>
                  </div>
                  <p className="text-zinc-400 font-medium text-[9px]">{exp.company}</p>
                  <p className="text-zinc-500 text-[9px] leading-normal">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </PortfolioNode>

      </div>

    </div>
  );
}
