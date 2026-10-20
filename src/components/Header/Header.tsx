"use client";

import { useEffect, useState, type FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS, SITE } from "@/content/consts";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { CONTENT, HEADER_BLUE } from "./consts";
import type { THeaderProps } from "./types";

const DESKTOP_KEYS = [
  "accommodation",
  "gallery",
  "virtualTour",
  "reservation",
  "thassos",
  "contact",
] as const;

export const Header: FC<THeaderProps> = ({ locale }) => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href: string) =>
    `whitespace-nowrap text-base font-medium tracking-wide transition xl:text-[17px] ${
      pathname === href
        ? "text-white"
        : "text-white/75 hover:text-white"
    }`;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ backgroundColor: HEADER_BLUE }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-[4.25rem] md:px-6 lg:px-8">
        <Link href="/" className="relative z-50 flex shrink-0 items-center">
          <Image
            src={CONTENT.logoSrc}
            alt={CONTENT.brandAltLabel}
            width={160}
            height={72}
            className="h-10 w-auto md:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-x-5 xl:gap-x-6 min-[1180px]:flex">
          {DESKTOP_KEYS.map((key) => {
            const href = NAV_LINKS.find((link) => link.key === key)?.href ?? "/";
            return (
              <Link key={key} href={href} className={linkClass(href)}>
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center text-white min-[1180px]:hidden"
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
          className="fixed inset-0 z-40 overflow-y-auto px-6 pt-20 pb-10 min-[1180px]:hidden"
          style={{ backgroundColor: HEADER_BLUE }}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.filter((link) => link.key !== "home").map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`border-b border-white/10 py-3.5 text-lg text-white/90 ${
                  pathname === link.href ? "font-semibold text-white" : ""
                }`}
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
