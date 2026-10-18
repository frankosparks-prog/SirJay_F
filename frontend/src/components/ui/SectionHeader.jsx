"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  dark = false,
  className = "",
}) {
  const alignment =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col ${alignment} max-w-3xl ${
        align === "center" ? "mx-auto" : ""
      } ${className}`}
    >
      {badge && (
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-sm ${
            dark
              ? "bg-gold-500/10 text-gold-400 border border-gold-500/25"
              : "bg-gold-500/10 text-gold-700 border border-gold-500/25"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
          {badge}
        </span>
      )}

      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className={`${dark ? "text-gold-400" : "text-gold-600"} block md:inline font-black`}>
            {titleHighlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed font-normal max-w-2xl ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}

      <div className="w-12 h-1 bg-gold-500 rounded-full mt-4"></div>
    </motion.div>
  );
}
