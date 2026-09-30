import React, { useEffect, useRef, useState } from "react";
import Cta from "@/components/reusable/CTA";
import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import I5 from "@/public/assets/Conference.jpg";
import NewPageheader from "@/components/reusable/NewPageheader";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { calculateReadingTime } from "@/components/reusable/readingTime";
import Image from "next/image";
import { paginate } from "@/components/reusable/throttled";

const Index = ({ Events, PastEvents }: any) => {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const pageSize = 6;

  const paginatedEvents = paginate(PastEvents, currentPage, pageSize);

  const handleNext = () => {
    setCurrentPage((prev: any) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage === 1) return null;
    setCurrentPage((prev: any) => prev - 1);
  };
  return (
    <>
      <Head>
        <title>{`Utilities Analytics User Group - HEXstream's Industry Conference.`}</title>
        <meta
          name="description"
          content="Join HEXstream's Utilities Analytics User Group conference, where we discuss trends and advancements in the utility industry."
        />
      </Head>
      <NewPageheader
        title="Utilities Analytics User Group"
        richText={Events.heroDescription?.raw?.children}
        img={Events?.heroImage?.url}
      />
      {Events.isEvent && (
        <div className="bg-primary text-white py-12 -z-0 relative overflow-hidden">
          <div className="absolute -top-96 -right-64 -z-10 hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800.942"
              height="700.325"
              viewBox="0 0 1280.942 1109.325"
              className="opacity-10"
            >
              <g
                id="Layer_1"
                data-name="Layer 1"
                transform="translate(46.188 40)"
              >
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

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-12 md:gap-0 w-11/12">
            <div className="flex justify-start items-center">
              <div className="">
                <div className=" py-2 bg-prime-light md:-ml-32 pl-16 md:pl-[7.5rem] pr-4 w-fit font-bold relative">
                  <div className="hidden md:block absolute top-0 left-0 xl:-left-20 sm:-left-6 md:-left-10">
                    {/* <div className="hidden md:block absolute lg:-top-5 lg:-left-20 md:-left-16 md:-top-16"> */}
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="180"
                      height="208.887"
                      viewBox="0 0 241.203 208.887"
                      className="h-[5.5rem]"
                    >
                      <path
                        id="Path_2"
                        data-name="Path 2"
                        d="M180.9,0H60.3L0,104.444,60.3,208.887H180.9l60.3-104.444Z"
                        fill="#eb2c2e"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-16 -left-20 md:hidden block">
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="120"
                      height="208.887"
                      viewBox="0 0 241.203 208.887"
                    >
                      <path
                        id="Path_2"
                        data-name="Path 2"
                        d="M180.9,0H60.3L0,104.444,60.3,208.887H180.9l60.3-104.444Z"
                        fill="#eb2c2e"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl ">
                    Join us for
                    <br /> our next meeting!
                  </h2>
                </div>

                <div className="py-6">
                  <h2 className="text-xl md:text-2xl font-extrabold">
                    Topic :
                  </h2>
                  <p className="py-2 text-sm md:text-base">
                    {Events.eventName}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold">Date :</h2>
                  <p className="py-2 text-sm md:text-base">
                    {Events.eventDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid place-items-center">
              <div>
                <p className="text-lg">{Events?.shortContent}</p>

                <div className="pt-6">
                  <Link
                    href={Events?.contactLink ?? ""}
                    className="bg-white text-primary px-4 py-1 text-lg hover:bg-transparent border border-white hover:border-white hover:text-white transition-colors duration-500"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {PastEvents.length > 0 ? (
        <div className="py-12">
          <div className="max-w-5xl mx-auto pb-8 w-11/12">
            <h2 className="text-xl md:text-3xl px-6 sm:px-0 text-primary font-bold">
              Past Events
            </h2>
          </div>
          <div className="flex flex-wrap gap-6 max-w-7xl mx-auto text-primary justify-center items-center w-11/12 ">
            {paginatedEvents.map((event: any) => (
              <Link href={`/uaug/${event?.slug}`} key={event?.slug}>
                <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300 min-h-[340px]">
                  <div className="">
                    <Image
                      src={event?.eventBanner?.url}
                      alt={event?.title}
                      width={1000}
                      height={800}
                      className="rounded aspect-[2/1]"
                    />
                    <div className="px-4 pt-2 flex justify-between flex-col gap-y-8">
                      <div>
                        <h2 className="text-lg font-bold pb-2">
                          {event.title}
                        </h2>
                        <h2 className="text-sm line-clamp-4">
                          {event.eventExcerpt}
                        </h2>
                      </div>

                      <h2 className="text-sm py-2 flex justify-between ">
                        <span>
                          {calculateReadingTime(event?.eventDetails?.text)}{" "}
                          Minute Read
                        </span>
                        <span className="hover:text-secondary">Read More</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-1 text-xs font-medium pt-8">
            <button
              onClick={() => {
                handlePrev();
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              disabled={currentPage === 1 ? true : false}
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="block h-8 w-12 rounded border bg-white text-center leading-8 text-base text-primary">
              {currentPage}/{Math.ceil(PastEvents.length / pageSize)}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              disabled={
                currentPage === Math.ceil(PastEvents.length / pageSize)
                  ? true
                  : false
              }
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
      <Cta title="Connect with us!" name="Get In Touch" />
    </>
  );
};

export default Index;

export async function getServerSideProps() {
  const { data: PastEnvent, error: pError } = await contentApi.query({
    query: gql`
      query MyQuery {
        uaugEvents {
          eventTitle
          slug
          eventLocation
          eventDate
          eventExcerpt
          eventBanner {
            url
          }
          eventDetails {
            raw
            text
          }
        }
      }
    `,
  });

  if (!PastEnvent.uaugEvents.length && pError) {
    return {
      notFound: true,
    };
  }

  const { data, error } = await contentApi.query({
    query: gql`
      query MyQuery {
        events {
          isEvent
          eventName
          eventDate
          eventLocation
          eventDetails
          contactLink
          heroImage {
            url
          }
          shortContent
          eventBanner {
            url
            mimeType
          }
          heroDescription {
            raw
            text
          }
        }
      }
    `,
  });

  if (!data.events.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { Events: data.events[0], PastEvents: PastEnvent.uaugEvents },
  };
}
