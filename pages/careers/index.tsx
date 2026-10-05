import client from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  BoltIcon,
  BriefcaseIcon,
  CpuChipIcon,
  GlobeAmericasIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import Cta from "@/components/reusable/CTA";
import ButtonLink, { ArrowIcon } from "@/components/ui/Button";
import HexPattern from "@/components/ui/HexPattern";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import banner from "@/public/assets/China-Europes-biggest-onshore-wind-park-Ukraine-.jpg";

interface Job {
  jobTitle: string;
  slug: string;
  location?: string | null;
  workExperience?: string | null;
}

const reasons = [
  {
    icon: BoltIcon,
    title: "Work that matters",
    body: "Help utilities achieve operational efficiency and zero-carbon footprints through data insights.",
  },
  {
    icon: HeartIcon,
    title: "Clients become friends",
    body: "We build long-term relationships on integrity, collaboration, and the delivery of value.",
  },
  {
    icon: CpuChipIcon,
    title: "Leading-edge technology",
    body: "Build analytics on Oracle, Microsoft, Snowflake, Databricks and AI platforms for the largest utilities in North America.",
  },
  {
    icon: GlobeAmericasIcon,
    title: "A global team",
    body: "Headquartered in Chicago, with offices in Boston, Toronto, and Hyderabad, India.",
  },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const getJobList = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query MyQuery {
              jobListingsConnection {
                edges {
                  node {
                    jobTitle
                    slug
                    location
                    workExperience
                  }
                }
              }
            }
          `,
        });
        if (!cancelled) {
          setJobs((data?.jobListingsConnection?.edges ?? []).map((edge: any) => edge.node));
        }
      } catch (err) {
        console.log("CAREERS LIST ERROR:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    getJobList();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="overflow-x-clip">
      <Head>
        <title>{`Join HEXstream - Careers in Utility Data Analytics.`}</title>
        <meta
          name="description"
          content="Start your career in utility data analytics with HEXstream. Explore our job listings and join our team of experts."
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
          <Image priority src={banner} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-800/95 via-ink/75 to-ink/25" />
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
              <span>Careers</span>
            </motion.nav>
            <div className="mt-6 overflow-hidden pb-2">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl xl:text-7xl"
              >
                Build the future of{" "}
                <span className="bg-gradient-to-r from-brand-400 to-[#FF8A8B] bg-clip-text text-transparent">
                  utility data
                </span>{" "}
                with us.
              </motion.h1>
            </div>
            <motion.p {...rise(0.3)} className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              We are always looking for talented people who share our passion for hard work, high
              quality, and lasting relationships. If that sounds like a team you&apos;d like to be
              part of, we&apos;d love to hear from you.
            </motion.p>
            <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#openings">View open roles</ButtonLink>
              <ButtonLink href="/about" variant="outlineLight">
                About HEXstream
              </ButtonLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why HEXstream"
            title="A team you'll want to be part of"
            description="We are the global leader for data integration and analytics for the utility industry, and our exceptional team is our strength."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <StaggerItem key={reason.title} className="h-full">
                <TiltCard className="h-full overflow-hidden rounded-3xl border border-ink/10 bg-mist p-7 transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-lift">
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-400 transition-transform duration-500 group-hover/tilt:scale-x-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-card transition-all duration-300 group-hover/tilt:-rotate-6 group-hover/tilt:scale-110 group-hover/tilt:bg-brand group-hover/tilt:text-white">
                    <reason.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">{reason.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink/70">{reason.body}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="scroll-mt-24 bg-mist py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Open roles" title="Our current openings" />
            {!loading && jobs.length > 0 && (
              <Reveal className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-card">
                {jobs.length} open {jobs.length === 1 ? "role" : "roles"}
              </Reveal>
            )}
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="space-y-3" aria-busy="true" aria-label="Loading openings">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-24 animate-pulse rounded-3xl bg-white" />
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <Stagger gap={0.06} className="space-y-3">
                {jobs.map((job, i) => (
                  <StaggerItem key={job.slug}>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="group/job relative isolate flex flex-col gap-4 overflow-hidden rounded-3xl bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:flex-row sm:items-center sm:gap-6 sm:p-7"
                    >
                      {/* Blue floods in from the left on hover */}
                      <span className="bg-deep absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/job:scale-x-100" />
                      <span className="hidden font-display text-sm font-bold tabular-nums text-brand transition-colors duration-300 group-hover/job:text-white/60 sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover/job:text-white sm:text-2xl">
                          {job.jobTitle}
                        </span>
                        <span className="mt-2.5 flex flex-wrap gap-2 text-sm">
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-ink/75 transition-colors duration-300 group-hover/job:bg-white/15 group-hover/job:text-white">
                              <MapPinIcon className="h-4 w-4" />
                              {job.location}
                            </span>
                          )}
                          {job.workExperience && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-ink/75 transition-colors duration-300 group-hover/job:bg-white/15 group-hover/job:text-white">
                              <BriefcaseIcon className="h-4 w-4" />
                              {job.workExperience}
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-3 text-sm font-semibold text-ink transition-colors duration-300 group-hover/job:text-white">
                        Know More
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-ink transition-all duration-300 group-hover/job:scale-110 group-hover/job:bg-brand group-hover/job:text-white">
                          <ArrowIcon className="-rotate-45 transition-transform duration-300 group-hover/job:rotate-0" />
                        </span>
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <Reveal>
                <div className="relative isolate overflow-hidden rounded-3xl bg-white px-6 py-14 text-center shadow-card sm:px-12">
                  <HexPattern className="-z-10 text-brand/[0.1] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                  <div className="mx-auto w-16 drop-shadow-[0_12px_18px_rgba(235,44,46,0.35)]">
                    <div className="hex-pointy grid place-items-center bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                      <BriefcaseIcon className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">
                    No open roles right now
                  </h3>
                  <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink/70">
                    We don&apos;t have any openings listed at the moment, but we are always glad to
                    hear from talented people. Send us a note and tell us how you&apos;d like to
                    contribute.
                  </p>
                  <ButtonLink href="mailto:info@hexstream.com" className="mt-7">
                    info@hexstream.com
                  </ButtonLink>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <Cta title={"Connect with us!"} name={"Get In Touch"} />
    </div>
  );
};

export default Index;
