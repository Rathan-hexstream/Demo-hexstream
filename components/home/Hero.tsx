import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";

import ButtonLink, { ArrowIcon } from "../ui/Button";
import HexPattern from "../ui/HexPattern";
import { EASE, Reveal } from "../ui/motion";
import { CONTACT_URL, toInternalHref } from "@/utils/navigation";

interface HeroSlide {
  title?: string;
  heroLink?: string;
  banner?: { url: string };
}

const SLIDE_SECONDS = 6;

/** Full-width banner carousel driven by the CMS hero section. */
const Banner = ({ slides }: { slides: HeroSlide[] }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const count = slides.length;

  const goTo = (next: number) => {
    progress.set(0);
    setIndex((next + count) % count);
  };

  useEffect(() => {
    if (count < 2 || paused) return;
    const controls = animate(progress, 1, {
      duration: SLIDE_SECONDS * (1 - progress.get()),
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setIndex((i) => (i + 1) % count);
      },
    });
    return () => controls.stop();
  }, [index, paused, count, progress]);

  const slide = slides[index];
  const href = slide.heroLink ? toInternalHref(slide.heroLink) : null;
  // Untitled slides carry their own artwork (a logo or lettered graphic), so show it whole and unwashed.
  const bare = !slide.title;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured stories"
      className="relative isolate h-[clamp(560px,84vh,820px)] overflow-hidden bg-ink-800 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Image: crossfades between slides with a slow push-in */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 -z-20 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: SLIDE_SECONDS + 2, ease: "easeOut" }}
          >
            <Image
              src={slide.banner!.url}
              alt={slide.title || "Featured story from HEXstream"}
              fill
              priority={index === 0}
              sizes="100vw"
              className={
                bare
                  ? "object-contain px-[8%] pb-32 pt-28"
                  : "object-cover object-center"
              }
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Brand-blue wash keeps the headline readable over any photo */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-r from-ink-800/95 via-ink/70 to-ink/10 transition-opacity duration-700 ${
          bare ? "opacity-0" : ""
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 -z-10 bg-gradient-to-t to-transparent ${
          bare ? "h-56 from-ink-800 via-ink-800/90" : "h-1/2 from-ink-800/80"
        }`}
      />
      {!bare && (
        <HexPattern className="-z-10 text-white/[0.07] [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
      )}

      <div className="container-x flex h-full flex-col justify-end pb-10 pt-[108px] sm:pb-14">
        <div
          className={`flex flex-1 ${bare ? "items-end pb-6" : "items-center"}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              className="max-w-3xl"
            >
              {!bare && (
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  Featured
                </motion.p>
              )}
              {slide.title && (
                <div className="mt-6 overflow-hidden pb-2">
                  <motion.h2
                    variants={{ hidden: { y: "105%" }, show: { y: 0 } }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight drop-shadow-sm sm:text-6xl xl:text-7xl"
                  >
                    {slide.title}
                  </motion.h2>
                </div>
              )}
              {href && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className={bare ? "" : "mt-8"}
                >
                  <ButtonLink href={href} className="!px-7 !py-3.5 !text-base">
                    Learn More
                  </ButtonLink>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="flex items-center gap-5">
            <span className="font-display text-sm font-semibold tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/50">
                {" "}
                / {String(count).padStart(2, "0")}
              </span>
            </span>
            <div className="flex flex-1 gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="group/seg flex h-6 flex-1 items-center"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30 transition-all duration-300 group-hover/seg:h-[6px] group-hover/seg:bg-white/60">
                    {i < index && (
                      <span className="absolute inset-0 bg-white/70" />
                    )}
                    {i === index && (
                      <motion.span
                        className="absolute inset-0 origin-left rounded-full bg-brand"
                        style={{ scaleX: progress }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex shrink-0 gap-2">
              {[
                { label: "Previous slide", step: -1, flip: true },
                { label: "Next slide", step: 1, flip: false },
              ].map(({ label, step, flip }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => goTo(index + step)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand"
                >
                  <ArrowIcon className={flip ? "rotate-180" : ""} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/** Company introduction that sits directly under the banner. */
const Intro = ({ standalone }: { standalone: boolean }) => (
  <section
    className={`relative isolate overflow-hidden bg-gradient-to-b from-[#FFF5F4] to-white ${
      standalone ? "pb-16 pt-[140px]" : "py-16 sm:py-20"
    }`}
  >
    <HexPattern className="-z-10 text-ink/[0.06] [mask-image:radial-gradient(ellipse_60%_90%_at_90%_10%,black,transparent)]" />
    <div className="container-x grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
      <Reveal className="lg:col-span-7">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          <span className="hidden h-px w-6 bg-current sm:block" />
          Data integration &amp; analytics for utilities
        </p>
        <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-6xl">
          Utility data, turned into{" "}
          <span className="bg-gradient-to-r from-brand-600 via-brand to-brand-400 bg-clip-text text-transparent">
            real-time decisions.
          </span>
        </h1>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-5">
        <p className="text-base leading-relaxed text-ink/70 sm:text-lg">
          HEXstream is the leader in data integration and analytics for the
          utility industry. We connect your operational systems into one
          trusted, real-time view, so your teams can run a safer, more reliable
          and more efficient network.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={CONTACT_URL}>Talk to our team</ButtonLink>
          <ButtonLink href="/products/utility360" variant="outline">
            Explore Utility360
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  </section>
);

export default function Hero({ heroData }: { heroData?: HeroSlide[] }) {
  const slides = (heroData ?? []).filter((s) => s?.banner?.url);
  return (
    <>
      {slides.length > 0 && <Banner slides={slides} />}
      <Intro standalone={slides.length === 0} />
    </>
  );
}
