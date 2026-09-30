// pages/index.tsx
import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { contentApi } from "@/utils/apolloClient";
import { calculateReadingTime } from "@/components/reusable/readingTime";
import NewPageheader from "@/components/reusable/NewPageheader";
import white_papers from "@/public/assets/white_papers.jpg";
import { useRouter } from "next/router";

const FILTER_TYPES = [
    "Tech Corner",
    "Success Stories",
    "HEXstream Blog",
    "Whitepapers & Special Reports",
    // "UAUG",
];

// ✅ Added type for Pagination props
type PaginationProps = {
    items: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ items, currentPage, pageSize, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(items / pageSize);
    const maxVisible = 5;
    const [startPage, setStartPage] = useState(1);

    useEffect(() => {
        if (currentPage < startPage) setStartPage(currentPage);
        else if (currentPage >= startPage + maxVisible)
            setStartPage(currentPage - maxVisible + 1);
    }, [currentPage, startPage]);

    if (totalPages <= 1) return null;

    const visiblePages = Array.from(
        { length: Math.min(maxVisible, totalPages - startPage + 1) },
        (_, i) => startPage + i
    );

    return (
        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap text-sm">
            {startPage > 1 && (
                <button
                    className="px-2 py-1 border rounded text-gray-700 bg-white hover:bg-gray-100 transition"
                    onClick={() => setStartPage(startPage - 1)}
                >
                    &laquo;
                </button>
            )}
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 border rounded transition ${
                        currentPage === page
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-700 bg-white hover:bg-gray-100"
                    }`}
                >
                    {page}
                </button>
            ))}
            {startPage + maxVisible - 1 < totalPages && (
                <button
                    className="px-2 py-1 border rounded text-gray-700 bg-white hover:bg-gray-100 transition"
                    onClick={() => setStartPage(startPage + 1)}
                >
                    &raquo;
                </button>
            )}
        </div>
    );
};

// ✅ Fix type for paginate function
const paginate = <T,>(items: T[], pageNumber: number, pageSize: number): T[] => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};

const Index = () => {
    const router = useRouter();
    const { type: queryType } = router.query;

    const [whitepapers, setWhitepapers] = useState<any[]>([]);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [techCorner, setTechCorner] = useState<any[]>([]);
    const [successStories, setSuccessStories] = useState<any[]>([]);
    // const [uaug, setUAUG] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const pageSize = 10;

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [wpRes, blogRes, techRes, storyRes ] = await Promise.all([
                    contentApi.query({
                        query: gql`
                            {
                                whitepapersConnection(first: 100, orderBy: publishedAt_DESC) {
                                    edges {
                                        node {
                                            title
                                            slug
                                            shortDescription
                                            author
                                            mainImage { url }
                                            details { text }
                                            publishedAt
                                        }
                                    }
                                }
                            }
                        `,
                    }),
                    contentApi.query({
                        query: gql`
                            {
                                blogsConnection(first: 100, orderBy: publishedAt_DESC) {
                                    edges {
                                        node {
                                            id
                                            title
                                            slug
                                            shortDescription
                                            blogDetails { text }
                                            mainBanner { url }
                                            publishedAt
                                        }
                                    }
                                }
                            }
                        `,
                    }),
                    contentApi.query({
                        query: gql`
                            {
                                techCornersConnection(first: 100, orderBy: publishedAt_DESC) {
                                    edges {
                                        node {
                                            title
                                            slug
                                            shortDescription
                                            blogDetails { text }
                                            mainBanner { url }
                                            publishedAt
                                        }
                                    }
                                }
                            }
                        `,
                    }),
                    contentApi.query({
                        query: gql`
                            {
                                successStories(first: 100, orderBy: createdAt_DESC) {
                                    title
                                    slug
                                    brief { text }
                                    approach { text }
                                    mainBanner { url }
                                    createdAt
                                }
                            }
                        `,
                    }),
                    // contentApi.query({
                    //     query: gql`
                    //         {
                    //             uaugEvents(first: 100, orderBy: publishedAt_DESC) {
                    //                 eventTitle
                    //                 slug
                    //                 eventExcerpt
                    //                 eventBanner { url }
                    //                 eventDetails { text }
                    //                 publishedAt
                    //             }
                    //         }
                    //     `,
                    // }),
                ]);

                setWhitepapers(wpRes.data.whitepapersConnection.edges.map(({ node }: any) => ({
                    ...node,
                    contentType: "Whitepapers & Special Reports",
                    publishedAt: node.publishedAt,
                })));
                setBlogs(blogRes.data.blogsConnection.edges.map(({ node }: any) => ({
                    ...node,
                    contentType: "HEXstream Blog",
                    publishedAt: node.publishedAt,
                })));
                setTechCorner(techRes.data.techCornersConnection.edges.map(({ node }: any) => ({
                    ...node,
                    contentType: "Tech Corner",
                    publishedAt: node.publishedAt,
                })));
                setSuccessStories(storyRes.data.successStories.map((item: any) => ({
                    ...item,
                    contentType: "Success Stories",
                    publishedAt: item.createdAt,
                })));
                // setUAUG(uaugRes.data.uaugEvents.map((item: any) => ({
                //     title: item.eventTitle,
                //     slug: item.slug,
                //     shortDescription: item.eventExcerpt,
                //     mainBanner: item.eventBanner,
                //     details: item.eventDetails,
                //     contentType: "UAUG",
                //     publishedAt: item.publishedAt,
                // })));

                setLoading(false);
            } catch (error) {
                console.error("Fetching error:", error);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // Set selectedTypes if query parameter exists
    useEffect(() => {
        if (queryType && typeof queryType === "string") {
            setSelectedTypes([queryType]);
            setCurrentPage(1);
        }
    }, [queryType]);

    const handleFilterChange = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
        setCurrentPage(1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const combinedData = [...whitepapers, ...blogs, ...techCorner, ...successStories, {/*...uaug*/}].sort((a, b) => {
        const aT = new Date(a.publishedAt || a.createdAt).getTime();
        const bT = new Date(b.publishedAt || b.createdAt).getTime();
        return bT - aT;
    });

    const filteredData = combinedData.filter((item) => {
        const searchNormalized = search.toLowerCase().trim();

        const combinedText = [
            item.title,
            item.shortDescription,
            item.blogDetails?.text,
            item.details?.text,
            item.brief?.text,
            item.approach?.text,
            item.eventDetails?.text,
            item.contentType,
            item.author
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesSearch = searchNormalized === "" || combinedText.includes(searchNormalized);

        // ✅ Logic for type filtering
        let matchesType = false;

        if (selectedTypes.length > 0) {
            matchesType = selectedTypes.includes(item.contentType);
        } else if (searchNormalized === "") {
            matchesType = item.contentType === "Tech Corner";
        } else {
            matchesType = true;
        }

        return matchesSearch && matchesType;
    });

    useEffect(() => {
        if (currentPage > Math.ceil(filteredData.length / pageSize)) {
            setCurrentPage(1);
        }
    }, [currentPage, filteredData]);

    const paginatedData = paginate(filteredData, currentPage, pageSize);

    const getSlugPrefix = (type: string) => {
        switch (type) {
            case "HEXstream Blog":
                return "blogs";
            case "Tech Corner":
                return "tech-corner";
            case "Success Stories":
                return "success-stories";
            case "Whitepapers & Special Reports":
                return "whitepapers";
            // case "UAUG":
            //     return "uaug";
            default:
                return "";
        }
    };

    return (
        <>
            <Head>
                <title>Insights & Resources | HEXstream</title>
                <meta
                    name="description"
                    content="Explore HEXstream's latest whitepapers, blogs, success stories, tech corner posts, and UAUG insights."
                />
            </Head>

            <NewPageheader
                title="Insights & Resources"
                description="HEXstream experts dive into emerging tech topics and best practices."
                img={white_papers}
            />

            <div className="py-14 bg-primary min-h-screen">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 w-11/12">
                    <aside className="lg:sticky top-24 lg:w-1/4 w-full bg-white p-6 rounded-xl shadow-md h-[330px] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-black">FILTER BY</h3>
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">CONTENT TYPE</h4>
                            {FILTER_TYPES.map((type) => (
                                <label key={type} className="flex items-center mb-3 text-sm text-gray-800 hover:text-primary transition-colors">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-primary mr-2"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => handleFilterChange(type)}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={handleChange}
                            placeholder="Search"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-primary focus:outline-none transition"
                        />
                    </aside>

                    <div className="lg:w-3/4 w-full">
                        <div className="text-sm text-white/80 border-b border-white pb-2 font-medium mb-4">
                            {filteredData.length > 0 && (
                                <>
                                    Results {(currentPage - 1) * pageSize + 1}–
                                    {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-8">
                            {loading ? (
                                <div className="grid place-items-center w-full">
                                    <p className="text-white">Loading...</p>
                                </div>
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((item, idx) => (
                                    <Link
                                        href={`/${getSlugPrefix(item.contentType)}/${item.slug}`}
                                        key={idx}
                                        className="block"
                                    >
                                        <div className="group flex flex-col sm:flex-row-reverse gap-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-transform duration-300 overflow-hidden border border-gray-100">
                                            <div className="w-full sm:w-64 relative h-48 sm:h-auto flex-shrink-0 rounded-l-xl overflow-hidden">
                                                <Image
                                                    src={item.mainBanner?.url || item.mainImage?.url || "/assets/default-image.webp"}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex-1 p-6 flex flex-col justify-between">
                                                <div>
                                                    <h6 className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{item.contentType}</h6>
                                                    <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {item.shortDescription &&
                                                            (item.shortDescription.length > 120
                                                                ? item.shortDescription.slice(0, 120) + "..."
                                                                : item.shortDescription)}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                                                    <span>
                                                        {calculateReadingTime(item.blogDetails?.text || item.details?.text || item.brief?.text || "")} Minute Read
                                                    </span>
                                                    <span className="text-primary underline hover:text-primary/80 transition">Read More</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-white text-2xl">No content found</p>
                            )}
                        </div>

                        <Pagination
                            items={filteredData.length}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
