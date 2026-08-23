"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { getGalleryItems } from "@/lib/api";
import {
  Sparkles,
  Play,
  Pause,
  Maximize2,
  X,
  Camera,
  Film,
  Layers,
  ChevronRight,
  Zap,
  ShieldCheck,
  Eye,
  ArrowUpRight,
  Sliders,
  RotateCcw,
  Scissors,
  Laptop,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

// Dynamically import CircularGallery without SSR for WebGL safety
const CircularGallery = dynamic(() => import("@/components/ui/CircularGallery"), {
  ssr: false,
});

// 3D Circular Gallery Items
const circularGalleryItems = [
  {
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop",
    text: "Fashion Design Studio",
  },
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    text: "Pattern Drafting Workshop",
  },
  {
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    text: "Digital Media Suite",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    text: "ICT Innovation Hub",
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    text: "Sir Jay Runway Showcase",
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    text: "Bespoke Garment Crafting",
  },
  {
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop",
    text: "Media Production Lab",
  },
  {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    text: "Annual Graduation Gala",
  },
];

// Full Media Items for Filterable Grid
const galleryGridItems = [
  {
    id: 1,
    title: "Haute Couture Pattern Drafting",
    category: "Fashion Design",
    type: "image",
    src: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop",
    desc: "Level 5 Craft students mastering precision flat-pattern technique and bodice construction in Studio A.",
    tags: ["Pattern Drafting", "Level 5 Craft", "Studio A"],
  },
  {
    id: 2,
    title: "Campus Innovation Tour 2025",
    category: "Videos",
    type: "video",
    src: "/SirJay.mp4",
    poster: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    desc: "Behind-the-scenes look at TVETA-certified practical learning environment at Sir Jay Nanyuki Campus.",
    tags: ["Campus Video", "TVETA Certified", "Nanyuki"],
  },
  {
    id: 3,
    title: "Digital Illustration & CAD Suite",
    category: "ICT & Tech",
    type: "image",
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    desc: "High-spec computer lab equipped with Adobe Creative Cloud and Clo3D garment simulation software.",
    tags: ["Fashion CAD", "ICT Lab", "Digital Arts"],
  },
  {
    id: 4,
    title: "High Fashion Garment Fitting",
    category: "Fashion Design",
    type: "image",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    desc: "Live model fitting and seam perfection review supervised by senior instructor Tr. Jay.",
    tags: ["Tailoring", "Bespoke", "Sir Jay Suits"],
  },
  {
    id: 5,
    title: "Media Production & Video Editing",
    category: "Media Arts",
    type: "image",
    src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop",
    desc: "Hands-on camera work, lighting setups, and post-production editing for aspiring media creators.",
    tags: ["Video Editing", "Camera Setup", "Media Studio"],
  },
  {
    id: 6,
    title: "Interactive Student Collaboration",
    category: "Campus Life",
    type: "image",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    desc: "Teamwork, brainstorming, and peer critique during weekly design studio sessions.",
    tags: ["Student Life", "Peer Review", "Creative Hub"],
  },
  {
    id: 7,
    title: "Textile Science & Fiber Testing",
    category: "Fashion Design",
    type: "image",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    desc: "Analyzing fabric composition, drape quality, and tensile strength in the textiles laboratory.",
    tags: ["Textiles", "Lab Science", "Fabrics"],
  },
  {
    id: 8,
    title: "Annual Student Runway Gala",
    category: "Campus Life",
    type: "image",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    desc: "Graduating class presenting custom collection pieces at the annual Sir Jay Fashion Show.",
    tags: ["Runway", "Graduation Gala", "Fashion Show"],
  },
];

const categories = ["All", "Fashion Design", "ICT & Tech", "Media Arts", "Videos", "Campus Life"];

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function StudentLifePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeItem, setActiveItem] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [bendAmount, setBendAmount] = useState(3);
  const videoRef = useRef(null);

  const [gridItems, setGridItems] = useState(galleryGridItems);
  const [circularItems, setCircularItems] = useState(circularGalleryItems);

  useEffect(() => {
    async function loadGallery() {
      const items = await getGalleryItems();
      if (items && items.length > 0) {
        setGridItems(items);
        const circ = items
          .filter((i) => i.isCircularGallery)
          .map((i) => ({
            image: i.src,
            text: i.title,
          }));
        if (circ.length > 0) {
          setCircularItems(circ);
        }
      }
    }
    loadGallery();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? gridItems
      : gridItems.filter((item) => item.category === activeCategory);

  const toggleMainVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-gold-500/30 selection:text-gold-300">
      {/* 1. RETAINED PAGE HERO BANNER */}
      <PageHero
        badge="Campus Life & Experience"
        title="Vibrant Student Experience in"
        titleHighlight="Nanyuki"
        subtitle="From annual fashion showcases to computer innovation challenges and graduation days, life at Sir Jay Training Institute is dynamic, creative, and community-driven."
        bgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop"
        breadcrumbs={[{ label: "Student Life & Gallery" }]}
      />

      {/* 2. 3D WEBGL CIRCULAR GALLERY SECTION */}
      <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-gold-500/20 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" /> WebGL 3D Interactive Showcase
              </div> */}
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Interactive <span className="text-gradient-gold">3D Canvas</span> Experience
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Drag left or right to spin through our institute’s premier studios, workshops, and high-fashion collections.
              </p>
            </div>

            {/* Interactive Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 border border-slate-800 text-xs text-slate-300">
                <Sliders className="w-4 h-4 text-gold-400" />
                <span>Curvature:</span>
                <button
                  onClick={() => setBendAmount((prev) => (prev === 3 ? 6 : prev === 6 ? -3 : 3))}
                  className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-bold hover:bg-gold-500/30 transition-colors cursor-pointer"
                >
                  {bendAmount > 0 ? `+${bendAmount}` : bendAmount}
                </button>
              </div>

              <div className="px-3 py-2 rounded-xl bg-navy-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
                <span className="hidden sm:inline">Drag or Scroll to spin</span>
              </div>
            </div>
          </div>

          {/* 3D Circular Canvas Container */}
          <div className="w-full h-[540px] sm:h-[620px] rounded-3xl glass-card border border-gold-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg bg-navy-950/80 border border-gold-500/30 text-[10px] font-mono text-gold-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              CANVAS: OGL WebGL 3D • 60 FPS
            </div>

            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-lg bg-navy-950/80 border border-gold-500/30 text-[10px] font-mono text-slate-400 hidden sm:flex items-center gap-2">
              <span>ITEMS: {circularItems.length} PANELS</span>
            </div>

            {/* Circular Gallery WebGL Component */}
            <CircularGallery
              items={circularItems}
              bend={bendAmount}
              textColor="#F59E0B"
              font="bold 26px Figtree, sans-serif"
              borderRadius={0.06}
              scrollSpeed={2.5}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-navy-950/90 border border-gold-500/30 text-xs text-slate-300 backdrop-blur-md shadow-lg flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-gold-400" />
              <span>Interactive 3D Carousel • Click & Drag horizontally</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FUTURISTIC VIDEO REEL SHOWCASE */}
      <section className="py-20 bg-navy-950 border-b border-gold-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
              <Film className="w-3.5 h-3.5" /> High Definition Video Reel
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Experience <span className="text-gradient-gold">Sir Jay in Motion</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Watch our facility tour, live garment stitching, pattern drafting masterclasses, and student achievements at our Nanyuki campus.
            </p>
          </div>

          {/* Futuristic Video Player Card */}
          <div className="max-w-5xl mx-auto rounded-3xl glass-card border border-gold-500/30 overflow-hidden shadow-2xl relative group">
            <div className="relative aspect-video bg-navy-900 flex items-center justify-center">
              <video
                ref={videoRef}
                src="/SirJay.mp4"
                poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop"
                className="w-full h-full object-cover"
                onEnded={() => setIsVideoPlaying(false)}
                controls={false}
              />

              <div
                className={`absolute inset-0 bg-navy-950/40 backdrop-blur-[2px] flex flex-col justify-between p-6 transition-opacity duration-300 ${
                  isVideoPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-lg bg-navy-950/90 border border-gold-500/30 text-xs text-gold-300 font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-400" />
                    Sir Jay Campus Tour • Nanyuki
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-navy-950/90 border border-white/10 text-xs text-slate-300">
                    1080p HD
                  </span>
                </div>

                <button
                  onClick={toggleMainVideoPlay}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-2xl border-2 border-white/40 flex items-center justify-center mx-auto hover:scale-110 transition-transform duration-300 cursor-pointer z-10"
                  aria-label={isVideoPlaying ? "Pause Video" : "Play Video"}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-8 h-8 fill-navy-950" />
                  ) : (
                    <Play className="w-8 h-8 fill-navy-950 translate-x-0.5" />
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-slate-300 z-10">
                  <span className="font-mono text-gold-400 font-bold">
                    {isVideoPlaying ? "STATUS: PLAYING" : "CLICK TO PLAY TOUR"}
                  </span>
                  <button
                    onClick={() => setActiveItem(galleryGridItems[1])}
                    className="flex items-center gap-1.5 text-gold-300 hover:text-white font-bold transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" /> Fullscreen View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FILTERABLE EDITORIAL MEDIA GRID */}
      <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-gold-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5" /> Comprehensive Media Vault
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Explore by <span className="text-gradient-gold">Department & Event</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 shadow-md font-extrabold"
                      : "bg-navy-900 text-slate-300 border border-slate-800 hover:border-gold-500/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item._id || item.id || `item-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveItem(item)}
                  className="rounded-2xl glass-card border border-slate-800 hover:border-gold-500/40 overflow-hidden shadow-lg group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                    <img
                      src={item.type === "video" ? item.poster : item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-navy-950/80 border border-gold-500/30 text-[10px] font-bold text-gold-300 flex items-center gap-1.5">
                      {item.type === "video" ? (
                        <>
                          <Film className="w-3 h-3 text-gold-400" /> Video
                        </>
                      ) : (
                        <>
                          <Camera className="w-3 h-3 text-gold-400" /> Photo
                        </>
                      )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shadow-xl">
                        {item.type === "video" ? (
                          <Play className="w-5 h-5 fill-navy-950 translate-x-0.5" />
                        ) : (
                          <Maximize2 className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5 rounded bg-navy-900 border border-slate-800 text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 5. STUDENT HIGHLIGHTS & COMMUNITY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-10 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl space-y-8"
        >
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
              Student Centric Approach
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              What Makes Student Life Special Here?
            </h3>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {studentHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 cursor-pointer"
              >
                <h4 className="text-lg font-bold text-navy-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center pt-4">
            <Button href="/admissions" icon={ArrowRight} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Become Part of Our Community
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 6. LIGHTBOX MODAL VIEWER */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full rounded-3xl glass-panel-dark border border-gold-500/40 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-4 sm:p-6 bg-navy-900 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
                    {activeItem.category} • Sir Jay Media Vault
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">{activeItem.title}</h3>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
                <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center relative shadow-inner border border-slate-800">
                  {activeItem.type === "video" ? (
                    <video
                      src={activeItem.src}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={activeItem.src}
                      alt={activeItem.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-200">Description & Context</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {activeItem.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeItem.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-navy-900 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">TVETA Approved Vocational Institution</span>
                <Button href="/admissions" size="sm" icon={ArrowUpRight}>
                  Join Next Intake
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
