"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  BellRing,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
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
    <div className="space-y-20 pb-20">
      {/* PAGE HERO BANNER */}
      <PageHero
        badge="News & Campus Announcements"
        title="Latest News &"
        titleHighlight="Events"
        subtitle="Stay updated with upcoming fashion shows, skill bootcamps, and admission drives happening at Sir Jay Training Institute in Nanyuki."
        bgImage="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1920&auto=format&fit=crop"
        breadcrumbs={[{ label: "Events & News" }]}
      />

      {/* EVENT CARDS GRID (LIGHT EDITORIAL) */}
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
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col justify-between space-y-6 group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {evt.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gold-600">
                    {evt.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy-700">
                    <Calendar className="w-4 h-4 text-gold-600" />
                    <span>{evt.date}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-navy-700 transition-colors">
                    {evt.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {evt.description}
                </p>

                <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
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
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-navy-700 shrink-0">
              <BellRing className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-slate-900">Never Miss an Intake Notice</h4>
              <p className="text-xs text-slate-600">
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
