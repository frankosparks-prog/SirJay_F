"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Home, BookOpen, PhoneCall } from "lucide-react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";

const GlassAccent = dynamic(() => import("@/components/3d/GlassAccent"), {
  ssr: false,
});

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Floating 3D Accent */}
      <div className="absolute -top-10 -right-10 hidden md:block pointer-events-none opacity-50 z-0">
        <GlassAccent type="knot" className="w-80 h-80" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-8">
        {/* Brand Icon Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-2xl border border-gold-400/40"
        >
          <GraduationCap className="w-10 h-10 stroke-[2.5]" />
        </motion.div>

        {/* 404 Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-7xl sm:text-9xl font-black tracking-tighter text-gradient-gold">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Page or Studio Not Found
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-normal"
        >
          The page or course link you are looking for might have been moved, renamed, or is temporarily undergoing curriculum updates.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Button href="/" size="lg" icon={Home} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Return to Homepage
          </Button>

          <Button href="/academics" variant="outline" size="lg" icon={BookOpen} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Browse Courses
          </Button>
        </motion.div>

        {/* Direct Contact Helper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-8 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-4 h-4 text-gold-400 shrink-0" />
          <span>Need help finding something? Call our Admissions Desk: </span>
          <a href="tel:+254719185821" className="text-gold-300 font-bold hover:underline">
            +254 719 185 821
          </a>
        </motion.div>
      </div>
    </div>
  );
}
