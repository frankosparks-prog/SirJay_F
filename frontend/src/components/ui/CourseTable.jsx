"use client";

import { motion } from "framer-motion";
import { Award, Clock, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export default function CourseTable() {
  const knqfLevels = [
    {
      level: "Level 3",
      title: "Trade Test (Artisan)",
      qualification: "Artisan Certificate (NITA)",
      requirement: "Any Grade / KCPE Certificate",
      duration: "6 - 12 Months",
      progression: "Level 4 (Certificate)",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      level: "Level 4",
      title: "Certificate Level",
      qualification: "KNQF Level 4 Certificate",
      requirement: "KCSE D- (Minus) or Level 3 Cert",
      duration: "1 Year",
      progression: "Level 5 (Craft)",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      level: "Level 5",
      title: "Craft Certificate",
      qualification: "KNQF Level 5 Craft",
      requirement: "KCSE D (Plain) or Level 4 Cert",
      duration: "1 Year",
      progression: "Level 6 (Diploma)",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      level: "Level 6",
      title: "Diploma Level",
      qualification: "KNQF Level 6 Diploma",
      requirement: "KCSE C- (Minus) or Level 5 Craft",
      duration: "2 Years + Industrial Attachment",
      progression: "Level 7 (University Entry)",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl">
      <div className="p-6 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border-b border-gold-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-gold-400" />
            KNQF National Qualification Progression Framework
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            TVETA-aligned career growth pathways from Artisan entry level to University progression.
          </p>
        </div>
        <span className="self-start md:self-auto text-xs px-3 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 font-bold">
          Official TVETA Matrix
        </span>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="py-4 px-6">KNQF Level</th>
              <th className="py-4 px-6">Award & Qualification</th>
              <th className="py-4 px-6">Entry Requirement</th>
              <th className="py-4 px-6">Duration</th>
              <th className="py-4 px-6">Next Pathway</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {knqfLevels.map((row, idx) => (
              <motion.tr
                key={row.level}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="py-4 px-6 font-medium whitespace-nowrap">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${row.badgeColor}`}
                  >
                    {row.level}
                  </span>
                  <div className="text-xs text-slate-500 mt-1 font-semibold">{row.title}</div>
                </td>
                <td className="py-4 px-6 font-extrabold text-slate-900">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-navy-700 shrink-0" />
                    {row.qualification}
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-700 font-medium">{row.requirement}</td>
                <td className="py-4 px-6 whitespace-nowrap text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    {row.duration}
                  </div>
                </td>
                <td className="py-4 px-6 font-bold text-navy-800">
                  <div className="flex items-center gap-1.5">
                    <ArrowRight className="w-4 h-4 text-gold-600 shrink-0" />
                    {row.progression}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden divide-y divide-slate-100">
        {knqfLevels.map((row, idx) => (
          <motion.div
            key={row.level}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-5 space-y-3"
          >
            <div className="flex justify-between items-start">
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold border ${row.badgeColor}`}
              >
                {row.level} - {row.title}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {row.duration}
              </div>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600" />
                {row.qualification}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                <strong className="text-slate-900">Entry:</strong> {row.requirement}
              </p>
            </div>

            <div className="pt-2 flex items-center text-xs font-bold text-navy-800 border-t border-slate-100">
              <span className="text-slate-500 mr-2">Progression:</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-600 mr-1" />
              {row.progression}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
