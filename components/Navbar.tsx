import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import logo from "../public/assets/bigHeaderLogo.png";
import ButtonLink, { ArrowIcon } from "./ui/Button";
import HexPattern from "./ui/HexPattern";
import { EASE } from "./ui/motion";
import { CONTACT_URL, mainNav, type NavGroup } from "@/utils/navigation";

// Regular hexagon in a 100x100 box, matching the logo mark.
const HEX_PATH = "M50 3 91 26.5v47L50 97 9 73.5v-47Z";

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
  >
    <path d="m5 7.5 5 5 5-5" />
  </svg>
);

/** Contents of the mega panel for one navigation group. */
const MegaContent = ({ group }: { group: NavGroup }) => (
  <motion.div
    key={group.label}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
    transition={{ duration: 0.3, ease: EASE }}
    className="grid grid-cols-12 gap-3"
  >
    <div className="bg-deep relative isolate col-span-4 flex flex-col overflow-hidden rounded-2xl p-7 text-white">
      <HexPattern className="-z-10 text-white/[0.08] [mask-image:linear-gradient(to_top,black,transparent_80%)]" />
      <div className="absolute -right-12 -top-16 -z-10 h-44 w-44 rounded-full bg-brand/50 blur-[70px]" />
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute -bottom-16 -right-16 -z-10 h-64 w-64 text-white/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <path
          d={HEX_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d={HEX_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          transform="translate(18 18) scale(0.64)"
        />
      </motion.svg>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        {group.label}
      </p>
      <p className="mt-3 font-display text-2xl font-bold leading-snug">
        {group.tagline}
      </p>
      <ButtonLink
        href={CONTACT_URL}
        variant="light"
        className="mt-auto w-fit !px-5 !py-2.5"
      >
        Talk to our team
      </ButtonLink>
    </div>

    <div className="relative isolate col-span-8 overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-brand-50 p-2">
      <HexPattern
        scale={1.1}
        className="-z-10 text-brand/[0.14] [mask-image:radial-gradient(ellipse_75%_90%_at_100%_100%,black,transparent)]"
      />
      <HexPattern
        scale={1.1}
        className="-z-10 text-ink/[0.07] [mask-image:radial-gradient(ellipse_50%_70%_at_0%_0%,black,transparent)]"
      />
      <motion.span
        aria-hidden
        className="hexagon absolute -bottom-14 -right-10 -z-10 !h-48 !w-48 bg-gradient-to-br from-brand/25 to-brand-400/5"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ul
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
        }}
        className="grid auto-rows-min grid-cols-2 gap-1"
      >
        {group.links.map((link) => (
          <motion.li
            key={link.name}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease: EASE },
              },
            }}
          >
            <Link
              href={link.href}
              className="group/link flex items-start gap-3.5 rounded-xl p-3.5 transition-colors duration-300 hover:bg-white hover:shadow-card"
            >
              <span className="hexagon grid !h-11 !w-11 shrink-0 place-items-center bg-gradient-to-br from-brand to-brand-600 font-display text-sm font-bold text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:rotate-[60deg] group-hover/link:scale-110">
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-rotate-[60deg]">
                  {link.name.charAt(0)}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                  {link.name}
                  <ArrowIcon className="-translate-x-2 text-brand opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                </span>
                {link.description && (
                  <span className="mt-0.5 block text-[13px] leading-snug text-ink/60">
                    {link.description}
                  </span>
                )}
              </span>
            </Link>
            {link.children && (
              <div className="flex flex-wrap gap-1.5 pb-2 pl-[4.5rem] pr-3">
                {link.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className="rounded-full border border-ink/15 px-2.5 py-1 text-xs font-medium text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </motion.div>
);

const MobileGroup = ({ group }: { group: NavGroup }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between py-4 text-left font-display text-lg font-semibold transition-colors ${
          open ? "text-brand" : "text-ink"
        }`}
      >
        {group.label}
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            {group.links.map((link) => (
              <li key={link.name} className="pb-3">
                <Link
                  href={link.href}
                  className="block py-1 text-[15px] font-medium text-ink/75"
                >
                  {link.name}
                </Link>
                {link.children && (
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close every menu on navigation.
  useEffect(() => {
    const close = () => {
      setOpenMenu(null);
      setMobileOpen(false);
    };
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const enter = (label: string, group: boolean) => {
    cancelClose();
    setHovered(label);
    setOpenMenu(group ? label : null);
  };
  const leaveSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setHovered(null);
    }, 160);
  };

  const isActive = (href: string) => router.asPath.split("?")[0] === href;
  const openGroup = mainNav.find(
    (entry) => entry.kind === "group" && entry.group.label === openMenu,
  );
  const itemClass =
    "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium text-ink transition-colors";
  const pill = (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-0 rounded-full bg-ink/[0.07]"
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
    />
  );

  return (
    <>
      {/* Dims the page behind an open menu */}
      <AnimatePresence>
        {(openGroup || mobileOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50 pt-3">
        <div className="container-x" onMouseLeave={leaveSoon}>
          <nav
            aria-label="Top"
            className={`relative flex h-16 items-center justify-between gap-6 rounded-2xl bg-white/90 pl-5 pr-3 ring-1 backdrop-blur-xl transition-shadow duration-300 ${
              scrolled || openGroup || mobileOpen
                ? "shadow-lift ring-ink/10"
                : "shadow-card ring-ink/[0.06]"
            }`}
          >
            <Link
              href="/"
              className="shrink-0 transition-transform duration-300 hover:scale-105"
              aria-label="HEXstream home"
            >
              <Image
                priority
                src={logo}
                alt="HEXstream"
                width={120}
                height={50}
                className="h-auto w-[110px] sm:w-[120px]"
              />
            </Link>

            {/* Desktop */}
            <div className="hidden items-center lg:flex">
              {mainNav.map((entry) => {
                if (entry.kind === "link") {
                  return (
                    <Link
                      key={entry.label}
                      href={entry.href}
                      onMouseEnter={() => enter(entry.label, false)}
                      className={`${itemClass} ${isActive(entry.href) ? "!text-brand" : ""}`}
                    >
                      {hovered === entry.label && pill}
                      <span className="relative">{entry.label}</span>
                    </Link>
                  );
                }
                const { label } = entry.group;
                const open = openMenu === label;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onMouseEnter={() => enter(label, true)}
                    onClick={() =>
                      open ? setOpenMenu(null) : enter(label, true)
                    }
                    className={`${itemClass} ${open ? "!text-brand" : ""}`}
                  >
                    {hovered === label && pill}
                    <span className="relative">{label}</span>
                    <span className="relative">
                      <Chevron open={open} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="hidden lg:block"
              onMouseEnter={() => enter("", false)}
            >
              <ButtonLink href={CONTACT_URL} className="!px-5 !py-2.5">
                Contact Us
              </ButtonLink>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="relative h-11 w-11 rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <motion.span
                className="absolute left-3 right-3 top-1/2 h-0.5 rounded bg-current"
                animate={
                  mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }
                }
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="absolute left-3 right-3 top-1/2 h-0.5 rounded bg-current"
                animate={
                  mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }
                }
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          </nav>

          {/* Desktop mega panel: one shared surface whose contents swap per group */}
          <AnimatePresence>
            {openGroup && openGroup.kind === "group" && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.28, ease: EASE }}
                onMouseEnter={cancelClose}
                className="hidden origin-top pt-2 lg:block"
              >
                <div className="rounded-3xl bg-white p-3 shadow-lift ring-1 ring-ink/10">
                  <AnimatePresence mode="wait" initial={false}>
                    <MegaContent
                      key={openGroup.group.label}
                      group={openGroup.group}
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-2 max-h-[calc(100svh-6.5rem)] origin-top overflow-y-auto relative isolate rounded-3xl bg-white px-6 pb-6 pt-2 shadow-lift ring-1 ring-ink/10 lg:hidden"
              >
                <HexPattern
                  scale={1.1}
                  className="-z-10 text-brand/[0.12] [mask-image:linear-gradient(to_top,black,transparent_55%)]"
                />
                {mainNav.map((entry) =>
                  entry.kind === "group" ? (
                    <MobileGroup key={entry.group.label} group={entry.group} />
                  ) : (
                    <Link
                      key={entry.label}
                      href={entry.href}
                      className="block border-b border-ink/10 py-4 font-display text-lg font-semibold text-ink"
                    >
                      {entry.label}
                    </Link>
                  ),
                )}
                <ButtonLink href={CONTACT_URL} className="mt-6 w-full">
                  Contact Us
                </ButtonLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
