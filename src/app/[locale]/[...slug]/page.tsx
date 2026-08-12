import { AdUnitBox, DesktopLeftStickyAd } from "@/components/ad-units";
import { KnightHubExplorer } from "@/components/database/KnightHubExplorer";
import { QuestHubExplorer } from "@/components/database/QuestHubExplorer";
import {
  Breadcrumbs,
  JsonLd,
  WikiSidebar,
  localizeHref,
} from "@/components/site";
import { MobileTOC, SidebarTOC } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTENT_TYPES } from "@/config/navigation";
import {
  type KnightRecord,
  KNIGHTS,
  type QuestRecord,
  QUESTS,
  formatStats,
  getLocalizedKnightBySlug,
  getLocalizedKnights,
  getLocalizedKnightName,
  getLocalizedQuestBySlug,
  getLocalizedQuests,
} from "@/data/sovereignTower";
import { type Locale, routing } from "@/i18n/routing";
import {
  type ContentData,
  type ContentItem,
  getAllContent,
  getAllContentPaths,
  getContent,
  getDynamicNavigation,
} from "@/lib/content";
import type en from "@/locales/en.json";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  Swords,
} from "lucide-react";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";
type Messages = typeof en;

function languageAlternates(pathname: string) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, `/${locale}${pathname}`]),
    ),
    "x-default": `/${routing.defaultLocale}${pathname}`,
  };
}

function localizedPath(pathname: string, locale: string) {
  return `/${locale}${pathname}`;
}

function absoluteLocalizedUrl(pathname: string, locale: string) {
  return `${siteUrl}${localizedPath(pathname, locale)}`;
}

function truncateAtWord(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const trimmed = value.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  const boundary = lastSpace > 40 ? lastSpace : maxLength - 1;
  return `${trimmed.slice(0, boundary).trim()}...`;
}

function seoTitle(title: string) {
  const fullTitle = title.includes("Sovereign Tower")
    ? title
    : `${title} - Sovereign Tower Wiki`;
  return truncateAtWord(fullTitle, 65);
}

function seoDescription(description: string) {
  return truncateAtWord(description, 150);
}

function localizeMdxHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith(`/${locale}`)) return href;
  if (href.startsWith("/images/") || href.startsWith("/_next/")) return href;
  if (routing.locales.some((candidate) => href === `/${candidate}` || href.startsWith(`/${candidate}/`))) return href;
  return localizeHref(href, locale);
}

function officialScreenshotCaption(locale: Locale) {
  if (locale === "it") return "Screenshot ufficiale dalla pagina Steam del gioco.";
  if (locale === "ko") return "Official game screenshot from the Steam store page.";
  return "Official game screenshot from the Steam store page.";
}

export async function generateStaticParams() {
  const paths = await getAllContentPaths("en");
  const listingPages = CONTENT_TYPES.map((ct) => ({ slug: [ct] }));
  const databasePages = [
    ...QUESTS.map((quest) => ({ slug: ["quests", quest.slug] })),
    ...KNIGHTS.map((knight) => ({ slug: ["knights", knight.slug] })),
  ];
  const params = [
    ...listingPages,
    ...paths.map((item) => ({ slug: [item.contentType, ...item.slug] })),
    ...databasePages,
  ];
  const seen = new Set<string>();
  return params.filter((param) => {
    const key = param.slug.join("/");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: Locale; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  if (slug.length === 1 && CONTENT_TYPES.includes(slug[0])) {
    const ct = slug[0];
    const ctTitle = ct
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const ctMessages = (
      messages as unknown as Record<string, Record<string, string>>
    )[ct];
    const title = seoTitle(
      ctMessages?.overviewTitle || `${ctTitle} - Sovereign Tower Wiki`,
    );
    const description = seoDescription(
      ctMessages?.overviewDescription ||
        `Browse all ${ctTitle.toLowerCase()} guides and resources for Sovereign Tower.`,
    );
    return {
      title,
      description,
      alternates: {
        canonical: localizedPath(`/${ct}`, locale),
        languages: languageAlternates(`/${ct}`),
      },
      openGraph: {
        title,
        description,
        url: absoluteLocalizedUrl(`/${ct}`, locale),
        images: [`${siteUrl}/images/hero.webp`],
      },
      twitter: {
        card: "summary_large_image",
        images: [`${siteUrl}/images/hero.webp`],
      },
    };
  }
  const [contentType, ...articleSlug] = slug;
  const databaseSlug = articleSlug.join("/");
  if (contentType === "quests") {
    const quest = getLocalizedQuestBySlug(databaseSlug, locale);
    if (quest) {
      const pathname = `/quests/${quest.slug}`;
      const image = quest.image ? `${siteUrl}${quest.image}` : `${siteUrl}/images/hero.webp`;
      return {
        title: seoTitle(quest.title),
        description: seoDescription(quest.description),
        alternates: {
          canonical: localizedPath(pathname, locale),
          languages: languageAlternates(pathname),
        },
        openGraph: {
          type: "article",
          title: seoTitle(quest.title),
          description: seoDescription(quest.description),
          url: absoluteLocalizedUrl(pathname, locale),
          images: [image],
        },
        twitter: { card: "summary_large_image", images: [image] },
      };
    }
  }
  if (contentType === "knights") {
    const knight = getLocalizedKnightBySlug(databaseSlug, locale);
    if (knight) {
      const pathname = `/knights/${knight.slug}`;
      const image = knight.image ? `${siteUrl}${knight.image}` : `${siteUrl}/images/hero.webp`;
      return {
        title: seoTitle(knight.title),
        description: seoDescription(knight.description),
        alternates: {
          canonical: localizedPath(pathname, locale),
          languages: languageAlternates(pathname),
        },
        openGraph: {
          type: "article",
          title: seoTitle(knight.title),
          description: seoDescription(knight.description),
          url: absoluteLocalizedUrl(pathname, locale),
          images: [image],
        },
        twitter: { card: "summary_large_image", images: [image] },
      };
    }
  }
  const item = await getContent(contentType, articleSlug, locale);
  if (!item) return { title: "Not Found" };
  const pathname = `/${contentType}/${articleSlug.join("/")}`;
  const image = item.metadata.image?.startsWith("http")
    ? item.metadata.image
    : `${siteUrl}${item.metadata.image ?? "/images/hero.webp"}`;
  return {
    title: seoTitle(item.metadata.title),
    description: seoDescription(item.metadata.description),
    alternates: {
      canonical: localizedPath(pathname, locale),
      languages: languageAlternates(pathname),
    },
    openGraph: {
      type: "article",
      title: seoTitle(item.metadata.title),
      description: seoDescription(item.metadata.description),
      url: absoluteLocalizedUrl(pathname, locale),
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function SlugPage({
  params,
}: { params: Promise<{ locale: Locale; slug: string[] }> }) {
  const { locale, slug } = await params;
  const navGroups = getDynamicNavigation(locale);
  const messages = (await getMessages({ locale })) as Messages;
  if (slug.length === 1)
    return (
      <NavigationPage
        locale={locale}
        contentType={slug[0]}
        navGroups={navGroups}
      />
    );
  if (slug[0] === "quests") {
    const quest = getLocalizedQuestBySlug(slug.slice(1).join("/"), locale);
    if (quest) return <QuestDetailPage locale={locale} quest={quest} messages={messages} navGroups={navGroups} />;
  }
  if (slug[0] === "knights") {
    const knight = getLocalizedKnightBySlug(slug.slice(1).join("/"), locale);
    if (knight) return <KnightDetailPage locale={locale} knight={knight} messages={messages} navGroups={navGroups} />;
  }
  return (
    <DetailPage
      locale={locale}
      contentType={slug[0]}
      slug={slug.slice(1)}
      navGroups={navGroups}
    />
  );
}

async function NavigationPage({
  locale,
  contentType,
  navGroups,
}: {
  locale: Locale;
  contentType: string;
  navGroups: import("@/lib/content").NavGroup[];
}) {
  if (!CONTENT_TYPES.includes(contentType)) notFound();
  const messages = (await getMessages({ locale })) as Messages;
  if (contentType === "quests") {
    return <QuestHubPage locale={locale} messages={messages} navGroups={navGroups} />;
  }
  if (contentType === "knights") {
    return <KnightHubPage locale={locale} messages={messages} navGroups={navGroups} />;
  }
  const items = await getAllContent(contentType, locale);
  const listData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${contentType} - Sovereign Tower Wiki`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteLocalizedUrl(`/${contentType}/${item.slug}`, locale),
      name: item.metadata.title,
    })),
  };

  const sectionTitle =
    (messages as unknown as Record<string, Record<string, string>>)[contentType]
      ?.overviewTitle ||
    contentType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const sectionDesc =
    (messages as unknown as Record<string, Record<string, string>>)[contentType]
      ?.overviewDescription || "";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={listData} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <Breadcrumbs
            items={[
              { label: messages.shared.home, href: localizeHref("/", locale) },
              { label: sectionTitle },
            ]}
          />
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {sectionTitle}
          </h1>
          {sectionDesc && (
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {sectionDesc}
            </p>
          )}
          <AdUnitBox unit="native" className="mt-8" />
          {items.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <Link
                  key={`/${contentType}/${item.slug}`}
                  href={localizeHref(`/${contentType}/${item.slug}`, locale)}
                  className="group rounded-2xl border border-border bg-card/70 p-5 transition hover:-translate-y-0.5 hover:border-[hsl(var(--nav-theme-light))]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-[hsl(var(--nav-theme))]">
                      <Swords className="h-5 w-5" />
                    </span>
                    {item.metadata.badge && (
                      <Badge variant="secondary">{item.metadata.badge}</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-[hsl(var(--nav-theme))]">
                    {item.metadata.title}
                  </h3>
                  <p className="mt-2 min-h-[3rem] text-sm leading-6 text-muted-foreground">
                    {item.metadata.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[hsl(var(--nav-theme))]">
                    {messages.shared.readMore}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
          {items.length === 0 && (
            <p className="mt-8 text-muted-foreground">
              {messages.shared.noGuidesAvailable}
            </p>
          )}
        </article>
        <aside className="space-y-6">
          <WikiSidebar
            locale={locale}
            navGroups={navGroups}
            currentPath={`/${contentType}`}
          />
          <div className="hidden lg:block">
            <AdUnitBox unit="tower" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function QuestHubPage({
  locale,
  messages,
  navGroups,
}: { locale: Locale; messages: Messages; navGroups: import("@/lib/content").NavGroup[] }) {
  const database = messages.database;
  const localizedQuests = getLocalizedQuests(locale);
  const localizedKnights = getLocalizedKnights(locale);
  const questsByType = localizedQuests.reduce<Record<string, QuestRecord[]>>((groups, quest) => {
    groups[quest.type] = [...(groups[quest.type] ?? []), quest];
    return groups;
  }, {});
  const listData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sovereign Tower Quests Database",
    itemListElement: localizedQuests.map((quest, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteLocalizedUrl(`/quests/${quest.slug}`, locale),
      name: quest.title,
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={listData} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <Breadcrumbs
            items={[
              { label: messages.shared.home, href: localizeHref("/", locale) },
              { label: messages.nav.quests },
            ]}
          />
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {database.questHubTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {database.questHubDescription}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            <DatabaseMetric label={database.quests} value={localizedQuests.length.toString()} />
            <DatabaseMetric label={database.types} value={Object.keys(questsByType).length.toString()} />
            <DatabaseMetric label={database.knightLinks} value={new Set(localizedQuests.flatMap((quest) => quest.recommendedKnightSlugs)).size.toString()} />
            <DatabaseMetric label={database.focus} value="P0" />
          </div>

          <QuestHubExplorer locale={locale} quests={localizedQuests} knights={localizedKnights} />

          <section className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{database.browseByQuestType}</h2>
            {Object.entries(questsByType).map(([type, quests]) => (
              <div key={type}>
                <h3 className="text-lg font-semibold text-foreground">{type}</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {quests.map((quest) => (
                    <DatabaseLinkCard
                      key={quest.slug}
                      title={quest.title}
                      description={`${formatStats(quest.requiredStats)} | ${quest.outcomes.length} ${database.trackedOutcomesLower}`}
                      href={localizeHref(`/quests/${quest.slug}`, locale)}
                      badge={quest.region ?? quest.type}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </article>
        <aside className="space-y-6">
          <WikiSidebar locale={locale} navGroups={navGroups} currentPath="/quests" />
          <div className="hidden lg:block">
            <AdUnitBox unit="tower" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function KnightHubPage({
  locale,
  messages,
  navGroups,
}: { locale: Locale; messages: Messages; navGroups: import("@/lib/content").NavGroup[] }) {
  const database = messages.database;
  const localizedKnights = getLocalizedKnights(locale);
  const localizedQuests = getLocalizedQuests(locale);
  const listData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sovereign Tower Knights Database",
    itemListElement: localizedKnights.map((knight, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteLocalizedUrl(`/knights/${knight.slug}`, locale),
      name: knight.name,
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={listData} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <Breadcrumbs
            items={[
              { label: messages.shared.home, href: localizeHref("/", locale) },
              { label: messages.nav.knights },
            ]}
          />
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {database.knightHubTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {database.knightHubDescription}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            <DatabaseMetric label={database.knights} value={localizedKnights.length.toString()} />
            <DatabaseMetric label={database.questLinks} value={new Set(localizedKnights.flatMap((knight) => knight.bestQuestSlugs)).size.toString()} />
            <DatabaseMetric label={database.traits} value={new Set(localizedKnights.flatMap((knight) => [...knight.traits, ...knight.hiddenTraits])).size.toString()} />
            <DatabaseMetric label={database.focus} value="P0" />
          </div>

          <KnightHubExplorer locale={locale} knights={localizedKnights} quests={localizedQuests} />
        </article>
        <aside className="space-y-6">
          <WikiSidebar locale={locale} navGroups={navGroups} currentPath="/knights" />
          <div className="hidden lg:block">
            <AdUnitBox unit="tower" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function QuestDetailPage({
  locale,
  quest,
  messages,
  navGroups,
}: { locale: Locale; quest: QuestRecord; messages: Messages; navGroups: import("@/lib/content").NavGroup[] }) {
  const database = messages.database;
  const screenshotCaption = officialScreenshotCaption(locale);
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: messages.shared.home, item: absoluteLocalizedUrl("/", locale) },
      { "@type": "ListItem", position: 2, name: messages.nav.quests, item: absoluteLocalizedUrl("/quests", locale) },
      { "@type": "ListItem", position: 3, name: quest.name, item: absoluteLocalizedUrl(`/quests/${quest.slug}`, locale) },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbData} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <Breadcrumbs
            items={[
              { label: messages.shared.home, href: localizeHref("/", locale) },
              { label: messages.nav.quests, href: localizeHref("/quests", locale) },
              { label: quest.name },
            ]}
          />
          <header className="rounded-lg border border-border bg-card p-6 shadow-sm">
            {quest.image && (
              <figure className="mb-6 overflow-hidden rounded-md border border-border">
                <Image
                  src={quest.image}
                  alt={`${quest.name} official game screenshot`}
                  width={1920}
                  height={1080}
                  className="h-auto w-full object-cover"
                  priority
                />
                <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                  {screenshotCaption}
                </figcaption>
              </figure>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge>{quest.type}</Badge>
              {quest.region && <Badge variant="secondary">{quest.region}</Badge>}
              <Badge variant="outline">{quest.difficulty}</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{quest.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{quest.description}</p>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-3">
            <DatabaseMetric label={database.requiredStats} value={formatStats(quest.requiredStats)} />
            <DatabaseMetric label={database.recommendedKnights} value={quest.recommendedKnightSlugs.length.toString()} />
            <DatabaseMetric label={database.trackedOutcomes} value={quest.outcomes.length.toString()} />
          </section>

          <section className="mt-10 rounded-lg border border-border bg-card p-5">
            <h2 className="text-2xl font-bold text-foreground">{database.questInfo}</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoPair label={database.type} value={quest.type} />
              <InfoPair label={database.region} value={quest.region ?? database.unknown} />
              <InfoPair label={database.difficulty} value={quest.difficulty} />
              <InfoPair label={database.requiredStats} value={formatStats(quest.requiredStats)} />
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground">{database.recommendedKnights}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {quest.recommendedKnightSlugs.map((slug) => {
                const knight = getLocalizedKnightBySlug(slug, locale);
                return (
                  <DatabaseLinkCard
                    key={slug}
                    title={knight?.name ?? getLocalizedKnightName(slug, locale)}
                    description={knight ? `${formatStats(knight.stats)} | ${knight.role}` : database.knightDataPending}
                    href={localizeHref(`/knights/${slug}`, locale)}
                    badge={database.knight}
                  />
                );
              })}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground">{database.steps}</h2>
            <ol className="mt-4 space-y-3">
              {quest.steps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[hsl(var(--nav-theme))] text-xs font-bold text-primary-foreground">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground">{database.outcomes}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {quest.outcomes.map((outcome) => (
                <div key={outcome.label} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-foreground">{outcome.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{outcome.description}</p>
                </div>
              ))}
            </div>
          </section>

          <RelatedGuideButtons locale={locale} links={quest.relatedGuideHrefs} label={messages.shared.relatedGuides} />
        </article>
        <aside className="space-y-6">
          <WikiSidebar locale={locale} navGroups={navGroups} currentPath={`/quests/${quest.slug}`} />
          <div className="hidden lg:block">
            <AdUnitBox unit="tower" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function KnightDetailPage({
  locale,
  knight,
  messages,
  navGroups,
}: { locale: Locale; knight: KnightRecord; messages: Messages; navGroups: import("@/lib/content").NavGroup[] }) {
  const database = messages.database;
  const screenshotCaption = officialScreenshotCaption(locale);
  const relatedQuests = knight.bestQuestSlugs
    .map((slug) => getLocalizedQuestBySlug(slug, locale))
    .filter((quest): quest is QuestRecord => Boolean(quest));
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: messages.shared.home, item: absoluteLocalizedUrl("/", locale) },
      { "@type": "ListItem", position: 2, name: messages.nav.knights, item: absoluteLocalizedUrl("/knights", locale) },
      { "@type": "ListItem", position: 3, name: knight.name, item: absoluteLocalizedUrl(`/knights/${knight.slug}`, locale) },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbData} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <Breadcrumbs
            items={[
              { label: messages.shared.home, href: localizeHref("/", locale) },
              { label: messages.nav.knights, href: localizeHref("/knights", locale) },
              { label: knight.name },
            ]}
          />
          <header className="rounded-lg border border-border bg-card p-6 shadow-sm">
            {knight.image && (
              <figure className="mb-6 overflow-hidden rounded-md border border-border">
                <Image
                  src={knight.image}
                  alt={`${knight.name} official game screenshot`}
                  width={1920}
                  height={1080}
                  className="h-auto w-full object-cover"
                  priority
                />
                <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                  {screenshotCaption}
                </figcaption>
              </figure>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge>{knight.role}</Badge>
              <Badge variant="secondary">{database.knightProfile}</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{knight.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{knight.description}</p>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-3">
            <DatabaseMetric label={database.stats} value={formatStats(knight.stats)} />
            <DatabaseMetric label={database.traits} value={knight.traits.length.toString()} />
            <DatabaseMetric label={database.bestQuests} value={knight.bestQuestSlugs.length.toString()} />
          </section>

          <section className="mt-10 rounded-lg border border-border bg-card p-5">
            <h2 className="text-2xl font-bold text-foreground">{database.knightInfo}</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoPair label={database.role} value={knight.role} />
              <InfoPair label={database.stats} value={formatStats(knight.stats)} />
              <InfoPair label={database.recruitment} value={knight.recruitment} />
              <InfoPair label={database.preferences} value={knight.preferences.join(", ")} />
            </dl>
          </section>

          <section className="mt-10 grid gap-6 sm:grid-cols-2">
            <TraitPanel title={database.knownTraits} values={knight.traits} />
            <TraitPanel title={database.hiddenRouteTraits} values={knight.hiddenTraits} />
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground">{database.bestQuests}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedQuests.map((quest) => (
                <DatabaseLinkCard
                  key={quest.slug}
                  title={quest.name}
                  description={`${quest.type} | ${formatStats(quest.requiredStats)}`}
                  href={localizeHref(`/quests/${quest.slug}`, locale)}
                  badge={quest.region ?? quest.type}
                />
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground">{database.notes}</h2>
            <ul className="mt-4 space-y-3">
              {knight.notes.map((note) => (
                <li key={note} className="rounded-lg border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">{note}</li>
              ))}
            </ul>
          </section>

          <RelatedGuideButtons locale={locale} links={knight.relatedGuideHrefs} label={messages.shared.relatedGuides} />
        </article>
        <aside className="space-y-6">
          <WikiSidebar locale={locale} navGroups={navGroups} currentPath={`/knights/${knight.slug}`} />
          <div className="hidden lg:block">
            <AdUnitBox unit="tower" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function DatabaseMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function DatabaseLinkCard({ title, description, href, badge }: { title: string; description: string; href: string; badge: string }) {
  return (
    <Link href={href} className="block rounded-lg border border-border bg-card p-4 transition hover:border-[hsl(var(--nav-theme-light))]">
      <Badge variant="secondary">{badge}</Badge>
      <h3 className="mt-3 font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </Link>
  );
}

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-foreground">{value}</dd>
    </div>
  );
}

function TraitPanel({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge key={value} variant="outline">{value}</Badge>
        ))}
      </div>
    </section>
  );
}

function RelatedGuideButtons({ locale, links, label }: { locale: Locale; links: Array<{ label: string; href: string }>; label: string }) {
  return (
    <section className="mt-10 rounded-lg border border-border bg-card p-5">
      <h2 className="text-2xl font-bold text-foreground">{label}</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <Button key={link.href} asChild variant="outline">
            <Link href={localizeHref(link.href, locale)}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
}

async function DetailPage({
  locale,
  contentType,
  slug,
  navGroups,
}: {
  locale: Locale;
  contentType: string;
  slug: string[];
  navGroups: import("@/lib/content").NavGroup[];
}) {
  if (!CONTENT_TYPES.includes(contentType)) notFound();
  const messages = (await getMessages({ locale })) as Messages;
  const item = await getContent(contentType, slug, locale);
  if (!item) notFound();
  const pathname = `/${contentType}/${slug.join("/")}`;
  const image = item.metadata.image?.startsWith("http")
    ? item.metadata.image
    : `${siteUrl}${item.metadata.image ?? "/images/hero.webp"}`;
  const tocLabel =
    messages.shared.tableOfContents ||
    messages.shared.inThisSection ||
    "Table of Contents";
  const sectionLabel = contentType
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.metadata.title,
    description: item.metadata.description,
    image,
    datePublished: item.metadata.date,
    dateModified: item.metadata.lastModified ?? item.metadata.date,
    mainEntityOfPage: absoluteLocalizedUrl(pathname, locale),
    author: { "@type": "Organization", name: "Sovereign Tower Wiki" },
    publisher: {
      "@type": "Organization",
      name: "Sovereign Tower Wiki",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/android-chrome-512x512.png`,
      },
    },
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteLocalizedUrl("/", locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionLabel,
        item: absoluteLocalizedUrl(`/${contentType}`, locale),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.metadata.title,
        item: absoluteLocalizedUrl(pathname, locale),
      },
    ],
  };

  const relatedLabel = messages.shared.relatedGuides || "Related Guides";
  const MDXContent = item.MDXContent as React.ComponentType<{
    components?: {
      a?: (props: { href?: string; children?: React.ReactNode }) => React.ReactNode;
    };
  }>;
  const mdxComponents = {
    a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) => (
      <Link
        className="font-medium text-[hsl(var(--nav-theme))] underline-offset-4 hover:underline"
        href={localizeMdxHref(href, locale)}
      >
        {children}
      </Link>
    ),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DesktopLeftStickyAd />
      <JsonLd data={articleData} />
      <JsonLd data={breadcrumbData} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,820px)_280px] lg:justify-center">
        <article>
          <Breadcrumbs
            items={[
              { label: messages.shared.home, href: localizeHref("/", locale) },
              {
                label: sectionLabel,
                href: localizeHref(`/${contentType}`, locale),
              },
              { label: item.metadata.title },
            ]}
          />
          <header className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-md uppercase tracking-[0.14em]"
              >
                {sectionLabel}
              </Badge>
              {item.metadata.badge && (
                <Badge className="rounded-md bg-[hsl(var(--nav-theme))] text-black">
                  {item.metadata.badge}
                </Badge>
              )}
            </div>
            <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {item.metadata.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {item.metadata.summary ?? item.metadata.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[hsl(var(--nav-theme))]" />
                {item.metadata.lastModified ?? item.metadata.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[hsl(var(--nav-theme))]" />
                Guide Page
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-[hsl(var(--nav-theme))]" />
                Quick reference
              </span>
            </div>
          </header>
          <MobileTOC headings={item.headings} label={tocLabel} />
          <AdUnitBox unit="rectangle" className="mt-6" />
          <div className="prose-invert mt-8 max-w-none">
            <MDXContent components={mdxComponents} />
          </div>
          <ArticleCards
            locale={locale}
            contentType={contentType}
            currentSlug={slug.join("/")}
            relatedLabel={relatedLabel}
          />
        </article>
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <SidebarTOC
            headings={item.headings}
            label={tocLabel}
            currentPathname={pathname}
          />
          <WikiSidebar
            locale={locale}
            navGroups={navGroups}
            currentPath={pathname}
          />
          <ArticleSideInfo item={item} sectionLabel={sectionLabel} />
          <div className="hidden lg:block">
            <AdUnitBox unit="tower" />
          </div>
        </aside>
      </div>
    </main>
  );
}

function ArticleSideInfo({
  item,
  sectionLabel,
}: { item: ContentData; sectionLabel: string }) {
  return (
    <div className="hidden rounded-lg border border-border bg-card p-5 shadow-sm lg:block">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Quick Info
      </h3>
      <dl className="mt-3 space-y-3 border-t border-border pt-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Type</dt>
          <dd className="font-semibold text-foreground">{sectionLabel}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Updated</dt>
          <dd className="font-semibold text-foreground">
            {item.metadata.lastModified ?? item.metadata.date}
          </dd>
        </div>
        {item.metadata.badge && (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Focus</dt>
            <dd className="font-semibold text-foreground">
              {item.metadata.badge}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

async function ArticleCards({
  locale,
  contentType,
  currentSlug,
  relatedLabel,
}: {
  locale: string;
  contentType: string;
  currentSlug: string;
  relatedLabel: string;
}) {
  const allItems = await getAllContent(contentType, locale as Locale);
  const related = allItems
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 space-y-8">
      <section>
        <h3 className="text-xl font-bold text-foreground">{relatedLabel}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {related.map((item) => (
            <SmallCard
              key={item.slug}
              icon={<Swords className="h-5 w-5" />}
              title={item.metadata.title}
              description={item.metadata.description}
              href={localizeHref(`/${contentType}/${item.slug}`, locale)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function SmallCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-border bg-card/70 p-5 transition hover:border-[hsl(var(--nav-theme-light))]"
    >
      {icon && <div className="mb-3 text-[hsl(var(--nav-theme))]">{icon}</div>}
      <h4 className="font-bold text-foreground">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}
