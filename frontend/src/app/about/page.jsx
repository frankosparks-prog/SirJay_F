"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Shield,
  Award,
  Users,
  Sparkles,
  CheckCircle2,
  BookOpen,
  MapPin,
  Building2,
  Check,
  Heart,
  Cpu,
  RefreshCw,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const coreValues = [
  { title: "Integrity", desc: "Upholding high moral standards, transparency, and ethical conduct in all operations.", icon: Shield },
  { title: "Excellence", desc: "Striving for uncompromised quality in design execution, teaching, and output.", icon: Award },
  { title: "Student Success & Completion", desc: "Prioritizing individual student growth from enrollment to graduation and employment.", icon: Target },
  { title: "Diversity", desc: "Welcoming students from across Kenya and beyond, fostering an inclusive creative space.", icon: Users },
  { title: "Collaborations", desc: "Building strong partnerships with fashion houses, ICT firms, and TVETA stakeholders.", icon: Sparkles },
  { title: "Lifelong Learning", desc: "Encouraging continuous skill upgrading in line with evolving industry trends.", icon: RefreshCw },
  { title: "Technological Advancement", desc: "Integrating modern electric machinery, CAD software, and digital media tools.", icon: Cpu },
];

const admissionReqs = [
  "National ID Card copy (or Passport for international applicants)",
  "Two (2) recent passport-size color photographs",
  "KNEC KCSE/KCPE Examination Result Slip or Certificate",
  "Duly filled Sir Jay Training Institute Registration Form",
];

export default function AboutPage() {
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
              About Sir Jay Training Institute
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Transforming Talent into{" "}
            <span className="text-gradient-gold">Sustainable Careers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Sir Jay Training Institute is a premier TVETA-registered vocational institution located in Nanyuki, Laikipia County, Kenya. Dedicated to bridging academic theory with real-world market demands in Fashion, ICT, and Media Arts.
          </motion.p>
        </div>
      </section>

      {/* INTRODUCTION & CAMPUS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase text-gold-400 tracking-wider">
                Our Institutional Legacy
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Empowering Kenya&apos;s Creative Class
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Founded under the banner of excellence and craftsmanship, Sir Jay Training Institute was established to provide practical skills education that produces self-reliant graduates. We understand that traditional education often misses the practical spark required to start a business or excel in modern production houses.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Our workshops in Nanyuki are equipped with industrial-grade machinery, heavy-duty drafting tables, and modern computing facilities so that students learn on the exact equipment used in commercial industries.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Nanyuki Campus</div>
                  <div className="text-xs text-slate-400">Hospital Road, Laikipia</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">TVETA Approved</div>
                  <div className="text-xs text-slate-400">KNQF Levels 3 - 6</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold-400" />
                  Admission Requirements
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-gold-500/20 text-gold-300">
                  Easy Entry
                </span>
              </div>

              <p className="text-xs text-slate-300">
                To enroll in any of our Artisan, Certificate, or Diploma courses, ensure you bring the following items to our admissions office:
              </p>

              <ul className="space-y-3 text-xs text-slate-200">
                {admissionReqs.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-800">
                <Button href="/admissions" className="w-full" icon={Sparkles}>
                  Start Online Application
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION & MISSION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Guiding Principles"
          title="Vision & Mission"
          titleHighlight="Statement"
          subtitle="Our strategic roadmap for empowering students with marketable technical skills and ethical leadership."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl glass-card border border-gold-500/30 space-y-4 hover:border-gold-500/50 transition-all relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &ldquo;Provide excellent skills and educational opportunities that are responsive to the needs of our students and empower them to meet and exceed challenges as active participants in shaping the future of the world.&rdquo;
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 rounded-3xl glass-card border border-gold-500/30 space-y-4 hover:border-gold-500/50 transition-all relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Strengthen industrial collaborations, inculcate entrepreneurial attitude, and remain a student-centric workshop where technical creativity converts into sustainable income.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES GRID (7 VALUES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Institutional Pillars"
          title="Our 7 Core"
          titleHighlight="Values"
          subtitle="The foundational principles that guide our trainers, staff, and student interactions daily."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const ValIcon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-card glass-card-hover space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <ValIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{val.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
