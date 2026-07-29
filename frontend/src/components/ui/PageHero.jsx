"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const DotField = dynamic(() => import("@/components/ui/DotField"), {
  ssr: false,
});

const Lightfall = dynamic(() => import("@/components/ui/Lightfall"), {
  ssr: false,
});

export default function PageHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  bgImage = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop",
  breadcrumbs = [],
  variant,
}) {
  const pathname = usePathname() || "";

  // Determine animation overlay type based on explicit variant prop or route path
  let activeVariant = variant;
  if (!activeVariant) {
    if (pathname.includes("/academics") || pathname.includes("/student-life") || pathname.includes("/contact")) {
      activeVariant = "lightfall";
    } else {
      activeVariant = "dotfield";
    }
  }

  return (
    <section className="relative min-h-[420px] md:min-h-[480px] flex items-center justify-center bg-navy-950 overflow-hidden text-white border-b border-gold-500/20">
      {/* Background Image with Zoom-out animation */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />

      {/* Dark Overlay Gradient - Lighter for high image clarity */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/20 z-10 pointer-events-none"></div>

      {/* Futuristic Animation Overlay (DotField or Lightfall) */}
      <div className="absolute inset-0 z-15 pointer-events-none opacity-80 overflow-hidden mix-blend-screen">
        {activeVariant === "lightfall" ? (
          <Lightfall
            colors={["#D4AF37", "#F59E0B", "#3B82F6"]}
            backgroundColor="#020617"
            speed={0.4}
            streakCount={4}
            streakWidth={1.2}
            streakLength={1.2}
            glow={1}
            density={0.5}
            zoom={2.5}
            backgroundGlow={0.1}
            opacity={0.6}
            mouseInteraction={true}
          />
        ) : (
          <DotField
            dotRadius={2.8}
            dotSpacing={14}
            cursorForce={0.15}
            bulgeStrength={85}
            glowRadius={220}
            sparkle={true}
            waveAmplitude={2.5}
            gradientFrom="rgba(255, 215, 0, 0.95)"
            gradientTo="rgba(245, 158, 11, 0.8)"
            glowColor="#FFD700"
          />
        )}
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-20 space-y-5">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          <Link href="/" className="hover:text-gold-400 transition-colors">
            Home
          </Link>
          {breadcrumbs.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
              {item.href ? (
                <Link href={item.href} className="hover:text-gold-400 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gold-400">{item.label}</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold-500/10 text-gold-300 border border-gold-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md"
        >
          {title}{" "}
          {titleHighlight && (
            <span className="text-gradient-gold block md:inline font-extrabold">
              {titleHighlight}
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
