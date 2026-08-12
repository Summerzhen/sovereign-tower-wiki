import type { KnightRecord, QuestRecord } from "./sovereignTower";

export type DatabaseLocale = "it" | "ko";

type QuestOverlay = Partial<
  Pick<
    QuestRecord,
    | "name"
    | "title"
    | "description"
    | "type"
    | "region"
    | "difficulty"
    | "bestTraits"
    | "steps"
    | "outcomes"
  >
>;

type KnightOverlay = Partial<
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
  >
>;

export const LOCALIZED_QUEST_OVERLAYS: Record<DatabaseLocale, Record<string, QuestOverlay>> = {
  it: {
    "sovereign-tower-dragon-knight": {
      name: "Cavaliere Drago",
      title: "Come battere il Cavaliere Drago in Sovereign Tower",
      description: "Una missione sfida importante per pianificare statistiche, scelta del cavaliere, rischio danni e risultati.",
      type: "Sfida",
      difficulty: "Alta",
      bestTraits: ["Specialista fisico", "Resistenza", "Vantaggio sovrannaturale"],
      steps: [
        "Controlla i requisiti visibili del Cavaliere Drago prima di chiudere il ciclo.",
        "Dai priorita a Forza e sopravvivenza, poi rileggi gli indizi su Magia o Agilita.",
        "Scegli il cavaliere che supera il requisito, anche se la preferenza della missione non e perfetta.",
      ],
      outcomes: [
        { label: "Successo", description: "La sfida viene superata e il cavaliere assegnato dovrebbe ottenere progressi o ricompense." },
        { label: "Fallimento", description: "Un cavaliere inadatto puo subire danni, perdere affinita o bloccare la rotta desiderata." },
        { label: "Risultato inatteso", description: "Tratti nascosti o prove sovrannaturali possono cambiare l'esito; annota il trigger." },
      ],
    },
    "sovereign-tower-groveshire": {
      name: "Groveshire",
      title: "Soluzione di Groveshire in Sovereign Tower",
      description: "Un hub regionale dell'Atto 1 per missioni principali, prime scelte di cavalieri, soglie statistiche e note di rotta.",
      type: "Regione",
      difficulty: "Iniziale",
      bestTraits: ["Presenza sociale", "Adattabilita", "Indizi di reclutamento"],
      steps: [
        "Usa Groveshire per capire come le missioni regionali si collegano al reclutamento e ai rami della storia.",
        "Tieni disponibile un cavaliere sociale e uno flessibile nelle statistiche.",
        "Separa le singole missioni di Groveshire in record figli quando i requisiti saranno verificati.",
      ],
      outcomes: [
        { label: "Progresso storia", description: "Le rotte di Groveshire dovrebbero alimentare l'avanzamento dell'Atto 1 e le udienze successive." },
        { label: "Indizio reclutamento", description: "Traccia ogni sblocco di cavaliere o servitore che emerge da quest'area." },
      ],
    },
    "sovereign-tower-gavault": {
      name: "Gavault",
      title: "Soluzione di Gavault in Sovereign Tower",
      description: "Un hub di rotta dell'Atto 1 per missioni di Gavault, requisiti, scelte di percorso e registro degli esiti.",
      type: "Regione",
      difficulty: "Iniziale",
      bestTraits: ["Minacce mistiche", "Gestione del rischio", "Memoria del ciclo"],
      steps: [
        "Tratta Gavault come pagina madre finche le missioni individuali non avranno dettagli verificati.",
        "Registra requisiti visibili, testo della missione e conseguenze di rotta in ogni ciclo.",
        "Collega ogni missione confermata di Gavault a questo hub e alle pagine cavaliere rilevanti.",
      ],
      outcomes: [
        { label: "Ramo di rotta", description: "Le scelte di Gavault possono influenzare disponibilita future o contesto della rotta." },
        { label: "Conoscenza ottenuta", description: "I tentativi falliti dovrebbero produrre conoscenza su statistiche e tratti per pianificare il rewind." },
      ],
    },
    "sovereign-tower-goose-quest": {
      name: "Missione dell'Oca",
      title: "Guida alla Missione dell'Oca in Sovereign Tower",
      description: "Una missione insolita per tratti legati agli animali, risultati particolari e test di assegnazione iniziali.",
      type: "Speciale",
      difficulty: "Iniziale",
      bestTraits: ["Amante degli animali", "Soluzione gentile", "Agilita"],
      steps: [
        "Leggi il testo della missione per indizi su animali, diplomazia o velocita.",
        "Prova tratti favorevoli agli animali prima di presumere che serva un cavaliere da combattimento.",
        "Annota se il risultato cambia affinita, morale o ricompense future.",
      ],
      outcomes: [
        { label: "Risultato migliore possibile", description: "I tratti legati agli animali possono migliorare o modificare l'esito." },
        { label: "Nota affinita", description: "Un incarico poco gradito puo funzionare se statistiche e tratti sono adatti." },
      ],
    },
    "sovereign-tower-beast-hunt": {
      name: "Caccia alla Bestia",
      title: "Guida alla missione Caccia alla Bestia in Sovereign Tower",
      description: "Un incarico di caccia pericoloso per testare combattimento, sopravvivenza e tratti; i numeri restano provvisori finche non saranno verificati.",
      type: "Sfida",
      difficulty: "Media",
      bestTraits: ["Caccia", "Forza", "Sopravvivenza"],
      steps: [
        "Controlla il rischio di danni e la soglia fisica prima di assegnare un cavaliere ferito.",
        "Confronta combattimento, sopravvivenza e tratti legati a bestie o animali.",
        "Rigioca i fallimenti per distinguere requisito statistico e interazione dei tratti.",
      ],
      outcomes: [
        { label: "Caccia pulita", description: "Un cavaliere adatto elimina la minaccia con basso rischio di ferite; verifica il controllo esatto." },
        { label: "Rischio ferita", description: "Una scelta scarsa in combattimento o sopravvivenza puo causare danni o pressione sul roster." },
        { label: "Interazione tratto", description: "Tratti animali, sovrannaturali o di caccia possono cambiare l'esito e vanno testati." },
      ],
    },
    "sovereign-tower-rebellion": {
      name: "Ribellione",
      title: "Guida alla missione Ribellione in Sovereign Tower",
      description: "Una missione politica o di combattimento ad alto rischio in cui lealta, statistiche e conseguenze di rotta vanno tracciate con cautela.",
      type: "Principale",
      difficulty: "Alta",
      bestTraits: ["Lealta", "Presenza sociale", "Controllo della pressione"],
      steps: [
        "Segna quali fazioni, cavalieri o scelte di pubblico spingono verso la ribellione.",
        "Usa Carisma, Forza e Intelletto come controlli provvisori finche non arrivano requisiti confermati.",
        "Registra se il ramo cambia dialoghi, accesso alle missioni, roster o reputazione del sovrano.",
      ],
      outcomes: [
        { label: "Ordine ristabilito", description: "L'assegnazione risolve la ribellione senza danni evidenti alla rotta; verifica statistiche e lealta." },
        { label: "Ramo negoziato", description: "Scelte sociali o di corte possono deviare il conflitto invece di risolverlo con la forza." },
        { label: "Conseguenza di rotta", description: "Fallimento, slealta o tratti rischiosi possono cambiare opzioni future." },
      ],
    },
    "sovereign-tower-hammer-lost-yet-again": {
      name: "Martello perso, ancora una volta",
      title: "Guida a Martello perso, ancora una volta in Sovereign Tower",
      description: "Una missione iniziale legata al fabbro per capire recupero, valore dei servitori e ricompense successive.",
      type: "Contratto",
      difficulty: "Iniziale",
      bestTraits: ["Ricerca", "Agilita", "Supporto pratico"],
      steps: [
        "Usa questa missione iniziale per capire come funzionano i requisiti di recupero.",
        "Controlla il rischio di danni prima di assegnare un cavaliere indebolito.",
        "Annota se il fabbro, l'equipaggiamento o i servitori aprono follow-up.",
      ],
      outcomes: [
        { label: "Successo", description: "Utile per esperienza, oro e rapporto iniziale con il fabbro." },
        { label: "Follow-up", description: "Puo collegarsi a pagine future su forgia, reliquie o equipaggiamento." },
      ],
    },
    "sovereign-tower-demo-walkthrough": {
      name: "Soluzione della demo",
      title: "Soluzione della demo di Sovereign Tower",
      description: "Un hub leggero sugli spoiler per pianificare il primo ciclo, assegnare cavalieri e registrare decisioni tutorial.",
      type: "Principale",
      difficulty: "Iniziale",
    },
    "sovereign-tower-act-0-walkthrough": {
      name: "Soluzione Atto 0",
      title: "Soluzione dell'Atto 0 di Sovereign Tower",
      description: "Un record dell'atto iniziale per mappare prime udienze, indizi di reclutamento, fallimenti tutorial e lezioni di rewind.",
      type: "Principale",
      difficulty: "Iniziale",
    },
    "sovereign-tower-early-cycles-route": {
      name: "Rotta dei primi cicli",
      title: "Guida alla rotta dei primi cicli in Sovereign Tower",
      description: "Una rotta riutilizzabile per decidere quali missioni esplorare, quali fallimenti conservare e quando assegnare un cavaliere.",
      type: "Speciale",
      difficulty: "Iniziale",
    },
    "sovereign-tower-full-campaign-route": {
      name: "Rotta campagna completa",
      title: "Guida alla campagna completa di Sovereign Tower",
      description: "Un indice di rotta per collegare Atto 0, regioni dell'Atto 1, fazioni, romance e controlli avanzati.",
      type: "Principale",
      difficulty: "Sconosciuta",
    },
    "sovereign-tower-get-brunhilda-route": {
      name: "Rotta per ottenere Brunhilda",
      title: "Come ottenere Brunhilda in Sovereign Tower",
      description: "Un record di reclutamento che raccoglie probabili trigger di combattimento, gloria e udienze, mantenendo non verificati gli sblocchi esatti.",
      type: "Speciale",
      difficulty: "Media",
      bestTraits: ["Pressione di combattimento", "Gloria", "Reputazione pubblica"],
    },
  },
  ko: {
    "sovereign-tower-dragon-knight": {
      name: "드래곤 나이트",
      title: "Sovereign Tower 드래곤 나이트 공략",
      description: "능력치 계획, 기사 선택, 피해 위험, 결과 기록이 중요한 대표 도전 퀘스트입니다.",
      type: "도전",
      difficulty: "높음",
      bestTraits: ["물리 특화", "생존력", "초자연 대응"],
      steps: [
        "사이클을 끝내기 전에 드래곤 나이트의 표시 요구치를 확인합니다.",
        "먼저 힘과 생존력을 우선하고, 퀘스트 문구의 마법 또는 민첩 단서를 다시 봅니다.",
        "선호도가 완벽하지 않아도 요구치를 통과할 수 있는 기사를 고릅니다.",
      ],
      outcomes: [
        { label: "성공", description: "도전을 클리어하고 배정된 기사가 성장이나 보상을 얻을 가능성이 있습니다." },
        { label: "실패", description: "맞지 않는 기사는 피해를 입거나 친밀도를 잃거나 원하는 루트를 막을 수 있습니다." },
        { label: "예상 밖 결과", description: "숨겨진 특성이나 초자연 판정이 결과를 바꿀 수 있으니 조건을 기록합니다." },
      ],
    },
    "sovereign-tower-groveshire": {
      name: "그로브셔",
      title: "Sovereign Tower 그로브셔 공략",
      description: "1막 지역 허브로, 주요 퀘스트와 초반 기사 선택, 능력치 관문, 루트 메모를 정리합니다.",
      type: "지역",
      difficulty: "초반",
      bestTraits: ["사회성", "유연성", "영입 단서"],
      steps: [
        "그로브셔를 통해 지역 퀘스트가 기사 영입과 이야기 분기에 연결되는 방식을 익힙니다.",
        "사회형 기사 한 명과 능력치가 유연한 기사 한 명을 남겨 둡니다.",
        "요구치가 확인되면 개별 그로브셔 퀘스트를 하위 기록으로 분리합니다.",
      ],
      outcomes: [
        { label: "스토리 진행", description: "그로브셔 루트는 1막 진행과 이후 알현으로 이어져야 합니다." },
        { label: "영입 단서", description: "이 지역에서 나오는 기사나 하인 해금을 추적합니다." },
      ],
    },
    "sovereign-tower-gavault": {
      name: "가볼트",
      title: "Sovereign Tower 가볼트 공략",
      description: "가볼트 퀘스트, 요구치, 루트 선택, 결과 기록을 모으는 1막 루트 허브입니다.",
      type: "지역",
      difficulty: "초반",
      bestTraits: ["신비 위협 대응", "위험 관리", "사이클 기록"],
      steps: [
        "개별 퀘스트 정보가 충분히 검증될 때까지 가볼트를 상위 페이지로 다룹니다.",
        "각 사이클에서 표시 요구치, 퀘스트 문구, 루트 결과를 기록합니다.",
        "확인된 가볼트 퀘스트는 이 허브와 관련 기사 페이지에 연결합니다.",
      ],
      outcomes: [
        { label: "루트 분기", description: "가볼트 선택은 이후 퀘스트 가능 여부나 루트 맥락에 영향을 줄 수 있습니다." },
        { label: "지식 획득", description: "실패한 시도는 되감기 계획에 필요한 능력치와 특성 정보를 남겨야 합니다." },
      ],
    },
    "sovereign-tower-goose-quest": {
      name: "거위 퀘스트",
      title: "Sovereign Tower 거위 퀘스트 공략",
      description: "동물 관련 특성, 특이한 결과, 초반 배정 테스트를 다루는 이름 있는 변칙 퀘스트입니다.",
      type: "특수",
      difficulty: "초반",
      bestTraits: ["동물 애호", "온건한 해결", "민첩"],
      steps: [
        "퀘스트 문구에서 동물, 외교, 속도 단서를 확인합니다.",
        "전투형 기사가 최선이라고 단정하기 전에 동물 친화 특성을 시험합니다.",
        "결과가 친밀도, 사기, 이후 보상에 영향을 주는지 기록합니다.",
      ],
      outcomes: [
        { label: "더 나은 결과 후보", description: "동물 관련 특성이 결과를 개선하거나 바꿀 수 있습니다." },
        { label: "친밀도 메모", description: "싫어하는 임무라도 능력치와 특성이 맞으면 받아들일 만할 수 있습니다." },
      ],
    },
    "sovereign-tower-beast-hunt": {
      name: "야수 사냥",
      title: "Sovereign Tower 야수 사냥 퀘스트 공략",
      description: "전투, 생존, 특성을 시험하는 위험한 사냥 임무입니다. 수치는 검증 전까지 임시 기준으로 둡니다.",
      type: "도전",
      difficulty: "중간",
      bestTraits: ["사냥", "힘", "생존"],
      steps: [
        "부상당한 기사를 보내기 전에 피해 위험과 물리 요구치를 확인합니다.",
        "전투 적합도, 생존력, 동물 또는 야수 관련 특성을 비교합니다.",
        "실패를 다시 플레이해 능력치 요구와 특성 상호작용을 구분합니다.",
      ],
      outcomes: [
        { label: "깔끔한 사냥", description: "맞는 기사는 낮은 부상 위험으로 위협을 제거합니다. 정확한 판정은 확인이 필요합니다." },
        { label: "부상 위험", description: "전투나 생존 배정이 나쁘면 피해, roster 압박, 실패 결과가 생길 수 있습니다." },
        { label: "특성 상호작용", description: "동물, 초자연, 사냥 관련 특성이 결과를 바꿀 수 있으므로 반복 검증합니다." },
      ],
    },
    "sovereign-tower-rebellion": {
      name: "반란",
      title: "Sovereign Tower 반란 퀘스트 공략",
      description: "충성도, 능력치 적합도, 분기 결과를 조심스럽게 추적해야 하는 고위험 정치 또는 전투 퀘스트입니다.",
      type: "메인",
      difficulty: "높음",
      bestTraits: ["충성", "사회적 존재감", "압박 관리"],
      steps: [
        "어떤 파벌, 기사, 알현 선택이 반란 압력으로 이어지는지 기록합니다.",
        "확정 요구치가 생기기 전까지 매력, 힘, 재치를 임시 확인 항목으로 둡니다.",
        "분기가 이후 대화, 퀘스트 접근, roster, 통치자 평판을 바꾸는지 기록합니다.",
      ],
      outcomes: [
        { label: "질서 회복", description: "명확한 루트 손상 없이 반란을 해결합니다. 능력치와 충성 판정은 확인해야 합니다." },
        { label: "협상 분기", description: "사회형 또는 궁정 선택이 무력 해결 대신 갈등을 우회할 수 있습니다." },
        { label: "루트 결과", description: "실패, 낮은 충성도, 위험 특성은 이후 선택지를 바꿀 수 있습니다." },
      ],
    },
    "sovereign-tower-hammer-lost-yet-again": {
      name: "또 잃어버린 망치",
      title: "Sovereign Tower 또 잃어버린 망치 퀘스트 공략",
      description: "회수 요구치, 하인의 가치, 후속 알현 보상을 배우는 초반 대장장이 관련 퀘스트입니다.",
      type: "계약",
      difficulty: "초반",
      bestTraits: ["수색", "민첩", "실무 지원"],
      steps: [
        "이 초반 퀘스트로 회수 요구치가 작동하는 방식을 익힙니다.",
        "약해진 기사를 배정하기 전에 피해 위험을 확인합니다.",
        "대장장이, 장비, 하인이 후속 이벤트를 여는지 기록합니다.",
      ],
      outcomes: [
        { label: "성공", description: "초반 경험치, 골드, 대장장이 관계 진전에 유용합니다." },
        { label: "후속", description: "이후 대장간, 유물, 장비 데이터베이스와 연결될 수 있습니다." },
      ],
    },
    "sovereign-tower-demo-walkthrough": {
      name: "데모 공략",
      title: "Sovereign Tower 데모 공략",
      description: "첫 사이클 계획, 기사 배정 기본, 이후 데이터로 이어지는 튜토리얼 결정을 추적하는 가벼운 허브입니다.",
      type: "메인",
      difficulty: "초반",
    },
    "sovereign-tower-act-0-walkthrough": {
      name: "0막 공략",
      title: "Sovereign Tower 0막 공략",
      description: "첫 알현, 초반 영입 단서, 튜토리얼 실패, 재사용 가능한 되감기 교훈을 매핑하는 시작 구간 기록입니다.",
      type: "메인",
      difficulty: "초반",
    },
    "sovereign-tower-early-cycles-route": {
      name: "초반 사이클 루트",
      title: "Sovereign Tower 초반 사이클 루트 가이드",
      description: "어떤 퀘스트를 정찰하고 어떤 실패를 지식으로 남기며 언제 기사를 투입할지 정하는 반복 루트입니다.",
      type: "특수",
      difficulty: "초반",
    },
    "sovereign-tower-full-campaign-route": {
      name: "전체 캠페인 루트",
      title: "Sovereign Tower 전체 캠페인 루트 가이드",
      description: "0막, 1막 지역, 파벌 압력, 로맨스 플래그, 후반 판정을 연결하는 캠페인 전체 루트 색인입니다.",
      type: "메인",
      difficulty: "미확인",
    },
    "sovereign-tower-get-brunhilda-route": {
      name: "브룬힐다 영입 루트",
      title: "Sovereign Tower 브룬힐다 얻는 법",
      description: "전투, 명예, 알현 trigger 후보를 모으되 정확한 해금 조건은 검증 전으로 표시하는 영입 루트 기록입니다.",
      type: "특수",
      difficulty: "중간",
      bestTraits: ["전투 압박", "명예", "공개 평판"],
    },
  },
};

export const LOCALIZED_KNIGHT_OVERLAYS: Record<DatabaseLocale, Record<string, KnightOverlay>> = {
  it: {
    angelica: {
      name: "Lady Angelica di Clovermont",
      title: "Guida al cavaliere Angelica in Sovereign Tower",
      description: "Angelica e il primo cavaliere con cui molti giocatori imparano abbinamento statistiche, tratti nascosti, affinita e incarichi iniziali.",
      role: "Cavaliere iniziale",
      traits: ["Gentile", "Ottimista", "Candidata favorevole agli animali"],
      hiddenTraits: ["Amante degli animali"],
      preferences: ["Compiti sociali", "Soluzioni gentili", "Incarichi che evitano crudelta"],
      recruitment: "Compare come cavaliere iniziale e introduce le basi dell'assegnazione alla Tavola Rotonda.",
      notes: [
        "Agilita e Fortuna alte la rendono un buon test iniziale per missioni insolite.",
        "Il suo Intelletto basso richiede cautela nelle missioni investigative o con enigmi.",
        "Usa la scoperta del suo tratto nascosto come modello per future pagine cavaliere.",
      ],
    },
    brunhilda: {
      name: "Brunhilda",
      title: "Come ottenere Brunhilda in Sovereign Tower",
      description: "Il profilo di Brunhilda copre statistiche, tratti, migliori missioni e note database; usa la guida reclutamento per condizioni di rotta.",
      role: "Cavaliere reclutabile",
      traits: ["Diretta", "Pronta al combattimento", "Adatta a incarichi ad alta pressione"],
      hiddenTraits: ["Dettagli dipendenti dalla rotta da verificare"],
      preferences: ["Pressione di combattimento", "Missioni orientate alla gloria"],
      recruitment: "Aggiorna questo campo con dettagli confermati su udienze, rotta o trigger di missione quando i report saranno verificati.",
      notes: [
        "Questa pagina nasce come landing page per l'intento di ricerca e diventa profilo database man mano che crescono i dati confermati.",
        "Non esagerare requisiti di rotta non verificati; marca chiaramente le incognite.",
      ],
    },
    dullahan: {
      name: "Dullahan",
      title: "Come ottenere Dullahan in Sovereign Tower",
      description: "Dullahan e una pagina orientata ai cavalieri segreti per reclutamento, condizioni di rotta, tratti e migliori assegnazioni.",
      role: "Cavaliere segreto",
      traits: ["Recluta insolita", "Adatta al sovrannaturale", "Sensibile alla rotta"],
      hiddenTraits: ["Condizioni segrete da verificare"],
      preferences: ["Minacce mistiche", "Incarichi pericolosi"],
      recruitment: "Traccia qui trigger di rotta, scelte di udienza o rami di missione confermati.",
    },
    gwendan: {
      name: "Sir Gwendan di Vidor",
      title: "Guida al cavaliere Gwendan in Sovereign Tower",
      description: "Gwendan e utile per esempi ad alto Carisma, missioni di corte e tracciamento delle vulnerabilita nascoste.",
      role: "Cavaliere reclutabile",
      traits: ["Appariscente", "Orgoglioso", "Orientato alla corte"],
      hiddenTraits: ["Paura del buio"],
      preferences: ["Gloria", "Riconoscimento pubblico", "Pressione sociale"],
      recruitment: "Compare tramite il ciclo iniziale di udienze e reclutamento; aggiorna con note esatte quando saranno verificate.",
    },
    gideon: {
      name: "Gideon",
      title: "Guida al personaggio Gideon in Sovereign Tower",
      description: "Gideon e una voce ad alto interesse per capire se sia cavaliere, consigliere, rivale o recluta dipendente dalla rotta.",
      role: "Cavaliere di rotta",
      traits: ["Sensibile alla rotta", "Vicino alla leadership", "Ruolo non confermato"],
      hiddenTraits: ["Trigger specifici del personaggio da verificare"],
      preferences: ["Pressione politica", "Rami della storia", "Incarichi con posta narrativa chiara"],
      recruitment: "Tratta il percorso di sblocco di Gideon come non verificato finche testo ufficiale, screenshot o report ripetibili non confermano il ruolo.",
    },
    rufus: {
      name: "Rufus di Groveshire",
      title: "Guida al cavaliere Rufus in Sovereign Tower",
      description: "Rufus di Groveshire e un candidato ruvido e leale, adatto a incarichi di prima linea e caccia.",
      role: "Cavaliere reclutabile",
      traits: ["Molto leale", "Selvatico", "Candidato alla forza ravvicinata"],
      hiddenTraits: ["Contesto ultimo della sua stirpe da verificare"],
      preferences: ["Lavori nella foresta", "Cacce", "Incarichi che premiano la lealta piu della raffinatezza"],
      recruitment: "Compare nella copertura dei personaggi come scelta cavaliere di Groveshire; verifica le regole Rufus contro Silgur in gioco.",
    },
    ursula: {
      name: "Ursula",
      title: "Guida al cavaliere Ursula in Sovereign Tower",
      description: "Ursula e un profilo di cavaliere specialista, soprattutto perche la copertura esistente avverte contro incarichi di Carisma.",
      role: "Cavaliere reclutabile",
      traits: ["Caso di avviso su basso Carisma", "Specialista", "Risolutrice diretta"],
      hiddenTraits: ["Forze esatte e legami di rotta da verificare"],
      preferences: ["Lavori non diplomatici", "Pressione di combattimento o magia", "Obiettivi chiari"],
      recruitment: "Conferma se Ursula e una recluta standard, membro iniziale o cavaliere specifico di rotta prima di pubblicare passaggi esatti.",
    },
    "wolf-knight": {
      name: "Cavaliere Lupo",
      title: "Guida al Cavaliere Lupo in Sovereign Tower",
      description: "Cavaliere Lupo e un profilo ad alto intento per statistiche provvisorie, abbinamenti di combattimento e futura verifica del roster.",
      role: "Cavaliere segreto",
      traits: ["Adatto alla caccia", "Specialista fisico", "Conferma roster in sospeso"],
      hiddenTraits: ["Condizioni di branco, bestia o reclutamento segreto da verificare"],
      preferences: ["Cacce ai mostri", "Ricognizione", "Controlli di Forza e Agilita"],
      recruitment: "Verifica se Cavaliere Lupo e una recluta nominata, un archetipo o una scorciatoia usata dai giocatori.",
    },
  },
  ko: {
    angelica: {
      name: "클로버몬트의 레이디 안젤리카",
      title: "Sovereign Tower 안젤리카 기사 가이드",
      description: "안젤리카는 많은 플레이어가 능력치 매칭, 숨겨진 특성, 친밀도, 초반 퀘스트 배정을 배우는 첫 기사입니다.",
      role: "초기 기사",
      traits: ["상냥함", "낙천적", "동물 친화 후보"],
      hiddenTraits: ["동물 애호가"],
      preferences: ["사회적 임무", "온건한 해결", "잔혹함을 피하는 배정"],
      recruitment: "초반 기사로 등장하며 원탁 배정의 기본을 소개합니다.",
      notes: [
        "높은 민첩과 행운 덕분에 초반 특이 퀘스트의 좋은 시험 사례입니다.",
        "재치가 낮아 조사나 퍼즐 중심 퀘스트는 신중히 확인해야 합니다.",
        "숨겨진 특성 발견 과정을 이후 기사 페이지의 모델로 삼습니다.",
      ],
    },
    brunhilda: {
      name: "브룬힐다",
      title: "Sovereign Tower 브룬힐다 얻는 법",
      description: "브룬힐다 프로필은 능력치, 특성, 최적 퀘스트, 데이터베이스 메모를 다룹니다. 영입 조건은 별도 가이드를 참고합니다.",
      role: "영입 가능 기사",
      traits: ["직설적", "전투 준비 완료", "고압 임무 후보"],
      hiddenTraits: ["검증할 루트 의존 세부사항"],
      preferences: ["전투 압박", "명예 중심 퀘스트"],
      recruitment: "알현, 루트, 퀘스트 trigger 세부사항이 검증되면 이 항목을 갱신합니다.",
      notes: [
        "이 페이지는 먼저 검색 의도 랜딩 페이지로 존재하고, 확인 데이터가 늘면 데이터베이스 프로필이 됩니다.",
        "검증되지 않은 루트 요구치를 과장하지 말고 알 수 없는 부분을 명확히 표시합니다.",
      ],
    },
    dullahan: {
      name: "듀라한",
      title: "Sovereign Tower 듀라한 얻는 법",
      description: "듀라한은 비밀 기사 의도 페이지로, 영입, 루트 조건, 특성, 최적 퀘스트 배정을 추적합니다.",
      role: "비밀 기사",
      traits: ["특이한 영입", "초자연 적합", "루트 민감"],
      hiddenTraits: ["검증할 비밀 조건"],
      preferences: ["신비한 위협", "위험한 임무"],
      recruitment: "확인된 루트 trigger, 알현 선택, 퀘스트 분기를 이곳에 모아 기록합니다.",
    },
    gwendan: {
      name: "비도르의 경 그웬단",
      title: "Sovereign Tower 그웬단 기사 가이드",
      description: "그웬단은 높은 매력 배정 예시, 궁정 관련 퀘스트, 숨겨진 약점 추적에 유용합니다.",
      role: "영입 가능 기사",
      traits: ["화려함", "자존심 강함", "궁정 지향"],
      hiddenTraits: ["어둠 공포"],
      preferences: ["영광", "공개 인정", "사회적 압박"],
      recruitment: "초반 알현과 영입 루프를 통해 등장합니다. 검증되면 정확한 사이클 메모로 갱신합니다.",
    },
    gideon: {
      name: "기디언",
      title: "Sovereign Tower 기디언 캐릭터 가이드",
      description: "기디언은 기사, 조언자, 경쟁자, 루트 의존 영입인지 확인하기 위한 고검색 캐릭터 항목입니다.",
      role: "루트 기사",
      traits: ["루트 민감", "리더십 인접", "역할 미확인"],
      hiddenTraits: ["검증할 캐릭터별 trigger"],
      preferences: ["정치 압박", "스토리 분기", "서사적 이해관계가 분명한 임무"],
      recruitment: "공식 프로필, 게임 내 영입 화면, 반복 가능한 보고가 확인되기 전까지 기디언의 해금 경로는 미확인으로 둡니다.",
    },
    rufus: {
      name: "그로브셔의 루퍼스",
      title: "Sovereign Tower 루퍼스 기사 가이드",
      description: "그로브셔의 루퍼스는 거칠고 충직한 야생형 영입 후보로, 전열과 사냥 임무 의도가 강합니다.",
      role: "영입 가능 기사",
      traits: ["강한 충성심", "야성적", "근접 힘 후보"],
      hiddenTraits: ["검증할 마지막 생존자 맥락"],
      preferences: ["숲 작업", "사냥", "세련됨보다 충성심을 중시하는 임무"],
      recruitment: "기존 캐릭터 커버리지에서는 그로브셔 기사 선택지로 보입니다. 루퍼스와 실구르 선택 규칙은 게임에서 확인합니다.",
    },
    ursula: {
      name: "우르술라",
      title: "Sovereign Tower 우르술라 기사 가이드",
      description: "우르술라는 특화 배정 후보로 다루기 좋은 기사 프로필이며, 특히 매력 임무를 피하라는 경고가 중요합니다.",
      role: "영입 가능 기사",
      traits: ["낮은 매력 경고 사례", "전문화", "직접 해결형"],
      hiddenTraits: ["검증할 정확한 강점과 루트 연결"],
      preferences: ["비외교 임무", "전투 또는 마법 압박", "명확한 목표"],
      recruitment: "정확한 해금 단계를 게시하기 전에 우르술라가 표준 영입, 초기 멤버, 루트 전용 기사인지 확인합니다.",
    },
    "wolf-knight": {
      name: "울프 나이트",
      title: "Sovereign Tower 울프 나이트 가이드",
      description: "울프 나이트는 임시 능력치, 전투 퀘스트 매칭, 전체 roster 검증을 위한 고의도 야수 기사 프로필입니다.",
      role: "비밀 기사",
      traits: ["사냥 적합", "물리 특화", "roster 확인 보류"],
      hiddenTraits: ["검증할 무리, 야수, 비밀 영입 조건"],
      preferences: ["괴물 사냥", "정찰", "힘과 민첩 판정"],
      recruitment: "울프 나이트가 이름 있는 영입, 원형, 또는 플레이어 표현인지 확인한 뒤 정확한 해금 요구치를 추가합니다.",
    },
  },
};
