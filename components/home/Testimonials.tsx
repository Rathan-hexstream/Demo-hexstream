import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowIcon } from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import { EASE, Reveal } from "../ui/motion";

interface Testimonial {
  name: string;
  review: string;
  designation?: string | null;
  company?: string | null;
}

const AUTOPLAY_MS = 8000;
const SWIPE_DISTANCE = 60;

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
};

const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = testimonials?.length ?? 0;

  const paginate = (dir: number) =>
    setState(([i]) => [(i + dir + count) % count, dir]);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = setTimeout(() => setState(([i]) => [(i + 1) % count, 1]), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, count]);

  if (!count) return null;
  const item = testimonials[index];
  const role = [item.designation, item.company]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-4">
          <SectionHeading
            eyebrow="Testimonials"
            title="What people say about us"
            description="Learn how we've made a positive impact in the utilities domain."
          />
          {count > 1 && (
            <Reveal delay={0.1} className="mt-8 flex items-center gap-4 lg:mt-auto lg:pt-10">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => paginate(-1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowIcon className="rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => paginate(1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowIcon />
              </button>
              <span className="text-sm font-medium tabular-nums text-ink/50">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </Reveal>
          )}
        </div>

        <Reveal
          delay={0.1}
          className="lg:col-span-8"
        >
          <div
            className="relative overflow-hidden rounded-3xl bg-mist p-8 ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-lift sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <svg
              aria-hidden
              viewBox="0 0 48 36"
              fill="currentColor"
              className="h-9 w-12 text-brand"
            >
              <path d="M0 36V21.6C0 9.6 6.4 2.4 19.2 0l1.8 5.4c-6 1.6-9 4.8-9 9.6h8.4v21zm27 0V21.6C27 9.6 33.4 2.4 46.2 0L48 5.4c-6 1.6-9 4.8-9 9.6h8.4v21z" />
            </svg>

            <div className="mt-8 min-h-[22rem] sm:min-h-[15rem]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: EASE }}
                  drag={count > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_DISTANCE) paginate(1);
                    else if (info.offset.x > SWIPE_DISTANCE) paginate(-1);
                  }}
                  className={count > 1 ? "cursor-grab active:cursor-grabbing" : ""}
                >
                  <blockquote className="font-display text-lg font-medium leading-relaxed text-ink sm:text-xl lg:text-[1.375rem] lg:leading-[1.6]">
                    {item.review?.trim()}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-semibold text-white">
                      {item.name?.trim().charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{item.name}</span>
                      {role && <span className="block text-sm text-ink/60">{role}</span>}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
