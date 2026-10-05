import Link from "next/link";
import React from "react";
import {
  CpuChipIcon,
  DocumentChartBarIcon,
  PencilSquareIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import ButtonLink, { ArrowIcon } from "../ui/Button";
import HexPattern from "../ui/HexPattern";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

const insights = [
  {
    name: "Success Stories",
    description: "How utilities are putting their data to work with HEXstream.",
    href: "/Insights?type=Success Stories",
    icon: TrophyIcon,
  },
  {
    name: "Blogs",
    description: "Perspectives on data, AI and the modern grid.",
    href: "/Insights?type=HEXstream Blog",
    icon: PencilSquareIcon,
  },
  {
    name: "Whitepapers & Special Reports",
    description: "In-depth research for utility leaders.",
    href: "/Insights?type=Whitepapers%20%26%20Special%20Reports",
    icon: DocumentChartBarIcon,
  },
  {
    name: "Tech Corner",
    description: "Hands-on guidance from our engineering team.",
    href: "/Insights?type=Tech Corner",
    icon: CpuChipIcon,
  },
];

const Insights = () => {
  return (
    <section className="bg-deep relative isolate overflow-hidden py-20 text-white sm:py-28">
      <HexPattern className="-z-10 text-white/[0.07] [mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,black,transparent)]" />
      <div className="absolute -bottom-40 right-[-5%] -z-10 h-[420px] w-[420px] rounded-full bg-brand/40 blur-[130px]" />

      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            dark
            eyebrow="Insights"
            title="Thought leadership for the utility industry"
            description="Explore our living library of thought leadership in the utilities domain."
          />
          <Reveal delay={0.1}>
            <ButtonLink href="/Insights" variant="outlineLight">
              View all insights
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((item) => (
            <StaggerItem key={item.name}>
             <TiltCard glow="rgba(255,255,255,0.14)" className="h-full rounded-3xl">
              <Link
                href={item.href}
                className="group/card relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/50 hover:bg-white/[0.12]"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-400 transition-transform duration-500 group-hover/card:scale-x-100" />
                <span className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white transition-all duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 group-hover/card:bg-brand">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <ArrowIcon className="-rotate-45 text-white/50 transition-all duration-300 group-hover/card:rotate-0 group-hover/card:text-white" />
                </span>
                <span className="mt-auto pt-10">
                  <span className="block font-display text-xl font-semibold leading-snug">
                    {item.name}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-white/75">
                    {item.description}
                  </span>
                </span>
              </Link>
             </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Insights;
