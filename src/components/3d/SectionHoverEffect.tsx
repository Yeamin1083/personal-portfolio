"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Floating particle that spawns on hover
// ---------------------------------------------------------------------------
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function FloatingParticles({ active, containerRect }: { active: boolean; containerRect: DOMRect | null }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    if (!active || !containerRect) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: idCounter.current++,
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 1.5,
        delay: 0,
      };
      setParticles((prev) => [...prev.slice(-12), newParticle]);
    }, 300);

    return () => clearInterval(interval);
  }, [active, containerRect]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
            y: p.y - 60 - Math.random() * 40,
            x: p.x + (Math.random() - 0.5) * 30,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          onAnimationComplete={() =>
            setParticles((prev) => prev.filter((pp) => pp.id !== p.id))
          }
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#00E5FF",
            boxShadow: `0 0 ${p.size * 3}px rgba(0,229,255,0.6)`,
            pointerEvents: "none",
          }}
        />
      ))}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Main SectionHoverEffect component
// ---------------------------------------------------------------------------
interface SectionHoverEffectProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  glowColor?: string;
  glowIntensity?: number; // 0-1
  enableParticles?: boolean;
  enableEdgeGlow?: boolean;
  as?: "section" | "div";
}

export default function SectionHoverEffect({
  children,
  className = "",
  id,
  glowColor = "0,229,255",
  glowIntensity = 0.08,
  enableParticles = true,
  enableEdgeGlow = true,
  as: Tag = "section",
}: SectionHoverEffectProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (containerRef.current) {
      setRect(containerRef.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLElement>}
      id={id}
      className={`${className} relative`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ isolation: "isolate" }}
    >
      {/* Radial mouse-following glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor},${glowIntensity}), transparent 50%)`,
        }}
      />

      {/* Top edge highlight line */}
      {enableEdgeGlow && (
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(${glowColor},0.5), transparent)`,
            pointerEvents: "none",
            zIndex: 1,
            transformOrigin: "center",
          }}
        />
      )}

      {/* Bottom edge highlight line */}
      {enableEdgeGlow && (
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(${glowColor},0.3), transparent)`,
            pointerEvents: "none",
            zIndex: 1,
            transformOrigin: "center",
          }}
        />
      )}

      {/* Corner accents that appear on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Top-left corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: -1,
                left: -1,
                width: 24,
                height: 24,
                borderTop: `2px solid rgba(${glowColor},0.6)`,
                borderLeft: `2px solid rgba(${glowColor},0.6)`,
                borderTopLeftRadius: 8,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Top-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              style={{
                position: "absolute",
                top: -1,
                right: -1,
                width: 24,
                height: 24,
                borderTop: `2px solid rgba(${glowColor},0.6)`,
                borderRight: `2px solid rgba(${glowColor},0.6)`,
                borderTopRightRadius: 8,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Bottom-left corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              style={{
                position: "absolute",
                bottom: -1,
                left: -1,
                width: 24,
                height: 24,
                borderBottom: `2px solid rgba(${glowColor},0.6)`,
                borderLeft: `2px solid rgba(${glowColor},0.6)`,
                borderBottomLeftRadius: 8,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Bottom-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              style={{
                position: "absolute",
                bottom: -1,
                right: -1,
                width: 24,
                height: 24,
                borderBottom: `2px solid rgba(${glowColor},0.6)`,
                borderRight: `2px solid rgba(${glowColor},0.6)`,
                borderBottomRightRadius: 8,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      {enableParticles && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
          <FloatingParticles active={isHovered} containerRect={rect} />
        </div>
      )}

      {/* Actual section content */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </Tag>
  );
}
