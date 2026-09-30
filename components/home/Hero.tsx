import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";
import { useRef } from "react";

export default function Hero({ heroData }: any) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="hidden lg:block relative">
        <Swiper
          onInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          speed={3000}
          modules={[Navigation, Autoplay]}
          loop={true}
          className="mySwiper w-full relative"
        >
          {heroData.map((desk: any) => {
            return (
              <SwiperSlide
                key={desk.title}
                className="flex justify-center h-full "
              >
                <div className="h-[50vh]">
                  <Image
                    src={desk?.banner?.url}
                    className="h-full bg-center object-cover  brightness-[0.8] grayscale-[0.1]"
                    objectFit="cover"
                    layout="fill"
                    alt={desk.alt}
                    priority
                  />
                  <h2 className="absolute md:top-[20%] xl:top-[30%] left-[5%] z-50 text-white text-4xl lg:text-5xl max-w-xl lg:max-w-2xl">
                    {desk.title}
                  </h2>
                  {desk?.heroLink && (
                    <div className="absolute bottom-20 left-[5%] z-50 text-white text-lg border-2 px-3 py-1.5 ">
                      <button>
                        <Link href={desk?.heroLink ?? "/"}>Learn More</Link>
                      </button>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
          <div className="flex absolute bottom-16 right-16 z-40">
            <button ref={prevRef} className="mx-8 hover:cursor-pointer">
              <span className="sr-only">Previous Slide</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="86.932"
                height="24.993"
                viewBox="0 0 86.932 24.993"
              >
                <g
                  id="Icon_feather-arrow-right"
                  data-name="Icon feather-arrow-right"
                  transform="translate(1.5 2.121)"
                >
                  <path
                    id="Path_3"
                    data-name="Path 3"
                    d="M91.432,18H7.5"
                    transform="translate(-7.5 -7.625)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <path
                    id="Path_4"
                    data-name="Path 4"
                    d="M28.375,7.5,18,17.875,28.375,28.25"
                    transform="translate(-18 -7.5)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </g>
              </svg>
            </button>
            <button
              ref={nextRef}
              className="justify-center items-center hover:cursor-pointer"
            >
              <span className="sr-only">Next Slide</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="86.932"
                height="24.993"
                viewBox="0 0 86.932 24.993"
              >
                <g
                  id="Icon_feather-arrow-right"
                  data-name="Icon feather-arrow-right"
                  transform="translate(1.5 2.121)"
                >
                  <path
                    id="Path_3"
                    data-name="Path 3"
                    d="M7.5,18H91.432"
                    transform="translate(-7.5 -7.625)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <path
                    id="Path_4"
                    data-name="Path 4"
                    d="M18,7.5,28.375,17.875,18,28.25"
                    transform="translate(55.556 -7.5)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </g>
              </svg>
            </button>
          </div>
        </Swiper>
      </div>
      {/* Smaller devices */}
      <div className="block lg:hidden ">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={false}
          speed={3000}
          modules={[Autoplay, Navigation]}
          loop={true}
          className="mySwiper w-full relative"
        >
          {heroData.map((mob: any) => {
            return (
              <SwiperSlide
                key={mob.title}
                className="flex justify-center h-full "
              >
                <div className="min-h-screen">
                  <Image
                    src={mob?.banner?.url}
                    className="h-full bg-cover !object-center brightness-50"
                    objectFit="cover"
                    layout="fill"
                    alt={mob.alt}
                    priority
                  />
                  <div className="absolute bottom-36 left-4 z-50 text-white text-2xl px-4">
                    <h1 className="pb-4">{mob.title}</h1>
                    {mob?.heroLink && (
                      <button className="text-white text-lg px-3 py-0.5 border">
                        <Link href={mob.heroLink ?? "/"}>Learn More</Link>
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
