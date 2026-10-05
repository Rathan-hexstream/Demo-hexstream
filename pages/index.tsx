import Cta from "@/components/reusable/CTA";
import Events from "@/components/home/Events";
import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import Head from "next/head";
import dynamic from "next/dynamic";
import Insights from "../components/home/Insights";
import Statistics from "@/components/home/Statistics";
import Herosection from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import Capabilities from "@/components/home/Capabilities";

const Achievements = dynamic(() => import("@/components/about/Achievements"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));

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
      <main className="overflow-x-clip">
        <Herosection heroData={heroSection?.heroSection} />
        <ClientLogos />
        <Statistics />
        <Capabilities />
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
