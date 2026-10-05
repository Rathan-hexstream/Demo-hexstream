import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/assets/bigHeaderLogo.png";
import mbe from "../public/assets/mbe_ori.png";
import { ArrowIcon } from "./ui/Button";
import { Reveal } from "./ui/motion";
import {
  CONTACT_URL,
  insightLinks,
  isExternal,
  oracle,
  products,
  type NavLink,
} from "@/utils/navigation";

const company: NavLink[] = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Expertise", href: "/capabilities/Expertise" },
  { name: "UAUG", href: "/uaug" },
  { name: "Contact Us", href: CONTACT_URL },
];

const columns: { title: string; links: NavLink[] }[] = [
  { title: "Products", links: products.links },
  { title: "Oracle", links: oracle.links },
  { title: "Insights", links: insightLinks },
  { title: "Company", links: company },
];

const socials = [
  {
    name: "X (Twitter)",
    href: "https://twitter.com/HEXstreamHQ",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/advanced-analytics-llc/",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
];

const linkClass =
  "link-slide inline-block pb-0.5 text-[15px] text-white/70 hover:text-white";

const Footer = () => {
  return (
    <footer className="bg-ink-800 text-white">
      <div className="h-1 bg-gradient-to-r from-brand via-brand-400 to-brand" />

      <Reveal className="container-x">
        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Contact: the one loud element in the footer */}
          <div className="lg:col-span-6">
            <Link
              href="/"
              aria-label="HEXstream home"
              className="inline-block rounded-xl bg-white px-3.5 py-2 transition-transform duration-300 hover:scale-105"
            >
              <Image src={logo} alt="HEXstream" width={118} height={49} />
            </Link>
            <p className="mt-10 text-sm font-medium uppercase tracking-[0.18em] text-white/50">
              Let&apos;s talk data
            </p>
            <Link
              href="mailto:info@hexstream.com"
              className="group/mail mt-3 inline-flex items-center gap-3 font-display text-xl font-semibold tracking-tight transition-colors duration-300 hover:text-brand-400 sm:text-3xl"
            >
              <span className="link-slide pb-1">info@hexstream.com</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover/mail:rotate-[-45deg] group-hover/mail:scale-110">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="https://maps.app.goo.gl/QchjhcLp6qoQ9o9YA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-fit text-[15px] leading-relaxed text-white/60 transition-colors duration-300 hover:text-white"
            >
              311 S Wacker Drive, Suite 6550
              <br />
              Chicago, IL 60606
            </Link>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        {...(isExternal(link.href)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={linkClass}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-white p-0.5">
              <Image src={mbe} alt="MBE Certified" width={38} height={38} />
            </span>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} HEXstream Inc. All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {socials.map((soc) => (
              <Link
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="grid h-10 w-10 place-items-center rounded-full text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={soc.path} />
                </svg>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group/top ml-2 inline-flex items-center gap-2 rounded-full border border-white/20 py-2 pl-4 pr-3 text-xs font-medium text-white/80 transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              Back to top
              <ArrowIcon className="-rotate-90 transition-transform duration-300 group-hover/top:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
