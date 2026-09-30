import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { calculateReadingTime } from "@/components/reusable/readingTime";
import NewPageheader from "@/components/reusable/NewPageheader";
import I5 from "@/public/assets/tech-corner.webp";
import Head from "next/head";
import { paginate } from "@/components/reusable/throttled";

interface IBlog {
  title: string;
  slug: string;
  shortDescription: string;
  tags: {
    tag: string;
  };
  blogDetails: any;
  banner: string | undefined;
  mainBanner: string | undefined;
}
const Index = ({ TechCorner }: any) => {
  const router = useRouter();
  const pageNo: any = router.query.page;
  const [techCorners, setTechCorners] =
    useState<AsyncGeneratorFunction[]>(TechCorner);

  const [currentPage, setCurrentPage] = useState<any>(0);
  const pageSize = 6;

  useEffect(() => {
    if (pageNo == undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(pageNo));
    }
  }, [pageNo]);

  const paginatedTechs = paginate(techCorners, currentPage, pageSize);
  const [search, setSearch] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filteredData = techCorners.filter(
    (el) =>
      // @ts-ignore
      el?.node?.title?.includes(search?.toLowerCase()) ||
      // @ts-ignore
      el?.node?.blogDetails?.text?.includes(search?.toLowerCase())
  );

  useEffect(() => {
    const ScrollTo = () => {
      window.scrollTo(0, 450);
    };
    ScrollTo();
  }, [pageNo]);

  return (
    <>
      <Head>
        <title>{`HEXstream Tech Corner - Latest Tech Insights for Utility Industry.`}</title>
        <meta
          name="description"
          content="Discover the latest tech insights, trends, and advancements in the utility industry at HEXstream's Tech Corner."
        />
      </Head>
      <NewPageheader
        description="A collection of our features on technical topics outside the world of data analytics. "
        img={I5}
        title="Tech Corner"
      />

      <div className="py-12 bg-primary">
        <div className="relative col-span-1 w-10/12 max-w-xl mx-auto pb-12">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-full "
          >
            <input
              type="text"
              value={search}
              onChange={handleChange}
              className="relative m-0 block w-full min-w-0 flex-auto border border-solid border-neutral-600  text-black bg-clip-padding px-3 py-3 text-xs font-medium outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-black rounded-full placeholder:text-xs"
              id="search-input"
              placeholder="Search"
            />
          </form>
        </div>
        <div className="flex flex-wrap gap-6 max-w-7xl mx-auto text-primary justify-center items-center w-11/12">
          {!search &&
            paginatedTechs &&
            paginatedTechs.map((tech: any) => (
              <Link
                href={`/tech-corner/${tech?.node?.slug}`}
                key={tech?.node?.slug}
              >
                <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300 min-h-[360px]">
                  <div>
                    <div className="mx-auto w-fit">
                      <Image
                        src={tech?.node?.mainBanner?.url}
                        alt={tech?.node?.title + "Image"}
                        width={900}
                        height={700}
                        className="rounded aspect-[4/2]"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-bold pb-2">
                        {tech?.node.title}
                      </h2>
                      <h2 className="text-sm">
                        {tech?.node?.shortDescription?.slice(0, 120)}
                      </h2>

                      <h2 className="text-sm py-2 flex justify-between ">
                        <span>
                          {calculateReadingTime(tech?.node?.blogDetails?.text)}{" "}
                          Minute Read
                        </span>
                        <span className="hover:text-secondary">Read More</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          {search &&
            filteredData &&
            filteredData.map((tech: any) => (
              <Link
                href={`/tech-corner/${tech?.node?.slug}`}
                key={tech?.node?.slug}
              >
                <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300 min-h-[360px]">
                  <div>
                    <div className="mx-auto w-fit">
                      <Image
                        src={tech?.node?.mainBanner?.url}
                        alt={tech?.node?.title + "Image"}
                        width={900}
                        height={700}
                        className="rounded aspect-[4/2]"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-bold pb-2">
                        {tech?.node.title}
                      </h2>
                      <h2 className="text-sm">
                        {tech?.node?.shortDescription?.slice(0, 120)}
                      </h2>

                      <h2 className="text-sm py-2 flex justify-between ">
                        <span>
                          {calculateReadingTime(tech?.node?.blogDetails?.text)}{" "}
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
        <div className="text-center">
          {!filteredData.length && (
            <p className="text-black">No related data Found</p>
          )}
        </div>

        {!search && paginatedTechs && (
          <div className="flex justify-center gap-1 text-xs font-medium pt-8">
            <button
              onClick={() => {
                // handlePrev();
                router.push({
                  pathname: "/tech-corner",

                  query: { page: `${currentPage - 1}` },
                });
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
              {currentPage}/{Math.ceil(techCorners.length / pageSize)}
            </div>

            <button
              onClick={(e) => {
                // e.preventDefault();
                // handleNext();
                router.push({
                  pathname: "/tech-corner",

                  query: { page: `${currentPage + 1}` },
                });
              }}
              disabled={
                currentPage === Math.ceil(techCorners.length / pageSize)
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
        )}
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps() {
  const { data, error } = await contentApi.query({
    query: gql`
      query MyQuery {
        techCornersConnection(first: 100, orderBy: createdAt_DESC) {
          edges {
            node {
              title
              slug
              shortDescription
              tags {
                tag
              }
              blogDetails {
                text
              }
              mainBanner {
                url
              }
            }
          }
        }
      }
    `,
  });

  if (!data.techCornersConnection.edges.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { TechCorner: data.techCornersConnection.edges },
  };
}
