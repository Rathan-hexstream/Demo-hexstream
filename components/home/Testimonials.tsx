import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";

import { EffectCoverflow, FreeMode, Pagination, Autoplay } from "swiper";

const Testimonials = ({ testimonials }: any) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="md:pb-16 md:pt-8 pb-12"
    >
      <div>
        <div className="grid md:grid-cols-12 grid-cols-1 max-w-full mx-auto w-11/12 rounded-3xl text-black">
          <div className="md:col-span-4 col-span-1 md:p-12 bg-darkBlue/80 py-12 px-2 md:py-12  relative bg-prime">
            <div>
              <h2
                className={`text-2xl md:text-4xl py-3 text-center md:text-left font-bold`}
              >
                What people say about us
              </h2>
              <h2 className="text-base md:text-lg text-center md:text-left text-gray-700">
                {`Learn how we've made a positive impact in the utilities domain.`}
              </h2>
            </div>
            <div className="absolute bottom-0 left-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                className="opacity-10"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />{" "}
              </svg>
            </div>
          </div>

          <div className="md:col-span-8 col-span-1 md:pr-8 relative block lg:hidden ">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              freeMode={true}
              autoplay={{
                delay: 4000,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper"
            >
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
                {testimonials.map((item: any, id: any) => (
                  <SwiperSlide key={item.name}>
                    <div
                      key={item.name}
                      className="bg-primary text-white lg:text-black h-full w-full p-8"
                    >
                      <div className="text-center text-sm">
                        {/* <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                            className="h-4 w-4 fill-primary/40 "
                          >
                            <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                          </svg>
                        </span> */}
                        {`“${item.review}”`}
                        {/* <span className="float-right pt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                            className="h-4 w-4 fill-primary/40 "
                          >
                            <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z" />
                          </svg>
                        </span> */}
                      </div>
                      <h2 className="text-center font-bold pt-4 pb-2 text-base">
                        {item.name}
                      </h2>
                      <h2 className="text-center text-xs">
                        {item?.designation}
                      </h2>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
          {/* MD+ */}
          <div className="md:col-span-8 col-span-1 md:pr-8 px-2 py-16 relative hidden lg:block bg-primary ">
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              autoplay={{
                delay: 4000,
              }}
              pagination={{
                clickable: true,
              }}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper"
            >
              <div className="">
                {testimonials.map(
                  ({ name, review, designation, company }: any, id: any) => (
                    <SwiperSlide className="!grid place-items-center" key={id}>
                      <div className="bg-prime lg:text-black  py-10 px-4">
                        <div className="text-center">
                          {/* <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                              className="h-4 w-4 fill-primary/40 "
                            >
                              <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                            </svg>
                          </span> */}
                          {`“${review}”`}
                          {/* <span className="float-right pt-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                              className="h-4 w-4 fill-primary/40 "
                            >
                              <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z" />
                            </svg>
                          </span> */}
                        </div>
                        <h2 className="text-center font-bold pt-4 text-xl ">
                          {name}
                        </h2>

                        <h2 className="text-center text-xs pt-0.5 ">
                          {designation && designation}{company && `, ${company}`}
                        </h2>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
