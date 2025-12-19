import { locales, strings } from "./localeStrings";

const defaultLocale = "en-US";

function i18n<C extends keyof typeof strings>(category: C, key: keyof typeof strings[C], locale: keyof typeof locales = defaultLocale): string {
  const entry = strings[category][key] as Record<keyof typeof locales, string>;
  return entry[locale] ?? entry[defaultLocale];
}

export { i18n, locales, strings };
