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
            <a href="tel:+254719185821" className="hover:text-gold-300 transition-colors">
              +254 719 185 821
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <a href="mailto:sirjaysuits@gmail.com" className="hover:text-gold-300 transition-colors">
              sirjaysuits@gmail.com
            </a>
          </div>
        </div>

        {/* Right Side Actions & Portal */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-[11px] font-extrabold border border-gold-500/35 uppercase tracking-wider shadow-sm">
            <svg
              viewBox="0 0 122.88 73.27"
              className="w-4 h-3 fill-gold-400 text-gold-400 shrink-0"
              aria-hidden="true"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M104.27,58.88l-0.54-19.99l-32.85,9.49c-2.96,0.65-5.88,0.96-8.74,0.97c-3.07,0.01-6.09-0.32-9.06-0.97 L21.7,38.79v20.27c0.9,10.53,31.11,13.75,40.38,14.19c7.43,0.36,36.78-3.52,40.64-9.57C103.55,62.36,104.07,60.76,104.27,58.88 L104.27,58.88z M117.58,24.5v24.43h0.77c0.53,0,0.96,0.43,0.96,0.96v6.57c0,0.52-0.43,0.96-0.96,0.96h-0.77v2.3 c0.98,0.18,1.73,1.05,1.73,2.08v0c0,1.16-0.96,2.12-2.12,2.12h-3.79c-1.16,0-2.12-0.95-2.12-2.12v0c0-1.03,0.75-1.9,1.73-2.08v-2.3 h-0.77c-0.52,0-0.96-0.43-0.96-0.96v-6.57c0-0.53,0.43-0.96,0.96-0.96h0.77v-23L73.03,38.35c-7.24,1.72-14.48,1.84-21.72,0 L7.18,25.18l-3.99-1.19c-4.97-2.03-3.73-6.8,0.9-7.9L54,1.19c5.15-1.47,10.29-1.7,15.44,0l49.01,14.72 c5.33,1.3,6.38,6.23,0.18,8.26L117.58,24.5L117.58,24.5z"
                />
              </g>
            </svg>
            SEPTEMBER 2026 INTAKE ONGOING
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
