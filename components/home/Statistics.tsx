import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import React, {useState} from "react";
import Logo from "@/public/clients/Honolulu_logo.png"

const Statistics = () => {
  const responsiveSettings = [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        pauseOnHover: true,
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
          pauseOnHover: true,
      }
    },
    {
      breakpoint: 375,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
          pauseOnHover: true,
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
          pauseOnHover: true,
      }
    },
  ];
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto pb-14 pt-2 md:py-4 w-11/12 mt-2.5">
        <h2 className="text-xl md:text-3xl font-bold pb-4 text-primary">
          {/* Impacting millions of lives */}
          HEXstream—the leader in data integration and analytics for the utility industry
        </h2>
        <Slide
            indicators={false}
            arrows={false}
            duration={100}
            autoplay={true}
            transitionDuration={16000}
            responsive={responsiveSettings}
            pauseOnHover={true}
        >
          {/* Priority order: Georgia Power, Con Edison, Dominion Energy, MidAmerican Energy — everything after is unordered */}
          <div><img src={'https://media.graphassets.com/aBiN5NtmQbW3juNV33gw'} alt="Georgia Power"
                    style={{height: 40, marginTop: 20, paddingRight: 20}}/></div>
          <div><img src={'https://media.graphassets.com/2ZSPztxvQvCtj8BQ7mJt'} alt="Con Edison"
                    style={{height: 30, marginTop: 20, paddingRight: 30,}}/></div>
          <div><img src={'https://media.graphassets.com/r7IJJu8jSE2Haf3ahxa6'} alt="Dominion Energy"
                    style={{height: 40, marginTop: 20, paddingRight: 30,}}/></div>
          <div><img src={'/clients/MidAmerican_Energy_Company-logo_subhead.svg'} alt="MidAmerican Energy Company"
                    style={{height: 50, marginTop: 13, paddingRight: 30,}}/></div>

          <div><img src={'https://media.graphassets.com/UYDeVqMiROOCmHpGPmrg'} alt="NiSource" style={{height: 80}}/></div>
          <div><img src={'https://media.graphassets.com/AzQ3AMFRhubZdDy5CClG'} alt="Toronto Hydro" style={{height: 80}}/></div>
          <div><img src={'https://media.graphassets.com/9cpi5VL4TKaNFg29w5R2'} alt="Clark County Water Reclamation District" style={{height: 80}}/></div>
          <div><img src={'https://media.graphassets.com/VpiWMzIBTe2aQR1KZVqG'} alt="SDG&E" style={{height: 40, marginTop: 20}}/>
          </div>

            <div>
                <img
                    src= {Logo.src}
                    style={{ height: 50, paddingRight: 40, marginTop: 13 }}
                    alt="Honolulu Logo"
                />
            </div>


          <div><img src={'https://media.graphassets.com/EBQmnXSR1O5oH4m3iom8'} alt="Eversource" style={{height: 40, marginTop: 20,}}/>
          </div>
          <div><img src={'https://media.graphassets.com/nHSW11XWTLSdlWQc2t6q'} alt="Seattle City Light"
                    style={{height: 40, marginTop: 20, paddingRight: 30,}}/></div>
          <div><img src={'https://media.graphassets.com/YvnHNsrOS7m5KYYKiwyx'} alt="ATCO" style={{height: 60, paddingRight: 10, marginTop: 5}}/>
          </div>
          <div><img src={'https://media.graphassets.com/8Il4AfNS7i9bWNJj6ugV'} alt="Modesto Irrigation District"
                    style={{height: 50, paddingRight: 30, marginTop: 10}}/></div>
          <div><img src={'https://media.graphassets.com/cLgr9snSHaqxsv21nAQ3'} alt="Knoxville Utilities Board"
                    style={{height: 50, marginTop: 13, paddingRight: 40,}}/></div>
          <div><img src={'https://media.graphassets.com/4DpchlRBShC6NRO5XZIr'} alt="Seminole Electric Cooperative"
                    style={{height: 50, marginTop: 13, marginLeft: -20}}/></div>
          <div><img src={'https://media.graphassets.com/lep8nFCqT5mNEUxmvxua'} alt="Austin Energy" style={{height: 80}}/></div>
         {/* <div><img src={'https://media.graphassets.com/NMFTmyHQDAvicaEaywAy'} alt="Miami-Dade County" style={{height: 60}}/></div>*/}
          <div><img src={'https://media.graphassets.com/TlT9G8WnToOOJcrJMTBO'} alt="Duke Energy"
                    style={{height: 50, paddingRight: 40, marginTop: 13,}}/></div>


        </Slide>
      </div>
      <div className="absolute -top-96 -right-64 -z-10 hidden md:block">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800.942"
            height="700.325"
            viewBox="0 0 1280.942 1109.325"
        >
          <g id="Layer_1" data-name="Layer 1" transform="translate(46.188 40)">
            <path
                id="Path_2"
                data-name="Path 2"
                d="M891.426,0H297.14L0,514.663l297.14,514.663H891.426l297.14-514.663Z"
                fill="none"
                stroke="#f4f4f9"
                strokeWidth="80"
            />
          </g>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto pb-8 pt-4 md:py-8 w-11/12">
        <div className=" grid md:grid-cols-2 grid-cols-1 text-primary place-items-center">
          <div>
            <h2 className="text-xl md:text-3xl font-bold pb-4 text-primary">
              {/* Impacting millions of lives */}
              The numbers tell the story
            </h2>
            <h2 className="">
              {`Since 2017 HEXstream has been energizing peoples’ lives by helping utilities achieve operational efficiency and decarbonization efforts through data insights.`}
            </h2>
          </div>
          <div className="grid place-items-center text-center w-full">
            <div>
              <h2 className="md:text-5xl text-3xl py-3 font-bold pt-7 md:pt-0">
                $500M+
              </h2>
              <p className="lg:text-sm text-xs font-bold pt-0 md:pt-2 text-primary/80">
                saved in energy costs for utility customers
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 text-primary pt-4 md:pt-12 font-bold text-center place-items-center">
          <div>
            <h2 className="text-2xl md:text-4xl text-center">125+</h2>
            <p className="lg:text-sm text-xs pt-2 text-center text-primary/80">
              projects successfully completed
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl text-center mt-4 md:mt-0">
              52M+
            </h2>
            <p className="lg:text-sm text-xs pt-2 text-center text-primary/80">
              customers who rely on the utilities solutions
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl text-center mt-4 md:mt-0">
              8/10
            </h2>
            <p className="lg:text-sm text-xs pt-2 text-center text-primary/80">
              largest North American utility companies rely on HEXstream
              analytics
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistics;
