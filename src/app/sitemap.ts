import type { MetadataRoute } from "next";
import { getAllContent, getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { CONTENT_TYPES } from "@/config/navigation";
import { KNIGHTS, QUESTS } from "@/data/sovereignTower";

export const dynamic = "force-static";

function metadataDate(value?: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function latestDate(dates: Date[]) {
  return dates.reduce((latest, date) => (date > latest ? date : latest), dates[0]);
}

function hreflangCode(locale: string) {
  return locale === "zh-cn" ? "zh-CN" : locale;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";
  const localizedUrl = (path: string, locale: string) => `${siteUrl}/${locale}${path === "/" ? "" : path}`;
  const languageAlternates = (path: string) => ({
    ...Object.fromEntries(routing.locales.map((locale) => [hreflangCode(locale), localizedUrl(path, locale)])),
    "x-default": localizedUrl(path, routing.defaultLocale),
  });

  const contentByType = await Promise.all(
    CONTENT_TYPES.map(async (contentType) => ({
      contentType,
      items: await getAllContent(contentType, routing.defaultLocale),
    })),
  );
  const contentDates = contentByType
    .flatMap(({ items }) =>
      items
        .map((item) => metadataDate(item.metadata.lastModified ?? item.metadata.date))
        .filter((date): date is Date => Boolean(date)),
    );
  const siteLastModified = contentDates.length > 0
    ? latestDate(contentDates)
    : new Date("2026-08-16T00:00:00.000Z");
  const lastModifiedByPath = new Map<string, Date>();

  // Static paths that always exist
  const staticPaths = [
    "/",
    ...CONTENT_TYPES.map((contentType) => `/${contentType}`),
    "/privacy-policy",
    "/terms-of-service",
    "/copyright",
    "/about",
  ];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);
  const databasePaths = [
    ...QUESTS.map((quest) => `/quests/${quest.slug}`),
    ...KNIGHTS.map((knight) => `/knights/${knight.slug}`),
  ];

  for (const { contentType, items } of contentByType) {
    const typeDates: Date[] = [];
    for (const item of items) {
      const itemDate = metadataDate(item.metadata.lastModified ?? item.metadata.date);
      if (!itemDate) continue;
      typeDates.push(itemDate);
      lastModifiedByPath.set(`/${contentType}/${item.slug}`, itemDate);
    }
    if (typeDates.length > 0) {
      lastModifiedByPath.set(`/${contentType}`, latestDate(typeDates));
    }
  }
  for (const path of ["/", "/privacy-policy", "/terms-of-service", "/copyright", "/about", ...databasePaths]) {
    if (!lastModifiedByPath.has(path)) {
      lastModifiedByPath.set(path, siteLastModified);
    }
  }

  const paths = Array.from(new Set([...staticPaths, ...dynamicPaths, ...databasePaths]));

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: localizedUrl(path, locale),
      lastModified: lastModifiedByPath.get(path) ?? siteLastModified,
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : CONTENT_TYPES.includes(path.replace(/^\//, "")) ? 0.8 : 0.6,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  );
}

