import en from "$lib/translations/en.json";
import ka from "$lib/translations/ka.json";
import ru from "$lib/translations/ru.json";

export const supportedLocales = ["en", "ru", "ka"] as const;

export type Locale = (typeof supportedLocales)[number];
export type Messages = typeof en;

export const localeOptions: ReadonlyArray<{
  code: Locale;
  shortLabel: string;
  name: string;
}> = [
  { code: "en", shortLabel: "EN", name: "English" },
  { code: "ru", shortLabel: "RU", name: "Русский" },
  { code: "ka", shortLabel: "KA", name: "ქართული" },
];

export const localeStorageKey = "doorblue_locale";
export const localeCookieName = "doorblue_locale";

const translations = { en, ru, ka } satisfies Record<Locale, Messages>;

export const messages: Record<Locale, Messages> = translations;

export function isLocale(value: string | null | undefined): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function localeFromLanguageTag(value: string | null | undefined) {
  if (!value) return undefined;

  const language = value.trim().toLowerCase().split("-")[0];
  return isLocale(language) ? language : undefined;
}

export function localeFromAcceptLanguage(value: string | null | undefined) {
  if (!value) return undefined;

  const preferences = value
    .split(",")
    .map((entry, index) => {
      const [languageTag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const parsedQuality = qualityParameter
        ? Number(qualityParameter.trim().slice(2))
        : 1;

      return {
        index,
        locale: localeFromLanguageTag(languageTag),
        quality: Number.isFinite(parsedQuality) ? parsedQuality : 0,
      };
    })
    .filter(
      (
        preference,
      ): preference is {
        index: number;
        locale: Locale;
        quality: number;
      } => Boolean(preference.locale) && preference.quality > 0,
    )
    .sort(
      (left, right) => right.quality - left.quality || left.index - right.index,
    );

  return preferences[0]?.locale;
}

export function resolveRequestLocale(
  savedLocale: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  return isLocale(savedLocale)
    ? savedLocale
    : (localeFromAcceptLanguage(acceptLanguage) ?? "en");
}
