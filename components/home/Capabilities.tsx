import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowIcon } from "../ui/Button";
import HexPattern from "../ui/HexPattern";
import SectionHeading from "../ui/SectionHeading";
import { EASE, Reveal } from "../ui/motion";
import { analytics, managedServices, oracle, products } from "@/utils/navigation";

const pillars = [products, oracle, analytics, managedServices];

const Capabilities = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="One partner across the utility data stack"
            description="From packaged products to Oracle platforms and day-to-day operations, HEXstream turns streams of operational data into intelligence your teams can act on."
          />
          <Reveal delay={0.1} className="hidden shrink-0 text-sm font-medium text-ink/50 lg:block">
            Hover a panel to explore
          </Reveal>
        </div>

        {/* Expanding panels: the active one opens wide, the rest fold down to a spine. */}
        <Reveal className="mt-12 flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {pillars.map((pillar, i) => {
            const open = i === active;
            const number = `0${i + 1}`;
            return (
              <div
                key={pillar.label}
                onMouseEnter={() => setActive(i)}
                style={{ flexGrow: open ? 9 : 1 }}
                className={`group/panel relative isolate overflow-hidden lg:basis-0 rounded-3xl transition-[flex-grow,box-shadow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "bg-deep text-white shadow-lift" : "bg-mist text-ink hover:bg-brand-50"
                }`}
              >
                {open && (
                  <>
                    <HexPattern className="-z-10 text-white/[0.08] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]" />
                    <motion.div
                      className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-brand/60 blur-[100px]"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </>
                )}

                {/* Folded spine (and the tap target on touch screens) */}
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex w-full items-center gap-4 p-6 text-left lg:absolute lg:inset-0 lg:flex-col lg:items-center lg:justify-between lg:px-0 lg:py-7 ${
                    open ? "lg:pointer-events-none lg:opacity-0" : ""
                  } transition-opacity duration-300`}
                >
                  <span
                    className={`font-display text-sm font-bold tabular-nums ${
                      open ? "text-white/60" : "text-brand"
                    }`}
                  >
                    {number}
                  </span>
                  <span className="flex-1 font-display text-xl font-semibold lg:flex-none lg:rotate-180 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]">
                    {pillar.label}
                  </span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                      open
                        ? "rotate-45 bg-white/15"
                        : "bg-white text-ink shadow-card group-hover/panel:bg-brand group-hover/panel:text-white"
                    }`}
                  >
                    <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto", transition: { duration: 0.5, ease: EASE, delay: 0.15 } }}
                      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                      className="overflow-hidden lg:!h-full"
                    >
                      <div className="flex h-full flex-col px-6 pb-6 lg:p-10">
                        <div className="hidden items-baseline gap-4 lg:flex">
                          <span className="font-display text-sm font-bold tabular-nums text-white/60">
                            {number}
                          </span>
                          <h3 className="font-display text-3xl font-bold tracking-tight xl:text-4xl">
                            {pillar.label}
                          </h3>
                        </div>
                        <p className="max-w-md text-base text-white/75 lg:mt-3 lg:text-lg">
                          {pillar.tagline}
                        </p>

                        <motion.ul
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
                          }}
                          className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:mt-auto lg:w-[44rem] lg:max-w-full xl:w-[52rem]"
                        >
                          {pillar.links.map((link) => (
                            <motion.li
                              key={link.name}
                              variants={{
                                hidden: { opacity: 0, y: 18 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                              }}
                            >
                              <Link
                                href={link.href}
                                className="group/card relative flex h-full items-start gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:shadow-lift"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block font-display text-base font-semibold transition-colors duration-300 group-hover/card:text-ink">
                                    {link.name}
                                  </span>
                                  <span className="mt-1 block text-[13px] leading-snug text-white/70 transition-colors duration-300 group-hover/card:text-ink/65">
                                    {link.description}
                                  </span>
                                </span>
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-brand">
                                  <ArrowIcon className="-rotate-45 transition-transform duration-300 group-hover/card:rotate-0" />
                                </span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

export default Capabilities;
