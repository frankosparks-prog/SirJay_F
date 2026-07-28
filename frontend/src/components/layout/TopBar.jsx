import Link from "next/link";
import { MapPin, Phone, Mail, Zap, UserCircle } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-navy-950 text-white text-xs border-b border-navy-800/80 py-2.5 px-4 sm:px-6 lg:px-8 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left Side Info */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-slate-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Nanyuki Town, Laikipia County, Kenya</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <a href="tel:+254712345678" className="hover:text-gold-300 transition-colors">
              +254 712 345 678
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <a href="mailto:admissions@sirjayinstitute.ac.ke" className="hover:text-gold-300 transition-colors">
              admissions@sirjayinstitute.ac.ke
            </a>
          </div>
        </div>

        {/* Right Side Actions & Portal */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[11px] font-bold border border-gold-500/30 uppercase tracking-wider">
            <Zap className="w-3 h-3 text-gold-400" />
            MAY 2025 INTAKE ONGOING
          </span>

          <div className="h-3.5 w-[1px] bg-slate-700 hidden sm:block"></div>

          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 font-bold text-white hover:text-gold-300 transition-colors px-2 py-0.5 rounded hover:bg-navy-900"
          >
            <UserCircle className="w-4 h-4 text-gold-400" />
            <span>Student Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
