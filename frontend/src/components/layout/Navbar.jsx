"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, Phone, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Admissions", href: "/admissions" },
  { name: "Student Life", href: "/student-life" },
  { name: "Events & News", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/90 backdrop-blur-xl border-b border-gold-500/20 shadow-2xl py-3"
          : "bg-gradient-to-b from-navy-950/95 via-navy-950/60 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center text-navy-950 shadow-md group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-gold-300 transition-colors flex items-center gap-1.5">
                SIR JAY
                <span className="text-xs px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-400 font-semibold border border-gold-500/30">
                  INSTITUTE
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Nanyuki, Kenya
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-card px-4 py-1.5 rounded-2xl border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-gold-400 bg-navy-800/80 shadow-inner"
                      : "text-slate-300 hover:text-white hover:bg-navy-800/40"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+254719185821"
              className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-gold-300 transition-colors px-3 py-2 rounded-lg hover:bg-navy-800/50"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>+254 719 185 821</span>
            </a>

            <Button href="/admissions" size="sm" icon={Sparkles}>
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl glass-card text-slate-200 hover:text-gold-400 border border-gold-500/20 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Animated Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-navy-950/95 backdrop-blur-2xl border-b border-gold-500/20 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-navy-800 text-gold-400 border border-gold-500/30"
                        : "text-slate-200 hover:bg-navy-900 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                <a
                  href="tel:+254719185821"
                  className="flex items-center gap-3 text-sm text-slate-300 px-4 py-2"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>+254 719 185 821</span>
                </a>
                <Button
                  href="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                  icon={Sparkles}
                >
                  Apply Now for 2025
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
