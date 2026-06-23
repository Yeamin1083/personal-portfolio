"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, LayoutGrid, Share2, Github, Linkedin } from "lucide-react";

// Components
import AbstractBackground from "@/components/3d/AbstractBackground";
import NodeCanvas from "@/components/node-graph/NodeCanvas";
import HUDDashboard from "@/components/hud-dashboard/HUDDashboard";

// Data
import { PORTFOLIO_DATA } from "@/lib/portfolioData";

export default function Home() {
  const [viewMode, setViewMode] = useState<"graph" | "hud">("graph");
  const [scale, setScale] = useState(1);

  // Auto scale node canvas to fit screen width
  useEffect(() => {
    const handleResize = () => {
      const targetWidth = 1180; // width of node canvas + margins
      if (window.innerWidth < targetWidth) {
        setScale(window.innerWidth / targetWidth);
      } else {
        setScale(1);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen w-screen bg-transparent overflow-x-hidden relative flex flex-col items-center justify-start text-zinc-300 font-sans selection:bg-cyan-500/25 selection:text-white">
      
      {/* Clean Cyber-Grid Backdrop */}
      <AbstractBackground />

      {/* FIXED CONTROL HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 border-b border-white/5 flex items-center justify-between px-6 md:px-12 backdrop-blur-md z-50 select-none">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Activity className="text-cyan-400 w-5 h-5 animate-pulse" />
          <span className="font-orbitron font-bold text-white tracking-widest text-xs uppercase antialiased">
            {PORTFOLIO_DATA.profile.name} // PORTFOLIO
          </span>
        </div>

        {/* Center Mode Switcher */}
        <div className="flex bg-zinc-950 border border-white/5 rounded-xl p-0.5 shadow-inner">
          <button
            onClick={() => setViewMode("graph")}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all flex items-center gap-1.5 ${
              viewMode === "graph"
                ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Share2 size={14} /> Logic Graph
          </button>
          
          <button
            onClick={() => setViewMode("hud")}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all flex items-center gap-1.5 ${
              viewMode === "hud"
                ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <LayoutGrid size={14} /> HUD View
          </button>
        </div>

        {/* Quick Social Badges */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 border border-white/5 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 rounded-lg transition-all"
            title="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href={PORTFOLIO_DATA.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 border border-white/5 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 rounded-lg transition-all"
            title="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
        </div>
      </header>

      {/* CORE DISPLAY WINDOW PORTAL */}
      <div className="flex-1 w-full pt-24 pb-12 flex flex-col items-center justify-center z-10 relative">
        <AnimatePresence mode="wait">
          {viewMode === "graph" ? (
            /* Scaled Node network canvas mode */
            <motion.div
              key="graph"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full overflow-hidden flex justify-center items-start px-4"
              style={{ height: `${800 * scale}px` }}
            >
              <div 
                style={{ 
                  transform: `scale(${scale})`, 
                  transformOrigin: "top center",
                  width: "1160px",
                  height: "800px",
                  flexShrink: 0
                }}
              >
                <NodeCanvas />
              </div>
            </motion.div>
          ) : (
            /* Scrolling holographic HUD dashboard mode */
            <motion.div
              key="hud"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <HUDDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cyberpunk Footer HUD */}
      <footer className="w-full py-6 border-t border-white/5 bg-zinc-950/80 backdrop-blur-md text-center text-[10px] font-mono text-zinc-500 relative z-30 select-none">
        <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved.</p>
      </footer>

    </main>
  );
}