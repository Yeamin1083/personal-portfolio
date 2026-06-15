"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function AbstractLaptop() {
  const group = useRef<THREE.Group>(null);

  // Rotate slowly over time
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <Float rotationIntensity={0.2} floatIntensity={1} speed={2}>
        {/* Base */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[4, 0.2, 3]} />
          <meshStandardMaterial color="#202025" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Keyboard Area Indicator */}
        <mesh position={[0, -0.39, 0.2]}>
          <boxGeometry args={[3.6, 0.05, 1.8]} />
          <meshStandardMaterial color="#101015" />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, -0.39, 1.3]}>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#1a1a20" />
        </mesh>

        {/* Screen/Lid (Rotated open) */}
        <group position={[0, -0.4, -1.5]} rotation={[-Math.PI * 0.45, 0, 0]}>
          <mesh position={[0, 1.5, 0]}>
            <boxGeometry args={[4, 3, 0.1]} />
            <meshStandardMaterial color="#202025" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Screen Display Glowing */}
          <mesh position={[0, 1.5, 0.06]}>
            <boxGeometry args={[3.8, 2.7, 0.01]} />
            <meshBasicMaterial color="#00E5FF" toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function LaptopModelScene() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }} className="pointer-events-auto">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <AbstractLaptop />
        </PresentationControls>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
