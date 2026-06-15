"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#121214"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          emissive="#00E5FF"
          emissiveIntensity={0.15}
          wireframe={true}
        />
      </Sphere>
      {/* Inner glowing core */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.1} />
      </Sphere>
    </Float>
  );
}

export default function AbstractBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,rgba(10,10,11,1)_70%)]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="pointer-events-auto">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00E5FF" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <AnimatedShape />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
