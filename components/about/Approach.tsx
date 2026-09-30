import React from "react";

const Approach = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 -left-60 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="626.197"
          height="542.301"
          viewBox="0 0 626.197 542.301"
        >
          <g id="Layer_1" data-name="Layer 1" transform="translate(5.773 5)">
            <path
              id="Path_2"
              data-name="Path 2"
              d="M460.988,0H153.662L0,266.15,153.662,532.3H460.988L614.65,266.15Z"
              fill="none"
              stroke="#f4f4f9"
              strokeWidth="10"
            />
          </g>
        </svg>
      </div>
      <div className="text-center text-primary max-w-4xl mx-auto py-8 md:py-16 w-11/12">
        <h2 className="md:text-3xl text-xl text-center pb-4 font-bold ">
          Our Approach
        </h2>

        <p className="text-sm sm:text-base">
          {` At HEXstream, we bring together years of experience partnering with
          global utility giants and a deep understanding of the data and
          technology sphere. This unique blend results in unprecedented
          insights, delivered swiftly and cost-effectively, that revolutionize
          utility operations like never before. Our exceptional team is our
          strength; we don't just acquire new clients, we foster friendships.`}
        </p>
      </div>
    </div>
  );
};

export default Approach;
