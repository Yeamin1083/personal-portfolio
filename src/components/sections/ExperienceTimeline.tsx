"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";

export default function ExperienceTimeline() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={container} className="w-full scroll-mt-24 bg-background text-white py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-20">
        
        {/* Experience */}
        <div className="flex-1 relative">
          <h2 className="text-sm uppercase tracking-widest text-muted mb-16">Experience</h2>
          
          <div className="absolute left-[7px] top-[90px] bottom-0 w-[1px] bg-white/10">
            <motion.div style={{ height: lineHeight }} className="w-full bg-white origin-top" />
          </div>

          <div className="flex flex-col gap-12">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div key={idx} className="relative pl-10">
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-background border border-white/30 z-10" />
                <span className="text-xs text-muted font-sans tracking-widest mb-2 block">{exp.period}</span>
                <h3 className="text-2xl font-playfair mb-1">{exp.role}</h3>
                <h4 className="text-sm text-primary/80 mb-4">{exp.company}</h4>
                <p className="text-sm text-muted leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="flex-1 relative mt-20 md:mt-0">
          <h2 className="text-sm uppercase tracking-widest text-muted mb-16">Education</h2>
          
          <div className="absolute left-[7px] top-[90px] bottom-0 w-[1px] bg-white/10">
            <motion.div style={{ height: lineHeight }} className="w-full bg-white origin-top" />
          </div>

          <div className="flex flex-col gap-12">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="relative pl-10">
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-background border border-white/30 z-10" />
                <h3 className="text-2xl font-playfair mb-1">{edu.degree}</h3>
                <h4 className="text-sm text-primary/80 mb-4">{edu.institution}</h4>
                <p className="text-sm text-muted leading-relaxed">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
