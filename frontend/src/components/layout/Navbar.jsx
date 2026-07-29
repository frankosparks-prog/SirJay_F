"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Award } from "lucide-react";
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 relative border border-gold-500/30 bg-white flex items-center justify-center shrink-0">
              <Image
                src="/SJLogo.jpeg"
                alt="Sir Jay Institute Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-navy-800 transition-colors flex items-center gap-1.5">
                SIR JAY
                <span className="text-xs px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-700 font-bold border border-gold-500/30">
                  INSTITUTE
                </span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">
                Nanyuki, Kenya
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-2xl bg-slate-50 border border-slate-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-navy-900 bg-white shadow-sm border border-slate-200"
                      : "text-slate-700 hover:text-navy-800 hover:bg-white/60"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-500 rounded-full"
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
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-navy-800 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              <span>+254 719 185 821</span>
            </a>

            <Button href="/admissions" size="sm" icon={Award}>
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:text-navy-800 border border-slate-200 focus:outline-none"
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
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-slate-100 text-navy-900 border-l-4 border-gold-500"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <a
                  href="tel:+254719185821"
                  className="flex items-center gap-3 text-sm font-bold text-slate-700 px-4 py-2"
                >
                  <Phone className="w-4 h-4 text-gold-600" />
                  <span>+254 719 185 821</span>
                </a>
                <Button
                  href="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                  icon={Award}
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
