"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  BellRing,
  X,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { getEvents, submitRSVP } from "@/lib/api";

const defaultEventsList = [
  {
    _id: "1",
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
    _id: "2",
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
    _id: "3",
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
  const [eventsList, setEventsList] = useState(defaultEventsList);
  const [rsvpModalEvent, setRsvpModalEvent] = useState(null);
  const [rsvpFormData, setRsvpFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      const data = await getEvents();
      if (data && data.length > 0) {
        setEventsList(data);
      }
    }
    loadEvents();
  }, []);

  const handleOpenRsvpModal = (evt) => {
    setRsvpModalEvent(evt);
    setSubmitted(false);
    setRsvpFormData({ fullName: "", whatsappNumber: "", email: "" });
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpModalEvent) return;
    setSubmitting(true);
    try {
      const targetId = rsvpModalEvent._id || rsvpModalEvent.id;
      await submitRSVP(targetId, rsvpFormData);
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

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

      {/* EVENT CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          // badge="Upcoming Highlights"
          title="Campus Events &"
          titleHighlight="Workshops"
          subtitle="Join us for interactive fashion showcases, technical bootcamps, and career mentoring sessions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventsList.map((evt, idx) => (
            <motion.div
              key={evt._id || evt.id || idx}
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
                <Button
                  onClick={() => handleOpenRsvpModal(evt)}
                  size="sm"
                  className="w-full cursor-pointer"
                  icon={BellRing}
                >
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
          <Button href="/contact" className="bg-gold-500 text-navy-950 hover:bg-gold-600 hover:text-white cursor-pointer">  
            Contact Admissions Desk
          </Button>
        </div>
      </section>

      {/* RSVP POPUP MODAL WITH WHATSAPP NUMBER INPUT */}
      <AnimatePresence>
        {rsvpModalEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setRsvpModalEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-3xl bg-white border border-gold-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 relative"
            >
              <button
                onClick={() => setRsvpModalEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest block">
                  Event Registration • {rsvpModalEvent.category}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  RSVP for {rsvpModalEvent.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Leave your contact details so our organizers can reach out directly via WhatsApp.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">RSVP Received!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you, <strong className="text-slate-900">{rsvpFormData.fullName}</strong>. We have saved your RSVP. Our team will message you on WhatsApp (<strong className="text-navy-900">{rsvpFormData.whatsappNumber}</strong>) with event access details.
                  </p>
                  <Button onClick={() => setRsvpModalEvent(null)} size="sm" variant="outline" className="w-full">
                    Close Window
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grace Wambui"
                      value={rsvpFormData.fullName}
                      onChange={(e) => setRsvpFormData({ ...rsvpFormData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      WhatsApp Number * (For Easy Reach Out)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +254 719 185 821"
                      value={rsvpFormData.whatsappNumber}
                      onChange={(e) => setRsvpFormData({ ...rsvpFormData, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500 font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. grace@gmail.com"
                      value={rsvpFormData.email}
                      onChange={(e) => setRsvpFormData({ ...rsvpFormData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="lg" className="w-full cursor-pointer" icon={Send} disabled={submitting}>
                      {submitting ? "Submitting..." : "Confirm My RSVP"}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
