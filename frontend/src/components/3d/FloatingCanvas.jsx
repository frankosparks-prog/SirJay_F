"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles } from "@react-three/drei";

function FashionMesh() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function SecondaryRing() {
  const ringRef = useRef(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.2;
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={ringRef} scale={2.8}>
      <torusGeometry args={[1.2, 0.03, 16, 100]} />
      <meshStandardMaterial
        color="#1F4E79"
        emissive="#0C2033"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function FloatingCanvas() {
  return (
    <div className="relative w-full h-[380px] lg:h-[500px] rounded-3xl overflow-hidden glass-card border border-gold-500/30 shadow-2xl group">
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/80 via-transparent to-gold-500/10 pointer-events-none z-10"></div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFF8DC" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#387BB2" />

        <FashionMesh />
        <SecondaryRing />

        <Sparkles count={40} scale={6} size={2.5} speed={0.4} color="#E6C665" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-navy-950/80 border border-gold-500/30 text-[10px] uppercase font-bold text-gold-300 tracking-widest backdrop-blur-md">
        Interactive 3D Motif • Drag to rotate
      </div>
    </div>
  );
}
