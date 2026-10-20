"use client";

import { useEffect, useRef, useState, type FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS, SITE } from "@/content/consts";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { CONTENT, HEADER_BLUE } from "./consts";
import type { THeaderProps } from "./types";

const PRIMARY_KEYS = [
  "accommodation",
  "gallery",
  "virtualTour",
  "reservation",
  "contact",
] as const;

const MORE_KEYS = ["services", "villaPolicy", "thassos", "location"] as const;

export const Header: FC<THeaderProps> = ({ locale }) => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const linkClass = (href: string) =>
    `text-sm font-medium transition ${
      pathname === href ? "text-white" : "text-white/80 hover:text-white"
    }`;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 shadow-sm"
      style={{ backgroundColor: HEADER_BLUE }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-8">
        <Link
          href="/"
          className="relative z-50 flex shrink-0 items-center gap-3"
        >
          <Image
            src={CONTENT.logoSrc}
            alt={CONTENT.brandAltLabel}
            width={180}
            height={82}
            className="h-12 w-auto sm:h-14"
            priority
          />
          <span className="hidden font-display text-lg leading-tight text-white sm:block md:text-xl">
            Holiday Villa
            <span className="block text-sm font-sans font-medium tracking-wide text-white/85 md:text-base">
              Thassos
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 min-[1080px]:flex">
          {PRIMARY_KEYS.map((key) => {
            const href = NAV_LINKS.find((link) => link.key === key)?.href ?? "/";
            return (
              <Link key={key} href={href} className={linkClass(href)}>
                {t(key)}
              </Link>
            );
          })}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              className="text-sm font-medium text-white/80 transition hover:text-white"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((value) => !value)}
            >
              {t("more")}
            </button>
            {moreOpen ? (
              <div className="absolute right-0 mt-3 min-w-48 bg-white py-2 shadow-lg">
                {MORE_KEYS.map((key) => {
                  const href =
                    NAV_LINKS.find((link) => link.key === key)?.href ?? "/";
                  return (
                    <Link
                      key={key}
                      href={href}
                      className="block px-4 py-2.5 text-sm text-ink hover:bg-foam"
                      onClick={() => setMoreOpen(false)}
                    >
                      {t(key)}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white min-[1080px]:hidden"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{SITE.brandLabel}</span>
            <span
              className={`absolute h-0.5 w-5 bg-current transition ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-40 overflow-y-auto px-6 pt-24 pb-10 min-[1080px]:hidden"
          style={{ backgroundColor: HEADER_BLUE }}
        >
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.filter((link) => link.key !== "home").map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="font-display text-2xl text-white"
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="mt-6 sm:hidden">
              <LocaleSwitcher
                locale={locale}
                variant="menu"
                onNavigate={() => setOpen(false)}
              />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
