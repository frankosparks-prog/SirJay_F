"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";

function SilkFabric() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.1;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[3.2, 3.2, 1]}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <MeshDistortMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.8}
          distort={0.45}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function SecondaryFabricLayer() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -0.6]} scale={[3.8, 3.8, 1]}>
        <planeGeometry args={[1, 1, 48, 48]} />
        <MeshDistortMaterial
          color="#1F4E79"
          roughness={0.3}
          metalness={0.7}
          distort={0.35}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingCanvas() {
  return (
    <div className="relative w-full h-[380px] lg:h-[480px] rounded-3xl overflow-hidden bg-navy-950 border border-gold-500/30 shadow-2xl group">
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/90 via-transparent to-gold-500/10 pointer-events-none z-10"></div>

      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#FFFDF0" />
        <pointLight position={[-5, -5, -2]} intensity={1.2} color="#387BB2" />

        <SilkFabric />
        <SecondaryFabricLayer />

        <Sparkles count={35} scale={5} size={2.2} speed={0.5} color="#E6C665" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-navy-950/90 border border-gold-500/30 text-[10px] uppercase font-bold text-gold-300 tracking-widest backdrop-blur-md">
        3D Silk Fabric Simulation • Interactive
      </div>
    </div>
  );
}
