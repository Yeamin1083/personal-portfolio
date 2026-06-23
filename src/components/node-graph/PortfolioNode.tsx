"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

interface PortfolioNodeProps {
  id: string;
  title: string;
  accent: string; // Gradient class, e.g. "from-cyan-500 to-blue-500"
  position: { x: number; y: number };
  onDragUpdate: (x: number, y: number) => void;
  width: number;
  height: number;
  children: React.ReactNode;
  highlight?: boolean;
}

export default function PortfolioNode({
  id,
  title,
  accent,
  position,
  onDragUpdate,
  width,
  height,
  children,
  highlight = true
}: PortfolioNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.02}
      dragConstraints={{ left: 0, top: 0, right: 800, bottom: 500 }} // limits drag within canvas boundaries
      onDrag={(event, info) => {
        // Track dragging offsets
        if (nodeRef.current) {
          const parent = nodeRef.current.parentElement;
          if (parent) {
            const parentRect = parent.getBoundingClientRect();
            const nodeRect = nodeRef.current.getBoundingClientRect();
            
            // Calculate coordinates relative to parent canvas top-left corner
            const x = nodeRect.left - parentRect.left;
            const y = nodeRect.top - parentRect.top;
            
            onDragUpdate(x, y);
          }
        }
      }}
      style={{
        x: position.x,
        y: position.y,
        width: width,
        height: height,
        position: "absolute",
      }}
      ref={nodeRef}
      className={`pointer-events-auto flex flex-col border rounded-2xl bg-zinc-950/90 text-left transition-all duration-300 ${
        highlight 
          ? "border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]" 
          : "border-white/5 opacity-30 shadow-none scale-[0.98]"
      } select-none overflow-hidden group`}
    >
      {/* HUD Header Bar */}
      <div className={`px-4 py-2 bg-gradient-to-r ${accent} text-black font-mono text-[10px] font-bold tracking-wider uppercase flex items-center justify-between cursor-move shrink-0`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          <span>{title}</span>
        </div>
        <div className="flex gap-1">
          <span className="w-1 h-1 rounded-full bg-black/60" />
          <span className="w-1 h-1 rounded-full bg-black/60" />
        </div>
      </div>

      {/* Node Content Body */}
      <div className="flex-1 p-4 overflow-y-auto select-scrollbar text-xs relative select-text">
        {/* Futuristic background overlay scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none opacity-40" />
        
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>

      {/* Sockets representation (Visual Node inputs & outputs indicators) */}
      
      {/* Input Socket (Left Side Dot) - if inputs exist */}
      {id !== "profile" && id !== "filters" && (
        <div 
          className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-white/30 flex items-center justify-center z-20 group-hover:scale-125 transition-transform"
          style={{ boxShadow: highlight ? "0 0 8px #FFF" : "none" }}
        >
          <span className={`w-1 h-1 rounded-full ${highlight ? "bg-white" : "bg-zinc-700"}`} />
        </div>
      )}

      {/* Output Socket (Right Side Dot) - if outputs exist */}
      {id !== "projects" && id !== "timeline" && (
        <div 
          className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-white/30 flex items-center justify-center z-20 group-hover:scale-125 transition-transform"
          style={{ boxShadow: highlight ? "0 0 8px #FFF" : "none" }}
        >
          <span className={`w-1 h-1 rounded-full ${highlight ? "bg-white" : "bg-zinc-700"}`} />
        </div>
      )}

      {/* Glowing frame overlay on hover */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 border"
        style={{
          borderColor: highlight ? "rgba(255, 255, 255, 0.15)" : "transparent",
          boxShadow: highlight ? "inset 0 0 15px rgba(255, 255, 255, 0.05)" : "none"
        }}
      />
    </motion.div>
  );
}
