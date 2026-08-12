"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { loginAdmin } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAdmin({ username, password });
      if (res && res.success) {
        router.push("/admin");
      } else {
        setError(res?.message || "Invalid credentials. Use admin / admin123");
      }
    } catch (err) {
      setError("Login failed. Make sure backend API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full rounded-3xl glass-panel-dark border border-gold-500/30 p-8 shadow-2xl space-y-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-gold-500/40 p-2 flex items-center justify-center shadow-xl">
            <Image
              src="https://res.cloudinary.com/dnjj3tr4d/image/upload/v1785409345/SJLogo_piibe7.jpg"
              alt="Sir Jay Logo"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> TVETA Certified Control System
            </span>
            <h1 className="text-2xl font-black text-white mt-1">Sir Jay Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage courses, applications, events, and media vault.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Admin Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter username (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Enter password (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full cursor-pointer"
              icon={ArrowRight}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In to Admin Portal"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
