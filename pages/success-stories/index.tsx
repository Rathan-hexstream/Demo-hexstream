import React, { useEffect, useState } from "react";
import { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";
import NewCard from "@/components/reusable/NewCard";
import { useRouter } from "next/router";
import NewPageheader from "@/components/reusable/NewPageheader";
import I5 from "@/public/assets/sucess-stories.webp";
import Head from "next/head";
import { paginate } from "@/components/reusable/throttled";

const Index = ({ SuccessStories }: any) => {
  const router = useRouter();
  const pageNo: any = router.query.page;
  const [stories, setStories] = useState(SuccessStories || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const pageSize = 6;

  // temp commit
  useEffect(() => {
    if (pageNo === undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(pageNo));
    }
  }, [pageNo]);

  useEffect(() => {
    setLoading(false);
  }, [stories]);

  const filteredData = stories?.filter(
      (el: { title: string; }) =>
          el?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
          el?.title?.includes(search.toLowerCase())
  );

  const paginatedStories = paginate(filteredData, currentPage, pageSize);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
      <div>
        <Head>
          <title>HEXstream Success Stories - Transforming the Utility Industry</title>
          <meta
              name="description"
              content="Explore our success stories and learn how HEXstream is driving digital transformation in the utility industry through data analytics."
          />
        </Head>
        <NewPageheader
            description="The best way to understand the possibilities of smart solutions is to study success stories of your peers. Here, find a collection of case studies that highlight the breadth of possibilities."
            img={I5}
            title="Success Stories"
        />
        <div className="py-14 bg-prime-light/90">
          <div className="relative col-span-1 w-10/12 max-w-xl mx-auto pb-12">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              <input
                  type="text"
                  value={search}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
                  placeholder="Search"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-12 max-w-7xl mx-auto justify-center">
            {!loading ? (
                paginatedStories.length > 0 ? (
                    paginatedStories.map((story: any) => (
                        <Link href={`/success-stories/${story.slug}`} key={story.slug}>
                          <NewCard
                              title={story.title}
                              alt={`${story.title} image`}
                              img={story.mainBanner.url}
                              briefText={story.brief.text}
                              approachText={story.approach.text}
                          />
                        </Link>
                    ))
                ) : (
                    <p>No related data found</p>
                )
            ) : (
                <p>Loading...</p>
            )}
          </div>
          <div className="flex justify-center gap-1 text-xs font-medium pt-8">
            {/* Previous Page Button */}
            <button
                onClick={() => {
                  router.push({
                    pathname: "/success-stories",
                    query: { page: `${currentPage - 1}` },
                  });
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                disabled={currentPage === 1}
            >
              <span className="sr-only">Previous Page</span>
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

            {/* Current Page Display */}
            <div className="block h-8 w-12 rounded border bg-white text-center leading-8 text-base text-primary">
              {currentPage}/{Math.ceil(stories.length / pageSize)}
            </div>

            {/* Next Page Button */}
            <button
                onClick={() => {
                  router.push({
                    pathname: "/success-stories",
                    query: { page: `${currentPage + 1}` },
                  });
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
                disabled={currentPage === Math.ceil(stories.length / pageSize)}
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
        </div>
      </div>
  );
};

export default Index;

export async function getServerSideProps() {
  const { data } = await contentApi.query({
    query: gql`
      query MyQuery {
        successStories(first: 100, orderBy: createdAt_DESC) {
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
          mainBanner {
            url
          }
        }
      }
    `,
  });

  if (!data.successStories.length) {
    return { notFound: true };
  }

  return { props: { SuccessStories: data.successStories } };
}
