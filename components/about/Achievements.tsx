import Image, { StaticImageData } from "next/image";

import oracle from "@/public/assets/Oracle.png";
import market from "@/public/assets/market-logo.png";
import arc from "@/public/assets/Arc_logo.webp";
import duug from "@/public/assets/duug-logo.webp";
import UGC from "@/public/assets/OUUG-removebg.png";

import HexPattern from "../ui/HexPattern";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { Stagger, StaggerItem } from "../ui/motion";

interface ClientsLogos {
  image: StaticImageData;
  name: string;
  award: string;
  /** The source file has wide built-in margins, so enlarge it to match the others. */
  padded?: boolean;
}

const clientsData: ClientsLogos[] = [
  {
    image: oracle,
    name: "Oracle Utilities Analytics",
    award: "Platform Co-Developer",
  },
  {
    image: duug,
    name: "OUUG Pacesetter",
    award: "Partner of the year",
    padded: true,
  },
  {
    image: UGC,
    name: "OUUG Conference",
    award: "Annual Presenter",
    padded: true,
  },
  {
    image: market,
    name: "Markets & Markets",
    award: "Data Fabric Industry Leader",
    padded: true,
  },
  {
    image: arc,
    name: "Industry ARC",
    award: "Data Fabric Industry Leader",
  },
];

const Logo = ({ client, className }: { client: ClientsLogos; className: string }) => (
  <span
    className={`relative block shrink-0 overflow-hidden rounded-2xl bg-white transition-transform duration-500 group-hover/tilt:scale-105 ${className}`}
  >
    <Image
      src={client.image}
      alt={client.name}
      fill
      sizes="(min-width: 1024px) 320px, 60vw"
      className={`object-contain ${client.padded ? "scale-[1.35]" : "p-4"}`}
    />
  </span>
);

const Achievements = () => {
  const [featured, ...rest] = clientsData;

  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Recognition"
          title="Achievements"
          description="Recognized by the industry, and by the partners we build with."
        />

        {/* Bento: one featured credit beside four smaller ones */}
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          <StaggerItem className="sm:col-span-2 lg:row-span-2">
            <TiltCard
              tilt={3}
              glow="rgba(255,255,255,0.16)"
              className="bg-deep isolate flex h-full min-h-[22rem] flex-col overflow-hidden rounded-3xl p-8 text-white shadow-lift sm:p-10"
            >
              <HexPattern className="-z-10 text-white/[0.08] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]" />
              <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-brand/60 blur-[100px] transition-transform duration-700 group-hover/tilt:scale-125" />
              <div className="flex items-start justify-between gap-4">
                <Logo client={featured} className="h-24 w-44 shadow-lift sm:h-28 sm:w-52" />
                <span className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
                  Featured
                </span>
              </div>
              <div className="mt-auto pt-12">
                <p className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {featured.name}
                </p>
                <p className="mt-4 inline-flex rounded-full bg-brand px-4 py-1.5 text-sm font-semibold">
                  {featured.award}
                </p>
              </div>
            </TiltCard>
          </StaggerItem>

          {rest.map((client) => (
            <StaggerItem key={client.name}>
              <TiltCard className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-lift">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-400 transition-transform duration-500 group-hover/tilt:scale-x-100" />
                <Logo client={client} className="h-24 w-full" />
                <p className="mt-5 font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover/tilt:text-brand">
                  {client.name}
                </p>
                <p className="mt-1 text-sm text-ink/60">{client.award}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Achievements;
