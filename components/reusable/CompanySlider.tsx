import React from "react";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ICompany {
  companies: any;
}

const CompaniesSlider = ({ companies }: ICompany) => {
  const sliderSettings: Settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 6000,
    pauseOnHover: false,
    cssEase: "linear",
    draggable: true,
    rows: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full text-center mx-auto px-8">
      <Slider {...sliderSettings}>
        {companies.map((img: any, idx: any) => (
          <div key={idx} className="px-4">
            <div className="w-full">
              <Image width={120} height={120} src={img.img} alt={img.alt} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompaniesSlider;
