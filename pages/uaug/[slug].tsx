import {
  calculateReadingTime,
  getRandomItems,
} from "@/components/reusable/readingTime";
import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const Uaug = ({ data, relatedEvents }: any) => {
  const router = useRouter();
  if (!data) return null;
  const randomEvents = getRandomItems(relatedEvents, 3);

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <link rel="canonical" href={`https://hexstream.com/uaug/`} />
        {/* OG Tags */}
        <meta property="og:title" content={data.title} />
        <meta
          property="og:url"
          content={`https://hexstream.com/uaug/${data.slug}`}
        />
        <meta property="og:image" content={data.eventBanner.url ?? ""} />
        <meta property="og:type" content="solutions" />
        <meta property="og:description" content={data.eventExcerpt} />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={data.title} />
        <meta property="twitter:description" content={data.eventExcerpt} />
        <meta
          property="twitter:url"
          content={`https://hexstream.com/uaug/${data.slug}`}
        />
        <meta property="twitter:image" content={data.eventBanner.url ?? ""} />
      </Head>
      <div className="relative hover:cursor-pointer bg-prime/50">
        <div className="bg-prime-light py-32 grid place-items-center ">
          <div className="max-w-5xl mx-auto w-11/12">
            <p className="text-white pb-2">Event Date : {data.eventDate}</p>
            <h2 className="lg:text-6xl md:tetx-4xl sm:text-4xl text-2xl font-bold text-white">
              {data.eventTitle}
            </h2>
          </div>
        </div>

        <div className="">
          <div className="max-w-5xl mx-auto lg:p-6 -mt-24 lg:-mt-36 w-11/12">
            <Image
              src={data?.eventBanner?.url}
              alt={data.eventTitle + "image"}
              width={1200}
              height={800}
              className="w-full rounded-md"
            />
          </div>
          <div className="">
            <div className="max-w-4xl mx-auto w-11/12 pb-12">
              <div className="text-lg first-letter:text-3xl md:first-letter:text-4xl leading-6 font-bold pt-3 md:pt-0">
                {data.shortDescription}
              </div>
              <div className="prose prose-teal leading-8  pt-8">
                <RichText content={data.eventDetails?.raw?.children} />
              </div>
            </div>
          </div>
        </div>
        {relatedEvents.length > 0 && (
          <div className="md:py-16 py-10 bg-primary">
            <>
              <div className="flex justify-between text-white items-center max-w-3xl mx-auto space-x-2 md:space-x-8 pb-8 px-2">
                <hr className="border border-white w-full" />
                <h2 className="md:text-3xl text-xl font-bold whitespace-nowrap">
                  Other Events
                </h2>
                <hr className="border border-white w-full" />
              </div>
              <div className="flex flex-wrap gap-6 max-w-7xl mx-auto text-primary justify-center items-center w-11/12">
                {relatedEvents &&
                  relatedEvents.map((event: any) => (
                    <Link href={`/uaug/${event.slug}`} key={event.slug}>
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
                              <h2 className="text-sm">
                                {event.eventExcerpt.slice(0, 150)}
                              </h2>
                            </div>

                            <h2 className="text-sm py-2 flex justify-between ">
                              <span>
                                {calculateReadingTime(
                                  event?.eventDetails?.text
                                )}{" "}
                                Minute Read
                              </span>
                              <span className="hover:text-secondary">
                                Read More
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default Uaug;

export async function getServerSideProps({ params }: { params: any }) {
  const { data } = await contentApi.query({
    query: gql`
      query MyQuery {
        uaugEvents(where: { slug: "${params.slug}" }) {
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

  if (!data.uaugEvents.length) {
    return {
      notFound: true,
    };
  }

  const { data: relatedEvent, error: relatedError } = await contentApi.query({
    query: gql`
      query MyQuery {
        uaugEvents( first:3,where: { slug_not: "${params.slug}" }) {
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
  if (!relatedEvent.uaugEvents.length && relatedError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.uaugEvents[0],
      relatedEvents: relatedEvent.uaugEvents,
    },
  };
}
