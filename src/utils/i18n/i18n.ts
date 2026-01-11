import { stateStore } from "../../stores/state";
import { locales, strings } from "./localeStrings";

const defaultLocale = stateStore.locale.value as keyof typeof locales;

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

function i18nFormatTime(date: string | Date, locale: keyof typeof locales = defaultLocale, hour12: boolean = true, withDate: boolean = false): string {
  const target = new Date(date);
  const now = new Date();

  const targetMidnight = new Date(target);
  targetMidnight.setHours(0, 0, 0, 0);
  const todayMidnight = new Date(now);
  todayMidnight.setHours(0, 0, 0, 0);

  const yesterdayMidnight = new Date(todayMidnight);
  yesterdayMidnight.setDate(yesterdayMidnight.getDate() - 1);

  const timeString = target.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  });

  if (+targetMidnight === +todayMidnight || !withDate) {
    return timeString;
  }

  if (+targetMidnight === +yesterdayMidnight) {
    return `Yesterday at ${timeString}`;
  }

  const dateString = target.toLocaleDateString(locale, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return `${dateString} ${timeString}`;
}

export { i18n, i18nFormatTime, locales, strings };
