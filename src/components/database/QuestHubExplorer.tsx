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
  quests: QuestRecord[];
  knights: KnightRecord[];
};

const allValue = "all";
const questFavoritesStorageKey = "sovereign-tower.favorite-quests";
const questSorts = ["name", "difficulty", "type"] as const;
type QuestSort = (typeof questSorts)[number];

const labelsByLocale = {
  en: {
    searchSr: "Search quests",
    searchPlaceholder: "Search quest name or description",
    filterType: "Filter by quest type",
    filterDifficulty: "Filter by difficulty",
    sort: "Sort quests",
    allTypes: "All types",
    allDifficulties: "All difficulties",
    sortByName: "Sort by name",
    clear: "Clear",
    showingPrefix: "Showing",
    showingMiddle: "of",
    showingSuffix: "quests",
    requiredStats: "Required Stats",
    recommendedKnights: "Recommended Knights",
    outcomes: "Outcomes",
    unknown: "Unknown",
    emptyTitle: "No quests match these filters.",
    emptyDescription: "Try a broader search term or clear one filter.",
  },
  it: {
    searchSr: "Cerca missioni",
    searchPlaceholder: "Cerca nome o descrizione missione",
    filterType: "Filtra per tipo missione",
    filterDifficulty: "Filtra per difficolta",
    sort: "Ordina missioni",
    allTypes: "Tutti i tipi",
    allDifficulties: "Tutte le difficolta",
    sortByName: "Ordina per nome",
    clear: "Cancella",
    showingPrefix: "Mostra",
    showingMiddle: "di",
    showingSuffix: "missioni",
    requiredStats: "Statistiche richieste",
    recommendedKnights: "Cavalieri consigliati",
    outcomes: "Risultati",
    unknown: "Sconosciuto",
    emptyTitle: "Nessuna missione corrisponde ai filtri.",
    emptyDescription: "Prova una ricerca piu ampia o cancella un filtro.",
  },
  ko: {
    searchSr: "퀘스트 검색",
    searchPlaceholder: "퀘스트 이름 또는 설명 검색",
    filterType: "퀘스트 유형 필터",
    filterDifficulty: "난이도 필터",
    sort: "퀘스트 정렬",
    allTypes: "모든 유형",
    allDifficulties: "모든 난이도",
    sortByName: "이름순 정렬",
    clear: "초기화",
    showingPrefix: "표시 중",
    showingMiddle: "/",
    showingSuffix: "퀘스트",
    requiredStats: "필요 능력치",
    recommendedKnights: "추천 기사",
    outcomes: "결과",
    unknown: "미확인",
    emptyTitle: "필터와 일치하는 퀘스트가 없습니다.",
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

function getQuestSort(searchParams: Pick<URLSearchParams, "get">): QuestSort {
  const sort = searchParams.get("sort");
  return questSorts.includes(sort as QuestSort) ? (sort as QuestSort) : "name";
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

export function QuestHubExplorer({ locale, quests, knights }: Props) {
  const labels = getLabels(locale);
  const favoriteLabels = {
    favorites: "Favorites",
    showFavorites: "Show favorites",
    favoriteQuest: "Favorite quest",
    unfavoriteQuest: "Remove favorite",
  };
  const router = useRouter();
  const pathname = usePathname();
  const [isQueryReady, setIsQueryReady] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState(allValue);
  const [difficulty, setDifficulty] = useState(allValue);
  const [sort, setSort] = useState<QuestSort>("name");
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const knightNames = useMemo(() => new Map(knights.map((knight) => [knight.slug, knight.name])), [knights]);
  const favoriteSet = useMemo(() => new Set(favoriteSlugs), [favoriteSlugs]);
  const questTypes = useMemo(() => uniqueSorted(quests.map((quest) => quest.type)), [quests]);
  const difficulties = useMemo(() => uniqueSorted(quests.map((quest) => quest.difficulty)), [quests]);
  useEffect(() => {
    setFavoriteSlugs(readFavorites(questFavoritesStorageKey));
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setQuery(getParam(params, "q"));
      setType(getParam(params, "type", allValue));
      setDifficulty(getParam(params, "difficulty", allValue));
      setSort(getQuestSort(params));
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
    setOrDelete("type", type, allValue);
    setOrDelete("difficulty", difficulty, allValue);
    setOrDelete("sort", sort, "name");
    const nextQuery = nextParams.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentQuery = window.location.search.replace(/^\?/, "");
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;
    if (nextUrl !== currentUrl) router.replace(nextUrl, { scroll: false });
  }, [difficulty, isQueryReady, pathname, query, router, sort, type]);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredQuests = useMemo(() => {
    const filtered = quests.filter((quest) => {
      const searchableText = [
        quest.name,
        quest.title,
        quest.description,
        quest.type,
        quest.region ?? "",
        quest.bestTraits.join(" "),
        quest.steps.join(" "),
        quest.outcomes.map((outcome) => `${outcome.label} ${outcome.description}`).join(" "),
        quest.relatedGuideHrefs.map((guide) => guide.label).join(" "),
      ].join(" ");
      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText.toLowerCase().includes(normalizedQuery);
      const matchesFavorites = !showFavoritesOnly || favoriteSet.has(quest.slug);
      return matchesQuery && matchesFavorites && (type === allValue || quest.type === type) && (difficulty === allValue || quest.difficulty === difficulty);
    });
    return [...filtered].sort((a, b) => {
      if (sort === "difficulty") return compareText(a.difficulty, b.difficulty) || compareText(a.name, b.name);
      if (sort === "type") return compareText(a.type, b.type) || compareText(a.name, b.name);
      return compareText(a.name, b.name);
    });
  }, [difficulty, favoriteSet, normalizedQuery, quests, showFavoritesOnly, sort, type]);
  const hasFilters = query || type !== allValue || difficulty !== allValue || sort !== "name" || showFavoritesOnly;
  const toggleFavorite = (slug: string) => {
    setFavoriteSlugs((current) => {
      const next = current.includes(slug) ? current.filter((favoriteSlug) => favoriteSlug !== slug) : [...current, slug];
      window.localStorage.setItem(questFavoritesStorageKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <section className="mt-10 space-y-5">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px_160px_auto_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">{labels.searchSr}</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.searchPlaceholder} className="h-10 w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-[hsl(var(--nav-theme))] focus:ring-1 focus:ring-[hsl(var(--nav-theme))]" />
          </label>
          <FilterSelect label={labels.filterType} value={type} onChange={setType} options={questTypes} placeholder={labels.allTypes} />
          <FilterSelect label={labels.filterDifficulty} value={difficulty} onChange={setDifficulty} options={difficulties} placeholder={labels.allDifficulties} />
          <FilterSelect label={labels.sort} value={sort} onChange={(value) => setSort(value as QuestSort)} options={["difficulty", "type"]} placeholder={labels.sortByName} />
          <Button type="button" variant={showFavoritesOnly ? "default" : "outline"} onClick={() => setShowFavoritesOnly((value) => !value)} className="h-10 whitespace-nowrap">
            <Star className={showFavoritesOnly ? "h-4 w-4 fill-current" : "h-4 w-4"} />
            {favoriteLabels.favorites}
          </Button>
          <Button type="button" variant="outline" onClick={() => { setQuery(""); setType(allValue); setDifficulty(allValue); setSort("name"); setShowFavoritesOnly(false); }} disabled={!hasFilters} className="h-10">
            <X className="h-4 w-4" />
            {labels.clear}
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          {labels.showingPrefix} <span className="font-semibold text-foreground">{filteredQuests.length}</span> {labels.showingMiddle} {quests.length} {labels.showingSuffix}
          {showFavoritesOnly && <span className="font-medium text-foreground">- {favoriteLabels.showFavorites}</span>}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredQuests.map((quest) => (
          <article key={quest.slug} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge>{quest.type}</Badge>
                  <Badge variant="outline">{quest.difficulty}</Badge>
                  {quest.region && <Badge variant="secondary">{quest.region}</Badge>}
                </div>
                <h2 className="mt-3 text-xl font-bold text-foreground">
                  <Link href={localized(`/quests/${quest.slug}`, locale)} className="hover:text-[hsl(var(--nav-theme))]">{quest.name}</Link>
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{quest.description}</p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[220px]">
                <Button type="button" variant="outline" onClick={() => toggleFavorite(quest.slug)} aria-label={favoriteSet.has(quest.slug) ? favoriteLabels.unfavoriteQuest : favoriteLabels.favoriteQuest} className="h-10 justify-center">
                  <Star className={favoriteSet.has(quest.slug) ? "h-4 w-4 fill-current" : "h-4 w-4"} />
                  {favoriteSet.has(quest.slug) ? favoriteLabels.unfavoriteQuest : favoriteLabels.favoriteQuest}
                </Button>
                <div className="rounded-md border border-border bg-background p-3 text-sm font-semibold text-foreground">{formatStats(quest.requiredStats, labels.unknown)}</div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <InfoList title={labels.requiredStats} items={[formatStats(quest.requiredStats, labels.unknown)]} />
              <InfoList title={labels.recommendedKnights} items={quest.recommendedKnightSlugs.map((slug) => knightNames.get(slug) ?? slug.replace(/-/g, " "))} />
              <InfoList title={labels.outcomes} items={quest.outcomes.map((outcome) => `${outcome.label}: ${outcome.description}`)} />
            </div>
          </article>
        ))}
      </div>
      {filteredQuests.length === 0 && <EmptyState title={labels.emptyTitle} description={labels.emptyDescription} />}
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
