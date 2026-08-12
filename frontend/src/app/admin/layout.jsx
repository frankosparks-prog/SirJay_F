"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  CheckSquare,
  Shirt,
  Compass,
  BookOpen,
  Users,
  Mail,
  Calendar,
  Image as ImageIcon,
  HelpCircle,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Search,
  Activity,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Lock,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCheck,
} from "lucide-react";
import { getAdminStats, getAdminApplications, getAdminInquiries, markAllInquiriesRead } from "@/lib/api";

const navSections = [
  {
    title: "MAIN CONTROLS",
    items: [
      { name: "Executive Overview", href: "/admin", icon: LayoutDashboard },
      { name: "Hero & Stats Pill", href: "/admin/hero-stats", icon: Zap },
    ],
  },
  {
    title: "CONTENT MANAGEMENT",
    items: [
      { name: "Why Choose Cards", href: "/admin/why-choose", icon: CheckSquare },
      { name: "Fashion Design Tiers", href: "/admin/fashion-modules", icon: Shirt },
      { name: "Coming Soon Depts", href: "/admin/coming-soon", icon: Compass },
      { name: "Course Catalog", href: "/admin/courses", icon: BookOpen },
      { name: "Faculty & Staff", href: "/admin/staff", icon: Users },
    ],
  },
  {
    title: "STUDENT SERVICES",
    items: [
      { name: "Admissions Apps", href: "/admin/admissions", icon: Users, badgeKey: "apps" },
      { name: "Contact Messages", href: "/admin/inquiries", icon: Mail, badgeKey: "inquiries" },
      { name: "Events & RSVPs", href: "/admin/events", icon: Calendar, badgeKey: "rsvps" },
    ],
  },
  {
    title: "ASSETS & CHATBOT",
    items: [
      { name: "Student-life Media Vault", href: "/admin/gallery", icon: ImageIcon },
      { name: "Chatbot FAQ Base", href: "/admin/faqs", icon: HelpCircle },
    ],
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState("Administrator");

  // Theme State: 'dark' | 'light' | 'gold'
  const [adminTheme, setAdminTheme] = useState("dark");

  // Notifications State
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifStats, setNotifStats] = useState({ pendingApplications: 0, unreadInquiries: 0 });
  const [recentAppsNotif, setRecentAppsNotif] = useState([]);
  const [recentInqNotif, setRecentInqNotif] = useState([]);
  const [notificationsCleared, setNotificationsCleared] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("sirjay_admin_theme") || "dark";
    setAdminTheme(savedTheme);

    // Load notification cleared state timestamp from localStorage
    const clearedTimestamp = localStorage.getItem("sirjay_notifs_cleared_at");
    if (clearedTimestamp && Date.now() - parseInt(clearedTimestamp, 10) < 24 * 60 * 60 * 1000) {
      setNotificationsCleared(true);
    }

    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("sirjay_admin_token");
    const userStr = localStorage.getItem("sirjay_admin_user");
    if (!token) {
      router.push("/admin/login");
    } else {
      setAuthenticated(true);
      if (userStr) {
        try {
          const u = JSON.parse(userStr);
          if (u.name || u.username) setAdminUser(u.name || u.username);
        } catch (e) {}
      }

      // Fetch Notification Counts
      loadNotifications();
    }
    setLoading(false);
  }, [pathname, isLoginPage, router]);

  const loadNotifications = async () => {
    const [resStats, resApps, resInq] = await Promise.all([
      getAdminStats(),
      getAdminApplications({ status: "Pending", limit: 3 }),
      getAdminInquiries(),
    ]);

    const isClearedSession = localStorage.getItem("sirjay_notifs_cleared_at");

    if (resStats && resStats.success && resStats.stats) {
      setNotifStats({
        pendingApplications: resStats.stats.pendingApplications || 0,
        unreadInquiries: isClearedSession ? 0 : resStats.stats.unreadInquiries || 0,
      });
    }

    if (resApps && resApps.success && resApps.applications) {
      setRecentAppsNotif(resApps.applications.slice(0, 3));
    }

    if (resInq && resInq.success && resInq.inquiries) {
      setRecentInqNotif(resInq.inquiries.filter((i) => !i.isRead).slice(0, 3));
    }
  };

  const handleThemeChange = (newTheme) => {
    setAdminTheme(newTheme);
    localStorage.setItem("sirjay_admin_theme", newTheme);
  };

  const handleClearNotifications = async () => {
    setNotificationsCleared(true);
    setNotifStats({ pendingApplications: 0, unreadInquiries: 0 });
    localStorage.setItem("sirjay_notifs_cleared_at", Date.now().toString());

    // Batch update inquiries on backend to persist read status in MongoDB
    try {
      await markAllInquiriesRead();
    } catch (err) {
      console.warn("Failed to mark inquiries read on backend:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sirjay_admin_token");
    localStorage.removeItem("sirjay_admin_user");
    router.push("/admin/login");
  };

  const totalUnreadNotifs = notificationsCleared
    ? 0
    : notifStats.pendingApplications + notifStats.unreadInquiries;

  if (isLoginPage) {
    return <div className="min-h-screen bg-navy-950 text-white">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
          <span className="text-xs font-bold text-gold-400 tracking-wider">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  // Theme Dynamic Styles
  const themeContainerStyle =
    adminTheme === "light"
      ? "bg-slate-100 text-slate-900"
      : adminTheme === "gold"
      ? "bg-slate-950 text-gold-100"
      : "bg-navy-950 text-slate-100";

  const sidebarStyle =
    adminTheme === "light"
      ? "bg-white border-slate-200"
      : adminTheme === "gold"
      ? "bg-slate-900 border-gold-500/30"
      : "bg-navy-900/95 border-slate-800/80";

  const headerStyle =
    adminTheme === "light"
      ? "bg-white/90 border-slate-200 text-slate-900 shadow-sm"
      : adminTheme === "gold"
      ? "bg-slate-900/80 border-gold-500/30"
      : "bg-navy-900/60 border-slate-800/80";

  return (
    <div
      data-admin-theme={adminTheme}
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${themeContainerStyle}`}
    >
      {/* MOBILE TOPBAR */}
      <div className={`md:hidden p-4 flex items-center justify-between sticky top-0 z-40 border-b backdrop-blur-md ${sidebarStyle}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-gold-500/40 bg-white flex items-center justify-center shadow-lg">
            <Image
              src="https://res.cloudinary.com/dnjj3tr4d/image/upload/v1785409345/SJLogo_piibe7.jpg"
              alt="Sir Jay Logo"
              width={36}
              height={36}
            />
          </div>
          <div>
            <span className="font-black text-sm tracking-wide block">SIR JAY ADMIN</span>
            <span className="text-[10px] text-gold-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> System Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Top Icons-Only Theme Switcher on Mobile */}
          <div className="p-1 rounded-xl bg-navy-950 border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => handleThemeChange("dark")}
              className={`p-2 rounded-lg text-xs transition-all ${adminTheme === "dark" ? "bg-gold-500 text-navy-950 font-bold" : "text-slate-400"}`}
              title="Dark Navy Mode"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleThemeChange("light")}
              className={`p-2 rounded-lg text-xs transition-all ${adminTheme === "light" ? "bg-gold-500 text-navy-950 font-bold" : "text-slate-400"}`}
              title="Light Mode"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleThemeChange("gold")}
              className={`p-2 rounded-lg text-xs transition-all ${adminTheme === "gold" ? "bg-gold-500 text-navy-950 font-bold" : "text-slate-400"}`}
              title="Midnight Luxe Gold Mode"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* Notification Bell Mobile */}
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              handleClearNotifications();
            }}
            className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30 relative"
          >
            <Bell className="w-5 h-5" />
            {totalUnreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-bold text-[9px] flex items-center justify-center animate-bounce">
                {totalUnreadNotifs}
              </span>
            )}
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white border border-slate-700/60"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ADMIN SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-72 h-screen backdrop-blur-xl border-r flex flex-col justify-between p-5 transition-transform duration-300 ${sidebarStyle} ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6 overflow-y-auto scrollbar-none pr-1">
          {/* Brand Header with preserve-dark */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/30 shadow-xl flex items-center gap-3 preserve-dark">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-gold-400 bg-white flex items-center justify-center shrink-0 shadow-md">
              <Image
                src="https://res.cloudinary.com/dnjj3tr4d/image/upload/v1785409345/SJLogo_piibe7.jpg"
                alt="Sir Jay Logo"
                width={44}
                height={44}
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-black text-white tracking-wide truncate">SIR JAY INSTITUTE</h2>
              <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" /> Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-6">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-1.5">
                <div className="px-3 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                  {sec.title}
                </div>
                <nav className="space-y-1">
                  {sec.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                          isActive
                            ? "bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 shadow-lg shadow-gold-500/20 font-extrabold"
                            : "text-slate-400 hover:bg-navy-800/80 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-navy-950" : "text-gold-400"}`} />
                          <span>{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4 text-navy-950" />}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-gold-400 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-gold-400" /> View Public Site
            </span>
            <span className="text-[10px] font-mono text-slate-500">Live ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </span>
            <Lock className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* TOP SYSTEM BAR WITH ICONS-ONLY THEME SWITCHER */}
        <header className={`hidden md:flex items-center justify-between px-8 py-4 border-b backdrop-blur-md sticky top-0 z-30 transition-colors ${headerStyle}`}>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="font-bold uppercase tracking-wider text-[11px] font-mono">
              Sir Jay Sartorial Training Institute CMS
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5 text-gold-500 font-bold">
              <Activity className="w-3.5 h-3.5" /> Nanyuki Campus Network
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Top Icons-Only Theme Switcher Bar */}
            <div className="p-1 rounded-2xl bg-navy-950/90 border border-slate-800 flex items-center gap-1 shadow-inner">
              <button
                onClick={() => handleThemeChange("dark")}
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  adminTheme === "dark" ? "bg-gold-500 text-navy-950 shadow font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="Dark Navy Mode"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleThemeChange("light")}
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  adminTheme === "light" ? "bg-gold-500 text-navy-950 shadow font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="Light Mode"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleThemeChange("gold")}
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  adminTheme === "gold" ? "bg-gold-500 text-navy-950 shadow font-bold" : "text-slate-400 hover:text-white"
                }`}
                title="Midnight Luxe Gold Mode"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2.5 rounded-2xl bg-navy-950 border border-slate-800 text-gold-400 hover:text-gold-300 relative cursor-pointer transition-colors shadow"
              >
                <Bell className="w-5 h-5" />
                {totalUnreadNotifs > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white font-black text-[10px] flex items-center justify-center shadow-lg border border-navy-950 animate-bounce">
                    {totalUnreadNotifs}
                  </span>
                )}
              </button>

              {/* Notification Drawer Modal */}
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-navy-900 border border-gold-500/40 p-5 shadow-2xl z-50 text-white space-y-4 preserve-dark"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-gold-400" />
                        <h4 className="text-sm font-extrabold">System Notification Inbox</h4>
                      </div>
                      <button
                        onClick={handleClearNotifications}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-navy-950 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3 h-3" /> Mark All Seen
                      </button>
                    </div>

                    <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-none pr-1 text-xs">
                      {/* Section 1: Applications */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                          <span>Pending Student Applications ({notifStats.pendingApplications})</span>
                          <Link
                            href="/admin/admissions"
                            onClick={() => {
                              setNotifOpen(false);
                              handleClearNotifications();
                            }}
                            className="text-gold-400 hover:underline"
                          >
                            View All →
                          </Link>
                        </div>
                        {recentAppsNotif.map((app) => (
                          <Link
                            key={app._id}
                            href="/admin/admissions"
                            onClick={() => {
                              setNotifOpen(false);
                              handleClearNotifications();
                            }}
                            className="p-3 rounded-2xl bg-navy-950 border border-slate-800 hover:border-gold-400 flex items-center justify-between gap-3 transition-colors block"
                          >
                            <div>
                              <div className="font-bold text-white">{app.fullName}</div>
                              <div className="text-[11px] text-slate-400">{app.intendedCourse}</div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Pending
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* Section 2: Contact Messages */}
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                          <span>Unread Inquiries ({notifStats.unreadInquiries})</span>
                          <Link
                            href="/admin/inquiries"
                            onClick={() => {
                              setNotifOpen(false);
                              handleClearNotifications();
                            }}
                            className="text-emerald-400 hover:underline"
                          >
                            View Inbox →
                          </Link>
                        </div>
                        {recentInqNotif.map((inq) => (
                          <Link
                            key={inq._id}
                            href="/admin/inquiries"
                            onClick={() => {
                              setNotifOpen(false);
                              handleClearNotifications();
                            }}
                            className="p-3 rounded-2xl bg-navy-950 border border-slate-800 hover:border-emerald-400 flex items-center justify-between gap-3 transition-colors block"
                          >
                            <div>
                              <div className="font-bold text-white">{inq.fullName}</div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">{inq.message}</div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              New
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin User Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950 border border-slate-800 text-xs shadow-sm">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gold-400 to-gold-600 flex items-center justify-center font-bold text-navy-950 text-[10px]">
                SJ
              </div>
              <span className="font-bold">{adminUser}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-400 font-mono font-bold">
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* MAIN CANVAS */}
        <main className="flex-1 p-6 md:p-10 space-y-8">{children}</main>
      </div>
    </div>
  );
}
