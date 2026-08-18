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

export type KnightEvolutionRecord = {
  name: string;
  requirements: string;
  changes: string;
  stats?: StatBlock;
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
  favoriteMeals?: string[];
  evolution?: KnightEvolutionRecord;
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

type QuestVisibilityOverlay = Partial<
  Pick<
    QuestRecord,
    "name" | "title" | "description" | "type" | "region" | "difficulty" | "bestTraits" | "steps" | "outcomes" | "relatedGuideHrefs"
  >
>;

type KnightVisibilityOverlay = Partial<
  Pick<
    KnightRecord,
    | "name"
    | "title"
    | "description"
    | "role"
    | "traits"
    | "hiddenTraits"
    | "preferences"
    | "recruitment"
    | "notes"
    | "relatedGuideHrefs"
  >
>;

const SUPPLEMENTAL_QUEST_OVERLAYS: Record<DatabaseLocale, Record<string, QuestVisibilityOverlay>> = {
  it: {
    "sovereign-tower-dragon-knight": {
      bestTraits: ["Pronto al combattimento", "Adatto al soprannaturale", "Forza alta"],
      steps: [
        "Controlla i requisiti visibili del Dragon Knight prima di chiudere il ciclo.",
        "Dai priorita a Forza e sopravvivenza, poi rivedi gli indizi di Magia o Agilita nel testo della missione.",
        "Scegli il cavaliere che puo superare il requisito, anche se la preferenza della missione non e perfetta.",
        "Registra l'esito prima di usare il riavvolgimento, cosi il ciclo successivo conserva l'informazione utile.",
      ],
      outcomes: [
        { label: "Successo", description: "La sfida viene superata e il cavaliere assegnato dovrebbe ottenere progressi o ricompense." },
        { label: "Fallimento", description: "Un cavaliere non adatto puo subire danni, perdere affinity o bloccare la rotta desiderata." },
        { label: "Esito inatteso", description: "Tratti nascosti o controlli soprannaturali possono cambiare il risultato; registra il trigger." },
      ],
      relatedGuideHrefs: [
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
        { label: "Esiti inattesi", href: "/guide/sovereign-tower-unexpected-outcomes" },
      ],
    },
    "sovereign-tower-beast-hunt": {
      bestTraits: ["Pronto al combattimento", "Adatto al soprannaturale", "Amante degli animali", "Agilita alta"],
      steps: [
        "Apri Beast Hunt e annota il requisito visibile di stat o tratto prima dell'assegnazione.",
        "Tratta Forza e Agilita come priorita provvisorie finche i dati di rotta esatti non sono verificati.",
        "Confronta efficacia in combattimento, rischio di sopravvivenza e tratti legati ad animali o bestie prima di scegliere.",
        "Registra successo, fallimento, ferite, ricompense e testo inatteso per correggere il requisito quando i dati crescono.",
      ],
      outcomes: [
        { label: "Caccia pulita", description: "Un cavaliere adatto elimina la minaccia con basso rischio di ferite; conferma il controllo stat esatto prima di considerarlo stabile." },
        { label: "Rischio ferite", description: "Una cattiva corrispondenza di combattimento o sopravvivenza puo causare danni, pressione sul roster o fallimento della caccia." },
        { label: "Interazione di tratto", description: "Tratti animali, soprannaturali o vicini alla caccia possono alterare il risultato e vanno verificati su piu riavvolgimenti." },
      ],
      relatedGuideHrefs: [
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
        { label: "Tier list migliori cavalieri", href: "/guide/sovereign-tower-best-knights-tier-list" },
        { label: "Esiti inattesi", href: "/guide/sovereign-tower-unexpected-outcomes" },
      ],
    },
    "sovereign-tower-rebellion": {
      bestTraits: ["Orientato alla corte", "Pronto al combattimento", "Conoscenza di rotta", "Lealta stabile"],
      steps: [
        "Prepara un punto di riavvolgimento e annota il testo di avviso visibile di Rebellion.",
        "Usa Carisma, Forza e Intelletto come controlli provvisori finche requisiti confermati non li sostituiscono.",
        "Bilancia corrispondenza stat e rischio di lealta, soprattutto se la rotta presenta la ribellione come pressione politica e non solo combattimento.",
        "Registra se il ramo cambia dialoghi successivi, accesso alle missioni, stato del roster o reputazione del sovrano.",
      ],
      outcomes: [
        { label: "Ordine ristabilito", description: "L'incarico risolve la ribellione senza danni evidenti alla rotta; verifica i controlli esatti di stat e lealta." },
        { label: "Ramo negoziato", description: "Scelte sociali o orientate alla corte possono deviare il conflitto invece di chiuderlo con la forza." },
        { label: "Conseguenza di rotta", description: "Fallimento, slealta o tratti rischiosi possono cambiare opzioni future e vanno tracciati prima di pubblicare consigli fermi." },
      ],
      relatedGuideHrefs: [
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
        { label: "Lealta dei cavalieri", href: "/guide/sovereign-tower-knight-loyalty" },
        { label: "Walkthrough di Sovereign Tower", href: "/guide/sovereign-tower-walkthrough" },
      ],
    },
    "sovereign-tower-demo-walkthrough": {
      bestTraits: ["Assegnazione iniziale affidabile", "Cuore gentile", "Orientato alla corte"],
      steps: [
        "Usa la demo come passaggio base per imparare udienze, assegnazione missioni, affinity e note di riavvolgimento.",
        "Tratta le stat elencate come planning notes prudenti, poi sostituiscile con requisiti visibili esatti dopo una nuova run demo.",
        "Assegna prima Angelica a missioni tutorial a basso rischio per registrare con chiarezza tratto nascosto e affinity.",
        "Annota quali nomi di missione, servitori, fazioni o flag di rotta appaiono nella demo ma restano irrisolti.",
      ],
      outcomes: [
        { label: "Tutorial completato", description: "Il giocatore capisce il ciclo principale e ha una lista pulita dei primi requisiti da verificare." },
        { label: "Base per database", description: "Nomi di missioni e flag di rotta della demo diventano candidati per record figli quando il testo esatto e confermato." },
      ],
      relatedGuideHrefs: [
        { label: "Guida principianti", href: "/guide/sovereign-tower-beginner-guide" },
        { label: "Walkthrough di Sovereign Tower", href: "/guide/sovereign-tower-walkthrough" },
        { label: "Tutte le missioni", href: "/quests" },
      ],
    },
    "sovereign-tower-act-0-walkthrough": {
      bestTraits: ["Risoluzione problemi", "Diplomatico", "Assegnazione iniziale affidabile"],
      steps: [
        "Registra l'ordine delle prime udienze, i cavalieri disponibili e ogni missione prima della scelta regionale dell'Atto 1.",
        "Usa le stat planning notes solo come checklist per probabili controlli iniziali; conferma piu avanti i valori reali dalla UI missione.",
        "Separa i veri blocchi dell'Atto 0 dalle scelte correggibili con il riavvolgimento.",
        "Collega ogni missione iniziale confermata alla guida cavaliere, tratto e stat pertinente mentre il database cresce.",
      ],
      outcomes: [
        { label: "Stato iniziale pulito", description: "Il giocatore raggiunge i primi cicli con roster, affinity e note di rotta noti." },
        { label: "Setup mancato", description: "Scelte tutorial non tracciate possono nascondere perche missioni, servitori o opzioni di rotta successive non appaiono." },
      ],
      relatedGuideHrefs: [
        { label: "Guida alle stat", href: "/guide/sovereign-tower-stats" },
        { label: "Guida affinity cavalieri", href: "/guide/sovereign-tower-knight-affinity" },
        { label: "Walkthrough di Sovereign Tower", href: "/guide/sovereign-tower-walkthrough" },
      ],
    },
    "sovereign-tower-new-game-plus-route": {
      name: "Rotta New Game Plus",
      title: "Guida New Game Plus di Sovereign Tower",
      description: "Una rotta avanzata per tracciare conoscenza ereditata, cambi al roster, tratti nascosti e scorciatoie di ciclo.",
      type: "Speciale",
      difficulty: "Alta",
      bestTraits: ["Conoscenza di rotta", "Condizioni segrete da verificare", "Fortuna"],
    },
    "sovereign-tower-cooking-questline": {
      name: "Questline cucina",
      title: "Guida alla questline cucina in Sovereign Tower",
      description: "Una linea di missioni legata a pasti, supporto dei servitori, morale e possibili effetti sull'affinita.",
      type: "Sistema",
      difficulty: "Iniziale",
    },
    "sovereign-tower-alliances-route": {
      name: "Rotta alleanze",
      title: "Guida alla rotta alleanze in Sovereign Tower",
      description: "Una rotta diplomatica per tracciare offerte di alleanza, pressione delle fazioni, lealta dei cavalieri e controlli sociali.",
      type: "Speciale",
      region: "Politica di corte",
      difficulty: "Media",
      bestTraits: ["Orientato alla corte", "Diplomatico", "Lealta stabile"],
      steps: [
        "Elenca ogni proposta di alleanza con la fazione, udienza o missione che l'ha introdotta.",
        "Usa Carisma e Intelletto come priorita provvisorie, poi sostituiscile con requisiti visibili confermati.",
        "Controlla se immagine pubblica, lealta o tratto nascosto del cavaliere cambiano l'esito della negoziazione.",
        "Collega le decisioni di alleanza a conseguenze future di ribellione, fazione e romance quando i rami sono verificati.",
      ],
      outcomes: [
        { label: "Alleanza ottenuta", description: "Una rotta riuscita dovrebbe sbloccare supporto, ridurre pressione o aprire udienze successive." },
        { label: "Costo di fazione", description: "Un'alleanza puo irritare un altro gruppo o modificare accessi futuri; conferma prima di fare affermazioni di rotta." },
      ],
      relatedGuideHrefs: [
        { label: "Lealta dei cavalieri", href: "/guide/sovereign-tower-knight-loyalty" },
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
        { label: "Walkthrough di Sovereign Tower", href: "/guide/sovereign-tower-walkthrough" },
      ],
    },
    "sovereign-tower-servants-intendant-route": {
      name: "Rotta servitori e intendente",
      title: "Guida a servitori e intendente in Sovereign Tower",
      description: "Un record gestionale per mappare fiducia dei servitori, disciplina, risorse e possibili blocchi di rotta.",
      type: "Speciale",
      difficulty: "Media",
    },
    "sovereign-tower-factions-route": {
      name: "Rotta fazioni",
      title: "Guida alle fazioni di Sovereign Tower",
      description: "Una rotta politica per seguire reputazione, alleanze, rischi di blocco e conseguenze sulle reclute.",
      type: "Principale",
      region: "Politica di corte",
      difficulty: "Alta",
    },
    "sovereign-tower-romance-angelica-route": {
      name: "Rotta romance Angelica",
      title: "Guida romance Angelica in Sovereign Tower",
      description: "Una rotta romance per affinity di Angelica, scelte gentili, interazioni con animali e note di sicurezza della rotta.",
      type: "Speciale",
      difficulty: "Media",
    },
    "sovereign-tower-full-campaign-route": {
      bestTraits: ["Conoscenza di rotta", "Lealta stabile", "Risoluzione problemi", "Pronto al combattimento"],
      steps: [
        "Usa questo record come mappa madre per atti confermati, hub regionali, rami di reclutamento e note sui finali.",
        "Mantieni le stat richieste prudenti e provvisorie finche una run completa non conferma blocchi reali.",
        "Traccia quando scelte di fazione, romance, servitori e reclutamento cavalieri iniziano a entrare in conflitto.",
        "Sposta le tappe di campagna verificate in QuestRecord figli invece di sovraccaricare una sola pagina walkthrough.",
      ],
      outcomes: [
        { label: "Mappa rotta completa", description: "La campagna puo essere navigata tramite record collegati di missioni, cavalieri, fazioni e romance." },
        { label: "Conflitto di ramo", description: "Impegni concorrenti possono chiudere opzioni di rotta; questi conflitti richiedono conferma prima di raccomandazioni ferme." },
      ],
      relatedGuideHrefs: [
        { label: "Walkthrough di Sovereign Tower", href: "/guide/sovereign-tower-walkthrough" },
        { label: "Tier list migliori cavalieri", href: "/guide/sovereign-tower-best-knights-tier-list" },
        { label: "Tutte le missioni", href: "/quests" },
      ],
    },
    "sovereign-tower-get-brunhilda-route": {
      bestTraits: ["Pronto al combattimento", "Candidato per incarichi ad alta pressione", "Orientato alla corte"],
      steps: [
        "Traccia dove Brunhilda viene menzionata, offerta, sfidata o vista per la prima volta nel testo di udienza.",
        "Usa Forza e Carisma come priorita planning notes finche i requisiti esatti di reclutamento non sono confermati.",
        "Confronta risultati di missioni di combattimento, scelte di gloria pubblica e pressione delle alleanze per possibili trigger.",
        "Ricollega i passaggi confermati al profilo cavaliere di Brunhilda e rimuovi il testo speculativo quando esistono dati verificati.",
      ],
      outcomes: [
        { label: "Brunhilda reclutata", description: "La rotta aggiunge Brunhilda al roster con contesto sufficiente per assegnarla in sicurezza a missioni pesanti di combattimento." },
        { label: "Reclutamento mancato", description: "Un ramo errato, reputazione bassa o prerequisito non verificato puo impedire il reclutamento e va testato sui riavvolgimenti." },
      ],
      relatedGuideHrefs: [
        { label: "Guida cavaliere Brunhilda", href: "/knights/brunhilda" },
        { label: "Tier list migliori cavalieri", href: "/guide/sovereign-tower-best-knights-tier-list" },
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
      ],
    },
  },
  ko: {},
};

const SUPPLEMENTAL_KNIGHT_OVERLAYS: Record<DatabaseLocale, Record<string, KnightVisibilityOverlay>> = {
  it: {
    epicrates: {
      name: "Epicrates",
      title: "Guida al personaggio Epicrates in Sovereign Tower",
      description: "Epicrates e un profilo database provvisorio per dati rari, di alto valore o riportati dalla community che richiedono conferma.",
      role: "Recluta speciale",
      traits: ["Incontro raro da verificare", "Report community", "Dati in sospeso"],
      hiddenTraits: ["Condizioni di rarita o incontro da verificare"],
      preferences: ["Rotte sperimentali", "Test a basso rischio", "Cicli di raccolta informazioni"],
    },
    jester: {
      name: "Giullare",
      title: "Guida al cavaliere Giullare in Sovereign Tower",
      description: "Giullare copre caos di corte, depistaggio sociale e note di gestione della Tavola Rotonda mentre le meccaniche restano da confermare.",
      role: "Recluta speciale",
      traits: ["Imprevedibile", "Orientato alla corte", "Candidato al depistaggio"],
      hiddenTraits: ["Scherzi, morale o controlli di caos da verificare"],
      preferences: ["Lavori strani", "Scene pubbliche", "Test di risultati inattesi"],
    },
    "lady-of-the-tower": {
      name: "Dama della Torre",
      title: "Guida alla Dama della Torre in Sovereign Tower",
      description: "La Dama della Torre e una presenza centrale della torre da tracciare separatamente dai cavalieri standard.",
      role: "Cavaliere di rotta",
      traits: ["Presenza da consigliera", "Legata alla torre", "Candidata romance"],
      hiddenTraits: ["Vera alleanza e conseguenze di rotta da verificare"],
      preferences: ["Misteri della torre", "Decisioni audaci", "Follow-up amministrativi"],
    },
    roberto: {
      name: "Roberto",
      title: "Guida al personaggio Roberto in Sovereign Tower",
      description: "Roberto e un profilo personaggio per un possibile cavaliere, PNG di udienza, diplomatico o figura legata alla timeline.",
      role: "Cavaliere di rotta",
      traits: ["Sensibile alla timeline", "Candidato di udienza", "Ruolo non confermato"],
      hiddenTraits: ["Condizioni di apparizione del ramo da verificare"],
      preferences: ["Fasi di udienza", "Scelte di fazione", "Esperimenti sulla timeline"],
      recruitment: "Verifica se Roberto appare come cavaliere reclutabile, PNG di udienza o personaggio solo di ramo prima di pubblicare una rotta sicura.",
      notes: [
        "La copertura personaggio esistente indica che i dettagli ufficiali su Roberto sono scarsi, quindi il record deve restare prudente.",
        "Le stat sono planning notes ampi per un possibile personaggio sociale o legato alla timeline.",
        "Dai priorita a screenshot o prove di udienza ripetibili prima di aggiungere meccaniche specifiche.",
      ],
      relatedGuideHrefs: [
        { label: "Guida personaggio Roberto", href: "/characters/sovereign-tower-roberto" },
        { label: "Reclutare cavalieri", href: "/guide/sovereign-tower-recruit-knights" },
        { label: "Tutte le missioni", href: "/quests" },
        { label: "Lealta dei cavalieri", href: "/guide/sovereign-tower-knight-loyalty" },
      ],
    },
    sparky: {
      name: "Sparky",
      title: "Guida al cavaliere Sparky in Sovereign Tower",
      description: "Sparky e un profilo di interesse community per prove su rami, annessi e reclutamento legato alle fazioni.",
      role: "Recluta speciale",
      traits: ["Eccentrico", "Candidato di ramo", "Planning notes energetico"],
      hiddenTraits: ["Condizioni di annesso o fazione da verificare"],
      preferences: ["Rotte strane", "Test ad alta energia", "Scelte di espansione della torre"],
    },
    wolf: {
      name: "Lupo",
      title: "Guida al personaggio Lupo in Sovereign Tower",
      description: "Lupo e un profilo speculativo per ricerche su reclute bestiali, cacce e incarichi nelle terre selvagge.",
      role: "Stato sconosciuto",
      traits: ["Candidato bestiale", "Adatto alle terre selvagge", "Identita non confermata"],
      hiddenTraits: ["Stato di creatura, recluta o incontro da verificare"],
      preferences: ["Cacce", "Rotte selvagge", "Test con cautela"],
      recruitment: "Mantieni il reclutamento come sconosciuto finche Wolf non e confermato come personaggio, incontro creatura, elemento simbolico di rotta o abbreviazione community.",
      notes: [
        "Le stat seguono un archetipo prudente di bestia o terre selvagge e non sono meccaniche confermate.",
        "La copertura personaggio esistente dice che i dettagli ufficiali su Wolf restano limitati.",
        "Usa questo record per intercettare la domanda di ricerca senza sostenere affermazioni non supportate.",
      ],
      relatedGuideHrefs: [
        { label: "Tier list migliori cavalieri", href: "/guide/sovereign-tower-best-knights-tier-list" },
        { label: "Guida tratti cavalieri", href: "/guide/sovereign-tower-knight-traits" },
      ],
    },
    brunhilda: {
      preferences: ["Pressione di combattimento", "Missioni orientate alla gloria"],
      recruitment: "Aggiorna questo campo con dettagli confermati di udienza, rotta o trigger di missione man mano che i report dei giocatori vengono verificati.",
      notes: [
        "Questa pagina nasce come landing page per intento di ricerca e diventa poi un profilo database quando i dati confermati crescono.",
        "Non esagerare requisiti di rotta non verificati; marca gli elementi ignoti in modo chiaro finche non sono confermati.",
      ],
      relatedGuideHrefs: [
        { label: "Come ottenere Brunhilda", href: "/guide/sovereign-tower-how-to-get-brunhilda" },
        { label: "Migliori cavalieri", href: "/knights" },
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
      ],
    },
    dullahan: {
      preferences: ["Minacce mistiche", "Incarichi pericolosi"],
      recruitment: "Traccia qui trigger di rotta, scelte di udienza o rami di missione confermati invece di disperderli nelle guide generiche.",
      notes: [
        "Dullahan dovrebbe collegarsi fortemente a cavalieri segreti, tratti nascosti e pagine sugli esiti.",
        "Usa questo profilo per separare passaggi di reclutamento confermati dalla speculazione community.",
      ],
      relatedGuideHrefs: [
        { label: "Come ottenere Dullahan", href: "/guide/sovereign-tower-how-to-get-dullahan" },
        { label: "Guida pasti", href: "/systems/sovereign-tower-meals" },
        { label: "Tier list migliori cavalieri", href: "/guide/sovereign-tower-best-knights-tier-list" },
        { label: "Guida tratti cavalieri", href: "/guide/sovereign-tower-knight-traits" },
      ],
    },
    gideon: {
      preferences: ["Pressione politica", "Rami storia", "Incarichi con posta narrativa chiara"],
      recruitment: "Tratta il percorso di sblocco di Gideon come non verificato finche testo ufficiale, screenshot di reclutamento in gioco o report ripetibili confermano il ruolo.",
      notes: [
        "Le stat sono planning notes prudenti per un possibile personaggio sociale o strategico e vanno sostituite dopo verifica in gioco.",
        "La copertura esistente dice che Gideon non e nominato esplicitamente nel trailer reveal, quindi evita di presentarlo come roster confermato.",
        "Usa questo profilo per raccogliere prove di rotta, udienza o consigliere senza inventare meccaniche specifiche.",
      ],
      relatedGuideHrefs: [
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
        { label: "Lealta dei cavalieri", href: "/guide/sovereign-tower-knight-loyalty" },
      ],
    },
    ursula: {
      preferences: ["Lavori non diplomatici", "Pressione di combattimento o magia", "Obiettivi chiari"],
      recruitment: "Conferma se Ursula e una recluta standard, un membro iniziale del roster o una cavaliere legata a rotta prima di pubblicare passaggi esatti.",
      notes: [
        "Il planning notes di Carisma basso segue il linguaggio delle guide esistenti che sconsiglia incarichi diplomatici.",
        "Forza e Magia sono stime provvisorie per copertura specialistica e devono essere sostituite con valori verificati.",
        "Non usarla in esempi di missioni sociali senza tratti o equipaggiamento compensativi confermati.",
      ],
      relatedGuideHrefs: [
        { label: "Guida alle stat", href: "/guide/sovereign-tower-stats" },
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
      ],
    },
    "wolf-knight": {
      preferences: ["Cacce ai mostri", "Ricognizione", "Controlli Forza e Agilita"],
      recruitment: "Verifica se Wolf Knight e una recluta nominata, un archetipo o una scorciatoia dei giocatori prima di aggiungere requisiti esatti.",
      notes: [
        "Le stat sono planning notes basati sull'archetipo generale del cavaliere-lupo e sulle categorie missione attuali.",
        "Evita di dichiararlo giocabile finche non esistono prove ufficiali o ripetibili in gioco.",
        "Usa i link Beast Hunt e Dragon Knight solo come ancore provvisorie per incarichi fisici.",
      ],
      relatedGuideHrefs: [
        { label: "Guida Dragon Heart", href: "/systems/sovereign-tower-dragon-heart" },
        { label: "Requisiti delle missioni", href: "/guide/sovereign-tower-quest-requirements" },
        { label: "Tier list migliori cavalieri", href: "/guide/sovereign-tower-best-knights-tier-list" },
        { label: "Esiti inattesi", href: "/guide/sovereign-tower-unexpected-outcomes" },
      ],
    },
  },
  ko: {},
};

export const KNIGHTS: KnightRecord[] = [
  {
    slug: "alwena",
    name: "Lady Alwena",
    title: "Sovereign Tower Alwena Knight Guide",
    description: "Alwena is the Intendant emergency recruit: she can step into the Round Table when every other available knight is away or gone, making her important for roster recovery and rumor tracking.",
    role: "Emergency Recruit",
    stats: { strength: 8, agility: 9, charisma: 10, magic: 0, wit: 12, luck: 7 },
    traits: ["Intendant", "Information Finder", "Intimidating"],
    hiddenTraits: [],
    preferences: ["Diplomacy", "Duel", "Relic Recovery"],
    favoriteMeals: ["Brizhian Butter Shortbread", "Crepe"],
    bestQuestSlugs: ["sovereign-tower-act-2-murder-investigation", "sovereign-tower-rebellion", "sovereign-tower-factions-route"],
    recruitment: "Reported recruitment trigger: open the Round Table with zero available knights in Act 2 or later, and Alwena can volunteer as a one-time emergency knight. Keep an available table slot.",
    notes: [
      "Public all-knights data describes Alwena as a Level 12, Armour 8 emergency recruit who never resigns.",
      "Her Intendant role makes her especially valuable for hidden-trait and rumor documentation.",
      "Confirm in-game whether the zero-available-knights condition counts knights away on quests, dead knights, resigned knights, or all of the above in the active build.",
    ],
    relatedGuideHrefs: [
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
      { label: "Round Table System", href: "/systems/sovereign-tower-round-table" },
      { label: "Act 2 Murder Investigation", href: "/quests/sovereign-tower-act-2-murder-investigation" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
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
    favoriteMeals: ["Prefou", "Crepe"],
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
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "arron",
    name: "Sir Arron",
    title: "Sovereign Tower Arron Knight Guide",
    description: "Arron joins after the Dragon Knight route and becomes an important follow-up knight for dragon, magic, transformation, and Act 2 planning.",
    role: "Story Recruit",
    stats: { strength: 2, agility: 2, charisma: 3, magic: 6, wit: 7, luck: 8 },
    traits: ["Timid", "Dragon-line heir", "Route-sensitive"],
    hiddenTraits: ["Transformation paths"],
    preferences: ["Scouting", "Relic Recovery"],
    favoriteMeals: ["Crepe", "Brizhian Butter Shortbread"],
    bestQuestSlugs: ["sovereign-tower-dragon-knight", "sovereign-tower-dragon-heart-follow-up", "sovereign-tower-new-game-plus-route"],
    recruitment: "Reported recruitment trigger: defeat the Dragon Knight; Arron is introduced immediately afterward as the Dragon Knight's descendant.",
    notes: [
      "Public all-knights data lists Arron as a Level 3, Armour 7 recruit from Drakovic Castle.",
      "His Magic, Wit, and Luck profile makes him more useful for dragon follow-up and route knowledge than raw combat.",
      "Transformation details should be tracked carefully because public guides describe mutually exclusive route paths.",
    ],
    relatedGuideHrefs: [
      { label: "Dragon Knight Guide", href: "/quests/sovereign-tower-dragon-knight" },
      { label: "Dragon Heart Follow-Up", href: "/quests/sovereign-tower-dragon-heart-follow-up" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
      { label: "Quest Finder", href: "/quests" },
    ],
  },
  {
    slug: "brunhilda",
    name: "Brunhilda",
    title: "Brunhilda Knight Profile - Sovereign Tower",
    description: "Brunhilda's profile page covers her stats, traits, best quests, and database notes; use the recruitment guide for route conditions and how-to-get intent.",
    image: "/images/brunhilda-profile.jpg",
    role: "Recruitable Knight",
    stats: {},
    traits: ["Direct", "Battle-ready", "High-pressure assignment candidate"],
    hiddenTraits: ["Route-dependent details for route notes"],
    preferences: ["Combat pressure", "Glory-facing quests"],
    favoriteMeals: ["Galette-Saucisse", "Lion's Taco"],
    bestQuestSlugs: ["sovereign-tower-dragon-knight", "sovereign-tower-beast-hunt", "sovereign-tower-rebellion"],
    recruitment: "Keep this field updated with confirmed audience, route, or quest trigger details as player reports are documented.",
    notes: [
      "This page exists first as a search-intent landing page, then becomes a database profile as confirmed data grows.",
      "Do not overstate route-dependent route requirements; mark unknowns clearly until confirmed.",
      "Visible stats, hidden traits, and exact recruitment triggers should be documented through in-game results before being presented as final data.",
    ],
    relatedGuideHrefs: [
      { label: "How to Get Brunhilda", href: "/guide/sovereign-tower-how-to-get-brunhilda" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "Best Knights", href: "/knights" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "goberto",
    name: "Goberto",
    title: "Sovereign Tower Goberto Knight Guide",
    description: "Goberto is an early knight tied to combat, hunt assignments, Dragon Knight preparation, and the Dullahan branch if he dies.",
    role: "Early Knight",
    stats: { strength: 8, charisma: 5, luck: 5 },
    traits: ["Hunting candidate", "Combat pressure", "Early roster anchor"],
    hiddenTraits: ["Cheesemaker", "Clumsy"],
    preferences: ["Hunt", "Duel", "Relic Recovery"],
    favoriteMeals: ["Lion's Taco", "Galette-Saucisse", "Brizhian Butter Shortbread"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-dragon-knight", "sovereign-tower-dullahan-route"],
    recruitment: "Reported recruitment trigger: early knight around Day 2 / Cycle 2, with a fallback recruitment cost noted in public guides.",
    notes: [
      "Public guide data ties Goberto to early combat and hunt coverage, but also to low-agility risk in some assignments.",
      "Goberto's death is repeatedly reported as the Dullahan recruitment lead, so his survival state should be tracked as a route flag.",
      "Keep exact stat values and hidden trait wording checked against in-game screenshots before treating them as final.",
    ],
    relatedGuideHrefs: [
      { label: "Dullahan Route", href: "/quests/sovereign-tower-dullahan-route" },
      { label: "How to Get Dullahan", href: "/guide/sovereign-tower-how-to-get-dullahan" },
      { label: "Dragon Knight Guide", href: "/quests/sovereign-tower-dragon-knight" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "dullahan",
    name: "Dullahan",
    title: "How to Get Dullahan in Sovereign Tower",
    description: "Dullahan is a secret-knight style intent page for recruitment, route conditions, traits, and best quest assignments.",
    role: "Secret Knight",
    stats: {},
    traits: ["Unusual recruit", "Supernatural fit", "Route-sensitive"],
    hiddenTraits: ["Secret conditions for route notes"],
    preferences: ["Mystical threats", "Dangerous assignments"],
    favoriteMeals: ["All six meals"],
    bestQuestSlugs: ["sovereign-tower-dragon-knight", "sovereign-tower-gavault", "sovereign-tower-beast-hunt", "sovereign-tower-rebellion"],
    recruitment: "Track confirmed route triggers, audience choices, or quest branches here instead of scattering them across generic guides.",
    notes: [
      "Dullahan should link strongly to secret knights, hidden traits, and outcome pages.",
      "Use this profile to separate confirmed recruitment steps from community speculation.",
      "Do not publish exact stats, hidden trait names, or route locks until a repeatable in-game recruitment path is documented.",
    ],
    relatedGuideHrefs: [
      { label: "How to Get Dullahan", href: "/guide/sovereign-tower-how-to-get-dullahan" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "chester",
    name: "Sir Chester",
    title: "Sovereign Tower Chester Knight Guide",
    description: "Chester is the Clean Keeper Goose follow-up recruit, useful for odd-route tracking because public data lists random stats and all-meal affinity coverage.",
    role: "Secret Quest Recruit",
    stats: {},
    traits: ["Jester", "Random stats"],
    hiddenTraits: ["Happy To Be Here"],
    preferences: ["All quest types"],
    favoriteMeals: ["Galette-Saucisse", "Croque-Monsieur", "Prefou", "Crepe", "Brizhian Butter Shortbread", "Lion's Taco"],
    bestQuestSlugs: ["sovereign-tower-goose-quest", "sovereign-tower-unexpected-outcomes-route"],
    recruitment: "Reported recruitment trigger: complete Clean Keeper Goose, Part 2 with a special outcome such as cheese, horse, or Gwendan, then accept Chester at the Tower follow-up.",
    notes: [
      "Public all-knights data describes Chester as a Level 15, Armour 6 recruit with random 0-15 stat rolls per check.",
      "Because his stats reroll, the database should treat him as an odd-route specialist rather than a stable stat recommendation.",
      "Verify the exact dialogue option and whether every special goose outcome still unlocks him in the current build.",
    ],
    relatedGuideHrefs: [
      { label: "Goose Quest Walkthrough", href: "/quests/sovereign-tower-goose-quest" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "childeric",
    name: "Sir Childeric",
    title: "Sovereign Tower Childeric Knight Guide",
    description: "Childeric is an Almor tournament recruit with very high armour, making him important for duel, competition, and tank-style assignments.",
    role: "Tournament Recruit",
    stats: { strength: 7, agility: 4, charisma: 4, magic: 0, wit: 12, luck: 4 },
    traits: ["Resourceful", "Tank"],
    hiddenTraits: ["Paranoid", "Anxious"],
    preferences: ["Diplomacy"],
    favoriteMeals: ["Crepe", "Croque-Monsieur"],
    bestQuestSlugs: ["sovereign-tower-rebellion", "sovereign-tower-factions-route"],
    recruitment: "Reported recruitment trigger: win the Almor Grand Tournament without sending Goberto, after which Childeric loses rulership and can ask to join.",
    notes: [
      "Public all-knights data lists Childeric as Level 6 with Armour 9, the highest starting armour currently reported.",
      "His high Wit and armour make him a useful candidate for political pressure where survivability matters.",
      "Check the exact tournament branch before making a firm one-run route recommendation.",
    ],
    relatedGuideHrefs: [
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
      { label: "Quest Finder", href: "/quests" },
    ],
  },
  {
    slug: "daguez",
    name: "Daguez",
    title: "Sovereign Tower Daguez Knight Guide",
    description: "Daguez is a crisis recruit tied to the people's revolt route, with strong physical stats and low social or magical coverage.",
    role: "Crisis Recruit",
    stats: { strength: 15, agility: 0, charisma: 0, magic: 0, wit: 0, luck: 9 },
    traits: ["My Sword"],
    hiddenTraits: ["Problem Solver", "Nitwit"],
    preferences: ["Duel", "Hunt"],
    favoriteMeals: ["Crepe", "Galette-Saucisse", "Prefou"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-rebellion", "sovereign-tower-factions-route"],
    recruitment: "Reported recruitment trigger: a people's revolt crisis when People satisfaction collapses far enough in Act 3, then choose to knight one of them at the Round Table.",
    notes: [
      "Some public sources spell the name as Daugez; keep Daguez as the current database slug and audit alias handling before changing URLs.",
      "His stat line is extremely specialized, so avoid recommending him for diplomacy, scouting, or relic work without visible quest checks.",
      "This record should eventually link to a faction-satisfaction route page once the revolt trigger is fully verified.",
    ],
    relatedGuideHrefs: [
      { label: "Factions Guide", href: "/guide/sovereign-tower-factions" },
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "daugez",
    name: "Daugez",
    title: "Sovereign Tower Daugez Knight Guide",
    description: "Daugez is a spelling alias for Daguez, the crisis recruit tied to low faction score and the people's revolt route.",
    role: "Search Alias",
    stats: {},
    traits: ["Daguez alias", "Faction crisis route"],
    hiddenTraits: [],
    preferences: ["Use Daguez profile"],
    favoriteMeals: ["Crepe", "Galette-Saucisse", "Prefou"],
    bestQuestSlugs: ["sovereign-tower-factions-route", "sovereign-tower-rebellion"],
    recruitment: "Use the main Daguez route: public guides connect this recruit to a low-faction revolt or people-satisfaction crisis.",
    notes: [
      "Keep this alias live because public guides use both Daguez and Daugez spellings.",
      "Do not count Daugez as a separate knight from Daguez unless current-build evidence shows two distinct profiles.",
      "Primary profile and route notes should be maintained at /knights/daguez.",
    ],
    relatedGuideHrefs: [
      { label: "Daguez Profile", href: "/knights/daguez" },
      { label: "Factions Guide", href: "/guide/sovereign-tower-factions" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
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
    favoriteMeals: ["Crepe", "Croque-Monsieur"],
    bestQuestSlugs: ["sovereign-tower-groveshire", "sovereign-tower-rebellion"],
    recruitment: "Appears through the early audience and recruitment loop; update with exact cycle notes when documented.",
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
    description: "Gideon is a cycle-13 route knight with strong stage presence, useful for diplomacy, duel, and performance-style assignments.",
    role: "Route Knight",
    stats: { strength: 4, agility: 6, charisma: 8, magic: 3, wit: 7, luck: 2 },
    traits: ["Seductive", "Swordmaster"],
    hiddenTraits: ["Lasting Impression", "Protagonist"],
    preferences: ["Diplomacy", "Duel"],
    favoriteMeals: ["Brizhian Butter Shortbread", "Crepe"],
    bestQuestSlugs: ["sovereign-tower-rebellion", "sovereign-tower-groveshire", "sovereign-tower-gavault"],
    recruitment: "Reported recruitment trigger: Gideon's candidacy appears around cycle 13, with some public guides also describing a court encounter and fallback map-room recruitment.",
    notes: [
      "Public all-knights data lists Gideon as Level 5, Armour 5 from Tower City.",
      "Use him for social, duel, and repeated-location tests before assigning him to scouting or woods-heavy routes.",
      "Confirm whether the cycle-13 candidacy and fallback cost both appear in the current live build before writing a fixed walkthrough step.",
    ],
    relatedGuideHrefs: [
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "epicrates",
    name: "Epicrates",
    title: "Sovereign Tower Epicrates Character Guide",
    description: "Epicrates is a Brimwood storyline recruit tied to trial outcomes, revolution routes, relic recovery, and time-knowledge checks.",
    role: "Special Recruit",
    stats: { strength: 3, agility: 3, charisma: 9, magic: 9, wit: 12, luck: 3 },
    traits: ["Revolutionar", "Undiplomatic"],
    hiddenTraits: ["Time Perception", "Intuitive"],
    preferences: ["Relic Recovery", "Magic Ritual"],
    favoriteMeals: ["Brizhian Butter Shortbread", "Prefou"],
    bestQuestSlugs: ["sovereign-tower-act-2-murder-investigation", "sovereign-tower-rebellion", "sovereign-tower-new-game-plus-route"],
    recruitment: "Reported recruitment trigger: resolve the Brimwood Congregation storyline through the trial or breakout route and the serpent-knight finale.",
    notes: [
      "Public all-knights data lists Epicrates as Level 9, Armour 6 from the Brimwood Congregation.",
      "His high Wit, Charisma, and Magic make him a strong candidate for investigation, relic, and magical-route testing.",
      "Keep the exact trial/breakout sequence in a dedicated Brimwood walkthrough before presenting it as a short answer.",
    ],
    relatedGuideHrefs: [
      { label: "Epicrates Character Guide", href: "/characters/sovereign-tower-epicrates" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "Recruit Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
    ],
  },
  {
    slug: "edith",
    name: "Lady Edith",
    title: "Sovereign Tower Edith Knight Guide",
    description: "Edith is a Moonvale/Avalon magical knight tied to dragon and spell routes, relic recovery, and demonic-presence outcome checks.",
    role: "Moonvale Recruit",
    stats: { strength: 7, agility: 10, charisma: 3, magic: 12, wit: 7, luck: 0 },
    traits: ["Perfume", "Syphon"],
    hiddenTraits: ["Possessed Sword", "Demonic Presence"],
    preferences: ["Relic Recovery", "Magic Ritual"],
    favoriteMeals: ["Croque-Monsieur", "Brizhian Butter Shortbread"],
    bestQuestSlugs: ["sovereign-tower-act-2-murder-investigation", "sovereign-tower-dragon-heart-follow-up", "sovereign-tower-new-game-plus-route"],
    recruitment: "Reported recruitment trigger: in the first Moonvale audience, ask for a knight who knows dragons and spells; public guides also mention a 25-fund fallback.",
    notes: [
      "Public all-knights data lists Edith as Level 8, Armour 7 from Avalon.",
      "Her Magic and Agility make her worth testing on spell, dragon, and relic lines, but avoid assassination unless the visible quest math still works.",
      "Track her changed-form route separately before turning transformation notes into a fixed walkthrough.",
    ],
    relatedGuideHrefs: [
      { label: "Act 2 Murder Investigation", href: "/quests/sovereign-tower-act-2-murder-investigation" },
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "gothild",
    name: "Lady Gothild",
    title: "Sovereign Tower Gothild Knight Guide",
    description: "Gothild is a Mana Strala / Enberg-route knight connected to Victoria's ambush, the murder investigation, bodyguard coverage, and assassination or duel assignments.",
    role: "Investigation Route Recruit",
    stats: { strength: 9, agility: 3, charisma: 5, magic: 3, wit: 9, luck: 8 },
    traits: ["Bodyguard", "Mute", "Naive"],
    hiddenTraits: ["Believer"],
    preferences: ["Assassination", "Duel"],
    favoriteMeals: ["Croque-Monsieur", "Brizhian Butter Shortbread"],
    bestQuestSlugs: ["sovereign-tower-act-2-murder-investigation", "sovereign-tower-rebellion", "sovereign-tower-new-game-plus-route"],
    recruitment: "Reported recruitment trigger: Victoria's ambush success follow-up or the Enberg murder-investigation route, including interrogation or finale outcomes.",
    notes: [
      "Public all-knights data lists Gothild as Level 7, Armour 6 from Mana Strala.",
      "Her Bodyguard trait makes her important for party-survival testing, not just raw personal score.",
      "Because her route overlaps Victoria and Yohav timing, keep exact ordering in the Act 2 investigation walkthrough before making short-answer claims.",
    ],
    relatedGuideHrefs: [
      { label: "Act 2 Murder Investigation", href: "/quests/sovereign-tower-act-2-murder-investigation" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "jester",
    name: "Jester",
    title: "Sovereign Tower Jester Knight Guide",
    description: "Jester is a character-intent entry for court chaos, social misdirection, and Round Table management notes while exact mechanics remain unconfirmed.",
    role: "Special Recruit",
    stats: {},
    traits: ["Unpredictable", "Court-facing", "Misdirection candidate"],
    hiddenTraits: ["Prank, morale, or chaos checks for route notes"],
    preferences: ["Odd jobs", "Public scenes", "Unexpected outcome testing"],
    bestQuestSlugs: ["sovereign-tower-goose-quest", "sovereign-tower-groveshire", "sovereign-tower-rebellion"],
    recruitment: "Track whether Jester is a named recruit, archetype, or event label before publishing exact unlock requirements.",
    notes: [
      "Stats are omitted until Jester is confirmed as a recruitable profile rather than an archetype or event label.",
      "Avoid claiming special outcome manipulation until the interaction is documented in-game.",
      "Useful as a database profile for searches about eccentric knights and Round Table drama.",
    ],
    relatedGuideHrefs: [
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "ari",
    name: "Ari",
    title: "Sovereign Tower Ari Knight Guide",
    description: "Ari is a Basalt Isles route recruit tied to the succession dispute, gryphon access, and late-roster planning.",
    role: "Basalt Isles Recruit",
    stats: {},
    traits: ["Gryphon route candidate", "Late roster recruit"],
    hiddenTraits: ["Never resigns"],
    preferences: ["Route testing", "Mount or flying context", "Low-risk late assignments"],
    favoriteMeals: ["Crepe"],
    bestQuestSlugs: ["sovereign-tower-new-game-plus-route", "sovereign-tower-factions-route"],
    recruitment: "Reported recruitment trigger: during the Basalt Isles succession dispute, follow the bottom-brother or local merchant guild dialogue route, then recruit Ari from the map room; public guides mention a 25-fund cost.",
    notes: [
      "Public roster data identifies Ari as one of the 24 recruitable names and connects him to Basalt Isles gryphon routing.",
      "Some public all-knights data says Ari, like Alwena, effectively never resigns.",
      "Keep exact stats empty until a current-build profile screenshot or repeatable stat table is verified.",
    ],
    relatedGuideHrefs: [
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "Quest Finder", href: "/quests" },
    ],
  },
  {
    slug: "ligia",
    name: "Ligia",
    title: "Sovereign Tower Ligia Knight Guide",
    description: "Ligia is an Act 2 Southbay Gate recruit tied to the lamp quest, father-rescue route, and rewind knowledge.",
    role: "Act 2 Route Recruit",
    stats: {},
    traits: ["Lamp quest route", "Family rescue branch"],
    hiddenTraits: ["Rewind-sensitive unlock"],
    preferences: ["Route completion", "Careful deadline tracking"],
    favoriteMeals: ["Prefou", "Crepe"],
    bestQuestSlugs: ["sovereign-tower-new-game-plus-route", "sovereign-tower-act-2-murder-investigation"],
    recruitment: "Reported recruitment trigger: save Ligia's father / win the lamp quest before its three-cycle deadline, then use rewind knowledge because someone else finds the lamp first.",
    notes: [
      "Multiple current public guides connect Ligia to the lamp quest and father rescue route.",
      "The exact deadline and rewind sequence should be documented in a dedicated lamp quest walkthrough before reducing it to a one-line answer.",
      "Keep stats empty until current-build screenshots or a reliable stat table are checked.",
    ],
    relatedGuideHrefs: [
      { label: "New Game Plus", href: "/guide/sovereign-tower-new-game-plus" },
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "oliver",
    name: "Oliver",
    title: "Sovereign Tower Oliver Knight Guide",
    description: "Oliver is an Act 2 recruit whose availability depends on the prologue spare-or-execute branch.",
    role: "Prologue Branch Recruit",
    stats: {},
    traits: ["Prologue consequence", "Route-sensitive recruit"],
    hiddenTraits: ["Transformation route"],
    preferences: ["Careful route testing", "Magic academy follow-up"],
    favoriteMeals: ["Galette-Saucisse", "Croque-Monsieur"],
    bestQuestSlugs: ["sovereign-tower-act-0-walkthrough", "sovereign-tower-new-game-plus-route"],
    recruitment: "Reported recruitment trigger: spare the attacker in the opening minutes; Oliver can later come to the Tower asking for work.",
    notes: [
      "Public recruitment guides consistently place Oliver behind the prologue spare branch.",
      "Player reports describe a later magic-academy transformation route, but keep that as a follow-up until the exact quest sequence is documented.",
      "Do not rewrite prologue walkthrough claims around Oliver until the branch wording is verified in-game.",
    ],
    relatedGuideHrefs: [
      { label: "Act 0 Prologue Walkthrough", href: "/quests/sovereign-tower-act-0-walkthrough" },
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "silgur",
    name: "Silgur",
    title: "Sovereign Tower Silgur Knight Guide",
    description: "Silgur is a Groveshire / Beast route alternative recruited when the beast is killed without Angelica's special tamed outcome.",
    role: "Groveshire Route Recruit",
    stats: {},
    traits: ["Beast route alternative", "Combat route recruit"],
    hiddenTraits: ["Dragon Heart transformation candidate"],
    preferences: ["Hunt", "Physical route pressure"],
    favoriteMeals: ["Galette-Saucisse", "Crepe"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-groveshire", "sovereign-tower-dragon-heart-follow-up"],
    recruitment: "Reported recruitment trigger: choose to kill the beast in Groveshire and do not send Angelica; after Groveshire pledges as ally, Silgur can request an audience.",
    notes: [
      "Public guides agree Silgur is the kill-the-beast alternative to The Wolf / Rufus route.",
      "Transformation notes involving Dragon Heart are player-reported and should stay marked as route testing until confirmed.",
      "Keep stats empty until profile data is verified against current build.",
    ],
    relatedGuideHrefs: [
      { label: "Beast Hunt Walkthrough", href: "/quests/sovereign-tower-beast-hunt" },
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "tarcus",
    name: "Tarcus",
    title: "Sovereign Tower Tarcus Knight Guide",
    description: "Tarcus is the Gavault nobles-investigation recruit and an important Zolta/Kutnar cheating route enabler.",
    role: "Gavault Route Recruit",
    stats: {},
    traits: ["Nobles investigation route", "Kutnar cheat enabler"],
    hiddenTraits: ["Route leverage"],
    preferences: ["Political investigation", "Tournament route testing"],
    favoriteMeals: ["Prefou"],
    bestQuestSlugs: ["sovereign-tower-gavault", "sovereign-tower-factions-route"],
    recruitment: "Reported recruitment trigger: investigate the nobles in the early Gavault route; public guides also connect him to the mother-side audience and stopping Brunhilda.",
    notes: [
      "Tarcus matters beyond his own profile because several Zolta recruitment reports use him for the Kutnar cheating path.",
      "Keep his exact stats empty until profile data is verified.",
      "Route wording should remain cautious because Gavault has several mutually exclusive branches.",
    ],
    relatedGuideHrefs: [
      { label: "Act 1 Gavault Walkthrough", href: "/quests/sovereign-tower-gavault" },
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "victoria",
    name: "Victoria",
    title: "Sovereign Tower Victoria Knight Guide",
    description: "Victoria is an Act 3 Enberg route recruit tied to her quest chain, Yohav-related murder route pressure, and betrayal risk.",
    role: "Act 3 Route Recruit",
    stats: {},
    traits: ["Quest-chain recruit", "Betrayal risk"],
    hiddenTraits: ["Murder investigation route consequences"],
    preferences: ["High-stakes route testing", "Court pressure"],
    favoriteMeals: ["Croque-Monsieur", "Prefou"],
    bestQuestSlugs: ["sovereign-tower-act-2-murder-investigation", "sovereign-tower-rebellion", "sovereign-tower-new-game-plus-route"],
    recruitment: "Reported recruitment trigger: welcome Victoria into the Tower, choose the Round Table offer at her first-audience fork, clear her trials, then accept at the completed-trials audience.",
    notes: [
      "Public comments and guides warn that lying or mishandling Victoria's route can trigger betrayal and cost an available strong knight.",
      "Her route overlaps Gothild and the Yohav murder investigation, so keep step-by-step claims inside the investigation walkthrough.",
      "Keep stats empty until verified profile data is available.",
    ],
    relatedGuideHrefs: [
      { label: "Act 2 Murder Investigation", href: "/quests/sovereign-tower-act-2-murder-investigation" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
    ],
  },
  {
    slug: "zolta",
    name: "Zolta",
    title: "Sovereign Tower Zolta Knight Guide",
    description: "Zolta is a Kutnar / Volga Camp recruit tied to derby cheating, unconventional mounts, and a reported 250-gold recruitment cost.",
    role: "Kutnar Tournament Recruit",
    stats: {},
    traits: ["Tournament recruit", "Cheating-route reward"],
    hiddenTraits: ["Unconventional mount route"],
    preferences: ["Competition", "Route trickery"],
    favoriteMeals: ["Crepe"],
    bestQuestSlugs: ["sovereign-tower-new-game-plus-route", "sovereign-tower-factions-route"],
    recruitment: "Reported recruitment trigger: cheat in the Kutnar derby with Tarcus or win with The Wolf / an unconventional mount, then pay the recruitment cost currently reported as 250 gold.",
    notes: [
      "Public sources differ on whether Tarcus is required or simply one confirmed path, so present both as route leads until tested.",
      "The 250-gold cost appears in multiple public recruitment summaries and should be checked in the current build before hard-coding elsewhere.",
      "Keep stats empty until a current roster profile is verified.",
    ],
    relatedGuideHrefs: [
      { label: "Recruit All Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All 24 Knights Checklist", href: "/guide/sovereign-tower-all-24-knights-checklist" },
      { label: "Quest Finder", href: "/quests" },
    ],
  },
  {
    slug: "lady-of-the-tower",
    name: "Lady of the Tower",
    title: "Lady of the Tower Knight Profile - Sovereign Tower",
    description: "The Lady of the Tower is a major tower presence and advisor-style character whose advice, romance route, and hidden agenda should be tracked separately from standard knights.",
    role: "Route Knight",
    stats: { charisma: 6, magic: 5, wit: 5 },
    traits: ["Advisor presence", "Tower-bound", "Romance route candidate"],
    hiddenTraits: ["True allegiance and route consequences for route notes"],
    preferences: ["Tower mysteries", "Bold decisions", "Administrative follow-up"],
    bestQuestSlugs: ["sovereign-tower-gavault", "sovereign-tower-rebellion", "sovereign-tower-dragon-knight"],
    recruitment: "Known coverage frames her as a tower figure rather than a normal recruit; document whether she can be assigned like a knight before changing her role.",
    notes: [
      "Treat her stats as database planning notes for a magical advisor profile, not confirmed quest assignment numbers.",
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
    stats: {},
    traits: ["Timeline-sensitive candidate", "Audience candidate", "Unconfirmed role"],
    hiddenTraits: ["Branch appearance conditions for route notes"],
    preferences: ["Audience phases", "Faction choices", "Timeline experiments"],
    bestQuestSlugs: ["sovereign-tower-groveshire", "sovereign-tower-rebellion", "sovereign-tower-hammer-lost-yet-again"],
    recruitment: "Document whether Roberto appears as a recruitable knight, NPC, or branch-only character before publishing a firm recruitment route.",
    notes: [
      "Existing character copy states official Roberto details are scarce, so this record should remain conservative.",
      "Stats are omitted until Roberto is confirmed as assignable in the in-game results.",
      "Prioritize screenshots or repeatable audience evidence before adding specific mechanics.",
      "Do not attach a portrait or screenshot field until the asset can be traced to Roberto specifically.",
    ],
    relatedGuideHrefs: [
      { label: "Roberto Character Guide", href: "/characters/sovereign-tower-roberto" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "Recruit Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "All Quests", href: "/quests" },
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
      { label: "Epicrates Character Guide", href: "/characters/sovereign-tower-epicrates" },
    ],
  },
  {
    slug: "rufus",
    name: "Rufus of Groveshire",
    title: "Sovereign Tower Rufus Knight Guide",
    description: "Rufus is the reported human form of The Wolf, unlocked through the Groveshire curse-breaking route after The Wolf is already on the roster.",
    role: "Transformed Beast Recruit",
    stats: {},
    traits: ["Curse route", "Wilderness fit", "Close-range strength candidate"],
    hiddenTraits: ["Wolf transformation context"],
    preferences: ["Forest work", "Hunts", "Curse-route testing"],
    favoriteMeals: ["Galette-Saucisse", "Croque-Monsieur"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-groveshire", "sovereign-tower-dragon-knight"],
    recruitment: "Reported recruitment trigger: recruit The Wolf first, then complete the Groveshire curse-removal route so Belladonna can cure him back to human.",
    notes: [
      "Public recruitment guides frame Rufus as The Wolf transformed, not a separate first-contact recruit.",
      "Do not claim Rufus and Silgur can both join in the same ordinary route until exclusivity is tested.",
      "Stats are omitted until the visible Rufus profile can be verified in the current build.",
    ],
    relatedGuideHrefs: [
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "All Quests", href: "/quests" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
    ],
  },
  {
    slug: "sparky",
    name: "Sparky",
    title: "Sovereign Tower Sparky Knight Guide",
    description: "Sparky is a community-interest knight profile for tracking branch, annex, and faction-affinity recruitment evidence.",
    role: "Special Recruit",
    stats: { agility: 5, magic: 5, luck: 4 },
    traits: ["Eccentric", "Branch candidate", "Energy-themed planning notes"],
    hiddenTraits: ["Annex or faction unlock conditions for route notes"],
    preferences: ["Tower expansion", "Experimental assignments", "Magical or quick-response tasks"],
    bestQuestSlugs: ["sovereign-tower-gavault", "sovereign-tower-hammer-lost-yet-again", "sovereign-tower-goose-quest"],
    recruitment: "Existing character coverage suggests checking annexes, balanced factions, and alternate timeline choices; keep exact trigger pending documentation.",
    notes: [
      "Stats are conservative planning notes and should not be used as final advice.",
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
    description: "Ursula is an early recruit reported around Day 5, best treated as a direct specialist while avoiding diplomacy-first assignments.",
    role: "Early Recruit",
    stats: { strength: 6, magic: 5, charisma: 1 },
    traits: ["Low-Charisma warning case", "Specialist", "Direct problem solver"],
    hiddenTraits: ["Exact strengths and route ties for route notes"],
    preferences: ["Non-diplomatic jobs", "Combat or magical pressure", "Clear objectives"],
    favoriteMeals: ["Prefou", "Lion's Taco"],
    bestQuestSlugs: ["sovereign-tower-dragon-knight", "sovereign-tower-gavault", "sovereign-tower-beast-hunt"],
    recruitment: "Reported recruitment trigger: Ursula appears automatically around Day 5 in the early roster flow.",
    notes: [
      "Public recruitment summaries consistently list Ursula as an early Day 5 recruit.",
      "The low Charisma warning should remain visible because several guides treat diplomacy as her bad fit.",
      "Confirm the exact current-build stat spread before presenting her as a universal combat or magic answer.",
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
    description: "The Wolf is a Groveshire beast-route recruit tied to Angelica's special outcome and a later Rufus curse-breaking transformation.",
    role: "Beast Route Recruit",
    stats: { agility: 6, strength: 5, luck: 3 },
    traits: ["Beast-route candidate", "Wilderness fit", "Transformation route"],
    hiddenTraits: ["Rufus curse route"],
    preferences: ["Hunts", "Forests", "Fast physical assignments"],
    favoriteMeals: ["Galette-Saucisse", "Croque-Monsieur"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-goose-quest", "sovereign-tower-groveshire"],
    recruitment: "Reported recruitment trigger: send Angelica on the beast or werewolf fight to get the special tamed outcome instead of killing it.",
    notes: [
      "Public guides list The Wolf as a real roster entry, then Rufus as the later cured form.",
      "Treat current stats as provisional until a visible current-build profile confirms the full spread.",
      "Do not confuse The Wolf route with Silgur's kill-the-beast-without-Angelica route.",
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
    description: "Wolf Knight is a legacy search alias that should route players toward The Wolf, Beast Hunt, Groveshire, and Rufus transformation notes.",
    role: "Search Alias",
    stats: {},
    traits: ["Legacy query", "The Wolf alias", "Route disambiguation"],
    hiddenTraits: [],
    preferences: ["Beast Hunt route notes", "Groveshire route notes", "Rufus transformation checks"],
    bestQuestSlugs: ["sovereign-tower-beast-hunt", "sovereign-tower-groveshire"],
    recruitment: "Use The Wolf as the current roster entry: public guides report Angelica's special beast outcome as the recruitment route.",
    notes: [
      "Do not count Wolf Knight as a separate 25th recruit unless current-build evidence shows a separate profile.",
      "Keep this route only to preserve search coverage for players using the alternate phrase.",
      "Point primary guidance to The Wolf and Rufus pages.",
    ],
    relatedGuideHrefs: [
      { label: "The Wolf", href: "/knights/wolf" },
      { label: "Rufus", href: "/knights/rufus" },
      { label: "Beast Hunt", href: "/quests/sovereign-tower-beast-hunt" },
      { label: "Groveshire", href: "/quests/sovereign-tower-groveshire" },
    ],
  },
];

export const QUESTS: QuestRecord[] = [
  {
    slug: "sovereign-tower-dragon-knight",
    name: "Dragon Knight",
    title: "How to Beat the Dragon Knight in Sovereign Tower",
    description: "A named challenge quest for stat planning, knight selection, damage risk, and outcome tracking.",
    image: "/images/dragon-knight-encounter.jpg",
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
      "Split individual Groveshire quests into child records once their requirements are documented.",
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
      "Treat Gavault as a parent page until individual quest records have enough documented detail.",
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
    description: "A dangerous hunt assignment for combat, survival, and trait testing; keep the stat numbers as provisional planning notes and document exact requirements as route data grows.",
    image: "/images/beast-hunt-requirements.jpg",
    type: "Challenge",
    region: "Act 1",
    difficulty: "Medium",
    requiredStats: { strength: 5, agility: 4, luck: 2 },
    recommendedKnightSlugs: ["brunhilda", "dullahan", "angelica"],
    bestTraits: ["Battle-ready", "Supernatural fit", "Animal Lover", "High Agility"],
    steps: [
      "Open Beast Hunt and record the visible stat or trait requirement before assignment.",
      "Treat Strength and Agility as reasonable route-note priorities until exact route data is documented.",
      "Compare combat fit, survival risk, and animal or beast-related traits before choosing a knight.",
      "Log success, failure, injuries, rewards, and unexpected text so the requirement can be corrected as data grows.",
    ],
    outcomes: [
      { label: "Clean Hunt", description: "A matching knight clears the threat with low injury risk; confirm the exact stat check before marking this as stable." },
      { label: "Injury Risk", description: "A poor combat or survival match may produce damage, roster pressure, or a failed hunt result." },
      { label: "Trait Interaction", description: "Animal, supernatural, or hunting-adjacent traits may alter the result and should be documented across rewinds." },
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
    description: "A high-risk political or combat route quest where loyalty, stat fit, and branch consequences should be tracked; required stats are provisional until documented playthrough data grows.",
    image: "/images/rebellion-route-risk.jpg",
    type: "Main",
    region: "Act 1",
    difficulty: "High",
    requiredStats: { charisma: 5, strength: 4, wit: 3 },
    recommendedKnightSlugs: ["gwendan", "brunhilda", "dullahan"],
    bestTraits: ["Court-facing", "Battle-ready", "Route knowledge", "Stable loyalty"],
    steps: [
      "Prepare a rewind point and write down the visible Rebellion warning text.",
      "Use Charisma, Strength, and Wit as planning notes planning checks until confirmed requirements replace them.",
      "Balance stat fit against loyalty risk, especially if the route frames the rebellion as political pressure rather than pure combat.",
      "Record whether the branch changes later dialogue, quest access, roster state, or ruler reputation as data grows.",
    ],
    outcomes: [
      { label: "Order Restored", description: "The assignment resolves the rebellion without obvious route damage; document the exact stat and loyalty checks." },
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
    description: "A spoiler-light demo route hub for first-cycle planning, knight assignment basics, and tracking which tutorial decisions carry into later data; stat gates are planning notes until the demo build is rechecked.",
    type: "Main",
    region: "Demo",
    difficulty: "Early",
    requiredStats: { agility: 2, charisma: 2, luck: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan"],
    bestTraits: ["Reliable early assignment", "Kind-hearted", "Court-facing"],
    steps: [
      "Use the demo as a baseline pass for learning audiences, quest assignment, affinity, and rewind notation.",
      "Treat the listed stats as conservative planning notes, then replace them with exact visible requirements after a fresh demo run.",
      "Assign Angelica to low-risk tutorial quests first so hidden trait and affinity behavior can be recorded cleanly.",
      "Log which quest names, servants, factions, or route flags appear in the demo but remain unresolved.",
    ],
    outcomes: [
      { label: "Tutorial Clear", description: "The player understands the core loop and has a clean list of early requirements for route notes." },
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
      "Use the route-note stats only as a checklist for likely early checks; confirm the real values from visible quest UI later.",
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
    description: "A reusable early-cycle planning route for deciding which quests to scout, which failures to preserve as knowledge, and when to commit a knight; exact requirements should be filled in from documented cycle notes.",
    type: "Special",
    region: "Early Cycles",
    difficulty: "Early",
    requiredStats: { luck: 3, wit: 2, charisma: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan", "dullahan"],
    bestTraits: ["Route knowledge", "High Luck", "Stable loyalty"],
    steps: [
      "Scout new quests first, especially those with hidden trait language or unclear risk.",
      "Treat planning notes Luck, Wit, and Charisma values as planning prompts rather than confirmed gates.",
      "Use rewind knowledge to decide whether a failure is worth keeping as information before attempting a clean clear.",
      "Promote any repeatable early-cycle quest into its own record once the text, stats, and outcomes are documented.",
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
    description: "A campaign-spanning route index for connecting Act 0, Act 1 regions, faction pressure, romance flags, and late-game checks; stats are broad planning notes until end-to-end route data is documented.",
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
    description: "A route-planning record for New Game Plus assumptions, carryover checks, alternate openings, and repeat-cycle optimization; exact unlocks and stat changes must be documented before publication.",
    type: "Special",
    region: "New Game Plus",
    difficulty: "Unknown",
    requiredStats: { luck: 4, wit: 4, magic: 3 },
    recommendedKnightSlugs: ["dullahan", "brunhilda", "angelica"],
    bestTraits: ["Route knowledge", "Secret conditions for route notes", "High Luck"],
    steps: [
      "Confirm whether New Game Plus exists in the in-game results before treating this as a live route guide.",
      "Use route-note stats only for database sorting and internal planning until carryover behavior is tested.",
      "Track inherited knowledge, roster changes, hidden trait visibility, and altered audience options separately.",
      "Link confirmed NG+ branches back to their base campaign quests so players can compare differences.",
    ],
    outcomes: [
      { label: "Confirmed Carryover", description: "Known unlocks, knowledge, or route shortcuts can be documented without speculation." },
      { label: "Route-dependent Mode", description: "If NG+ behavior is absent or build-dependent, keep the record as a clearly marked research planning notes." },
    ],
    relatedGuideHrefs: [
      { label: "Recruit Knights", href: "/guide/sovereign-tower-recruit-knights" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
    ],
  },
  {
    slug: "sovereign-tower-cooking-questline",
    name: "Cooking Questline",
    title: "Sovereign Tower Cooking Questline Guide",
    description: "A systems-facing questline record for meals, servant support, morale, and possible affinity effects; required stats are intentionally low-confidence planning notes until cooking tasks are documented.",
    type: "Contract",
    region: "Tower Systems",
    difficulty: "Early",
    requiredStats: { luck: 2, charisma: 2, wit: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan"],
    bestTraits: ["Kind-hearted", "Diplomatic", "Reliable early assignment"],
    steps: [
      "Record every cooking-related request, ingredient prompt, servant mention, and affinity change in one place.",
      "Treat the route-note stats as likely social or utility checks, not confirmed recipe requirements.",
      "Watch for hidden trait interactions, especially gentle, social, animal-friendly, or servant-facing text.",
      "Create child records for named recipes or kitchen events once their exact requirements are known.",
    ],
    outcomes: [
      { label: "Morale Benefit", description: "Cooking may support affinity, recovery, or tower systems once exact mechanics are confirmed." },
      { label: "Servant Lead", description: "Kitchen events may reveal servant availability or unlock conditions that belong in later database tables." },
    ],
    relatedGuideHrefs: [
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
      { label: "Annexes / Systems", href: "/systems" },
      { label: "All Quests", href: "/quests" },
      { label: "Knight Traits Guide", href: "/guide/sovereign-tower-knight-traits" },
    ],
  },
  {
    slug: "sovereign-tower-alliances-route",
    name: "Alliances Route",
    title: "Sovereign Tower Alliances Route Guide",
    description: "A diplomacy route record for tracking alliance offers, faction pressure, knight loyalty, and social checks without claiming precise thresholds before documentation.",
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
      "Link alliance decisions to later rebellion, faction, and romance consequences as those branches are documented.",
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
    description: "A tower-management route record for servant assignments, Intendant choices, annex support, and administrative consequences; exact unlocks are intentionally left to future documentation.",
    type: "Special",
    region: "Tower Systems",
    difficulty: "Medium",
    requiredStats: { wit: 4, charisma: 3, luck: 2 },
    recommendedKnightSlugs: ["gwendan", "angelica", "dullahan"],
    bestTraits: ["Problem solving", "Diplomatic", "Route knowledge"],
    steps: [
      "Track servant names, Intendant dialogue, annex references, and any quest that changes tower operations.",
      "Use the route-note stats as administrative planning hints until the game exposes exact requirements.",
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
    description: "A faction-routing hub for tracking reputation, alliance conflicts, rebellion pressure, and route locks; all stat values here are planning notes until faction checks are confirmed.",
    type: "Region",
    region: "Court Politics",
    difficulty: "High",
    requiredStats: { charisma: 5, wit: 5, strength: 3 },
    recommendedKnightSlugs: ["gwendan", "brunhilda", "dullahan"],
    bestTraits: ["Court-facing", "Route knowledge", "Battle-ready", "Stable loyalty"],
    steps: [
      "Create a faction ledger that notes who gains or loses approval after each major quest.",
      "Treat Charisma, Wit, and Strength as broad planning notes checks for negotiation, schemes, and enforcement.",
      "Compare faction outcomes against Rebellion, Alliances, and Full Campaign route records.",
      "Promote any named faction quest into its own QuestRecord once exact requirements and rewards are documented.",
    ],
    outcomes: [
      { label: "Faction Alignment", description: "A stable alignment should open predictable quest or audience options after documentation." },
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
    description: "A romance-route record for Angelica affinity, gentle choices, animal-friendly interactions, and route safety notes; exact romance thresholds should be documented before publishing firm steps.",
    type: "Special",
    region: "Romance",
    difficulty: "Medium",
    requiredStats: { charisma: 4, luck: 3, agility: 2 },
    recommendedKnightSlugs: ["angelica"],
    bestTraits: ["Kind-hearted", "Animal Lover", "Optimistic", "High Luck"],
    steps: [
      "Track every Angelica affinity change, disliked assignment, hidden trait reveal, and romance-coded dialogue option.",
      "Use the route-note stat line only to sort the route until exact affinity or stat thresholds are documented.",
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
    description: "A recruitment-route record for Brunhilda that collects combat, glory, audience, and route-lead notes without overstating the exact unlock condition.",
    image: "/images/brunhilda-recruitment-lead.jpg",
    type: "Special",
    region: "Recruitment",
    difficulty: "Medium",
    requiredStats: { strength: 5, charisma: 3, agility: 2 },
    recommendedKnightSlugs: ["brunhilda", "gwendan", "angelica"],
    bestTraits: ["Battle-ready", "High-pressure assignment candidate", "Court-facing"],
    steps: [
      "Track where Brunhilda is first mentioned, offered, challenged, or seen in audience text.",
      "Use Strength and Charisma as route-note priorities until exact recruitment requirements are confirmed.",
      "Compare combat quest results, public glory choices, and alliance pressure for possible recruitment triggers.",
      "Link confirmed steps back to Brunhilda's knight profile and remove any speculative wording once documented data exists.",
    ],
    outcomes: [
      { label: "Brunhilda Recruited", description: "The route adds Brunhilda to the roster with enough context to assign her safely to combat-heavy quests." },
      { label: "Missed Recruitment", description: "A wrong branch, low reputation, or route-dependent prerequisite may prevent recruitment and should be tested across rewinds." },
    ],
    relatedGuideHrefs: [
      { label: "Brunhilda Knight Guide", href: "/knights/brunhilda" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Quest Requirements", href: "/guide/sovereign-tower-quest-requirements" },
    ],
  },
  {
    slug: "sovereign-tower-meals-favorite-foods-route",
    name: "Meals and Favorite Foods Route",
    title: "Sovereign Tower Meals and Favorite Foods Route Guide",
    description: "A food-system tracking route for meal preferences, favorite foods, affinity signals, and knight bonus claims; exact recipes and values must be documented through in-game results.",
    type: "System",
    region: "Tower Systems",
    difficulty: "Early",
    requiredStats: { charisma: 2, wit: 2, luck: 2 },
    recommendedKnightSlugs: ["angelica", "gwendan", "dullahan"],
    bestTraits: ["Kind-hearted", "Diplomatic", "Servant-facing", "Route knowledge"],
    steps: [
      "Record each meal name, ingredient prompt, assigned knight, visible requirement, and result before treating it as a favorite food.",
      "Separate confirmed affinity movement from flavor text, morale hints, or servant dialogue.",
      "Compare Angelica, Gwendan, and route-sensitive knights only when in-game results show compatible requirements.",
      "Link any confirmed recipe back to the Meals guide and Cooking Questline instead of spreading route-dependent numbers across pages.",
    ],
    outcomes: [
      { label: "Preference Confirmed", description: "A meal, favorite food, or affinity effect is repeatable enough to document as in-game evidence." },
      { label: "Route-dependent Food Claim", description: "A reported bonus remains useful as a tracking note, but should not be treated as a fixed recipe value." },
    ],
    relatedGuideHrefs: [
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "Cooking Questline", href: "/quests/sovereign-tower-cooking-questline" },
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-dragon-heart-follow-up",
    name: "Dragon Heart Follow-Up",
    title: "Sovereign Tower Dragon Heart Follow-Up Route Guide",
    description: "A documentation route for Dragon Heart searches, Dragon Knight follow-ups, and late supernatural consequences without claiming a fixed unlock path before evidence is confirmed.",
    type: "Special",
    region: "Dragon Route",
    difficulty: "Unknown",
    requiredStats: { magic: 4, strength: 3, wit: 3 },
    recommendedKnightSlugs: ["brunhilda", "dullahan", "angelica"],
    bestTraits: ["Supernatural fit", "Battle-ready", "Route knowledge", "Problem solving"],
    steps: [
      "Start from the Dragon Knight quest result and record whether the Dragon Heart term appears in dialogue, rewards, systems, or route notes.",
      "Treat Magic, Strength, and Wit as provisional sorting hints until in-game results expose exact checks.",
      "Log any follow-up audience, item wording, route lock, or knight reaction before creating a firm how-to claim.",
      "Connect documented findings to the Dragon Heart system page, Dragon Knight quest, and Best Knights guide.",
    ],
    outcomes: [
      { label: "Dragon Heart Lead", description: "The player finds a repeatable clue, item, or route reference that can be documented cautiously." },
      { label: "No Confirmed Follow-Up", description: "The Dragon Heart remains a search-intent tracking hub until in-game evidence supports a route." },
    ],
    relatedGuideHrefs: [
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
      { label: "Dragon Knight Quest", href: "/quests/sovereign-tower-dragon-knight" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-epicrates-route",
    name: "Epicrates Route",
    title: "Sovereign Tower Epicrates Route Guide",
    description: "A character-route record for Epicrates search intent, rare encounter notes, recruitment uncertainty, and branch testing with cautious in-game wording.",
    type: "Special",
    region: "Character Route",
    difficulty: "Unknown",
    requiredStats: { wit: 4, magic: 3, charisma: 3 },
    recommendedKnightSlugs: ["epicrates", "dullahan", "gwendan"],
    bestTraits: ["Rare encounter for route notes", "Route-sensitive", "Problem solving", "Community report"],
    steps: [
      "Collect the exact scene, audience, or quest where Epicrates is mentioned before calling the route confirmed.",
      "Use the route-note stats only to sort possible investigation, supernatural, or social checks.",
      "Track whether Epicrates behaves as a knight, NPC, route figure, or route-dependent community report in each build.",
      "Link stable findings to the Epicrates character page and related systems instead of duplicating speculation.",
    ],
    outcomes: [
      { label: "Route Lead Confirmed", description: "Epicrates has a repeatable mention, encounter, or branch worth documenting as in-game evidence." },
      { label: "Role Still Unclear", description: "The record remains a tracking page for players searching Epicrates until stronger evidence exists." },
    ],
    relatedGuideHrefs: [
      { label: "Epicrates Character Guide", href: "/characters/sovereign-tower-epicrates" },
      { label: "Best Knights Tier List", href: "/guide/sovereign-tower-best-knights-tier-list" },
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-roberto-route",
    name: "Roberto Route",
    title: "Sovereign Tower Roberto Route Guide",
    description: "A Roberto route tracker for audience scenes, recruitment uncertainty, timeline notes, and all-quests navigation without inventing exact unlock steps.",
    type: "Special",
    region: "Character Route",
    difficulty: "Unknown",
    requiredStats: { charisma: 4, wit: 3, luck: 2 },
    recommendedKnightSlugs: ["roberto", "gwendan", "angelica"],
    bestTraits: ["Timeline-sensitive", "Audience candidate", "Diplomatic", "Route knowledge"],
    steps: [
      "Record where Roberto appears, who introduces him, and whether the scene changes after rewinds or faction choices.",
      "Treat Charisma, Wit, and Luck as provisional hints for social, timeline, or audience checks.",
      "Separate confirmed Roberto interactions from route-dependent recruitment or romance assumptions.",
      "Connect every stable Roberto note to the character page and All Quests hub for easier follow-up testing.",
    ],
    outcomes: [
      { label: "Roberto Branch Found", description: "A repeatable Roberto scene or route lead is ready to document with in-game evidence." },
      { label: "Unclear Character Status", description: "Roberto remains tracked as a possible knight, NPC, audience figure, or route-dependent character." },
    ],
    relatedGuideHrefs: [
      { label: "Roberto Character Guide", href: "/characters/sovereign-tower-roberto" },
      { label: "All Quests", href: "/quests" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "Knight Affinity Guide", href: "/guide/sovereign-tower-knight-affinity" },
    ],
  },
  {
    slug: "sovereign-tower-dullahan-route",
    name: "Dullahan Route",
    title: "Sovereign Tower Dullahan Route Guide",
    description: "A secret-knight route tracker for Dullahan recruitment reports, supernatural checks, Dragon Knight overlap, meals links, and in-game documentation.",
    type: "Special",
    region: "Recruitment",
    difficulty: "High",
    requiredStats: { magic: 5, strength: 4, luck: 3 },
    recommendedKnightSlugs: ["dullahan", "brunhilda", "angelica"],
    bestTraits: ["Supernatural fit", "Secret conditions for route notes", "Battle-ready", "High Luck"],
    steps: [
      "Record every Dullahan mention, route lock, supernatural quest, and failed recruitment clue with build context.",
      "Use Magic, Strength, and Luck as sorting notes until a visible requirement confirms the real checks.",
      "Compare Dragon Knight, Dragon Heart, meals, and secret-knight pages for possible overlapping triggers.",
      "Keep recruitment steps labeled as reported or route-dependent until a repeatable unlock path is documented.",
    ],
    outcomes: [
      { label: "Secret Route Lead", description: "A Dullahan clue, scene, or assignment branch can be tracked for repeat testing." },
      { label: "Recruitment Not Documented", description: "The page should not claim exact unlock steps until in-game results confirm them." },
    ],
    relatedGuideHrefs: [
      { label: "How to Get Dullahan", href: "/guide/sovereign-tower-how-to-get-dullahan" },
      { label: "Dullahan Knight Guide", href: "/knights/dullahan" },
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
    ],
  },
  {
    slug: "sovereign-tower-rufus-route",
    name: "Rufus Route",
    title: "Sovereign Tower Rufus Route Guide",
    description: "A route-dependent Rufus tracker for player searches, possible audience scenes, quest mentions, and character-status documentation.",
    type: "Special",
    region: "Character Route",
    difficulty: "Unknown",
    requiredStats: { wit: 3, charisma: 3, luck: 3 },
    recommendedKnightSlugs: ["rufus", "gwendan", "angelica"],
    bestTraits: ["Route-sensitive", "Character status for route notes", "Diplomatic", "High Luck"],
    steps: [
      "Track each Rufus mention with the act, audience, faction state, and whether a rewind changes the scene.",
      "Use the route-note stats only for route sorting until visible quest requirements are confirmed.",
      "Avoid labeling Rufus as recruitable, romantic, or hostile unless repeatable evidence supports it.",
      "Link confirmed notes to All Quests, walkthrough pages, and any future Rufus character page.",
    ],
    outcomes: [
      { label: "Rufus Lead Logged", description: "A repeatable Rufus scene or quest reference can be tested against faction and timeline state." },
      { label: "Status Route-dependent", description: "Rufus remains a cautious tracking record until in-game evidence clarifies the role." },
    ],
    relatedGuideHrefs: [
      { label: "All Quests", href: "/quests" },
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "Factions Route", href: "/quests/sovereign-tower-factions-route" },
      { label: "Knight Loyalty", href: "/guide/sovereign-tower-knight-loyalty" },
    ],
  },
  {
    slug: "sovereign-tower-act-2-murder-investigation",
    name: "Act 2 Murder Investigation",
    title: "Sovereign Tower Act 2 Murder Investigation Walkthrough",
    description: "An Act 2 investigation route record for evidence tracking, suspect logic, knight assignment, Wit and Luck checks, and rewind testing without claiming a solved case too early.",
    type: "Walkthrough",
    region: "Act 2",
    difficulty: "Hard",
    requiredStats: { wit: 5, luck: 4, charisma: 3 },
    recommendedKnightSlugs: ["angelica", "gwendan", "dullahan", "ursula"],
    bestTraits: ["Investigation", "High Luck", "Route knowledge", "Stable loyalty"],
    steps: [
      "Record the crime scene, victim, witnesses, and first-look evidence before making an accusation.",
      "Separate evidence, rumor, motive, opportunity, and faction pressure in the route log.",
      "Test Wit, Luck, Charisma, and any supernatural route flags one variable at a time.",
      "Compare normal investigation choices against rewind or omniscient dialogue options before publishing firm advice.",
    ],
    outcomes: [
      { label: "Case Solved", description: "The accusation closes the route with enough evidence, witness logic, and route-state notes to repeat the result." },
      { label: "False Lead", description: "A suspect or explanation looked convincing but missed a clue, stat check, or rewind-only option." },
      { label: "Unexpected Outcome", description: "A hidden trait, prior route flag, or knowledge-based choice changes the investigation result." },
    ],
    relatedGuideHrefs: [
      { label: "Complete Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "Unexpected Outcomes", href: "/guide/sovereign-tower-unexpected-outcomes" },
      { label: "Omniscient Dialogue", href: "/guide/sovereign-tower-omniscient-dialogue" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-all-endings-route",
    name: "All Endings Route",
    title: "Sovereign Tower All Endings Route Guide",
    description: "A campaign-route tracking record for endings, faction locks, romance branches, Dragon Heart uncertainty, and rewind decisions without claiming a complete ending chart yet.",
    type: "Main",
    region: "Endings",
    difficulty: "Unknown",
    requiredStats: { charisma: 5, wit: 5, magic: 4, luck: 4 },
    recommendedKnightSlugs: ["angelica", "brunhilda", "dullahan", "gwendan"],
    bestTraits: ["Route knowledge", "Stable loyalty", "Problem solving", "Secret conditions for route notes"],
    steps: [
      "Create an ending ledger that records faction state, romance state, key quest outcomes, and late-route choices.",
      "Mark every ending name, unlock condition, and route lock as route-dependent until repeatable in-game evidence exists.",
      "Compare Full Campaign, Factions, Romance Angelica, Dragon Heart, and character routes before publishing firm advice.",
      "Split confirmed endings into child records only after their triggers and consequences are stable.",
    ],
    outcomes: [
      { label: "Ending Path Mapped", description: "One ending has enough route notes to be tested and documented cautiously." },
      { label: "Branch Conflict", description: "Faction, romance, recruitment, or supernatural choices may block other endings and need more testing." },
    ],
    relatedGuideHrefs: [
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "Full Campaign Route", href: "/quests/sovereign-tower-full-campaign-route" },
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
      { label: "All Quests", href: "/quests" },
    ],
  },
  {
    slug: "sovereign-tower-walkthrough-route-map",
    name: "Walkthrough Route Map",
    title: "Sovereign Tower Walkthrough Route Map",
    description: "A walkthrough-oriented route map that connects Act 0, early cycles, all quests, character routes, meals, Dragon Heart, and endings as documented pages mature.",
    type: "Main",
    region: "Walkthrough",
    difficulty: "Medium",
    requiredStats: { wit: 4, charisma: 3, luck: 3 },
    recommendedKnightSlugs: ["angelica", "gwendan", "brunhilda", "dullahan"],
    bestTraits: ["Route knowledge", "Reliable early assignment", "Stable loyalty", "Problem solving"],
    steps: [
      "Use this record as the navigation layer between Act 0, early cycles, full campaign, and all quest records.",
      "Keep route-note stat notes separate from confirmed quest UI requirements.",
      "Surface current high-interest routes first: Meals, Dragon Heart, Epicrates, Roberto, Dullahan, Rufus, and endings.",
      "Promote documented walkthrough sections into focused child pages instead of turning one page into a vague article.",
    ],
    outcomes: [
      { label: "Clear Player Path", description: "Players can move from walkthrough intent into the right quest, character, system, or ending page." },
      { label: "Needs Documentation", description: "Unconfirmed branches stay labeled as route-dependent until in-game testing fills the gaps." },
    ],
    relatedGuideHrefs: [
      { label: "Sovereign Tower Walkthrough", href: "/guide/sovereign-tower-walkthrough" },
      { label: "All Quests", href: "/quests" },
      { label: "Meals Guide", href: "/systems/sovereign-tower-meals" },
      { label: "Dragon Heart Guide", href: "/systems/sovereign-tower-dragon-heart" },
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

const ZH_LINK_LABELS: Record<string, string> = {
  "/guide/sovereign-tower-walkthrough": "完整流程攻略",
  "/guide/sovereign-tower-beginner-guide": "新手攻略",
  "/guide/sovereign-tower-quest-requirements": "任务要求攻略",
  "/guide/sovereign-tower-quest-outcomes-explained": "任务结果解析",
  "/guide/sovereign-tower-unexpected-outcomes": "意外结果攻略",
  "/guide/sovereign-tower-knight-affinity": "骑士好感攻略",
  "/guide/sovereign-tower-knight-loyalty": "骑士忠诚攻略",
  "/guide/sovereign-tower-knight-traits": "骑士特质攻略",
  "/guide/sovereign-tower-stats": "属性攻略",
  "/guide/sovereign-tower-true-ending": "True Ending 攻略",
  "/guide/sovereign-tower-best-knights-tier-list": "最佳骑士强度榜",
  "/guide/sovereign-tower-recruit-knights": "骑士招募攻略",
  "/guide/sovereign-tower-omniscient-dialogue": "全知对话攻略",
  "/quests": "全部任务",
  "/knights": "全部骑士",
  "/systems/sovereign-tower-meals": "餐食攻略",
  "/systems/sovereign-tower-dragon-heart": "Dragon Heart 攻略",
  "/quests/sovereign-tower-full-campaign-route": "完整战役路线",
};

const ZH_QUEST_TYPES: Record<string, string> = {
  Challenge: "挑战",
  Main: "主线",
  Special: "特殊",
  System: "系统",
  Walkthrough: "流程",
  Romance: "恋爱",
  Recruitment: "招募",
};

const ZH_DIFFICULTIES: Record<string, string> = {
  Easy: "简单",
  Medium: "中等",
  Hard: "困难",
  High: "高",
  Unknown: "未知",
  Early: "前期",
};

function zhTitle(value: string) {
  return value
    .replaceAll("Sovereign Tower", "君王之塔")
    .replaceAll("Knight Affinity", "骑士好感")
    .replaceAll("Knight Loyalty", "骑士忠诚")
    .replaceAll("Knight Traits", "骑士特质")
    .replaceAll("Quest Requirements", "任务要求")
    .replaceAll("Quest Outcomes Explained", "任务结果解析")
    .replaceAll("Unexpected Outcomes", "意外结果")
    .replaceAll("Complete Walkthrough", "完整流程")
    .replaceAll("Walkthrough Route Map", "流程路线图")
    .replaceAll("Walkthrough", "流程攻略")
    .replaceAll("Beginner Guide", "新手攻略")
    .replaceAll("Guide", "攻略")
    .replaceAll("Knight Profile", "骑士档案")
    .replaceAll("Knight", "骑士")
    .replaceAll("All Quests", "全部任务")
    .replaceAll("All Endings", "全结局")
    .replaceAll("Full Campaign", "完整战役")
    .replaceAll("Route", "路线")
    .replaceAll("Questline", "任务线")
    .replaceAll("Stats", "属性")
    .replaceAll("How to Get", "如何招募")
    .replaceAll("How to Beat", "如何击败");
}

function zhPhrase(value: string) {
  return zhTitle(value)
    .replaceAll("Reliable early assignment", "可靠的前期派遣")
    .replaceAll("Stable loyalty", "稳定忠诚")
    .replaceAll("Route knowledge", "路线知识")
    .replaceAll("Problem solving", "问题解决")
    .replaceAll("High Luck", "高幸运")
    .replaceAll("Investigation", "调查")
    .replaceAll("Combat pressure", "战斗压力")
    .replaceAll("Public reputation", "公众声望")
    .replaceAll("Secret conditions for route notes", "路线备注中的秘密条件")
    .replaceAll("Success", "成功")
    .replaceAll("Failure", "失败")
    .replaceAll("Unexpected Outcome", "意外结果")
    .replaceAll("Case Solved", "案件解决")
    .replaceAll("False Lead", "错误线索")
    .replaceAll("Clear Player Path", "清晰玩家路线")
    .replaceAll("Needs Documentation", "需要补充记录");
}

function localizeRelatedGuideHrefsForZh(
  links: Array<{ label: string; href: string }>,
) {
  return links.map((link) => ({
    ...link,
    label: ZH_LINK_LABELS[link.href] ?? zhTitle(link.label),
  }));
}

function localizeQuestForZh(quest: QuestRecord): QuestRecord {
  const type = ZH_QUEST_TYPES[quest.type] ?? zhTitle(quest.type);
  const region = quest.region ? zhTitle(quest.region) : quest.region;
  return {
    ...quest,
    name: zhTitle(quest.name),
    title: zhTitle(quest.title),
    description: `君王之塔 ${zhTitle(quest.name)} 任务数据库，整理${type}任务的地区、难度、所需属性、推荐骑士、关键步骤、可能结果和相关攻略。`,
    type,
    region,
    difficulty: ZH_DIFFICULTIES[quest.difficulty] ?? zhTitle(quest.difficulty),
    bestTraits: quest.bestTraits.map(zhPhrase),
    steps: quest.steps.map(zhPhrase),
    outcomes: quest.outcomes.map((outcome) => ({
      label: zhPhrase(outcome.label),
      description: zhPhrase(outcome.description),
    })),
    relatedGuideHrefs: localizeRelatedGuideHrefsForZh(quest.relatedGuideHrefs),
  };
}

function localizeKnightForZh(knight: KnightRecord): KnightRecord {
  return {
    ...knight,
    name: zhTitle(knight.name),
    title: zhTitle(knight.title),
    description: `君王之塔 ${zhTitle(knight.name)} 骑士资料，整理定位、属性、特质、隐藏偏好、招募方式、最佳任务派遣和相关攻略。`,
    role: zhTitle(knight.role),
    traits: knight.traits.map(zhPhrase),
    hiddenTraits: knight.hiddenTraits.map(zhPhrase),
    preferences: knight.preferences.map(zhPhrase),
    recruitment: zhPhrase(knight.recruitment),
    notes: knight.notes.map(zhPhrase),
    relatedGuideHrefs: localizeRelatedGuideHrefsForZh(knight.relatedGuideHrefs),
  };
}

function localizeQuest(quest: QuestRecord, locale: string): QuestRecord {
  if (locale === "zh-cn") return localizeQuestForZh(quest);
  if (!isDatabaseLocale(locale)) return quest;
  const baseOverlay = LOCALIZED_QUEST_OVERLAYS[locale][quest.slug];
  const supplementalOverlay = SUPPLEMENTAL_QUEST_OVERLAYS[locale][quest.slug];
  if (!baseOverlay && !supplementalOverlay) return quest;
  return { ...quest, ...baseOverlay, ...supplementalOverlay };
}

function localizeKnight(knight: KnightRecord, locale: string): KnightRecord {
  if (locale === "zh-cn") return localizeKnightForZh(knight);
  if (!isDatabaseLocale(locale)) return knight;
  const baseOverlay = LOCALIZED_KNIGHT_OVERLAYS[locale][knight.slug];
  const supplementalOverlay = SUPPLEMENTAL_KNIGHT_OVERLAYS[locale][knight.slug];
  if (!baseOverlay && !supplementalOverlay) return knight;
  const localized = { ...knight, ...baseOverlay, ...supplementalOverlay };
  if (knight.slug === "brunhilda") {
    return {
      ...localized,
      title:
        locale === "it"
          ? "Profilo Cavaliere Brunhilda - Sovereign Tower"
          : locale === "ko"
            ? "Sovereign Tower Brunhilda Knight Profile"
            : localized.title,
    };
  }
  if (knight.slug === "lady-of-the-tower") {
    return {
      ...localized,
      title:
        locale === "it"
          ? "Profilo Lady of the Tower - Sovereign Tower"
          : locale === "ko"
            ? "Sovereign Tower Lady of the Tower Knight Profile"
            : localized.title,
    };
  }
  return localized;
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
