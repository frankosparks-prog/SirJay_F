"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Calendar,
  CheckCircle2,
  Scissors,
  Award,
  Sparkles,
  Layers,
  ArrowRight,
  Shirt,
  Music,
  Camera,
  Coffee,
  Sparkle,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseTable from "@/components/ui/CourseTable";
import Button from "@/components/ui/Button";

const fashionDurations = [
  { level: "Beginner", duration: "3 Months", desc: "Machine setup, straight stitching, body measurements, basic skirt & shirt pattern creation." },
  { level: "Intermediate", duration: "3 Months", desc: "Complex garment construction, collar & sleeve techniques, zipper insertions, fabric handling." },
  { level: "Expert", duration: "3 Months", desc: "Bespoke suiting, blazer tailoring, couture evening gowns, embroidery embellishment." },
  { level: "Professional", duration: "3 Months", desc: "Collection drafting, fashion illustration, brand identity, fashion business law & startup." },
];

const all12Units = [
  { title: "Fabrics & Raw Materials", desc: "Understanding natural & synthetic fiber properties, textures, weight, and print pairings." },
  { title: "Fashion Sketching", desc: "Hand-drawn croquis figures, garment drapes, pose proportioning, and concept rendering." },
  { title: "Pattern Drafting (Theory/Practical)", desc: "2D flat pattern development, block manipulation, dart rotation, and grading." },
  { title: "Fashion Design", desc: "Color theory, mood board creation, trend analysis, and collection storytelling." },
  { title: "Clothing Construction", desc: "Step-by-step assembly of trousers, shirts, dresses, suits, and outerwear." },
  { title: "Stitching & Fitting", desc: "Precision seam finishes, body alterings, fitting line adjustments, and press finishing." },
  { title: "Textiles", desc: "Textile manufacturing techniques, weave structures, dye application, and care instructions." },
  { title: "Embroidery", desc: "Decorative hand stitching, beadwork, sequin placement, and machine embroidery art." },
  { title: "Entrepreneurship Education", desc: "Pricing models, business plan development, client communication, and workshop management." },
  { title: "Garment Sewing", desc: "Mastering electric sewing machinery, overlockers, buttonholers, and needle gauges." },
  { title: "Fashion Illustration & CAD", desc: "Digital design software application, technical flat drawings, and digital spec sheets." },
  { title: "Business Law", desc: "Contracts, copyright protection for designs, trade licenses, and labor compliance in Kenya." },
];

const scheduleOptions = [
  { title: "Day Classes", time: "Mon - Fri: 9:00 AM - 5:00 PM", desc: "Full immersive workshop training for regular full-time students.", badge: "Full-Time" },
  { title: "Evening Classes", time: "Mon - Fri: 5:30 PM - 8:00 PM", desc: "Ideal for working professionals and university students upgrading skills.", badge: "Part-Time" },
  { title: "Weekend Classes", time: "Saturday: 10:00 AM - 3:00 PM", desc: "Flexible intensive Saturday practical sessions for busy schedules.", badge: "Weekend" },
];

export default function AcademicsPage() {
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
              Academic Excellence & KNQF Framework
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Sir Jay School of <span className="text-gradient-gold">Fashion Design</span> & Academics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Our flagship curriculum combines 12 comprehensive units with flexible learning schedules and recognized KNQF progression pathways.
          </motion.p>
        </div>
      </section>

      {/* INTUITIVE INTAKES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl glass-panel border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upcoming & Ongoing Intakes</h3>
              <p className="text-xs text-slate-300">
                Major Intakes in <strong className="text-gold-300">January</strong> and generally <strong className="text-gold-300">Ongoing rolling admissions</strong> throughout the year.
              </p>
            </div>
          </div>

          <Button href="/admissions" size="sm" icon={Sparkles}>
            Apply for Current Intake
          </Button>
        </div>
      </section>

      {/* 4 FASHION COURSE DURATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Progressive Modules"
          title="Fashion Design Track"
          titleHighlight="Durations"
          subtitle="Study at your own pace. Each module runs for 3 months and builds directly toward complete professional mastery."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fashionDurations.map((item, idx) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-card glass-card-hover space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                    Tier 0{idx + 1}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-slate-700">
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.level} Level</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-gold-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                <span>3 Months Practical</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 12 CORE UNITS SYLLABUS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Complete Syllabus"
          title="12 Units Covered in"
          titleHighlight="Fashion & Apparel"
          subtitle="Every unit is structured with 70% practical workshop output and 30% business application."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {all12Units.map((unit, idx) => (
            <motion.div
              key={unit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl glass-card space-y-3 border border-white/5 hover:border-gold-500/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 font-bold text-xs shrink-0">
                  {idx + 1}
                </div>
                <h4 className="text-base font-bold text-white">{unit.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                {unit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* KNQF PROGRESSION TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="Official Matrix"
          title="KNQF National Qualification"
          titleHighlight="Progression Table"
          subtitle="See exact entry requirements, study durations, and next level pathways recognized across Kenya."
        />
        <CourseTable />
      </section>

      {/* FLEXIBLE LEARNING HOURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Adaptable Schedules"
          title="Flexible Learning"
          titleHighlight="Hours & Sessions"
          subtitle="Choose the schedule that fits your daily routine without sacrificing hands-on instructor time."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scheduleOptions.map((option, idx) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="p-8 rounded-3xl glass-panel border border-gold-500/20 space-y-4 relative"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/30">
                  {option.badge}
                </span>
                <Clock className="w-5 h-5 text-gold-400" />
              </div>

              <h3 className="text-xl font-bold text-white">{option.title}</h3>

              <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-xs font-bold text-gold-300">
                {option.time}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{option.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMING SOON DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">More Departments Coming Soon</h3>
              <p className="text-xs text-slate-400 mt-1">
                Sir Jay Institute is expanding into Beauty, Music Production, Runway Modeling, and Hospitality.
              </p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/30">
              Future Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Cosmetology & Beauty</span>
              <span className="text-slate-400">Hair, skin, spa & aesthetic therapies.</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Deejay School</span>
              <span className="text-slate-400">DJ equipment, mixing & audio production.</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Modeling School</span>
              <span className="text-slate-400">Runway walks, commercial photoshoot prep.</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Select Hospitality</span>
              <span className="text-slate-400">Front office, event styling & catering.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
