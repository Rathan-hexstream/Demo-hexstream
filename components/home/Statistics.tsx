import React from "react";
import Counter from "../ui/Counter";
import HexPattern from "../ui/HexPattern";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { Stagger, StaggerItem } from "../ui/motion";

const stats = [
  { to: 125, suffix: "+", label: "projects successfully completed" },
  { to: 52, suffix: "M+", label: "customers who rely on the utilities we serve" },
  { to: 8, suffix: "/10", label: "of the largest North American utilities rely on HEXstream analytics" },
];

const Statistics = () => {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          className="lg:col-span-4"
          eyebrow="Our impact"
          title="The numbers tell the story"
          description="Since 2017, HEXstream has been energizing people's lives by helping utilities reach their operational efficiency and decarbonization goals through data insight."
        />

        <Stagger className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
          <StaggerItem className="sm:col-span-3">
           <TiltCard tilt={3} glow="rgba(255,255,255,0.16)" className="bg-deep isolate overflow-hidden rounded-3xl p-8 text-white shadow-lift sm:p-10">
            <HexPattern className="-z-10 text-white/[0.08] [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
            <div className="absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full bg-brand/60 blur-[90px]" />
            <p className="font-display text-6xl font-extrabold tracking-tight sm:text-7xl">
              <Counter to={500} prefix="$" suffix="M+" />
            </p>
            <p className="mt-3 max-w-sm text-base text-white/80">
              saved in energy costs for utility customers
            </p>
           </TiltCard>
          </StaggerItem>

          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
             <TiltCard className="h-full rounded-3xl border border-ink/5 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-lift">
              <p className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                <Counter to={stat.to} suffix={stat.suffix} />
              </p>
              <span className="mt-4 block h-0.5 w-8 rounded bg-brand transition-all duration-500 group-hover/tilt:w-16" />
              <p className="mt-4 text-sm leading-relaxed text-ink/65">{stat.label}</p>
             </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Statistics;
