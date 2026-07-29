"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Navigation,
} from "lucide-react";
import dynamic from "next/dynamic";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

const TargetCursor = dynamic(() => import("@/components/ui/TargetCursor"), {
  ssr: false,
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    courseOfInterest: "Fashion Design - Comprehensive",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20">
      <TargetCursor
        targetSelector=".cursor-target"
        cursorColor="#D4AF37"
        cursorColorOnTarget="#F59E0B"
      />

      {/* PAGE HERO BANNER */}
      <PageHero
        badge="Get In Touch With Us"
        title="Visit Our"
        titleHighlight="Nanyuki Campus"
        subtitle="Have questions about course fees, registration, or workshop schedules? Reach out or visit our campus desk in Nanyuki Town."
        bgImage="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1920&auto=format&fit=crop"
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      {/* MAIN CONTACT & MAP GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details & Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Contact Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
                <Building2 className="w-6 h-6 text-gold-600" />
                Contact Details
              </h3>

              <div className="space-y-5 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-700 flex items-center justify-center font-bold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Campus Location</span>
                    <span className="text-xs text-slate-600 leading-relaxed block mt-0.5 font-normal">
                      Hospital Road, Off Nyeri-Nanyuki Highway, Near Cedar Mall Area, Nanyuki Town, Laikipia County, Kenya
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-700 flex items-center justify-center font-bold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone Lines</span>
                    <a href="tel:+254719185821" className="text-xs text-navy-900 hover:underline block mt-0.5 font-bold">
                      +254 719 185 821
                    </a>
                    <a href="tel:+254712345678" className="text-xs text-slate-600 hover:underline block font-normal">
                      +254 712 345 678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-700 flex items-center justify-center font-bold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Address</span>
                    <a href="mailto:sirjaysuits@gmail.com" className="text-xs text-navy-900 hover:underline block mt-0.5 font-bold">
                      sirjaysuits@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-700 flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Working Hours</span>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Mon - Fri: 9:00 AM - 5:00 PM
                    </span>
                    <span className="text-xs text-slate-600 block">
                      Sat: 9:00 AM - 2:00 PM (Closed Sun & Holidays)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flexible Hours Summary Pill */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2">
              <h4 className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                Flexible Learning Schedules
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 font-medium">
                <li>• <strong>Day Classes:</strong> Mon-Fri 9:00 AM - 5:00 PM</li>
                <li>• <strong>Evening Classes:</strong> Mon-Fri 5:30 PM - 8:00 PM</li>
                <li>• <strong>Saturday Weekend:</strong> 10:00 AM - 3:00 PM</li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Contact Form Card */}
            <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest block">
                  Send Us A Direct Message
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Inquire Online
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. We have received your inquiry regarding <strong className="text-navy-900">{formData.courseOfInterest}</strong> and will respond shortly.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mary Wanjiku"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="cursor-target w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +254 719 185 821"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="cursor-target w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. mary@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="cursor-target w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700">Course of Interest *</label>
                      <select
                        value={formData.courseOfInterest}
                        onChange={(e) => setFormData({ ...formData, courseOfInterest: e.target.value })}
                        className="cursor-target w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500"
                      >
                        <option value="Fashion Design - Comprehensive">Sir Jay School of Fashion Design</option>
                        <option value="Artisan Trade Test Level 3">Artisan Level 3 Trade Test</option>
                        <option value="Certificate Level 4">KNQF Level 4 Certificate</option>
                        <option value="Craft Level 5">KNQF Level 5 Craft Certificate</option>
                        <option value="Diploma Level 6">KNQF Level 6 Diploma</option>
                        <option value="Other Programs / General Inquiry">Other Programs / General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700">Message / Inquiry *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your questions here regarding intakes, fee structure, or directions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="cursor-target w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500"
                    ></textarea>
                  </div>

                  <div className="cursor-target">
                    <Button type="submit" className="w-full cursor-target" size="lg" icon={Send}>
                      Send Inquiry Now
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Map Direction Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Navigation className="w-6 h-6 text-gold-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Nanyuki Town Campus Directions</h4>
                  <p className="text-xs text-slate-500">
                    Located off Nyeri-Nanyuki Highway near Cedar Mall area.
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Nanyuki+Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-navy-900 hover:underline shrink-0"
              >
                Open Google Maps →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
