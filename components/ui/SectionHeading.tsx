import React from "react";
import { Reveal } from "./motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}: SectionHeadingProps) => (
  <Reveal
    className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
  >
    {eyebrow && (
      <p
        className={`mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
          dark ? "text-white/75" : "text-brand"
        }`}
      >
        <span className="h-px w-6 bg-current" />
        {eyebrow}
      </p>
    )}
    <h2
      className={`font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      {title}
    </h2>
    {description && (
      <p
        className={`mt-5 text-base leading-relaxed sm:text-lg ${
          dark ? "text-white/75" : "text-ink/65"
        }`}
      >
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeading;
