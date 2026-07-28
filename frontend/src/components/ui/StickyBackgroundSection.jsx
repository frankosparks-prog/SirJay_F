"use client";

import { motion } from "framer-motion";

export default function StickyBackgroundSection({
  bgImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop",
  overlayColor = "bg-navy-950/45",
  children,
  className = "",
}) {
  return (
    <div
      className={`relative bg-fixed bg-cover bg-center my-12 border-y border-gold-500/30 overflow-hidden ${className}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Balanced High-Clarity Overlay (Ensures Image & Text are Both Crisp) */}
      <div className={`absolute inset-0 ${overlayColor} pointer-events-none`} />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/20 to-navy-950/70 pointer-events-none" />

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28"
      >
        {children}
      </motion.div>
    </div>
  );
}
