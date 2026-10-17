"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      
      // Mouse interaction
      const mouse = state.mouse;
      ref.current.rotation.x += mouse.y * 0.01;
      ref.current.rotation.y += mouse.x * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Endless scroll effect
      ref.current.position.z = (state.clock.elapsedTime * 0.5) % 1;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <gridHelper args={[40, 40, "#00E5FF", "#06B6D4"]} ref={ref} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#09090b" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function AbstractBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 bg-zinc-950">
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, rgba(9, 9, 11, 0.9) 80%)"
        }}
      />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#09090b"]} />
        <fog attach="fog" args={["#09090b", 2, 10]} />
        
        <ambientLight intensity={0.5} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ParticleField />
        <GridFloor />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[2, 1, -2]} rotation={[Math.PI/4, Math.PI/4, 0]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial color="#3B82F6" wireframe />
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[-2, 0, -3]} rotation={[Math.PI/2, Math.PI/4, 0]}>
            <icosahedronGeometry args={[0.8, 0]} />
            <meshBasicMaterial color="#00E5FF" wireframe />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
