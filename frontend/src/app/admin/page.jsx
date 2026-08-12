"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Calendar,
  ImageIcon,
  ArrowUpRight,
  Clock,
  MessageCircle,
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  BookOpen,
  Plus,
  ArrowRight,
  Database,
  CheckCircle2,
} from "lucide-react";
import { getAdminStats, getAdminApplications, getAdminInquiries } from "@/lib/api";

export default function AdminOverviewDashboard() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    totalInquiries: 0,
    unreadInquiries: 0,
    totalEvents: 0,
    totalRSVPs: 0,
    totalCourses: 0,
    totalGalleryItems: 0,
  });
  const [recentApps, setRecentApps] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      const [resStats, resApps, resInq] = await Promise.all([
        getAdminStats(),
        getAdminApplications({ limit: 5 }),
        getAdminInquiries(),
      ]);

      if (resStats && resStats.success && resStats.stats) {
        setStats(resStats.stats);
      }
      if (resApps && resApps.success && resApps.applications) {
        setRecentApps(resApps.applications.slice(0, 5));
      }
      if (resInq && resInq.success && resInq.inquiries) {
        setRecentInquiries(resInq.inquiries.slice(0, 5));
      }
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Executive Banner with preserve-dark */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-gold-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 preserve-dark">
        <div className="space-y-2 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400" /> Sir Jay Executive Control Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Institutional Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            Real-time management portal for Sir Jay Training Institute (Nanyuki Campus). Control admissions, incoming contact messages, event RSVPs, and Cloudinary media assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <Link
            href="/admin/admissions"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-extrabold text-xs hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
          >
            <Users className="w-4 h-4" /> Review Pending Apps ({stats.pendingApplications})
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-3 rounded-2xl bg-navy-950 border border-slate-700 text-slate-300 font-bold text-xs hover:text-white hover:border-gold-400 transition-colors flex items-center gap-2"
          >
            Public Site ↗
          </Link>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-gold-500/40 transition-colors">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Student Applications</span>
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-white tracking-tight">{stats.totalApplications}</div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mt-2">
              <Clock className="w-3.5 h-3.5" /> {stats.pendingApplications} Pending Action
            </div>
          </div>
          <Link
            href="/admin/admissions"
            className="text-[11px] font-bold text-gold-400 flex items-center gap-1 hover:underline pt-2 border-t border-slate-800"
          >
            Manage Applications →
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-gold-500/40 transition-colors">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Contact Inquiries</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-white tracking-tight">{stats.totalInquiries}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-2">
              <MessageCircle className="w-3.5 h-3.5" /> {stats.unreadInquiries} Unread Messages
            </div>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 hover:underline pt-2 border-t border-slate-800"
          >
            Open Messages Inbox →
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-gold-500/40 transition-colors">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Events & Workshops</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-white tracking-tight">{stats.totalEvents}</div>
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> {stats.totalRSVPs} Attendees Registered
            </div>
          </div>
          <Link
            href="/admin/events"
            className="text-[11px] font-bold text-blue-400 flex items-center gap-1 hover:underline pt-2 border-t border-slate-800"
          >
            View WhatsApp RSVPs →
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-gold-500/40 transition-colors">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Cloudinary Vault Assets</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-white tracking-tight">{stats.totalGalleryItems}</div>
            <div className="text-xs text-slate-400 font-semibold mt-2">Photos & WebGL 3D Assets</div>
          </div>
          <Link
            href="/admin/gallery"
            className="text-[11px] font-bold text-purple-400 flex items-center gap-1 hover:underline pt-2 border-t border-slate-800"
          >
            Open Media Vault →
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recent Applications & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications Preview */}
        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-gold-400" />
              <h3 className="text-lg font-extrabold text-white">Recent Applications</h3>
            </div>
            <Link
              href="/admin/admissions"
              className="text-xs font-bold text-gold-400 hover:underline flex items-center gap-1"
            >
              View All ({stats.totalApplications}) →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {recentApps.map((app) => (
              <div
                key={app._id}
                className="p-4 rounded-2xl bg-navy-950 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">{app.fullName}</div>
                  <div className="text-slate-400 font-medium">
                    {app.intendedCourse} • <span className="text-gold-300">{app.phone}</span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    app.status === "Approved"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : app.status === "Contacted"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : app.status === "Rejected"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {app.status || "Pending"}
                </span>
              </div>
            ))}

            {recentApps.length === 0 && (
              <div className="p-8 text-center text-slate-500">No recent applications found.</div>
            )}
          </div>
        </div>

        {/* Recent Inquiries Preview */}
        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-gold-400" />
              <h3 className="text-lg font-extrabold text-white">Recent Messages</h3>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-gold-400 hover:underline flex items-center gap-1"
            >
              View Inbox ({stats.totalInquiries}) →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {recentInquiries.map((inq) => (
              <div
                key={inq._id}
                className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{inq.fullName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-300 line-clamp-2 leading-relaxed">{inq.message}</p>
                <div className="text-[11px] text-gold-400 font-semibold">{inq.phone} • {inq.email}</div>
              </div>
            ))}

            {recentInquiries.length === 0 && (
              <div className="p-8 text-center text-slate-500">No contact messages received yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
