"use client";

import AbstractBackground from "@/components/3d/AbstractBackground";
import SectionHoverEffect from "@/components/3d/SectionHoverEffect";
import { ArrowRight, Code2, Database, Layout, Mail, Server, MapPin, Phone, Github, Linkedin, GraduationCap, ExternalLink, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

const PROJECTS = [
  {
    id: 1,
    title: "Enterprise Insurance & Payment Systems",
    category: "FinTech & Enterprise",
    description: "Enterprise-grade workflows for premium collection, transaction processing, and operational reporting automation. Engineered with scalability and performance in mind.",
    tech: ["Oracle SQL", "REST APIs", "Automation", "Reporting"],
    year: "2024",
    githubUrl: null,
    image: "/projects/p1.png"
  },
  {
    id: 2,
    title: "Self-Onboarding Platform",
    category: "User Acquisition Flow",
    description: "Developed secure onboarding systems featuring OTP verification, complex form workflows, and dynamic UI handling for seamless user experiences.",
    tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
    year: "2023",
    githubUrl: null,
    image: "/projects/p2.png"
  },
  {
    id: 3,
    title: "Retail POS & Management Dashboard",
    category: "Infrastructure",
    description: "Cloud-based Point of Sale and inventory workflow system featuring real-time dashboards, user role management, and operational interfaces.",
    tech: ["Laravel", "PHP", "MySQL", "MVC"],
    year: "2022",
    githubUrl: null,
    image: "/projects/p3.png"
  },
  {
    id: 4,
    title: "Automotive Job & Listing Platform",
    category: "Full-Stack Web App",
    description: "Laravel-based listing platform with secure authentication, image-based job posts, robust pagination, and dynamic search functionality.",
    tech: ["Java", "Django", "Python", "MySQL"],
    year: "2021",
    githubUrl: "https://github.com/Yeamin1083/Java-Car-Application",
    image: "/projects/p4.png"
  }
];

const SKILLS = [
  { name: "Backend Development", icon: Server, items: ["PHP", "Python", "Django", "Laravel", "REST APIs", "MVC"] },
  { name: "Frontend Development", icon: Layout, items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "JavaScript"] },
  { name: "Database Systems", icon: Database, items: ["Oracle SQL", "MySQL", "Enterprise Data", "Reporting"] },
  { name: "UI/UX & Motion", icon: Sparkles, items: ["Framer Motion", "GSAP", "Three.js", "React Three Fiber"] },
];

const EXPERIENCE = [
  {
    role: "Officer",
    company: "Guardian Life Insurance Limited",
    period: "Present",
    desc: "Managing core enterprise operations, optimizing payment workflows, and utilizing modern tech stacks to streamline business automation and reporting systems."
  },
  {
    role: "Industrial Attachment Trainee",
    company: "Brain Station 23",
    period: "Sep 2023",
    desc: "Intensive training program focused on modern JavaScript ecosystems. Collaborated in an agile environment and reported directly to HR and lead trainers."
  },
  {
    role: "Senior Executive, Web Dev Wing",
    company: "UITS Computer Club",
    period: "2021 - 2024",
    desc: "Led the web development team, organized technical workshops, and achieved 5th place at the UITS Victory Day Programming Contest (2021)."
  }
];

const EDUCATION = [
  {
    degree: "MSc in Computer Science & Engineering",
    institution: "East West University",
    details: "Specialization: Data Science & Algorithms | Currently Pursuing",
  },
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "University of Information Technology & Sciences (UITS)",
    details: "CGPA: 3.71 | Passing Year: 2024",
  },
  {
    degree: "Higher Secondery Certificate (HSC)",
    institution: "Uttara Residential School & College (URSC)",
    details: "CGPA: 4.83 | Passing Year: 2019",
  },
  {
    degree: "Secondery School Certificate (SSC)",
    institution: "Govt. Kalachandpur High School & College",
    details: "CGPA: 4.73 | Passing Year: 2017",
  }
];

// ---------------------------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// ---------------------------------------------------------------------------
// GLITCH CHARS
// ---------------------------------------------------------------------------
const GLITCH_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ!@#$%^&*<>[]{}|01";

// ---------------------------------------------------------------------------
// HOOK: useScramble
// ---------------------------------------------------------------------------
function useScramble(text: string, startDelay = 400) {
  const [output, setOutput] = useState(() => " ".repeat(text.length));

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      const totalChars = text.length;
      const frameCount = new Array(totalChars).fill(0);
      const staggerDelay = Array.from({ length: totalChars }, (_, i) => i * 2);
      const SCRAMBLE_FRAMES = 18;
      const chars = text.split("");
      const current = " ".repeat(totalChars).split("");
      let frame = 0;

      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        let allDone = true;
        for (let i = 0; i < totalChars; i++) {
          if (frame < staggerDelay[i]) {
            current[i] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            allDone = false;
          } else if (frameCount[i] < SCRAMBLE_FRAMES) {
            current[i] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            frameCount[i]++;
            allDone = false;
          } else {
            current[i] = chars[i];
          }
        }
        setOutput(current.join(""));
        frame++;
        if (allDone) {
          clearInterval(interval);
          setOutput(text);
        }
      }, 40);

      return () => clearInterval(interval);
    }, startDelay);

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [text, startDelay]);

  return { output };
}

// ---------------------------------------------------------------------------
// HOOK: useGlitchReveal
// ---------------------------------------------------------------------------
function useGlitchReveal(text: string, startDelay = 900, charDelay = 22) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      let revealedCount = 0;
      let frontierFrames = 0;
      const FRONTIER_FRAMES = 3;

      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        if (revealedCount >= text.length) {
          setOutput(text);
          setDone(true);
          clearInterval(interval);
          return;
        }
        frontierFrames++;
        const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        if (frontierFrames >= FRONTIER_FRAMES) {
          revealedCount++;
          frontierFrames = 0;
        }
        const locked = text.slice(0, revealedCount);
        const frontier = revealedCount < text.length ? glitchChar : "";
        setOutput(locked + frontier);
      }, charDelay);

      return () => clearInterval(interval);
    }, startDelay);

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [text, startDelay, charDelay]);

  return { output, done };
}

// ---------------------------------------------------------------------------
// COMPONENT: ScrambleName
// ---------------------------------------------------------------------------
function ScrambleName() {
  const fullName = "Yeamin Islam";
  const { output } = useScramble(fullName, 500);
  const realChars = fullName.split("");

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 leading-[1.1] pb-2 drop-shadow-2xl font-orbitron"
    >
      {output.split("").map((char, i) => {
        const isReal = char === realChars[i] || char === " ";
        return (
          <span
            key={i}
            style={{
              color: isReal ? "white" : "#00E5FF",
              opacity: isReal ? 1 : 0.8,
              display: "inline-block",
              transition: isReal ? "color 0.1s ease" : "none",
              textShadow: isReal ? "none" : "0 0 8px rgba(0,229,255,0.8)",
              whiteSpace: "pre",
            }}
          >
            {char}
          </span>
        );
      })}
    </motion.h1>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: GlitchRevealText
// ---------------------------------------------------------------------------
const HERO_TEXT =
  "I focus on building scalable enterprise applications, automation-driven systems, and premium user-focused experiences with meticulous attention to performance and architecture.";

function GlitchRevealText() {
  const { output, done } = useGlitchReveal(HERO_TEXT, 1400, 20);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="max-w-xl text-base sm:text-lg font-dark mb-12 leading-relaxed text-center"
      style={{ color: "rgba(255,255,255,0.82)", minHeight: "4rem", fontFamily: "inherit" }}
    >
      {output.split("").map((char, i) => {
        const isGlitch = !HERO_TEXT[i] || char !== HERO_TEXT[i];
        return (
          <span
            key={i}
            style={{
              color: isGlitch ? "#00E5FF" : "rgba(255,255,255,0.82)",
              textShadow: isGlitch ? "0 0 6px rgba(0,229,255,0.9)" : "none",
              whiteSpace: "pre-wrap",
            }}
          >
            {char}
          </span>
        );
      })}
      {!done && (
        <span
          className="inline-block w-[2px] h-[1em] ml-[1px] animate-pulse"
          style={{ background: "#00E5FF", verticalAlign: "middle" }}
        />
      )}
    </motion.p>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: CyanSweep
// ---------------------------------------------------------------------------
function CyanSweep({ triggerRef }: { triggerRef: React.MutableRefObject<((id: string) => void) | null> }) {
  const [sweeping, setSweeping] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  useEffect(() => {
    triggerRef.current = (id: string) => {
      setTargetId(id);
      setSweeping(true);
    };
  }, [triggerRef]);

  useEffect(() => {
    if (!sweeping || !targetId) return;
    const timer = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setSweeping(false), 400);
    }, 350);
    return () => clearTimeout(timer);
  }, [sweeping, targetId]);

  if (!sweeping) return null;

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: [0, 1, 1, 0] }}
      transition={{ duration: 0.7, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.06) 49%, rgba(0,229,255,0.12) 50%, transparent 100%)",
        pointerEvents: "none",
        transformOrigin: "top",
      }}
    >
      <motion.div
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background: "#00E5FF",
          boxShadow: "0 0 12px 3px rgba(0,229,255,0.8), 0 0 40px 8px rgba(0,229,255,0.3)",
        }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const sweepTrigger = useRef<((id: string) => void) | null>(null);

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    sweepTrigger.current?.(id);
  };

  return (
    <main className="relative min-h-screen bg-transparent selection:bg-accent selection:text-black">

      {/* Cyan sweep overlay */}
      <CyanSweep triggerRef={sweepTrigger} />

      {/* Cinematic 3D Background */}
      <AbstractBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 text-center pt-10 border-b border-white/5 overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl mx-auto flex flex-col items-center pb-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 25px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.15), inset 0 0 20px rgba(0,229,255,0.08)",
              borderColor: "rgba(0,229,255,0.8)",
              backgroundColor: "rgba(0,229,255,0.18)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] sm:text-xs font-semibold uppercase tracking-widest border rounded-full border-accent/40 bg-accent/10 backdrop-blur-md text-accent shadow-[0_0_20px_rgba(0,229,255,0.15)] cursor-pointer"
            style={{ transition: "background-color 0.3s, border-color 0.3s" }}
            data-cursor
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-accent"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent"></span>
            </span>
            Software Engineer @ Guardian Life Insurance
          </motion.div>

          {/* Name — scramble decode */}
          <ScrambleName />

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              textShadow: "0 0 20px rgba(0,229,255,0.8), 0 0 40px rgba(0,229,255,0.4), 0 0 80px rgba(0,229,255,0.2)",
              scale: 1.03,
            }}
            className="text-xl md:text-3xl font-medium tracking-widest text-accent/90 mb-8 font-orbitron uppercase cursor-default"
            data-cursor
          >
            Software Engineer
          </motion.h2>

          {/* Description — glitch reveal */}
          <GlitchRevealText />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <motion.a
              href="#projects"
              onClick={handleNav("projects")}
              whileHover={{
                scale: 1.07,
                boxShadow: "0 0 30px rgba(0,229,255,0.5), 0 0 60px rgba(0,229,255,0.2)",
                backgroundColor: "#00E5FF",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-sm font-medium text-black transition-colors rounded-full bg-white shadow-[0_0_20px_rgba(0,229,255,0.2)] flex items-center justify-center gap-2 group"
              data-cursor
            >
              View My Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#contact"
              onClick={handleNav("contact")}
              whileHover={{
                scale: 1.07,
                boxShadow: "0 0 30px rgba(0,229,255,0.5), 0 0 60px rgba(0,229,255,0.2)",
                backgroundColor: "#00E5FF",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-sm font-medium text-black transition-colors rounded-full bg-white shadow-[0_0_20px_rgba(0,229,255,0.2)] flex items-center justify-center gap-2 group"
              data-cursor
            >
              <Phone size={18} />
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-widest mb-3 font-medium text-accent">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent"></div>
        </motion.div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <SectionHoverEffect id="projects" className="relative z-10 py-32 px-6 bg-surface/40 backdrop-blur-3xl border-b border-white/5" glowIntensity={0.1} enableParticles={true}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-2 font-orbitron">Selected Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-white font-orbitron">Production & Enterprise Systems</h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-12"
          >
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{
                  borderColor: "rgba(0,229,255,0.35)",
                  boxShadow: "0 0 40px rgba(0,229,255,0.08), 0 8px 32px rgba(0,0,0,0.3)",
                  y: -4,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10 bg-white/5 p-8 md:p-12 rounded-3xl hover:bg-white/10 transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="lg:col-span-7 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.span whileHover={{ boxShadow: "0 0 14px rgba(0,229,255,0.5)", scale: 1.1 }} className="text-xs font-mono text-accent border border-accent/30 bg-accent/10 px-3 py-1 rounded-full cursor-default" data-cursor>{project.year}</motion.span>
                    <span className="text-xs font-medium text-white/60 uppercase tracking-wider">{project.category}</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-accent transition-colors duration-500">{project.title}</h4>
                  <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl">{project.description}</p>

                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    {project.tech.map(t => (
                      <motion.span
                        key={t}
                        whileHover={{
                          backgroundColor: "rgba(0,229,255,0.12)",
                          borderColor: "rgba(0,229,255,0.5)",
                          color: "#00E5FF",
                          boxShadow: "0 0 12px rgba(0,229,255,0.3)",
                          y: -2,
                        }}
                        className="text-xs font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-white/80 cursor-default"
                        data-cursor
                      >{t}</motion.span>
                    ))}
                  </div>

                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-accent transition-colors group/link">
                      <Github className="w-5 h-5" />
                      View Source Code
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>

                <div className="lg:col-span-5 relative z-10 flex justify-end">
                  <div className="w-full aspect-[4/3] bg-black/50 border border-white/10 group-hover:border-accent/40 rounded-2xl flex items-center justify-center transition-colors duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {project.image ? (
                      <>
                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay z-10 pointer-events-none"></div>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]"></div>
                        <Code2 className="w-16 h-16 text-white/10 group-hover:text-accent/40 transition-colors duration-700 group-hover:scale-110" />
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionHoverEffect>

      {/* --- ABOUT & SKILLS SECTION --- */}
      <SectionHoverEffect className="relative z-10 py-32 px-6 bg-background" glowColor="0,200,255" glowIntensity={0.06} enableParticles={false}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-2 font-orbitron">Professional Focus</h2>
            <h3 className="text-4xl font-bold tracking-tight mb-8 text-white font-orbitron">System Architecture.<br />Premium Polish.</h3>

            {/* Photo */}
            <motion.div
              // Added "overflow-hidden" to mask the rotating light and "p-[2px]" to set the saber width
              className="relative w-44 h-44 mb-8 overflow-hidden p-[2px] rounded-2xl flex items-center justify-center"
              whileHover={{
                boxShadow: "0 0 30px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)",
                scale: 1.04,
              }}
              transition={{ duration: 0.4 }}
              data-cursor
            >
              {/* The Saber Light: A spinning background element */}
              <div className="absolute w-[150%] h-[150%] animate-spin [animation-duration:4s] bg-[conic-gradient(from_0deg,transparent_70%,#00e5ff_90%,#fff_95%,#00e5ff_100%)]" />

              {/* Your Image Container: Added "bg-black" to block the center of the spinning light */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black z-10">
                <Image
                  src="/me.png"
                  alt="Yeamin Islam"
                  fill
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Decorative corners (z-20 keeps them on top of everything) */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-accent rounded-br-lg pointer-events-none z-20" />
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-accent rounded-tl-lg pointer-events-none z-20" />
            </motion.div>

            <p className="text-white/70 text-lg leading-relaxed mb-6">
              I specialize in bridging the gap between highly robust backend data systems and incredibly smooth, premium frontend experiences.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              My core focus lies in developing scalable enterprise applications, business process automation, and operational workflows that do not compromise on usability or visual polish.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                className="p-4 rounded-xl cursor-default hover:bg-white/5 transition-colors"
                data-cursor
              >
                <motion.span
                  className="block text-4xl font-bold text-white mb-1"
                  whileHover={{ textShadow: "0 0 20px rgba(0,229,255,0.6)" }}
                >MSc</motion.span>
                <span className="text-sm text-white/55">Data Science & Algorithms</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                className="p-4 rounded-xl cursor-default hover:bg-white/5 transition-colors"
                data-cursor
              >
                <motion.span
                  className="block text-4xl font-bold text-white mb-1"
                  whileHover={{ textShadow: "0 0 20px rgba(0,229,255,0.6)" }}
                >UI/UX</motion.span>
                <span className="text-sm text-white/55">Cinematic Motion Design</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-4 font-orbitron">Technical Arsenal</h2>
            {SKILLS.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeInUp}
                whileHover={{
                  borderColor: "rgba(0,229,255,0.5)",
                  boxShadow: "0 0 25px rgba(0,229,255,0.1), 0 4px 20px rgba(0,0,0,0.2)",
                  y: -3,
                }}
                transition={{ duration: 0.3 }}
                className="border border-white/10 bg-surface/50 p-6 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <category.icon className="w-5 h-5 text-accent" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white font-orbitron">{category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{
                        backgroundColor: "rgba(0,229,255,0.15)",
                        color: "#00E5FF",
                        boxShadow: "0 0 10px rgba(0,229,255,0.3)",
                        scale: 1.08,
                        y: -1,
                      }}
                      className="text-sm text-white/65 bg-white/5 px-3 py-1 rounded-md transition-colors cursor-default"
                      data-cursor
                    >{skill}</motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </SectionHoverEffect>

      {/* --- TIMELINE (EXP & EDU) SECTION --- */}
      <SectionHoverEffect className="relative z-10 py-32 px-6 bg-surface/40 backdrop-blur-3xl border-y border-white/5 overflow-hidden" glowColor="0,229,255" glowIntensity={0.08} enableParticles={true}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Experience */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-2 font-orbitron">Journey</h2>
            <h3 className="text-4xl font-bold tracking-tight mb-12 text-white font-orbitron">Experience</h3>

            <div className="flex flex-col gap-8 border-l border-white/10 pl-6 ml-4">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute -left-[31px] top-1 w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.12 + 0.2 }}
                  />
                  <motion.div
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-300"
                    whileHover={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(0,229,255,0.35)",
                      boxShadow: "0 0 25px rgba(0,229,255,0.1), 0 4px 20px rgba(0,0,0,0.2)",
                      y: -3,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      whileHover={{ boxShadow: "0 0 10px rgba(0,229,255,0.4)", scale: 1.05 }}
                      className="text-xs font-mono text-accent mb-2 inline-block border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-full"
                      data-cursor
                    >{exp.period}</motion.span>
                    <h4 className="text-xl font-bold text-white mb-1">{exp.role}</h4>
                    <span className="block text-accent/80 font-medium mb-3 text-sm">{exp.company}</span>
                    <p className="text-white/65 leading-relaxed text-sm">{exp.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-2 font-orbitron">Academic</h2>
            <h3 className="text-4xl font-bold tracking-tight mb-12 text-white font-orbitron">Education</h3>

            <div className="flex flex-col gap-8 border-l border-white/10 pl-6 ml-4">
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute -left-[31px] top-1 w-3 h-3 bg-white/50 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.15 + 0.2 }}
                    whileHover={{ backgroundColor: "#00E5FF", scale: 1.5 }}
                  />
                  <motion.div
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-300"
                    whileHover={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(0,229,255,0.3)",
                      boxShadow: "0 0 25px rgba(0,229,255,0.08), 0 4px 20px rgba(0,0,0,0.2)",
                      y: -3,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div whileHover={{ rotate: -10, scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }}>
                      <GraduationCap className="w-6 h-6 text-accent mb-3" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-1 leading-tight">{edu.degree}</h4>
                    <span className="block text-accent/80 font-medium mb-3 text-sm">{edu.institution}</span>
                    <p className="text-white/55 font-mono text-xs">{edu.details}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </SectionHoverEffect>

      {/* --- CONTACT SECTION --- */}
      <SectionHoverEffect id="contact" className="relative z-10 py-32 px-6 bg-background" glowColor="100,220,255" glowIntensity={0.12} enableParticles={true}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            className="w-16 h-16 mx-auto bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mb-8"
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.15)",
              borderColor: "rgba(0,229,255,0.7)",
            }}
            data-cursor
          >
            <Mail className="w-8 h-8 text-accent animate-pulse" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white font-orbitron">Let's Connect</h2>
          <p className="text-lg text-white/70 font-light mb-12 max-w-2xl mx-auto">
            Ready to work in a dynamic environment and contribute effectively to organizational goals. Feel free to reach out via email or connect with me on LinkedIn.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <motion.div
              whileHover={{
                scale: 1.06,
                borderColor: "rgba(0,229,255,0.5)",
                boxShadow: "0 0 20px rgba(0,229,255,0.15), 0 4px 16px rgba(0,0,0,0.2)",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-left"
              data-cursor
            >
              <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Phone className="text-accent w-5 h-5" />
              </motion.div>
              <div>
                <p className="text-xs text-white/50">Phone</p>
                <p className="text-sm font-medium text-white">+8801406900468</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.06,
                borderColor: "rgba(0,229,255,0.5)",
                boxShadow: "0 0 20px rgba(0,229,255,0.15), 0 4px 16px rgba(0,0,0,0.2)",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-left"
              data-cursor
            >
              <motion.div whileHover={{ rotate: -15, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                <MapPin className="text-accent w-5 h-5" />
              </motion.div>
              <div>
                <p className="text-xs text-white/50">Location</p>
                <p className="text-sm font-medium text-white">Gulshan, Dhaka 1212</p>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.15, rotate: 8, boxShadow: "0 0 25px rgba(0,229,255,0.5), 0 0 50px rgba(0,229,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              href="mailto:yeaminislamemon02@gmail.com"
              className="p-4 rounded-full bg-white text-black hover:bg-accent transition-colors shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              data-cursor
            >
              <Mail className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, rotate: -8, boxShadow: "0 0 25px rgba(0,229,255,0.4), 0 0 50px rgba(0,229,255,0.15)", borderColor: "rgba(0,229,255,0.6)" }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com/in/yeamin-islam83/"
              target="_blank" rel="noreferrer"
              className="p-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
              data-cursor
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, rotate: 8, boxShadow: "0 0 25px rgba(0,229,255,0.4), 0 0 50px rgba(0,229,255,0.15)", borderColor: "rgba(0,229,255,0.6)" }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/Yeamin1083"
              target="_blank" rel="noreferrer"
              className="p-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
              data-cursor
            >
              <Github className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </SectionHoverEffect>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10 bg-background text-center">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} Yeamin Islam. All rights reserved.
        </p>
      </footer>

    </main>
  );
}