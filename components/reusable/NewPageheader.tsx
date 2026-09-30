import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Link from "next/link";

interface NewPageheaderProps {
    img?: StaticImageData;
    title: string;
    description?: string;
    richText?: any;
    aboutClient?: any;
    type?: string;
    showButton?: boolean;
    isHexAid?: boolean;
}

function NewPageheader({
                           img,
                           title,
                           description,
                           richText,
                           aboutClient,
                           type,
                           showButton,
                           isHexAid
                       }: NewPageheaderProps) {

    // ===== VIDEO MODAL STATE =====
    const [openVideo, setOpenVideo] = useState(false);

    // ESC close support
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenVideo(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            <div className="relative lg:overflow-hidden bg-prime flex justify-between context-innter-pages">
                <div className="bg-prime pb-8 sm:pb-8">
                    <svg
                        className="absolute inset-y-0 -right-24 hidden h-full w-52 fill-prime translate-x-1/2 transform text-accent lg:block"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="-50000,0 100,0 50,100" />
                    </svg>

                    <div className="">
                        <main className="mx-auto max-w-7xl sm:pt-14 md:px-4 lg:px-8">

                            {/* Mobile Background Image */}
                            <div className="sm:absolute lg:hidden top-0 left-0 -z-10 h-full w-full overflow-clip">
                                <div className="sm:absolute top-0 left-0 w-full h-full" />
                                {img && !isHexAid && (
                                    <Image
                                        alt="Pageheader Image"
                                        src={img}
                                        className="w-full h-full brightness-50"
                                        width={1200}
                                        height={1200}
                                    />
                                )}
                            </div>

                            {/* Text + Button */}
                            <div className="flex justify-between items-center w-full">
                                <div className="text-center lg:text-left w-15/12 mx-auto">

                                    {type && (
                                        <div className="pb-3">
                                    <span className="bg-primary/80 rounded-full px-3 py-1 text-white text-sm">
                                      {type}
                                    </span>
                                        </div>
                                    )}

                                    <h1 className="text-2xl font-bold tracking-tight !text-primary lg:!text-primary sm:text-3xl">
                                        <span className="block xl:inline">{title}</span>
                                    </h1>

                                    {description && (
                                        <p className="mt-3 text-base !text-primary lg:!text-primary sm:mx-auto sm:max-w-xl sm:text-lg md:text-xl lg:mx-0">
                                            {description}
                                        </p>
                                    )}

                                    {richText && (
                                        <div className="mt-4 prose prose-teal leading-relaxed !text-primary sm:!text-white lg:!text-primary">
                                            <RichText content={richText} />
                                        </div>
                                    )}

                                    {aboutClient && (
                                        <div>
                                            <h2 className="md:text-4xl text-2xl font-bold !text-primary sm:!text-white lg:!text-primary pt-4">
                                                About the Client
                                            </h2>
                                            <div className="md:prose prose-teal leading-5 !text-primary sm:!text-white lg:!text-primary lg:text-left text-center">
                                                <RichText content={aboutClient} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {showButton && (
                                    <div className="mt-6 lg:mt-0 lg:ml-6 flex justify-center lg:justify-start flex-shrink-0">
                                        <Link
                                            href="https://forms.office.com/r/zg0U7ZmsdF"
                                            target="_blank"
                                            className="px-6 py-3 rounded-lg contact-cta text-white font-medium hover:bg-blue-700 transition"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>

                {/* ================= RIGHT MEDIA PANEL ================= */}
                <div className="lg:block lg:inset-y-0 lg:right-0 lg:w-1/2">

                    {/* HEXAID VIDEO (CLICKABLE BACKGROUND) */}
                    {isHexAid && (
                        <div
                            className="relative w-full h-56 sm:h-72 md:h-96 lg:h-full overflow-hidden cursor-pointer"
                            onClick={() => setOpenVideo(true)}
                        >
                            <iframe
                                src="https://player.vimeo.com/video/1165705101?h=a4fff6404a&autoplay=1&muted=1&loop=1&background=1&controls=0&title=0&byline=0&portrait=0"
                                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                            />

                            {/* overlay play button */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition">
                                    <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* UTILITY360 VIDEO */}
                    {!isHexAid && img && title === "Utility360" && (
                        <div className="mt-5 mb-5 content-center relative w-[550px] h-[360px]">
                            <iframe
                                src="https://player.vimeo.com/video/1182058635?h=a4fff6404a&autoplay=1&loop=1&controls=1&title=0&byline=0&portrait=0"
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    {/* NORMAL IMAGE */}
                    {!isHexAid && img && title !== "Utility360" && (
                        <Image
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full image-custom"
                            src={img}
                            alt={title}
                            width={400}
                            height={300}
                        />
                    )}
                </div>
            </div>

            {/* ===== FULLSCREEN VIDEO MODAL ===== */}
            {openVideo && (
                <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
                    <button
                        onClick={() => setOpenVideo(false)}
                        className="absolute top-5 right-5 text-white text-4xl font-bold hover:scale-110"
                    >
                        ✕
                    </button>

                    <div className="w-[95%] md:w-[85%] lg:w-[75%] aspect-video">
                        <iframe
                            src="https://player.vimeo.com/video/1165705101?h=a4fff6404a&autoplay=1"
                            className="w-full h-full rounded-xl"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default NewPageheader;