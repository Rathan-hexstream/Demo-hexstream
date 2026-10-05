import React from "react";
import Marquee from "../ui/Marquee";
import { Reveal } from "../ui/motion";

// Priority order: Georgia Power, Con Edison, Dominion Energy, MidAmerican Energy — everything after is unordered
const clients = [
  { name: "Georgia Power", src: "https://media.graphassets.com/aBiN5NtmQbW3juNV33gw" },
  { name: "Con Edison", src: "https://media.graphassets.com/2ZSPztxvQvCtj8BQ7mJt" },
  { name: "Dominion Energy", src: "https://media.graphassets.com/r7IJJu8jSE2Haf3ahxa6" },
  { name: "MidAmerican Energy Company", src: "/clients/MidAmerican_Energy_Company-logo_subhead.svg" },
  { name: "NiSource", src: "https://media.graphassets.com/UYDeVqMiROOCmHpGPmrg", tall: true },
  { name: "Toronto Hydro", src: "https://media.graphassets.com/AzQ3AMFRhubZdDy5CClG", tall: true },
  {
    name: "Clark County Water Reclamation District",
    src: "https://media.graphassets.com/9cpi5VL4TKaNFg29w5R2",
    tall: true,
  },
  { name: "SDG&E", src: "https://media.graphassets.com/VpiWMzIBTe2aQR1KZVqG" },
  { name: "Honolulu", src: "/clients/Honolulu_logo.png" },
  { name: "Eversource", src: "https://media.graphassets.com/EBQmnXSR1O5oH4m3iom8" },
  { name: "Seattle City Light", src: "https://media.graphassets.com/nHSW11XWTLSdlWQc2t6q" },
  { name: "ATCO", src: "https://media.graphassets.com/YvnHNsrOS7m5KYYKiwyx" },
  { name: "Modesto Irrigation District", src: "https://media.graphassets.com/8Il4AfNS7i9bWNJj6ugV" },
  { name: "Knoxville Utilities Board", src: "https://media.graphassets.com/cLgr9snSHaqxsv21nAQ3" },
  { name: "Seminole Electric Cooperative", src: "https://media.graphassets.com/4DpchlRBShC6NRO5XZIr" },
  { name: "Austin Energy", src: "https://media.graphassets.com/lep8nFCqT5mNEUxmvxua", tall: true },
  { name: "Duke Energy", src: "https://media.graphassets.com/TlT9G8WnToOOJcrJMTBO" },
];

const ClientLogos = () => (
  <section className="border-b border-ink/5 bg-white py-12 sm:py-14">
    <Reveal>
      <p className="container-x text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
        Trusted by leading utilities across North America
      </p>
      <Marquee className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {clients.map((client) => (
          <div key={client.name} className="mx-7 flex h-16 w-36 items-center justify-center sm:mx-9">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.src}
              alt={client.name}
              loading="lazy"
              // Some source files carry built-in padding and need a taller box to read at the same size.
              className={`w-auto max-w-full object-contain transition-transform duration-300 hover:scale-110 ${
                client.tall ? "max-h-16" : "max-h-10"
              }`}
            />
          </div>
        ))}
      </Marquee>
    </Reveal>
  </section>
);

export default ClientLogos;
