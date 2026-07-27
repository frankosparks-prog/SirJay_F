"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function Counter({ value, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  // Extract number from string like "1,800" or "95"
  const numericValue = parseInt(value.replace(/,/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const steps = 40;
    const increment = numericValue / steps;
    const stepTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numericValue, duration]);

  const formatted = numericValue > 999
    ? count.toLocaleString()
    : count;

  return (
    <span ref={ref}>
      {isInView ? `${formatted}${suffix}` : `0${suffix}`}
    </span>
  );
}
