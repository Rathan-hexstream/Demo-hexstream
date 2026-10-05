import React, { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/** Counts up to `to` the first time it scrolls into view. */
const Counter = ({ to, prefix = "", suffix = "", duration = 1.8 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node || reduceMotion) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {to}
      {suffix}
    </span>
  );
};

export default Counter;
