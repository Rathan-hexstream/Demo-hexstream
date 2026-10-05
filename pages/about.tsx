import Image from "next/image";
import Link from "next/link";
import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/outline";

import Approach from "@/components/about/Approach";
import Partners from "@/components/about/Partners";
import Achievements from "@/components/about/Achievements";
import OurTeam from "@/components/about/OurTeam";
import Cta from "@/components/reusable/CTA";
import ButtonLink from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import HexPattern from "@/components/ui/HexPattern";
import SectionHeading from "@/components/ui/SectionHeading";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { CONTACT_URL } from "@/utils/navigation";

import teamImg from "@/public/assets/HEX_Chicago.jpg";
import aboutUS from "@/public/assets/HEXstreamTeam.webp";

const offices = [
  { city: "Chicago", note: "Headquarters" },
  { city: "Boston", note: "United States" },
  { city: "Toronto", note: "Canada" },
  { city: "Hyderabad", note: "India" },
];

const facts = [
  { big: "2017", small: "Founded" },
  { big: "4", small: "Offices worldwide" },
  { big: "MBE", small: "Certified Minority Business Enterprise" },
];

const tones = {
  red: "bg-gradient-to-br from-brand-400 to-brand-600 text-white",
  blue: "bg-deep text-white",
  white: "bg-white text-ink",
};

const stats = [
  { to: 500, prefix: "$", suffix: "M+", label: "saved in energy costs for utility customers", tone: "blue" },
  { to: 125, suffix: "+", label: "projects successfully completed", tone: "white" },
  { to: 52, suffix: "M+", label: "customers who rely on the utilities we serve", tone: "red" },
  { to: 8, suffix: "/10", label: "of the largest North American utilities rely on HEXstream analytics", tone: "white" },
] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const About = () => {
  return (
    <div className="overflow-x-clip">
      <Head>
        <title>{`About HEXstream - Pioneers in Utility Data Analytics.`}</title>
        <meta
          name="description"
          content="Learn more about HEXstream, a pioneering company driving digital transformation in the utility industry through data analytics."
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
            src={aboutUS}
            alt="The HEXstream team"
            fill
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-800/95 via-ink/75 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink-800/90 to-transparent" />
        <HexPattern className="-z-10 text-white/[0.07] [mask-image:linear-gradient(to_right,black,transparent_60%)]" />

        <div className="container-x flex min-h-[clamp(600px,88vh,820px)] flex-col justify-end pb-10 pt-[130px] sm:pb-14">
          <div className="flex flex-1 items-center">
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
                <span>About us</span>
              </motion.nav>
              <div className="mt-6 overflow-hidden pb-2">
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                  className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl xl:text-7xl"
                >
                  Energizing lives through{" "}
                  <span className="bg-gradient-to-r from-brand-400 to-[#FF8A8B] bg-clip-text text-transparent">
                    utility data.
                  </span>
                </motion.h1>
              </div>
              <motion.p {...rise(0.3)} className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                We are the global leader for data integration and analytics for the utility industry,
                delivering AI-empowered solutions and loss-detection strategies across on-premises and
                cloud. HEXstream is certified a Minority Business Enterprise.
              </motion.p>
              <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={CONTACT_URL}>Talk to our team</ButtonLink>
                <ButtonLink href="/careers" variant="outlineLight">
                  Join us
                </ButtonLink>
              </motion.div>
            </div>
          </div>

          <motion.dl
            {...rise(0.55)}
            className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/20 backdrop-blur-md sm:grid-cols-3"
          >
            {facts.map((fact) => (
              <div
                key={fact.small}
                className="group/fact flex items-center gap-4 bg-ink-800/60 px-6 py-5 transition-colors duration-300 hover:bg-brand"
              >
                <dd className="font-display text-3xl font-extrabold transition-transform duration-300 group-hover/fact:scale-110">
                  {fact.big}
                </dd>
                <dt className="text-sm leading-snug text-white/80">{fact.small}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <Approach />

      {/* Numbers in hexagons */}
      <section className="bg-deep relative isolate overflow-hidden py-20 text-white sm:py-28">
        <HexPattern className="-z-10 text-white/[0.07] [mask-image:radial-gradient(ellipse_70%_80%_at_100%_0%,black,transparent)]" />
        <div className="absolute -bottom-40 left-[-5%] -z-10 h-[420px] w-[420px] rounded-full bg-brand/40 blur-[130px]" />
        <div className="container-x">
          <SectionHeading
            dark
            align="center"
            eyebrow="Our impact"
            title="The numbers tell the story"
            description="Since 2017, HEXstream has been energizing people's lives by helping utilities reach their operational efficiency and decarbonization goals through data insight."
          />
          <Stagger className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StaggerItem key={stat.label} className={i % 2 ? "lg:mt-14" : ""}>
                <div className="group/stat mx-auto flex max-w-[15rem] flex-col items-center text-center">
                  <div className="w-full drop-shadow-[0_18px_26px_rgba(4,10,40,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/stat:-translate-y-2 group-hover/stat:rotate-[6deg] group-hover/stat:scale-105">
                    <div
                      className={`hex-pointy grid place-items-center ${
                        stat.tone === "blue" ? "bg-white/10 text-white backdrop-blur" : tones[stat.tone]
                      }`}
                    >
                      <p className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                        <Counter to={stat.to} prefix={"prefix" in stat ? stat.prefix : ""} suffix={stat.suffix} />
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-white/75">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <OurTeam />

      {/* Video */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Meet HEXstream"
            title="An overview of who we are"
            description="Learn how we are energizing peoples’ lives by helping utilities achieve operational efficiency and zero-carbon footprints through data insights."
          />
          <Reveal delay={0.1} className="relative mx-auto mt-12 max-w-5xl">
            <div className="absolute -left-10 -top-10 -z-0 hidden w-32 opacity-90 sm:block">
              <div className="hex-pointy bg-gradient-to-br from-brand-400 to-brand-600" />
            </div>
            <div className="absolute -bottom-12 -right-10 -z-0 hidden w-40 sm:block">
              <div className="hex-pointy bg-deep" />
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-lift ring-1 ring-ink/10 sm:p-3">
              <video
                controls
                className="aspect-video w-full rounded-2xl bg-ink-800"
                controlsList="nodownload"
                playsInline
                preload="metadata"
              >
                <source src={"/assets/hexstream_overview.mp4"} type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      <Achievements />
      <Partners />

      {/* Culture */}
      <section className="bg-deep relative isolate overflow-hidden py-20 text-white sm:py-28">
        <HexPattern className="-z-10 text-white/[0.07] [mask-image:radial-gradient(ellipse_60%_80%_at_0%_100%,black,transparent)]" />
        <div className="absolute -top-40 right-[-5%] -z-10 h-[420px] w-[420px] rounded-full bg-brand/40 blur-[130px]" />

        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <SectionHeading dark eyebrow="Life at HEXstream" title="Our Culture" />
              <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-white/80">
                <p>
                  At HEXstream, we take pride in turning clients into friends and we work hard to
                  develop long-term relationships that are built upon integrity, collaboration, and
                  the delivery of value. Our team enjoys gathering at user conferences each year,
                  where we host in-person meetings of the Utility Analytics User Group and have been
                  known to throw great parties for old and new friends in the utility industry.
                </p>
                <p>
                  Our team works hard to provide exceptional service to all of our clients, and we
                  are always looking for talented people who share our passion for hard work, high
                  quality, and lasting relationships. If this sounds like a team you’d like to be
                  part of, please see our Careers page.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ButtonLink href="/careers" variant="light" className="mt-8">
                  See open roles
                </ButtonLink>
              </Reveal>
            </div>

            {/* Two overlapping photos that straighten up on hover */}
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="group/photos relative mx-auto max-w-xl pb-16 pr-10 sm:pr-16">
                <div className="relative aspect-[4/3] rotate-[-3deg] overflow-hidden rounded-3xl border-4 border-white shadow-lift transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photos:rotate-0">
                  <Image
                    src={teamImg}
                    alt="The HEXstream team in Chicago"
                    fill
                    sizes="(min-width: 1024px) 560px, 90vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover/photos:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 right-0 aspect-[4/3] w-1/2 rotate-[5deg] overflow-hidden rounded-2xl border-4 border-white shadow-lift transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photos:-translate-y-2 group-hover/photos:rotate-0">
                  <Image
                    src={aboutUS}
                    alt="The HEXstream team at the office"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <Stagger gap={0.07} className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {offices.map((office) => (
              <StaggerItem key={office.city}>
                <div className="group/office flex h-full items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white hover:bg-white">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 transition-all duration-300 group-hover/office:-rotate-6 group-hover/office:scale-110 group-hover/office:bg-brand">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold transition-colors duration-300 group-hover/office:text-ink">
                      {office.city}
                    </span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/60 transition-colors duration-300 group-hover/office:text-brand">
                      {office.note}
                    </span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Cta name="Get in touch" title="Let's get your data streamlined today" />
    </div>
  );
};

export default About;
