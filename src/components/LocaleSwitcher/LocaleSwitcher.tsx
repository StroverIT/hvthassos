"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { HEADER_BLUE } from "@/components/Header/consts";
import { CONTENT, LOCALES } from "./consts";
import type { TLocaleSwitcherProps } from "./types";

export const LocaleSwitcher: FC<TLocaleSwitcherProps> = ({
  locale,
  onNavigate,
  variant = "header",
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current =
    LOCALES.find((item) => item.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (variant === "menu") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
          {CONTENT.switcherLabel}
        </p>
        {LOCALES.map((item) => (
          <Link
            key={item.code}
            href={pathname}
            locale={item.code}
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-semibold transition ${
              locale === item.code
                ? "bg-white"
                : "border border-white/30 text-white hover:bg-white/10"
            }`}
            style={locale === item.code ? { color: HEADER_BLUE } : undefined}
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            <span className="text-lg leading-none" aria-hidden>
              {item.flag}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative z-50">
      <button
        type="button"
        className="flex items-center gap-2 rounded border border-white/35 bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white transition hover:bg-white/20"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={CONTENT.switcherLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span>{current.shortLabel}</span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          aria-hidden
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 min-w-[11.5rem] overflow-hidden rounded border border-sea/10 bg-white py-1 shadow-lg"
        >
          {LOCALES.map((item) => (
            <li key={item.code} role="option" aria-selected={locale === item.code}>
              <Link
                href={pathname}
                locale={item.code}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition hover:bg-foam ${
                  locale === item.code
                    ? "font-semibold text-sea"
                    : "font-medium text-ink"
                }`}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {item.flag}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
