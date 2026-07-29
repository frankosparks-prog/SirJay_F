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
  whileHover = { scale: 1.03, y: -2 },
  whileTap = { scale: 0.97 },
  whileFocus,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-950 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 text-navy-950 font-extrabold tracking-wide shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:brightness-105 border border-gold-600/50",
    secondary:
      "bg-navy-900 hover:bg-navy-950 text-white font-bold tracking-wide shadow-lg shadow-navy-950/30 border border-navy-800/80 hover:border-gold-500/50",
    outline:
      "bg-navy-900/95 text-gold-400 font-extrabold border-2 border-gold-500 hover:bg-gold-500 hover:text-navy-950 hover:border-gold-400 shadow-md backdrop-blur-sm",
    glass:
      "bg-navy-950/85 backdrop-blur-md text-white font-extrabold border border-gold-500/40 hover:border-gold-400 hover:bg-navy-900 shadow-md",
    ghost:
      "text-navy-900 font-extrabold hover:text-gold-600 hover:bg-slate-100/80",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5 font-extrabold",
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
        whileHover={whileHover}
        whileTap={whileTap}
        whileFocus={whileFocus}
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
      whileHover={whileHover}
      whileTap={whileTap}
      whileFocus={whileFocus}
      type={type}
      onClick={onClick}
      className={combinedClass}
      {...props}
    >
      {content}
    </motion.button>
  );
}
