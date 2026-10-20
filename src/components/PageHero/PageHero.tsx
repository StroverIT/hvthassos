import type { FC } from "react";
import Image from "next/image";
import { CONTENT } from "./consts";
import type { TPageHeroProps } from "./types";

export const PageHero: FC<TPageHeroProps> = ({
  title,
  intro,
  imageSrc = CONTENT.defaultImageLabel,
  imagePosition = "object-[center_35%]",
}) => (
  <section className="relative flex min-h-[42vh] items-end overflow-hidden md:min-h-[48vh]">
    <Image
      src={imageSrc}
      alt={title}
      fill
      priority
      sizes="100vw"
      className={`object-cover ${imagePosition}`}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#04283f]/80 via-[#04283f]/35 to-[#04283f]/20" />
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-32 md:px-8 md:pb-14 md:pt-36">
      <h1 className="font-display text-3xl text-white md:text-5xl">{title}</h1>
      {intro ? (
        <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{intro}</p>
      ) : null}
    </div>
  </section>
);
