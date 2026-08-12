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
    "sovereign-tower-cooking-questline": {
      name: "Questline cucina",
      title: "Guida alla questline cucina in Sovereign Tower",
      description: "Record collegato alla guida Meals per pasti, supporto dei servitori, morale e possibili effetti sull'affinita.",
      type: "Sistema",
      region: "Sistemi della torre",
      difficulty: "Iniziale",
      bestTraits: ["Gentile", "Diplomatico", "Assegnazione iniziale affidabile"],
      steps: [
        "Registra ogni richiesta di cucina, ingrediente, servitore o cambio di affinita.",
        "Tratta le statistiche come segnaposto finche le ricette non sono verificate.",
        "Crea record figli per pasti nominati quando requisiti ed effetti saranno confermati.",
      ],
      outcomes: [
        { label: "Supporto morale", description: "I pasti possono aiutare affinita, recupero o sistemi della torre quando la meccanica sara confermata." },
        { label: "Indizio servitori", description: "Gli eventi in cucina possono rivelare disponibilita o condizioni dei servitori." },
      ],
    },
    "sovereign-tower-dragon-knight": {
      name: "Cavaliere Drago",
      title: "Come battere il Cavaliere Drago in Sovereign Tower",
      description: "Missione ad alta priorita per pianificare statistiche, tratti, rischio danni e cavalieri consigliati.",
      type: "Sfida",
      region: "Incontro speciale",
      difficulty: "Alta",
      bestTraits: ["Specialista fisico", "Resistenza", "Vantaggio sovrannaturale"],
      steps: [
        "Controlla i requisiti visibili prima di chiudere il ciclo.",
        "Dai priorita a Forza e sopravvivenza, poi verifica indizi su Magia o Agilita.",
        "Scegli il cavaliere che supera il requisito anche se la preferenza non e perfetta.",
      ],
      outcomes: [
        { label: "Successo", description: "La sfida viene superata e il cavaliere assegnato dovrebbe ottenere progressi o ricompense." },
        { label: "Fallimento", description: "Un cavaliere inadatto puo subire danni, perdere affinita o bloccare la rotta desiderata." },
      ],
    },
    "sovereign-tower-full-campaign-route": {
      name: "Rotta campagna completa",
      title: "Guida alla campagna completa di Sovereign Tower",
      description: "Indice per collegare Atto 0, regioni, fazioni, romance, reclutamento e controlli avanzati.",
      type: "Principale",
      region: "Campagna completa",
      difficulty: "Sconosciuta",
    },
    "sovereign-tower-get-brunhilda-route": {
      name: "Rotta per ottenere Brunhilda",
      title: "Come ottenere Brunhilda in Sovereign Tower",
      description: "Record di reclutamento per trigger di combattimento, gloria e udienze, con condizioni esatte ancora da verificare.",
      type: "Speciale",
      region: "Reclutamento",
      difficulty: "Media",
      bestTraits: ["Pressione di combattimento", "Gloria", "Reputazione pubblica"],
    },
  },
  ko: {
    "sovereign-tower-cooking-questline": {
      name: "요리 퀘스트라인",
      title: "Sovereign Tower 요리 퀘스트라인 가이드",
      description: "Meals 가이드와 연결되는 데이터 기록으로, 식사, 하인 지원, 사기, 친밀도 변화를 추적합니다.",
      type: "시스템",
      region: "탑 시스템",
      difficulty: "초반",
      bestTraits: ["상냥함", "외교적", "초반 배치 안정성"],
      steps: [
        "요리 요청, 재료 힌트, 하인 언급, 친밀도 변화를 한곳에 기록합니다.",
        "레시피 요구 조건이 검증되기 전까지 능력치는 임시 참고값으로만 봅니다.",
        "이름이 확인된 식사나 주방 이벤트는 별도 기록으로 분리합니다.",
      ],
      outcomes: [
        { label: "사기 보조", description: "식사는 친밀도, 회복, 탑 시스템에 영향을 줄 수 있으므로 실제 효과 확인이 필요합니다." },
        { label: "하인 단서", description: "주방 이벤트가 하인 해금 조건이나 후속 이벤트를 알려줄 수 있습니다." },
      ],
    },
    "sovereign-tower-dragon-knight": {
      name: "드래곤 나이트",
      title: "Sovereign Tower 드래곤 나이트 공략",
      description: "능력치, 특성, 피해 위험, 추천 기사 배치를 함께 확인해야 하는 고가치 도전 기록입니다.",
      type: "도전",
      region: "특수 조우",
      difficulty: "높음",
      bestTraits: ["물리 특화", "생존력", "초자연 대응"],
      steps: [
        "사이클을 끝내기 전에 화면에 보이는 요구 조건을 확인합니다.",
        "우선 힘과 생존력을 보고, 마법이나 민첩 힌트가 있는지 다시 확인합니다.",
        "선호 임무와 완전히 맞지 않더라도 요구 조건을 넘는 기사를 배치합니다.",
      ],
      outcomes: [
        { label: "성공", description: "도전을 통과하고 배치한 기사가 진행도나 보상을 얻을 수 있습니다." },
        { label: "실패", description: "맞지 않는 기사는 피해, 친밀도 손실, 경로 차단을 일으킬 수 있습니다." },
      ],
    },
    "sovereign-tower-full-campaign-route": {
      name: "전체 캠페인 루트",
      title: "Sovereign Tower 전체 캠페인 루트 가이드",
      description: "Act 0, 지역, 세력, 로맨스, 모집, 후반 체크를 연결하는 상위 루트 색인입니다.",
      type: "메인",
      region: "전체 캠페인",
      difficulty: "미확인",
    },
    "sovereign-tower-get-brunhilda-route": {
      name: "브룬힐다 모집 루트",
      title: "Sovereign Tower 브룬힐다 얻는 법",
      description: "전투, 명예, 알현 트리거를 모으는 모집 기록이며 정확한 해금 조건은 아직 검증 중입니다.",
      type: "특수",
      region: "모집",
      difficulty: "보통",
      bestTraits: ["전투 압박", "명예", "공개 평판"],
    },
  },
};

export const LOCALIZED_KNIGHT_OVERLAYS: Record<DatabaseLocale, Record<string, KnightOverlay>> = {
  it: {
    brunhilda: {
      name: "Brunhilda",
      title: "Come ottenere Brunhilda in Sovereign Tower",
      description: "Profilo database di Brunhilda per statistiche, tratti, migliori missioni e note di reclutamento da verificare.",
      role: "Cavaliere reclutabile",
      traits: ["Diretta", "Pronta al combattimento", "Adatta ad alta pressione"],
      hiddenTraits: ["Dettagli dipendenti dalla rotta da verificare"],
      preferences: ["Pressione di combattimento", "Missioni orientate alla gloria"],
      recruitment: "Aggiorna con trigger confermati di udienza, rotta o missione quando i report saranno verificati.",
      notes: [
        "Pagina pensata per intento di ricerca e profilo database.",
        "Mantieni chiaramente marcati i requisiti non verificati.",
      ],
    },
    dullahan: {
      name: "Dullahan",
      title: "Come ottenere Dullahan in Sovereign Tower",
      description: "Profilo per cavaliere segreto, condizioni di rotta, tratti e migliori assegnazioni.",
      role: "Cavaliere segreto",
      traits: ["Recluta insolita", "Adatta al sovrannaturale", "Sensibile alla rotta"],
      hiddenTraits: ["Condizioni segrete da verificare"],
      preferences: ["Minacce mistiche", "Incarichi pericolosi"],
      recruitment: "Traccia qui trigger di rotta, scelte di udienza e rami missione confermati.",
    },
    epicrates: {
      name: "Epicrates",
      title: "Guida al personaggio Epicrates in Sovereign Tower",
      description: "Profilo provvisorio per un personaggio raro o dipendente dalla rotta, con dati community da confermare.",
      role: "Recluta speciale",
      traits: ["Incontro raro da verificare", "Report community", "Dati in sospeso"],
      hiddenTraits: ["Condizioni di rarita o incontro da verificare"],
      preferences: ["Rotte sperimentali", "Test a basso rischio", "Cicli di raccolta informazioni"],
    },
    roberto: {
      name: "Roberto",
      title: "Guida al personaggio Roberto in Sovereign Tower",
      description: "Profilo personaggio per possibile cavaliere, PNG di udienza, diplomatico o figura legata alla timeline.",
      role: "Cavaliere di rotta",
      traits: ["Sensibile alla timeline", "Candidato di udienza", "Ruolo non confermato"],
      hiddenTraits: ["Condizioni di apparizione del ramo da verificare"],
      preferences: ["Fasi di udienza", "Scelte di fazione", "Esperimenti sulla timeline"],
    },
    rufus: {
      name: "Rufus di Groveshire",
      title: "Guida al cavaliere Rufus in Sovereign Tower",
      description: "Rufus e un candidato ruvido e leale per incarichi di prima linea, caccia e missioni di Groveshire.",
      role: "Cavaliere reclutabile",
      traits: ["Molto leale", "Selvatico", "Candidato alla forza ravvicinata"],
      hiddenTraits: ["Contesto ultimo della stirpe da verificare"],
      preferences: ["Lavori nella foresta", "Cacce", "Incarichi che premiano la lealta"],
    },
  },
  ko: {
    brunhilda: {
      name: "브룬힐다",
      title: "Sovereign Tower 브룬힐다 얻는 법",
      description: "브룬힐다의 능력치, 특성, 추천 퀘스트, 모집 메모를 다루는 데이터베이스 프로필입니다.",
      role: "모집 가능 기사",
      traits: ["직선적", "전투 준비", "고압 임무 적합"],
      hiddenTraits: ["루트 의존 정보는 검증 필요"],
      preferences: ["전투 압박", "명예 중심 퀘스트"],
      recruitment: "알현, 루트, 퀘스트 트리거가 확인되면 이 필드에 업데이트합니다.",
      notes: [
        "검색 의도 페이지이자 데이터베이스 프로필로 유지합니다.",
        "검증되지 않은 루트 조건은 명확히 표시합니다.",
      ],
    },
    dullahan: {
      name: "듀라한",
      title: "Sovereign Tower 듀라한 얻는 법",
      description: "비밀 기사 성격의 프로필로 모집 조건, 루트 조건, 특성, 추천 임무를 추적합니다.",
      role: "비밀 기사",
      traits: ["특이한 모집", "초자연 임무 적합", "루트 민감"],
      hiddenTraits: ["비밀 조건 검증 필요"],
      preferences: ["신비한 위협", "위험한 임무"],
      recruitment: "확인된 루트 트리거, 알현 선택지, 퀘스트 분기를 이곳에 기록합니다.",
    },
    epicrates: {
      name: "에피크라테스",
      title: "Sovereign Tower 에피크라테스 캐릭터 가이드",
      description: "희귀하거나 루트 의존 가능성이 있는 캐릭터를 추적하는 임시 데이터베이스 프로필입니다.",
      role: "특수 모집 후보",
      traits: ["희귀 조우 검증 필요", "커뮤니티 제보", "데이터 보류"],
      hiddenTraits: ["희귀도 또는 조우 조건 검증 필요"],
      preferences: ["실험 루트", "저위험 테스트", "정보 수집 사이클"],
    },
    roberto: {
      name: "로베르토",
      title: "Sovereign Tower 로베르토 캐릭터 가이드",
      description: "기사, 알현 NPC, 외교 인물, 타임라인 관련 인물 가능성을 함께 확인하는 프로필입니다.",
      role: "루트 의존 기사",
      traits: ["타임라인 민감", "알현 후보", "역할 미확인"],
      hiddenTraits: ["분기 등장 조건 검증 필요"],
      preferences: ["알현 단계", "세력 선택", "타임라인 실험"],
    },
    rufus: {
      name: "그로브셔의 루퍼스",
      title: "Sovereign Tower 루퍼스 기사 가이드",
      description: "루퍼스는 거칠지만 충성심이 강한 전열, 사냥, Groveshire 임무 후보입니다.",
      role: "모집 가능 기사",
      traits: ["높은 충성심", "야성적", "근접 힘 후보"],
      hiddenTraits: ["마지막 혈통 관련 정보 검증 필요"],
      preferences: ["숲 임무", "사냥", "충성심을 보상하는 임무"],
    },
  },
};
