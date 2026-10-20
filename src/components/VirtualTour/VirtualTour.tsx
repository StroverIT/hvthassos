"use client";

import { useEffect, useRef, useState, type FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CONTENT, POSTER_SRC, TOUR_URL } from "./consts";
import type { TVirtualTourProps } from "./types";

export const VirtualTour: FC<TVirtualTourProps> = ({ className = "" }) => {
  const t = useTranslations("virtualTour");
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldLoadIframe = started && inView;

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden bg-sea-deep ${className}`}
    >
      {!shouldLoadIframe ? (
        <>
          <Image
            src={POSTER_SRC}
            alt={CONTENT.posterAltLabel}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-sea-deep/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
            <button
              type="button"
              onClick={() => setStarted(true)}
              disabled={!inView}
              className="rounded-sm bg-olive px-8 py-3 text-sm font-semibold text-white transition hover:bg-olive-light disabled:opacity-60"
            >
              {t("start")}
            </button>
          </div>
        </>
      ) : (
        <iframe
          title={t("title")}
          src={TOUR_URL}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
};
