import React from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import ButtonLink from "../ui/Button";
import { Reveal } from "../ui/motion";

const Events = ({ data }: any) => {
  const event = data[0];
  const isVideo =
    event.eventBanner?.mimeType == "video/mp4" || event.eventBanner?.mimeType == "video/webm";

  return (
    <section className="bg-white pb-20 sm:pb-28">
      <Reveal className="container-x">
        <div className="grid overflow-hidden rounded-3xl bg-mist ring-1 ring-ink/5 lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-center p-8 sm:p-12 lg:order-1 lg:col-span-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Upcoming event
            </p>
            <p className="mt-6 text-sm font-medium text-ink/60">{event?.eventDate}</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {event?.eventName}
            </h2>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ink">
              <MapPinIcon className="h-5 w-5 text-brand" />
              {event.eventLocation}
            </p>
            <p className="mt-5 leading-relaxed text-ink/65">{event.eventDetails}</p>
            <ButtonLink href="/uaug" className="mt-8 w-fit">
              Learn more
            </ButtonLink>
          </div>
          <div className="relative order-1 min-h-[260px] lg:order-2 lg:col-span-7">
            {isVideo ? (
              <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
                <source src={event.eventBanner.url} type={event.eventBanner.mimeType} />
              </video>
            ) : (
              event.eventBanner?.url && (
                <Image
                  src={event.eventBanner.url}
                  alt={event?.eventName + " image"}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              )
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Events;
