"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Tag,
  ArrowRight,
  BellRing,
  Award,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const eventsList = [
  {
    id: 1,
    title: "Sir Jay Nanyuki Fashion Showcase",
    date: "April 28, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Sir Jay Main Auditorium, Nanyuki",
    category: "Exhibition",
    badge: "Featured Event",
    description: "Graduating students displaying bespoke suit collections, evening gowns, and contemporary African wear to employers, fashion enthusiasts, and local media.",
  },
  {
    id: 2,
    title: "Graphic Design Bootcamp for Beginners",
    date: "May 5, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "ICT & Media Lab, Nanyuki Campus",
    category: "Free Workshop",
    badge: "Practical Bootcamp",
    description: "A free 1-day practical workshop on Photoshop basics, croquis vector drawing, and logo design for aspiring fashion and media designers.",
  },
  {
    id: 3,
    title: "Upcoming Intake Registration Drive",
    date: "Ongoing / May Intake",
    time: "9:00 AM - 5:00 PM Daily",
    location: "Cedar Mall Desk & Main Campus Office",
    category: "Admissions",
    badge: "Early Bird Discount",
    description: "Early bird fee discount available for students registering early at our Cedar Mall Road desk for the upcoming intake.",
  },
];

export default function EventsPage() {
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
              News & Campus Announcements
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Latest News & <span className="text-gradient-gold">Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Stay updated with upcoming fashion shows, skill bootcamps, and admission drives happening at Sir Jay Training Institute in Nanyuki.
          </motion.p>
        </div>
      </section>

      {/* EVENT CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Upcoming Highlights"
          title="Campus Events &"
          titleHighlight="Workshops"
          subtitle="Join us for interactive fashion showcases, technical bootcamps, and career mentoring sessions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventsList.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-3xl glass-card glass-card-hover flex flex-col justify-between space-y-6 group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
                    {evt.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {evt.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gold-400">
                    <Calendar className="w-4 h-4" />
                    <span>{evt.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {evt.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Button href="/admissions" size="sm" className="w-full" icon={Sparkles}>
                  RSVP / Register Interest
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ANNOUNCEMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <BellRing className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Never Miss an Intake Notice</h4>
              <p className="text-xs text-slate-300">
                Follow our official social channels or visit our Nanyuki office for immediate assistance.
              </p>
            </div>
          </div>
          <Button href="/contact" variant="outline">
            Contact Admissions Desk
          </Button>
        </div>
      </section>
    </div>
  );
}
