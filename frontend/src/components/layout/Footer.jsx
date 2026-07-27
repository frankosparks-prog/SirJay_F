import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-md">
                <GraduationCap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white">
                  SIR JAY <span className="text-gold-400 font-bold">INSTITUTE</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Nanyuki, Kenya
                </span>
              </div>
            </Link>

            <div className="space-y-2 text-sm text-slate-300">
              <p className="font-semibold text-gold-300 italic">
                &ldquo;Achieving Greatness Together&rdquo;
              </p>
              <p className="text-xs text-slate-400">
                Motto: <span className="text-slate-200">Quality, integrity & style</span>
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              TVETA-registered premier vocational training institution empowering creative minds in Fashion, ICT, and Media Arts.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-gold-500/20 text-xs text-gold-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              TVETA & KNQF Compliant
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-400 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Academics & Courses", href: "/academics" },
                { label: "Admissions & Enrollment", href: "/admissions" },
                { label: "Student Life & Gallery", href: "/student-life" },
                { label: "Events & News", href: "/events" },
                { label: "Contact & Location", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 hover:text-gold-300 hover:translate-x-1 transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-400 pl-3">
              Contact & Hours
            </h4>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Hospital Road, Off Nyeri-Nanyuki Highway, Near Cedar Mall, Nanyuki Town, Kenya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:+254719185821" className="hover:text-gold-300">
                  +254 719 185 821
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:sirjaysuits@gmail.com" className="hover:text-gold-300">
                  sirjaysuits@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-2 border-t border-slate-800">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Office Hours:</span>
                  <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
                  <br />
                  <span>Sat: 9:00 AM - 2:00 PM (Closed Sun/Holidays)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Flexible Learning & Coming Soon */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-400 pl-3">
              Upcoming Programs
            </h4>

            <div className="p-4 rounded-xl glass-card border border-gold-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gold-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Coming Soon
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-gold-500/20 text-gold-300">
                  Enrolling
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Cosmetology & Beauty</li>
                <li>• Deejay School</li>
                <li>• Modeling (Runway & Commercial)</li>
                <li>• Select Hospitality Courses</li>
              </ul>
            </div>

            <div className="text-xs text-slate-400 pt-2">
              <strong className="text-slate-200">Flexible Schedules:</strong> Day (9am-5pm), Evening (5:30pm-8pm), Saturday Weekend (10am-3pm).
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Sir Jay Training Institute. All rights reserved.</p>
          <p className="text-slate-500">
            Nanyuki, Laikipia County, Kenya • TVETA Approved Vocational College
          </p>
        </div>
      </div>
    </footer>
  );
}
