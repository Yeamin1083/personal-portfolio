"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Text, Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";

function Scene() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    
    // As user scrolls (0 to 1), move the group up so we appear to fall down
    const y = scroll.offset * 30; // Total travel distance
    group.current.position.y = y;

    // Rotate the whole scene slightly based on scroll
    group.current.rotation.y = scroll.offset * Math.PI;
  });

  return (
    <group ref={group}>
      {/* 1. Hero Section 3D Elements */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[2, -2, -5]}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <MeshDistortMaterial color="#00E5FF" speed={2} distort={0.2} roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[-3, -8, -6]}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <MeshWobbleMaterial color="#A855F7" factor={1} speed={2} wireframe />
        </mesh>
      </Float>

      {/* 2. Skills / Tech Section 3D Elements */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1} position={[3, -15, -4]}>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#F59E0B" wireframe />
        </mesh>
      </Float>
      
      {/* 3. Projects 3D Elements */}
      {PORTFOLIO_DATA.projects.map((project, i) => (
        <Float key={project.id} speed={2} rotationIntensity={1} position={[Math.sin(i) * 4, -22 - (i * 4), -5]}>
           <mesh>
             <octahedronGeometry args={[1, 0]} />
             <meshStandardMaterial color="#10B981" roughness={0.2} metalness={0.8} />
           </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Experience() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#A855F7" />
      <pointLight position={[10, -10, -5]} intensity={1} color="#00E5FF" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <ScrollControls pages={5} damping={0.2}>
        
        {/* The 3D World */}
        <Scene />

        {/* The HTML Overlay */}
        <Scroll html style={{ width: "100vw" }}>
          
          {/* HERO */}
          <div className="h-screen w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <h1 className="text-6xl md:text-8xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 mb-4 tracking-tighter drop-shadow-2xl">
              {PORTFOLIO_DATA.profile.name.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl font-mono text-cyan-400 mb-8 max-w-2xl">
              {PORTFOLIO_DATA.profile.title}
            </p>
            <div className="text-zinc-500 animate-bounce mt-12 font-mono text-sm">
              [ SCROLL TO INITIATE ]
            </div>
          </div>

          {/* ABOUT */}
          <div className="h-screen w-full flex items-center justify-start px-12 md:px-32 pointer-events-none">
            <div className="max-w-xl backdrop-blur-md bg-zinc-950/40 p-8 rounded-3xl border border-white/10 shadow-2xl">
              <h2 className="text-4xl font-bold font-orbitron text-white mb-6">THE ARCHITECT</h2>
              <p className="text-lg text-zinc-300 leading-relaxed font-sans">
                {PORTFOLIO_DATA.profile.bio}
              </p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="h-screen w-full flex items-center justify-end px-12 md:px-32 pointer-events-none">
            <div className="max-w-xl backdrop-blur-md bg-zinc-950/40 p-8 rounded-3xl border border-white/10 shadow-2xl">
              <h2 className="text-4xl font-bold font-orbitron text-white mb-6">CAPABILITIES</h2>
              <div className="space-y-6">
                {PORTFOLIO_DATA.skills.map((skillGroup, i) => (
                  <div key={i}>
                    <h3 className="text-cyan-400 font-mono text-sm mb-2 uppercase">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="min-h-screen w-full flex flex-col items-center justify-start pt-32 px-4 pointer-events-none pb-32">
            <h2 className="text-5xl font-bold font-orbitron text-white mb-16 text-center">SYSTEM RELEASES</h2>
            <div className="w-full max-w-4xl space-y-32">
              {PORTFOLIO_DATA.projects.map((project, i) => (
                <div 
                  key={project.id} 
                  className={`flex flex-col md:flex-row gap-8 items-center pointer-events-auto ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 backdrop-blur-md bg-zinc-950/40 p-8 rounded-3xl border border-white/10 shadow-2xl hover:border-cyan-500/50 transition-colors group">
                    <span className="text-cyan-400 font-mono text-xs mb-2 block">{project.year} // {project.category}</span>
                    <h3 className="text-3xl font-bold font-orbitron text-white mb-4 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-black/50 text-zinc-500 rounded text-[10px] font-mono border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-block text-sm font-mono text-white bg-white/10 px-6 py-2 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                        VIEW REPOSITORY
                      </a>
                    )}
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>

        </Scroll>
      </ScrollControls>
    </>
  );
}
