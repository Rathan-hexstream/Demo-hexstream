import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image, { StaticImageData } from "next/image";

import oracle from "@/public/assets/oracle-logo.png";
import market from "@/public/assets/market-logo.png";
import arc from "@/public/assets/industry-logo.png";
import duug from "@/public/assets/duug-logo.webp";
import UGC from "@/public/assets/OUUG-removebg.png";
import mbe from "@/public/assets/mbe.png";

import { useRef, useState } from "react";

interface ClientsLogos {
  image: StaticImageData;
  name: string;
  award: string;
}

const clientsData: ClientsLogos[] = [
  {
    image: duug,
    name: "OUUG Pacesetter",
    award: "Partner of the year",
  },
  {
    image: UGC,
    name: "OUUG Conference",
    award: "Annual Presenter",
  },
  {
    image: market,
    name: "Markets & Markets",
    award: "Data Fabric Industry Leader",
  },
  {
    image: arc,
    name: "Industry ARC",
    award: "Data Fabric Industry Leader",
  },
  {
    image: oracle,
    name: "Oracle Utilities Analytics",
    award: "Platform Co-Developer",
  },
];

const Achievements = () => {
  const [swiperState, setSwiperState] = useState<any>();
  return (
    <div className="bg-prime">
      <h2 className="text-primary text-xl md:text-3xl font-bold text-center pt-12">
        Achievements
      </h2>
      <div className="flex flex-row justify-center items-center max-w-6xl mx-auto relative pb-12 w-11/12">
        {/* px-4 xl:px-40 2xl:px-40 */}
        <div className="hidden absolute left-2 xl:left-14 2xl:left-16 z-10 top-0 bottom-0  justify-center items-center">
          <div
            onClick={() => {
              if (swiperState.activeIndex > 0) {
                swiperState.slideTo(swiperState.activeIndex - 1);
              }
            }}
            className="rounded-full p-2 text-darkGray lg:w-10 lg:h-10 md:w-10 md:h-10 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 xl:w-12 xl:h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
        <div className="hidden absolute right-4 xl:right-16 2xl:right-20  z-10 top-0 bottom-0  justify-center items-center">
          <div
            onClick={() => {
              if (swiperState.activeIndex < clientsData.length) {
                swiperState.slideTo(swiperState.activeIndex + 1);
              }
            }}
            className="rounded-full p-2 text-darkGray lg:w-10 lg:h-10 md:w-10 md:h-10 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 xl:w-12 xl:h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          speed={5000}
          grabCursor
          freeMode={true}
          autoplay={{
            delay: 1,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={false}
          modules={[Autoplay]}
          breakpoints={{
            510: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            750: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            900: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
          }}
        >
          {clientsData.map((client, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="flex justify-center items-center ">
                  <div className="relative">
                    <Image
                      src={client.image}
                      width={180}
                      height={180}
                      alt={client.name}
                      className="w-fit mx-auto rounded-md bg-contain object-cover h-40 md:h-full pb-4"
                    />
                    <div className="absolute whitespace-nowrap -bottom-0 left-1/2 -translate-x-1/2  text-primary font-semibold">
                      <div className="text-center pt-6">
                        <p className="text-sm md:text-base pb-1">
                          {client.name}
                        </p>
                        <p className="text-sm opacity-70">{client.award}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Achievements;
