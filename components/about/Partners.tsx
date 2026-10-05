import React from "react";
import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";
import { Reveal } from "../ui/motion";

// software partners
import I from "@/public/assets/partners/oracle_partner.png";
import I1 from "@/public/assets/partners/azure logo.png";
import I3 from "@/public/assets/partners/aws logo.jpg";
import I5 from "@/public/assets/partners/google logo.png";
import I4 from "@/public/assets/partners/convey logo.jpeg";
import I6 from "@/public/assets/partners/databricks final.png";
import I7 from "@/public/assets/partners/informatica logo.png";
import I8 from "@/public/assets/partners/microsoft partner logo.png";
import I9 from "@/public/assets/partners/neo4j logo.png";
import I10 from "@/public/assets/partners/qlik logo.png";
import I11 from "@/public/assets/partners/snowflake logo.png";
import I12 from "@/public/assets/partners/tableau logo.png";

const softwarePartners = [
    { img: I, alt: "Oracle logo", name: "Oracle", large: true },
    { img: I1, alt: "Azure logo", name: "Azure" },
    { img: I3, alt: "AWS logo", name: "AWS" },
    { img: I5, alt: "Google logo", name: "Google" },
    { img: I4, alt: "Convey logo", name: "Convey", large: true },
    { img: I6, alt: "Databricks Final", name: "Databricks", large: true },
    { img: I7, alt: "Informatica Logo", name: "Informatica", large: true },
    { img: I8, alt: "Microsoft Logo", name: "Microsoft" },
    { img: I9, alt: "Neo4j Logo", name: "Neo4j" },
    { img: I10, alt: "Qlik Logo", name: "Qlik" },
    { img: I11, alt: "Snowflake Logo", name: "Snowflake", large: true },
    { img: I12, alt: "Tableau Logo", name: "Tableau", large: true },
];

const HexTile = ({ partner }: { partner: (typeof softwarePartners)[number] }) => (
  <div className="group/hex w-full drop-shadow-[0_10px_16px_rgba(12,31,102,0.14)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_18px_26px_rgba(235,44,46,0.3)] lg:w-[9.5rem]">
    <div className="hex-pointy bg-ink/10 p-px transition-colors duration-300 group-hover/hex:bg-brand">
      <div className="hex-pointy relative bg-white">
        <Image
          src={partner.img}
          alt={partner.alt}
          fill
          sizes="160px"
          className={`object-contain ${partner.large ? "p-[14%]" : "p-[22%]"}`}
        />
      </div>
    </div>
  </div>
);

const Partners = () => {
  const half = Math.ceil(softwarePartners.length / 2);
  const rows = [softwarePartners.slice(0, half), softwarePartners.slice(half)];

  return (
    <section className="bg-white py-20 sm:py-28" id="partners">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Partners"
          title="Our Technology Partners"
          description="HEXstream has strategic partnerships with industry-leading technology firms and specialized partners who share our vision for delivering excellence and long-term value."
        />

        {/* Honeycomb on desktop: the second row tucks into the gaps of the first */}
        <Reveal delay={0.1} className="mt-14">
          <div className="hidden flex-col items-center lg:flex">
            {rows.map((row, i) => (
              <div
                key={i}
                className={`flex gap-3 ${i === 1 ? "-mt-[2.1rem] translate-x-[2.5625rem]" : "-translate-x-[2.5625rem]"}`}
              >
                {row.map((partner) => (
                  <HexTile key={partner.alt} partner={partner} />
                ))}
              </div>
            ))}
          </div>
          <div className="mx-auto grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-4 lg:hidden">
            {softwarePartners.map((partner) => (
              <HexTile key={partner.alt} partner={partner} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Partners;
