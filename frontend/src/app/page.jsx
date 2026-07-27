"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Scissors,
  Laptop,
  GraduationCap,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Shirt,
  Sparkle,
  Music,
  Camera,
  Coffee,
} from "lucide-react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseTable from "@/components/ui/CourseTable";
import Link from "next/link";

const FloatingCanvas = dynamic(
  () => import("@/components/3d/FloatingCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] lg:h-[500px] flex items-center justify-center rounded-3xl glass-card border border-gold-500/20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-gold-500 border-t-transparent animate-spin"></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
            Initializing 3D Creative Studio...
          </span>
        </div>
      </div>
    ),
  }
);

const stats = [
  { label: "Graduated Alumni", value: "1,800+", icon: Users },
  { label: "Professional Courses", value: "16+", icon: GraduationCap },
  { label: "Self-Employment / Jobs", value: "95%", icon: Briefcase },
  { label: "Practical & Equipment Access", value: "100%", icon: TrendingUp },
];

const fashionTiers = [
  { title: "Beginner Level", duration: "3 Months", desc: "Foundations of sewing, basic sketching, and tool operation." },
  { title: "Intermediate Level", duration: "3 Months", desc: "Garment drafting, fabric selection, and precision fitting." },
  { title: "Expert Level", duration: "3 Months", desc: "Bespoke tailoring, embroidery, and complex pattern making." },
  { title: "Professional Level", duration: "3 Months", desc: "Collection creation, fashion business law, and launch." },
];

const coreUnits = [
  "Fabrics & Raw Materials",
  "Fashion Illustration",
  "Pattern Drafting (Theory/Practical)",
  "Fashion Design Concepting",
  "Clothing Construction",
  "Stitching & Fitting Mastery",
  "Textile Science",
  "Embroidery Art",
  "Entrepreneurship Education",
  "Garment Sewing",
  "Fashion Illustration & CAD",
  "Business Law & Ethics",
];

const whyChooseCards = [
  {
    title: "Modern Studios & Workshops",
    description: "Train with industrial electric sewing machines, heavy-duty pattern tables, and Adobe Creative Cloud labs designed to simulate high-end fashion houses.",
    icon: Scissors,
    tag: "State-of-the-Art",
  },
  {
    title: "Entrepreneurship Mentorship",
    description: "Learn how to monetize your skills. We cover business registration, brand building, pricing strategy, customer relations, and launching your own boutique.",
    icon: Briefcase,
    tag: "Market-Ready",
  },
  {
    title: "Affordable & Flexible Installments",
    description: "Education made accessible with customizable monthly fee payment structures, flexible day/evening/weekend classes, and merit-based scholarship opportunities.",
    icon: Award,
    tag: "Flexible",
  },
];

const comingSoonDepartments = [
  { name: "Cosmetology & Beauty", desc: "Skincare, hair design, aesthetic therapies.", icon: Sparkle },
  { name: "Deejay School", desc: "Digital mixing, sound engineering, performance.", icon: Music },
  { name: "Modeling School", desc: "Runway poise, commercial camera work, portfolio.", icon: Camera },
  { name: "Hospitality Courses", desc: "Customer care, event catering, front office.", icon: Coffee },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 overflow-hidden pt-8 pb-16">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-navy-600/20 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Call-out Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-gold-500/30 text-gold-300 text-xs md:text-sm font-semibold shadow-lg">
                <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
                <span>Admissions Open for 2025/2026</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              {/* Institute Title & Slogan */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-gold-400 block">
                  Sir Jay Training Institute • Nanyuki, Kenya
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  Achieving Greatness <br />
                  <span className="text-gradient-gold">Together.</span>
                </h1>
                <p className="text-sm font-medium text-slate-300 tracking-wide uppercase">
                  Motto: <span className="text-gold-300">Quality, integrity & style</span>
                </p>
              </div>

              {/* Main CTA Prompt */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                &ldquo;Fashion your Future with us. Learn from the best and create your own design style.&rdquo;
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Button href="/admissions" size="lg" icon={ArrowRight}>
                  Apply Today
                </Button>
                <Button href="/academics" variant="outline" size="lg" icon={Shirt}>
                  Explore Programs
                </Button>
              </div>

              {/* Quick Info Pills */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>TVETA Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Day, Evening & Weekend</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>NITA & KNQF Certified</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Right: 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 w-full"
            >
              <FloatingCanvas />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ANIMATED STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl glass-panel border border-gold-500/25 shadow-2xl"
        >
          {stats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <div key={stat.label} className="text-center space-y-2 group">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-navy-800/80 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
                  <IconComp className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* WHY CHOOSE US (3 CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="The Sir Jay Advantage"
          title="Why Students Choose"
          titleHighlight="Sir Jay Institute"
          subtitle="We combine practical hands-on workshop training with real business acumen so every graduate steps into the market ready to produce and earn."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseCards.map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl glass-card glass-card-hover flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-14 h-14 rounded-2xl bg-navy-800 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300 shadow-md">
                      <CardIcon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-gold-400 gap-2">
                  <span>Learn more about this track</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROGRAM: SCHOOL OF FASHION DESIGN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Flagship Department"
          title="Sir Jay School of"
          titleHighlight="Fashion Design"
          subtitle="From zero experience to crafting haute couture suits and contemporary African apparel in 4 progressive 3-month modules."
        />

        {/* 4 Course Durations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fashionTiers.map((tier, idx) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-panel border border-gold-500/20 space-y-3 relative overflow-hidden"
            >
              <div className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Module 0{idx + 1}
              </div>
              <h4 className="text-lg font-extrabold text-white">{tier.title}</h4>
              <div className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-navy-800 text-slate-200 border border-slate-700">
                Duration: {tier.duration}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{tier.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 12 Core Units Covered Grid */}
        <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">12 Core Units Covered</h3>
              <p className="text-xs text-slate-400 mt-1">
                Complete mastery curriculum tested and recognized in Kenya and internationally.
              </p>
            </div>
            <Button href="/academics" size="sm" variant="outline" icon={ArrowRight}>
              View Syllabus
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            {coreUnits.map((unit) => (
              <div
                key={unit}
                className="flex items-center gap-2 p-3 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-200 hover:border-gold-500/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-medium">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KNQF TABLE EMBED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="National Progression"
          title="TVETA & KNQF Qualification"
          titleHighlight="Pathways"
          subtitle="Understand how your studies at Sir Jay Institute build up towards national certificates and university progression."
        />
        <CourseTable />
      </section>

      {/* COMING SOON DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Expanding Horizons"
          title="New Departments"
          titleHighlight="Coming Soon"
          subtitle="Sir Jay Institute is growing to provide comprehensive vocational training across multiple creative industries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {comingSoonDepartments.map((dept, idx) => {
            const DeptIcon = dept.icon;
            return (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-card border border-white/5 space-y-3 hover:border-gold-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                  <DeptIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">{dept.name}</h4>
                <p className="text-xs text-slate-300">{dept.desc}</p>
                <span className="inline-block text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                  Registration Opening Soon
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 md:p-14 rounded-3xl glass-panel border border-gold-500/30 relative overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-extrabold uppercase text-gold-400 tracking-widest">
              Ready to Begin Your Career?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Join Sir Jay Training Institute Today.
            </h2>
            <p className="text-sm md:text-base text-slate-300">
              Classes available for Morning, Evening, and Saturday Weekend schedules in Nanyuki. Flexible fee installments available.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4">
            <Button href="/admissions" size="lg" icon={Sparkles}>
              Enroll Online Now
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Campus
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
