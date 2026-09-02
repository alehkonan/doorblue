import { browser } from "$app/environment";
import { createContext } from "svelte";
import {
  isLocale,
  localeCookieName,
  localeStorageKey,
  messages,
  type Locale,
} from "$lib/i18n";

const cookieMaxAge = 60 * 60 * 24 * 365;

function localeFromCookie() {
  if (!browser) return undefined;

  for (const entry of document.cookie.split(";")) {
    const [name, value] = entry.trim().split("=");
    if (name === localeCookieName && isLocale(value)) return value;
  }

  return undefined;
}

function writeLocaleCookie(locale: Locale) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=${cookieMaxAge}; SameSite=Lax${secure}`;
}

export class I18nState {
  locale = $state<Locale>("en");

  constructor(initialLocale: () => Locale) {
    this.locale = initialLocale();
  }

  get messages() {
    return messages[this.locale];
  }

  selectLocale(locale: Locale) {
    this.applyLocale(locale);

    if (!browser) return;

    try {
      localStorage.setItem(localeStorageKey, locale);
    } catch {
      // The language still applies for this session when storage is unavailable.
    }

    writeLocaleCookie(locale);
  }

  syncFromBrowser() {
    if (!browser) return;

    let storedLocale: Locale | undefined;

    try {
      const storedValue = localStorage.getItem(localeStorageKey);
      storedLocale = isLocale(storedValue) ? storedValue : undefined;
    } catch {
      // Fall back to the mirrored cookie or browser language.
    }

    const preferredLocale = storedLocale ?? localeFromCookie() ?? this.locale;

    this.applyLocale(preferredLocale);

    if (storedLocale) writeLocaleCookie(storedLocale);
  }

  private applyLocale(locale: Locale) {
    this.locale = locale;
    if (browser) document.documentElement.lang = locale;
  }
}

export const [getI18n, setI18n] = createContext<I18nState>();
