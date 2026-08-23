"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Eye,
  Target,
  Shield,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  MapPin,
  Building2,
  RefreshCw,
  Cpu,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import StickyBackgroundSection from "@/components/ui/StickyBackgroundSection";

const GlassAccent = dynamic(() => import("@/components/3d/GlassAccent"), {
  ssr: false,
});

const TargetCursor = dynamic(() => import("@/components/ui/TargetCursor"), {
  ssr: false,
});

const coreValues = [
  { title: "Integrity", desc: "Upholding high moral standards, transparency, and ethical conduct in all institutional operations.", icon: Shield },
  { title: "Excellence", desc: "Striving for uncompromised quality in garment execution, teaching, and practical output.", icon: Award },
  { title: "Student Success", desc: "Prioritizing individual student growth from initial enrollment to graduation and employment.", icon: Target },
  { title: "Diversity", desc: "Welcoming students from across Kenya and beyond, fostering an inclusive creative space.", icon: Users },
  { title: "Collaborations", desc: "Building strong partnerships with fashion houses, ICT firms, and TVETA stakeholders.", icon: Building2 },
  { title: "Lifelong Learning", desc: "Encouraging continuous skill upgrading in line with evolving commercial trends.", icon: RefreshCw },
  { title: "Technological Advancement", desc: "Integrating modern electric machinery, CAD software, and digital media tools.", icon: Cpu },
];

const admissionReqs = [
  "National ID Card copy (or Passport for international applicants)",
  "Two (2) recent passport-size color photographs",
  "KNEC KCSE/KCPE Examination Result Slip or Certificate",
  "Duly filled Sir Jay Training Institute Registration Form",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      <TargetCursor
        targetSelector=".cursor-target"
        cursorColor="#D4AF37"
        cursorColorOnTarget="#F59E0B"
      />

      {/* PAGE HERO BANNER */}
      <PageHero
        badge="About Sir Jay Institute"
        title="Transforming Talent into"
        titleHighlight="Sustainable Careers"
        subtitle="Sir Jay Training Institute is a premier TVETA-registered vocational institution located in Nanyuki, Laikipia County, Kenya. Dedicated to bridging academic theory with real-world market demands."
        bgImage="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop"
        breadcrumbs={[{ label: "About Us" }]}
      />

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
              <span className="text-xs font-extrabold uppercase text-gold-600 tracking-wider">
                Our Institutional Legacy
              </span>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                Empowering Kenya&apos;s Creative Class
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Founded under the banner of craftsmanship and excellence, Sir Jay Training Institute was established to provide practical skills education that produces self-reliant graduates. We understand that traditional education often misses the practical spark required to start a business or excel in modern production houses.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Our workshops in Nanyuki are equipped with industrial electric machinery, heavy-duty drafting tables, and modern computing facilities so that students learn on the exact equipment used in commercial industries.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold-600 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Nanyuki Campus</div>
                  <div className="text-xs text-slate-500">Hospital Road, Laikipia</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gold-600 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">TVETA Approved</div>
                  <div className="text-xs text-slate-500">KNQF Levels 3 - 6</div>
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
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold-600" />
                  Admission Requirements
                </h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/10 text-gold-600">
                  Easy Entry
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                To enroll in any of our Artisan, Certificate, or Diploma courses, ensure you bring the following items to our admissions office:
              </p>

              <ul className="space-y-3 text-xs text-slate-700">
                {admissionReqs.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-100">
                <Button href="/admissions" className="w-full" icon={Award}>
                  Start Online Application
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STICKY PARALLAX BACKGROUND OVERLAY: VISION & MISSION WITH 3D ACADEMIC BOOK */}
      <StickyBackgroundSection
        bgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-navy-950/45"
      >
        <div className="space-y-12 relative">
          {/* 3D Academic Book Model Floating Accent */}
          <div className="absolute -top-16 -right-12 hidden lg:block pointer-events-none z-0">
            <GlassAccent type="book" className="w-64 h-64 opacity-80" />
          </div>

          <SectionHeader
            dark={true}
            // badge="Guiding Principles"
            title="Vision & Mission"
            titleHighlight="Statement"
            subtitle="Our strategic roadmap for empowering students with marketable technical skills and ethical leadership."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl space-y-4 hover:border-gold-500/50 transition-all cursor-pointer text-slate-900"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-navy-700 font-bold">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                &ldquo;Provide excellent skills and educational opportunities that are responsive to the needs of our students and empower them to meet and exceed challenges as active participants in shaping the future of the world.&rdquo;
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl space-y-4 hover:border-gold-500/50 transition-all cursor-pointer text-slate-900"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-navy-700 font-bold">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Strengthen industrial collaborations, inculcate entrepreneurial attitude, and remain a student-centric workshop where technical creativity converts into sustainable income.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </StickyBackgroundSection>

      {/* CORE VALUES GRID WITH 3D ACADEMIC STAFF ACCENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
        {/* 3D Academic Staff Model Accent */}
        <div className="absolute -top-16 -left-10 hidden lg:block pointer-events-none z-0">
          <GlassAccent type="staff" className="w-64 h-64 opacity-75" />
        </div>

        <SectionHeader
          badge="Institutional Pillars"
          title="Our 7 Core"
          titleHighlight="Values"
          subtitle="The foundational principles that guide our trainers, staff, and student interactions daily."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {coreValues.map((val) => {
            const ValIcon = val.icon;
            return (
              <motion.div
                key={val.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="cursor-target p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-700 flex items-center justify-center font-bold shrink-0">
                    <ValIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{val.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
