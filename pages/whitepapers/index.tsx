import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculateReadingTime } from "@/components/reusable/readingTime";
import I5 from "@/public/assets/whitepapers.webp";
import NewPageheader from "@/components/reusable/NewPageheader";
import Head from "next/head";
import { paginate } from "@/components/reusable/throttled";
import Pagination from "@/components/reusable/Pagination";

const Index = () => {
  const [whitepapers, setWhitepapers] = useState([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const pageSize = 6;

  const filteredData = whitepapers.filter(
    (el) =>
      // @ts-ignore
      el?.node?.title.toLowerCase()?.includes(search.toLowerCase()) ||
      // @ts-ignore
      el?.node?.title?.includes(search.toLowerCase())
  );
  const paginatedWhitePapers = paginate(filteredData, currentPage, pageSize);

  useEffect(() => {
    setLoading(false);
    const getWhitePapers = async () => {
      const { data, error } = await contentApi.query({
        query: gql`
          query MyQuery {
            whitepapersConnection {
              edges {
                node {
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
            }
          }
        `,
      });
      if (!error) {
        setWhitepapers(data.whitepapersConnection.edges);
        setLoading(true);
      }
    };
    getWhitePapers();
  }, []);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <Head>
        <title>{`HEXstream Whitepapers - In-depth Analysis of Utility Analytics.`}</title>
        <meta
          name="description"
          content="Dive deep into the utility analytics industry with HEXstream's insightful whitepapers, providing comprehensive knowledge and analysis."
        />
      </Head>
      <NewPageheader
        description="HEXstream subject-matter experts dive deep into topics to deliver comprehensive guidance on emerging operational techniues for utilities."
        img={I5}
        title="Whitepapers"
      />

      <div className="py-14 bg-primary">
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
          {loading ? (
            paginatedWhitePapers.length > 0 ? (
              paginatedWhitePapers.map((whitepaper: any) => (
                <Link
                  href={`/whitepapers/${whitepaper?.node?.slug}`}
                  key={whitepaper?.node?.slug}
                >
                  <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300 min-h-[380px]">
                    <div>
                      <div className="mx-auto w-fit">
                        <Image
                          src={whitepaper?.node?.mainImage?.url}
                          alt={whitepaper?.node?.title}
                          width={900}
                          height={700}
                          className="rounded aspect-[2/1]"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg font-bold pb-2">
                          {whitepaper?.node?.title}
                        </h2>
                        <h2 className="text-sm line-clamp-3">
                          {whitepaper?.node?.shortDescription}
                        </h2>

                        <h2 className="text-sm py-2 flex justify-between ">
                          <span>
                            {calculateReadingTime(
                              whitepaper?.node?.details?.text
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
              ))
            ) : (
              <p className="text-white text-2xl">No related data Found</p>
            )
          ) : (
            <div className="h-full grid place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#fff"
                  stroke-width="3"
                  r="10"
                  stroke-dasharray="47.12388980384689 17.707963267948966"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  ></animateTransform>
                </circle>
              </svg>
            </div>
          )}
        </div>
        <Pagination
          items={filteredData.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default Index;
