"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Send,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  FileCheck,
  User,
  GraduationCap,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const roadmapSteps = [
  {
    step: "01",
    title: "Explore Course",
    desc: "Select your preferred track in Fashion Design, ICT, or Media Arts.",
  },
  {
    step: "02",
    title: "Apply Online",
    desc: "Fill the application form below or visit our Nanyuki campus desk.",
  },
  {
    step: "03",
    title: "Admission Letter",
    desc: "Receive your official admission confirmation via SMS or Email.",
  },
  {
    step: "04",
    title: "Registration Fee",
    desc: "Pay your initial registration deposit conveniently via M-Pesa.",
  },
  {
    step: "05",
    title: "Orientation",
    desc: "Meet your expert trainers, inspect our modern studios and tools.",
  },
  {
    step: "06",
    title: "Start Learning",
    desc: "Begin your practical hands-on sessions and build your portfolio.",
  },
];

const admissionChecklist = [
  "National ID Card Copy (or Birth Certificate / Passport)",
  "Two (2) recent passport-sized color photos",
  "KCSE / KCPE Result Slip or KNEC Certificate",
  "Duly completed Sir Jay Registration Form",
];

export default function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    intendedCourse: "Fashion Design - Comprehensive",
    educationLevel: "KCSE Certificate",
    preferredIntake: "January Intake",
    schedulePreference: "Day Class (9am-5pm)",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Admissions & Enrollment
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            6 Steps To Join <span className="text-gradient-gold">Sir Jay Institute</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Our simple 6-step enrollment process gets you into the workshop quickly. Apply online today or visit our Nanyuki campus.
          </motion.p>
        </div>
      </section>

      {/* 6-STEP ROADMAP TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Admissions Roadmap"
          title="Your 6-Step Journey to"
          titleHighlight="Enrollment"
          subtitle="From your first inquiry to stepping into our equipped design studios."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapSteps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-card border border-gold-500/20 hover:border-gold-500/40 transition-all space-y-3 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-extrabold text-sm group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                  {item.step}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Step {idx + 1} of 6
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM & REQUIREMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Requirements & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <FileCheck className="w-6 h-6 text-gold-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">Required Documents</h3>
                  <p className="text-xs text-slate-400">Bring these on orientation day</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                {admissionChecklist.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                Working & Operating Hours
              </h4>
              <div className="text-xs text-slate-300 space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-white">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>Saturday</span>
                  <span className="font-semibold text-white">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sundays & Public Holidays</span>
                  <span className="font-semibold text-slate-500">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-10 rounded-3xl glass-panel border border-gold-500/30 shadow-2xl space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">
                  Online Registration Form
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">
                  Apply for Admission Today
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Fill in your information to reserve your seat for the upcoming intake.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Application Submitted Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Our admissions officer will reach out via <strong className="text-gold-300">{formData.phone}</strong> with your official admission letter details.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-200">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Mwangi"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-200">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +254 712 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-200">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-200">Intended Course *</label>
                      <select
                        value={formData.intendedCourse}
                        onChange={(e) => setFormData({ ...formData, intendedCourse: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="Fashion Design - Comprehensive">Sir Jay School of Fashion Design</option>
                        <option value="Artisan Trade Test (NITA)">Artisan Level 3 Trade Test</option>
                        <option value="Certificate Level 4">KNQF Level 4 Certificate</option>
                        <option value="Craft Level 5">KNQF Level 5 Craft Certificate</option>
                        <option value="Diploma Level 6">KNQF Level 6 Diploma</option>
                        <option value="Cosmetology & Beauty">Cosmetology & Beauty (Coming Soon)</option>
                        <option value="Deejay School">Deejay School (Coming Soon)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-200">Education Level *</label>
                      <select
                        value={formData.educationLevel}
                        onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="KCSE Certificate">KCSE Certificate</option>
                        <option value="KCPE Certificate">KCPE Certificate</option>
                        <option value="Artisan Certificate">Artisan Certificate</option>
                        <option value="Diploma / Degree">Diploma / Degree</option>
                        <option value="Other">Other / Self-Taught</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-200">Preferred Intake *</label>
                      <select
                        value={formData.preferredIntake}
                        onChange={(e) => setFormData({ ...formData, preferredIntake: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="January Intake">January Intake</option>
                        <option value="May Intake">May Intake</option>
                        <option value="September Intake">September Intake</option>
                        <option value="Immediate / Ongoing">Immediate / Ongoing</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-200">Schedule Preference *</label>
                      <select
                        value={formData.schedulePreference}
                        onChange={(e) => setFormData({ ...formData, schedulePreference: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="Day Class (9am-5pm)">Day Class (Mon-Fri 9am-5pm)</option>
                        <option value="Evening Class (5:30pm-8pm)">Evening Class (Mon-Fri 5:30pm-8pm)</option>
                        <option value="Saturday Weekend (10am-3pm)">Saturday Weekend (10am-3pm)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full" size="lg" icon={Send}>
                      Submit Application Now
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
