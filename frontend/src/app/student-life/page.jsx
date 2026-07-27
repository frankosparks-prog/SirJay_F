"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Laptop,
  Users,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

const galleryCards = [
  {
    id: 1,
    title: "Fashion Studio Workshop",
    category: "Practical Crafting",
    description: "Students operating industrial electric sewing machines, drafting patterns, and stitching bespoke garments under master instructor guidance.",
    icon: Scissors,
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "ICT & Media Computer Lab",
    category: "Digital Design",
    description: "Hands-on digital pattern CAD software, Adobe Creative Cloud illustration, and photo editing suites for modern fashion portfolios.",
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Group Business Mentorship",
    category: "Entrepreneurship",
    description: "Interactive peer sessions covering pricing strategies, client negotiation, brand storytelling, and launching independent design brands.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Annual Graduation Ceremony",
    category: "Celebration",
    description: "Celebrating student milestones with live runway showcases, alumni awards, and certificate handovers before family and industry leaders.",
    icon: Award,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  },
];

const studentHighlights = [
  {
    title: "Hands-On Studio Culture",
    desc: "Every student has dedicated access to equipment. No sharing machines or waiting for lab time.",
  },
  {
    title: "Exhibitions & Fashion Shows",
    desc: "Showcase your term project collections on the Nanyuki runway before prospective buyers.",
  },
  {
    title: "Alumni Network & Job Match",
    desc: "Direct connection with Sir Jay Suits bespoke tailors and regional apparel companies.",
  },
];

export default function StudentLifePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* PAGE HERO BANNER */}
      <PageHero
        badge="Campus Life & Experience"
        title="Vibrant Student Experience in"
        titleHighlight="Nanyuki"
        subtitle="From annual fashion showcases to computer innovation challenges and graduation days, life at Sir Jay Training Institute is dynamic, creative, and community-driven."
        bgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop"
        breadcrumbs={[{ label: "Student Life" }]}
      />

      {/* GALLERY GRID SHOWCASE (EDITORIAL IMAGE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Campus Visual Tour"
          title="Inside Our Creative"
          titleHighlight="Studios"
          subtitle="Explore the daily environment where our students turn raw fabric and ideas into commercial fashion lines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryCards.map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden group flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-navy-900 shadow-md backdrop-blur-md">
                    {card.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-700 flex items-center justify-center font-bold">
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-navy-700 transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Nanyuki Main Campus</span>
                    <span className="text-navy-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Facility <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* STUDENT HIGHLIGHTS & COMMUNITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
              Student Centric Approach
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              What Makes Student Life Special Here?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <h4 className="text-lg font-bold text-navy-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button href="/admissions" icon={Sparkles}>
              Become Part of Our Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
