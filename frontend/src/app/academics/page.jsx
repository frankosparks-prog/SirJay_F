"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  BookOpen,
  Clock,
  Calendar,
  CheckCircle2,
  Scissors,
  Award,
  ArrowRight,
  Shirt,
  Music,
  Camera,
  Coffee,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import CourseTable from "@/components/ui/CourseTable";
import Button from "@/components/ui/Button";
import StickyBackgroundSection from "@/components/ui/StickyBackgroundSection";
import { getCourses } from "@/lib/api";

const GlassAccent = dynamic(() => import("@/components/3d/GlassAccent"), {
  ssr: false,
});

const TargetCursor = dynamic(() => import("@/components/ui/TargetCursor"), {
  ssr: false,
});

const defaultCoursesList = [
  {
    _id: "c1",
    title: "School of Fashion Design - Professional Diploma Track",
    category: "fashion",
    level: "Diploma / Certificate",
    duration: "1 Year (4 Modules x 3 Months)",
    fees: "KES 22,000 / Term",
    image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800&auto=format&fit=crop",
    description: "Comprehensive 12-unit curriculum covering pattern drafting, croquis sketching, suit tailoring, couture gown construction, CAD illustration, and fashion business law.",
  },
  {
    _id: "c2",
    title: "Artisan Level 3 Garment Making & Tailoring",
    category: "fashion",
    level: "NITA & TVETA Level 3 Artisan",
    duration: "6 Months",
    fees: "KES 18,500 / Term",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    description: "Hands-on practical workshop training focused on industrial machine sewing, overlock finishing, trouser and skirt assembly, and alterings.",
  },
  {
    _id: "c3",
    title: "Graphic Design & Fashion Vector Illustration",
    category: "ict",
    level: "Craft Certificate",
    duration: "3 Months",
    fees: "KES 15,000 / Term",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    description: "Master Photoshop, Illustrator, and digital croquis design tools to generate technical flat spec sheets, brand logos, and digital mood boards.",
  },
];

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function AcademicsPage() {
  const [coursesList, setCoursesList] = useState(defaultCoursesList);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function loadCourses() {
      const data = await getCourses();
      if (data && data.length > 0) {
        setCoursesList(data);
      }
    }
    loadCourses();
  }, []);

  const filteredCourses =
    selectedCategory === "all"
      ? coursesList
      : coursesList.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      <TargetCursor
        targetSelector=".cursor-target"
        cursorColor="#D4AF37"
        cursorColorOnTarget="#F59E0B"
      />

      {/* PAGE HERO BANNER */}
      <PageHero
        badge="Academic Excellence & KNQF Framework"
        title="Sir Jay School of"
        titleHighlight="Fashion Design"
        subtitle="Our flagship curriculum combines 12 comprehensive units with flexible learning schedules and recognized KNQF progression pathways."
        bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
        breadcrumbs={[{ label: "Academics" }]}
      />

      {/* INTUITIVE INTAKES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-navy-700 font-bold shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Upcoming & Ongoing Intakes</h3>
              <p className="text-xs text-slate-600">
                Major Intakes in <strong className="text-navy-900">January</strong> and generally <strong className="text-navy-900">Ongoing rolling admissions</strong> throughout the year.
              </p>
            </div>
          </div>

          <Button href="/admissions" size="sm" icon={Award}>
            Apply for Current Intake
          </Button>
        </motion.div>
      </section>

      {/* 4 FASHION COURSE DURATIONS WITH 3D GRADUATION CAP ACCENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative">
        <div className="absolute -top-16 -left-12 hidden lg:block pointer-events-none z-0">
          <GlassAccent type="cap" className="w-64 h-64 opacity-75" />
        </div>

        <SectionHeader
          badge="Progressive Modules"
          title="Fashion Design Track"
          titleHighlight="Duration Breakdown"
          subtitle="4 modular stages of 3 months each designed to take students from absolute foundation to industry leadership."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {fashionDurations.map((item, idx) => (
            <motion.div
              key={item.level}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">
                  Module 0{idx + 1} • {item.level}
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">{item.duration}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-navy-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>3 Months Practical</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* DYNAMIC COURSE CATALOG SECTION FETCHED FROM BACKEND API */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Complete Curriculum"
          title="Official Course"
          titleHighlight="Catalog"
          subtitle="Browse all available vocational programs offered at Sir Jay Training Institute (Nanyuki Campus)."
        />

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: "all", label: "All Programs" },
            { id: "fashion", label: "Fashion & Textile Design" },
            { id: "ict", label: "ICT & Digital Media" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-navy-900 text-gold-400 shadow-lg border border-gold-500/40"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course._id || idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={course.image || "https://images.unsplash.com/photo-1537832816519-689ad163238b"}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 text-xs font-extrabold px-3 py-1 rounded-full bg-navy-950/90 text-gold-400 shadow-md backdrop-blur-md">
                  {course.fees}
                </div>
                <div className="absolute top-4 left-4 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/90 text-navy-900 shadow-sm backdrop-blur-md">
                  {course.category}
                </div>
              </div>

              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between text-slate-900">
                <div className="space-y-3">
                  <div className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-md bg-gold-500/10 text-gold-700 border border-gold-500/20">
                    {course.level} • {course.duration}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-navy-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-navy-700">TVETA Recognized</span>
                  <Button href="/admissions" size="sm" icon={ArrowRight}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STICKY BACKGROUND PARALLAX: 12 CORE UNITS */}
      <StickyBackgroundSection
        bgImage="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
        overlayColor="bg-navy-950/40"
      >
        <div className="space-y-12">
          <SectionHeader
            dark={true}
            badge="Full Syllabus Overview"
            title="12 Core Units"
            titleHighlight="Covered"
            subtitle="Every student masters these 12 core competencies during their journey at Sir Jay Institute."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {all12Units.map((unit, idx) => (
              <motion.div
                key={unit.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="cursor-target p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl space-y-3 hover:border-gold-500/50 transition-all cursor-pointer text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{unit.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal pl-11">
                  {unit.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </StickyBackgroundSection>

      {/* KNQF PROGRESSION TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          badge="Qualifications"
          title="National"
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {scheduleOptions.map((option) => (
            <motion.div
              key={option.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4 relative cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {option.badge}
                </span>
                <Clock className="w-5 h-5 text-gold-600" />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">{option.title}</h3>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-800">
                {option.time}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">{option.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
