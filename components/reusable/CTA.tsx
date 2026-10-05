import React from "react";
import ButtonLink from "../ui/Button";
import HexPattern from "../ui/HexPattern";
import { Reveal } from "../ui/motion";
import { CONTACT_URL } from "@/utils/navigation";

interface CtaTypes {
  title: string;
  name: string;
}

const Cta = ({ title, name }: CtaTypes) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Reveal className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-brand-600 to-[#8E1114] px-6 py-14 text-center text-white shadow-glow sm:px-12 sm:py-20">
          <HexPattern className="-z-10 text-white/10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-white/20 blur-[100px]" />
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <ButtonLink href={CONTACT_URL} variant="light" className="mt-9 !px-8 !py-3.5 !text-base">
            {name}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
};

export default Cta;
