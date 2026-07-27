"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
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
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/25 mb-3 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
          {badge}
        </span>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient-gold block md:inline font-black">
            {titleHighlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
          {subtitle}
        </p>
      )}

      <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-transparent rounded-full mt-5"></div>
    </motion.div>
  );
}
