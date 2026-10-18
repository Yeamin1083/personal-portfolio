"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function StarBackground(props: any) {
  const ref = useRef<any>();
  const sphere = useMemo(() => {
    const arr = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 2.5 * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function Hero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [first, last] = PORTFOLIO_DATA.profile.name.split(" ");

  // Without this, browsers lacking WebGL crash the whole page.
  const [hasWebGL, setHasWebGL] = useState(false);
  useEffect(() => {
    setHasWebGL(!!document.createElement("canvas").getContext("webgl"));
  }, []);

  return (
    <section id="top" ref={container} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(65,97,154,0.28),transparent_70%)]" />
      {hasWebGL && (
        <div className="absolute inset-0 z-0 opacity-50">
          <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
            <StarBackground />
          </Canvas>
        </div>
      )}

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base text-muted uppercase tracking-[0.3em] mb-4"
        >
          {PORTFOLIO_DATA.profile.title}
        </motion.p>
        
        <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-primary leading-tight">
          {[first, last].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? "italic text-gray-500" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest text-muted">Scroll to explore</span>
        <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-muted to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
