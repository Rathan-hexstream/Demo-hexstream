import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Navigation } from "swiper";

const insights = [
  {
    name: "Success Stories",
    href: "/Insights?type=Success Stories",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 384 512"
        className="h-6 w-6"
        fill="#fff"
        {...props}
      >
        <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
      </svg>
    ),
  },
  {
    name: "Blogs",
    href: "/Insights?type=HEXstream Blog",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 384 512"
        className="h-6 w-6"
        fill="#fff"
        {...props}
      >
        <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
      </svg>
    ),
  },
  {
    name: "Whitepapers & Special Reports",
    href: "/Insights?type=Whitepapers%20%26%20Special%20Reports",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className="h-6 w-6"
        fill="#fff"
        {...props}
      >
        <path d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
      </svg>
    ),
  },
  {
    name: "Tech Corner",
    href: "/Insights?type=Tech Corner",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className="h-6 w-6"
        fill="#fff"
        {...props}
      >
        <path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z" />
      </svg>
    ),
  },
];

const Insights = () => {
  const [solutions, setSolutions] = useState([]);
  const [progress, setProgress] = useState(0);

  const [swiper, setSwiper] = useState<any>(0);
  SwiperCore.use([Autoplay]);
  // const swiper2 = useSwiper();

  return (
    <div className="pt-0 lg:pt-10">
      {/* <div className="pb-8">
        {solutions && (
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={30}
            centeredSlides={true}
            speed={500}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            onAutoplayTimeLeft={(a, b, c) => {
              setProgress(100 - c * 100);
            }}
            className="mySwiper"
            slidesPerView={"auto"}
          >
            {solutions.map((solution: any, idx) => {
              return (
                <SwiperSlide
                  key={idx + "X"}
                  className="flex justify-center h-full !w-fit cursor-pointer"
                >
                  <Link
                    href={"/solutions/" + solution.slug}
                    key={solution.title}
                  >
                    <div className="h-[70vh] relative !w-[85vw]">
                      {idx === swiper.activeIndex && (
                        <div
                          style={{
                            width: progress + "%",
                          }}
                          className={`bg-secondary h-2 bottom-0 absolute z-10 `}
                        />
                      )}

                      <Image
                        src={solution.mainImage.url}
                        className="h-full bg-center brightness-[0.32] grayscale-[0.1]"
                        objectFit="cover"
                        layout="fill"
                        alt={solution.title + " Image"}
                        priority
                      />

                      <div className="absolute bottom-12 left-[5%] z-50 text-white max-w-2xl pr-1">
                        <h2 className="md:text-3xl text-xl pb-6">
                          {solution.title}
                        </h2>
                        <p className="md:text-lg text-sm">{solution.excerpt}</p>
                      </div>
                      <div className="absolute top-4 right-5 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#fff"
                          className="w-8 h-8 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className="flex justify-between items-center md:px-16 pt-10 px-4">
          <div className="flex">
            <button
              // ref={prevRef}
              onClick={() => swiper.slidePrev()}
              className="md:mx-8 mx-2 hover:cursor-pointer"
            >
              <span className="sr-only">Previous Slide</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56.932"
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
                    stroke="#071757"
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
                    stroke="#071757"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </g>
              </svg>
            </button>
            <button
              // ref={nextRef}
              onClick={() => swiper.slideNext()}
              className="justify-center items-center hover:cursor-pointer"
            >
              <span className="sr-only">Next Slide</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56.932"
                height="24.993"
                viewBox="0 0 86.932 24.993"
                className=""
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
                    stroke="#071757"
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
                    stroke="#071757"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </g>
              </svg>
            </button>
          </div>
        
          <div className="flex gap-1 md:gap-2 justify-center items-center hover:cursor-pointer hover:text-white text-lg hover:bg-secondary px-1 md:px-4 md:py-1 py-0.5 transition-colors duration-300 relative group/item bg-transparent text-primary border hover:border-secondary border-primary">
            <div className="absolute w-full h-full -z-10 group-hover/item:bg-primary translate-x-0 translate-y-0 group-hover/item:translate-x-1 group-hover/item:translate-y-1 transition-all transform duration-500"></div>
            <button className="">
              <Link
                href={"/solutions"}
                className="text-xs md:text-lg whitespace-nowrap"
              >
                See all solutions
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
      </div> */}

      <div className="max-w-7xl mx-auto text-center font-extrabold text-2xl md:text-4xl">
        Insights
        <p className="pt-4 text-lg md:text-xl font-normal max-w-4xl mx-auto">
          {
            "Explore our living library of thought leadership in the utilities domain."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto w-11/12 gap-6 md:gap-12 py-12 ">
        {insights.map((sol) => (
          <Link
            key={sol.name}
            rel="noopener noreferrer"
            href={sol.href}
            className="bg-primary hover:bg-secondary transition-all duration-300 text-white p-6 rounded-lg  group/item ease-in"
          >
            <div className="flex gap-1 justify-between hover:cursor-pointer">
              <sol.icon className="h-12 w-16 duration-200 transition-colors" />
              {/* group-hover/item:text-primary */}
              <span className=" ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </span>
            </div>
            <p className="text-xl md:text-2xl py-3 font-bold break-words">
              {sol.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Insights;
