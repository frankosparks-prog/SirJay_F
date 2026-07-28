"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";

/*
// ==========================================
// PREVIOUS 3D SILK FABRIC CODE (COMMENTED OUT AS REQUESTED)
// ==========================================
// function SilkFabric() {
//   const meshRef = useRef(null);
//   useFrame((_, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.z += delta * 0.1;
//       meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
//     }
//   });
//   return (
//     <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
//       <mesh ref={meshRef} scale={[3.2, 3.2, 1]}>
//         <planeGeometry args={[1, 1, 64, 64]} />
//         <MeshDistortMaterial color="#D4AF37" roughness={0.2} metalness={0.8} distort={0.45} speed={2} />
//       </mesh>
//     </Float>
//   );
// }
// ==========================================
*/

// UPGRADED ELEGANT 3D FABRIC RIBBON SIMULATION
function FabricRibbonMesh() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0008) * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.4}>
      <mesh ref={meshRef} scale={[3.6, 2.4, 1]}>
        <planeGeometry args={[1, 1, 96, 96]} />
        <MeshDistortMaterial
          color="#D4AF37"
          roughness={0.18}
          metalness={0.85}
          distort={0.55}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

function InnerRibbonLayer() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.18;
      meshRef.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={meshRef} position={[0, 0, -0.4]} scale={[4.2, 2.8, 1]}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <MeshDistortMaterial
          color="#1A3B5C"
          roughness={0.25}
          metalness={0.75}
          distort={0.4}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingCanvas() {
  return (
    <div className="relative w-full h-[380px] lg:h-[480px] rounded-3xl overflow-hidden bg-navy-950 border border-gold-500/30 shadow-2xl group">
      {/* Subtle Lighting Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/90 via-transparent to-gold-500/10 pointer-events-none z-10"></div>

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 6, 5]} intensity={2.2} color="#FFFDF0" />
        <directionalLight position={[-6, -4, -3]} intensity={1} color="#32628D" />
        <pointLight position={[0, 0, 3]} intensity={1.4} color="#E6C665" />

        <FabricRibbonMesh />
        <InnerRibbonLayer />

        <Sparkles count={40} scale={5.5} size={2.4} speed={0.5} color="#E6C665" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.6}
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-navy-950/90 border border-gold-500/30 text-[10px] uppercase font-bold text-gold-300 tracking-widest backdrop-blur-md">
        3D Fashion Silk Ribbon • Interactive
      </div>
    </div>
  );
}

