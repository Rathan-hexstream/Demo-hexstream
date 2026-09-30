import React, { useEffect, useState } from "react";
import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import NewPageheader from "@/components/reusable/NewPageheader";
import I5 from "@/public/assets/Oracle.jpg";
import Head from "next/head";
import Loader from "@/components/reusable/Loader";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { useIntersectionObserver } from "@/components/about/useIntersectionObserver";
import Cta from "@/components/reusable/CTA";
import TableOfContents from "@/components/about/TableOfContent";

const Index = ({ services }: any) => {
  // const [active, setActive] = useState(true);
  // const [activeId, setActiveId] = useState<number>();

  return (
    <div className="">
      <Head>
        <title>{`HEXstream Oracle Services - Utility Analytics Solutions`}</title>
        <meta
          name="description"
          content="At HEXstream, we provide comprehensive Oracle services tailored for the utility industry, enabling advanced analytics and data management."
        />
      </Head>

      <NewPageheader
        title="Embrace the Power of Oracle Utility Solutions"
        description="Oracle Utility Solutions are the leading edge of sustainable, affordable energy and water management. They provide a comprehensive suite of tools designed to deliver exceptional customer experiences, enhance energy efficiency, and facilitate meticulous network and asset management. These powerful tools empower utilities companies to deliver vital services to their communities every single day.
        With Oracle Utility Solutions, you can forge deeper customer connections, turn meter data into actionable insights, build customer loyalty and revenue with each interaction, and achieve efficiency and decarbonization goals. If your vision is to transform your utilities business for a sustainable future, Oracle Utility Solutions are an exceptional choice."
        img={I5}
      />

      <div className="py-12">
        <div className="max-w-4xl mx-auto w-10/12 text-primary relative">
          <div className="absolute -top-96 -right-64 -z-10 hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800.942"
              height="700.325"
              viewBox="0 0 1280.942 1109.325"
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
          <h2 className="text-center text-2xl md:text-3xl pb-6 max-w-lg mx-auto font-bold">
            {`Partner with HEXstream for Oracle Utility Solutions`}
          </h2>
          <ul className="space-y-3 list-none text-lg">
            <li>
              {`Selecting the right partner to implement Oracle Utility Solutions
              is crucial. HEXstream stands apart in this arena with our vast
              clientele and our status as a certified Oracle Partner. We've
              earned our stripes in the industry by consistently delivering
              value to our clients. Our extensive experience, combined with our deep understanding of
              the utilities sector, allows us to implement Oracle solutions
              seamlessly, ensuring that your business derives the maximum
              benefit. We ensure that every aspect of your utilities management,
              from asset preservation and cost reduction to capital planning and
              project management, is optimized.`}
            </li>

            <li>
              {`The trust we have earned from our clients comes not just from our
              expertise, but also from our approach. We view our clients as
              partners, and every project we undertake is a collaborative effort
              towards achieving your business goals.`}
            </li>
            <li>
              {` By choosing HEXstream, you're not just opting for an Oracle
              Utility Solutions provider. You're selecting a partner who will
              stand by you, offer tailored services, and ensure that you're at
              the forefront of the utilities sector.`}
            </li>
          </ul>
        </div>
      </div>
      <div className="py-10 md:py-16 bg-primary/90 flex justify-center items-center gap-8 text-white relative">
        <div className="flex gap-10 relative max-w-7xl mx-auto w-11/12">
          <div className="hidden md:block w-1/5 sticky top-32 self-start z-10">
            <TableOfContents />
          </div>
          <div className="w-full lg:w-4/5 flex flex-col gap-4 h-full relative partitionline divide-y-2 divide-gray-200/20">
            {services.map((service: any, idx: number) => (
              <div key={idx} className="py-2 text-xl scroll-mt-28">
                <div>
                  <h3
                    id={`${idx}`}
                    className="heading text-2xl scroll-mt-32 font-bold"
                    style={{ paddingBottom: "16px" }}
                  >
                    {service.title}
                  </h3>
                  <div className="prose prose-teal leading-5 !text-white space-y-6 md:text-lg">
                    <RichText content={service.content.raw.children} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Cta name="Contact Us" title="Let's get your data streamlined today!" />
    </div>
  );
};

export default Index;

export async function getServerSideProps() {
  const { data, error } = await contentApi.query({
    query: gql`
      query MyQuery {
        services {
          title
          image {
            url
          }
          content {
            raw
          }
        }
      }
    `,
  });

  if (!data.services.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { services: data.services },
  };
}
