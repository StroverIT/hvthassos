import type { FC } from "react";
import Image from "next/image";
import { CONTENT } from "./consts";
import type { TPageHeroProps } from "./types";

export const PageHero: FC<TPageHeroProps> = ({
  title,
  intro,
  imageSrc = CONTENT.defaultImageLabel,
}) => (
  <section className="relative flex min-h-[52vh] items-end overflow-hidden md:min-h-[58vh]">
    <Image
      src={imageSrc}
      alt={title}
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#04283f]/85 via-[#04283f]/30 to-[#04283f]/15" />
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-36 md:px-8 md:pb-16 md:pt-44">
      <h1 className="font-display text-4xl text-white md:text-5xl">{title}</h1>
      {intro ? (
        <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{intro}</p>
      ) : null}
    </div>
  </section>
);
