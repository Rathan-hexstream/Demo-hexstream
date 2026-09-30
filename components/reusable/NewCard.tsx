import React from "react";
import I from "@/public/assets/ashwini-chaudhary-monty-6yzFubfYMeo-unsplash.jpg";
import Image from "next/image";
import { calculateReadingTime } from "./readingTime";

interface CardInterface {
  img: any;
  title?: string;
  alt: string;
  description?: string;
  briefText?: string;
  approachText?: string;
}

const NewCard = ({
  img,
  title,
  alt,
  description,
  briefText,
  approachText,
}: CardInterface) => {
  return (
    <div className="">
      <div className="relative overflow-hidden group/item">
        <div className="">
          <Image
            src={img}
            alt={alt}
            width={300}
            height={300}
            className="hover:scale-110 transition-all duration-500 rounded brightness-50 aspect-[2/3] object-center object-cover"
          />
        </div>
        <div className="absolute bottom-8 left-0 text-white w-full">
          <div className={`p-5`}>
            <h2 className="text-base md:text-lg pb-2">{title} </h2>

            <h2 className="text-xs md:text-sm py-2 flex justify-between">
              <span>
                {calculateReadingTime(briefText ? briefText : "") +
                  calculateReadingTime(approachText ? approachText : "")}{" "}
                Minute Read
              </span>
              <span className="hover:text-secondary">Read More</span>
            </h2>
          </div>
        </div>
        <div className="absolute top-8 right-8 text-white group-hover/item:text-secondary transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
