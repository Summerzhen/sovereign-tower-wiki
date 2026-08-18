import { routing } from "@/i18n/routing";

export function hreflangCode(locale: string) {
  return locale === "zh-cn" ? "zh-CN" : locale;
}

export function localizedPath(pathname: string, locale: string) {
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

export function languageAlternates(pathname: string) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [
        hreflangCode(locale),
        localizedPath(pathname, locale),
      ]),
    ),
    "x-default": localizedPath(pathname, routing.defaultLocale),
  };
}
