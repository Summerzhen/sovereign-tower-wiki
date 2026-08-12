import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for supported locales.
 *
 * To add a new language you must update THREE places that have to stay in sync:
 *   1. The `locales` array below.
 *   2. The static imports + `messagesMap` in `src/i18n/request.ts`.
 *   3. The matching JSON file in `src/locales/<locale>.json`.
 */
export const routing = defineRouting({
  locales: ["en", "de", "ja", "fr", "it", "ko"] as string[],
  defaultLocale: "en",
  // Keep every indexable locale on an explicit prefix so `/` can cleanly
  // redirect to the English canonical at `/en` instead of competing with it.
  localePrefix: "always",
  localeDetection: true,
});

export type Locale = string;
