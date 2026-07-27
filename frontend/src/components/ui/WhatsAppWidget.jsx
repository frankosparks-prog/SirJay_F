"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  const whatsappUrl = "https://wa.me/254719185821?text=Hello%20Sir%20Jay%20Institute%2C%20I%20would%20like%20to%20inquire%20about%20admissions.";

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-600 transition-colors focus:outline-none"
        aria-label="Contact Sir Jay Institute on WhatsApp"
      >
        {/* Continuous Pulse Glow */}
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-emerald-500 pointer-events-none"
        />

        <MessageCircle className="w-7 h-7 stroke-[2.2] relative z-10" />

        {/* Tooltip */}
        <span className="absolute left-16 bg-navy-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-gold-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
