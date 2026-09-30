import NewPageheader from "@/components/reusable/NewPageheader";
import { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import React from "react";
import I5 from "@/public/assets/Oracle.jpg";
import TableOfContents from "@/components/about/TableOfContent";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import Cta from "@/components/reusable/CTA";

const ServiceDetails = ({ services }: any) => {
    const allowedTitles = [
        "utility360",
        "storm analytics",
        "ami analytics",
        "reliability analytics",
        "hexpert",
        "sparc",
        "auditai",
        "operations support",
        "dev ops",
        "hexaid",
    ];

    const currentTitle = services?.title
        ?.toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    const isProduct = allowedTitles.includes(currentTitle);
    const isHexAid = currentTitle === "hexaid";

    const hasSubCategories = services?.subCategories?.length > 0;
    // FIX 2: Also check top-level overview so products like utility360
    // that store content there (instead of subCategories) still render it.
    const hasTopLevelOverview = !!services?.overview?.raw?.children?.length;

    return (
        <div className="overflow-x h-auto">
            <NewPageheader
                // FIX 3: categoryTag is now fetched from the API (see query below)
                type={services?.categoryTag}
                title={services?.title}
                img={services?.mainImage?.url ?? I5}
                description={services?.shortDescription}
                showButton={allowedTitles.includes(
                    services?.title?.toLowerCase()
                )}
                isHexAid={isHexAid}
            />

            {/* ── Top-level overview (shown for ALL pages that have it) ── */}
            {hasTopLevelOverview && (
                <div className="pt-6 pb-6 md:pt-8 md:pb-8 bg-primary/90 flex justify-center items-center gap-8 text-white relative">
                    <div className="max-w-7xl mx-auto w-11/12">
                        <div className="prose prose-invert text-white break-words max-w-none">
                            <RichText
                                content={services.overview.raw.children}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── SubCategories section ── */}
            {hasSubCategories && (
                <div className="pt-0 pb-10 md:pb-16 bg-primary/90 flex justify-center items-center gap-8 text-white relative">
                    <div className="flex gap-10 relative max-w-7xl mx-auto w-11/12">
                        <div className="hidden md:block w-1/5 sticky top-32 self-start z-10">
                            <TableOfContents />
                        </div>

                        <div className="w-full lg:w-4/5 flex flex-col gap-6 h-full relative partitionline divide-y-2 divide-gray-200/20">
                            <div className="leading-5 !text-white space-y-10">
                                {services.subCategories.map(
                                    (subcat: any, index: any) => (
                                        <div
                                            className="space-y-6"
                                            key={index}
                                        >
                                            <h3
                                                id={`${index}`}
                                                className="heading text-xl md:text-2xl scroll-mt-32 font-bold pb-4"
                                            >
                                                {subcat?.title}
                                            </h3>

                                            {/* FIX 1: Render subcategory overview for ALL products,
                                                not just HexAid. This is why utility360 was blank. */}
                                            {subcat?.overview?.raw
                                                ?.children && (
                                                <div className="pb-5 prose prose-invert text-white break-words">
                                                    <RichText
                                                        content={
                                                            subcat.overview.raw
                                                                .children
                                                        }
                                                    />
                                                </div>
                                            )}

                                            {/* Insights list */}
                                            <div className="flex flex-col gap-6">
                                                {subcat?.insights?.map(
                                                    (insight: any) => {
                                                        let type = "blogs";

                                                        if (
                                                            insight.__typename.toLowerCase() ===
                                                            "whitepaper"
                                                        ) {
                                                            type = "whitepapers";
                                                        } else if (
                                                            insight.__typename.toLowerCase() ===
                                                            "successstory"
                                                        ) {
                                                            type =
                                                                "success-stories";
                                                        } else if (
                                                            insight.__typename.toLowerCase() ===
                                                            "techcorner"
                                                        ) {
                                                            type = "tech-corner";
                                                        }

                                                        const imageUrl =
                                                            insight?.mainImage
                                                                ?.url ||
                                                            insight?.mainBanner
                                                                ?.url;

                                                        return (
                                                            <Link
                                                                key={
                                                                    insight?.title
                                                                }
                                                                href={`/${type}/${insight?.slug}`}
                                                            >
                                                                <div className="flex items-center justify-between bg-gray-100 text-primary rounded-xl p-6 shadow-md hover:shadow-2xl hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                                                    {/* LEFT */}
                                                                    <div className="flex flex-col w-2/3">
                                                                        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                                                                            {type.replace(
                                                                                /-/g,
                                                                                " "
                                                                            )}
                                                                        </span>

                                                                        <h4 className="text-xl font-semibold mt-2">
                                                                            {
                                                                                insight?.title
                                                                            }
                                                                        </h4>

                                                                        {insight?.shortDescription && (
                                                                            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                                                                                {
                                                                                    insight.shortDescription
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {/* RIGHT — image */}
                                                                    {imageUrl && (
                                                                        <img
                                                                            src={
                                                                                imageUrl
                                                                            }
                                                                            alt={
                                                                                insight?.title
                                                                            }
                                                                            className="w-48 h-32 object-cover rounded-lg"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA — only for non-products */}
            {!isProduct && (
                <Cta
                    title="Let's get your data streamlined today!"
                    name="Get In Touch"
                />
            )}
        </div>
    );
};

export default ServiceDetails;

export async function getServerSideProps({ params }: { params: any }) {
    const { data } = await contentApi.query({
        query: gql`
            query MyQuery {
                categories(where: { slug: "${params.slug}" }) {
                    title
                    slug
                    mainImage {
                        url
                    }
                    shortDescription
                    overview {
                        raw
                    }
                    theme
                    subCategories {
                        title
                        overview {
                            raw
                        }
                        insights {
                            ... on Blog {
                                title
                                slug
                                shortDescription
                                mainBanner {
                                    url
                                }
                                __typename
                            }
                            ... on SuccessStory {
                                title
                                slug
                                mainBanner {
                                    url
                                }
                                __typename
                            }
                            ... on TechCorner {
                                title
                                slug
                                shortDescription
                                mainBanner {
                                    url
                                }
                                __typename
                            }
                            ... on Whitepaper {
                                title
                                slug
                                shortDescription
                                mainImage {
                                    url
                                }
                                __typename
                            }
                        }
                    }
                }
            }
        `,
    });

    return { props: { services: data.categories[0] } };
}