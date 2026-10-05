import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  tilt?: number;
  /** Colour of the glow that follows the cursor. */
  glow?: string;
}

const spring = { stiffness: 220, damping: 22, mass: 0.5 };

/** Card that leans towards the cursor and lights up underneath it. */
const TiltCard = ({
  children,
  className = "",
  tilt = 6,
  glow = "rgba(235,44,46,0.16)",
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), spring);
  const background = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, ${glow}, transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group/tilt relative ${className}`}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
};

export default TiltCard;
