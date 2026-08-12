"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Award,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Users,
  Sparkles,
  ChevronRight,
  BookOpen,
  X,
  Maximize2,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { getStaff } from "@/lib/api";

const GlassAccent = dynamic(() => import("@/components/3d/GlassAccent"), {
  ssr: false,
});

const TargetCursor = dynamic(() => import("@/components/ui/TargetCursor"), {
  ssr: false,
});

const defaultStaffList = [
  {
    _id: "s1",
    name: "Sir Jay (Jay Sartorial)",
    role: "Founder & Managing Director",
    department: "Executive Directorate",
    bio: "Visionary fashion designer, master tailor, and entrepreneur who established Sir Jay Training Institute to empower East African youth with world-class suiting and garment manufacturing skills.",
    qualifications: "Master Bespoke Suiter • Higher Diploma Fashion Technology",
    email: "sirjaysuits@gmail.com",
    phone: "+254 719 185 821",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    hierarchyOrder: 1,
    isLeadership: true,
  },
  {
    _id: "s2",
    name: "Dr. Elizabeth Mwangi",
    role: "Academic Registrar & Quality Assurance Head",
    department: "Academic Registry",
    bio: "Oversees TVETA curriculum compliance, NITA test center accreditation, examination standards, and student progression pathways across all academic departments.",
    qualifications: "Ph.D. Education Management • M.Ed. Curriculum Studies",
    email: "registrar@sirjayinstitute.ac.ke",
    phone: "+254 722 000 111",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    hierarchyOrder: 2,
    isLeadership: true,
  },
  {
    _id: "s3",
    name: "Master Tailor Peter Kinyua",
    role: "Head of Department - School of Fashion Design",
    department: "School of Fashion Design",
    bio: "Over 18 years of experience in haute couture tailoring, luxury blazer construction, industrial sewing machinery, and advanced pattern drafting.",
    qualifications: "Higher Diploma Fashion Design (KNQF Level 6) • NITA Assessor",
    email: "fashion@sirjayinstitute.ac.ke",
    phone: "+254 712 345 678",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    hierarchyOrder: 3,
    isLeadership: true,
  },
  {
    _id: "s4",
    name: "Grace Wambui",
    role: "Senior Instructor - Pattern Drafting & Draping",
    department: "School of Fashion Design",
    bio: "Specializes in 2D flat block manipulation, evening gown draping, textile care, and student collection mentoring.",
    qualifications: "Diploma Fashion Design & Technology",
    email: "grace.w@sirjayinstitute.ac.ke",
    phone: "+254 723 456 789",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    hierarchyOrder: 4,
    isLeadership: false,
  },
  {
    _id: "s5",
    name: "Eng. David Ochieng",
    role: "ICT & Digital Media Lead",
    department: "ICT & Technical Department",
    bio: "Leads digital fashion illustration (Clo3D/Adobe CAD), computer literacy programs, and technical infrastructure at Nanyuki Campus.",
    qualifications: "B.Sc. Computer Science • Adobe Certified Professional",
    email: "ict@sirjayinstitute.ac.ke",
    phone: "+254 734 567 890",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    hierarchyOrder: 5,
    isLeadership: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState(defaultStaffList);
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    async function loadStaffData() {
      const data = await getStaff();
      if (data && data.length > 0) {
        setStaffMembers(data);
      }
    }
    loadStaffData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedStaff(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const departmentsList = [
    { id: "all", label: "All Faculty & Staff" },
    { id: "Executive Directorate", label: "Executive Directorate" },
    { id: "Academic Registry", label: "Academic Registry" },
    { id: "School of Fashion Design", label: "School of Fashion Design" },
    { id: "ICT & Technical Department", label: "ICT & Media Dept" },
  ];

  const filteredStaff =
    selectedDept === "all"
      ? staffMembers
      : staffMembers.filter((s) => s.department === selectedDept);

  const leadershipStaff = staffMembers.filter((s) => s.isLeadership);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      <TargetCursor
        targetSelector=".cursor-target"
        cursorColor="#D4AF37"
        cursorColorOnTarget="#F59E0B"
      />

      {/* PAGE HERO BANNER */}
      <PageHero
        badge="Institutional Leadership & Faculty"
        title="Our Academic &"
        titleHighlight="Leadership Team"
        subtitle="Meet the experienced master tailors, academic registrars, and technical instructors guiding students to greatness at Sir Jay Training Institute."
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
        breadcrumbs={[{ label: "Faculty & Staff" }]}
      />

      {/* LEADERSHIP SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative">
        <div className="absolute -top-16 -right-12 hidden lg:block pointer-events-none z-0">
          <GlassAccent type="staff" className="w-64 h-64 opacity-75" />
        </div>

        <SectionHeader
          badge="Executive Board"
          title="Institutional Directorate"
          titleHighlight="& Leadership"
          subtitle="Grounded in professional suiting mastery, TVETA academic compliance, and industry innovation."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {leadershipStaff.map((person, idx) => (
            <motion.div
              key={person._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div
                  onClick={() => setSelectedStaff(person)}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md cursor-pointer group/img"
                  title="Click to view larger image"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-navy-950/90 text-gold-400 border border-gold-500/30 backdrop-blur-md">
                    {person.department}
                  </div>
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 rounded-full bg-white/90 text-navy-950 shadow-lg transform scale-90 group-hover/img:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5 text-gold-600" />
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-navy-700 transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-xs font-extrabold text-navy-800">{person.role}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>{person.qualifications}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {person.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-navy-900 font-medium truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{person.email}</span>
                  </a>
                )}
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="flex items-center gap-2 font-bold text-gold-600 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{person.phone}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FULL FACULTY & INSTRUCTORS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Complete Staff Directory"
          title="Faculty & Departmental"
          titleHighlight="Instructors"
          subtitle="Explore all faculty members, technical lab coordinators, and student advisors at Sir Jay Sartorial Institute."
        />

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {departmentsList.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                selectedDept === dept.id
                  ? "bg-navy-900 text-gold-400 shadow-lg border border-gold-500/40"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredStaff.map((member, idx) => (
            <motion.div
              key={member._id || idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => setSelectedStaff(member)}
                    className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-md cursor-pointer group/thumb"
                    title="Click to view larger image"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 inline-block truncate">
                      {member.department}
                    </span>
                    <h4 className="text-lg font-extrabold text-slate-900 truncate group-hover:text-navy-700 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs font-bold text-gold-600 truncate">{member.role}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold-600 shrink-0" />
                  <span className="truncate">{member.qualifications}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-navy-800">
                <a href={`mailto:${member.email}`} className="hover:underline text-slate-600 font-medium truncate max-w-[60%]">
                  {member.email || "Contact Desk"}
                </a>
                <a href={`tel:${member.phone}`} className="text-gold-600 hover:underline">
                  {member.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-navy-700 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-slate-900">Interested in Joining Our Faculty?</h4>
              <p className="text-xs text-slate-600">
                Sir Jay Institute welcomes certified master tailors, ICT instructors, and vocational educators to join our growing Nanyuki team.
              </p>
            </div>
          </div>
          <Button href="/contact" size="lg" icon={Mail}>
            Send Faculty Inquiry
          </Button>
        </div>
      </section>

      {/* STAFF IMAGE & DETAILS LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStaff(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full relative flex flex-col md:flex-row my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStaff(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-navy-950 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Display */}
              <div className="md:w-1/2 bg-slate-900 relative min-h-[320px] md:min-h-[420px] flex items-center justify-center">
                <img
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  className="w-full h-full object-cover max-h-[500px]"
                />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-bold px-3 py-1.5 rounded-xl bg-navy-950/80 text-gold-300 border border-gold-500/20 backdrop-blur-md flex items-center gap-2 justify-between">
                  <span className="truncate">{selectedStaff.department}</span>
                  <span className="text-[10px] text-slate-300 shrink-0 font-normal">Click image area outside to close</span>
                </div>
              </div>

              {/* Modal Staff Information */}
              <div className="md:w-1/2 p-6 md:p-8 space-y-5 flex flex-col justify-between bg-white">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-gold-600 block">
                      {selectedStaff.role}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      {selectedStaff.name}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-gold-700 font-bold">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>Qualifications & Credentials</span>
                    </div>
                    <p className="text-slate-600 font-normal leading-snug pl-6">
                      {selectedStaff.qualifications}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Biography & Background</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal max-h-48 overflow-y-auto pr-1">
                      {selectedStaff.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium">
                  {selectedStaff.email && (
                    <a
                      href={`mailto:${selectedStaff.email}`}
                      className="flex items-center gap-2.5 text-slate-700 hover:text-navy-900 font-semibold"
                    >
                      <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{selectedStaff.email}</span>
                    </a>
                  )}
                  {selectedStaff.phone && (
                    <a
                      href={`tel:${selectedStaff.phone}`}
                      className="flex items-center gap-2.5 font-bold text-gold-600 hover:underline"
                    >
                      <Phone className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{selectedStaff.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

