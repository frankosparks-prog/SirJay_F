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
  ArrowRight,
  Shirt,
  Music,
  Camera,
  Coffee,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
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
    <div className="space-y-20 pb-20">
      {/* PAGE HERO BANNER */}
      <PageHero
        badge="Academic Excellence & KNQF Framework"
        title="Sir Jay School of"
        titleHighlight="Fashion Design"
        subtitle="Our flagship curriculum combines 12 comprehensive units with flexible learning schedules and recognized KNQF progression pathways."
        bgImage="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1920&auto=format&fit=crop"
        breadcrumbs={[{ label: "Academics" }]}
      />

      {/* INTUITIVE INTAKES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
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
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">
                    Tier 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{item.level} Level</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-navy-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
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
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-gold-500/50 transition-all"
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
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4 relative"
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
        </div>
      </section>
    </div>
  );
}
