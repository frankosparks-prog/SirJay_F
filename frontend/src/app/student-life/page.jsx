"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Laptop,
  Users,
  Award,
  Sparkles,
  HeartHandshake,
  Camera,
  Layers,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const galleryCards = [
  {
    id: 1,
    title: "Fashion Studio Workshop",
    category: "Practical Crafting",
    description: "Students operating industrial electric sewing machines, drafting patterns, and stitching bespoke garments under master instructor guidance.",
    icon: Scissors,
    gradient: "from-amber-600/30 via-navy-900 to-navy-950",
    border: "border-amber-500/30",
  },
  {
    id: 2,
    title: "ICT & Media Computer Lab",
    category: "Digital Design",
    description: "Hands-on digital pattern CAD software, Adobe Creative Cloud illustration, and photo editing suites for modern fashion portfolios.",
    icon: Laptop,
    gradient: "from-blue-600/30 via-navy-900 to-navy-950",
    border: "border-blue-500/30",
  },
  {
    id: 3,
    title: "Group Business Mentorship",
    category: "Entrepreneurship",
    description: "Interactive peer sessions covering pricing strategies, client negotiation, brand storytelling, and launching independent design brands.",
    icon: Users,
    gradient: "from-purple-600/30 via-navy-900 to-navy-950",
    border: "border-purple-500/30",
  },
  {
    id: 4,
    title: "Annual Graduation Ceremony",
    category: "Celebration",
    description: "Celebrating student milestones with live runway showcases, alumni awards, and certificate handovers before family and industry leaders.",
    icon: Award,
    gradient: "from-gold-600/30 via-navy-900 to-navy-950",
    border: "border-gold-500/30",
  },
];

const studentHighlights = [
  {
    title: "Hands-On Studio Culture",
    desc: "Every student has dedicated access to equipment. No sharing machines or waiting for lab time.",
  },
  {
    title: "Exhibitions & Fashion Shows",
    desc: "Showcase your term project collections on the Nanyuki runway before prospective buyers.",
  },
  {
    title: "Alumni Network & Job Match",
    desc: "Direct connection with Sir Jay Suits bespoke tailors and regional apparel companies.",
  },
];

export default function StudentLifePage() {
  return (
    <div className="space-y-20 pb-20 pt-6">
      {/* PAGE HEADER */}
      <section className="relative py-16 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-gold-500/20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-gold-500/10 blur-[140px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold-500/10 text-gold-400 border border-gold-500/30">
              Campus Life & Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Vibrant Student Experience in{" "}
            <span className="text-gradient-gold">Nanyuki</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            From annual fashion showcases to computer innovation challenges and graduation days, life at Sir Jay Training Institute is dynamic, creative, and community-driven.
          </motion.p>
        </div>
      </section>

      {/* GALLERY GRID SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Campus Visual Tour"
          title="Inside Our Creative"
          titleHighlight="Studios"
          subtitle="Explore the daily environment where our students turn raw fabric and ideas into commercial fashion lines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryCards.map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`p-8 rounded-3xl glass-panel bg-gradient-to-br ${card.gradient} border ${card.border} space-y-6 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-navy-950/80 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300 shadow-lg">
                    <CardIcon className="w-7 h-7 stroke-[2]" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy-950/80 text-gold-300 border border-gold-500/20">
                    {card.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-gold-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Sir Jay Nanyuki Campus</span>
                  <span className="text-gold-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Facility <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* STUDENT HIGHLIGHTS & COMMUNITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl glass-card border border-gold-500/20 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Student Centric Approach
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              What Makes Student Life Special Here?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2"
              >
                <h4 className="text-lg font-bold text-gold-300">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button href="/admissions" icon={Sparkles}>
              Become Part of Our Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
