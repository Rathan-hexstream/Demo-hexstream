import React from "react";
import Image from "next/image";
import I from "../public/assets/Screen-Shot-2021-02-11-at-1.37.15-AM-1024x818.png";
import Link from "next/link";

const Events = ({ data }: any) => {
  return (
    <div className="py-8  relative">
      <div className="absolute w-30  md:h-16 -top-7 md:-top-8 left-0 bg-primary px-6 md:px-16 md:py-4 py-3 text-prime text-base md:text-2xl font-bold">
        Upcoming Event
      </div>
      <div className="absolute bg-prime -z-10 lg:w-9/12 w-full h-full -mt-8"></div>
      <div className="grid lg:grid-cols-12 grid-cols-1 place-items-center max-w-7xl mx-auto w-11/12 gap-6 pt-4">
        <div className="lg:col-span-4 col-span-1 text-primary md:order-none order-2">
          <p>{data[0]?.eventDate}</p>
          <h2 className="md:text-3xl text-xl font-bold py-2">
            {data[0]?.eventName}
          </h2>
          <div className="flex gap-1 justify-start items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </span>
            <p className="font-bold">
              <span>{data[0].eventLocation}</span>
            </p>
          </div>

          <p className="pt-4">{data[0].eventDetails}</p>
          <div className="pt-4">
            <div className="flex gap-2 justify-center items-center hover:cursor-pointer w-fit border-2 border-primary hover:border-white hover:text-white text-lg  px-2 md:px-4 py-1 transition-colors duration-300 relative group/item">
              <div className="absolute w-full h-full -z-10 group-hover/item:bg-secondary translate-x-0 translate-y-0 group-hover/item:translate-x-1 group-hover/item:translate-y-1 transition-all transform duration-500"></div>
              <Link href={"/uaug"} className="text-sm md:text-lg">
                Learn More
              </Link>
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
        </div>
        <div className="lg:col-span-8 col-span-1 pt-8 -order-1 md:order-1">
          {data[0].eventBanner.mimeType == "video/mp4" ||
          data[0].eventBanner.mimeType == "video/webm" ? (
            <video autoPlay loop muted>
              <source
                src={data[0].eventBanner.url}
                type="video/mp4"
                className="object-cover"
              />
            </video>
          ) : (
            <Image
              src={data[0].eventBanner.url}
              width={1200}
              height={800}
              alt={data[0]?.eventName + "image"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
