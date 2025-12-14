import enUS from "../locales/en-US.json";
import koKR from "../locales/ko-KR.json";

const defaultLocale = "ko-KR";

export function i18n(string: keyof typeof enUS, locale: "en-US" | "ko-KR" = defaultLocale): string {
  const translations = locale === "en-US" ? enUS : koKR;
  return translations[string] || string;
}
