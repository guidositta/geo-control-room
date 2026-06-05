const form = document.querySelector("#quizForm");
const checkButton = document.querySelector("#checkButton");
const nextTargetButton = document.querySelector("#nextTargetButton");
const resetGameButton = document.querySelector("#resetGameButton");
const choices = document.querySelector("#choices");
const result = document.querySelector("#result");
const mapPanel = document.querySelector(".map-panel");
const tileLayer = document.querySelector("#tileLayer");
const marker = document.querySelector(".marker");
const scale = document.querySelector("#scale");
const meta = document.querySelector("#meta");
const roundStatus = document.querySelector("#roundStatus");
const scoreTotal = document.querySelector("#scoreTotal");
const scoreCorrect = document.querySelector("#scoreCorrect");
const scoreRate = document.querySelector("#scoreRate");
const scorePoints = document.querySelector("#scorePoints");
const scorePenalty = document.querySelector("#scorePenalty");
const scoreStreak = document.querySelector("#scoreStreak");
const languageSelect = document.querySelector("#languageSelect");

const tileBaseUrl = "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile";
const minZoom = 3;
const maxZoom = 16;
const translations = {
  it: {
    htmlLang: "it",
    mapAria: "Mappa satellitare navigabile",
    mapHelp: "Pan: trascina | Zoom: rotellina",
    systemOnline: "Sistema online",
    languageLabel: "Lingua",
    languageAria: "Seleziona lingua",
    title: "Dove si trova il target?",
    intro: "Analizza la mappa, scegli una risposta e conferma. Ogni pan o zoom prima della risposta riduce il punteggio del target del 10%.",
    scoreAria: "Punteggio",
    metricAnswers: "Risposte",
    metricCorrect: "Corrette",
    metricAccuracy: "Precisione",
    metricPoints: "Punti",
    metricPenalty: "Penalita",
    metricStreak: "Serie",
    chooseSolution: "Scegli una soluzione",
    verify: "Verifica",
    next: "Prossimo",
    restart: "Ricomincia",
    waitingTitle: "Target in attesa",
    waitingText: "Scegli una delle tre opzioni per continuare.",
    targetStatus: (current, total) => `Target ${current}/${total}`,
    completedStatus: "Target completati",
    activeMeta: (current, total) => `Target casuale ${current} di ${total}. Nessuna ripetizione in questa sessione.`,
    initialMeta: "Luoghi globali casuali, senza ripetizioni nella sessione.",
    completedMeta: "Partita completata. Premi Ricomincia per generare un nuovo ordine casuale.",
    completedTitle: "Missione completata",
    completedText: (total, correct, rate, points) => `Hai completato ${total} target senza ripetizioni. Risposte corrette: ${correct}. Precisione: ${rate}%. Punti totali: ${points}.`,
    correctTitle: "Risposta corretta",
    correctText: (place, actions, penalty, points) => `Target: ${place}. Penalizzazioni applicate: ${actions} azioni di navigazione, -${penalty}%. Punti assegnati: ${points}/100.`,
    wrongTitle: "Risposta sbagliata",
    wrongText: (answer, place, actions, penalty) => `Hai scelto ${answer}. La risposta corretta era ${place}. Penalizzazioni applicate: ${actions} azioni di navigazione, -${penalty}%. Punti assegnati: 0/100.`
  },
  en: {
    htmlLang: "en",
    mapAria: "Navigable satellite map",
    mapHelp: "Pan: drag | Zoom: mouse wheel",
    systemOnline: "System online",
    languageLabel: "Language",
    languageAria: "Select language",
    title: "Where is the target?",
    intro: "Analyze the map, choose an answer, and confirm. Every pan or zoom before answering reduces this target's score by 10%.",
    scoreAria: "Score",
    metricAnswers: "Answers",
    metricCorrect: "Correct",
    metricAccuracy: "Accuracy",
    metricPoints: "Points",
    metricPenalty: "Penalty",
    metricStreak: "Streak",
    chooseSolution: "Choose one answer",
    verify: "Verify",
    next: "Next",
    restart: "Restart",
    waitingTitle: "Target pending",
    waitingText: "Choose one of the three options to continue.",
    targetStatus: (current, total) => `Target ${current}/${total}`,
    completedStatus: "Targets complete",
    activeMeta: (current, total) => `Random target ${current} of ${total}. No repeats in this session.`,
    initialMeta: "Random global places, with no repeats in the session.",
    completedMeta: "Game complete. Press Restart to generate a new random order.",
    completedTitle: "Mission complete",
    completedText: (total, correct, rate, points) => `You completed ${total} targets with no repeats. Correct answers: ${correct}. Accuracy: ${rate}%. Total points: ${points}.`,
    correctTitle: "Correct answer",
    correctText: (place, actions, penalty, points) => `Target: ${place}. Applied penalties: ${actions} navigation actions, -${penalty}%. Points awarded: ${points}/100.`,
    wrongTitle: "Wrong answer",
    wrongText: (answer, place, actions, penalty) => `You chose ${answer}. The correct answer was ${place}. Applied penalties: ${actions} navigation actions, -${penalty}%. Points awarded: 0/100.`
  },
  es: {
    htmlLang: "es",
    mapAria: "Mapa satelital navegable",
    mapHelp: "Pan: arrastrar | Zoom: rueda",
    systemOnline: "Sistema en linea",
    languageLabel: "Idioma",
    languageAria: "Seleccionar idioma",
    title: "Donde esta el objetivo?",
    intro: "Analiza el mapa, elige una respuesta y confirma. Cada pan o zoom antes de responder reduce la puntuacion del objetivo en un 10%.",
    scoreAria: "Puntuacion",
    metricAnswers: "Respuestas",
    metricCorrect: "Correctas",
    metricAccuracy: "Precision",
    metricPoints: "Puntos",
    metricPenalty: "Penalizacion",
    metricStreak: "Racha",
    chooseSolution: "Elige una respuesta",
    verify: "Verificar",
    next: "Siguiente",
    restart: "Reiniciar",
    waitingTitle: "Objetivo pendiente",
    waitingText: "Elige una de las tres opciones para continuar.",
    targetStatus: (current, total) => `Objetivo ${current}/${total}`,
    completedStatus: "Objetivos completados",
    activeMeta: (current, total) => `Objetivo aleatorio ${current} de ${total}. Sin repeticiones en esta sesion.`,
    initialMeta: "Lugares globales aleatorios, sin repeticiones en la sesion.",
    completedMeta: "Partida completada. Pulsa Reiniciar para generar un nuevo orden aleatorio.",
    completedTitle: "Mision completada",
    completedText: (total, correct, rate, points) => `Completaste ${total} objetivos sin repeticiones. Respuestas correctas: ${correct}. Precision: ${rate}%. Puntos totales: ${points}.`,
    correctTitle: "Respuesta correcta",
    correctText: (place, actions, penalty, points) => `Objetivo: ${place}. Penalizaciones aplicadas: ${actions} acciones de navegacion, -${penalty}%. Puntos otorgados: ${points}/100.`,
    wrongTitle: "Respuesta incorrecta",
    wrongText: (answer, place, actions, penalty) => `Elegiste ${answer}. La respuesta correcta era ${place}. Penalizaciones aplicadas: ${actions} acciones de navegacion, -${penalty}%. Puntos otorgados: 0/100.`
  },
  de: {
    htmlLang: "de",
    mapAria: "Navigierbare Satellitenkarte",
    mapHelp: "Pan: ziehen | Zoom: Mausrad",
    systemOnline: "System online",
    languageLabel: "Sprache",
    languageAria: "Sprache auswahlen",
    title: "Wo liegt das Ziel?",
    intro: "Analysiere die Karte, wahle eine Antwort und bestatige. Jeder Pan oder Zoom vor der Antwort reduziert die Punktzahl dieses Ziels um 10%.",
    scoreAria: "Punktestand",
    metricAnswers: "Antworten",
    metricCorrect: "Richtig",
    metricAccuracy: "Genauigkeit",
    metricPoints: "Punkte",
    metricPenalty: "Strafe",
    metricStreak: "Serie",
    chooseSolution: "Wahle eine Antwort",
    verify: "Prufen",
    next: "Weiter",
    restart: "Neustart",
    waitingTitle: "Ziel wartet",
    waitingText: "Wahle eine der drei Optionen, um fortzufahren.",
    targetStatus: (current, total) => `Ziel ${current}/${total}`,
    completedStatus: "Ziele abgeschlossen",
    activeMeta: (current, total) => `Zufalliges Ziel ${current} von ${total}. Keine Wiederholungen in dieser Sitzung.`,
    initialMeta: "Zufallige Orte weltweit, ohne Wiederholungen in der Sitzung.",
    completedMeta: "Spiel abgeschlossen. Drucke Neustart, um eine neue zufallige Reihenfolge zu erzeugen.",
    completedTitle: "Mission abgeschlossen",
    completedText: (total, correct, rate, points) => `Du hast ${total} Ziele ohne Wiederholungen abgeschlossen. Richtige Antworten: ${correct}. Genauigkeit: ${rate}%. Gesamtpunkte: ${points}.`,
    correctTitle: "Richtige Antwort",
    correctText: (place, actions, penalty, points) => `Ziel: ${place}. Angewendete Strafen: ${actions} Navigationsaktionen, -${penalty}%. Vergebene Punkte: ${points}/100.`,
    wrongTitle: "Falsche Antwort",
    wrongText: (answer, place, actions, penalty) => `Du hast ${answer} gewahlt. Die richtige Antwort war ${place}. Angewendete Strafen: ${actions} Navigationsaktionen, -${penalty}%. Vergebene Punkte: 0/100.`
  },
  fr: {
    htmlLang: "fr",
    mapAria: "Carte satellite navigable",
    mapHelp: "Pan: glisser | Zoom: molette",
    systemOnline: "Systeme en ligne",
    languageLabel: "Langue",
    languageAria: "Choisir la langue",
    title: "Ou se trouve la cible?",
    intro: "Analysez la carte, choisissez une reponse et confirmez. Chaque pan ou zoom avant la reponse reduit le score de cette cible de 10%.",
    scoreAria: "Score",
    metricAnswers: "Reponses",
    metricCorrect: "Correctes",
    metricAccuracy: "Precision",
    metricPoints: "Points",
    metricPenalty: "Penalite",
    metricStreak: "Serie",
    chooseSolution: "Choisissez une reponse",
    verify: "Verifier",
    next: "Suivant",
    restart: "Recommencer",
    waitingTitle: "Cible en attente",
    waitingText: "Choisissez une des trois options pour continuer.",
    targetStatus: (current, total) => `Cible ${current}/${total}`,
    completedStatus: "Cibles terminees",
    activeMeta: (current, total) => `Cible aleatoire ${current} sur ${total}. Aucune repetition dans cette session.`,
    initialMeta: "Lieux mondiaux aleatoires, sans repetition dans la session.",
    completedMeta: "Partie terminee. Appuyez sur Recommencer pour generer un nouvel ordre aleatoire.",
    completedTitle: "Mission terminee",
    completedText: (total, correct, rate, points) => `Vous avez termine ${total} cibles sans repetition. Reponses correctes: ${correct}. Precision: ${rate}%. Points totaux: ${points}.`,
    correctTitle: "Bonne reponse",
    correctText: (place, actions, penalty, points) => `Cible: ${place}. Penalites appliquees: ${actions} actions de navigation, -${penalty}%. Points attribues: ${points}/100.`,
    wrongTitle: "Mauvaise reponse",
    wrongText: (answer, place, actions, penalty) => `Vous avez choisi ${answer}. La bonne reponse etait ${place}. Penalites appliquees: ${actions} actions de navigation, -${penalty}%. Points attribues: 0/100.`
  },
  zh: {
    htmlLang: "zh",
    mapAria: "可导航卫星地图",
    mapHelp: "平移：拖动 | 缩放：滚轮",
    systemOnline: "系统在线",
    languageLabel: "语言",
    languageAria: "选择语言",
    title: "目标在哪里？",
    intro: "观察地图，选择答案并确认。答题前每次平移或缩放都会让该目标得分减少 10%。",
    scoreAria: "得分",
    metricAnswers: "答题",
    metricCorrect: "正确",
    metricAccuracy: "准确率",
    metricPoints: "分数",
    metricPenalty: "惩罚",
    metricStreak: "连对",
    chooseSolution: "选择一个答案",
    verify: "验证",
    next: "下一个",
    restart: "重新开始",
    waitingTitle: "等待目标",
    waitingText: "请选择三个选项中的一个继续。",
    targetStatus: (current, total) => `目标 ${current}/${total}`,
    completedStatus: "目标完成",
    activeMeta: (current, total) => `随机目标 ${current}/${total}。本轮不会重复。`,
    initialMeta: "全球随机地点，本轮不会重复。",
    completedMeta: "游戏完成。点击重新开始生成新的随机顺序。",
    completedTitle: "任务完成",
    completedText: (total, correct, rate, points) => `你完成了 ${total} 个不重复目标。正确答案：${correct}。准确率：${rate}%。总分：${points}。`,
    correctTitle: "回答正确",
    correctText: (place, actions, penalty, points) => `目标：${place}。已应用惩罚：${actions} 次导航，-${penalty}%。获得分数：${points}/100。`,
    wrongTitle: "回答错误",
    wrongText: (answer, place, actions, penalty) => `你选择了 ${answer}。正确答案是 ${place}。已应用惩罚：${actions} 次导航，-${penalty}%。获得分数：0/100。`
  },
  ru: {
    htmlLang: "ru",
    mapAria: "Навигационная спутниковая карта",
    mapHelp: "Панорама: перетащите | Масштаб: колесо мыши",
    systemOnline: "Система онлайн",
    languageLabel: "Язык",
    languageAria: "Выберите язык",
    title: "Где находится цель?",
    intro: "Изучите карту, выберите ответ и подтвердите. Каждое перемещение или масштабирование до ответа уменьшает очки цели на 10%.",
    scoreAria: "Счет",
    metricAnswers: "Ответы",
    metricCorrect: "Верно",
    metricAccuracy: "Точность",
    metricPoints: "Очки",
    metricPenalty: "Штраф",
    metricStreak: "Серия",
    chooseSolution: "Выберите ответ",
    verify: "Проверить",
    next: "Далее",
    restart: "Заново",
    waitingTitle: "Цель ожидает",
    waitingText: "Выберите один из трех вариантов, чтобы продолжить.",
    targetStatus: (current, total) => `Цель ${current}/${total}`,
    completedStatus: "Цели завершены",
    activeMeta: (current, total) => `Случайная цель ${current} из ${total}. В этой сессии повторов нет.`,
    initialMeta: "Случайные места по всему миру, без повторов в сессии.",
    completedMeta: "Игра завершена. Нажмите Заново, чтобы создать новый случайный порядок.",
    completedTitle: "Миссия завершена",
    completedText: (total, correct, rate, points) => `Вы завершили ${total} целей без повторов. Верных ответов: ${correct}. Точность: ${rate}%. Всего очков: ${points}.`,
    correctTitle: "Верный ответ",
    correctText: (place, actions, penalty, points) => `Цель: ${place}. Примененные штрафы: ${actions} навигационных действий, -${penalty}%. Начислено очков: ${points}/100.`,
    wrongTitle: "Неверный ответ",
    wrongText: (answer, place, actions, penalty) => `Вы выбрали ${answer}. Правильный ответ: ${place}. Примененные штрафы: ${actions} навигационных действий, -${penalty}%. Начислено очков: 0/100.`
  }
};

const places = [
  { answer: "Machu Picchu, Peru", center: { lat: -13.1631, lon: -72.5450, zoom: 10 }, scale: "20 km" },
  { answer: "Grand Canyon, Stati Uniti", center: { lat: 36.1069, lon: -112.1129, zoom: 9 }, scale: "45 km" },
  { answer: "Uluru, Australia", center: { lat: -25.3444, lon: 131.0369, zoom: 9 }, scale: "35 km" },
  { answer: "Monte Fuji, Giappone", center: { lat: 35.3606, lon: 138.7274, zoom: 9 }, scale: "35 km" },
  { answer: "Citta del Capo, Sudafrica", center: { lat: -33.9249, lon: 18.4241, zoom: 9 }, scale: "35 km" },
  { answer: "Reykjavik, Islanda", center: { lat: 64.1466, lon: -21.9426, zoom: 9 }, scale: "35 km" },
  { answer: "Petra, Giordania", center: { lat: 30.3285, lon: 35.4444, zoom: 10 }, scale: "20 km" },
  { answer: "Giza, Egitto", center: { lat: 29.9792, lon: 31.1342, zoom: 10 }, scale: "20 km" },
  { answer: "Santorini, Grecia", center: { lat: 36.3932, lon: 25.4615, zoom: 10 }, scale: "20 km" },
  { answer: "Venezia, Italia", center: { lat: 45.4408, lon: 12.3155, zoom: 10 }, scale: "18 km" },
  { answer: "Matera, Italia", center: { lat: 40.6664, lon: 16.6043, zoom: 9 }, scale: "35 km" },
  { answer: "Aosta, Italia", center: { lat: 45.7370, lon: 7.3201, zoom: 9 }, scale: "35 km" },
  { answer: "Trieste, Italia", center: { lat: 45.6495, lon: 13.7768, zoom: 9 }, scale: "35 km" },
  { answer: "Palermo, Italia", center: { lat: 38.1157, lon: 13.3615, zoom: 9 }, scale: "45 km" },
  { answer: "Torino, Italia", center: { lat: 45.0703, lon: 7.6869, zoom: 9 }, scale: "35 km" },
  { answer: "Parigi, Francia", center: { lat: 48.8566, lon: 2.3522, zoom: 9 }, scale: "35 km" },
  { answer: "Londra, Regno Unito", center: { lat: 51.5072, lon: -0.1276, zoom: 9 }, scale: "35 km" },
  { answer: "New York, Stati Uniti", center: { lat: 40.7128, lon: -74.0060, zoom: 9 }, scale: "35 km" },
  { answer: "San Francisco, Stati Uniti", center: { lat: 37.7749, lon: -122.4194, zoom: 9 }, scale: "35 km" },
  { answer: "Rio de Janeiro, Brasile", center: { lat: -22.9068, lon: -43.1729, zoom: 9 }, scale: "35 km" },
  { answer: "Buenos Aires, Argentina", center: { lat: -34.6037, lon: -58.3816, zoom: 9 }, scale: "45 km" },
  { answer: "Santiago, Cile", center: { lat: -33.4489, lon: -70.6693, zoom: 9 }, scale: "45 km" },
  { answer: "Lago Titicaca, Bolivia/Peru", center: { lat: -15.9254, lon: -69.3354, zoom: 8 }, scale: "80 km" },
  { answer: "Cascate Vittoria, Zambia/Zimbabwe", center: { lat: -17.9243, lon: 25.8572, zoom: 10 }, scale: "20 km" },
  { answer: "Serengeti, Tanzania", center: { lat: -2.3333, lon: 34.8333, zoom: 8 }, scale: "80 km" },
  { answer: "Marrakech, Marocco", center: { lat: 31.6295, lon: -7.9811, zoom: 9 }, scale: "35 km" },
  { answer: "Dubai, Emirati Arabi Uniti", center: { lat: 25.2048, lon: 55.2708, zoom: 9 }, scale: "35 km" },
  { answer: "Istanbul, Turchia", center: { lat: 41.0082, lon: 28.9784, zoom: 9 }, scale: "35 km" },
  { answer: "Gerusalemme, Israele", center: { lat: 31.7683, lon: 35.2137, zoom: 9 }, scale: "35 km" },
  { answer: "Varanasi, India", center: { lat: 25.3176, lon: 82.9739, zoom: 9 }, scale: "35 km" },
  { answer: "Kathmandu, Nepal", center: { lat: 27.7172, lon: 85.3240, zoom: 9 }, scale: "35 km" },
  { answer: "Bangkok, Thailandia", center: { lat: 13.7563, lon: 100.5018, zoom: 9 }, scale: "35 km" },
  { answer: "Singapore", center: { lat: 1.3521, lon: 103.8198, zoom: 10 }, scale: "20 km" },
  { answer: "Hong Kong", center: { lat: 22.3193, lon: 114.1694, zoom: 9 }, scale: "35 km" },
  { answer: "Shanghai, Cina", center: { lat: 31.2304, lon: 121.4737, zoom: 9 }, scale: "45 km" },
  { answer: "Pechino, Cina", center: { lat: 39.9042, lon: 116.4074, zoom: 9 }, scale: "45 km" },
  { answer: "Seoul, Corea del Sud", center: { lat: 37.5665, lon: 126.9780, zoom: 9 }, scale: "35 km" },
  { answer: "Tokyo, Giappone", center: { lat: 35.6762, lon: 139.6503, zoom: 9 }, scale: "45 km" },
  { answer: "Sydney, Australia", center: { lat: -33.8688, lon: 151.2093, zoom: 9 }, scale: "35 km" },
  { answer: "Auckland, Nuova Zelanda", center: { lat: -36.8509, lon: 174.7645, zoom: 9 }, scale: "35 km" },
  { answer: "Queenstown, Nuova Zelanda", center: { lat: -45.0312, lon: 168.6626, zoom: 9 }, scale: "35 km" },
  { answer: "Bali, Indonesia", center: { lat: -8.3405, lon: 115.0920, zoom: 9 }, scale: "45 km" },
  { answer: "Hanoi, Vietnam", center: { lat: 21.0278, lon: 105.8342, zoom: 9 }, scale: "35 km" },
  { answer: "Cairo, Egitto", center: { lat: 30.0444, lon: 31.2357, zoom: 9 }, scale: "35 km" },
  { answer: "Lisbona, Portogallo", center: { lat: 38.7223, lon: -9.1393, zoom: 9 }, scale: "35 km" },
  { answer: "Barcellona, Spagna", center: { lat: 41.3874, lon: 2.1686, zoom: 9 }, scale: "35 km" },
  { answer: "Edimburgo, Regno Unito", center: { lat: 55.9533, lon: -3.1883, zoom: 9 }, scale: "35 km" },
  { answer: "Bergen, Norvegia", center: { lat: 60.3913, lon: 5.3221, zoom: 9 }, scale: "35 km" },
  { answer: "Tromso, Norvegia", center: { lat: 69.6492, lon: 18.9553, zoom: 8 }, scale: "70 km" },
  { answer: "Cusco, Peru", center: { lat: -13.5319, lon: -71.9675, zoom: 9 }, scale: "35 km" }
];

const placeNameOverrides = {
  "Grand Canyon": { zh: "大峡谷", ru: "Гранд-Каньон" },
  "Monte Fuji": { en: "Mount Fuji", es: "Monte Fuji", de: "Fuji", fr: "Mont Fuji", zh: "富士山", ru: "Фудзи" },
  "Citta del Capo": { en: "Cape Town", es: "Ciudad del Cabo", de: "Kapstadt", fr: "Le Cap", zh: "开普敦", ru: "Кейптаун" },
  "Giza": { it: "Giza", en: "Giza", es: "Guiza", de: "Gizeh", fr: "Gizeh", zh: "吉萨", ru: "Гиза" },
  "Venezia": { en: "Venice", es: "Venecia", de: "Venedig", fr: "Venise", zh: "威尼斯", ru: "Венеция" },
  "Parigi": { en: "Paris", es: "Paris", de: "Paris", fr: "Paris", zh: "巴黎", ru: "Париж" },
  "Londra": { en: "London", es: "Londres", de: "London", fr: "Londres", zh: "伦敦", ru: "Лондон" },
  "New York": { zh: "纽约", ru: "Нью-Йорк" },
  "San Francisco": { zh: "旧金山", ru: "Сан-Франциско" },
  "Rio de Janeiro": { zh: "里约热内卢", ru: "Рио-де-Жанейро" },
  "Buenos Aires": { zh: "布宜诺斯艾利斯", ru: "Буэнос-Айрес" },
  "Santiago": { zh: "圣地亚哥", ru: "Сантьяго" },
  "Lago Titicaca": { en: "Lake Titicaca", es: "Lago Titicaca", de: "Titicacasee", fr: "Lac Titicaca", zh: "的的喀喀湖", ru: "Озеро Титикака" },
  "Cascate Vittoria": { en: "Victoria Falls", es: "Cataratas Victoria", de: "Victoriafalle", fr: "Chutes Victoria", zh: "维多利亚瀑布", ru: "Водопад Виктория" },
  "Pechino": { en: "Beijing", es: "Pekin", de: "Peking", fr: "Pekin", zh: "北京", ru: "Пекин" },
  "Cairo": { en: "Cairo", es: "El Cairo", de: "Kairo", fr: "Le Caire", zh: "开罗", ru: "Каир" },
  "Lisbona": { en: "Lisbon", es: "Lisboa", de: "Lissabon", fr: "Lisbonne", zh: "里斯本", ru: "Лиссабон" },
  "Barcellona": { en: "Barcelona", es: "Barcelona", de: "Barcelona", fr: "Barcelone", zh: "巴塞罗那", ru: "Барселона" },
  "Edimburgo": { en: "Edinburgh", es: "Edimburgo", de: "Edinburgh", fr: "Edimbourg", zh: "爱丁堡", ru: "Эдинбург" }
};

const regionNames = {
  "Peru": { it: "Peru", en: "Peru", es: "Peru", de: "Peru", fr: "Perou", zh: "秘鲁", ru: "Перу" },
  "Stati Uniti": { en: "United States", es: "Estados Unidos", de: "Vereinigte Staaten", fr: "Etats-Unis", zh: "美国", ru: "США" },
  "Australia": { en: "Australia", es: "Australia", de: "Australien", fr: "Australie", zh: "澳大利亚", ru: "Австралия" },
  "Giappone": { en: "Japan", es: "Japon", de: "Japan", fr: "Japon", zh: "日本", ru: "Япония" },
  "Sudafrica": { en: "South Africa", es: "Sudafrica", de: "Sudafrika", fr: "Afrique du Sud", zh: "南非", ru: "Южная Африка" },
  "Islanda": { en: "Iceland", es: "Islandia", de: "Island", fr: "Islande", zh: "冰岛", ru: "Исландия" },
  "Giordania": { en: "Jordan", es: "Jordania", de: "Jordanien", fr: "Jordanie", zh: "约旦", ru: "Иордания" },
  "Egitto": { en: "Egypt", es: "Egipto", de: "Agypten", fr: "Egypte", zh: "埃及", ru: "Египет" },
  "Grecia": { en: "Greece", es: "Grecia", de: "Griechenland", fr: "Grece", zh: "希腊", ru: "Греция" },
  "Italia": { en: "Italy", es: "Italia", de: "Italien", fr: "Italie", zh: "意大利", ru: "Италия" },
  "Francia": { en: "France", es: "Francia", de: "Frankreich", fr: "France", zh: "法国", ru: "Франция" },
  "Regno Unito": { en: "United Kingdom", es: "Reino Unido", de: "Vereinigtes Konigreich", fr: "Royaume-Uni", zh: "英国", ru: "Великобритания" },
  "Brasile": { en: "Brazil", es: "Brasil", de: "Brasilien", fr: "Bresil", zh: "巴西", ru: "Бразилия" },
  "Argentina": { en: "Argentina", es: "Argentina", de: "Argentinien", fr: "Argentine", zh: "阿根廷", ru: "Аргентина" },
  "Cile": { en: "Chile", es: "Chile", de: "Chile", fr: "Chili", zh: "智利", ru: "Чили" },
  "Bolivia/Peru": { en: "Bolivia/Peru", es: "Bolivia/Peru", de: "Bolivien/Peru", fr: "Bolivie/Perou", zh: "玻利维亚/秘鲁", ru: "Боливия/Перу" },
  "Zambia/Zimbabwe": { en: "Zambia/Zimbabwe", es: "Zambia/Zimbabue", de: "Sambia/Simbabwe", fr: "Zambie/Zimbabwe", zh: "赞比亚/津巴布韦", ru: "Замбия/Зимбабве" },
  "Tanzania": { en: "Tanzania", es: "Tanzania", de: "Tansania", fr: "Tanzanie", zh: "坦桑尼亚", ru: "Танзания" },
  "Marocco": { en: "Morocco", es: "Marruecos", de: "Marokko", fr: "Maroc", zh: "摩洛哥", ru: "Марокко" },
  "Emirati Arabi Uniti": { en: "United Arab Emirates", es: "Emiratos Arabes Unidos", de: "Vereinigte Arabische Emirate", fr: "Emirats arabes unis", zh: "阿拉伯联合酋长国", ru: "ОАЭ" },
  "Turchia": { en: "Turkey", es: "Turquia", de: "Turkei", fr: "Turquie", zh: "土耳其", ru: "Турция" },
  "Israele": { en: "Israel", es: "Israel", de: "Israel", fr: "Israel", zh: "以色列", ru: "Израиль" },
  "India": { en: "India", es: "India", de: "Indien", fr: "Inde", zh: "印度", ru: "Индия" },
  "Nepal": { en: "Nepal", es: "Nepal", de: "Nepal", fr: "Nepal", zh: "尼泊尔", ru: "Непал" },
  "Thailandia": { en: "Thailand", es: "Tailandia", de: "Thailand", fr: "Thailande", zh: "泰国", ru: "Таиланд" },
  "Cina": { en: "China", es: "China", de: "China", fr: "Chine", zh: "中国", ru: "Китай" },
  "Corea del Sud": { en: "South Korea", es: "Corea del Sur", de: "Sudkorea", fr: "Coree du Sud", zh: "韩国", ru: "Южная Корея" },
  "Nuova Zelanda": { en: "New Zealand", es: "Nueva Zelanda", de: "Neuseeland", fr: "Nouvelle-Zelande", zh: "新西兰", ru: "Новая Зеландия" },
  "Indonesia": { en: "Indonesia", es: "Indonesia", de: "Indonesien", fr: "Indonesie", zh: "印度尼西亚", ru: "Индонезия" },
  "Vietnam": { en: "Vietnam", es: "Vietnam", de: "Vietnam", fr: "Vietnam", zh: "越南", ru: "Вьетнам" },
  "Portogallo": { en: "Portugal", es: "Portugal", de: "Portugal", fr: "Portugal", zh: "葡萄牙", ru: "Португалия" },
  "Spagna": { en: "Spain", es: "Espana", de: "Spanien", fr: "Espagne", zh: "西班牙", ru: "Испания" },
  "Norvegia": { en: "Norway", es: "Noruega", de: "Norwegen", fr: "Norvege", zh: "挪威", ru: "Норвегия" }
};

let targetOrder = [];
let targetCursor = -1;
let currentPlace = null;
let currentOptions = [];
let mapCenter = { ...places[0].center };
let panState = null;
let questionAnswered = false;
let navigationActions = 0;
let selectedAnswer = "";
let score = {
  total: 0,
  correct: 0,
  streak: 0,
  points: 0
};
let currentLanguage = "it";
let lastResultState = "waiting";
let lastResultPayload = {};

function t(key, ...args) {
  const value = translations[currentLanguage][key] || translations.it[key];
  return typeof value === "function" ? value(...args) : value;
}

function placeName(placeOrKey) {
  const key = typeof placeOrKey === "string" ? placeOrKey : placeOrKey.answer;
  const [rawName, rawRegion] = key.split(", ");
  const localizedName = placeNameOverrides[rawName]?.[currentLanguage] || rawName;
  const localizedRegion = regionNames[rawRegion]?.[currentLanguage] || rawRegion;

  return localizedRegion ? `${localizedName}, ${localizedRegion}` : localizedName;
}

function setResult(titleKey, textKey, payload = {}, state = "waiting") {
  lastResultState = state;
  lastResultPayload = { titleKey, textKey, payload };
  result.className = `result ${state === "correct" || state === "complete" ? "good" : state === "wrong" ? "bad" : ""}`.trim();
  const args = payload.argsFactory ? payload.argsFactory() : payload.args;
  result.innerHTML = `<strong>${t(titleKey)}</strong><span>${t(textKey, ...args)}</span>`;
}

function refreshRoundText() {
  if (!currentPlace) {
    return;
  }

  roundStatus.textContent = t("targetStatus", targetCursor + 1, places.length);
  meta.textContent = t("activeMeta", targetCursor + 1, places.length);
}

function applyTranslations() {
  const language = translations[currentLanguage];

  document.documentElement.lang = language.htmlLang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  if (lastResultPayload.titleKey) {
    setResult(lastResultPayload.titleKey, lastResultPayload.textKey, lastResultPayload.payload, lastResultState);
  }

  if (currentPlace) {
    refreshRoundText();
    renderChoices();
  } else if (score.total === places.length) {
    roundStatus.textContent = t("completedStatus");
    meta.textContent = t("completedMeta");
  } else {
    roundStatus.textContent = t("targetStatus", "--", "--");
    meta.textContent = t("initialMeta");
  }
}

function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function lonToTileX(lon, zoom) {
  return ((lon + 180) / 360) * Math.pow(2, zoom);
}

function latToTileY(lat, zoom) {
  const latRad = lat * Math.PI / 180;
  return (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * Math.pow(2, zoom);
}

function tileXToLon(x, zoom) {
  return x / Math.pow(2, zoom) * 360 - 180;
}

function tileYToLat(y, zoom) {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

function createTargetOrder() {
  targetOrder = shuffle(places.map((_, index) => index));
  targetCursor = -1;
}

function getNextPlace() {
  if (targetCursor + 1 >= targetOrder.length) {
    return null;
  }

  targetCursor += 1;
  return places[targetOrder[targetCursor]];
}

function createOptions(place) {
  const distractors = shuffle(places.filter((candidate) => candidate.answer !== place.answer))
    .slice(0, 2)
    .map((candidate) => candidate.answer);

  return shuffle([place.answer, ...distractors]);
}

function renderChoices() {
  choices.innerHTML = currentOptions
    .map((option) => `
      <label class="choice ${questionAnswered ? "is-locked" : ""}">
        <input type="radio" name="answer" value="${option}" ${option === selectedAnswer ? "checked" : ""} ${questionAnswered ? "disabled" : ""}>
        <span>${placeName(option)}</span>
      </label>
    `)
    .join("");
}

function renderScore() {
  const rate = score.total === 0 ? 0 : Math.round(score.correct / score.total * 100);
  const currentPenalty = Math.min(100, navigationActions * 10);

  scoreTotal.textContent = score.total;
  scoreCorrect.textContent = score.correct;
  scoreRate.textContent = `${rate}%`;
  scorePoints.textContent = score.points;
  scorePenalty.textContent = `${currentPenalty}%`;
  scoreStreak.textContent = score.streak;
}

function applyNavigationPenalty() {
  if (questionAnswered || !currentPlace) {
    return;
  }

  navigationActions += 1;
  renderScore();
}

function updateMarkerPosition() {
  if (!currentPlace) {
    return;
  }

  const mapWidth = mapPanel.clientWidth;
  const mapHeight = mapPanel.clientHeight;
  const centerX = lonToTileX(mapCenter.lon, mapCenter.zoom) * 256;
  const centerY = latToTileY(mapCenter.lat, mapCenter.zoom) * 256;
  const placeX = lonToTileX(currentPlace.center.lon, mapCenter.zoom) * 256;
  const placeY = latToTileY(currentPlace.center.lat, mapCenter.zoom) * 256;

  marker.style.left = `${mapWidth / 2 + placeX - centerX}px`;
  marker.style.top = `${mapHeight / 2 + placeY - centerY}px`;
}

function renderTiles() {
  if (!currentPlace) {
    return;
  }

  const zoom = mapCenter.zoom;
  const mapWidth = mapPanel.clientWidth;
  const mapHeight = mapPanel.clientHeight;
  const centerX = lonToTileX(mapCenter.lon, zoom) * 256;
  const centerY = latToTileY(mapCenter.lat, zoom) * 256;
  const startX = Math.floor((centerX - mapWidth / 2) / 256);
  const endX = Math.floor((centerX + mapWidth / 2) / 256);
  const startY = Math.floor((centerY - mapHeight / 2) / 256);
  const endY = Math.floor((centerY + mapHeight / 2) / 256);
  const maxTile = Math.pow(2, zoom);
  const fragment = document.createDocumentFragment();

  tileLayer.innerHTML = "";

  for (let x = startX; x <= endX; x += 1) {
    for (let y = startY; y <= endY; y += 1) {
      if (y < 0 || y >= maxTile) {
        continue;
      }

      const wrappedX = ((x % maxTile) + maxTile) % maxTile;
      const tile = document.createElement("img");
      tile.alt = "";
      tile.src = `${tileBaseUrl}/${zoom}/${y}/${wrappedX}`;
      tile.style.left = `${x * 256 - centerX + mapWidth / 2}px`;
      tile.style.top = `${y * 256 - centerY + mapHeight / 2}px`;
      fragment.appendChild(tile);
    }
  }

  tileLayer.appendChild(fragment);
  updateMarkerPosition();
}

function zoomMap(delta, clientX, clientY) {
  const nextZoom = Math.max(minZoom, Math.min(maxZoom, mapCenter.zoom + delta));

  if (nextZoom === mapCenter.zoom) {
    return false;
  }

  const mapRect = mapPanel.getBoundingClientRect();
  const cursorX = clientX - mapRect.left;
  const cursorY = clientY - mapRect.top;
  const mapWidth = mapPanel.clientWidth;
  const mapHeight = mapPanel.clientHeight;
  const currentCenterX = lonToTileX(mapCenter.lon, mapCenter.zoom) * 256;
  const currentCenterY = latToTileY(mapCenter.lat, mapCenter.zoom) * 256;
  const cursorWorldX = currentCenterX + cursorX - mapWidth / 2;
  const cursorWorldY = currentCenterY + cursorY - mapHeight / 2;
  const zoomScale = Math.pow(2, nextZoom - mapCenter.zoom);
  const nextCenterX = cursorWorldX * zoomScale - cursorX + mapWidth / 2;
  const nextCenterY = cursorWorldY * zoomScale - cursorY + mapHeight / 2;

  mapCenter = {
    lat: Math.max(-85, Math.min(85, tileYToLat(nextCenterY / 256, nextZoom))),
    lon: tileXToLon(nextCenterX / 256, nextZoom),
    zoom: nextZoom
  };

  renderTiles();
  return true;
}

function lockChoices() {
  choices.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
  choices.querySelectorAll(".choice").forEach((choice) => {
    choice.classList.add("is-locked");
  });
}

function renderCompletion() {
  const rate = score.total === 0 ? 0 : Math.round(score.correct / score.total * 100);

  currentPlace = null;
  tileLayer.innerHTML = "";
  choices.innerHTML = "";
  checkButton.disabled = true;
  nextTargetButton.disabled = true;
  roundStatus.textContent = t("completedStatus");
  meta.textContent = t("completedMeta");
  setResult("completedTitle", "completedText", {
    args: [score.total, score.correct, rate, score.points]
  }, "complete");
}

function renderPlace() {
  const nextPlace = getNextPlace();

  if (!nextPlace) {
    renderCompletion();
    return;
  }

  currentPlace = nextPlace;
  currentOptions = createOptions(currentPlace);
  questionAnswered = false;
  navigationActions = 0;
  selectedAnswer = "";
  mapCenter = { ...currentPlace.center };

  scale.textContent = currentPlace.scale;
  refreshRoundText();
  checkButton.disabled = true;
  nextTargetButton.disabled = true;
  form.reset();

  renderChoices();

  setResult("waitingTitle", "waitingText", { args: [] }, "waiting");
  renderTiles();
  renderScore();
}

function resetGame() {
  score = { total: 0, correct: 0, streak: 0, points: 0 };
  createTargetOrder();
  renderScore();
  renderPlace();
}

form.addEventListener("change", () => {
  selectedAnswer = new FormData(form).get("answer") || "";
  checkButton.disabled = questionAnswered || !selectedAnswer;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (questionAnswered || !currentPlace) {
    return;
  }

  const answer = selectedAnswer || new FormData(form).get("answer");
  const isCorrect = answer === currentPlace.answer;
  const penaltyPercent = Math.min(100, navigationActions * 10);
  const placePoints = isCorrect ? Math.max(0, 100 - penaltyPercent) : 0;

  questionAnswered = true;
  score.total += 1;
  score.correct += isCorrect ? 1 : 0;
  score.streak = isCorrect ? score.streak + 1 : 0;
  score.points += placePoints;
  renderScore();
  lockChoices();

  checkButton.disabled = true;
  nextTargetButton.disabled = false;

  if (isCorrect) {
    setResult("correctTitle", "correctText", {
      argsFactory: () => [placeName(currentPlace.answer), navigationActions, penaltyPercent, placePoints]
    }, "correct");
  } else {
    setResult("wrongTitle", "wrongText", {
      argsFactory: () => [placeName(answer), placeName(currentPlace.answer), navigationActions, penaltyPercent]
    }, "wrong");
  }
});

nextTargetButton.addEventListener("click", () => {
  renderPlace();
});

resetGameButton.addEventListener("click", () => {
  resetGame();
});

languageSelect.addEventListener("change", () => {
  currentLanguage = languageSelect.value;
  applyTranslations();
});

window.addEventListener("resize", () => {
  renderTiles();
});

mapPanel.addEventListener("pointerdown", (event) => {
  if (!currentPlace) {
    return;
  }

  event.preventDefault();
  mapPanel.setPointerCapture(event.pointerId);
  mapPanel.classList.add("is-panning");
  panState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    penaltyApplied: false,
    centerPixelX: lonToTileX(mapCenter.lon, mapCenter.zoom) * 256,
    centerPixelY: latToTileY(mapCenter.lat, mapCenter.zoom) * 256
  };
});

mapPanel.addEventListener("pointermove", (event) => {
  if (!panState || panState.pointerId !== event.pointerId) {
    return;
  }

  event.preventDefault();

  const dragX = event.clientX - panState.startX;
  const dragY = event.clientY - panState.startY;
  const dragDistance = Math.hypot(dragX, dragY);
  const nextPixelX = panState.centerPixelX - dragX;
  const nextPixelY = panState.centerPixelY - dragY;

  if (!panState.penaltyApplied && dragDistance >= 4) {
    panState.penaltyApplied = true;
    applyNavigationPenalty();
  }

  mapCenter = {
    lat: Math.max(-85, Math.min(85, tileYToLat(nextPixelY / 256, mapCenter.zoom))),
    lon: tileXToLon(nextPixelX / 256, mapCenter.zoom),
    zoom: mapCenter.zoom
  };

  renderTiles();
});

function endPan(event) {
  if (!panState || panState.pointerId !== event.pointerId) {
    return;
  }

  panState = null;
  mapPanel.classList.remove("is-panning");
}

mapPanel.addEventListener("pointerup", endPan);
mapPanel.addEventListener("pointercancel", endPan);

mapPanel.addEventListener("wheel", (event) => {
  if (!currentPlace) {
    return;
  }

  event.preventDefault();
  const didZoom = zoomMap(event.deltaY < 0 ? 1 : -1, event.clientX, event.clientY);

  if (didZoom) {
    applyNavigationPenalty();
  }
}, { passive: false });

applyTranslations();
resetGame();
