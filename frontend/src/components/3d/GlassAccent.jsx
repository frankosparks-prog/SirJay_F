"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// 3D Academic Book Geometry Component
function AcademicBookMesh({ color = "#D4AF37" }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={groupRef} scale={[0.9, 0.9, 0.9]}>
        {/* Book Cover */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 2.0, 0.28]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Book Pages */}
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[1.38, 1.9, 0.22]} />
          <meshStandardMaterial color="#FFFDF0" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Gold Spine Trim */}
        <mesh position={[-0.72, 0, 0]}>
          <boxGeometry args={[0.08, 2.02, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Gold Ribbon Bookmark */}
        <mesh position={[0.2, -1.0, 0.1]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.12, 0.8]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Academic Staff / Scepter Component
function AcademicStaffMesh({ color = "#D4AF37" }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.0008) * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.3}>
      <group ref={groupRef} scale={[0.85, 0.85, 0.85]}>
        {/* Staff Shaft */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 2.2, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Staff Ring Accent */}
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.04, 16, 32]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Staff Head Gemstone Crest */}
        <mesh position={[0, 0.8, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <MeshDistortMaterial
            color={color}
            roughness={0.1}
            metalness={0.9}
            distort={0.25}
            speed={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Graduation Cap Component
function GraduationCapMesh({ color = "#D4AF37" }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.12;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={groupRef} scale={[0.9, 0.9, 0.9]}>
        {/* Diamond Top Board */}
        <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.7, 0.06, 1.7]} />
          <meshStandardMaterial color="#0B1B2B" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Skull Cap Base */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.4, 32]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Center Button */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Gold Tassel Band */}
        <mesh position={[0.4, 0.05, 0.4]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    </Float>
  );
}

// Generic Glass Geometry Component
function GlassShape({ type = "torus", color = "#D4AF37", theme = "gold" }) {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  const renderGeometry = () => {
    switch (type) {
      case "sphere":
        return <sphereGeometry args={[1.2, 32, 32]} />;
      case "knot":
        return <torusKnotGeometry args={[0.85, 0.28, 64, 16]} />;
      case "ribbon":
        return <cylinderGeometry args={[0.75, 1.25, 1.6, 32, 32, true]} />;
      case "torus":
      default:
        return <torusGeometry args={[1.05, 0.32, 32, 64]} />;
    }
  };

  const getMaterialProps = () => {
    if (theme === "emerald") {
      return {
        color: "#10B981",
        roughness: 0.12,
        metalness: 0.85,
        distort: 0.3,
        speed: 1.8,
        transparent: true,
        opacity: 0.75,
      };
    }
    if (theme === "sapphire") {
      return {
        color: "#1E3A8A",
        roughness: 0.15,
        metalness: 0.9,
        distort: 0.25,
        speed: 1.5,
        transparent: true,
        opacity: 0.75,
      };
    }
    return {
      color: color,
      roughness: 0.1,
      metalness: 0.88,
      distort: 0.32,
      speed: 2,
      transparent: true,
      opacity: 0.7,
    };
  };

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={meshRef} scale={[1, 1, 1]}>
        {renderGeometry()}
        <MeshDistortMaterial
          {...getMaterialProps()}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function GlassAccent({
  type = "torus",
  color = "#D4AF37",
  theme = "gold",
  className = "w-48 h-48",
}) {
  const renderModel = () => {
    if (type === "book") return <AcademicBookMesh color={color} />;
    if (type === "staff") return <AcademicStaffMesh color={color} />;
    if (type === "cap") return <GraduationCapMesh color={color} />;
    return <GlassShape type={type} color={color} theme={theme} />;
  };

  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 6, 4]} intensity={2.5} color="#FFFDF0" />
        <directionalLight position={[-5, -4, -3]} intensity={1.4} color="#1E3A8A" />
        <pointLight position={[0, 1, 3]} intensity={2.0} color="#E6C665" />
        {renderModel()}
      </Canvas>
    </div>
  );
}
