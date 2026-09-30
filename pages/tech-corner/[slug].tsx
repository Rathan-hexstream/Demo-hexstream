import Cta from "@/components/reusable/CTA";
import { calculateReadingTime } from "@/components/reusable/readingTime";
import { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Insights = ({ TechCornerDetails, relatedTech }: any) => {
  return (
    <>
      <Head>
        <title>{TechCornerDetails?.title}</title>
        <link rel="canonical" href={`https://hexstream.com/insights/`} />
        {/* OG Tags */}
        <meta property="og:title" content={TechCornerDetails?.title} />
        <meta
          property="og:url"
          content={`https://hexstream.com/insights/${TechCornerDetails?.slug}`}
        />
        <meta
          property="og:image"
          content={TechCornerDetails?.mainBanner?.url ?? ""}
        />
        <meta property="og:type" content="solutions" />
        <meta
          property="og:description"
          content={TechCornerDetails?.shortDescription}
        />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={TechCornerDetails?.title} />
        <meta
          property="twitter:description"
          content={TechCornerDetails?.shortDescription}
        />
        <meta
          property="twitter:url"
          content={`https://hexstream.com/insights/${TechCornerDetails?.slug}`}
        />
        <meta
          property="twitter:image"
          content={TechCornerDetails?.mainBanner?.url ?? ""}
        />
      </Head>
      <div className="relative hover:cursor-pointer bg-prime/50 overflow-hidden">
        <div className="absolute -top-96 -right-64 hidden md:block">
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
        <div className="bg-prime-light py-32 grid place-items-center ">
          <div className="max-w-5xl mx-auto w-11/12">
            <h2 className="lg:text-5xl md:tetx-4xl sm:text-4xl text-2xl font-bold text-white md:pb-4">
              {TechCornerDetails?.title && TechCornerDetails?.title}
            </h2>
            {/* <div className="pt-4 text-white text-sm sm:text-base">
              <p className="">Published by {TechCornerDetails?.author}</p>
              <span>
                {calculateReadingTime(TechCornerDetails?.blogDetails?.text)}{" "}
                Minutes Read
              </span>
            </div> */}
          </div>
        </div>

        <div className="">
          <div className="max-w-5xl mx-auto -mt-24 lg:-mt-28 w-11/12">
            <Image
              src={TechCornerDetails?.mainBanner?.url}
              alt={TechCornerDetails?.title + "image"}
              width={800}
              height={800}
              className="w-full rounded-md max-h-[480px] object-cover"
            />
          </div>
          <div className="pt-3">
            <div className="max-w-4xl mx-auto w-11/12 pb-12">
              <div className="text-lg first-letter:text-3xl md:first-letter:text-4xl leading-6 font-bold pt-3 md:pt-0">
                {TechCornerDetails?.shortDescription}
              </div>
              <div className="prose prose-teal leading-8  pt-8">
                <RichText
                  content={TechCornerDetails?.blogDetails?.raw?.children}
                />
              </div>
            </div>
          </div>
        </div>
        <Cta
          title="Let's get your data streamlined today!"
          name="Get In Touch"
        />
        {relatedTech && (
          <div className="md:py-16 py-10 bg-primary">
            <>
              <div className="flex justify-between text-white items-center max-w-3xl mx-auto space-x-2 md:space-x-8 pb-8 px-2">
                <hr className="border border-white w-full" />
                <h2 className="md:text-3xl text-xl font-bold whitespace-nowrap">
                  Other Blogs
                </h2>
                <hr className="border border-white w-full" />
              </div>
              <div className="flex flex-wrap gap-6 max-w-7xl mx-auto text-primary justify-center items-center w-11/12">
                {relatedTech &&
                  relatedTech.map((blog: any) => (
                    <Link href={`/tech-corner/${blog.slug}`} key={blog.slug}>
                      <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300">
                        <div>
                          <div className="mx-auto w-fit">
                            <Image
                              src={blog?.mainBanner?.url}
                              alt={blog?.title + "image"}
                              width={1000}
                              height={100}
                              className="rounded"
                            />
                          </div>
                          <div className="p-4">
                            <h2 className="text-lg font-bold pb-2">
                              {blog.title}
                            </h2>
                            <h2 className="text-sm line-clamp-4">
                              {blog.shortDescription}
                            </h2>

                            <h2 className="text-sm py-2 flex justify-between ">
                              <span>
                                {calculateReadingTime(blog?.blogDetails?.text)}{" "}
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

export default Insights;

export async function getServerSideProps({ params }: { params: any }) {
  const { data } = await contentApi.query({
    query: gql`
      query MyQuery {
        techCorners(where: { slug: "${params.slug}" }) {
          title
          slug
          shortDescription
          author
          blogDetails {
            text
            raw
          }
          mainBanner {
            url
          }
          
        }
      }
    `,
  });

  if (!data.techCorners.length) {
    return {
      notFound: true,
    };
  }

  const { data: relatedTechcorners, error: relatedError } =
    await contentApi.query({
      query: gql`
      query MyQuery {
        techCorners(first:3, where: { slug_not: "${params.slug}" }) {
          title
          slug
          mainBanner{
            url
          }
          shortDescription
          blogDetails{
            raw
            text
          }
        }
      }
    `,
    });
  if (!relatedTechcorners.techCorners.length && relatedError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      TechCornerDetails: data.techCorners[0],
      relatedTech: relatedTechcorners.techCorners,
    },
  };
}
