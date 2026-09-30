import Cta from "@/components/reusable/CTA";
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
import React, { useEffect, useRef, useState } from "react";

const Insights = ({ data, relatedBlogs }: any) => {
  const randomBlogs = getRandomItems(relatedBlogs, 3);
  // update visited user count by fetching api - "/api/incViews" in app folder of pages
  useEffect(() => {
    try {
      fetch("/api/incViews", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: data.id,
          title: data.title,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <link rel="canonical" href={`https://hexstream.com/blog/`} />
        {/* OG Tags */}
        <meta property="og:title" content={data?.title} />
        <meta
          property="og:url"
          content={`https://hexstream.com/blog/${data?.slug}`}
        />
        <meta property="og:image" content={data?.mainBanner?.url ?? ""} />
        <meta property="og:type" content="solutions" />
        <meta property="og:description" content={data?.shortDescription} />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={data?.title} />
        <meta property="twitter:description" content={data?.shortDescription} />
        <meta
          property="twitter:url"
          content={`https://hexstream.com/blog/${data?.slug}`}
        />
        <meta property="twitter:image" content={data?.mainBanner?.url ?? ""} />
      </Head>
      <div className="relative bg-prime/50 overflow-hidden">
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
          <div className="max-w-5xl mx-auto w-11/12 pt-4">
            <h2 className="lg:text-5xl md:tetx-4xl sm:text-4xl text-2xl font-bold text-white">
              {data?.title}
            </h2>
            {/* <div className="pt-4 text-white text-sm sm:text-base">
              <p className="">Published by {data?.author}</p>
              <span>
                {calculateReadingTime(data?.blogDetails?.text)} Minutes Read
              </span>
            </div> */}
          </div>
        </div>

        <div className="">
          <div className="max-w-5xl mx-auto  -mt-16 lg:-mt-20 w-11/12">
            <Image
              src={data?.mainBanner?.url}
              alt={data.title}
              width={800}
              height={500}
              className="rounded-md mx-auto"
            />
          </div>
          <div className="pt-4">
            <div className="max-w-4xl mx-auto w-11/12 pb-12">
              <div className="text-lg first-letter:text-3xl md:first-letter:text-4xl leading-6 font-bold pt-3 md:pt-0">
                {data?.shortDescription}
              </div>
              <div className="prose prose-teal leading-8 pt-8">
                <RichText content={data?.blogDetails?.raw?.children} />
              </div>
            </div>
          </div>
        </div>
        <Cta
          title="Let's get your data streamlined today!"
          name="Get In Touch"
        />
        {relatedBlogs.length > 0 && (
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
                {randomBlogs &&
                  randomBlogs.map((blog: any) => (
                    <Link href={`/blogs/${blog?.slug}`} key={blog?.slug}>
                      <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300 min-h-[400px]">
                        <div className="">
                          <div className="mx-auto w-fit">
                            <Image
                              src={blog?.mainBanner?.url}
                              alt={blog?.title}
                              width={1000}
                              height={800}
                              className="rounded aspect-[2/1]"
                            />
                          </div>
                          <div className="px-4 pt-2 flex justify-between flex-col gap-y-8">
                            <div>
                              <h2 className="text-lg font-bold pb-2">
                                {blog?.title}
                              </h2>
                              <p className="text-sm">
                                {blog?.shortDescription.slice(0, 150)}
                              </p>
                            </div>

                            <div className="text-sm py-2 flex justify-between ">
                              <span>
                                {calculateReadingTime(blog?.blogDetails?.text)}{" "}
                                Minute Read
                              </span>
                              <span className="hover:text-secondary">
                                Read More
                              </span>
                            </div>
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
        blogs(where: { slug: "${params?.slug}" }) {
          id
          title
          slug
          shortDescription
          author
          blogDetails {
            text
            raw
          }
          tags {
            tag
          }
          mainBanner {
            url
          }
          
        }
      }
    `,
  });

  if (!data.blogs.length) {
    return {
      notFound: true,
    };
  }

  const { data: relatedBlog, error: relatedError } = await contentApi.query({
    query: gql`
      query MyQuery {
        blogs( where: { slug_not: "${params?.slug}" }) {
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
  if (!relatedBlog.blogs.length && relatedError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.blogs[0],
      relatedBlogs: relatedBlog.blogs,
    },
  };
}
