import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Zap,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-white p-2 rounded-xl border border-gold-500/30 shadow-md group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/SirJayLogo.jpeg"
                  alt="Sir Jay Training Institute"
                  width={220}
                  height={55}
                  className="h-11 sm:h-12 w-auto object-contain"
                />
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

            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-gold-500/20 text-xs text-gold-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                TVETA Compliant
              </div>
            </div>

            {/* Social Media Handles */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Follow Our Socials
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/sirjaysartorial/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-navy-950 flex items-center justify-center transition-all shadow-md group"
                  title="Follow us on Instagram"
                >
                  <InstagramIcon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://facebook.com/Sirjaysuits/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-navy-950 flex items-center justify-center transition-all shadow-md group"
                  title="Follow us on Facebook"
                >
                  <FacebookIcon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://ke.linkedin.com/in/sir-jay-14b60a158"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-navy-950 flex items-center justify-center transition-all shadow-md group"
                  title="Connect with us on LinkedIn"
                >
                  <LinkedinIcon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
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
                { label: "Faculty & Staff", href: "/staff" },
                { label: "Admissions & Enrollment", href: "/admissions" },
                { label: "Student Life", href: "/student-life" },
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
                  <Zap className="w-3.5 h-3.5" /> Coming Soon
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
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://www.instagram.com/sirjaysartorial/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400 flex items-center gap-1 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" /> Instagram
            </a>
            <span>•</span>
            <a
              href="https://facebook.com/Sirjaysuits/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400 flex items-center gap-1 transition-colors"
            >
              <FacebookIcon className="w-3.5 h-3.5" /> Facebook
            </a>
            <span>•</span>
            <a
              href="https://ke.linkedin.com/in/sir-jay-14b60a158"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-400 flex items-center gap-1 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
          <p className="text-slate-500">
            Nanyuki, Laikipia County, Kenya • TVETA Approved Vocational College
          </p>
        </div>
      </div>
    </footer>
  );
}


