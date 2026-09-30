import React from "react";
import Link from "next/link";

interface CtaTypes {
  title: string;
  name: string;
}

const Cta = ({ title, name }: CtaTypes) => {
  return (
    <div className="py-12 text-primary relative overflow-hidden px-2">
      <div className="absolute -top-4 -left-36 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="646.905"
          width="546.905"
          height="460.234"
          viewBox="0 0 646.905 560.234"
        >
          <g
            id="Layer_1"
            data-name="Layer 1"
            transform="translate(313.719 341.505)"
          >
            <path
              id="Path_2"
              data-name="Path 2"
              d="M476.519,0H158.839L0,275.117,158.839,550.234h317.68L635.358,275.117Z"
              transform="translate(-307.945 -336.505)"
              fill="none"
              stroke="#f4f4f9"
              strokeWidth="10"
            />
          </g>
        </svg>
      </div>
      <hr className="h-0.5 bg-primary max-w-5xl mx-auto" />
      <h2 className="text-xl md:text-2xl text-center text-primary font-extrabold py-8">
        {title}
      </h2>
      <div className="flex gap-2 justify-center items-center hover:cursor-pointer w-fit mx-auto text-white text-lg bg-secondary px-2 md:px-4 py-1 transition-colors duration-300 relative group/item">
        <div className="absolute w-full h-full -z-10 bg-primary translate-x-0 translate-y-0 group-hover/item:translate-x-1 group-hover/item:translate-y-1 transition-all transform duration-500"></div>
        <button className="">
          <Link
            href={"https://forms.office.com/r/zg0U7ZmsdF"}
            className="text-sm md:text-lg"
            target="_blank"
          >
            {name}
          </Link>
        </button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Cta;
