"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Zap,
  ArrowRight,
  Scissors,
  GraduationCap,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Shirt,
  Music,
  Camera,
  Coffee,
  Palette,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CourseTable from "@/components/ui/CourseTable";
import Counter from "@/components/ui/Counter";
import StickyBackgroundSection from "@/components/ui/StickyBackgroundSection";
import { getHeroConfig, getWhyChooseCards, getFashionModules, getComingSoonDepts } from "@/lib/api";

const GlassAccent = dynamic(() => import("@/components/3d/GlassAccent"), {
  ssr: false,
});

const TargetCursor = dynamic(() => import("@/components/ui/TargetCursor"), {
  ssr: false,
});

const iconMap = {
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Scissors,
  Award,
  Palette,
  Music,
  Camera,
  Coffee,
  BookOpen,
};

const getIconComponent = (name, fallback = Scissors) => {
  return iconMap[name] || fallback;
};

const defaultStats = [
  { label: "Graduated Alumni", value: "1,800", suffix: "+", icon: Users },
  { label: "Professional Courses", value: "16", suffix: "+", icon: GraduationCap },
  { label: "Self-Employment Rate", value: "95", suffix: "%", icon: Briefcase },
  { label: "Practical Workshop Access", value: "100", suffix: "%", icon: TrendingUp },
];

const defaultFashionTiers = [
  { title: "Beginner Level", duration: "3 Months", desc: "Machine setup, straight stitching, body measurements, and basic pattern drafting." },
  { title: "Intermediate Level", duration: "3 Months", desc: "Garment drafting, collar & sleeve techniques, zipper insertions, and precision fitting." },
  { title: "Expert Level", duration: "3 Months", desc: "Bespoke tailoring, blazer construction, couture gowns, and embroidery embellishments." },
  { title: "Professional Level", duration: "3 Months", desc: "Collection drafting, fashion illustration, brand identity, and fashion business law." },
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

const defaultWhyChooseCards = [
  {
    title: "Modern Studios & Workshops",
    description: "Train with industrial electric sewing machines, heavy-duty pattern tables, and Adobe Creative Cloud labs designed to simulate commercial production houses.",
    icon: Scissors,
    tag: "State-of-the-Art",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Entrepreneurship Mentorship",
    description: "Learn how to monetize your creative talent. We cover business registration, brand building, pricing strategy, client relations, and boutique launching.",
    icon: Briefcase,
    tag: "Market-Ready",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Affordable & Flexible Installments",
    description: "Quality vocational education made accessible with monthly fee payment structures, flexible day/evening/weekend classes, and merit scholarships.",
    icon: Award,
    tag: "Flexible",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  },
];

const defaultComingSoonDepartments = [
  { name: "Cosmetology & Beauty", desc: "Skincare, hair design, spa & aesthetic therapies.", icon: Palette },
  { name: "Deejay School", desc: "Digital mixing, sound engineering & live performance.", icon: Music },
  { name: "Modeling School", desc: "Runway poise, commercial photography & portfolio build.", icon: Camera },
  { name: "Hospitality Courses", desc: "Customer care, event catering & front office operations.", icon: Coffee },
];

const easeCurve = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: easeCurve } },
};

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  const [heroBadgeText, setHeroBadgeText] = useState("Admissions Open for 2025/2026");
  const [statsData, setStatsData] = useState(defaultStats);
  const [whyChooseData, setWhyChooseData] = useState(defaultWhyChooseCards);
  const [fashionModulesData, setFashionModulesData] = useState(defaultFashionTiers);
  const [comingSoonData, setComingSoonData] = useState(defaultComingSoonDepartments);

  useEffect(() => {
    async function loadData() {
      const hero = await getHeroConfig();
      if (hero) {
        if (hero.announcementBadgeText) setHeroBadgeText(hero.announcementBadgeText);
        if (hero.stats && hero.stats.length > 0) {
          setStatsData(
            hero.stats.map((s) => ({
              ...s,
              icon: getIconComponent(s.iconName, Users),
            }))
          );
        }
      }

      const cards = await getWhyChooseCards();
      if (cards && cards.length > 0) {
        setWhyChooseData(
          cards.map((c) => ({
            ...c,
            icon: getIconComponent(c.iconName, Scissors),
          }))
        );
      }

      const modules = await getFashionModules();
      if (modules && modules.length > 0) {
        setFashionModulesData(modules);
      }

      const depts = await getComingSoonDepts();
      if (depts && depts.length > 0) {
        setComingSoonData(
          depts.map((d) => ({
            ...d,
            icon: getIconComponent(d.iconName, Palette),
          }))
        );
      }
    }
    loadData();
  }, []);

  return (
    <div ref={containerRef} className="space-y-24 pb-20 overflow-hidden">
      <TargetCursor
        targetSelector=".cursor-target"
        cursorColor="#D4AF37"
        cursorColorOnTarget="#F59E0B"
      />

      {/* CINEMATIC VIDEO HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden text-white border-b border-gold-500/20">
        {/* Responsive HTML5 Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop"
        >
          <source src="./SirJay.mp4" type="video/mp4" />
        </video>

        {/* Sophisticated Dark Overlay */}
        <div className="absolute inset-0 bg-navy-950/65 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent z-10"></div>

        {/* Hero Content with Framer Motion Parallax & Slide Reveals */}
        <motion.div
          style={{ y: heroParallax }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-20 space-y-8 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-dark text-gold-300 text-xs md:text-sm font-semibold shadow-2xl border border-gold-500/40 bg-navy-950/80 backdrop-blur-md"
          >
            <svg
              viewBox="0 0 122.88 73.27"
              className="w-5 h-3.5 fill-gold-400 text-gold-400 shrink-0"
              aria-hidden="true"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M104.27,58.88l-0.54-19.99l-32.85,9.49c-2.96,0.65-5.88,0.96-8.74,0.97c-3.07,0.01-6.09-0.32-9.06-0.97 L21.7,38.79v20.27c0.9,10.53,31.11,13.75,40.38,14.19c7.43,0.36,36.78-3.52,40.64-9.57C103.55,62.36,104.07,60.76,104.27,58.88 L104.27,58.88z M117.58,24.5v24.43h0.77c0.53,0,0.96,0.43,0.96,0.96v6.57c0,0.52-0.43,0.96-0.96,0.96h-0.77v2.3 c0.98,0.18,1.73,1.05,1.73,2.08v0c0,1.16-0.96,2.12-2.12,2.12h-3.79c-1.16,0-2.12-0.95-2.12-2.12v0c0-1.03,0.75-1.9,1.73-2.08v-2.3 h-0.77c-0.52,0-0.96-0.43-0.96-0.96v-6.57c0-0.53,0.43-0.96,0.96-0.96h0.77v-23L73.03,38.35c-7.24,1.72-14.48,1.84-21.72,0 L7.18,25.18l-3.99-1.19c-4.97-2.03-3.73-6.8,0.9-7.9L54,1.19c5.15-1.47,10.29-1.7,15.44,0l49.01,14.72 c5.33,1.3,6.38,6.23,0.18,8.26L117.58,24.5L117.58,24.5z"
                />
              </g>
            </svg>
            <span className="tracking-wide">{heroBadgeText}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </motion.div>

          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-gold-400 block"
            >
              Sir Jay Training Institute • Nanyuki, Kenya
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: easeCurve }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]"
            >
              Achieving Greatness <br />
              <span className="text-gradient-gold">Together.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-2xl font-light text-slate-100 max-w-3xl mx-auto italic tracking-wide"
            >
              &ldquo;Fashion your Future with us. Learn from the best and create your own design style.&rdquo;
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button href="/admissions" size="lg" icon={ArrowRight}>
              Apply Today
            </Button>
            <Button href="/academics" variant="outline" size="lg" icon={Shirt}>
              Explore Programs
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>TVETA Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Day, Evening & Weekend</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ANIMATED STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl"
        >
          {statsData.map((stat) => {
            const IconComp = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants} className="text-center space-y-2 group">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-navy-700 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300 shadow-sm">
                  <IconComp className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* STICKY BACKGROUND PARALLAX OVERLAY: WHY CHOOSE US */}
      <StickyBackgroundSection
        bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
        overlayColor="bg-navy-950/45"
      >
        <div className="space-y-12">
          <SectionHeader
            dark={true}
            // badge="The Sir Jay Advantage"
            title="Why Students Choose"
            titleHighlight="Sir Jay Institute"
            subtitle="We combine practical hands-on workshop training with real business acumen so every graduate steps into the market ready to produce."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {whyChooseData.map((card) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 overflow-hidden shadow-2xl flex flex-col justify-between group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-navy-900 shadow-md backdrop-blur-md">
                      {card.tag}
                    </div>
                  </div>

                  <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-700 flex items-center justify-center font-bold">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-navy-700 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-navy-700 gap-1.5">
                      <span>Explore this facility</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </StickyBackgroundSection>

      {/* FEATURED PROGRAM: SCHOOL OF FASHION DESIGN WITH 3D ACADEMIC BOOK ACCENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
        {/* Floating 3D Academic Book Accent */}
        <div className="absolute -top-16 -right-12 hidden lg:block pointer-events-none z-0">
          <GlassAccent type="book" className="w-64 h-64 opacity-70" />
        </div>

        <SectionHeader
          // badge="Flagship Department"
          title="Sir Jay School of"
          titleHighlight="Fashion Design"
          subtitle="From zero experience to crafting bespoke suits and contemporary apparel in 4 progressive 3-month modules."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {fashionModulesData.map((tier, idx) => (
            <motion.div
              key={tier.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">
                  Module 0{idx + 1}
                </span>
                <h4 className="text-lg font-extrabold text-slate-900">{tier.title}</h4>
                <div className="inline-block text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                  Duration: {tier.duration}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{tier.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-navy-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>3 Months Practical</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 12 Core Units Grid */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gold-600 shrink-0" />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">12 Core Units Covered</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Curriculum tested and recognized in Kenya and internationally.
                </p>
              </div>
            </div>
            <Button href="/academics" size="sm" variant="outline" icon={ArrowRight}>
              View Full Syllabus
            </Button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs"
          >
            {coreUnits.map((unit, idx) => (
              <motion.div
                key={unit}
                variants={itemVariants}
                className="cursor-target flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium hover:border-gold-500 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <span>{unit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* KNQF TABLE EMBED WITH 3D ACADEMIC STAFF ACCENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">
        {/* Floating 3D Academic Staff Accent */}
        <div className="absolute -top-12 -left-10 hidden lg:block pointer-events-none z-0">
          <GlassAccent type="staff" className="w-64 h-64 opacity-70" />
        </div>

        <SectionHeader
          // badge="Qualifications"
          title="National Progression"
          titleHighlight="Pathways"
          subtitle="Understand how your studies at Sir Jay Institute build up towards national certificates and university progression. However, we encourage studies due to passion and interest"
        />
        <div className="relative z-10">
          <CourseTable />
        </div>
      </section>

      {/* COMING SOON DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          // badge="Expanding Horizons"
          title="New Departments"
          titleHighlight="Coming Soon"
          subtitle="Sir Jay Institute is growing to provide comprehensive vocational training across multiple creative industries."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {comingSoonData.map((dept) => {
            const DeptIcon = dept.icon;
            return (
              <motion.div
                key={dept.name}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 hover:border-gold-500/50 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-navy-700">
                  <DeptIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{dept.name}</h4>
                <p className="text-xs text-slate-600">{dept.desc}</p>
                <span className="inline-block text-[10px] uppercase font-bold text-gold-600 tracking-wider">
                  Registration Opening Soon
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CALL TO ACTION BANNER WITH 3D GRADUATION CAP ACCENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white shadow-2xl border border-gold-500/30 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Floating 3D Graduation Cap */}
          <div className="absolute -bottom-10 -right-10 hidden sm:block pointer-events-none opacity-60 z-0">
            <GlassAccent type="cap" className="w-64 h-64" />
          </div>

          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="text-xs font-extrabold uppercase text-gold-400 tracking-widest">
              Ready to Begin Your Career?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Join Sir Jay Training Institute Today.
            </h2>
            <p className="text-sm md:text-base text-slate-300">
              Classes available for Morning, Evening, and Saturday Weekend schedules in Nanyuki. Flexible fee installments available.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4 relative z-10">
            <Button href="/admissions" size="lg" icon={Zap}>
              Enroll Online Now
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Campus
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
