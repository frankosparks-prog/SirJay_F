"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  iconPosition = "right",
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-950 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 font-semibold shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:brightness-105 border border-gold-300/40",
    secondary:
      "bg-navy-700 hover:bg-navy-600 text-white shadow-lg shadow-navy-900/50 border border-navy-500/30",
    outline:
      "border-2 border-gold-500/80 text-gold-300 hover:bg-gold-500/10 hover:text-white hover:border-gold-400",
    glass:
      "glass-panel text-slate-100 hover:border-gold-500/40 hover:bg-navy-800/80 shadow-md",
    ghost:
      "text-slate-300 hover:text-gold-400 hover:bg-navy-800/40",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
  };

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${
    sizes[size] || sizes.md
  } ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link href={href} className={combinedClass} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={combinedClass}
      {...props}
    >
      {content}
    </motion.button>
  );
}
