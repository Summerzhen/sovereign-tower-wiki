"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { KnightRecord, QuestRecord, StatBlock, StatKey } from "@/data/sovereignTower";
import { STAT_LABELS } from "@/data/sovereignTower";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  locale: string;
  knights: KnightRecord[];
  quests: QuestRecord[];
};

const allValue = "all";
const knightFavoritesStorageKey = "sovereign-tower.favorite-knights";
const knightSorts = ["name", "role"] as const;
type KnightSort = (typeof knightSorts)[number];

const labelsByLocale = {
  en: {
    searchSr: "Search knights",
    searchPlaceholder: "Search knight name or description",
    filterRole: "Filter by role",
    filterTrait: "Filter by trait",
    sort: "Sort knights",
    allRoles: "All roles",
    allTraits: "All traits",
    sortByName: "Sort by name",
    clear: "Clear",
    showingPrefix: "Showing",
    showingMiddle: "of",
    showingSuffix: "knights",
    stats: "Stats",
    traits: "Traits",
    bestQuests: "Best Quests",
    unknown: "Unknown",
    emptyTitle: "No knights match these filters.",
    emptyDescription: "Try a broader search term or clear one filter.",
  },
  it: {
    searchSr: "Cerca cavalieri",
    searchPlaceholder: "Cerca nome o descrizione cavaliere",
    filterRole: "Filtra per ruolo",
    filterTrait: "Filtra per tratto",
    sort: "Ordina cavalieri",
    allRoles: "Tutti i ruoli",
    allTraits: "Tutti i tratti",
    sortByName: "Ordina per nome",
    clear: "Cancella",
    showingPrefix: "Mostra",
    showingMiddle: "di",
    showingSuffix: "cavalieri",
    stats: "Statistiche",
    traits: "Tratti",
    bestQuests: "Migliori missioni",
    unknown: "Sconosciuto",
    emptyTitle: "Nessun cavaliere corrisponde ai filtri.",
    emptyDescription: "Prova una ricerca piu ampia o cancella un filtro.",
  },
  ko: {
    searchSr: "기사 검색",
    searchPlaceholder: "기사 이름 또는 설명 검색",
    filterRole: "역할 필터",
    filterTrait: "특성 필터",
    sort: "기사 정렬",
    allRoles: "모든 역할",
    allTraits: "모든 특성",
    sortByName: "이름순 정렬",
    clear: "초기화",
    showingPrefix: "표시 중",
    showingMiddle: "/",
    showingSuffix: "기사",
    stats: "능력치",
    traits: "특성",
    bestQuests: "최고 퀘스트",
    unknown: "미확인",
    emptyTitle: "필터와 일치하는 기사가 없습니다.",
    emptyDescription: "검색어를 넓히거나 필터를 초기화해 보세요.",
  },
} as const;

function localized(href: string, locale: string) {
  return `/${locale}${href === "/" ? "" : href}`;
}

function getLabels(locale: string) {
  return labelsByLocale[locale as keyof typeof labelsByLocale] ?? labelsByLocale.en;
}

function formatStats(stats: StatBlock, unknownLabel: string) {
  const entries = Object.entries(stats) as Array<[StatKey, number]>;
  if (entries.length === 0) return unknownLabel;
  return entries.map(([key, value]) => `${STAT_LABELS[key]} ${value}`).join(" / ");
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function getParam(searchParams: Pick<URLSearchParams, "get">, key: string, fallback = "") {
  return searchParams.get(key) ?? fallback;
}

function getKnightSort(searchParams: Pick<URLSearchParams, "get">): KnightSort {
  const sort = searchParams.get("sort");
  return knightSorts.includes(sort as KnightSort) ? (sort as KnightSort) : "name";
}

function compareText(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function readFavorites(storageKey: string) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export function KnightHubExplorer({ locale, knights, quests }: Props) {
  const labels = getLabels(locale);
  const favoriteLabels = {
    favorites: "Favorites",
    showFavorites: "Show favorites",
    favoriteKnight: "Favorite knight",
    unfavoriteKnight: "Remove favorite",
  };
  const router = useRouter();
  const pathname = usePathname();
  const [isQueryReady, setIsQueryReady] = useState(false);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState(allValue);
  const [trait, setTrait] = useState(allValue);
  const [sort, setSort] = useState<KnightSort>("name");
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const questNames = useMemo(() => new Map(quests.map((quest) => [quest.slug, quest.name])), [quests]);
  const favoriteSet = useMemo(() => new Set(favoriteSlugs), [favoriteSlugs]);
  const roles = useMemo(() => uniqueSorted(knights.map((knight) => knight.role)), [knights]);
  const traits = useMemo(() => uniqueSorted(knights.flatMap((knight) => [...knight.traits, ...knight.hiddenTraits])), [knights]);
  useEffect(() => {
    setFavoriteSlugs(readFavorites(knightFavoritesStorageKey));
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setQuery(getParam(params, "q"));
      setRole(getParam(params, "role", allValue));
      setTrait(getParam(params, "trait", allValue));
      setSort(getKnightSort(params));
    };
    syncFromUrl();
    setIsQueryReady(true);
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);
  useEffect(() => {
    if (!isQueryReady || !pathname) return;
    const nextParams = new URLSearchParams(window.location.search);
    const setOrDelete = (key: string, value: string, defaultValue = "") => {
      if (value && value !== defaultValue) nextParams.set(key, value);
      else nextParams.delete(key);
    };
    setOrDelete("q", query.trim());
    setOrDelete("role", role, allValue);
    setOrDelete("trait", trait, allValue);
    setOrDelete("sort", sort, "name");
    const nextQuery = nextParams.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentQuery = window.location.search.replace(/^\?/, "");
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;
    if (nextUrl !== currentUrl) router.replace(nextUrl, { scroll: false });
  }, [isQueryReady, pathname, query, role, router, sort, trait]);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredKnights = useMemo(() => {
    const filtered = knights.filter((knight) => {
      const allTraits = [...knight.traits, ...knight.hiddenTraits];
      const searchableText = [
        knight.name,
        knight.title,
        knight.description,
        knight.role,
        allTraits.join(" "),
        knight.preferences.join(" "),
        knight.recruitment,
        knight.notes.join(" "),
        knight.relatedGuideHrefs.map((guide) => guide.label).join(" "),
      ].join(" ");
      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText.toLowerCase().includes(normalizedQuery);
      const matchesFavorites = !showFavoritesOnly || favoriteSet.has(knight.slug);
      return matchesQuery && matchesFavorites && (role === allValue || knight.role === role) && (trait === allValue || allTraits.includes(trait));
    });
    return [...filtered].sort((a, b) => {
      if (sort === "role") return compareText(a.role, b.role) || compareText(a.name, b.name);
      return compareText(a.name, b.name);
    });
  }, [favoriteSet, knights, normalizedQuery, role, showFavoritesOnly, sort, trait]);
  const hasFilters = query || role !== allValue || trait !== allValue || sort !== "name" || showFavoritesOnly;
  const toggleFavorite = (slug: string) => {
    setFavoriteSlugs((current) => {
      const next = current.includes(slug) ? current.filter((favoriteSlug) => favoriteSlug !== slug) : [...current, slug];
      window.localStorage.setItem(knightFavoritesStorageKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <section className="mt-10 space-y-5">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_220px_160px_auto_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">{labels.searchSr}</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.searchPlaceholder} className="h-10 w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-[hsl(var(--nav-theme))] focus:ring-1 focus:ring-[hsl(var(--nav-theme))]" />
          </label>
          <FilterSelect label={labels.filterRole} value={role} onChange={setRole} options={roles} placeholder={labels.allRoles} />
          <FilterSelect label={labels.filterTrait} value={trait} onChange={setTrait} options={traits} placeholder={labels.allTraits} />
          <FilterSelect label={labels.sort} value={sort} onChange={(value) => setSort(value as KnightSort)} options={["role"]} placeholder={labels.sortByName} />
          <Button type="button" variant={showFavoritesOnly ? "default" : "outline"} onClick={() => setShowFavoritesOnly((value) => !value)} className="h-10 whitespace-nowrap">
            <Star className={showFavoritesOnly ? "h-4 w-4 fill-current" : "h-4 w-4"} />
            {favoriteLabels.favorites}
          </Button>
          <Button type="button" variant="outline" onClick={() => { setQuery(""); setRole(allValue); setTrait(allValue); setSort("name"); setShowFavoritesOnly(false); }} disabled={!hasFilters} className="h-10">
            <X className="h-4 w-4" />
            {labels.clear}
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          {labels.showingPrefix} <span className="font-semibold text-foreground">{filteredKnights.length}</span> {labels.showingMiddle} {knights.length} {labels.showingSuffix}
          {showFavoritesOnly && <span className="font-medium text-foreground">- {favoriteLabels.showFavorites}</span>}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredKnights.map((knight) => (
          <article key={knight.slug} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <Badge variant="secondary">{knight.role}</Badge>
                <h2 className="mt-3 text-xl font-bold text-foreground">
                  <Link href={localized(`/knights/${knight.slug}`, locale)} className="hover:text-[hsl(var(--nav-theme))]">{knight.name}</Link>
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{knight.description}</p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[220px]">
                <Button type="button" variant="outline" onClick={() => toggleFavorite(knight.slug)} aria-label={favoriteSet.has(knight.slug) ? favoriteLabels.unfavoriteKnight : favoriteLabels.favoriteKnight} className="h-10 justify-center">
                  <Star className={favoriteSet.has(knight.slug) ? "h-4 w-4 fill-current" : "h-4 w-4"} />
                  {favoriteSet.has(knight.slug) ? favoriteLabels.unfavoriteKnight : favoriteLabels.favoriteKnight}
                </Button>
                <div className="rounded-md border border-border bg-background p-3 text-sm font-semibold text-foreground">{formatStats(knight.stats, labels.unknown)}</div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <InfoList title={labels.stats} items={[formatStats(knight.stats, labels.unknown)]} />
              <InfoList title={labels.traits} items={[...knight.traits, ...knight.hiddenTraits]} />
              <InfoList title={labels.bestQuests} items={knight.bestQuestSlugs.map((slug) => questNames.get(slug) ?? slug.replace(/-/g, " "))} />
            </div>
          </article>
        ))}
      </div>
      {filteredKnights.length === 0 && <EmptyState title={labels.emptyTitle} description={labels.emptyDescription} />}
    </section>
  );
}

function FilterSelect({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string }) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-[hsl(var(--nav-theme))] focus:ring-1 focus:ring-[hsl(var(--nav-theme))]">
        <option value={allValue}>{placeholder}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => <li key={item} className="rounded-md bg-muted/50 px-3 py-2">{item}</li>)}
      </ul>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
