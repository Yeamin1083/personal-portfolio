"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Sparkles, Terminal, FileCode2, Download } from "lucide-react";
import LaptopModelScene from "@/components/3d/LaptopModel";

interface ReadmeViewProps {
  onOpenFile: (filename: string) => void;
}

export default function ReadmeView({ onOpenFile }: ReadmeViewProps) {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-12 text-zinc-100">
      
      {/* Hero Intro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Profile Card & Photo */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-6">
          <motion.div
            className="relative w-44 h-44 overflow-hidden p-[2px] rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10"
            whileHover={{
              boxShadow: "0 0 30px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)",
              scale: 1.04,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Spinning Saber Light */}
            <div className="absolute w-[150%] h-[150%] animate-spin [animation-duration:4s] bg-[conic-gradient(from_0deg,transparent_70%,#00e5ff_90%,#fff_95%,#00e5ff_100%)]" />

            {/* Profile Image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black z-10">
              <Image
                src="/me.png"
                alt="Yeamin Islam"
                fill
                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            {/* Decorative Cyber Corners */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg pointer-events-none z-20" />
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg pointer-events-none z-20" />
          </motion.div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold font-orbitron tracking-tight text-white">Yeamin Islam</h2>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mt-1">Software Engineer</p>
            <p className="text-zinc-400 text-sm mt-2 flex items-center justify-center md:justify-start gap-1">
              <MapPin size={14} className="text-cyan-500" /> Gulshan, Dhaka
            </p>
          </div>
        </div>

        {/* Welcome Pane */}
        <div className="md:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border rounded-full border-cyan-500/30 bg-cyan-950/20 text-cyan-400">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cyan-400"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400"></span>
            </span>
            Active: Software Engineer @ Guardian Life
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-orbitron leading-tight text-white">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">Robust</span> Backend & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Interactive</span> Frontend
          </h1>

          <p className="text-zinc-300 leading-relaxed text-base">
            Driven engineer focusing on building scalable enterprise architectures, smart business process automations, and premium user interfaces. Specializing in high-performance web systems and data workflows.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onOpenFile("projects.ts")}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-black font-semibold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all hover:scale-105"
            >
              Explore Projects <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onOpenFile("contact.sh")}
              className="px-6 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white font-medium text-sm flex items-center gap-2 transition-all hover:scale-105"
            >
              <Mail size={16} className="text-cyan-400" /> Secure Contact
            </button>
          </div>
        </div>
      </div>

      {/* 3D Showcase Panel */}
      <div className="border border-white/5 bg-zinc-950/40 rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <Sparkles size={16} className="text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">3D Interactive Canvas</span>
        </div>
        <div className="h-64 md:h-80 w-full relative z-0 flex items-center justify-center">
          {/* Laptop Scene embedded */}
          <LaptopModelScene />
          <div className="absolute bottom-4 text-center pointer-events-none select-none z-10">
            <p className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-cyan-400/20 backdrop-blur-md">
              Drag to Rotate / Zoom Laptop
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/50 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <Terminal className="text-cyan-400 w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold font-orbitron text-white">Backend Integrity</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Structuring systems that stand the test of load and time. From complex database optimizations in Oracle SQL to REST APIs and solid MVC layers.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/50 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <FileCode2 className="text-purple-400 w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold font-orbitron text-white">Frontend Polish</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Crafting seamless experiences that feel alive. Utilizing Framer Motion, GSAP, and WebGL to create sleek, modern interfaces with optimized performance.
          </p>
        </div>
      </div>

    </div>
  );
}
