import React, { useRef, useState } from "react";
import Cta from "@/components/reusable/CTA";
import { contentApi } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  LightBulbIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { calculateReadingTime } from "@/components/reusable/readingTime";
import { paginate } from "@/components/reusable/throttled";
import ButtonLink, { ArrowIcon } from "@/components/ui/Button";
import HexPattern from "@/components/ui/HexPattern";
import SectionHeading from "@/components/ui/SectionHeading";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { CONTACT_URL } from "@/utils/navigation";
import fallbackBanner from "@/public/assets/Conference.jpg";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

// In the hero the CMS text is set as plain running copy, whatever its original styling.
const leadRenderers = {
  p: ({ children }: any) => <>{children} </>,
  italic: ({ children }: any) => <>{children}</>,
  bold: ({ children }: any) => <>{children}</>,
};

const benefits = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Exchange ideas",
    body: "Connect with other utilities and collaborate on key analytics and reporting issues.",
  },
  {
    icon: LightBulbIcon,
    title: "Share best practices",
    body: "Learn how peers leverage analytics to improve operations and manage restoration times.",
  },
  {
    icon: ChartBarIcon,
    title: "Improve outcomes",
    body: "Improve the customer experience and optimize circuit allocation with what you learn.",
  },
];

const pagerButton =
  "grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-40";

const Index = ({ Events, PastEvents }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;
  const pageCount = Math.ceil(PastEvents.length / pageSize);

  const paginatedEvents = paginate(PastEvents, currentPage, pageSize);
  // The CMS intro is one rich-text field: pull its webinar video and graphic out for the
  // screen, use the first paragraph as the lead, and keep any other text as the caption.
  const nodes: any[] = Events?.heroDescription?.raw?.children ?? [];
  const hasText = (node: any) => node?.children?.some((child: any) => child?.text?.trim());
  const video = nodes.find((node) => node.type === "video");
  const graphic = nodes.find((node) => node.type === "image");
  const textNodes = nodes.filter((node) => !["video", "image"].includes(node.type) && hasText(node));
  const [lead, ...captions] = textNodes;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-x-clip">
      <Head>
        <title>{`Utilities Analytics User Group - HEXstream's Industry Conference.`}</title>
        <meta
          name="description"
          content="Join HEXstream's Utilities Analytics User Group conference, where we discuss trends and advancements in the utility industry."
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
          <Image
            priority
            src={Events?.heroImage?.url ?? fallbackBanner}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-800/95 via-ink/80 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink-800/90 to-transparent" />
        <HexPattern className="-z-10 text-white/[0.07] [mask-image:linear-gradient(to_right,black,transparent_60%)]" />

        <div className="container-x flex min-h-[clamp(540px,78vh,720px)] items-center pb-16 pt-[130px]">
          <div className="max-w-3xl">
            <motion.nav
              {...rise(0)}
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur"
            >
              <Link href="/" className="text-white/70 transition-colors hover:text-white">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span>UAUG</span>
            </motion.nav>
            <div className="mt-6 overflow-hidden pb-2">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl xl:text-7xl"
              >
                Utilities Analytics{" "}
                <span className="whitespace-nowrap bg-gradient-to-r from-brand-400 to-[#FF8A8B] bg-clip-text text-transparent">
                  User Group
                </span>
              </motion.h1>
            </div>
            <motion.p {...rise(0.3)} className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              A community that connects utilities to collaborate on key analytics and reporting
              issues, exchange ideas and share best practices.
            </motion.p>
            <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={Events?.contactLink || CONTACT_URL}>Contact us</ButtonLink>
              {PastEvents.length > 0 && (
                <ButtonLink href="#past-events" variant="outlineLight">
                  Past events
                </ButtonLink>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The group's story and the latest webinar */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFF5F4] via-white to-mist py-20 sm:py-28">
        <HexPattern className="-z-10 text-ink/[0.07] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <motion.div
          className="absolute -top-40 left-[-8%] -z-10 h-[520px] w-[520px] rounded-full bg-brand/15 blur-[140px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-8%] -z-10 h-[520px] w-[520px] rounded-full bg-[#3B6BFF]/15 blur-[140px]"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-x">
          <SectionHeading align="center" eyebrow="About the group" title="Where utilities share what works" />
          {lead && (
            <Reveal
              delay={0.1}
              className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-ink/75 sm:text-lg"
            >
              <RichText content={[lead]} renderers={leadRenderers} />
            </Reveal>
          )}

          {(video || graphic) && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE }}
              className="mx-auto mt-12 max-w-5xl"
            >
              {captions.length > 0 && (
                <p className="mx-auto mb-5 max-w-3xl text-center text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-ink sm:text-sm">
                  <span className="relative mr-2.5 inline-flex h-2.5 w-2.5 align-middle">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
                  </span>
                  <RichText content={captions} renderers={leadRenderers} />
                </p>
              )}

              {/* The screen: the webinar graphic is the poster, the video plays in place */}
              <div className="relative">
                <div className="absolute -inset-x-6 -bottom-10 top-10 -z-10 rounded-[3rem] bg-gradient-to-r from-brand/35 via-[#3B6BFF]/35 to-brand/35 blur-3xl" />
                <div className="group/screen relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-ink-800 shadow-[0_40px_90px_-30px_rgba(12,31,102,0.55)]">
                  {video ? (
                    <>
                      <video
                        ref={videoRef}
                        controls={playing}
                        playsInline
                        preload="none"
                        controlsList="nodownload"
                        poster={graphic?.src}
                        title={video.title}
                        onPause={() => setPlaying(false)}
                        onPlay={() => setPlaying(true)}
                        className="aspect-video w-full bg-ink-800 object-cover"
                      >
                        <source src={video.src} />
                      </video>
                      {!playing && (
                        <button
                          type="button"
                          aria-label="Play the webinar"
                          onClick={() => videoRef.current?.play()}
                          className="absolute inset-0 grid place-items-center bg-ink-800/10 transition-colors duration-500 hover:bg-ink-800/35"
                        >
                          <span className="relative grid h-14 w-14 place-items-center sm:h-24 sm:w-24">
                            <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                            <span className="relative grid h-full w-full place-items-center rounded-full bg-brand text-white shadow-glow transition-transform duration-300 group-hover/screen:scale-110">
                              <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-6 w-6 sm:ml-1 sm:h-10 sm:w-10">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </span>
                        </button>
                      )}
                    </>
                  ) : (
                    <Image
                      src={graphic.src}
                      alt={graphic.title || "Utilities Analytics User Group"}
                      width={graphic.width || 1600}
                      height={graphic.height || 900}
                      className="h-auto w-full"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* What members do */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Why join" title="What members get from the group" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title} className="h-full">
                <div className="group/benefit relative h-full overflow-hidden rounded-3xl border border-ink/10 bg-mist p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:bg-white hover:shadow-lift">
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-400 transition-transform duration-500 group-hover/benefit:scale-x-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-card transition-all duration-300 group-hover/benefit:-rotate-6 group-hover/benefit:scale-110 group-hover/benefit:bg-brand group-hover/benefit:text-white">
                    <benefit.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink/70">{benefit.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Next meeting */}
      {Events.isEvent && (
        <section className="bg-deep relative isolate overflow-hidden py-20 text-white sm:py-28">
          <HexPattern className="-z-10 text-white/[0.07] [mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,black,transparent)]" />
          <div className="absolute -bottom-40 right-[-5%] -z-10 h-[420px] w-[420px] rounded-full bg-brand/40 blur-[130px]" />
          <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <SectionHeading dark eyebrow="Upcoming" title="Join us for our next meeting!" />
              <Stagger className="mt-8 space-y-3">
                {[
                  { label: "Topic", value: Events.eventName, icon: null },
                  { label: "Date", value: Events.eventDate, icon: CalendarDaysIcon },
                  { label: "Location", value: Events.eventLocation, icon: MapPinIcon },
                ]
                  .filter((row) => row.value)
                  .map((row) => (
                    <StaggerItem key={row.label}>
                      <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.14]">
                        <span className="w-11 shrink-0">
                          <span className="hex-pointy grid place-items-center bg-gradient-to-br from-brand-400 to-brand-600">
                            {row.icon ? (
                              <row.icon className="h-5 w-5" />
                            ) : (
                              <span className="font-display text-sm font-bold">#</span>
                            )}
                          </span>
                        </span>
                        <span>
                          <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                            {row.label}
                          </span>
                          <span className="mt-0.5 block font-display text-lg font-semibold">
                            {row.value}
                          </span>
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
              </Stagger>
            </div>
            <Reveal delay={0.1} className="lg:col-span-6">
              {Events?.shortContent && (
                <p className="text-lg leading-relaxed text-white/85">{Events.shortContent}</p>
              )}
              <ButtonLink
                href={Events?.contactLink || CONTACT_URL}
                variant="light"
                className="mt-8"
              >
                Contact us
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      )}

      {/* Past events */}
      {PastEvents.length > 0 ? (
        <section id="past-events" className="scroll-mt-24 bg-mist py-20 sm:py-28">
          <div className="container-x">
            <SectionHeading eyebrow="Archive" title="Past Events" />
            <Stagger
              key={currentPage}
              gap={0.06}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedEvents.map((event: any) => (
                <StaggerItem key={event?.slug} className="h-full">
                  <Link
                    href={`/uaug/${event?.slug}`}
                    className="group/card flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
                  >
                    <span className="relative block aspect-[2/1] overflow-hidden bg-ink-800">
                      {event?.eventBanner?.url && (
                        <Image
                          src={event.eventBanner.url}
                          alt={event?.eventTitle ?? ""}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-110"
                        />
                      )}
                      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-all duration-300 group-hover/card:bg-brand group-hover/card:text-white">
                        <ArrowIcon className="-rotate-45 transition-transform duration-300 group-hover/card:rotate-0" />
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="flex flex-wrap gap-2 text-xs font-medium text-ink/70">
                        {event?.eventDate && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1">
                            <CalendarDaysIcon className="h-3.5 w-3.5" />
                            {event.eventDate}
                          </span>
                        )}
                        {event?.eventLocation && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1">
                            <MapPinIcon className="h-3.5 w-3.5" />
                            {event.eventLocation}
                          </span>
                        )}
                      </span>
                      <span className="mt-4 block font-display text-xl font-semibold leading-snug text-ink transition-colors duration-300 group-hover/card:text-brand">
                        {event?.eventTitle}
                      </span>
                      <span className="mt-2 line-clamp-4 text-[15px] leading-relaxed text-ink/70">
                        {event.eventExcerpt}
                      </span>
                      <span className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-ink/60">
                          <ClockIcon className="h-4 w-4" />
                          {calculateReadingTime(event?.eventDetails?.text)} Minute Read
                        </span>
                        <span className="font-semibold text-ink transition-colors duration-300 group-hover/card:text-brand">
                          Read More
                        </span>
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            {pageCount > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className={pagerButton}
                >
                  <ArrowIcon className="rotate-180" />
                </button>
                <span className="font-display text-sm font-semibold tabular-nums text-ink">
                  {String(currentPage).padStart(2, "0")}
                  <span className="text-ink/45"> / {String(pageCount).padStart(2, "0")}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                  disabled={currentPage === pageCount}
                  aria-label="Next page"
                  className={pagerButton}
                >
                  <ArrowIcon />
                </button>
              </div>
            )}
          </div>
        </section>
      ) : null}

      <Cta title="Connect with us!" name="Get In Touch" />
    </div>
  );
};

export default Index;

export async function getServerSideProps() {
  const { data: PastEnvent, error: pError } = await contentApi.query({
    query: gql`
      query MyQuery {
        uaugEvents {
          eventTitle
          slug
          eventLocation
          eventDate
          eventExcerpt
          eventBanner {
            url
          }
          eventDetails {
            raw
            text
          }
        }
      }
    `,
  });

  if (!PastEnvent.uaugEvents.length && pError) {
    return {
      notFound: true,
    };
  }

  const { data, error } = await contentApi.query({
    query: gql`
      query MyQuery {
        events {
          isEvent
          eventName
          eventDate
          eventLocation
          eventDetails
          contactLink
          heroImage {
            url
          }
          shortContent
          eventBanner {
            url
            mimeType
          }
          heroDescription {
            raw
            text
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

  return {
    props: { Events: data.events[0], PastEvents: PastEnvent.uaugEvents },
  };
}
