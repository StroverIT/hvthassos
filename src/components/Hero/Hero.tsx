"use client";

import { useEffect, useState, type FC } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HERO_IMAGES } from "@/content/consts";
import { CONTENT, SLIDE_INTERVAL_MS } from "./consts";

const FACTS = [
  ["factDistanceValue", "factDistanceLabel"],
  ["factUnitsValue", "factUnitsLabel"],
  ["factBeachValue", "factBeachLabel"],
  ["factParkValue", "factParkLabel"],
] as const;

export const Hero: FC = () => {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={HERO_IMAGES[index]}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={HERO_IMAGES[index]}
            alt={CONTENT.brandLabel}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Full-bleed scrims only — no boxed panel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
      <div className="absolute inset-y-0 left-0 w-full max-w-4xl bg-gradient-to-r from-black/50 via-black/25 to-transparent md:w-3/5" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-36 md:px-8 md:pb-14 md:pt-44">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.28em] text-sand"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Kinira, Thassos
        </motion.p>
        <motion.h1
          className="mt-3 max-w-4xl font-display text-3xl leading-[1.1] text-white sm:text-5xl md:text-6xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.65)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t("headline")}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-white md:text-lg"
          style={{ textShadow: "0 1px 14px rgba(0,0,0,0.7)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t("support")}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/reservation"
            className="bg-white px-6 py-3 text-sm font-semibold text-sea transition hover:bg-sand"
          >
            {tCommon("ctaInquire")}
          </Link>
          <Link
            href="/virtual-tour"
            className="border border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            {tCommon("ctaTour")}
          </Link>
        </motion.div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden bg-white/20 sm:grid-cols-4">
          {FACTS.map(([valueKey, labelKey]) => (
            <div
              key={valueKey}
              className="bg-[#04283f]/55 px-4 py-4 backdrop-blur-sm"
            >
              <dt className="font-display text-2xl text-white">{t(valueKey)}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">
                {t(labelKey)}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex gap-2">
          {HERO_IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${CONTENT.brandLabel} ${i + 1}`}
              className={`h-1.5 transition-all ${
                i === index ? "w-8 bg-white" : "w-3 bg-white/45"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
