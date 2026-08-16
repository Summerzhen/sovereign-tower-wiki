type GuideHubCopy = {
  eyebrow: string;
  title: string;
  browseAll: string;
  openGuide: string;
  systemsCta: string;
};

type GuideHubLink = {
  href: string;
  title: string;
  description: string;
  contentTypes: string[];
};

const DEFAULT_COPY: GuideHubCopy = {
  eyebrow: "Quick Answers",
  title: "Sovereign Tower Guide Hubs",
  browseAll: "Browse all guides",
  openGuide: "Open guide",
  systemsCta: "Explore Systems",
};

const COPY_BY_LOCALE: Record<string, GuideHubCopy> = {
  de: {
    eyebrow: "Schnelle Antworten",
    title: "Sovereign Tower Guide-Hubs",
    browseAll: "Alle Guides durchsuchen",
    openGuide: "Guide öffnen",
    systemsCta: "Systeme erkunden",
  },
  fr: {
    eyebrow: "Réponses rapides",
    title: "Hubs de guides Sovereign Tower",
    browseAll: "Parcourir tous les guides",
    openGuide: "Ouvrir le guide",
    systemsCta: "Explorer les systèmes",
  },
  it: {
    eyebrow: "Risposte rapide",
    title: "Hub guide di Sovereign Tower",
    browseAll: "Sfoglia tutte le guide",
    openGuide: "Apri guida",
    systemsCta: "Esplora sistemi",
  },
  ja: {
    eyebrow: "クイック回答",
    title: "Sovereign Tower ガイドハブ",
    browseAll: "すべてのガイドを見る",
    openGuide: "ガイドを開く",
    systemsCta: "システムを見る",
  },
  ko: {
    eyebrow: "빠른 답변",
    title: "Sovereign Tower 가이드 허브",
    browseAll: "모든 가이드 보기",
    openGuide: "가이드 열기",
    systemsCta: "시스템 살펴보기",
  },
};

const DEFAULT_LINKS: GuideHubLink[] = [
  {
    href: "/quests",
    title: "Quests Database",
    description: "Search quests by stats, type, recommended knights, and outcomes.",
    contentTypes: ["guide", "quests", "knights", "characters", "romance", "systems"],
  },
  {
    href: "/knights",
    title: "Knights Database",
    description: "Compare knight stats, traits, meals, recruitment, and best assignments.",
    contentTypes: ["guide", "quests", "knights", "characters", "romance", "systems"],
  },
  {
    href: "/systems/sovereign-tower-meals",
    title: "Meals Guide",
    description: "Connect favorite foods, cooking choices, servant support, and affinity tracking.",
    contentTypes: ["guide", "quests", "knights", "characters", "romance", "systems"],
  },
  {
    href: "/systems/sovereign-tower-demon-power",
    title: "Demon Power Guide",
    description: "Understand rewind choices, power costs, route impact, and ending consequences.",
    contentTypes: ["guide", "quests", "characters", "romance", "systems"],
  },
  {
    href: "/romance/sovereign-tower-romance-options",
    title: "Romance Options",
    description: "Review romance routes, partner choices, affinity risks, and character outcomes.",
    contentTypes: ["guide", "knights", "characters", "romance", "systems"],
  },
  {
    href: "/guide/sovereign-tower-endings",
    title: "Endings Guide",
    description: "Track ending requirements, important choices, route locks, and consequences.",
    contentTypes: ["guide", "quests", "characters", "romance", "systems"],
  },
  {
    href: "/characters/sovereign-tower-angelica-death",
    title: "Angelica Death Guide",
    description: "Find the documented choices and consequences around Angelica's death.",
    contentTypes: ["guide", "quests", "characters", "romance", "systems"],
  },
  {
    href: "/guide/sovereign-tower-walkthrough",
    title: "Walkthrough",
    description: "Follow the main route map, early assignments, act notes, and progression checks.",
    contentTypes: ["quests", "knights", "characters", "romance", "systems"],
  },
];

const LINK_COPY_BY_LOCALE: Record<string, Record<string, Partial<GuideHubLink>>> = {
  de: {
    "/quests": {
      title: "Quest-Datenbank",
      description: "Suche Quests nach Werten, Typ, empfohlenen Rittern und Ergebnissen.",
    },
    "/knights": {
      title: "Ritter-Datenbank",
      description: "Vergleiche Werte, Eigenschaften, Mahlzeiten, Rekrutierung und beste Einsätze.",
    },
    "/systems/sovereign-tower-meals": {
      title: "Mahlzeiten-Guide",
      description: "Verbinde Lieblingsessen, Kochentscheidungen, Dienerhilfe und Affinität.",
    },
    "/systems/sovereign-tower-demon-power": {
      title: "Dämonenkraft-Guide",
      description: "Verstehe Rückspulentscheidungen, Kosten, Routenfolgen und Enden.",
    },
    "/romance/sovereign-tower-romance-options": {
      title: "Romance-Optionen",
      description: "Prüfe Routen, Partnerwahl, Affinitätsrisiken und Charakterausgänge.",
    },
    "/guide/sovereign-tower-endings": {
      title: "Endings-Guide",
      description: "Verfolge Anforderungen, wichtige Entscheidungen, Routensperren und Folgen.",
    },
    "/characters/sovereign-tower-angelica-death": {
      title: "Angelica-Tod-Guide",
      description: "Prüfe dokumentierte Entscheidungen und Folgen rund um Angelicas Tod.",
    },
    "/guide/sovereign-tower-walkthrough": {
      title: "Walkthrough",
      description: "Folge Routenkarte, frühen Einsätzen, Akt-Notizen und Fortschrittschecks.",
    },
  },
  fr: {
    "/quests": {
      title: "Base de quêtes",
      description: "Rechercher les quêtes par stats, type, chevaliers recommandés et résultats.",
    },
    "/knights": {
      title: "Base de chevaliers",
      description: "Comparer stats, traits, repas, recrutement et meilleures affectations.",
    },
    "/systems/sovereign-tower-meals": {
      title: "Guide des repas",
      description: "Relier plats favoris, cuisine, soutien des serviteurs et affinité.",
    },
    "/systems/sovereign-tower-demon-power": {
      title: "Guide du pouvoir démoniaque",
      description: "Comprendre rembobinage, coûts, impact des routes et fins.",
    },
    "/romance/sovereign-tower-romance-options": {
      title: "Options de romance",
      description: "Suivre routes, partenaires, risques d'affinité et résultats de personnages.",
    },
    "/guide/sovereign-tower-endings": {
      title: "Guide des fins",
      description: "Suivre exigences, choix importants, verrous de route et conséquences.",
    },
    "/characters/sovereign-tower-angelica-death": {
      title: "Guide de la mort d'Angelica",
      description: "Retrouver les choix documentés et les conséquences autour de la mort d'Angelica.",
    },
    "/guide/sovereign-tower-walkthrough": {
      title: "Soluce",
      description: "Suivre carte de route, premières missions, actes et progression.",
    },
  },
  it: {
    "/quests": {
      title: "Database missioni",
      description: "Cerca missioni per statistiche, tipo, cavalieri consigliati ed esiti.",
    },
    "/knights": {
      title: "Database cavalieri",
      description: "Confronta statistiche, tratti, pasti, reclutamento e migliori incarichi.",
    },
    "/systems/sovereign-tower-meals": {
      title: "Guida pasti",
      description: "Collega cibi preferiti, cucina, supporto servitori e affinità.",
    },
    "/systems/sovereign-tower-demon-power": {
      title: "Guida potere demoniaco",
      description: "Capisci rewind, costi, impatto sulle rotte e finali.",
    },
    "/romance/sovereign-tower-romance-options": {
      title: "Opzioni romance",
      description: "Rivedi rotte, partner, rischi di affinità ed esiti dei personaggi.",
    },
    "/guide/sovereign-tower-endings": {
      title: "Guida finali",
      description: "Traccia requisiti, scelte importanti, blocchi di rotta e conseguenze.",
    },
    "/characters/sovereign-tower-angelica-death": {
      title: "Guida morte di Angelica",
      description: "Trova scelte documentate e conseguenze legate alla morte di Angelica.",
    },
    "/guide/sovereign-tower-walkthrough": {
      title: "Walkthrough",
      description: "Segui mappa della rotta, incarichi iniziali, atti e progressi.",
    },
  },
  ja: {
    "/quests": {
      title: "クエストデータベース",
      description: "ステータス、タイプ、おすすめナイト、結果でクエストを探す。",
    },
    "/knights": {
      title: "ナイトデータベース",
      description: "ステータス、特性、食事、加入メモ、最適な任務を比較する。",
    },
    "/systems/sovereign-tower-meals": {
      title: "食事ガイド",
      description: "好物、料理選択、従者サポート、好感度をつなげて確認する。",
    },
    "/systems/sovereign-tower-demon-power": {
      title: "悪魔の力ガイド",
      description: "巻き戻し、コスト、ルート影響、エンディングへの影響を理解する。",
    },
    "/romance/sovereign-tower-romance-options": {
      title: "ロマンス選択肢",
      description: "ロマンスルート、相手、好感度リスク、キャラクター結果を確認する。",
    },
    "/guide/sovereign-tower-endings": {
      title: "エンディングガイド",
      description: "条件、重要な選択、ルートロック、結果を追跡する。",
    },
    "/characters/sovereign-tower-angelica-death": {
      title: "Angelica 死亡ガイド",
      description: "Angelica の死亡に関わる選択と結果を確認する。",
    },
    "/guide/sovereign-tower-walkthrough": {
      title: "攻略チャート",
      description: "ルートマップ、序盤任務、章メモ、進行チェックを追う。",
    },
  },
  ko: {
    "/quests": {
      title: "퀘스트 데이터베이스",
      description: "스탯, 유형, 추천 기사, 결과별로 퀘스트를 검색합니다.",
    },
    "/knights": {
      title: "기사 데이터베이스",
      description: "기사 스탯, 특성, 식사, 모집 메모, 최적 배정을 비교합니다.",
    },
    "/systems/sovereign-tower-meals": {
      title: "식사 가이드",
      description: "선호 음식, 요리 선택, 하인 지원, 친밀도 추적을 연결합니다.",
    },
    "/systems/sovereign-tower-demon-power": {
      title: "악마의 힘 가이드",
      description: "되감기 선택, 비용, 루트 영향, 엔딩 결과를 이해합니다.",
    },
    "/romance/sovereign-tower-romance-options": {
      title: "로맨스 선택지",
      description: "로맨스 루트, 파트너 선택, 친밀도 위험, 캐릭터 결과를 확인합니다.",
    },
    "/guide/sovereign-tower-endings": {
      title: "엔딩 가이드",
      description: "엔딩 조건, 주요 선택, 루트 잠금, 결과를 추적합니다.",
    },
    "/characters/sovereign-tower-angelica-death": {
      title: "Angelica 사망 가이드",
      description: "Angelica 사망과 관련된 선택과 결과를 확인합니다.",
    },
    "/guide/sovereign-tower-walkthrough": {
      title: "공략",
      description: "주요 루트, 초반 배정, 막별 메모, 진행 체크를 따라갑니다.",
    },
  },
};

export function getGuideHubCopy(locale: string): GuideHubCopy {
  return COPY_BY_LOCALE[locale] ?? DEFAULT_COPY;
}

export function getGuideHubLinks(locale: string): GuideHubLink[] {
  const localized = LINK_COPY_BY_LOCALE[locale] ?? {};
  return DEFAULT_LINKS.map((link) => ({
    ...link,
    ...localized[link.href],
  }));
}

export function getHomeGuideHubLinks(locale: string): GuideHubLink[] {
  const homeHrefs = [
    "/quests",
    "/knights",
    "/romance/sovereign-tower-romance-options",
    "/guide/sovereign-tower-endings",
    "/systems/sovereign-tower-demon-power",
    "/characters/sovereign-tower-angelica-death",
  ];
  const linksByHref = new Map(getGuideHubLinks(locale).map((link) => [link.href, link]));
  return homeHrefs
    .map((href) => linksByHref.get(href))
    .filter((link): link is GuideHubLink => Boolean(link));
}

export function getCoreGuideLinks(locale: string, contentType: string, currentPathname: string): GuideHubLink[] {
  return getGuideHubLinks(locale)
    .filter((link) => link.href !== currentPathname && link.contentTypes.includes(contentType))
    .slice(0, 4);
}
