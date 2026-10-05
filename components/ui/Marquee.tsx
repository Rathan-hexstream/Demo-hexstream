import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  /** Pixels per second. */
  speed?: number;
  className?: string;
}

/** Endless horizontal ticker. Pauses on hover and when reduced motion is requested. */
const Marquee = ({ children, speed = 45, className = "" }: MarqueeProps) => {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (paused.current || reduceMotion || !track.current) return;
    // The track holds two identical groups, so half its width is one full loop.
    const loop = track.current.scrollWidth / 2;
    if (!loop) return;
    let next = x.get() - (speed * Math.min(delta, 64)) / 1000;
    if (next <= -loop) next += loop;
    x.set(next);
  });

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div ref={track} style={{ x }} className="flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
