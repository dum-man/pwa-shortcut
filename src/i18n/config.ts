export type Locale = (typeof locales)[number];

export const locales = ["az", "ru"] as const;
export const defaultLocale: Locale = "az";
