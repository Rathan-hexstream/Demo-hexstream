import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Jamal from "@/public/assets/Jamal_2.jpg";
import Kartik from "@/public/assets/Karthik_Mada.jpg";
import Arun from "@/public/assets/Arun_Photo.jpg";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { EASE, Reveal } from "../ui/motion";

const teams = [
  {
    name: "Jamal Syed ",
    img: Jamal,
    designation: "President & CEO",
    linkedIn: "https://www.linkedin.com/in/jamal-syed-461a07/",
    description:
      "Jamal Syed has more than 30 years of experience in software development, data analytics and consulting, and has been involved with several technology startups. He keeps a keen eye on emerging technologies and advises utilities on digital transformation and process optimization. Jamal holds a bachelor’s degree in electrical engineering and master's degree in computer science.",
  },
  {
    name: "Karthik Mada",
    img: Kartik,
    designation: "CTO",
    linkedIn: "https://www.linkedin.com/in/karthikmada/",
    description:
        "Karthik Mada has been in the data analytics and integration space for more than two decades, working with major utilities in North America to design and implement  numerous analytics solutions related to outage management and grid reliability. Karthik is a trusted advisor to many large utilities, and frequently collaborates with the Oracle product-development team on utility-analytics solutions. Karthik holds a bachelor’s degree in industrial engineering & management and a master’s in business administration.",
  },
  {
    name: "Arun Kota",
    img: Arun,
    designation: "Vice President",
    linkedIn: "https://www.linkedin.com/in/arunkota/",
    description:
        "Arun Kota brings more than 20 years of expertise in data integration and analytics, with a proven track record of designing and delivering impactful solutions for the utilities, financial, retail and insurance industries. Arun partners closely with clients, helping them build solid data strategies using both traditional on-premises and cutting-edge cloud technologies.\n" +
        "\n" +
        "A frequent collaborator with Oracle's product-development team, Arun actively contributes to advancing utility analytics. His technical proficiency spans Oracle, Microsoft, Snowflake, and big-data technologies. \n" +
        "\n" +
        "Beyond just building solutions, Arun is passionate about ensuring that organizations can actually use their analytics investments effectively, providing hands-on user training and onboarding. Arun holds bachelor's and master's degrees in computer science.",
  },


];

const LinkedInIcon = () => (
  <svg aria-hidden viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4">
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const OurTeam = () => {
  const [active, setActive] = useState(0);
  const leader = teams[active];
  const name = leader.name.trim();

  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Leadership"
          title="The people leading HEXstream"
        />

        <Reveal className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Large portrait of the selected leader */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-800 shadow-lift">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image
                    alt={name}
                    src={leader.img}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-800/85 to-transparent" />
              <span className="absolute bottom-5 left-5 font-display text-sm font-semibold tabular-nums text-white">
                0{active + 1}
                <span className="text-white/50"> / 0{teams.length}</span>
              </span>
              <Link
                href={leader.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-white"
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-7">
            <div className="min-h-[19rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                    {leader.designation}
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                    {name}
                  </h3>
                  <p className="mt-6 whitespace-pre-line leading-relaxed text-ink/70">
                    {leader.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector */}
            <div className="mt-10 grid grid-cols-3 gap-3 lg:mt-auto lg:pt-10">
              {teams.map((team, i) => {
                const selected = i === active;
                return (
                  <button
                    key={team.name}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(i)}
                    className={`group/pick relative overflow-hidden rounded-2xl p-2 text-left transition-all duration-300 hover:-translate-y-1 ${
                      selected ? "bg-white shadow-lift" : "bg-white/60 hover:bg-white hover:shadow-card"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="leader-active"
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-400"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative block aspect-square overflow-hidden rounded-xl bg-ink-800">
                      <Image
                        alt=""
                        src={team.img}
                        fill
                        sizes="160px"
                        className={`object-cover object-top transition-all duration-500 group-hover/pick:scale-110 ${
                          selected ? "" : "grayscale"
                        }`}
                      />
                    </span>
                    <span
                      className={`mt-2.5 block px-1 font-display text-sm font-semibold transition-colors ${
                        selected ? "text-brand" : "text-ink"
                      }`}
                    >
                      {team.name.trim()}
                    </span>
                    <span className="block px-1 pb-1 text-xs text-ink/60">{team.designation}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default OurTeam;
