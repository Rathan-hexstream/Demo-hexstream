import Cta from "@/components/reusable/CTA";
import Events from "@/components/home/Events";
import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import Head from "next/head";
import dynamic from "next/dynamic";
import Insights from "../components/home/Insights";
import Statistics from "@/components/home/Statistics";

const Achievements = dynamic(() => import("@/components/about/Achievements"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const Herosection = dynamic(() => import("../components/home/Hero"));

export default function Home({ data, heroSection, testimonials }: any) {
  return (
    <>
      <Head>
        <title>{"HEXstream–The global leader in data integration and analytics for the utility industry."}</title>
        {/* OG Tags */}
        <meta
          property="og:title"
          content={"HEXstream–The global leader in data integration and analytics for the utility industry."}
        />
        <meta property="og:url" content={`https://hexstream.com/`} />
        {/* <meta
          property="og:image"
          content=""
        /> */}
        <meta
          property="og:type"
          content="At HEXstream, we offer innovative utility data analytics solutions. Navigate the digital transformation in the utility industry with us."
        />
        <meta
          property="og:description"
          content={
            "At HEXstream, we offer innovative utility data analytics solutions. Navigate the digital transformation in the utility industry with us."
          }
        />
        {/* <meta name="twitter:card" content="summary" /> */}
        {/* <meta
          property="twitter:title"
          content={""}
        /> */}
        <meta
          property="twitter:description"
          content={
            "At HEXstream, we offer innovative utility data analytics solutions. Navigate the digital transformation in the utility industry with us."
          }
        />
        <meta property="twitter:url" content={`https://hexstream.com/`} />
        {/* <meta
          property="twitter:image"
          content=""
        /> */}
      </Head>
      <main className="overflow-x-hidden">
        <Herosection heroData={heroSection?.heroSection} />
        <Statistics />
        {/*<div className={"bg-prime/60 " + data.isEvent ? "mb-8" : ""}>*/}
        {/*  <div className="max-w-5xl mx-auto w-11/12 py-8 md:py-12">*/}
        {/*    <h2 className="md:text-3xl text-xl text-center pb-4 font-bold text-primary">*/}
        {/*      {"Utility360"}*/}
        {/*    </h2>*/}
        {/*    <div className="max-w-2xl mx-auto pb-8 text-primary">*/}
        {/*      <h2 className="pb-4 text-sm sm:text-base text-center">*/}
        {/*        {`The Utility360 suite of real-time analytics puts critical data at decision-makers’ fingertips. It is tailored to utility-specific needs and creates an integrated, unique "one data" view across all critical operational systems.`}*/}
        {/*      </h2>*/}
        {/*    </div>*/}
        {/*    <div className="relative">*/}
        {/*      <video*/}
        {/*        controls*/}
        {/*        className="w-full"*/}
        {/*        controlsList="nodownload"*/}
        {/*        playsInline*/}
        {/*        autoPlay={true} muted={true}*/}
        {/*      >*/}
        {/*        <source*/}
        {/*          src={"https://media.graphassets.com/wjSzY48pTm2k94ET26Om"}*/}
        {/*          type="video/mp4"*/}
        {/*          className="object-cover"*/}
        {/*        />*/}
        {/*      </video>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {data && data[0]?.isEvent ? <Events data={data} /> : null}

        <Insights />

        <Testimonials testimonials={testimonials} />
        <Achievements />
        <Cta
          title="Let's get your data streamlined today!"
          name="Get In Touch"
        />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // for events
  const { data, error } = await contentApi.query({
    query: gql`
      query MyQuery {
        events {
          isEvent
          eventName
          eventDate
          eventLocation
          eventDetails
          eventBanner {
            url
            mimeType
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
  // for hero section
  const { data: hero, error: heroError } = await contentApi.query({
    query: gql`
      query MyQuery {
        herosections {
          heroSection {
            title
            banner {
              url
            }
            heroLink
          }
        }
      }
    `,
  });

  if (!hero.herosections.length) {
    return {
      notFound: true,
    };
  }
  // for Tesimonials
  const { data: testimonialsData, error: testError } = await contentApi.query({
    query: gql`
      query MyQuery {
        testimonials {
          name
          review
          designation
          company
        }
      }
    `,
  });

  if (!testimonialsData.testimonials.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.events,
      heroSection: hero.herosections[0],
      testimonials: testimonialsData.testimonials,
    },
  };
}
