import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg", "gr", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type TLocale = (typeof routing.locales)[number];
