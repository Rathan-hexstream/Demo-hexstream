import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

const values = [
  {
    title: "Our Vision & Mission",
    body: "Energizing peoples’ lives by helping utilities achieve operational efficiency and zero-carbon footprints through data insights.",
  },
  {
    title: "Our Core Values",
    body: "HEXstream is named after the most stable geometric shape in nature, the hexagon. Historically, the hexagon is a symbol of harmony and balance. The second part of the name, ‘stream,’ represents the flow of data in real time.",
  },
  {
    title: "Why We Started",
    body: "We started this company with one goal in mind: to build cutting-edge, stable, and scalable analytics solutions for our clients that meet their evolving needs using data as a single version of truth. We provide a broad range of services and solutions in strategy, consulting, digital, technology, and operations, combining unmatched experience and specialized skills.",
  },
];

const Approach = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-28">
      {/* Oversized hexagon outline behind the statement */}
      <svg
        aria-hidden
        viewBox="0 0 100 115.47"
        className="absolute left-1/2 top-10 -z-10 w-[min(46rem,120vw)] -translate-x-1/2 text-brand/10"
      >
        <path d="M50 1 99 29.4v56.7L50 114.5 1 86.1V29.4Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <path d="M50 12 89.5 34.9v45.7L50 103.5 10.5 80.6V34.9Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
      </svg>

      <div className="container-x">
        <SectionHeading align="center" eyebrow="Our approach" title="Experience meets data expertise" />
        <Reveal delay={0.1} className="mx-auto mt-8 max-w-4xl text-center">
          <p className="font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">
            At HEXstream, we bring together years of experience partnering with global utility
            giants and a deep understanding of the data and technology sphere. This unique blend
            results in unprecedented insights, delivered swiftly and cost-effectively, that
            revolutionize utility operations like never before.{" "}
            <span className="text-brand">
              Our exceptional team is our strength; we don&apos;t just acquire new clients, we
              foster friendships.
            </span>
          </p>
        </Reveal>

        {/* Each value hangs from a hexagon that straddles the card's top edge */}
        <Stagger className="mt-24 grid gap-x-6 gap-y-16 lg:grid-cols-3">
          {values.map((value, i) => (
            <StaggerItem key={value.title} className="h-full">
              <div className="group/value relative h-full rounded-3xl border border-ink/10 bg-mist px-7 pb-8 pt-16 text-center transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:bg-white hover:shadow-lift">
                <div className="absolute -top-11 left-1/2 w-[5.25rem] -translate-x-1/2 drop-shadow-[0_12px_18px_rgba(235,44,46,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/value:rotate-[60deg] group-hover/value:scale-110">
                  <div className="hex-pointy grid place-items-center bg-gradient-to-br from-brand-400 to-brand-600">
                    <span className="font-display text-xl font-bold text-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/value:-rotate-[60deg]">
                      0{i + 1}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/70">{value.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Approach;
