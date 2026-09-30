import Image from "next/image";
import React from "react";
import I1 from "@/public/assets/utility-analytics-banner-1302x680.png";
import Approach from "@/components/about/Approach";
import Partners from "@/components/about/Partners";
import Cta from "@/components/reusable/CTA";
import { useRouter } from "next/router";
import NewPageheader from "@/components/reusable/NewPageheader";
import I5 from "@/public/assets/China-Europes-biggest-onshore-wind-park-Ukraine-.jpg";
import Head from "next/head";
import vision from "@/public/assets/Grid2.jpg";

import Achievements from "@/components/about/Achievements";
import OurTeam from "@/components/about/OurTeam";

import teamImg from "@/public/assets/HEX_Chicago.jpg";
import Statistics from "@/components/home/Statistics";
import aboutUS from "@/public/assets/HEXstreamTeam.webp";

const About = () => {
  const router = useRouter();
  const { pathname } = router;
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
      <div className="">
          <Head>
              <title>{`About HEXstream - Pioneers in Utility Data Analytics.`}</title>
              <meta
                  name="description"
                  content="Learn more about HEXstream, a pioneering company driving digital transformation in the utility industry through data analytics."
              />
          </Head>
          <NewPageheader
              description="We are the global leader for data integration and analytics for the utility industry, delivering AI-empowered solutions and loss-detection strategies across on-premises and cloud. HEXstream is certified a Minority Business Enterprise."
              img={aboutUS}
              title="About Us"
          />
          <div className="mb-8">
              <Approach/>
          </div>
          {/* Mission, Vision and Core Values */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 pb-12">
              <div className=" justify-between md:flex flex-row- md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
                  <div className="md:w-5/12 lg:w-1/2">
                      <Image
                          alt="Mission and vision image"
                          src={vision}
                          loading="lazy"
                          className="rounded-lg h-full md:h-[450px] w-full object-cover"
                      />
                  </div>
                  <div className="md:w-7/12 lg:w-1/2 space-y-4">
                      <div className="md:pb-4">
                          <h2
                              className={
                                  "text-gl md:text-xl text-primary font-bold md:pt-0 pt-4 pb-2"
                              }
                          >
                              {"Our Vision & Mission"}
                          </h2>
                          <p className="text-sm sm:text-base">
                              {
                                  "Energizing peoples’ lives by helping utilities achieve operational efficiency and zero-carbon footprints through data insights."
                              }
                          </p>
                      </div>
                      <div>
                          <h2 className={"text-lg md:text-xl text-primary font-bold pb-2"}>
                              {"Our Core Values"}
                          </h2>
                          <p className="text-sm sm:text-base">
                              {
                                  "HEXstream is named after the most stable geometric shape in nature, the hexagon. Historically, the hexagon is a symbol of harmony and balance. The second part of the name, ‘stream,’ represents the flow of data in real time."
                              }
                          </p>
                      </div>
                      <div>
                          <p className="text-sm sm:text-base">
                              {
                                  "We started this company with one goal in mind: to build cutting-edge, stable, and scalable analytics solutions for our clients that meet their evolving needs using data as a single version of truth. We provide a broad range of services and solutions in strategy, consulting, digital, technology, and operations, combining unmatched experience and specialized skills."
                              }
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="bg-prime">
              <OurTeam/>
          </div>
          {/* Video section goes here */}

          <div className="">
              <div className="max-w-5xl mx-auto w-11/12 py-8 md:py-12">
                  <h2 className="md:text-3xl text-xl text-center pb-4 font-bold text-primary">
                      {"Meet HEXstream"}
                  </h2>
                  <div className="max-w-2xl mx-auto pb-8 text-primary">
                      <h2 className="pb-4 text-sm sm:text-base text-center">
                          {`Here's an overview about us as an organization...learn how we are energizing peoples’ lives by helping 
              utilities achieve operational efficiency and zero-carbon footprints through data insights.`}
                      </h2>
                  </div>
                  <div className="relative">
                      <video
                          controls
                          className="w-full"
                          controlsList="nodownload"
                          playsInline
                      >
                          <source
                              src={"/assets/hexstream_overview.mp4"}
                              type="video/mp4"
                              className="object-cover"
                          />
                      </video>
                  </div>
              </div>
          </div>

          <Achievements/>


          {/* partners */}
          <Partners/>

          {/* Our cluture */}
          <div className="bg-primary text-white py-16">
              <div className=" max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 w-11/12 gap-12 place-items-center ">
                  <div className="h-full w-full">
                      <Image
                          src={teamImg}
                          alt="HEXstream Team Image"
                          // width={1200}
                          // height={800}
                          className="md:h-full w-full rounded-md object-cover"
                      />
                  </div>
                  <div className="space-y-3">
                      <h2 className="md:text-4xl text-2xl text-center md:text-left font-bold ">
                          Our Culture
                      </h2>
                      <p className="text-sm sm:text-base">
                          {`At HEXstream, we take pride in turning clients into friends and we
          work hard to develop long-term relationships that are built upon
          integrity, collaboration, and the delivery of value. Our team enjoys
          gathering at user conferences each year, where we host in-person
          meetings of the Utility Analytics User Group and have been known to
          throw great parties for old and new friends in the utility industry.`}
                      </p>
                      <p className="text-sm sm:text-base">
                          {`Our team works hard to provide exceptional service to all of our
          clients, and we are always looking for talented people who share our
          passion for hard work, high quality, and lasting relationships. If
          this sounds like a team you’d like to be part of, please see our
          Careers page.`}
                      </p>
                      <p className="text-sm sm:text-base">
                          {`HEXstream is headquartered in Chicago, with offices in Boston,
          Toronto, and Hyderabad, India. We pride ourselves on the quality of
          the work we deliver.`}
                      </p>
                  </div>
              </div>
          </div>
          <Cta name="Get in touch" title="Let's get your data streamlined today"/>
      </div>
  );
};

export default About;
