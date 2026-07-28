"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  GraduationCap,
  Calendar,
  CreditCard,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Bell,
  FileText,
  TrendingUp,
  Award,
  ChevronRight,
  Scissors,
} from "lucide-react";
import Button from "@/components/ui/Button";

const tabs = [
  { id: "overview", label: "Overview Dashboard", icon: TrendingUp },
  { id: "timetable", label: "Timetable", icon: Calendar },
  { id: "fees", label: "Fee Statement & Receipts", icon: CreditCard },
  { id: "enotes", label: "e-Notes & Assignments", icon: BookOpen },
];

const announcements = [
  { date: "May 2, 2025", title: "Pattern Drafting Practical Assessment scheduled for Friday.", category: "Academic" },
  { date: "April 28, 2025", title: "Sir Jay Annual Runway Show registration is open for Level 5 & 6 students.", category: "Event" },
  { date: "April 20, 2025", title: "Mid-Term Fee Clearance Notice before May 15.", category: "Finance" },
];

const timetableData = [
  { day: "Monday", time: "9:00 AM - 12:30 PM", unit: "Pattern Drafting & Flat Blocks", room: "Studio A", lecturer: "Tr. Jay" },
  { day: "Tuesday", time: "9:00 AM - 12:30 PM", unit: "Textile Science & Fiber Testing", room: "Lab 2", lecturer: "Madam Grace" },
  { day: "Wednesday", time: "1:30 PM - 4:30 PM", unit: "Fashion CAD & Illustration", room: "ICT Lab 1", lecturer: "Mr. David" },
  { day: "Thursday", time: "9:00 AM - 1:00 PM", unit: "Garment Construction & Fitting", room: "Workshop B", lecturer: "Tr. Jay" },
  { day: "Friday", time: "10:00 AM - 1:00 PM", unit: "Fashion Business Law & Ethics", room: "Lecture Hall 1", lecturer: "Adv. Sarah" },
];

const feeBreakdown = [
  { date: "15 Jan 2025", desc: "Registration Deposit", ref: "MPESA-QW9812", amount: "KES 15,000", status: "Paid" },
  { date: "10 Feb 2025", desc: "Module 1 Installment 1", ref: "MPESA-RK3419", amount: "KES 15,000", status: "Paid" },
  { date: "15 Mar 2025", desc: "Module 1 Installment 2", ref: "MPESA-TL9012", amount: "KES 8,000", status: "Paid" },
  { date: "Pending", desc: "Final Term Balance", ref: "-", amount: "KES 2,000", status: "Pending" },
];

const eNotesData = [
  { unit: "Unit 03: Pattern Drafting Manual v2.pdf", size: "4.2 MB", date: "April 18" },
  { unit: "Unit 05: Clothing Construction Standard Operating Procedures.pdf", size: "2.8 MB", date: "April 12" },
  { unit: "Unit 11: Digital Illustration & Croquis Templates.zip", size: "18.5 MB", date: "April 05" },
];

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* STUDENT PROFILE HEADER */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
              FW
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">Faith Wambui Mwangi</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-slate-300">
                ADM No: <strong className="text-gold-400">SJTI/2024/FASH/0892</strong> • Sir Jay School of Fashion Design (Level 5 Craft)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Current Semester:</span>
              <span className="font-bold text-white">Module 2 (Intermediate)</span>
            </div>
            <Button href="/contact" size="sm" variant="outline">
              Campus Support
            </Button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-gold-500 text-navy-950 shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-navy-900"
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 3 QUICK STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Term Fee Balance</span>
                  <CreditCard className="w-4 h-4 text-gold-400" />
                </div>
                <div className="text-2xl font-black text-gold-400">KES 2,000</div>
                <p className="text-[11px] text-slate-400">Total KES 40,000 • Paid KES 38,000</p>
              </div>

              <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Studio Attendance</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400">96% Present</div>
                <p className="text-[11px] text-slate-400">24 / 25 Practical Sessions Attended</p>
              </div>

              <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Current Project</span>
                  <Scissors className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-lg font-bold text-white">Evening Gown Drafting</div>
                <p className="text-[11px] text-slate-400">Due Date: May 10, 2025</p>
              </div>
            </div>

            {/* ANNOUNCEMENTS & RECENT ACTIVITY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Campus Announcements */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-navy-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gold-400" />
                    Campus & Academic Notices
                  </h3>
                  <span className="text-[10px] text-slate-400">Updated Daily</span>
                </div>

                <div className="space-y-3 text-xs">
                  {announcements.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1 hover:border-gold-500/30 transition-colors"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-gold-400 uppercase">{item.category}</span>
                        <span className="text-slate-500">{item.date}</span>
                      </div>
                      <p className="font-semibold text-slate-200">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Quick Links & Progress */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-navy-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <BookOpen className="w-5 h-5 text-gold-400" />
                  Module Progression
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Module 1 (Beginner)</span>
                      <span className="text-emerald-400 font-bold">100% Completed</span>
                    </div>
                    <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-emerald-500"></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Module 2 (Intermediate)</span>
                      <span className="text-gold-400 font-bold">75% In Progress</span>
                    </div>
                    <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gold-500"></div>
                    </div>
                  </div>

                  <div className="space-y-1 opacity-60">
                    <div className="flex justify-between text-slate-400">
                      <span>Module 3 (Expert)</span>
                      <span>Upcoming</span>
                    </div>
                    <div className="w-full h-2 bg-navy-950 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: TIMETABLE */}
        {activeTab === "timetable" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-navy-900 border border-slate-800 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Weekly Class & Studio Schedule</h3>
                <p className="text-xs text-slate-400 mt-1">Sir Jay Nanyuki Campus • Day Class Schedule</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 font-bold">
                Term 1 2025
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-navy-950 text-gold-400 uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-4">Day</th>
                    <th className="py-3.5 px-4">Time</th>
                    <th className="py-3.5 px-4">Unit / Subject</th>
                    <th className="py-3.5 px-4">Venue</th>
                    <th className="py-3.5 px-4">Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {timetableData.map((row) => (
                    <tr key={row.day} className="hover:bg-navy-950/60">
                      <td className="py-3.5 px-4 font-bold text-white">{row.day}</td>
                      <td className="py-3.5 px-4 text-slate-300">{row.time}</td>
                      <td className="py-3.5 px-4 font-bold text-gold-300">{row.unit}</td>
                      <td className="py-3.5 px-4 text-slate-300">{row.room}</td>
                      <td className="py-3.5 px-4 text-slate-300">{row.lecturer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 3: FEE STATEMENT & RECEIPTS */}
        {activeTab === "fees" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-navy-900 border border-slate-800 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Student Fee Ledger</h3>
                <p className="text-xs text-slate-400 mt-1">Total Fee: KES 40,000 • Total Paid: KES 38,000</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Balance Due:</span>
                <span className="text-lg font-black text-gold-400">KES 2,000</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-navy-950 text-gold-400 uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Transaction Description</th>
                    <th className="py-3.5 px-4">M-Pesa Reference</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {feeBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-navy-950/60">
                      <td className="py-3.5 px-4 text-slate-300">{row.date}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{row.desc}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{row.ref}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{row.amount}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === "Paid"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 4: E-NOTES & ASSIGNMENTS */}
        {activeTab === "enotes" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-navy-900 border border-slate-800 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Digital Course Notes & References</h3>
                <p className="text-xs text-slate-400 mt-1">Download official PDF manuals and CAD croquis files</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {eNotesData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between gap-4 hover:border-gold-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gold-400 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">{item.unit}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Uploaded {item.date} • File Size: {item.size}
                      </p>
                    </div>
                  </div>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-bold transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
