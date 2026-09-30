import React from "react";
import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
import I3 from "@/public/assets/historyBg.svg";
import I4 from "@/public/assets/bgPattern.svg";
import Cta from "@/components/reusable/CTA";
import Link from "next/link";
import NewCard from "@/components/reusable/NewCard";
import NewPageheader from "@/components/reusable/NewPageheader";
import Head from "next/head";

const SuccessStories = ({ SuccessStoriesDetails, relatedStoryData }: any) => {
  return (
    <>
      <Head>
        <title>{SuccessStoriesDetails.title}</title>
        <link rel="canonical" href={`https://hexstream.com/success-stories/`} />
        {/* OG Tags */}
        <meta property="og:title" content={SuccessStoriesDetails.title} />
        <meta
          property="og:url"
          content={`https://hexstream.com/success-stories/${SuccessStoriesDetails.slug}`}
        />
        <meta
          property="og:image"
          content={SuccessStoriesDetails.mainBanner.url ?? ""}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={SuccessStoriesDetails.brief.text}
        />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={SuccessStoriesDetails.title} />
        <meta
          property="twitter:description"
          content={SuccessStoriesDetails.brief.text}
        />
        <meta
          property="twitter:url"
          content={`https://hexstream.com/success-stories/${SuccessStoriesDetails.slug}`}
        />
        <meta
          property="twitter:image"
          content={SuccessStoriesDetails.mainBanner.url ?? ""}
        />
      </Head>
      <NewPageheader
        img={SuccessStoriesDetails.mainBanner.url}
        title={SuccessStoriesDetails.title}
        aboutClient={SuccessStoriesDetails?.aboutClient?.raw}
      />

      {SuccessStoriesDetails.brief && (
        <div className="grid md:grid-cols-12 grid-cols-1 bg-prime-light relative -z-0 min-h-[70vh] h-full place-items-center">
          <div className="md:col-span-2 col-span-1">
            <div className="absolute top-1/2 -left-32 transform  -translate-y-1/2 -z-10 md:grid place-items-center hidden ">
              <Image
                src={I3}
                alt=""
                className="brightness-50 md:brightness-100 opacity-50 lg:opacity-100"
              />
            </div>
          </div>
          <div className="md:col-span-10 col-span-1">
            <div className="max-w-5xl mx-auto py-10 lg:py-20 text-white px-4 md:px-0">
              <h2 className="md:text-4xl text-2xl pb-4 font-bold tex">
                The Brief
              </h2>
              <div className="prose prose-teal leading-5 !text-white ">
                <RichText content={SuccessStoriesDetails.brief.raw.children} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* approach */}
      {SuccessStoriesDetails.approach && (
        <div className="relative -z-0 overflow-hidden">
          <div className="md:w-10/12 mx-auto pt-12 md:py-12 text-primary md:pr-24 w-11/12">
            <h2 className="md:text-4xl text-2xl pb-4 font-bold tex">
              The Approach
            </h2>
            <div className="prose prose-teal leading-5 !text-primary ">
              <RichText content={SuccessStoriesDetails.approach.raw.children} />
            </div>
          </div>
          <div className="absolute top-10 -right-72 -z-10">
            <Image src={I4} alt="" className="" />
          </div>
        </div>
      )}

      {/* Outcome */}
      {SuccessStoriesDetails?.outcome && (
        <div className="grid md:grid-cols-12 grid-cols-1 bg-prime text-primary relative -z-0">
          <div className="md:col-span-2 col-span-1">
            <div className="absolute top-1/2 -left-32 transform  -translate-y-1/2 -z-10 md:grid place-items-center hidden ">
              <Image
                src={I3}
                alt=""
                className="brightness-50 md:brightness-100"
              />
            </div>
          </div>
          <div className="md:col-span-10 col-span-1">
            <div className="max-w-5xl mx-auto py-6 md:py-20  w-11/12">
              <h2 className="md:text-4xl text-2xl pb-4 font-bold tex">
                The Outcome
              </h2>
              <div className="prose prose-teal leading-5 !text-primary ">
                <RichText
                  content={SuccessStoriesDetails?.outcome?.raw?.children}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Cta title="Let's get your data streamlined today!" name="Get in Touch" />
      <div className="pt-10 pb-14 bg-primary text-white">
        <div className="flex justify-between items-center max-w-3xl mx-auto space-x-4 md:space-x-8 pb-8 px-2">
          <hr className="border border-white w-full" />
          <h2 className="text-xl md:text-3xl font-bold whitespace-nowrap">
            Related Story
          </h2>
          <hr className="border border-white w-full" />
        </div>
        <div className="flex flex-wrap gap-12 max-w-7xl mx-auto text-primary justify-center items-center w-11/12">
          {relatedStoryData &&
            relatedStoryData.successStories.map((story: any) => (
              <Link href={`/success-stories/${story.slug}`} key={story.slug}>
                <NewCard
                  title={story.title}
                  alt={story.title + "Image"}
                  img={story.mainBanner.url}
                  briefText={story.brief.text}
                  approachText={story.approach.text}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default SuccessStories;

export async function getServerSideProps({ params }: { params: any }) {
  const { data } = await contentApi.query({
    query: gql`
      query MyQuery {
        successStories(where: { slug: "${params.slug}" }) {
          title
          slug
          brief {
            raw
            text
          }
          approach {
            raw
            text
          }
          aboutClient{
            text
            raw
          }
          mainBanner {
            url
          }
         outcome{
            text
            raw
          }
        }
      }
    `,
  });

  const { data: relatedStory, error: relatedError } = await contentApi.query({
    query: gql`
      query MyQuery {
        successStories(first: 3, where: { slug_not: "${params.slug}" }) {
          title
          slug
          brief {
            raw
            text
          }
          approach {
            raw
            text
          }
          aboutClient {
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
  if (!relatedStory.successStories.length && relatedError) {
    return {
      notFound: true,
    };
  }

  if (!data.successStories.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      SuccessStoriesDetails: data.successStories[0],
      relatedStoryData: relatedStory,
    },
  };
}
