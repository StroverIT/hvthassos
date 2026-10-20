export const CONTENT = {
  switcherLabel: "Language",
} as const;

export const LOCALES = [
  { code: "en", label: "English", shortLabel: "EN", flag: "🇬🇧" },
  { code: "bg", label: "Български", shortLabel: "БГ", flag: "🇧🇬" },
  { code: "gr", label: "Ελληνικά", shortLabel: "ΕΛ", flag: "🇬🇷" },
  { code: "ru", label: "Русский", shortLabel: "РУ", flag: "🇷🇺" },
] as const;
