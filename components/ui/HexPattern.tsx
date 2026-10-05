import React, { useId } from "react";

/** Tiled hexagon outline, echoing the HEXstream logo mark. Colour comes from `currentColor`. */
const HexPattern = ({ className = "", scale = 1.5 }: { className?: string; scale?: number }) => {
  const id = `hex-${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern
          id={id}
          width="55.43"
          height="96"
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${scale})`}
        >
          <path
            d="M27.71 0 55.43 16V48L27.71 64 0 48V16ZM27.71 64V96"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

export default HexPattern;
