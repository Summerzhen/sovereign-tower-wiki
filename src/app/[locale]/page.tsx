import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { JsonLd, WikiSidebar } from "@/components/site";
import { getAllContent, getDynamicNavigation, type ContentItem, CONTENT_TYPES } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";
import HomePageClient from "./HomePageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

type Messages = typeof en;

function localizedPath(pathname: string, locale: string) {
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

function languageAlternates(pathname: string) {
  return Object.fromEntries(routing.locales.map((locale) => [locale, localizedPath(pathname, locale)]));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  return {
    title: messages.home.meta.title,
    description: messages.home.meta.description,
    alternates: { canonical: localizedPath("/", locale), languages: languageAlternates("/") },
    openGraph: { title: messages.home.meta.title, description: messages.home.meta.description, url: `${siteUrl}${localizedPath("/", locale)}`, images: [{ url: `${siteUrl}/images/hero.webp`, width: 768, height: 432, alt: "Sovereign Tower Wiki" }] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = (await getMessages({ locale })) as Messages;
  const navGroups = getDynamicNavigation(loc);
  const webSite = { "@context": "https://schema.org", "@type": "WebSite", name: "Sovereign Tower Wiki", url: `${siteUrl}${localizedPath("/", locale)}`, description: messages.home.meta.description, inLanguage: locale };

  // 鍔ㄦ€佸姞杞芥墍鏈?content 鐩綍涓嬬殑鏂囩珷
  const allArticles: ContentItem[] = [];
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, loc);
    allArticles.push(...items);
  }

  const recentArticles = [...allArticles]
    .sort((a, b) => {
      const dateA = a.metadata.lastModified || a.metadata.date;
      const dateB = b.metadata.lastModified || b.metadata.date;
      return dateB.localeCompare(dateA);
    })
    .slice(0, 8);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webSite} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <HomePageClient home={messages.home} locale={locale} articles={allArticles} recentArticles={recentArticles} />
        <WikiSidebar locale={locale} navGroups={navGroups} />
      </div>
    </main>
  );
}

