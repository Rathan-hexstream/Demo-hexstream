import client, { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { calculateReadingTime } from "@/components/reusable/readingTime";
import NewPageheader from "@/components/reusable/NewPageheader";
import I5 from "@/public/assets/blog.webp";
import Head from "next/head";
import { paginate } from "@/components/reusable/throttled";

const sortOptions = [
  {
    displayValue: "Latest First",
    value: "Latest_First",
  },
  {
    displayValue: "By Popularity",
    value: "By_Popularity",
  },
];

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

const Index = () => {
  const router = useRouter();
  const pageNo: any = router.query.page;

  const [blogs, setBlogs] = useState<AsyncGeneratorFunction[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const pageSize = 6;

  const [sortBy, setSortBy] = useState<any>(
    router?.query?.sortBy || "Latest_First"
  );

  useEffect(() => {
    setSortBy(router.query.sortBy);
    setCurrentPage(1);
  }, [router.query.sortBy]);

  useEffect(() => {
    const getLatest = async () => {
      setLoading(false);
      const { data, error } = await contentApi.query({
        query: gql`
          query MyQuery {
            blogsConnection(first: 100,  orderBy: createdAt_DESC) {
              edges {
                node {
                  title
                  views
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
      if (!error) {
        setBlogs(data.blogsConnection.edges);
        setLoading(true);
      }
    };

    const getPopularity = async () => {
      const { data: popular, error: popularError } = await contentApi.query({
        query: gql`
          query MyQuery {
            blogsConnection(first: 100, orderBy: views_DESC) {
              edges {
                node {
                  views
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
      if (!popularError) {
        setBlogs(popular.blogsConnection.edges);
        setLoading(true);
      }
    };

    if (sortBy === "Latest_First" || sortBy === undefined) {
      getLatest();
    } else {
      getPopularity();
    }
  }, [sortBy]);

  useEffect(() => {
    if (pageNo == undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(pageNo));
    }
  }, [pageNo]);

  const paginatedBlogs = paginate(blogs, currentPage, pageSize);

  const filteredData = blogs.filter(
    (el) =>
      // @ts-ignore
      el?.node?.title?.toLowerCase().includes(search?.toLowerCase()) ||
      // @ts-ignore
      el?.node?.blogDetails?.text?.toString().toLowerCase()?.includes(search?.toLowerCase())
  );

  useEffect(() => {
    const ScrollTo = () => {
      window.scrollTo(0, 450);
    };
    ScrollTo();
  }, [pageNo]);

  const loaderFunc = async () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <Head>
        <title>{`HEXstream Blogs - Insightful Articles on Utility Data Analytics`}</title>
        <meta
          name="description"
          content="Keep up to date with the latest trends and insights in utility data analytics with HEXstream's insightful blogs."
        />
      </Head>
      <NewPageheader
        description="Here find our living library of thought leadership on the full spectrum of topics that make up data analytics for the utilities sector."
        img={I5}
        title="Blogs"
      />

      <div className="py-10 md:py-14 bg-primary">
        <div className="pb-4">
          <div className="relative sm:max-w-3xl lg:max-w-5xl  mx-auto w-10/12 flex sm:gap-6 flex-wrap justify-end sm:justify-between items-center pb-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:w-96"
            >
              <input
                type="text"
                value={search}
                onChange={handleChange}
                className="relative m-0 block w-full min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-3 text-xs font-medium text-white outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-white rounded-full placeholder:text-xs"
                id="search-input"
                placeholder="Search"
              />
            </form>

            <div className="w-28 md:w-60 ">
              <label
                htmlFor="sort"
                aria-label="Sort"
                className="block mb-2 text-sm font-medium text-white"
              ></label>
              <select
                id="sort"
                onChange={(e) => {
                  router.push({
                    pathname: "/blogs",
                    query: {
                      page: 1,
                      sortBy: e.target.value,
                    },
                  });
                }}
                className="bg-gray-50 border text-sm rounded-lg block w-full p-2 md:p-2.5 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option
                    selected={option.value == sortBy}
                    key={option.value}
                    value={option.value}
                  >
                    {option.displayValue}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-wrap gap-6 max-w-7xl mx-auto text-primary justify-center items-center w-11/12">
            {!search && paginatedBlogs ? (
              paginatedBlogs.map((blog: any) => (
                <Link
                  href={`/blogs/${blog?.node?.slug}`}
                  key={blog?.node?.slug}
                >
                  <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300 min-h-[440px]">
                    <div>
                      <div className="mx-auto w-fit">
                        <Image
                          src={blog?.node?.mainBanner?.url}
                          alt={blog?.node?.title + "Image"}
                          width={900}
                          height={700}
                          className="rounded h-56"
                        />
                      </div>
                      <div className="p-4 flex-col justify-between">
                        <div className="">
                          <h2 className="text-lg font-bold pb-2">
                            {blog?.node.title}
                          </h2>
                          <h2 className="text-sm line-clamp-4">
                            {blog?.node?.shortDescription}
                          </h2>
                        </div>

                        <div className="text-sm pt-3 flex justify-between ">
                          <span>
                            {calculateReadingTime(
                              blog?.node?.blogDetails?.text
                            )}{" "}
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
              ))
            ) : (
              <>
                {filteredData &&
                  filteredData.map((blog: any) => (
                    <Link
                      href={`/blogs/${blog?.node?.slug}`}
                      key={blog?.node?.slug}
                    >
                      <div className="max-w-xs mx-auto shadow-xl rounded-lg bg-white/80 backdrop-blur-md hover:bg-white transition-colors duration-300 min-h-[360px]">
                        <div>
                          <div className="mx-auto w-fit">
                            <Image
                              src={blog?.node?.mainBanner?.url}
                              alt={blog?.node?.title + "Image"}
                              width={900}
                              height={700}
                              className="rounded aspect-[4/2]"
                            />
                          </div>
                          <div className="p-4">
                            <h2 className="text-lg font-bold pb-2">
                              {blog?.node.title}
                            </h2>
                            <h2 className="text-sm">
                              {blog?.node?.shortDescription?.slice(0, 120)}
                            </h2>

                            <h2 className="text-sm py-2 flex justify-between ">
                              <span>
                                {calculateReadingTime(
                                  blog?.node?.blogDetails?.text
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
              </>
            )}

            {!filteredData.length && (
              <p className="text-white">No related data Found</p>
            )}
          </div>
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

        {!search && paginatedBlogs && (
          <div className="flex justify-center gap-1 text-xs font-medium pt-8">
            <button
              onClick={() => {
                loaderFunc();
                router.push({
                  pathname: "/blogs",
                  query: {
                    page: `${currentPage - 1}`,
                    sortBy: sortBy,
                  },
                });
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              disabled={currentPage === 1}
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
              {currentPage}/{Math.ceil(blogs.length / pageSize)}
            </div>

            <button
              onClick={() => {
                loaderFunc();
                router.push({
                  pathname: "/blogs",
                  query: {
                    page: `${currentPage + 1}`,
                    sortBy: sortBy,
                  },
                });
              }}
              disabled={
                currentPage === Math.ceil(blogs.length / pageSize)
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
