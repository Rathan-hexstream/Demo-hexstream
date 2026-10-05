import React from "react";
import { motion, type Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const viewport = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Fades and lifts its children into place the first time they scroll into view. */
export const Reveal = ({ children, className, delay = 0 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewport}
    transition={{ duration: 0.7, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

/** Parent for `StaggerItem`s: reveals them one after another on scroll. */
export const Stagger = ({ children, className, gap = 0.08 }: StaggerProps) => (
  <motion.div
    className={className}
    variants={stagger(gap)}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div className={className} variants={fadeUp}>
    {children}
  </motion.div>
);
