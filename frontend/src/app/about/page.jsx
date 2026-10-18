"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
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

// Custom styled SVG for Vision (visual inspection lens & eye)
function VisionInspectionIcon({ className = "w-8 h-auto", ...props }) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 68.3"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <title>visual-inspection</title>
      <path d="M1.1,31.27A106.12,106.12,0,0,1,11.39,20.42C25.76,7.34,42.08.36,59,0S93,5.93,109.29,19.32a121.64,121.64,0,0,1,12.53,12,4.08,4.08,0,0,1,.25,5.18,80.29,80.29,0,0,1-15.36,16.4q-2.14,1.71-4.37,3.23l-5.73-6c1.71-1.11,3.39-2.33,5-3.64a70.31,70.31,0,0,0,11.88-12.15,112.51,112.51,0,0,0-9.39-8.75C89.44,13.5,74,7.83,59.12,8.14S29.77,14.71,16.87,26.45a96.58,96.58,0,0,0-7.48,7.63A80.69,80.69,0,0,0,23.88,47.29,67.91,67.91,0,0,0,63.4,60.17c1,0,2.07,0,3.1-.09l7.18,7.41a70.35,70.35,0,0,1-10.25.81A76,76,0,0,1,19.19,54,89.55,89.55,0,0,1,.88,36.58a4.07,4.07,0,0,1,.22-5.31ZM62.8,11.91a22,22,0,0,1,21,28.22,21.56,21.56,0,0,1-2.23,5L94.33,58.67a1,1,0,0,1-.06,1.48L88,65.85a1,1,0,0,1-1.48-.07L74.2,52.62a22,22,0,0,1-19.79,1.53,22,22,0,0,1-7.12-4.77l0-.05a22,22,0,0,1,7.17-35.75,21.77,21.77,0,0,1,8.39-1.67Zm12.39,9.56a17.64,17.64,0,0,0-5.69-3.8l0,0a17.66,17.66,0,0,0-13.35,0,17.82,17.82,0,0,0-5.68,3.8,17.52,17.52,0,0,0-3.8,5.7l0,0a17.62,17.62,0,0,0-1.3,6.64,17.51,17.51,0,0,0,5.13,12.39,17.51,17.51,0,0,0,24.77,0,17.51,17.51,0,0,0,5.13-12.39A17.25,17.25,0,0,0,79,27.17a17.52,17.52,0,0,0-3.8-5.7ZM59.32,22.7a7.4,7.4,0,1,1-7.39,7.39,7.39,7.39,0,0,1,7.39-7.39Z" />
    </svg>
  );
}

// Custom styled SVG for Mission (space rocket launch)
function MissionRocketIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 120.81"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <title>rocket-mission</title>
      <g>
        <path d="M15.44,85.83c1.26-0.98,3.08-0.75,4.06,0.51c0.98,1.26,0.75,3.08-0.51,4.06l-13.1,10.17l-0.1,13.39l15.78-0.88l8.73-13.87 c0.85-1.35,2.63-1.75,3.98-0.9c1.35,0.85,1.75,2.63,0.9,3.98l-9.47,15.05c-0.47,0.81-1.33,1.37-2.34,1.43L3.04,119.9l0,0 c-0.06,0-0.11,0-0.17,0c-1.59-0.01-2.88-1.3-2.87-2.89l0.13-17.65c-0.07-0.93,0.32-1.88,1.11-2.5L15.44,85.83L15.44,85.83z M40.28,53.81c6.59-19.69,15.46-33.64,27.95-42.44C81.2,2.25,97.86-1.21,119.69,0.37c1.51,0.11,2.66,1.35,2.69,2.83 c2.11,23.64-2.47,40.4-12.25,53.1C100.71,68.51,86.6,76.77,69.07,83.7v23.07c0,1.13-0.65,2.11-1.6,2.59l-17.84,11.02 c-1.35,0.84-3.13,0.42-3.97-0.94c-0.22-0.36-0.36-0.75-0.41-1.14l0,0c-3.95-30.19-8.15-31.64-32.83-40.18 C9.48,77.1,6.29,76,4.14,75.24c-1.5-0.53-2.29-2.18-1.76-3.69c0.11-0.32,0.28-0.61,0.48-0.86l11.76-16.77 c0.59-0.84,1.54-1.27,2.5-1.23v0L40.28,53.81L40.28,53.81z M84.68,25.72c3.36,0,6.4,1.36,8.6,3.56c2.2,2.2,3.56,5.24,3.56,8.6 c0,3.36-1.36,6.4-3.56,8.6c-2.2,2.2-5.24,3.56-8.6,3.56c-3.36,0-6.4-1.36-8.6-3.56c-2.2-2.2-3.56-5.24-3.56-8.6 c0-3.36,1.36-6.4,3.56-8.6C78.28,27.08,81.32,25.72,84.68,25.72L84.68,25.72z M90.48,32.08c-1.48-1.48-3.53-2.4-5.8-2.4 c-2.26,0-4.31,0.92-5.8,2.4c-1.48,1.48-2.4,3.53-2.4,5.8c0,2.26,0.92,4.31,2.4,5.8c1.48,1.48,3.53,2.4,5.8,2.4 c2.26,0,4.31-0.92,5.8-2.4c1.48-1.48,2.4-3.53,2.4-5.8C92.88,35.61,91.96,33.56,90.48,32.08L90.48,32.08z M71.55,16.1 c-11.81,8.32-20.18,21.94-26.43,41.43c-0.34,1.29-1.54,2.22-2.93,2.15l-23.77-1.16L9.64,71.05c1.86,0.65,3.29,1.15,4.66,1.62 c26.32,9.1,31.79,10.99,36.07,40.47l12.91-7.97V81.74h0.01c0-1.16,0.71-2.25,1.85-2.69c17.46-6.72,31.41-14.6,40.41-26.28 c8.59-11.15,12.75-25.95,11.26-46.79C97.58,4.92,82.89,8.13,71.55,16.1L71.55,16.1z" />
      </g>
    </svg>
  );
}

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
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/10 text-gold-700">
                  Admissions Checklist
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
            {/* VISION CARD */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden group p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-slate-300 transition-all duration-300 cursor-pointer text-slate-900 flex flex-col justify-between"
            >
              {/* Natural Architectural Watermark SVG */}
              <div className="absolute -right-8 -bottom-8 w-60 sm:w-68 h-auto pointer-events-none select-none text-slate-900/[0.04] transition-all duration-500 ease-out group-hover:text-gold-700/[0.08] group-hover:scale-105 group-hover:-translate-y-1">
                <VisionInspectionIcon className="w-full h-auto" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200/80 text-navy-900 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-50 group-hover:border-gold-300/80 group-hover:text-gold-700 shadow-sm">
                    <VisionInspectionIcon className="w-8 h-auto transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-gold-600 transition-colors">
                    Institutional Vision
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal italic">
                    &ldquo;Provide excellent skills and educational opportunities that are responsive to the needs of our students and empower them to meet and exceed challenges as active participants in shaping the future of the world.&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* MISSION CARD */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden group p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-slate-300 transition-all duration-300 cursor-pointer text-slate-900 flex flex-col justify-between"
            >
              {/* Natural Architectural Watermark SVG */}
              <div className="absolute -right-6 -bottom-6 w-52 sm:w-60 h-auto pointer-events-none select-none text-slate-900/[0.04] transition-all duration-500 ease-out group-hover:text-gold-700/[0.08] group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-0.5">
                <MissionRocketIcon className="w-full h-auto" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200/80 text-navy-900 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-50 group-hover:border-gold-300/80 group-hover:text-gold-700 shadow-sm">
                    <MissionRocketIcon className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-gold-600 transition-colors">
                    Strategic Mission
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    Strengthen industrial collaborations, inculcate entrepreneurial attitude, and remain a student-centric workshop where technical creativity converts into sustainable income.
                  </p>
                </div>
              </div>
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
