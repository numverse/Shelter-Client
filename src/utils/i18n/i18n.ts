import { locales, strings } from "./localeStrings";

const defaultLocale = "en-US";

function i18n<C extends keyof typeof strings>(category: C, key: keyof typeof strings[C], locale: keyof typeof locales = defaultLocale): string {
  const bigCategory = strings[category];
  if (!bigCategory) {
    console.warn(`i18n: Category "${category}" not found.`);
    return "";
  }
  const smallCategory = bigCategory[key];
  if (!smallCategory) {
    console.warn(`i18n: Key "${String(key)}" not found in category "${category}".`);
    return "";
  }
  const entry = strings[category][key] as Record<keyof typeof locales, string>;
  return entry[locale] ?? entry[defaultLocale];
}

export { i18n, locales, strings };
