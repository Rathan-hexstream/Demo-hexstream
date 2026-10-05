import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { ClockIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { contentApi } from "@/utils/apolloClient";
import { calculateReadingTime } from "@/components/reusable/readingTime";
import Cta from "@/components/reusable/CTA";
import { ArrowIcon } from "@/components/ui/Button";
import HexPattern from "@/components/ui/HexPattern";
import { EASE } from "@/components/ui/motion";
import white_papers from "@/public/assets/white_papers.jpg";

const FILTER_TYPES = [
    "Tech Corner",
    "Success Stories",
    "HEXstream Blog",
    "Whitepapers & Special Reports",
    // "UAUG",
];

// What visitors see before they pick a filter or search.
const DEFAULT_TYPE = "Tech Corner";

// Positions in the grid (per ten cards) that run double width, so rows always fill.
const WIDE_SLOTS = [0, 6];

type PaginationProps = {
    items: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

const pagerButton =
    "grid h-11 min-w-[2.75rem] place-items-center rounded-full px-3 text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-40";

const Pagination = ({ items, currentPage, pageSize, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(items / pageSize);
    const maxVisible = 5;

    if (totalPages <= 1) return null;

    // Keep the current page centred in a window of five.
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - maxVisible + 1));
    const visiblePages = Array.from(
        { length: Math.min(maxVisible, totalPages) },
        (_, i) => start + i
    );

    return (
        <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`${pagerButton} border border-ink/15 bg-white text-ink hover:scale-110 hover:border-brand hover:bg-brand hover:text-white`}
            >
                <ArrowIcon className="rotate-180" />
            </button>
            {visiblePages.map((page) => (
                <button
                    key={page}
                    type="button"
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => onPageChange(page)}
                    className={`${pagerButton} relative ${
                        currentPage === page ? "text-white" : "bg-white text-ink hover:bg-brand-50 hover:text-brand"
                    }`}
                >
                    {currentPage === page && (
                        <motion.span
                            layoutId="page-active"
                            className="bg-deep absolute inset-0 rounded-full shadow-card"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                    )}
                    <span className="relative tabular-nums">{page}</span>
                </button>
            ))}
            <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`${pagerButton} border border-ink/15 bg-white text-ink hover:scale-110 hover:border-brand hover:bg-brand hover:text-white`}
            >
                <ArrowIcon />
            </button>
        </nav>
    );
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const formatDate = (value?: string) =>
    value
        ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "";

const excerpt = (text: string | undefined, max: number) =>
    text ? (text.length > max ? text.slice(0, max).trimEnd() + "..." : text) : "";

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
        setSelectedTypes((prev) => {
            // Start from what is currently shown, so the first click behaves as it looks.
            const base = prev.length > 0 ? prev : search.trim() === "" ? [DEFAULT_TYPE] : [];
            return base.includes(type) ? base.filter((t) => t !== type) : [...base, type];
        });
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const combinedData = [...whitepapers, ...blogs, ...techCorner, ...successStories].sort((a, b) => {
        const aT = new Date(a.publishedAt || a.createdAt).getTime();
        const bT = new Date(b.publishedAt || b.createdAt).getTime();
        return bT - aT;
    });

    // With nothing ticked: show the default type, or search across everything.
    const activeTypes =
        selectedTypes.length > 0
            ? selectedTypes
            : search.trim() === ""
            ? [DEFAULT_TYPE]
            : FILTER_TYPES;
    const allActive = FILTER_TYPES.every((type) => activeTypes.includes(type));
    const countFor = (type: string) => combinedData.filter((item) => item.contentType === type).length;

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

        const matchesType = activeTypes.includes(item.contentType);

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

    const hrefFor = (item: any) => `/${getSlugPrefix(item.contentType)}/${item.slug}`;
    const imageFor = (item: any) =>
        item.mainBanner?.url || item.mainImage?.url || "/assets/blog.webp";
    const readTime = (item: any) =>
        calculateReadingTime(item.blogDetails?.text || item.details?.text || item.brief?.text || "");

    // Page one opens like a front page: a lead story, two beside it, then the grid.
    const frontPage = currentPage === 1 && paginatedData.length >= 3;
    const lead = frontPage ? paginatedData[0] : undefined;
    const seconds = frontPage ? paginatedData.slice(1, 3) : [];
    const rest = frontPage ? paginatedData.slice(3) : paginatedData;

    // Called as a plain function (not a component) so cards are not remounted on every keystroke.
    const renderStory = (item: any, wide = false, compact = false) => (
        <Link
            href={hrefFor(item)}
            className={`group/card flex h-full overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift ${
                compact ? "flex-row" : wide ? "flex-col sm:flex-row" : "flex-col"
            }`}
        >
            <span
                className={`relative block shrink-0 overflow-hidden bg-ink-800 ${
                    compact
                        ? "w-[38%]"
                        : wide
                        ? "aspect-[2/1] sm:aspect-auto sm:w-[45%]"
                        : "aspect-[2/1]"
                }`}
            >
                <Image
                    src={imageFor(item)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-110"
                />
                <span className="absolute inset-0 bg-ink-800/0 transition-colors duration-500 group-hover/card:bg-ink-800/30" />
                <span className="absolute right-4 top-4 grid h-10 w-10 -translate-y-2 place-items-center rounded-full bg-brand text-white opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                    <ArrowIcon className="-rotate-45" />
                </span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col p-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                    {item.contentType}
                </span>
                <span
                    className={`mt-2 block font-display font-semibold leading-snug text-ink transition-colors duration-300 group-hover/card:text-brand ${
                        wide ? "text-xl" : "text-base"
                    }`}
                >
                    {item.title}
                </span>
                {wide && item.shortDescription && (
                    <span className="mt-2 block text-sm leading-relaxed text-ink/70">
                        {excerpt(item.shortDescription, 140)}
                    </span>
                )}
                <span className="mt-auto flex items-center justify-between pt-4 text-[13px] text-ink/60">
                    <span className="whitespace-nowrap">{formatDate(item.publishedAt)}</span>
                    <span className={`items-center gap-1.5 whitespace-nowrap ${compact ? "hidden" : "inline-flex"}`}>
                        <ClockIcon className="h-4 w-4" />
                        {readTime(item)} Minute Read
                    </span>
                </span>
            </span>
        </Link>
    );

    const listKey = `${activeTypes.join("|")}-${search}-${currentPage}`;

    const chip = (active: boolean) =>
        `relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            active
                ? "bg-deep text-white shadow-card"
                : "bg-mist text-ink hover:bg-brand-50 hover:text-brand"
        }`;

    return (
        <div className="overflow-x-clip">
            <Head>
                <title>Insights & Resources | HEXstream</title>
                <meta
                    name="description"
                    content="Explore HEXstream's latest whitepapers, blogs, success stories, tech corner posts, and UAUG insights."
                />
            </Head>

            {/* Banner */}
            <section className="relative isolate overflow-hidden bg-ink-800 text-white">
                <motion.div
                    className="absolute inset-0 -z-20"
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.4, ease: "easeOut" }}
                >
                    <Image priority src={white_papers} alt="" fill sizes="100vw" className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-800/95 via-ink/80 to-ink/30" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink-800/90 to-transparent" />
                <HexPattern className="-z-10 text-white/[0.07] [mask-image:linear-gradient(to_right,black,transparent_60%)]" />

                <div className="container-x flex min-h-[clamp(480px,66vh,620px)] items-center pb-24 pt-[130px]">
                    <div className="w-full max-w-3xl">
                        <motion.nav
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASE }}
                            aria-label="Breadcrumb"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur"
                        >
                            <Link href="/" className="text-white/70 transition-colors hover:text-white">
                                Home
                            </Link>
                            <span className="text-white/40">/</span>
                            <span>Insights</span>
                        </motion.nav>
                        <div className="mt-6 overflow-hidden pb-2">
                            <motion.h1
                                initial={{ y: "105%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                                className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl xl:text-7xl"
                            >
                                Insights &amp;{" "}
                                <span className="bg-gradient-to-r from-brand-400 to-[#FF8A8B] bg-clip-text text-transparent">
                                    Resources
                                </span>
                            </motion.h1>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                            className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
                        >
                            HEXstream experts dive into emerging tech topics and best practices.
                        </motion.p>

                        <motion.label
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                            className="group/search mt-8 flex max-w-xl items-center gap-3 rounded-full border border-white/30 bg-white/15 py-2 pl-5 pr-2 backdrop-blur-md transition-all duration-300 focus-within:border-white focus-within:bg-white"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-white/80 transition-colors group-focus-within/search:text-brand" />
                            <span className="sr-only">Search insights</span>
                            <input
                                type="text"
                                value={search}
                                onChange={handleChange}
                                placeholder="Search articles, reports and stories"
                                className="w-full bg-transparent py-2 text-base text-white outline-none placeholder:!text-base placeholder:text-white/60 group-focus-within/search:text-ink group-focus-within/search:placeholder:text-ink/40"
                            />
                            {search && (
                                <button
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={() => {
                                        setSearch("");
                                        setCurrentPage(1);
                                    }}
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-300 hover:rotate-90"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            )}
                        </motion.label>
                    </div>
                </div>
            </section>

            <section id="results" className="scroll-mt-24 bg-mist pb-12 sm:pb-16">
                <div className="container-x">
                    {/* Filter bar floats over the bottom edge of the banner */}
                    <div className="relative z-10 -mt-9 flex flex-col gap-3 rounded-3xl bg-white p-3 shadow-lift ring-1 ring-ink/5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex gap-2 overflow-x-auto sm:flex-wrap">
                            <button
                                type="button"
                                aria-pressed={allActive}
                                onClick={() => {
                                    setSelectedTypes(allActive ? [] : FILTER_TYPES);
                                    setCurrentPage(1);
                                }}
                                className={chip(allActive)}
                            >
                                All
                            </button>
                            {FILTER_TYPES.map((type) => {
                                const active = activeTypes.includes(type);
                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => handleFilterChange(type)}
                                        className={chip(active)}
                                    >
                                        {type}
                                        {!loading && (
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                                                    active ? "bg-white/20" : "bg-white text-ink/60"
                                                }`}
                                            >
                                                {countFor(type)}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="shrink-0 px-3 text-sm font-medium text-ink/60">
                            {filteredData.length > 0 && (
                                <>
                                    Results {(currentPage - 1) * pageSize + 1}–
                                    {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}
                                </>
                            )}
                        </p>
                    </div>

                    <div className="mt-10">
                        {loading ? (
                            <div aria-busy="true" aria-label="Loading insights" className="grid gap-6 lg:grid-cols-3">
                                <div className="h-[30rem] animate-pulse rounded-3xl bg-white lg:col-span-2" />
                                <div className="grid gap-6">
                                    <div className="h-56 animate-pulse rounded-3xl bg-white" />
                                    <div className="h-56 animate-pulse rounded-3xl bg-white" />
                                </div>
                            </div>
                        ) : paginatedData.length > 0 ? (
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={listKey}
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                                >
                                    {/* Front page: one lead story with two more beside it */}
                                    {lead && (
                                        <div className="grid gap-5 lg:grid-cols-3">
                                            <motion.div variants={cardVariants} className="lg:col-span-2">
                                                <Link
                                                    href={hrefFor(lead)}
                                                    className="group/lead relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink-800 p-6 text-white shadow-card transition-shadow duration-500 hover:shadow-lift sm:p-8 lg:h-full lg:min-h-[21rem]"
                                                >
                                                    <Image
                                                        src={imageFor(lead)}
                                                        alt=""
                                                        fill
                                                        priority
                                                        sizes="(min-width: 1024px) 66vw, 100vw"
                                                        className="-z-20 object-cover transition-transform duration-[1.4s] ease-out group-hover/lead:scale-110"
                                                    />
                                                    <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-800 via-ink-800/70 to-ink-800/5" />
                                                    <span className="absolute left-6 top-6 flex items-center gap-2 sm:left-8 sm:top-8">
                                                        <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
                                                            Latest
                                                        </span>
                                                        <span className="rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
                                                            {lead.contentType}
                                                        </span>
                                                    </span>
                                                    <span className="block max-w-2xl font-display text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl">
                                                        {lead.title}
                                                    </span>
                                                    {lead.shortDescription && (
                                                        <span className="mt-3 block max-w-2xl text-[15px] leading-relaxed text-white/80">
                                                            {excerpt(lead.shortDescription, 180)}
                                                        </span>
                                                    )}
                                                    <span className="mt-5 flex items-center justify-between gap-4 text-sm text-white/75">
                                                        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                            <span>{formatDate(lead.publishedAt)}</span>
                                                            <span className="inline-flex items-center gap-1.5">
                                                                <ClockIcon className="h-4 w-4" />
                                                                {readTime(lead)} Minute Read
                                                            </span>
                                                        </span>
                                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-all duration-300 group-hover/lead:scale-110 group-hover/lead:bg-brand group-hover/lead:text-white">
                                                            <ArrowIcon className="-rotate-45 transition-transform duration-300 group-hover/lead:rotate-0" />
                                                        </span>
                                                    </span>
                                                </Link>
                                            </motion.div>

                                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                                                {seconds.map((item: any) => (
                                                    <motion.div key={`${item.contentType}-${item.slug}`} variants={cardVariants} className="h-full">
                                                        {renderStory(item, false, true)}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {rest.length > 0 && (
                                        <>
                                            {lead && (
                                                <div className="mb-6 mt-10 flex items-center gap-4">
                                                    <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                                                        More to read
                                                    </h2>
                                                    <span className="h-px flex-1 bg-ink/10" />
                                                </div>
                                            )}
                                            {/* Mixed grid: every few cards one runs double width */}
                                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                                {rest.map((item: any, i: number) => {
                                                    const wide = WIDE_SLOTS.includes(i % 10);
                                                    return (
                                                        <motion.div
                                                            key={`${item.contentType}-${item.slug}`}
                                                            variants={cardVariants}
                                                            className={`h-full ${wide ? "sm:col-span-2" : ""}`}
                                                        >
                                                            {renderStory(item, wide)}
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="relative isolate overflow-hidden rounded-3xl bg-white px-6 py-16 text-center shadow-card">
                                <HexPattern className="-z-10 text-brand/[0.1] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                                <div className="mx-auto w-16 drop-shadow-[0_12px_18px_rgba(235,44,46,0.35)]">
                                    <div className="hex-pointy grid place-items-center bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                                        <MagnifyingGlassIcon className="h-7 w-7" />
                                    </div>
                                </div>
                                <p className="mt-6 font-display text-2xl font-bold text-ink">No content found</p>
                                <p className="mx-auto mt-2 max-w-md text-ink/70">
                                    Try a different search term, or choose another content type.
                                </p>
                            </div>
                        )}
                    </div>

                    <Pagination
                        items={filteredData.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>

            <Cta title="Let's get your data streamlined today!" name="Get In Touch" />
        </div>
    );
};

export default Index;
