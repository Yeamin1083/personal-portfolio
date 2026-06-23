"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  details: string;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "MSc in Computer Science & Engineering",
    institution: "East West University",
    period: "Currently Pursuing (MSc)",
    details: "Specialization path: Data Science, High-Performance Computing, and Advanced Algorithms. Focusing research on machine learning workflows."
  },
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "University of Information Technology & Sciences (UITS)",
    period: "Graduated 2024",
    gpa: "CGPA: 3.71 / 4.00",
    details: "Strong foundations in Database Architecture, Data Structures, Software Engineering, OOP, and Networks. Graduated with honors distinction."
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Uttara Residential School & College (URSC)",
    period: "Completed 2019",
    gpa: "GPA: 4.83 / 5.00",
    details: "Focus areas: Physics, Chemistry, and Higher Mathematics. Formulated early skills in logical reasoning and algebraic mathematics."
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Govt. Kalachandpur High School & College",
    period: "Completed 2017",
    gpa: "GPA: 4.73 / 5.00",
    details: "General Science curriculum. First introductions to elementary computer science and basic scientific methodologies."
  }
];

export default function EducationView() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 text-zinc-100">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
          <GraduationCap className="text-cyan-400 w-6 h-6" /> Academic Journey
        </h2>
        <p className="text-zinc-400 text-sm mt-1">My scholastic record and algorithmic specializations.</p>
      </div>

      {/* Grid of Education Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION_DATA.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{
              y: -4,
              borderColor: "rgba(0,229,255,0.3)",
              boxShadow: "0 8px 30px rgba(0,229,255,0.06)",
            }}
            className="border border-white/5 bg-zinc-900/30 p-6 rounded-2xl space-y-4 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-orbitron leading-snug group-hover:text-cyan-400">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{edu.institution}</p>
                </div>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed">
                {edu.details}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono">
              <span className="text-zinc-500 flex items-center gap-1">
                <Calendar size={12} className="text-cyan-500" /> {edu.period}
              </span>
              {edu.gpa && (
                <span className="text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded flex items-center gap-1">
                  <Award size={10} /> {edu.gpa}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
