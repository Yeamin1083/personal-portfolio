"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer ref={container} className="w-full h-screen bg-black text-white relative z-0 overflow-hidden flex flex-col items-center justify-center">
      <motion.div style={{ y }} className="text-center w-full max-w-4xl px-4">
        <h2 className="text-sm uppercase tracking-widest text-muted mb-10">Let's Connect</h2>
        
        <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="group relative inline-block">
          <span className="text-5xl md:text-7xl lg:text-9xl font-playfair font-bold text-transparent text-stroke-white group-hover:text-white transition-colors duration-500">
            Say Hello
          </span>
          <div className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </a>

        <div className="mt-32 flex flex-col md:flex-row items-center justify-between w-full border-t border-white/10 pt-10">
          <div className="flex gap-6 mb-6 md:mb-0">
            <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-muted hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
