import client from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cta from "@/components/reusable/CTA";
import NewPageheader from "@/components/reusable/NewPageheader";
import I5 from "@/public/assets/China-Europes-biggest-onshore-wind-park-Ukraine-.jpg";
import Head from "next/head";

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMoreJobs = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(false);
    const getJobList = async () => {
      const { data, error } = await client.query({
        query: gql`
          query MyQuery {
            jobListingsConnection {
              edges {
                node {
                  jobTitle
                  slug
                  location
                  workExperience
                }
              }
            }
          }
        `,
      });
      if (!error) {
        setJobs(data?.jobListingsConnection?.edges);
        setLoading(true);
      }
    };
    getJobList();
  }, []);
  return (
    <>
      <Head>
        <title>{`Join HEXstream - Careers in Utility Data Analytics.`}</title>
        <meta
          name="description"
          content="Start your career in utility data analytics with HEXstream. Explore our job listings and join our team of experts."
        />
      </Head>
      <NewPageheader
        title="Careers"
        description="We are the global leader for data integration and analytics for the utility industry, delivering cutting-edge solutions and loss-detection strategies across on-premises and cloud. HEXstream is certified a Minority Business Enterprise."
        img={I5}
      />
      <div className="bg-primary/90 h-full grid place-items-center py-12">
        <h3 className="text-xl md:text-3xl text-white font-bold mx-auto text-center w-full pb-12">
          Our current openings
        </h3>

        {loading ? (
          <div
            className={`grid md:grid-cols-2 grid-cols-1 gap-8 max-w-5xl mx-auto w-11/12 text-primary pb-12`}
          >
            {jobs &&
              jobs.map((job: any) => (
                <Link href={`/careers/${job.node.slug}`} key={job.slug}>
                  <div
                    className="bg-white/80 text-black p-6 rounded-3xl cursor-pointer w-full hover:bg-secondary/80 hover:text-white transition-colors duration-700 "
                    key={job.node.jobTitle}
                  >
                    <h4 className="font-bold text-xl md:text-2xl">
                      {job.node.jobTitle}
                    </h4>

                    <div className="flex justify-end gap-2 text-right mt-2">
                      <span>Know More</span>
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
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div className="h-full grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#fff"
                stroke-width="3"
                r="10"
                stroke-dasharray="47.12388980384689 17.707963267948966"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
            </svg>
          </div>
        )}
      </div>
      <Cta title={"Connect with us!"} name={"Get In Touch"} />
    </>
  );
};

export default Index;
