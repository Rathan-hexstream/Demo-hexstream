import { calculateReadingTime } from "@/components/reusable/readingTime";
import { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Cta from "@/components/reusable/CTA";

const Whitepaper = ({ data, relatedWhitePapers }: any) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <link rel="canonical" href={`https://hexstream.com/whitepapers/`} />
        {/* OG Tags */}
        <meta property="og:title" content={data.title} />
        <meta
          property="og:url"
          content={`https://hexstream.com/whitepapers/${data.slug}`}
        />
        <meta property="og:image" content={data.mainImage.url ?? ""} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={data.shortDescription} />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={data.title} />
        <meta property="twitter:description" content={data.shortDescription} />
        <meta
          property="twitter:url"
          content={`https://hexstream.com/whitepapers/${data.slug}`}
        />
        <meta property="twitter:image" content={data.mainImage.url ?? ""} />
      </Head>

      <div className="relative bg-prime">
        <div className="bg-prime-light py-32 grid place-items-center ">
          <div className="max-w-5xl mx-auto w-11/12">
            <h2 className="lg:text-5xl md:tetx-4xl sm:text-4xl text-2xl font-bold text-white">
              {data.title}
            </h2>
            {/* <div className="pt-4 text-white text-sm sm:text-base">
              <p className="">Published by {data.author}</p>
              <span>
                {calculateReadingTime(data?.details?.text)} Minutes Read
              </span>
            </div> */}
          </div>
        </div>

        <div className="">
          <div className="max-w-5xl mx-auto -mt-24 lg:-mt-28 w-11/12">
            <Image
              src={data?.mainImage?.url}
              alt={data.title}
              width={800}
              height={800}
              className="w-full rounded-md max-h-[480px] object-cover"
            />
          </div>
          <div className="pt-3 pb-12">
            <div className="max-w-4xl mx-auto w-11/12 ">
              <div className="text-lg first-letter:text-3xl md:first-letter:text-4xl leading-6 font-bold pt-3 md:pt-0">
                {data.shortDescription}
              </div>
              <div className="prose prose-teal leading-8  pt-8">
                <RichText content={data.details?.raw?.children} />
              </div>
            </div>
            <div className="absolute bg-gradient-to-b from-prime/70 via-prime/90 to-prime h-24 w-full text-center -mt-24" />
            <p className="text-center pt-8">
              Want to read the entire whitepaper?{" "}
              <br className="block sm:hidden " />
              <Link
                className="text-blue-700 text-sm"
                href={data?.hubSpotLink ?? "/"}
              >
                Click here
              </Link>
            </p>
          </div>
        </div>
        <Cta
          title="Let's get your data streamlined today!"
          name="Get In Touch"
        />
        {relatedWhitePapers.length > 0 && (
          <div className="md:py-16 py-10 bg-primary">
            <>
              <div className="flex justify-between text-white items-center max-w-3xl mx-auto space-x-2 md:space-x-8 pb-8 px-2">
                <hr className="border border-white w-full" />
                <h2 className="md:text-3xl text-xl font-bold whitespace-nowrap">
                  Other Whitepapers
                </h2>
                <hr className="border border-white w-full" />
              </div>
              <div className="flex flex-wrap gap-6 max-w-7xl mx-auto text-primary justify-center items-center w-11/12">
                {relatedWhitePapers &&
                  relatedWhitePapers.map((paper: any) => (
                    <Link href={`/whitepapers/${paper.slug}`} key={paper.slug}>
                      <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300">
                        <div>
                          <div className="mx-auto w-fit">
                            <Image
                              src={paper?.mainImage?.url}
                              alt={paper?.title}
                              width={1000}
                              height={800}
                              className="rounded aspect-[2/1]"
                            />
                          </div>
                          <div className="p-4">
                            <h2 className="text-lg font-bold pb-2">
                              {paper.title}
                            </h2>
                            <h2 className="text-sm">
                              {paper.shortDescription.slice(0, 116)}...
                            </h2>

                            <h2 className="text-sm py-2 flex justify-between ">
                              <span>
                                {calculateReadingTime(paper?.details?.text)}{" "}
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

export default Whitepaper;

export async function getServerSideProps({ params }: { params: any }) {
  const { data } = await contentApi.query({
    query: gql`
      query MyQuery {
        whitepapers(where: { slug: "${params.slug}" }) {
          title
          slug
          shortDescription
          author
          hubSpotLink
          mainImage {
            url
          }
          details {
            raw
            text
          }
           fullPdf {
            url
          }
        }
      }
    `,
  });

  if (!data.whitepapers.length) {
    return {
      notFound: true,
    };
  }

  const { data: relatedWhitePaper, error: relatedError } =
    await contentApi.query({
      query: gql`
      query MyQuery {
        whitepapers(first: 3, where: { slug_not: "${params.slug}" }) {
          title
          slug
          shortDescription
          author
          mainImage {
            url
          }
          details {
            raw
            text
          }
        }
      }
    `,
    });
  if (!relatedWhitePaper.whitepapers.length && relatedError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.whitepapers[0],
      relatedWhitePapers: relatedWhitePaper.whitepapers,
    },
  };
}
