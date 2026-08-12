import {
  LOCALIZED_KNIGHT_OVERLAYS,
  LOCALIZED_QUEST_OVERLAYS,
  type DatabaseLocale,
} from "./sovereignTowerLocalization";

export type StatKey = "strength" | "agility" | "charisma" | "luck" | "magic" | "wit";

export type StatBlock = Partial<Record<StatKey, number>>;

export type QuestOutcome = {
  label: string;
  description: string;
};

export type QuestRecord = {
  slug: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  type: string;
  region?: string;
  difficulty: string;
  requiredStats: StatBlock;
  recommendedKnightSlugs: string[];
  bestTraits: string[];
  steps: string[];
  outcomes: QuestOutcome[];
  relatedGuideHrefs: Array<{ label: string; href: string }>;
};

export type KnightRecord = {
  slug: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  role: string;
  stats: StatBlock;
  traits: string[];
  hiddenTraits: string[];
  preferences: string[];
  bestQuestSlugs: string[];
  recruitment: string;
  notes: string[];
  relatedGuideHrefs: Array<{ label: string; href: string }>;
};

export const STAT_LABELS: Record<StatKey, string> = {
  strength: "STR",
  agility: "AGI",
  charisma: "CHA",
  luck: "LCK",
  magic: "MAG",
  wit: "WIT",
};

export const KNIGHTS: KnightRecord[] = [
  {
    slug: "angelica",
    name: "Lady Angelica of Clovermont",
    title: "Sovereign Tower Angelica Knight Guide",
    description: "Angelica is the first knight most players use to learn stat matching, hidden traits, affinity, and early quest assignment.",
    role: "Starter Knight",
    stats: { agility: 8, luck: 7, wit: 1 },
    traits: ["Kind-hearted", "Optimistic", "Animal-friendly candidate"],
    hiddenTraits: ["Animal Lover"],
    preferences: ["Social tasks", "Gentle solutions", "Assignments that avoid cruelty"],
    bestQuestSlugs: ["sovereign-tower-goose-quest", "sovereign-tower-hammer-lost-yet-again"],
    recruitment: "Appears as an early knight and introduces the player to Round Table assignment basics.",
    notes: [
      "Her high Agility and Luck make her a strong early test case for odd quests.",
      "Her low Wit means investigation or puzzle-heavy quests should be checked carefully.",
      "Use her hidden trait discovery as the model for building future knight pages.",
    ],
    relatedGuideHrefs: [
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
  {
    slug: "brunhilda",
    name: "Brunhilda",
    title: "How to Get Brunhilda in Sovereign Tower",
    description: "Brunhilda's profile page covers her stats, traits, best quests, and database notes; use the recruitment guide for route conditions and how-to-get intent.",
    image: "/images/sovereign-tower-knight-management-official.jpg",
    role: "Recruitable Knight",
    stats: { strength: 7, charisma: 4 },
    traits: ["Direct", "Battle-ready", "High-pressure assignment candidate"],
    hiddenTraits: ["Route-dependent details to verify"],
    preferences: ["Combat pressure", "Glory-facing quests"],
    bestQuestSlugs: ["sovereign-tower-dragon-knight", "sovereign-tower-beast-hunt", "sovereign-tower-rebellion"],
    recruitment: "Keep this field updated with confirmed audience, route, or quest trigger details as player reports are verified.",
    notes: [
      "This page exists first as a search-intent landing page, then becomes a database profile as confirmed data grows.",
      "Do not overstate unverified route requirements; mark unknowns clearly until confirmed.",
    ],
    relatedGuideHrefs: [
      { label: "How to Get Brunhilda", href: "/guide/sovereign-tower-how-to-get-brunhilda" },
      { label: "Best Knights", href: "/knights" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
    ],
  },
  {
    slug: "dullahan",
    name: "Dullahan",
    title: "How to Get Dullahan in Sovereign Tower",
    description: "Dullahan is a secret-knight style intent page for recruitment, route conditions, traits, and best quest assignments.",
    role: "Secret Knight",
    stats: { strength: 6, magic: 6, luck: 3 },
    traits: ["Unusual recruit", "Supernatural fit", "Route-sensitive"],
    hiddenTraits: ["Secret conditions to verify"],
    preferences: ["Mystical threats", "Dangerous assignments"],
    bestQuestSlugs: ["sovereign-tower-dragon-knight", "sovereign-tower-gavault", "sovereign-tower-beast-hunt", "sovereign-tower-rebellion"],
    recruitment: "Track confirmed route triggers, audience choices, or quest branches here instead of scattering them across generic guides.",
    notes: [
      "Dullahan should link strongly to secret knights, hidden traits, and outcome pages.",
      "Use this profile to separate confirmed recruitment steps from community speculation.",
    ],
    relatedGuideHrefs: [
      { label: "How to Get Dullahan", href: "/guide/sovereign-tower-how-to-get-dullahan" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
  {
    slug: "gwendan",
    name: "Sir Gwendan of Vidor",
    title: "Sovereign Tower Gwendan Knight Guide",
    description: "Gwendan is useful for Charisma-heavy assignment examples, court-facing quests, and hidden vulnerability tracking.",
    role: "Recruitable Knight",
    stats: { charisma: 7, strength: 5, agility: 4 },
    traits: ["Flashy", "Prideful", "Court-facing"],
    hiddenTraits: ["Fear of the dark"],
    preferences: ["Glory", "Public recognition", "Social pressure"],
    bestQuestSlugs: ["sovereign-tower-groveshire", "sovereign-tower-rebellion"],
    recruitment: "Appears through the early audience and recruitment loop; update with exact cycle notes when verified.",
    notes: [
      "Strong Charisma makes him useful for social or noble-facing quests.",
      "Hidden vulnerabilities should be linked to trait and outcome pages.",
    ],
    relatedGuideHrefs: [
      { label: "Stats Guide", href: "/guide/sovereign-tower-stats" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
  {
    slug: "gideon",
    name: "Gideon",
    title: "Sovereign Tower Gideon Character Guide",
    description: "Gideon is a high-search character entry for tracking whether he is a knight, advisor, rival, or route-dependent recruit as verified data grows.",
    role: "Route Knight",
    stats: { charisma: 5, wit: 5, strength: 3 },
    traits: ["Route-sensitive", "Leadership-adjacent", "Unconfirmed role"],
    hiddenTraits: ["Character-specific triggers to verify"],
    preferences: ["Political pressure", "Story branches", "Assignments with clear narrative stakes"],
    bestQuestSlugs: ["sovereign-tower-rebellion", "sovereign-tower-groveshire", "sovereign-tower-gavault"],
    recruitment: "Treat Gideon's unlock path as unverified until official profile text, in-game recruitment screenshots, or repeatable player reports confirm his role.",
    notes: [
      "Stats are conservative placeholders for a possible social or strategic character and must be replaced after in-game verification.",
      "Existing character coverage says Gideon is not explicitly named in the reveal trailer, so avoid presenting him as confirmed roster data.",
      "Use this profile to collect route, audience, or advisor evidence without inventing specific mechanics.",
    ],
    relatedGuideHrefs: [
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
    ],
  },
  {
    slug: "epicrates",
    name: "Epicrates",
    title: "Sovereign Tower Epicrates Character Guide",
    description: "Epicrates is a placeholder database profile for rare, high-value, or community-reported character data that needs careful confirmation.",
    role: "Special Recruit",
    stats: { luck: 5, charisma: 4, magic: 4 },
    traits: ["Rare encounter candidate", "Community-report candidate", "Data pending"],
    hiddenTraits: ["Rarity or encounter conditions to verify"],
    preferences: ["Experimental routes", "Low-risk testing", "Information-gathering loops"],
    bestQuestSlugs: ["sovereign-tower-gavault", "sovereign-tower-goose-quest", "sovereign-tower-hammer-lost-yet-again"],
    recruitment: "Keep recruitment wording broad until Epicrates is confirmed as a character, rarity term, or special encounter mechanic.",
    notes: [
      "Do not treat Epicrates as a confirmed knight class or rarity tier until the source is verified.",
      "Stats are intentionally balanced placeholders for testing database UI coverage.",
      "Update this record after repeatable encounter conditions or official terminology are available.",
    ],
    relatedGuideHrefs: [
      { label: "Recruit Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
  {
    slug: "jester",
    name: "Jester",
    title: "Sovereign Tower Jester Knight Guide",
    description: "Jester is a character-intent entry for court chaos, social misdirection, and Round Table management notes while exact mechanics remain unconfirmed.",
    role: "Special Recruit",
    stats: { wit: 6, luck: 5, charisma: 4 },
    traits: ["Unpredictable", "Court-facing", "Misdirection candidate"],
    hiddenTraits: ["Prank, morale, or chaos checks to verify"],
    preferences: ["Odd jobs", "Public scenes", "Unexpected outcome testing"],
    bestQuestSlugs: ["sovereign-tower-goose-quest", "sovereign-tower-groveshire", "sovereign-tower-rebellion"],
    recruitment: "Track whether Jester is a named recruit, archetype, or event label before publishing exact unlock requirements.",
    notes: [
      "Stats lean Wit and Luck only as a conservative jester-archetype placeholder.",
      "Avoid claiming special outcome manipulation until the interaction is verified in-game.",
      "Useful as a database profile for searches about eccentric knights and Round Table drama.",
    ],
    relatedGuideHrefs: [
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
  {
    slug: "lady-of-the-tower",
    name: "Lady of the Tower",
    title: "Sovereign Tower Lady of the Tower Character Guide",
    description: "The Lady of the Tower is a major tower presence and advisor-style character whose advice, romance route, and hidden agenda should be tracked separately from standard knights.",
    role: "Route Knight",
    stats: { charisma: 6, magic: 5, wit: 5 },
    traits: ["Advisor presence", "Tower-bound", "Romance route candidate"],
    hiddenTraits: ["True allegiance and route consequences to verify"],
    preferences: ["Tower mysteries", "Bold decisions", "Administrative follow-up"],
    bestQuestSlugs: ["sovereign-tower-gavault", "sovereign-tower-rebellion", "sovereign-tower-dragon-knight"],
    recruitment: "Known coverage frames her as a tower figure rather than a normal recruit; verify whether she can be assigned like a knight before changing her role.",
    notes: [
      "Treat her stats as database placeholders for a magical advisor profile, not confirmed quest assignment numbers.",
      "Character pages describe her as tied to tower guidance and possible romance, but exact gameplay effects remain pending.",
      "Use related guide links to separate romance, route, and quest-assignment evidence as it arrives.",
    ],
    relatedGuideHrefs: [
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
  {
    slug: "roberto",
    name: "Roberto",
    title: "Sovereign Tower Roberto Character Guide",
    description: "Roberto is a search-driven character profile for a possible knight, audience NPC, diplomat, or timeline-specific figure.",
    role: "Route Knight",
    stats: { charisma: 5, wit: 4, luck: 4 },
    traits: ["Timeline-sensitive candidate", "Audience candidate", "Unconfirmed role"],
    hiddenTraits: ["Branch appearance conditions to verify"],
    preferences: ["Audience phases", "Faction choices", "Timeline experiments"],
    bestQuestSlugs: ["sovereign-tower-groveshire", "sovereign-tower-rebellion", "sovereign-tower-hammer-lost-yet-again"],
    recruitment: "Verify whether Roberto appears as a recruitable knight, NPC, or branch-only character before publishing a firm recruitment route.",
    notes: [
      "Existing character copy states official Roberto details are scarce, so this record should remain conservative.",
      "Stats are broad placeholders for a possible social or timeline-linked character.",
      "Prioritize screenshots or repeatable audience evidence before adding specific mechanics.",
    ],
    relatedGuideHrefs: [
      { label: "Recruit Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
    ],
  },
  {
    slug: "rufus",
    name: "Rufus of Groveshire",
    title: "Sovereign Tower Rufus Knight Guide",
    description: "Rufus of Groveshire is a rough, loyal, wilderness-shaped recruit candidate with strong frontline and hunting assignment intent.",
    role: "Recruitable Knight",
    stats: { strength: 7, agility: 5, charisma: 2 },
    traits: ["Fiercely loyal", "Wild", "Close-range strength candidate"],
    hiddenTraits: ["Last-of-his-kind context to verify"],
    preferences: ["Forest work", "Hunts", "Assignments that value loyalty over polish"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-groveshire", "sovereign-tower-dragon-knight"],
    recruitment: "Appears in existing character coverage as a Groveshire knight choice; confirm exact Rufus versus Silgur choice rules in-game.",
    notes: [
      "High Strength and low Charisma reflect his described rough, physical role but still need exact stat verification.",
      "Do not claim both Groveshire knights can be recruited until late-game route evidence confirms it.",
      "Good candidate for Beast Hunt and other physical assignments once trait interactions are tested.",
    ],
    relatedGuideHrefs: [
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
    ],
  },
  {
    slug: "sparky",
    name: "Sparky",
    title: "Sovereign Tower Sparky Knight Guide",
    description: "Sparky is a community-interest knight profile for tracking branch, annex, and faction-affinity recruitment evidence.",
    role: "Special Recruit",
    stats: { agility: 5, magic: 5, luck: 4 },
    traits: ["Eccentric", "Branch candidate", "Energy-themed placeholder"],
    hiddenTraits: ["Annex or faction unlock conditions to verify"],
    preferences: ["Tower expansion", "Experimental assignments", "Magical or quick-response tasks"],
    bestQuestSlugs: ["sovereign-tower-gavault", "sovereign-tower-hammer-lost-yet-again", "sovereign-tower-goose-quest"],
    recruitment: "Existing character coverage suggests checking annexes, balanced factions, and alternate timeline choices; keep exact trigger pending verification.",
    notes: [
      "Stats are conservative placeholders and should not be used as final advice.",
      "Avoid presenting Sparky as officially confirmed until a stable in-game source or official profile is available.",
      "Useful for collecting early player reports about faction or tower-expansion recruitment paths.",
    ],
    relatedGuideHrefs: [
      { label: "Recruit Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "Stats Guide", href: "/guide/sovereign-tower-stats" },
    ],
  },
  {
    slug: "ursula",
    name: "Ursula",
    title: "Sovereign Tower Ursula Knight Guide",
    description: "Ursula is a named knight-intent profile best treated as a specialized assignment candidate, especially because existing coverage warns against Charisma tasks.",
    role: "Recruitable Knight",
    stats: { strength: 6, magic: 5, charisma: 1 },
    traits: ["Low-Charisma warning case", "Specialist", "Direct problem solver"],
    hiddenTraits: ["Exact strengths and route ties to verify"],
    preferences: ["Non-diplomatic jobs", "Combat or magical pressure", "Clear objectives"],
    bestQuestSlugs: ["sovereign-tower-dragon-knight", "sovereign-tower-gavault", "sovereign-tower-beast-hunt"],
    recruitment: "Confirm whether Ursula is a standard recruit, early roster member, or route-specific knight before publishing exact unlock steps.",
    notes: [
      "The low Charisma placeholder follows existing guide language warning against diplomatic assignments.",
      "Strength and Magic are provisional guesses for specialist coverage and must be replaced with verified values.",
      "Do not assign her to social quest examples without confirmed compensating traits or gear.",
    ],
    relatedGuideHrefs: [
      { label: "Stats Guide", href: "/guide/sovereign-tower-stats" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
    ],
  },
  {
    slug: "wolf",
    name: "Wolf",
    title: "Sovereign Tower Wolf Character Guide",
    description: "Wolf is a speculative character or encounter profile for searches around beast-themed recruits, hunts, and wilderness quest assignments.",
    role: "Secret Knight",
    stats: { agility: 6, strength: 5, luck: 3 },
    traits: ["Beast-themed candidate", "Wilderness fit", "Unconfirmed identity"],
    hiddenTraits: ["Creature, recruit, or encounter status to verify"],
    preferences: ["Hunts", "Forests", "Fast physical assignments"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-goose-quest", "sovereign-tower-groveshire"],
    recruitment: "Keep recruitment marked unknown until Wolf is confirmed as a character, creature encounter, symbolic route element, or community shorthand.",
    notes: [
      "Stats follow a conservative beast or wilderness archetype and are not confirmed mechanics.",
      "Existing character coverage says official details about a wolf character remain limited.",
      "Use this record to catch search demand while preventing unsupported claims.",
    ],
    relatedGuideHrefs: [
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
  {
    slug: "wolf-knight",
    name: "Wolf Knight",
    title: "Sovereign Tower Wolf Knight Guide",
    description: "Wolf Knight is a high-intent beast-knight profile for provisional stats, combat quest matching, and future verification of the full roster.",
    role: "Secret Knight",
    stats: { strength: 6, agility: 6, wit: 3 },
    traits: ["Hunting fit", "Physical specialist", "Roster confirmation pending"],
    hiddenTraits: ["Pack, beast, or secret recruitment conditions to verify"],
    preferences: ["Monster hunts", "Reconnaissance", "Strength and Agility checks"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-dragon-knight", "sovereign-tower-groveshire"],
    recruitment: "Verify whether Wolf Knight is a named recruit, archetype, or player shorthand before adding exact unlock requirements.",
    notes: [
      "Stats are placeholder values based on the broad wolf-knight archetype and current quest categories.",
      "Avoid claiming playable confirmation until official or repeatable in-game evidence exists.",
      "Use Beast Hunt and Dragon Knight links as provisional physical assignment anchors only.",
    ],
    relatedGuideHrefs: [
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
];

export const QUESTS: QuestRecord[] = [
  {
    slug: "sovereign-tower-dragon-knight",
    name: "Dragon Knight",
    title: "How to Beat the Dragon Knight in Sovereign Tower",
    description: "A named challenge quest for stat planning, knight selection, damage risk, and outcome tracking.",
    image: "/images/sovereign-tower-dragon-knight-official.jpg",
    type: "Challenge",
    region: "Act 1",
    difficulty: "High",
    requiredStats: { strength: 6, magic: 4, agility: 3 },
    recommendedKnightSlugs: ["brunhilda", "dullahan", "gwendan"],
    bestTraits: ["Battle-ready", "Supernatural fit", "High Strength"],
    steps: [
      "Check the visible Dragon Knight stat requirements before ending the cycle.",
      "Prioritize Strength and survivability, then review Magic or Agility clues in the quest text.",
      "Choose the knight who can pass the requirement, even if the quest preference is imperfect.",
      "Record the outcome before using time rewind so the next cycle keeps the useful information.",
    ],
    outcomes: [
      { label: "Success", description: "The challenge is cleared and the assigned knight should gain progress or rewards." },
      { label: "Failure", description: "A mismatched knight may take damage, lose affinity, or block the desired route." },
      { label: "Unexpected Outcome", description: "Hidden traits or supernatural checks may change the result; record the trigger." },
    ],
    relatedGuideHrefs: [
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
  {
    slug: "sovereign-tower-groveshire",
    name: "Groveshire",
    title: "Sovereign Tower Groveshire Walkthrough",
    description: "An Act 1 regional hub for main quests, early knight choices, stat gates, and route notes.",
    type: "Region",
    region: "Groveshire",
    difficulty: "Early",
    requiredStats: { charisma: 3, agility: 3, luck: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan"],
    bestTraits: ["Diplomatic", "Animal-friendly", "Court-facing"],
    steps: [
      "Use Groveshire to learn how region quests connect to knight recruitment and story branches.",
      "Keep one social knight and one flexible stat knight available.",
      "Split individual Groveshire quests into child records once their requirements are verified.",
    ],
    outcomes: [
      { label: "Story Progress", description: "Groveshire routes should feed Act 1 progression and follow-up audiences." },
      { label: "Recruitment Lead", description: "Track any knight or servant unlock that appears from this area." },
    ],
    relatedGuideHrefs: [
      { label: "All Quests", href: "/quests" },
      { label: "Knight Affinity", href: "/guide/sovereign-tower-knight-affinity" },
    ],
  },
  {
    slug: "sovereign-tower-gavault",
    name: "Gavault",
    title: "Sovereign Tower Gavault Walkthrough",
    description: "An Act 1 route hub for Gavault quests, requirements, route choices, and outcome logging.",
    type: "Region",
    region: "Gavault",
    difficulty: "Early",
    requiredStats: { wit: 3, magic: 3, strength: 2 },
    recommendedKnightSlugs: ["dullahan", "gwendan"],
    bestTraits: ["Supernatural fit", "Problem solving", "Route knowledge"],
    steps: [
      "Treat Gavault as a parent page until individual quest records have enough verified detail.",
      "Record route choices, hidden checks, and whether time rewind changes available options.",
      "Link any confirmed Gavault quest back to this hub and to the relevant knight pages.",
    ],
    outcomes: [
      { label: "Route Branch", description: "Gavault choices may affect later quest availability or route context." },
      { label: "Knowledge Gain", description: "Failed attempts should produce stat and trait knowledge for rewind planning." },
    ],
    relatedGuideHrefs: [
      { label: "Stats Guide", href: "/guide/sovereign-tower-stats" },
      { label: "Knight Traits", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
  {
    slug: "sovereign-tower-goose-quest",
    name: "Goose Quest",
    title: "Sovereign Tower Goose Quest Guide",
    description: "A named odd quest for animal-related traits, unusual outcomes, and early assignment testing.",
    type: "Special",
    region: "Act 1",
    difficulty: "Early",
    requiredStats: { agility: 4, luck: 3, charisma: 2 },
    recommendedKnightSlugs: ["angelica"],
    bestTraits: ["Animal Lover", "Kind-hearted", "High Luck"],
    steps: [
      "Read the quest text for animal, diplomacy, or speed clues.",
      "Test animal-friendly traits before assuming a combat knight is best.",
      "Record whether the result is normal success or an unexpected outcome.",
    ],
    outcomes: [
      { label: "Better Outcome Candidate", description: "Animal-related traits may improve or alter the result." },
      { label: "Affinity Note", description: "A disliked assignment can be acceptable if the stat and trait fit is strong." },
    ],
    relatedGuideHrefs: [
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "Knight Traits", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
  {
    slug: "sovereign-tower-beast-hunt",
    name: "Beast Hunt",
    title: "Sovereign Tower Beast Hunt Quest Guide",
    description: "A dangerous hunt assignment for combat, survival, and trait testing; keep the stat numbers as provisional placeholders and verify exact requirements as route data grows.",
    image: "/images/sovereign-tower-quest-assignment-official.jpg",
    type: "Challenge",
    region: "Act 1",
    difficulty: "Medium",
    requiredStats: { strength: 5, agility: 4, luck: 2 },
    recommendedKnightSlugs: ["brunhilda", "dullahan", "angelica"],
    bestTraits: ["Battle-ready", "Supernatural fit", "Animal Lover", "High Agility"],
    steps: [
      "Open Beast Hunt and record the visible stat or trait requirement before assignment.",
      "Treat Strength and Agility as reasonable placeholder priorities until exact route data is verified.",
      "Compare combat fit, survival risk, and animal or beast-related traits before choosing a knight.",
      "Log success, failure, injuries, rewards, and unexpected text so the requirement can be corrected as data grows.",
    ],
    outcomes: [
      { label: "Clean Hunt", description: "A matching knight clears the threat with low injury risk; confirm the exact stat check before marking this as stable." },
      { label: "Injury Risk", description: "A poor combat or survival match may produce damage, roster pressure, or a failed hunt result." },
      { label: "Trait Interaction", description: "Animal, supernatural, or hunting-adjacent traits may alter the result and should be verified across rewinds." },
    ],
    relatedGuideHrefs: [
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
  {
    slug: "sovereign-tower-rebellion",
    name: "Rebellion",
    title: "Sovereign Tower Rebellion Quest Guide",
    description: "A high-risk political or combat route quest where loyalty, stat fit, and branch consequences should be tracked; required stats are provisional until verified playthrough data grows.",
    image: "/images/sovereign-tower-court-event-official.jpg",
    type: "Main",
    region: "Act 1",
    difficulty: "High",
    requiredStats: { charisma: 5, strength: 4, wit: 3 },
    recommendedKnightSlugs: ["gwendan", "brunhilda", "dullahan"],
    bestTraits: ["Court-facing", "Battle-ready", "Route knowledge", "Stable loyalty"],
    steps: [
      "Prepare a rewind point and write down the visible Rebellion warning text.",
      "Use Charisma, Strength, and Wit as placeholder planning checks until confirmed requirements replace them.",
      "Balance stat fit against loyalty risk, especially if the route frames the rebellion as political pressure rather than pure combat.",
      "Record whether the branch changes later dialogue, quest access, roster state, or ruler reputation as data grows.",
    ],
    outcomes: [
      { label: "Order Restored", description: "The assignment resolves the rebellion without obvious route damage; verify the exact stat and loyalty checks." },
      { label: "Negotiated Branch", description: "Social or court-facing choices may redirect the conflict instead of ending it through force." },
      { label: "Route Consequence", description: "Failure, disloyalty, or risky traits may alter later options and should be tracked before publishing firm advice." },
    ],
    relatedGuideHrefs: [
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
    ],
  },
  {
    slug: "sovereign-tower-hammer-lost-yet-again",
    name: "Hammer Lost, Yet Again",
    title: "Sovereign Tower Hammer Lost, Yet Again Quest Guide",
    description: "An early blacksmith-related quest for learning retrieval stats, servant value, and follow-up audience rewards.",
    type: "Contract",
    region: "Act 1",
    difficulty: "Early",
    requiredStats: { agility: 4, luck: 2 },
    recommendedKnightSlugs: ["angelica"],
    bestTraits: ["High Agility", "Reliable early assignment", "Low damage risk"],
    steps: [
      "Use this early quest to learn how retrieval requirements work.",
      "Check the damage risk before assigning a weakened knight.",
      "Track rewards and any blacksmith follow-up that unlocks later systems.",
    ],
    outcomes: [
      { label: "Success", description: "Useful for early XP, gold, and blacksmith relationship momentum." },
      { label: "Follow-up", description: "Can connect to Forge, relic, or equipment pages once those databases are added." },
    ],
    relatedGuideHrefs: [
      { label: "Stats Guide", href: "/guide/sovereign-tower-stats" },
      { label: "Annexes / Systems", href: "/systems" },
    ],
  },
  {
    slug: "sovereign-tower-demo-walkthrough",
    name: "Demo Walkthrough",
    title: "Sovereign Tower Demo Walkthrough",
    description: "A spoiler-light demo route hub for first-cycle planning, knight assignment basics, and tracking which tutorial decisions carry into later data; stat gates are placeholders until the demo build is rechecked.",
    type: "Main",
    region: "Demo",
    difficulty: "Early",
    requiredStats: { agility: 2, charisma: 2, luck: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan"],
    bestTraits: ["Reliable early assignment", "Kind-hearted", "Court-facing"],
    steps: [
      "Use the demo as a baseline pass for learning audiences, quest assignment, affinity, and rewind notation.",
      "Treat the listed stats as conservative planning placeholders, then replace them with exact visible requirements after a fresh demo run.",
      "Assign Angelica to low-risk tutorial quests first so hidden trait and affinity behavior can be recorded cleanly.",
      "Log which quest names, servants, factions, or route flags appear in the demo but remain unresolved.",
    ],
    outcomes: [
      { label: "Tutorial Clear", description: "The player understands the core loop and has a clean list of early requirements to verify." },
      { label: "Database Seed", description: "Demo-only quest names and route flags become candidates for child records as exact text is confirmed." },
    ],
    relatedGuideHrefs: [
      { label: "Beginner Guide", href: "/guide/sovereign-tower-beginner-guide" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-act-0-walkthrough",
    name: "Act 0 Walkthrough",
    title: "Sovereign Tower Act 0 Walkthrough",
    description: "An opening-act walkthrough record for mapping first audiences, early recruitment leads, tutorial failures, and the first reusable rewind lessons without inventing exact stat gates.",
    type: "Main",
    region: "Act 0",
    difficulty: "Early",
    requiredStats: { wit: 2, charisma: 2, agility: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan"],
    bestTraits: ["Problem solving", "Diplomatic", "Reliable early assignment"],
    steps: [
      "Record the opening audience order, available knights, and any quests that appear before Act 1 region selection.",
      "Use the placeholder stats only as a checklist for likely early checks; confirm the real values from visible quest UI later.",
      "Separate true Act 0 locks from choices that can be corrected by rewind.",
      "Link every confirmed opening quest to the relevant knight, trait, and stat guide as the database grows.",
    ],
    outcomes: [
      { label: "Clean Opening State", description: "The player reaches early cycles with known roster, affinity, and route notes." },
      { label: "Missed Setup", description: "Untracked tutorial choices may hide why later quests, servants, or route options do not appear." },
    ],
    relatedGuideHrefs: [
      { label: "Stats Guide", href: "/guide/sovereign-tower-stats" },
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
    ],
  },
  {
    slug: "sovereign-tower-early-cycles-route",
    name: "Early Cycles Route",
    title: "Sovereign Tower Early Cycles Route Guide",
    description: "A reusable early-cycle planning route for deciding which quests to scout, which failures to preserve as knowledge, and when to commit a knight; exact requirements should be filled in from verified cycle notes.",
    type: "Special",
    region: "Early Cycles",
    difficulty: "Early",
    requiredStats: { luck: 3, wit: 2, charisma: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan", "dullahan"],
    bestTraits: ["Route knowledge", "High Luck", "Stable loyalty"],
    steps: [
      "Scout new quests first, especially those with hidden trait language or unclear risk.",
      "Treat placeholder Luck, Wit, and Charisma values as planning prompts rather than confirmed gates.",
      "Use rewind knowledge to decide whether a failure is worth keeping as information before attempting a clean clear.",
      "Promote any repeatable early-cycle quest into its own record once the text, stats, and outcomes are verified.",
    ],
    outcomes: [
      { label: "Efficient Knowledge Loop", description: "The player learns quest requirements while avoiding avoidable roster damage." },
      { label: "Route Drift", description: "Poorly tracked failures can make later recruitment or faction consequences hard to explain." },
    ],
    relatedGuideHrefs: [
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
    ],
  },
  {
    slug: "sovereign-tower-full-campaign-route",
    name: "Full Campaign Route",
    title: "Sovereign Tower Full Campaign Route Guide",
    description: "A campaign-spanning route index for connecting Act 0, Act 1 regions, faction pressure, romance flags, and late-game checks; stats are broad placeholders until end-to-end route data is verified.",
    type: "Main",
    region: "Full Campaign",
    difficulty: "Unknown",
    requiredStats: { strength: 4, charisma: 4, wit: 4, magic: 3 },
    recommendedKnightSlugs: ["angelica", "brunhilda", "dullahan", "gwendan"],
    bestTraits: ["Route knowledge", "Stable loyalty", "Problem solving", "Battle-ready"],
    steps: [
      "Use this record as the parent route map for confirmed acts, region hubs, recruitment branches, and ending notes.",
      "Keep the required stats conservative and marked provisional until a complete campaign pass confirms hard gates.",
      "Track when faction, romance, servant, and knight recruitment choices begin to conflict.",
      "Split validated campaign milestones into child QuestRecords instead of overloading one walkthrough page.",
    ],
    outcomes: [
      { label: "Complete Route Map", description: "The campaign can be navigated through linked quest, knight, faction, and romance records." },
      { label: "Branch Conflict", description: "Competing commitments may close route options; these conflicts need confirmation before firm recommendations." },
    ],
    relatedGuideHrefs: [
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-new-game-plus-route",
    name: "New Game Plus Route",
    title: "Sovereign Tower New Game Plus Route Guide",
    description: "A route-planning record for New Game Plus assumptions, carryover checks, alternate openings, and repeat-cycle optimization; exact unlocks and stat changes must be verified before publication.",
    type: "Special",
    region: "New Game Plus",
    difficulty: "Unknown",
    requiredStats: { luck: 4, wit: 4, magic: 3 },
    recommendedKnightSlugs: ["dullahan", "brunhilda", "angelica"],
    bestTraits: ["Route knowledge", "Secret conditions to verify", "High Luck"],
    steps: [
      "Confirm whether New Game Plus exists in the current build before treating this as a live route guide.",
      "Use placeholder stats only for database sorting and internal planning until carryover behavior is tested.",
      "Track inherited knowledge, roster changes, hidden trait visibility, and altered audience options separately.",
      "Link confirmed NG+ branches back to their base campaign quests so players can compare differences.",
    ],
    outcomes: [
      { label: "Confirmed Carryover", description: "Known unlocks, knowledge, or route shortcuts can be documented without speculation." },
      { label: "Unverified Mode", description: "If NG+ behavior is absent or build-dependent, keep the record as a clearly marked research placeholder." },
    ],
    relatedGuideHrefs: [
      { label: "Secret Knights", href: "/guide/sovereign-tower-secret-knights" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
    ],
  },
  {
    slug: "sovereign-tower-cooking-questline",
    name: "Cooking Questline",
    title: "Sovereign Tower Cooking Questline Guide",
    description: "A systems-facing questline record for meals, servant support, morale, and possible affinity effects; required stats are intentionally low-confidence placeholders until cooking tasks are verified.",
    type: "Contract",
    region: "Tower Systems",
    difficulty: "Early",
    requiredStats: { luck: 2, charisma: 2, wit: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan"],
    bestTraits: ["Kind-hearted", "Diplomatic", "Reliable early assignment"],
    steps: [
      "Record every cooking-related request, ingredient prompt, servant mention, and affinity change in one place.",
      "Treat the placeholder stats as likely social or utility checks, not confirmed recipe requirements.",
      "Watch for hidden trait interactions, especially gentle, social, animal-friendly, or servant-facing text.",
      "Create child records for named recipes or kitchen events once their exact requirements are known.",
    ],
    outcomes: [
      { label: "Morale Benefit", description: "Cooking may support affinity, recovery, or tower systems once exact mechanics are confirmed." },
      { label: "Servant Lead", description: "Kitchen events may reveal servant availability or unlock conditions that belong in later database tables." },
    ],
    relatedGuideHrefs: [
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
      { label: "Annexes / Systems", href: "/systems" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
  {
    slug: "sovereign-tower-alliances-route",
    name: "Alliances Route",
    title: "Sovereign Tower Alliances Route Guide",
    description: "A diplomacy route record for tracking alliance offers, faction pressure, knight loyalty, and social checks without claiming precise thresholds before verification.",
    type: "Region",
    region: "Court Politics",
    difficulty: "Medium",
    requiredStats: { charisma: 5, wit: 3, luck: 2 },
    recommendedKnightSlugs: ["gwendan", "angelica", "brunhilda"],
    bestTraits: ["Court-facing", "Diplomatic", "Stable loyalty"],
    steps: [
      "List each alliance proposal with the faction, audience, or quest that introduced it.",
      "Use Charisma and Wit as provisional priorities, then replace them with confirmed visible requirements.",
      "Check whether a knight's public image, loyalty, or hidden trait changes the negotiation outcome.",
      "Link alliance decisions to later rebellion, faction, and romance consequences as those branches are verified.",
    ],
    outcomes: [
      { label: "Alliance Secured", description: "A successful route should unlock support, reduce pressure, or open follow-up audiences." },
      { label: "Faction Cost", description: "An alliance may anger another group or alter later route access; confirm before making route claims." },
    ],
    relatedGuideHrefs: [
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
    ],
  },
  {
    slug: "sovereign-tower-servants-intendant-route",
    name: "Tower Servants and Intendant Route",
    title: "Sovereign Tower Servants and Intendant Route Guide",
    description: "A tower-management route record for servant assignments, Intendant choices, annex support, and administrative consequences; exact unlocks are intentionally left to future verification.",
    type: "Special",
    region: "Tower Systems",
    difficulty: "Medium",
    requiredStats: { wit: 4, charisma: 3, luck: 2 },
    recommendedKnightSlugs: ["gwendan", "angelica", "dullahan"],
    bestTraits: ["Problem solving", "Diplomatic", "Route knowledge"],
    steps: [
      "Track servant names, Intendant dialogue, annex references, and any quest that changes tower operations.",
      "Use the placeholder stats as administrative planning hints until the game exposes exact requirements.",
      "Record whether knight traits affect servant trust, discipline, resource recovery, or route availability.",
      "Split confirmed servant or Intendant events into separate records once their branches are stable.",
    ],
    outcomes: [
      { label: "Operational Upgrade", description: "Servant or Intendant choices may improve tower systems, unlock annexes, or reduce future risk." },
      { label: "Administrative Backfire", description: "Poorly matched decisions may create loyalty, resource, or faction costs that need route testing." },
    ],
    relatedGuideHrefs: [
      { label: "Annexes / Systems", href: "/systems" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
    ],
  },
  {
    slug: "sovereign-tower-factions-route",
    name: "Factions Route",
    title: "Sovereign Tower Factions Route Guide",
    description: "A faction-routing hub for tracking reputation, alliance conflicts, rebellion pressure, and route locks; all stat values here are placeholders until faction checks are confirmed.",
    type: "Region",
    region: "Court Politics",
    difficulty: "High",
    requiredStats: { charisma: 5, wit: 5, strength: 3 },
    recommendedKnightSlugs: ["gwendan", "brunhilda", "dullahan"],
    bestTraits: ["Court-facing", "Route knowledge", "Battle-ready", "Stable loyalty"],
    steps: [
      "Create a faction ledger that notes who gains or loses approval after each major quest.",
      "Treat Charisma, Wit, and Strength as broad placeholder checks for negotiation, schemes, and enforcement.",
      "Compare faction outcomes against Rebellion, Alliances, and Full Campaign route records.",
      "Promote any named faction quest into its own QuestRecord once exact requirements and rewards are verified.",
    ],
    outcomes: [
      { label: "Faction Alignment", description: "A stable alignment should open predictable quest or audience options after verification." },
      { label: "Route Lock", description: "Faction mistakes may close recruitment, romance, or ending paths; avoid firm claims until multiple branches are tested." },
    ],
    relatedGuideHrefs: [
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-romance-angelica-route",
    name: "Romance Angelica Route",
    title: "Sovereign Tower Romance Angelica Route Guide",
    description: "A romance-route record for Angelica affinity, gentle choices, animal-friendly interactions, and route safety notes; exact romance thresholds should be verified before publishing firm steps.",
    type: "Special",
    region: "Romance",
    difficulty: "Medium",
    requiredStats: { charisma: 4, luck: 3, agility: 2 },
    recommendedKnightSlugs: ["angelica"],
    bestTraits: ["Kind-hearted", "Animal Lover", "Optimistic", "High Luck"],
    steps: [
      "Track every Angelica affinity change, disliked assignment, hidden trait reveal, and romance-coded dialogue option.",
      "Use the placeholder stat line only to sort the route until exact affinity or stat thresholds are verified.",
      "Prioritize gentle, social, and animal-friendly outcomes when the quest text offers a choice.",
      "Check whether Goose Quest, Cooking, and early-cycle choices affect later romance availability.",
    ],
    outcomes: [
      { label: "Romance Progress", description: "Consistent affinity-positive choices should preserve Angelica route momentum once exact triggers are known." },
      { label: "Affinity Damage", description: "Cruel, risky, or disliked assignments may delay or block the route; confirm the thresholds through replay." },
    ],
    relatedGuideHrefs: [
      { label: "Angelica Knight Guide", href: "/knights/angelica" },
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
      { label: "Goose Quest", href: "/quests/sovereign-tower-goose-quest" },
    ],
  },
  {
    slug: "sovereign-tower-get-brunhilda-route",
    name: "Get Brunhilda Route",
    title: "How to Get Brunhilda in Sovereign Tower",
    description: "A recruitment-route record for Brunhilda that collects likely combat, glory, and audience triggers while clearly marking exact unlock conditions as unverified.",
    type: "Special",
    region: "Recruitment",
    difficulty: "Medium",
    requiredStats: { strength: 5, charisma: 3, agility: 2 },
    recommendedKnightSlugs: ["brunhilda", "gwendan", "angelica"],
    bestTraits: ["Battle-ready", "High-pressure assignment candidate", "Court-facing"],
    steps: [
      "Track where Brunhilda is first mentioned, offered, challenged, or seen in audience text.",
      "Use Strength and Charisma as placeholder priorities until exact recruitment requirements are confirmed.",
      "Compare combat quest results, public glory choices, and alliance pressure for possible recruitment triggers.",
      "Link confirmed steps back to Brunhilda's knight profile and remove any speculative wording once verified data exists.",
    ],
    outcomes: [
      { label: "Brunhilda Recruited", description: "The route adds Brunhilda to the roster with enough context to assign her safely to combat-heavy quests." },
      { label: "Missed Recruitment", description: "A wrong branch, low reputation, or unverified prerequisite may prevent recruitment and should be tested across rewinds." },
    ],
    relatedGuideHrefs: [
      { label: "Brunhilda Knight Guide", href: "/knights/brunhilda" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
    ],
  },
];

export function getQuestBySlug(slug: string) {
  return QUESTS.find((quest) => quest.slug === slug);
}

export function getKnightBySlug(slug: string) {
  return KNIGHTS.find((knight) => knight.slug === slug);
}

function isDatabaseLocale(locale: string): locale is DatabaseLocale {
  return locale === "it" || locale === "ko";
}

function localizeQuest(quest: QuestRecord, locale: string): QuestRecord {
  if (!isDatabaseLocale(locale)) return quest;
  const overlay = LOCALIZED_QUEST_OVERLAYS[locale][quest.slug];
  return overlay ? { ...quest, ...overlay } : quest;
}

function localizeKnight(knight: KnightRecord, locale: string): KnightRecord {
  if (!isDatabaseLocale(locale)) return knight;
  const overlay = LOCALIZED_KNIGHT_OVERLAYS[locale][knight.slug];
  return overlay ? { ...knight, ...overlay } : knight;
}

export function getLocalizedQuests(locale: string) {
  return QUESTS.map((quest) => localizeQuest(quest, locale));
}

export function getLocalizedKnights(locale: string) {
  return KNIGHTS.map((knight) => localizeKnight(knight, locale));
}

export function getLocalizedQuestBySlug(slug: string, locale: string) {
  const quest = getQuestBySlug(slug);
  return quest ? localizeQuest(quest, locale) : undefined;
}

export function getLocalizedKnightBySlug(slug: string, locale: string) {
  const knight = getKnightBySlug(slug);
  return knight ? localizeKnight(knight, locale) : undefined;
}

export function getKnightName(slug: string) {
  return getKnightBySlug(slug)?.name ?? slug.replace(/-/g, " ");
}

export function getQuestName(slug: string) {
  return getQuestBySlug(slug)?.name ?? slug.replace(/-/g, " ");
}

export function getLocalizedKnightName(slug: string, locale: string) {
  return getLocalizedKnightBySlug(slug, locale)?.name ?? slug.replace(/-/g, " ");
}

export function getLocalizedQuestName(slug: string, locale: string) {
  return getLocalizedQuestBySlug(slug, locale)?.name ?? slug.replace(/-/g, " ");
}

export function formatStats(stats: StatBlock) {
  const entries = Object.entries(stats) as Array<[StatKey, number]>;
  if (entries.length === 0) return "Unknown";
  return entries.map(([key, value]) => `${STAT_LABELS[key]} ${value}`).join(" / ");
}
