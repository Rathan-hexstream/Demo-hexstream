import React from "react";
import Link from "next/link";
import { isExternal } from "@/utils/navigation";

type Variant = "primary" | "light" | "outline" | "outlineLight";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-glow focus-visible:outline-brand",
  light: "bg-white text-ink hover:text-white focus-visible:outline-white",
  outline: "border border-ink/20 text-ink hover:border-ink hover:text-white focus-visible:outline-ink",
  outlineLight:
    "border border-white/35 text-white hover:border-white hover:text-ink focus-visible:outline-white",
};

// Colour that sweeps up from the bottom edge on hover.
const fills: Record<Variant, string> = {
  primary: "bg-ink",
  light: "bg-ink",
  outline: "bg-ink",
  outlineLight: "bg-white",
};

export const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 ${className}`}
  >
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}

const ButtonLink = ({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
}: ButtonLinkProps) => {
  const external = isExternal(href) && !href.startsWith("mailto:");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-[color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.98] ${styles[variant]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-y-0 ${fills[variant]}`}
      />
      <span className="relative flex items-center gap-2">
        {children}
        {arrow && (
          // Two arrows: one exits right while its twin enters from the left.
          <span className="relative block h-4 w-4 overflow-hidden">
            <ArrowIcon className="absolute inset-0 transition-transform duration-300 group-hover/btn:translate-x-full" />
            <ArrowIcon className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover/btn:translate-x-0" />
          </span>
        )}
      </span>
    </Link>
  );
};

export default ButtonLink;
