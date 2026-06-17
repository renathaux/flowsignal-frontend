const BASE_URL =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://api.flowsignalfx.com";

const DISPLAY_NAMES = {
  EURUSD: "EURUSD",
  XAUUSD: "XAUUSD"
};

const API_URL = `${BASE_URL}/panel-data`;
// ==============================
// 🌍 LANGUAGE SYSTEM
// ==============================

const LANG = {
  en: {
    // General
    buy: "Buy",
    sell: "Sell",
    confidence: "Confidence",
    wait: "WAIT",
    send: "Send",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    enter: "Enter",
    back: "Back",
    login: "Login",
    unlock: "Unlock",

    // Top controls
    alerts: "Alerts",
    strong: "Strong",
    feedback: "Feedback",
    adminLock: "Admin Lock",
    adminOn: "Admin On",
    fitFullMode: "Fit / Full Mode",

    // Symbols
    gold: "XAUUSD",
    eurusd: "EURUSD",

    // Landing
    features: "Features",
    pricing: "Pricing",
    testimonials: "Testimonials",
    docs: "Docs",
    blog: "Blog",
    getStarted: "Get Started",
    startTrading: "Start Trading Now →",
    viewFeatures: "View Features",
    liveHero: "● LIVE",
    heroLine: "Real-time signals • Smart money concepts • Built for traders",
    heroTitle1: "Smarter Signals.",
    heroTitle2: "Stronger Trades.",
    heroText: "FlowSignal provides real-time trading signals, market structure analysis, and smart money insights to help you trade with confidence.",
    realTimeAlerts: "⚡ Real-time Alerts",
    highAccuracy: "◎ High Accuracy",
    riskManaged: "🛡 Risk Managed",
    activeTraders: "Active Traders",
    signalAccuracy: "Signal Accuracy",
    trustedText: "TRUSTED BY TRADERS WORLDWIDE",

    // Access / login
    accessTitle: "FlowSignal Access",
    accessPlaceholder: "Enter access code",
    adminLoginTitle: "Admin Login",
    adminEmail: "Admin email",
    password: "Password",
    enterEmailPassword: "Enter email and password",
    invalidAdminLogin: "Invalid admin login",
    loginFailed: "Login failed",
    enterAccessCode: "Enter access code",
    invalidCode: "Invalid code ❌",

    // Feedback
    feedbackTitle: "Send Feedback",
    feedbackText: "Tell us what you want improved.",
    feedbackPlaceholder: "Type your feedback here...",
    thanks: "Thank you! Your feedback was sent",

    // Card metrics
    choppy: "CHOPPY",
    medium: "MEDIUM",
    weak: "WEAK",
    neutral: "NEUTRAL",
    mixed: "MIXED",
    trending: "TRENDING",
    strongQuality: "STRONG",
    unknown: "UNKNOWN",
    marketClosed: "MARKET CLOSED",
    noFeed: "NO FEED",
    noTiming: "NO TIMING",
    closed: "CLOSED",

    // Main panel
    smcPlan: "SMC PLAN",
    type: "Type",
    bias: "Bias",
    entry: "Entry",
    sl: "SL",
    tp1: "TP1",
    tp2: "TP2",
    riskReward: "Risk/Reward",
    invalidation: "Invalidation",
    reason: "Reason",
    lastSignal: "Last Signal",

    // Structure panel
    marketStructure: "MARKET STRUCTURE (SMC)",
    trend: "Trend: 1h",
    structure: "Entry: 15m",
    nextStep: "5m:",
    keyLevel: "Key Level:",
    sideways: "SIDEWAYS",
    bullish: "BULLISH",
    bearish: "BEARISH",

    // History
    history: "Recent Signal History",
    noHistory: "No history yet",
    time: "Time",
    symbol: "Symbol",
    signal: "Signal",
    result: "Result",
    pips: "Pips",

    // Modals
    confirmTrade: "Confirm Trade",
    confirmTradeText: "Confirm",
    adminAccess: "Admin Access",
    adminAccessText: "Enter admin code to unlock BUY / SELL.",
    enterAdminCode: "Enter admin code",
    accessRestricted: "Access Restricted",
    tradeAdminOnly: "Trade execution is only available for FlowSignal admin.",

    // Status
    live: "LIVE",
    loadingPanel: "LOADING PANEL",
    cache: "CACHE",
    error: "Error",
    updated: "updated",
    usingLastGoodData: "using last good data"
  },

  fr: {
    // General
    buy: "Achat",
    sell: "Vente",
    confidence: "Confiance",
    wait: "ATTENTE",
    send: "Envoyer",
    cancel: "Annuler",
    confirm: "Confirmer",
    close: "Fermer",
    enter: "Entrer",
    back: "Retour",
    login: "Connexion",
    unlock: "Déverrouiller",

    // Top controls
    alerts: "Alertes",
    strong: "Fort",
    feedback: "Avis",
    adminLock: "Verrou admin",
    adminOn: "Admin activé",
    fitFullMode: "Mode ajusté / plein écran",

    // Symbols
    gold: "XAUUSD",
    eurusd: "EURUSD",

    // Landing
    features: "Fonctions",
    pricing: "Prix",
    testimonials: "Témoignages",
    docs: "Docs",
    blog: "Blog",
    getStarted: "Commencer",
    startTrading: "Commencer à trader →",
    viewFeatures: "Voir les fonctions",
    liveHero: "● EN DIRECT",
    heroLine: "Signaux en temps réel • Smart money concepts • Créé pour les traders",
    heroTitle1: "Signaux plus intelligents.",
    heroTitle2: "Trades plus forts.",
    heroText: "FlowSignal fournit des signaux de trading en temps réel, une analyse de structure du marché et des informations smart money pour vous aider à trader avec confiance.",
    realTimeAlerts: "⚡ Alertes en temps réel",
    highAccuracy: "◎ Haute précision",
    riskManaged: "🛡 Risque géré",
    activeTraders: "Traders actifs",
    signalAccuracy: "Précision des signaux",
    trustedText: "UTILISÉ PAR DES TRADERS DANS LE MONDE",

    // Access / login
    accessTitle: "Accès FlowSignal",
    accessPlaceholder: "Entrer le code d’accès",
    adminLoginTitle: "Connexion admin",
    adminEmail: "Email admin",
    password: "Mot de passe",
    enterEmailPassword: "Entrez l’email et le mot de passe",
    invalidAdminLogin: "Connexion admin invalide",
    loginFailed: "Connexion échouée",
    enterAccessCode: "Entrez le code d’accès",
    invalidCode: "Code invalide ❌",

    // Feedback
    feedbackTitle: "Envoyer un avis",
    feedbackText: "Dites-nous ce que vous voulez améliorer.",
    feedbackPlaceholder: "Écrivez votre message ici...",
    thanks: "Merci ! Votre message a été envoyé",

    // Card metrics
    choppy: "HÉSITANT",
    medium: "MOYEN",
    weak: "FAIBLE",
    neutral: "NEUTRE",
    mixed: "MIXTE",
    trending: "EN TENDANCE",
    strongQuality: "FORT",
    unknown: "INCONNU",
    marketClosed: "MARCHÉ FERMÉ",
    noFeed: "AUCUN FLUX",
    noTiming: "PAS DE TIMING",
    closed: "FERMÉ",

    // Main panel
    smcPlan: "PLAN SMC",
    type: "Type",
    bias: "Biais",
    entry: "Entrée",
    sl: "SL",
    tp1: "TP1",
    tp2: "TP2",
    riskReward: "Risque/Rendement",
    invalidation: "Invalidation",
    reason: "Raison",
    lastSignal: "Dernier signal",

    // Structure panel
    marketStructure: "STRUCTURE DU MARCHÉ (SMC)",
    trend: "Tendance: 1h",
    structure: "Entrée: 15m",
    nextStep: "5m:",
    keyLevel: "Niveau clé:",
    sideways: "LATÉRAL",
    bullish: "HAUSSIER",
    bearish: "BAISSIER",

    // History
    history: "Historique des signaux",
    noHistory: "Aucun historique",
    time: "Heure",
    symbol: "Symbole",
    signal: "Signal",
    result: "Résultat",
    pips: "Pips",

    // Modals
    confirmTrade: "Confirmer le trade",
    confirmTradeText: "Confirmer",
    adminAccess: "Accès admin",
    adminAccessText: "Entrez le code admin pour déverrouiller ACHAT / VENTE.",
    enterAdminCode: "Entrer le code admin",
    accessRestricted: "Accès limité",
    tradeAdminOnly: "L’exécution des trades est seulement disponible pour l’admin FlowSignal.",

    // Status
    live: "EN DIRECT",
    loadingPanel: "CHARGEMENT DU PANEL",
    cache: "CACHE",
    error: "Erreur",
    updated: "mis à jour",
    usingLastGoodData: "utilise les dernières bonnes données"
  },

  es: {
    // General
    buy: "Comprar",
    sell: "Vender",
    confidence: "Confianza",
    wait: "ESPERA",
    send: "Enviar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Cerrar",
    enter: "Entrar",
    back: "Atrás",
    login: "Iniciar sesión",
    unlock: "Desbloquear",

    // Top controls
    alerts: "Alertas",
    strong: "Fuerte",
    feedback: "Comentario",
    adminLock: "Bloqueo admin",
    adminOn: "Admin activado",
    fitFullMode: "Modo ajustar / pantalla completa",

    // Symbols
    gold: "XAUUSD",
    eurusd: "EURUSD",

    // Landing
    features: "Funciones",
    pricing: "Precios",
    testimonials: "Testimonios",
    docs: "Docs",
    blog: "Blog",
    getStarted: "Comenzar",
    startTrading: "Empezar a operar →",
    viewFeatures: "Ver funciones",
    liveHero: "● EN VIVO",
    heroLine: "Señales en tiempo real • Smart money concepts • Creado para traders",
    heroTitle1: "Señales más inteligentes.",
    heroTitle2: "Operaciones más fuertes.",
    heroText: "FlowSignal ofrece señales de trading en tiempo real, análisis de estructura del mercado e información smart money para ayudarte a operar con confianza.",
    realTimeAlerts: "⚡ Alertas en tiempo real",
    highAccuracy: "◎ Alta precisión",
    riskManaged: "🛡 Riesgo gestionado",
    activeTraders: "Traders activos",
    signalAccuracy: "Precisión de señales",
    trustedText: "USADO POR TRADERS EN TODO EL MUNDO",

    // Access / login
    accessTitle: "Acceso FlowSignal",
    accessPlaceholder: "Ingresa el código de acceso",
    adminLoginTitle: "Inicio admin",
    adminEmail: "Email admin",
    password: "Contraseña",
    enterEmailPassword: "Ingresa email y contraseña",
    invalidAdminLogin: "Inicio admin inválido",
    loginFailed: "Inicio fallido",
    enterAccessCode: "Ingresa el código de acceso",
    invalidCode: "Código inválido ❌",

    // Feedback
    feedbackTitle: "Enviar comentario",
    feedbackText: "Dinos qué quieres mejorar.",
    feedbackPlaceholder: "Escribe tu mensaje aquí...",
    thanks: "¡Gracias! Mensaje enviado",

    // Card metrics
    choppy: "IRREGULAR",
    medium: "MEDIO",
    weak: "DÉBIL",
    neutral: "NEUTRAL",
    mixed: "MIXTO",
    trending: "EN TENDENCIA",
    strongQuality: "FUERTE",
    unknown: "DESCONOCIDO",
    marketClosed: "MERCADO CERRADO",
    noFeed: "SIN DATOS",
    noTiming: "SIN TIMING",
    closed: "CERRADO",

    // Main panel
    smcPlan: "PLAN SMC",
    type: "Tipo",
    bias: "Sesgo",
    entry: "Entrada",
    sl: "SL",
    tp1: "TP1",
    tp2: "TP2",
    riskReward: "Riesgo/Recompensa",
    invalidation: "Invalidación",
    reason: "Razón",
    lastSignal: "Última señal",

    // Structure panel
    marketStructure: "ESTRUCTURA DEL MERCADO (SMC)",
    trend: "Tendencia: 1h",
    structure: "Entrada: 15m",
    nextStep: "5m:",
    keyLevel: "Nivel clave:",
    sideways: "LATERAL",
    bullish: "ALCISTA",
    bearish: "BAJISTA",

    // History
    history: "Historial de señales",
    noHistory: "Sin historial",
    time: "Hora",
    symbol: "Símbolo",
    signal: "Señal",
    result: "Resultado",
    pips: "Pips",

    // Modals
    confirmTrade: "Confirmar operación",
    confirmTradeText: "Confirmar",
    adminAccess: "Acceso admin",
    adminAccessText: "Ingresa el código admin para desbloquear COMPRAR / VENDER.",
    enterAdminCode: "Ingresa el código admin",
    accessRestricted: "Acceso restringido",
    tradeAdminOnly: "La ejecución de operaciones solo está disponible para el admin de FlowSignal.",

    // Status
    live: "EN VIVO",
    loadingPanel: "CARGANDO PANEL",
    cache: "CACHÉ",
    error: "Error",
    updated: "actualizado",
    usingLastGoodData: "usando los últimos datos buenos"
  }
};

let currentLang = localStorage.getItem("flowsignal_lang") || "en";
const TRADE_URL = `${BASE_URL}/execute-trade`;

const statusEl = document.getElementById("status");
const utcLabel = document.getElementById("utcLabel");
const alertsToggle = document.getElementById("alertsToggle");
const strongToggle = document.getElementById("strongToggle");

const tradeModal = document.getElementById("tradeModal");
const tradeModalTitle = document.getElementById("tradeModalTitle");
const tradeModalText = document.getElementById("tradeModalText");
const tradeCancelBtn = document.getElementById("tradeCancelBtn");
const tradeConfirmBtn = document.getElementById("tradeConfirmBtn");

const viewToggleBtn = document.getElementById("viewToggleBtn");

const adminUnlockBtn = document.getElementById("adminUnlockBtn");
const adminModal = document.getElementById("adminModal");
const adminCodeInput = document.getElementById("adminCodeInput");
const adminCancelBtn = document.getElementById("adminCancelBtn");
const adminConfirmBtn = document.getElementById("adminConfirmBtn");

const feedbackBtn = document.getElementById("feedbackBtn");
const authScreen = document.getElementById("authScreen");

const accessCodeInput = document.getElementById("accessCode");
const accessBtn = document.getElementById("accessBtn");
const authMsg = document.getElementById("authMsg");
const mainApp = document.getElementById("mainApp");
const dashboardWeeklyPnl = document.getElementById("dashboardWeeklyPnl");
const dashboardFloatingPnl = document.getElementById("dashboardFloatingPnl");
const dashboardOpenTrades = document.getElementById("dashboardOpenTrades");
const dashboardPerformanceStrip = document.querySelector(".performance-strip");
const dashboardAdminCards = document.querySelectorAll(".performance-weekly, .performance-floating, .performance-trades");
const voiceToggleBtn = document.getElementById("voiceToggleBtn");
const menuAssistantBtn = document.getElementById("menuAssistantBtn");
const assistantModal = document.getElementById("assistantModal");
const closeAssistantPanelBtn = document.getElementById("closeAssistantPanelBtn");
const assistantPopupToggle = document.getElementById("assistantPopupToggle");
const flowAssistantSettings = document.getElementById("flowAssistantSettings");
const menuVoiceToggleBtn = document.getElementById("menuVoiceToggleBtn");
const voiceSelect = document.getElementById("voiceSelect");
const testVoiceBtn = document.getElementById("testVoiceBtn");
const voiceSpeed = document.getElementById("voiceSpeed");
const voiceSpeedValue = document.getElementById("voiceSpeedValue");
const voicePitch = document.getElementById("voicePitch");
const voicePitchValue = document.getElementById("voicePitchValue");
const assistantStyle = document.getElementById("assistantStyle");
const streamerVoiceList = document.getElementById("streamerVoiceList");
const streamerVoiceMenu = document.getElementById("streamerVoiceMenu");
const streamerVoiceToggle = document.getElementById("streamerVoiceToggle");
const streamerVoiceEditBtn = document.getElementById("streamerVoiceEditBtn");
const smartExplain = document.getElementById("smartExplain");
const smartExplainTitle = document.getElementById("smartExplainTitle");
const smartExplainSubtitle = document.getElementById("smartExplainSubtitle");
const smartExplainText = document.getElementById("smartExplainText");
const smartExplainDetails = document.getElementById("smartExplainDetails");
const smartExplainState = document.getElementById("smartExplainState");
const smartExplainClose = document.getElementById("smartExplainClose");

const openAccessBtn = document.getElementById("openAccessBtn");
const landingLang = document.getElementById("landingLang");

if (landingLang) {
  landingLang.value = currentLang.toUpperCase();

  landingLang.addEventListener("change", () => {
    const lang = landingLang.value.toLowerCase();

    localStorage.setItem("flowsignal_lang", lang);

    applyLanguage(lang);
    updateAssistantLanguageUI();
    refreshVoiceForCurrentLanguage();
    showAssistantMessage(
      assistantEventMessage("languageChanged"),
      "LANGUAGE"
    );
  });
}
if (openAccessBtn) {
  openAccessBtn.addEventListener("click", () => {
    if (accessBox) accessBox.classList.remove("hidden");
  });
}
const openAdminLoginBtn = document.getElementById("openAdminLoginBtn");
const adminLoginBox = document.getElementById("adminLoginBox");
const adminEmailInput = document.getElementById("adminEmailInput");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const closeAdminLoginBtn = document.getElementById("closeAdminLoginBtn");
const adminLoginMsg = document.getElementById("adminLoginMsg");
const closeAccessBtn = document.getElementById("closeAccessBtn");
const accessBox = document.getElementById("accessBox");
const landingPage = document.getElementById("landingPage");

const accessModal = document.getElementById("accessModal");
const menuToggleBtn = document.getElementById("menuToggleBtn");
const sideMenu = document.getElementById("sideMenu");
const menuFeedbackBtn = document.getElementById("menuFeedbackBtn");
const menuAdminBtn = document.getElementById("menuAdminBtn");
const menuViewBtn = document.getElementById("menuViewBtn");
const menuStatsBtn = document.getElementById("menuStatsBtn");
const paperModal = document.getElementById("paperModal");
const closePaperBtn = document.getElementById("closePaperBtn");
const paperEurusdStatus = document.getElementById("paperEurusdStatus");
const paperGoldStatus = document.getElementById("paperGoldStatus");
const paperHistoryList = document.getElementById("paperHistoryList");
const paperAutoToggleBtn = document.getElementById("paperAutoToggleBtn");
const paperAutoSection = document.getElementById("paperAutoSection");
const liveAutoSection = document.getElementById("liveAutoSection");
const liveAutoToggleBtn = document.getElementById("liveAutoToggleBtn");
const brokerConnectionStatus = document.getElementById("brokerConnectionStatus");
const liveAutoConfirmOverlay = document.getElementById("liveAutoConfirmOverlay");
const liveAutoConfirmMessage = document.getElementById("liveAutoConfirmMessage");
const liveAutoConfirmCancel = document.getElementById("liveAutoConfirmCancel");
const liveAutoConfirmOk = document.getElementById("liveAutoConfirmOk");

const liveActiveList =
  document.getElementById(
    "liveActiveList"
  );

const liveHistoryList =
  document.getElementById(
    "liveHistoryList"
  );

const paperPageBtn =
  document.getElementById("paperPageBtn");

const livePageBtn =
  document.getElementById("livePageBtn");

let executionPage = "paper";

let paperAutoEnabled =
  localStorage.getItem("paper_auto_enabled") === "true";
let liveAutoEnabled =
  false;

let marketDataSourceStatus = null;
let livePrices = {};
let autoTradeStatus = null;
let liveAutoStatusBySymbol = {};

let liveConnectionState = {
  connected: false,
  mode: "broker"
};

function getLastSaturday5pmMs() {
  const now = new Date();

  const reset = new Date(now);
  reset.setHours(17, 0, 0, 0);

  const day = now.getDay();
  const daysSinceSaturday = (day + 1) % 7;

  reset.setDate(now.getDate() - daysSinceSaturday);

  if (now.getDay() === 6 && now < reset) {
    reset.setDate(reset.getDate() - 7);
  }

  return reset.getTime();
}

const RESET_KEY = "paper_reset_time";

function resetLegacyPaperLocalStorage() {
  const lastReset = Number(localStorage.getItem(RESET_KEY) || 0);
  const currentReset = getLastSaturday5pmMs();

  if (currentReset <= lastReset) return;

  let history = [];

  try {
    history = JSON.parse(
      localStorage.getItem("paper_trade_history") || "[]"
    );
  } catch (err) {
    history = [];
  }

  const keepOpenTrades = history.filter((t) => {
    const result = String(t.result || "").toUpperCase();
    const status = String(t.status || "").toUpperCase();

    return (
      result === "RUNNING" ||
      result === "TP1 HIT" ||
      status === "OPEN"
    );
  });

  localStorage.setItem(
    "paper_trade_history",
    JSON.stringify(keepOpenTrades)
  );

  localStorage.setItem(
    "paper_trade_stats",
    JSON.stringify({
      wins: 0,
      losses: 0,
      running: keepOpenTrades.length,
      total: keepOpenTrades.length
    })
  );

  localStorage.setItem(RESET_KEY, currentReset);

  console.log("PAPER LOCAL WEEKLY RESET:", {
    removed: history.length - keepOpenTrades.length,
    keptOpen: keepOpenTrades.length
  });
}

resetLegacyPaperLocalStorage();

let autoTradeFilter = "ALL";
const menuPaperBtn = document.getElementById("menuPaperBtn");

const statsModal = document.getElementById("statsModal");
const totalVisitorsCount = document.getElementById("totalVisitorsCount");
const closeStatsBtn = document.getElementById("closeStatsBtn");
const uniqueVisitorsCount = document.getElementById("uniqueVisitorsCount");
const todayVisitsCount = document.getElementById("todayVisitsCount");
const lastVisitTime = document.getElementById("lastVisitTime");
const countryStats = document.getElementById("countryStats");

if (closeAccessBtn) {
  closeAccessBtn.addEventListener("click", () => {
    if (accessBox) accessBox.classList.add("hidden");
  });
}
// ==============================
// ACCESS CODE SYSTEM
// ==============================

const ACCESS_CODE = "FLOWTEST";
if (openAdminLoginBtn) {
  openAdminLoginBtn.addEventListener("click", () => {
    if (accessBox) accessBox.classList.add("hidden");
    if (adminLoginBox) adminLoginBox.classList.remove("hidden");
  });
}

if (closeAdminLoginBtn) {
  closeAdminLoginBtn.addEventListener("click", () => {
    if (adminLoginBox) adminLoginBox.classList.add("hidden");
    if (adminLoginMsg) adminLoginMsg.textContent = "";
  });
}

if (adminLoginBtn) {
  adminLoginBtn.addEventListener("click", async () => {
    const email = adminEmailInput ? adminEmailInput.value.trim() : "";
    const password = adminPasswordInput ? adminPasswordInput.value.trim() : "";

    if (!email || !password) {
      if (adminLoginMsg) adminLoginMsg.textContent = "Enter email and password";
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.ok && data.role === "admin") {
        localStorage.setItem("flowsignal_access", JSON.stringify({
          granted: true,
          time: Date.now()
        }));
        localStorage.setItem("flowsignal_role", "admin");
        updatePnlVisibility();


      if (menuStatsBtn) {
          menuStatsBtn.classList.remove("hidden");
        }

        if (menuPaperBtn) {
          menuPaperBtn.classList.remove("hidden");
        }

        if (adminLoginBox) adminLoginBox.classList.add("hidden");

        if (landingPage) {
          landingPage.classList.add("hidden");
          landingPage.style.display = "none";
        }

        if (mainApp) {
          mainApp.classList.remove("hidden");
          mainApp.classList.remove("locked");
          mainApp.style.display = "flex";
        }

        setTimeout(() => {
          bootMainApp();
        }, 120);
      } else {
        if (adminLoginMsg) adminLoginMsg.textContent = "Invalid admin login";
      }
    } catch (err) {
      console.error(err);
      if (adminLoginMsg) adminLoginMsg.textContent = "Login failed";
    }
  });
}

if (closeAccessBtn) {
  closeAccessBtn.addEventListener("click", () => {
    if (accessModal) accessModal.classList.add("hidden");
    setAuthMessage("");
  });
}

if (accessBtn) {
  accessBtn.addEventListener("click", () => {
    const code = accessCodeInput?.value.trim();

    if (!code) {
      setAuthMessage("Enter access code", true);
      return;
    }

    console.log("INPUT:", code);
    console.log("EXPECTED:", ACCESS_CODE);

    if (code === ACCESS_CODE) {

  console.log("ACCESS GRANTED");

  localStorage.setItem("flowsignal_access", JSON.stringify({
    granted: true,
    time: Date.now()
  }));
  localStorage.setItem("flowsignal_role", "user");
  updatePnlVisibility();

  setAuthMessage("");

  // CLOSE BOXES
  if (accessBox) accessBox.classList.add("hidden");
  if (adminLoginBox) adminLoginBox.classList.add("hidden");

  // HIDE LANDING PAGE (IMPORTANT)
  if (landingPage) {
    landingPage.classList.add("hidden");
    landingPage.style.display = "none";
  }

  // SHOW APP (VERY IMPORTANT)
  if (mainApp) {
    mainApp.classList.remove("hidden");
    mainApp.classList.remove("locked");
    mainApp.style.display = "flex";
  }

  setTimeout(() => {
    bootMainApp();
  }, 100);
    } else {
      setAuthMessage("Invalid code ❌", true);
    }
  });
}

if (accessCodeInput) {
  accessCodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      accessBtn.click();
    }
  });
}


// =========================
// SMOOTH BAR ENGINE
// =========================
const _BAR_STATE = {};
let _BAR_ANIMATING = false;
let _BAR_IDLE_PHASE = 0;
let _BAR_IDLE_TIMER = null;

function animateBars() {
  let moving = false;

  Object.keys(_BAR_STATE).forEach((key) => {
    const s = _BAR_STATE[key];
    const diff = s.target - s.current;
    const isMoving = Math.abs(diff) >= 0.2;

    if (!isMoving) {
      s.current = s.target;
    } else {
      s.current += diff * 0.12;
      moving = true;
    }

    let visual = s.current;

    if (!isMoving) {
      const wave = Math.sin((_BAR_IDLE_PHASE + key.length) * 0.9) * 0.8;
      visual = Math.max(0, Math.min(100, s.current + wave));
    }

    const width = `${visual}%`;

    if (s.main) s.main.style.width = width;
    if (s.glow) s.glow.style.width = width;
  });

  if (moving) {
    requestAnimationFrame(animateBars);
  } else {
    _BAR_ANIMATING = false;
  }
}

function setSmoothBar(symbol, type, pct, immediate = false) {
  const key = `${symbol}_${type}`;

  const main = document.getElementById(`${symbol.toLowerCase()}-${type}-fill`);
  const glow = document.getElementById(`${symbol.toLowerCase()}-${type}-fill-glow`);

  if (!main && !glow) return;

  if (!_BAR_STATE[key]) {
    _BAR_STATE[key] = {
      current: pct,
      target: pct,
      main,
      glow
    };
  }

  const s = _BAR_STATE[key];
  s.main = main;
  s.glow = glow;
  s.target = pct;

  if (immediate) {
    s.current = pct;
    const width = `${pct}%`;
    if (main) main.style.width = width;
    if (glow) glow.style.width = width;
    return;
  }

  if (!_BAR_ANIMATING) {
    _BAR_ANIMATING = true;
    requestAnimationFrame(animateBars);
  }
}

const lastSignals = {
  EURUSD: null,
  XAUUSD: null
};

let pendingTrade = null;
let panelRefreshInProgress = false;
let isAdminUnlocked = false;
const ADMIN_CODE = "nathaux123";

function isAdminAccount() {
  return localStorage.getItem("flowsignal_role") === "admin";
}

function updatePnlVisibility() {
  const showPnl = isAdminAccount();

  dashboardAdminCards.forEach((card) => {
    card.classList.toggle("admin-only-hidden", !showPnl);
  });

  if (dashboardPerformanceStrip) {
    dashboardPerformanceStrip.classList.toggle("user-no-pnl", !showPnl);
  }

  if (mainApp) {
    mainApp.classList.toggle("user-no-performance", !showPnl);
  }

  const livePnlCardRow = document.getElementById("livePnlCardRow");

  if (livePnlCardRow) {
    livePnlCardRow.classList.toggle("hidden", !showPnl);
  }
}

let latestRawPanelData = null;
let latestPanelFetchedAt = 0;
let lastGoodPanelData = null;
let latestPanelData = null;
let lastLiveOrderKey = null;
let activeLiveOrders = {
  EURUSD: null,
  XAUUSD: null
};
let liveTradeHistory = [];
let liveTradeStats = {
  total_today: 0,
  wins: 0,
  losses: 0,
  running: 0,
  closed: 0,
  total_pl: 0,
  total_pnl: 0,
  weekly_realized_pl: 0,
  floating_live_pl: 0,
  weekly_total_pl: 0
};

const VOICE_COOLDOWN_MS = 10000;
const ASSISTANT_REPEAT_MS = 20000;
const ASSISTANT_CLICK_DEBOUNCE_MS = 320;
const VOICE_STORAGE = {
  enabled: "flowsignal_voice_enabled",
  name: "flowsignal_voice_name",
  rate: "flowsignal_voice_speed",
  pitch: "flowsignal_voice_pitch",
  style: "flowsignal_assistant_style",
  popup: "flowsignal_assistant_popup",
  streamerMessages: "flowsignal_streamer_voice_messages",
  streamerOpen: "flowsignal_streamer_voice_open"
};
const VOICE_DEFAULTS = {
  rate: 0.9,
  pitch: 1.05,
  volume: 1,
  style: "calm"
};
const VOICE_STYLE_TUNING = {
  calm: { rate: 1, pitch: 1 },
  confident: { rate: 1.02, pitch: 1 },
  hype: { rate: 1.08, pitch: 1.06 },
  professional: { rate: 1, pitch: 0.96 }
};
const VOICE_PREFERRED_NAMES = [
  "Google UK English Female",
  "Victoria",
  "Karen",
  "Google US English",
  "Alex"
];
const ASSISTANT_LOCALES = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES"
};
const ASSISTANT_COPY = {
  en: {
    panelTitle: "Market Voice",
    settings: "Voice Settings",
    voice: "Voice",
    testVoice: "Test Voice",
    showPopup: "Show text popup",
    speed: "Voice speed",
    pitch: "Voice pitch",
    style: "Assistant style",
    styles: ["Calm", "Confident", "Hype", "Professional"],
    stopVoice: "Stop Voice",
    closePanel: "Close Panel",
    voiceOn: "Voice ON",
    voiceOff: "Voice OFF",
    voiceOnMessage: "Perfect. I’ll keep you updated.",
    voiceOffMessage: "Okay, I’ll stay quiet.",
    testMessage: "Welcome back to FlowSignal. I'm watching the market for you.",
    wait: "{symbol} is waiting. No clean setup yet.",
    holdBuy: "The trend is still bullish, but the fresh entry is gone.",
    holdSell: "The trend is still bearish, but the fresh entry is gone.",
    freshBuy: "Okay... {symbol} has a fresh buy setup.",
    freshSell: "Careful... {symbol} has a fresh sell setup.",
    blocked: "Execution is blocked because {reason}.",
    blockedEvent: "{symbol} has a {side} signal, but execution is blocked because {reason}.",
    riskBlocked: "broker risk is {actual}, above the {maximum} limit",
    blockedReasons: {
      distance: "the minimum stop loss distance is not met",
      volume: "broker volume safety rejected the risk",
      running: "a trade is already running",
      disconnected: "the broker is disconnected",
      safety: "a safety check did not pass"
    },
    buyAutoOff: "{symbol} has a buy setup, but live auto is off.",
    sellAutoOff: "{symbol} has a sell setup, but live auto is off.",
    chart: "{symbol}, on the {timeframe} chart, is {direction}. I’m waiting for {waiting} before a trade.",
    waiting: {
      candle: "a clean confirmation candle",
      choch: "a confirmed change of character",
      bos: "a confirmed structure break",
      swing: "a closed candle beyond the swing level",
      structure: "a clean structure break and candle close"
    },
    executed: "{symbol} {side} trade confirmed. We’re in.",
    activeTrade: "{symbol} has an active {side} trade.",
    tp1: "Nice. {symbol} reached the first target.",
    tp1Protected: "Nice. {symbol} reached the first target and stop loss is protected.",
    protected: "{symbol} stop loss is protected now.",
    win: "{symbol} trade closed in profit.",
    loss: "{symbol} trade closed in loss.",
    gold: "gold",
    euro: "euro dollar",
    directions: { bullish: "bullish", bearish: "bearish", sideways: "sideways", unclear: "unclear" },
    timeframes: { "5m": "five minute", "15m": "fifteen minute", "1h": "one hour" },
    languageChanged: "Language changed to English.",
    paperAuto: "Paper auto is {state}.",
    liveAuto: "Live auto is {state}.",
    on: "on",
    off: "off",
    assistant: "Assistant",
    manualBuy: "Okay... manual buy selected for {symbol}.",
    manualSell: "Okay... manual sell selected for {symbol}."
  },
  fr: {
    panelTitle: "Voix du marché",
    settings: "Réglages de la voix",
    voice: "Voix",
    testVoice: "Tester la voix",
    showPopup: "Afficher la fenêtre de texte",
    speed: "Vitesse de la voix",
    pitch: "Tonalité de la voix",
    style: "Style de l’assistant",
    styles: ["Calme", "Assuré", "Énergique", "Professionnel"],
    stopVoice: "Arrêter la voix",
    closePanel: "Fermer",
    voiceOn: "Voix ACTIVÉE",
    voiceOff: "Voix DÉSACTIVÉE",
    voiceOnMessage: "Parfait. Je vous tiendrai au courant.",
    voiceOffMessage: "D’accord, je reste silencieux.",
    testMessage: "Bienvenue sur FlowSignal. Je surveille le marché pour vous.",
    wait: "{symbol} est en attente. Aucune configuration claire pour le moment.",
    holdBuy: "La tendance reste haussière, mais l’entrée récente est passée.",
    holdSell: "La tendance reste baissière, mais l’entrée récente est passée.",
    freshBuy: "D’accord... {symbol} présente une nouvelle configuration d’achat.",
    freshSell: "Attention... {symbol} montre maintenant une pression vendeuse.",
    blocked: "L’exécution est bloquée parce que {reason}.",
    blockedEvent: "{symbol} présente un signal de {side}, mais l’exécution est bloquée parce que {reason}.",
    riskBlocked: "le risque du courtier est de {actual}, au-dessus de la limite de {maximum}",
    blockedReasons: {
      distance: "la distance minimale du stop loss n’est pas respectée",
      volume: "la sécurité du volume du courtier a refusé le risque",
      running: "un trade est déjà en cours",
      disconnected: "le courtier est déconnecté",
      safety: "un contrôle de sécurité n’est pas validé"
    },
    buyAutoOff: "{symbol} présente un achat, mais le trading automatique réel est désactivé.",
    sellAutoOff: "{symbol} présente une vente, mais le trading automatique réel est désactivé.",
    chart: "{symbol}, sur le graphique de {timeframe}, est {direction}. J’attends {waiting} avant un trade.",
    waiting: {
      candle: "une bougie de confirmation claire",
      choch: "un changement de caractère confirmé",
      bos: "une cassure de structure confirmée",
      swing: "une clôture au-delà du niveau de swing",
      structure: "une cassure de structure avec clôture confirmée"
    },
    executed: "Trade {side} confirmé sur {symbol}. Nous sommes en position.",
    activeTrade: "{symbol} a un trade {side} actif.",
    tp1: "Bien. {symbol} a atteint le premier objectif.",
    tp1Protected: "Bien. {symbol} a atteint le premier objectif et le stop est protégé.",
    protected: "Le stop loss de {symbol} est maintenant protégé.",
    win: "Le trade sur {symbol} est clôturé en profit.",
    loss: "Le trade sur {symbol} est clôturé en perte.",
    gold: "l’or",
    euro: "l’euro dollar",
    directions: { bullish: "haussier", bearish: "baissier", sideways: "latéral", unclear: "incertain" },
    timeframes: { "5m": "cinq minutes", "15m": "quinze minutes", "1h": "une heure" },
    languageChanged: "La langue est maintenant le français.",
    paperAuto: "Le trading automatique papier est {state}.",
    liveAuto: "Le trading automatique réel est {state}.",
    on: "activé",
    off: "désactivé",
    assistant: "Assistant",
    manualBuy: "D’accord... achat manuel sélectionné pour {symbol}.",
    manualSell: "D’accord... vente manuelle sélectionnée pour {symbol}."
  },
  es: {
    panelTitle: "Voz del mercado",
    settings: "Ajustes de voz",
    voice: "Voz",
    testVoice: "Probar voz",
    showPopup: "Mostrar ventana de texto",
    speed: "Velocidad de voz",
    pitch: "Tono de voz",
    style: "Estilo del asistente",
    styles: ["Calmado", "Seguro", "Enérgico", "Profesional"],
    stopVoice: "Detener voz",
    closePanel: "Cerrar",
    voiceOn: "Voz ACTIVADA",
    voiceOff: "Voz DESACTIVADA",
    voiceOnMessage: "Perfecto. Te mantendré informado.",
    voiceOffMessage: "De acuerdo, me quedaré en silencio.",
    testMessage: "Bienvenido a FlowSignal. Estoy vigilando el mercado por ti.",
    wait: "{symbol} está en espera. Todavía no hay una configuración clara.",
    holdBuy: "La tendencia sigue alcista, pero la entrada reciente ya pasó.",
    holdSell: "La tendencia sigue bajista, pero la entrada reciente ya pasó.",
    freshBuy: "Bien... {symbol} muestra una nueva configuración de compra.",
    freshSell: "Cuidado... {symbol} muestra presión vendedora ahora.",
    blocked: "La ejecución está bloqueada porque {reason}.",
    blockedEvent: "{symbol} tiene una señal de {side}, pero la ejecución está bloqueada porque {reason}.",
    riskBlocked: "el riesgo del bróker es {actual}, por encima del límite de {maximum}",
    blockedReasons: {
      distance: "no se cumple la distancia mínima del stop loss",
      volume: "la seguridad de volumen del bróker rechazó el riesgo",
      running: "ya hay una operación activa",
      disconnected: "el bróker está desconectado",
      safety: "no se aprobó una comprobación de seguridad"
    },
    buyAutoOff: "{symbol} tiene una compra, pero el trading automático real está desactivado.",
    sellAutoOff: "{symbol} tiene una venta, pero el trading automático real está desactivado.",
    chart: "{symbol}, en el gráfico de {timeframe}, está {direction}. Estoy esperando {waiting} antes de operar.",
    waiting: {
      candle: "una vela de confirmación clara",
      choch: "un cambio de carácter confirmado",
      bos: "una ruptura de estructura confirmada",
      swing: "un cierre más allá del nivel de swing",
      structure: "una ruptura de estructura con cierre confirmado"
    },
    executed: "Operación de {side} confirmada en {symbol}. Ya estamos dentro.",
    activeTrade: "{symbol} tiene una operación de {side} activa.",
    tp1: "Bien. {symbol} alcanzó el primer objetivo.",
    tp1Protected: "Bien. {symbol} alcanzó el primer objetivo y el stop está protegido.",
    protected: "El stop loss de {symbol} ya está protegido.",
    win: "La operación de {symbol} cerró con ganancia.",
    loss: "La operación de {symbol} cerró con pérdida.",
    gold: "el oro",
    euro: "el euro dólar",
    directions: { bullish: "alcista", bearish: "bajista", sideways: "lateral", unclear: "indefinido" },
    timeframes: { "5m": "cinco minutos", "15m": "quince minutos", "1h": "una hora" },
    languageChanged: "El idioma cambió a español.",
    paperAuto: "El trading automático de prueba está {state}.",
    liveAuto: "El trading automático real está {state}.",
    on: "activado",
    off: "desactivado",
    assistant: "Asistente",
    manualBuy: "Bien... compra manual seleccionada para {symbol}.",
    manualSell: "Bien... venta manual seleccionada para {symbol}."
  }
};

const VOICE_EVENT_PRIORITY = {
  BROKER_DISCONNECTED: 130,
  BROKER_CONNECTED: 125,
  MARKET_CLOSED: 120,
  WIN: 110,
  LOSS: 110,
  TP2: 100,
  TP1: 95,
  PROTECTED: 90,
  EXECUTED: 85,
  BLOCKED: 80,
  HIGH_CONFIDENCE: 65,
  STRONG_MOMENTUM: 62,
  BUY: 60,
  SELL: 60,
  HOLD: 45,
  WAIT: 30,
  USER_ACTION: 20,
  APP_OPENED: 10
};

const VOICE_LIBRARY = {
  en: {
    brokerDisconnected: [
      "I've lost connection to the broker.",
      "Broker connection is unavailable right now."
    ],
    brokerConnected: [
      "Broker connection restored.",
      "We're connected again."
    ],
    marketClosed: [
      "The market is currently closed.",
      "I'll resume monitoring when the market reopens."
    ],
    executed: [
      "Trade confirmed. We're in.",
      "Position opened successfully.",
      "We have an active trade.",
      "Execution confirmed."
    ],
    activeTrade: [
      "{symbol} already has an active trade.",
      "{symbol} is already running a position.",
      "An active trade is already open on {symbol}."
    ],
    blocked: [
      "I found a setup, but I can't take it right now.",
      "The signal is there, but something is blocking execution.",
      "I see the opportunity, but a safety check stopped it.",
      "The setup looks valid, but execution isn't allowed yet."
    ],
    tp1: [
      "Nice. First target reached.",
      "TP1 has been secured.",
      "Good start. First target completed."
    ],
    protected: [
      "Stop loss is protected now.",
      "The trade is protected.",
      "We've locked in protection."
    ],
    tp2: [
      "Excellent. Final target reached.",
      "We got the full move.",
      "Target achieved."
    ],
    win: [
      "Trade closed in profit.",
      "Nice result.",
      "That one finished green.",
      "Another winning trade."
    ],
    loss: [
      "Trade closed at a loss.",
      "That one didn't work out.",
      "Small loss. We'll wait for the next setup."
    ],
    buySetup: [
      "Okay... {symbol} is starting to look bullish.",
      "I'm seeing a fresh buy opportunity on {symbol}.",
      "Momentum is building to the upside on {symbol}.",
      "{symbol} is getting interesting.",
      "We may have a buy developing on {symbol}."
    ],
    sellSetup: [
      "Careful... I'm seeing growing sell pressure on {symbol}.",
      "{symbol} is starting to lean bearish.",
      "A fresh sell setup is forming on {symbol}.",
      "Momentum is shifting to the downside on {symbol}.",
      "We may have a sell opportunity on {symbol}."
    ],
    highConfidence: [
      "This setup looks strong.",
      "Confidence is increasing.",
      "This one deserves attention."
    ],
    strongMomentum: [
      "Momentum is accelerating.",
      "This move is gaining strength.",
      "Pressure is building quickly."
    ],
    holdBuy: [
      "The trend is still bullish, but the entry is no longer fresh.",
      "I still like the direction, but we're a bit late now.",
      "The move is active, but I don't see a new entry.",
      "The trend remains healthy, but I need a fresh setup."
    ],
    holdSell: [
      "The trend is still bearish, but the entry is no longer fresh.",
      "The move is active, but we're late to the entry.",
      "I still like the downside, but I need a new setup."
    ],
    wait: [
      "{symbol} is waiting. No clean setup yet.",
      "Not ready yet. I need a little more confirmation.",
      "There's movement, but I don't have an entry yet.",
      "I'm staying patient on this one.",
      "Nothing actionable right now."
    ],
    liveAutoOn: [
      "Perfect. Live trading is active.",
      "I'm ready to execute valid setups.",
      "Live mode is on. I'll let you know when something appears."
    ],
    liveAutoOff: [
      "Live trading is off. I'll keep monitoring the market.",
      "No problem. I'll watch the market without trading.",
      "Live execution is disabled for now."
    ],
    paperAutoOn: [
      "Paper auto is active.",
      "Paper mode is ready to track valid setups."
    ],
    paperAutoOff: [
      "Paper auto is off.",
      "Paper mode is disabled for now."
    ],
    voiceOn: [
      "I'm back.",
      "Voice notifications are active.",
      "I'll keep you updated."
    ],
    voiceOff: [
      "Okay. I'll stay quiet.",
      "Understood. Voice notifications are off."
    ],
    languageChanged: [
      "Language updated.",
      "Your language preference has been changed."
    ],
    manualBuy: [
      "Manual buy selected.",
      "You've chosen a buy position."
    ],
    manualSell: [
      "Manual sell selected.",
      "You've chosen a sell position."
    ],
    goldClicked: [
      "I'm watching gold.",
      "Let's take a look at gold."
    ],
    euroClicked: [
      "I'm watching euro dollar.",
      "Let's take a look at euro dollar."
    ],
    appOpened: [
      "Welcome back. I'm watching the market for you.",
      "Good to see you again. Let's see what the market gives us.",
      "Everything is ready. I'm monitoring both markets."
    ]
  },
  fr: {
    brokerDisconnected: ["J'ai perdu la connexion au courtier.", "La connexion au courtier est indisponible."],
    brokerConnected: ["Connexion au courtier rétablie.", "Nous sommes reconnectés."],
    marketClosed: ["Le marché est actuellement fermé.", "Je reprendrai la surveillance à la réouverture."],
    executed: ["Trade confirmé. Nous sommes en position.", "Position ouverte avec succès.", "Nous avons un trade actif.", "Exécution confirmée."],
    activeTrade: ["{symbol} a déjà un trade actif.", "{symbol} a déjà une position en cours.", "Un trade actif est déjà ouvert sur {symbol}."],
    blocked: ["J'ai trouvé un setup, mais je ne peux pas le prendre maintenant.", "Le signal est là, mais quelque chose bloque l'exécution.", "Je vois l'opportunité, mais une sécurité l'a arrêtée.", "Le setup semble valide, mais l'exécution n'est pas encore autorisée."],
    tp1: ["Bien. Premier objectif atteint.", "TP1 est sécurisé.", "Bon départ. Premier objectif terminé."],
    protected: ["Le stop loss est maintenant protégé.", "Le trade est protégé.", "La protection est verrouillée."],
    tp2: ["Excellent. Objectif final atteint.", "Nous avons pris tout le mouvement.", "Objectif atteint."],
    win: ["Trade clôturé en profit.", "Beau résultat.", "Celui-là finit vert.", "Encore un trade gagnant."],
    loss: ["Trade clôturé en perte.", "Celui-là n'a pas fonctionné.", "Petite perte. Nous attendrons le prochain setup."],
    buySetup: ["D'accord... {symbol} commence à devenir haussier.", "Je vois une nouvelle opportunité d'achat sur {symbol}.", "Le momentum monte vers le haut sur {symbol}.", "{symbol} devient intéressant.", "Nous avons peut-être un achat en formation sur {symbol}."],
    sellSetup: ["Attention... je vois une pression vendeuse grandir sur {symbol}.", "{symbol} commence à pencher baissier.", "Une nouvelle vente se forme sur {symbol}.", "Le momentum bascule vers le bas sur {symbol}.", "Nous avons peut-être une vente sur {symbol}."],
    highConfidence: ["Ce setup semble solide.", "La confiance augmente.", "Celui-ci mérite de l'attention."],
    strongMomentum: ["Le momentum accélère.", "Ce mouvement prend de la force.", "La pression monte rapidement."],
    holdBuy: ["La tendance reste haussière, mais l'entrée n'est plus fraîche.", "J'aime encore la direction, mais nous sommes un peu en retard.", "Le mouvement est actif, mais je ne vois pas de nouvelle entrée.", "La tendance reste saine, mais il me faut un nouveau setup."],
    holdSell: ["La tendance reste baissière, mais l'entrée n'est plus fraîche.", "Le mouvement est actif, mais l'entrée est tardive.", "J'aime encore la baisse, mais il me faut un nouveau setup."],
    wait: ["{symbol} attend. Aucun setup clair pour le moment.", "Pas encore prêt. Il me faut un peu plus de confirmation.", "Il y a du mouvement, mais pas encore d'entrée.", "Je reste patient sur celui-ci.", "Rien d'actionnable pour le moment."],
    liveAutoOn: ["Parfait. Le trading réel est actif.", "Je suis prêt à exécuter les setups valides.", "Le mode réel est activé. Je vous dirai quand quelque chose apparaît."],
    liveAutoOff: ["Le trading réel est désactivé. Je continue de surveiller le marché.", "Aucun problème. Je surveille sans trader.", "L'exécution réelle est désactivée pour l'instant."],
    paperAutoOn: ["Le trading papier est actif.", "Le mode papier est prêt à suivre les setups valides."],
    paperAutoOff: ["Le trading papier est désactivé.", "Le mode papier est désactivé pour l'instant."],
    voiceOn: ["Je suis de retour.", "Les notifications vocales sont actives.", "Je vous tiendrai au courant."],
    voiceOff: ["D'accord. Je reste silencieux.", "Compris. Les notifications vocales sont désactivées."],
    languageChanged: ["Langue mise à jour.", "Votre préférence de langue a été modifiée."],
    manualBuy: ["Achat manuel sélectionné.", "Vous avez choisi une position acheteuse."],
    manualSell: ["Vente manuelle sélectionnée.", "Vous avez choisi une position vendeuse."],
    goldClicked: ["Je surveille l'or.", "Regardons l'or."],
    euroClicked: ["Je surveille l'euro dollar.", "Regardons l'euro dollar."],
    appOpened: ["Bon retour. Je surveille le marché pour vous.", "Content de vous revoir. Voyons ce que le marché donne.", "Tout est prêt. Je surveille les deux marchés."]
  },
  es: {
    brokerDisconnected: ["Perdí la conexión con el bróker.", "La conexión con el bróker no está disponible ahora."],
    brokerConnected: ["Conexión con el bróker restaurada.", "Estamos conectados otra vez."],
    marketClosed: ["El mercado está cerrado ahora.", "Volveré a vigilar cuando el mercado abra."],
    executed: ["Operación confirmada. Ya estamos dentro.", "Posición abierta correctamente.", "Tenemos una operación activa.", "Ejecución confirmada."],
    activeTrade: ["{symbol} ya tiene una operación activa.", "{symbol} ya tiene una posición en curso.", "Ya hay una operación abierta en {symbol}."],
    blocked: ["Encontré un setup, pero no puedo tomarlo ahora.", "La señal está ahí, pero algo bloquea la ejecución.", "Veo la oportunidad, pero una seguridad la detuvo.", "El setup parece válido, pero la ejecución todavía no está permitida."],
    tp1: ["Bien. Primer objetivo alcanzado.", "TP1 está asegurado.", "Buen inicio. Primer objetivo completado."],
    protected: ["El stop loss ya está protegido.", "La operación está protegida.", "Hemos bloqueado la protección."],
    tp2: ["Excelente. Objetivo final alcanzado.", "Tomamos todo el movimiento.", "Objetivo alcanzado."],
    win: ["Operación cerrada en ganancia.", "Buen resultado.", "Esta terminó en verde.", "Otra operación ganadora."],
    loss: ["Operación cerrada en pérdida.", "Esta no funcionó.", "Pérdida pequeña. Esperaremos el próximo setup."],
    buySetup: ["Bien... {symbol} empieza a verse alcista.", "Veo una nueva oportunidad de compra en {symbol}.", "El impulso sube hacia arriba en {symbol}.", "{symbol} se está poniendo interesante.", "Puede que tengamos una compra formándose en {symbol}."],
    sellSetup: ["Cuidado... veo presión vendedora creciendo en {symbol}.", "{symbol} empieza a inclinarse bajista.", "Se está formando una nueva venta en {symbol}.", "El impulso cambia hacia abajo en {symbol}.", "Puede que tengamos una venta en {symbol}."],
    highConfidence: ["Este setup se ve fuerte.", "La confianza está aumentando.", "Este merece atención."],
    strongMomentum: ["El impulso está acelerando.", "Este movimiento gana fuerza.", "La presión crece rápido."],
    holdBuy: ["La tendencia sigue alcista, pero la entrada ya no es fresca.", "Todavía me gusta la dirección, pero ya vamos tarde.", "El movimiento sigue activo, pero no veo una nueva entrada.", "La tendencia sigue sana, pero necesito un setup fresco."],
    holdSell: ["La tendencia sigue bajista, pero la entrada ya no es fresca.", "El movimiento sigue activo, pero llegamos tarde a la entrada.", "Todavía me gusta la baja, pero necesito un nuevo setup."],
    wait: ["{symbol} está esperando. No hay setup claro todavía.", "Aún no está listo. Necesito un poco más de confirmación.", "Hay movimiento, pero todavía no tengo entrada.", "Me mantengo paciente en este.", "Nada accionable por ahora."],
    liveAutoOn: ["Perfecto. Trading real activo.", "Estoy listo para ejecutar setups válidos.", "Modo real activado. Te avisaré cuando aparezca algo."],
    liveAutoOff: ["Trading real apagado. Seguiré vigilando el mercado.", "Sin problema. Vigilaré el mercado sin operar.", "La ejecución real está desactivada por ahora."],
    paperAutoOn: ["Paper auto está activo.", "El modo de prueba está listo para seguir setups válidos."],
    paperAutoOff: ["Paper auto está apagado.", "El modo de prueba está desactivado por ahora."],
    voiceOn: ["Estoy de vuelta.", "Las notificaciones de voz están activas.", "Te mantendré informado."],
    voiceOff: ["De acuerdo. Me quedaré en silencio.", "Entendido. Las notificaciones de voz están desactivadas."],
    languageChanged: ["Idioma actualizado.", "Tu preferencia de idioma ha cambiado."],
    manualBuy: ["Compra manual seleccionada.", "Elegiste una posición de compra."],
    manualSell: ["Venta manual seleccionada.", "Elegiste una posición de venta."],
    goldClicked: ["Estoy mirando oro.", "Veamos oro."],
    euroClicked: ["Estoy mirando euro dólar.", "Veamos euro dólar."],
    appOpened: ["Bienvenido de vuelta. Estoy vigilando el mercado por ti.", "Me alegra verte otra vez. Veamos qué nos da el mercado.", "Todo está listo. Estoy vigilando ambos mercados."]
  }
};
const speechSynthesisSupported =
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;

const streamerVoiceTitles = {
  en: "Streamer Voice",
  fr: "Voix Streamer",
  es: "Voz Streamer"
};

const streamerVoiceHotkeyOrder = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "space",
  "spaceDouble"
];

const streamerVoiceHotkeyLabels = {
  space: "Space",
  spaceDouble: "Space x2"
};

const streamerVoiceMessagesByLang = {
  en: {
    "1": "Welcome to FlowSignal, let’s watch the market together.",
    "2": "Please like the live if you enjoy the signals.",
    "3": "Follow the page so you don’t miss the next setup.",
    "4": "We are waiting for a clean opportunity.",
    "5": "No rush, patience is part of trading.",
    "6": "Let’s see if the market gives confirmation.",
    "7": "Drop your pair in the chat and I’ll check it.",
    "8": "What do you think, buy or sell?",
    "9": "Thanks for watching, I appreciate you.",
    "0": "Thank you guys.",
    space: "Thanks for the gift.",
    spaceDouble: "Thank you, I appreciate it."
  },
  fr: {
    "1": "Bienvenue sur FlowSignal, regardons le marché ensemble.",
    "2": "Mettez un like au live si vous aimez les signaux.",
    "3": "Suivez la page pour ne pas manquer le prochain setup.",
    "4": "Nous attendons une opportunité propre.",
    "5": "Pas de précipitation, la patience fait partie du trading.",
    "6": "Voyons si le marché donne une confirmation.",
    "7": "Envoyez votre paire dans le chat et je vais la regarder.",
    "8": "Vous pensez quoi, achat ou vente ?",
    "9": "Merci de regarder, je vous apprécie.",
    "0": "Merci à tous.",
    space: "Merci pour le cadeau.",
    spaceDouble: "Merci, j’apprécie vraiment."
  },
  es: {
    "1": "Bienvenidos a FlowSignal, vamos a mirar el mercado juntos.",
    "2": "Dale like al live si te gustan las señales.",
    "3": "Sigue la página para no perderte el próximo setup.",
    "4": "Estamos esperando una oportunidad limpia.",
    "5": "Sin prisa, la paciencia es parte del trading.",
    "6": "Veamos si el mercado da confirmación.",
    "7": "Deja tu par en el chat y lo reviso.",
    "8": "¿Qué piensan, compra o venta?",
    "9": "Gracias por mirar, se los agradezco.",
    "0": "Gracias a todos.",
    space: "Gracias por el regalo.",
    spaceDouble: "Gracias, lo aprecio mucho."
  }
};

function loadStreamerVoiceOverrides() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(VOICE_STORAGE.streamerMessages) || "{}"
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (err) {
    return {};
  }
}

function saveStreamerVoiceOverrides(overrides) {
  localStorage.setItem(
    VOICE_STORAGE.streamerMessages,
    JSON.stringify(overrides || {})
  );
}

function getStreamerVoiceOverridesForLang(lang = currentLang) {
  const overrides = loadStreamerVoiceOverrides();
  return overrides[lang] && typeof overrides[lang] === "object"
    ? overrides[lang]
    : {};
}

function setStreamerVoiceOverride(key, value) {
  const overrides = loadStreamerVoiceOverrides();
  const langOverrides = {
    ...(overrides[currentLang] || {})
  };
  const defaultValue =
    streamerVoiceMessagesByLang[currentLang]?.[key] ||
    streamerVoiceMessagesByLang.en[key] ||
    "";
  const cleanValue = String(value || "").trim();

  if (!cleanValue || cleanValue === defaultValue) {
    delete langOverrides[key];
  } else {
    langOverrides[key] = cleanValue;
  }

  overrides[currentLang] = langOverrides;
  saveStreamerVoiceOverrides(overrides);
}

const voiceState = {
  enabled:
    speechSynthesisSupported &&
    localStorage.getItem(VOICE_STORAGE.enabled) !== "false",
  initialized: false,
  snapshots: {},
  spokenFingerprints: new Set(),
  lastSpokenAt: {},
  pendingBySymbol: {},
  pendingTimers: {},
  eventSequence: 0,
  voices: [],
  selectedVoiceName: localStorage.getItem(VOICE_STORAGE.name) || "",
  selectedVoice: null,
  rate: Number(localStorage.getItem(VOICE_STORAGE.rate)) || VOICE_DEFAULTS.rate,
  pitch: Number(localStorage.getItem(VOICE_STORAGE.pitch)) || VOICE_DEFAULTS.pitch,
  style: localStorage.getItem(VOICE_STORAGE.style) || VOICE_DEFAULTS.style,
  popupEnabled: localStorage.getItem(VOICE_STORAGE.popup) !== "false",
  lastSpokenMessage: "",
  lastSpokenMessageAt: 0,
  lastLibraryMessage: "",
  lastAssistantMessage: "",
  lastAssistantSpokenAt: 0,
  systemSnapshot: null,
  interactionTimer: null
};

function assistantCopy(key, replacements = {}) {
  const copy = ASSISTANT_COPY[currentLang] || ASSISTANT_COPY.en;
  let value = copy[key] ?? ASSISTANT_COPY.en[key] ?? key;

  Object.entries(replacements).forEach(([name, replacement]) => {
    value = String(value).replaceAll(`{${name}}`, String(replacement));
  });

  return value;
}

function applyAssistantReplacements(value, replacements = {}) {
  let output = String(value || "");

  Object.entries(replacements).forEach(([name, replacement]) => {
    output = output.replaceAll(`{${name}}`, String(replacement));
  });

  return output;
}

function applyAssistantStyleText(message) {
  const text = String(message || "").trim();
  if (!text) return "";

  if (voiceState.style === "confident") {
    return text.startsWith("Confirmed:") ? text : `Confirmed: ${text}`;
  }

  if (voiceState.style === "hype") {
    return text.startsWith("Let's go.") ? text : `Let's go. ${text}`;
  }

  if (voiceState.style === "professional") {
    return text.startsWith("Market update:") ? text : `Market update: ${text}`;
  }

  return text;
}

function assistantLibraryLine(key, replacements = {}) {
  const library = VOICE_LIBRARY[currentLang] || VOICE_LIBRARY.en;
  const fallbackLibrary = VOICE_LIBRARY.en;
  const lines = library[key] || fallbackLibrary[key] || [assistantCopy(key)];
  const prepared = lines.map((line) => applyAssistantReplacements(line, replacements));
  let options = prepared.filter((line) => (
    line &&
    line !== voiceState.lastLibraryMessage &&
    line !== voiceState.lastSpokenMessage
  ));

  if (!options.length) {
    options = prepared.filter(Boolean);
  }

  const selected =
    options[Math.floor(Math.random() * options.length)] ||
    prepared[0] ||
    "";

  return applyAssistantStyleText(selected);
}

function trimSentencePunctuation(value) {
  return String(value || "").trim().replace(/[.!?]+$/g, "");
}

function assistantBlockedLine(reason = "") {
  const cleanReason = trimSentencePunctuation(reason);
  const base = trimSentencePunctuation(assistantLibraryLine("blocked"));
  const connector =
    currentLang === "fr" ? "parce que" :
    currentLang === "es" ? "porque" :
    "because";

  if (!cleanReason) return `${base}.`;

  return `${base} ${connector} ${cleanReason}.`;
}

function assistantEventMessage(key, replacements = {}) {
  return assistantLibraryLine(key, replacements);
}

function assistantLiveAutoOffReason() {
  return assistantCopy("liveAuto", {
    state: assistantCopy("off")
  }).toLowerCase();
}

function assistantSymbolClickMessage(symbol) {
  return assistantEventMessage(
    symbol === "XAUUSD" ? "goldClicked" : "euroClicked"
  );
}

function createVoiceFingerprint(base) {
  voiceState.eventSequence += 1;
  return `${base}:${voiceState.eventSequence}`;
}

function updateVoiceControls() {
  const supported = speechSynthesisSupported;

  [voiceToggleBtn, menuVoiceToggleBtn].forEach((button) => {
    if (!button) return;
    button.textContent = voiceState.enabled
      ? assistantCopy("voiceOn")
      : assistantCopy("voiceOff");
    button.classList.toggle("is-off", !voiceState.enabled);
    button.setAttribute("aria-pressed", String(voiceState.enabled));
    button.disabled = !supported;
  });
}

function findVoiceByName(voices, name) {
  const target = String(name || "").toLowerCase();
  if (!target) return null;

  return voices.find((voice) => voice.name.toLowerCase() === target)
    || voices.find((voice) => voice.name.toLowerCase().includes(target))
    || null;
}

function chooseAssistantVoice(voices) {
  const savedVoice = findVoiceByName(voices, voiceState.selectedVoiceName);
  const languagePrefix = (ASSISTANT_LOCALES[currentLang] || "en-US")
    .slice(0, 2)
    .toLowerCase();

  if (
    savedVoice &&
    String(savedVoice.lang || "").toLowerCase().startsWith(languagePrefix)
  ) {
    return savedVoice;
  }

  const languageVoices = voices.filter((voice) => (
    String(voice.lang || "").toLowerCase().startsWith(languagePrefix)
  ));

  for (const preferredName of VOICE_PREFERRED_NAMES) {
    const preferredVoice = findVoiceByName(voices, preferredName);
    if (
      preferredVoice &&
      String(preferredVoice.lang || "").toLowerCase().startsWith(languagePrefix)
    ) {
      return preferredVoice;
    }
  }

  return languageVoices[0] || null;
}

function refreshAssistantVoices() {
  if (!speechSynthesisSupported) return;

  const voices = window.speechSynthesis.getVoices();
  voiceState.voices = voices;
  voiceState.selectedVoice = chooseAssistantVoice(voices);

  if (
    voiceState.selectedVoice &&
    voiceState.selectedVoiceName !== voiceState.selectedVoice.name
  ) {
    voiceState.selectedVoiceName = voiceState.selectedVoice.name;
    localStorage.setItem(VOICE_STORAGE.name, voiceState.selectedVoiceName);
  }

  if (voiceSelect) {
    const previousValue = voiceState.selectedVoice?.name || "";
    voiceSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Browser default";
    voiceSelect.appendChild(defaultOption);

    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = `${voice.name}${voice.lang ? ` · ${voice.lang}` : ""}`;
      voiceSelect.appendChild(option);
    });

    voiceSelect.value = previousValue;
  }
}

function configureAssistantUtterance(utterance) {
  refreshAssistantVoices();

  if (voiceState.selectedVoice) {
    utterance.voice = voiceState.selectedVoice;
  }

  const tuning = VOICE_STYLE_TUNING[voiceState.style]
    || VOICE_STYLE_TUNING.calm;
  utterance.lang = ASSISTANT_LOCALES[currentLang] || ASSISTANT_LOCALES.en;
  utterance.rate = Math.min(2, Math.max(0.1, voiceState.rate * tuning.rate));
  utterance.pitch = Math.min(2, Math.max(0, voiceState.pitch * tuning.pitch));
  utterance.volume = VOICE_DEFAULTS.volume;
}

function speakStreamerVoice(message) {
  if (!message || !speechSynthesisSupported) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);
  configureAssistantUtterance(utterance);
  window.speechSynthesis.speak(utterance);
}

function getStreamerVoiceMessages() {
  return {
    ...(streamerVoiceMessagesByLang[currentLang] || streamerVoiceMessagesByLang.en),
    ...getStreamerVoiceOverridesForLang(currentLang),
  };
}

function getStreamerVoiceMessage(key) {
  const messages = getStreamerVoiceMessages();
  return messages[key] || streamerVoiceMessagesByLang.en[key] || "";
}

let streamerSpacePressTimer = null;
let streamerVoiceEditMode = false;

function clearStreamerSpaceTimer() {
  if (!streamerSpacePressTimer) return;

  window.clearTimeout(streamerSpacePressTimer);
  streamerSpacePressTimer = null;
}

function handleStreamerSpaceHotkey() {
  if (streamerSpacePressTimer) {
    clearStreamerSpaceTimer();
    speakStreamerVoice(getStreamerVoiceMessage("spaceDouble"));
    return;
  }

  streamerSpacePressTimer = window.setTimeout(() => {
    streamerSpacePressTimer = null;
    speakStreamerVoice(getStreamerVoiceMessage("space"));
  }, 260);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderStreamerVoiceMenu() {
  if (!streamerVoiceList) return;

  const title = document.getElementById("streamerVoiceTitle");
  if (title) {
    title.textContent = streamerVoiceTitles[currentLang] || streamerVoiceTitles.en;
  }

  streamerVoiceList.innerHTML = streamerVoiceHotkeyOrder
    .map((key) => `
      <div class="streamer-voice-row">
        <kbd>${streamerVoiceHotkeyLabels[key] || key}</kbd>
        <input
          class="streamer-voice-input"
          type="text"
          value="${escapeHtml(getStreamerVoiceMessage(key))}"
          data-streamer-key="${key}"
          aria-label="Streamer voice ${streamerVoiceHotkeyLabels[key] || key}"
          ${streamerVoiceEditMode ? "" : "readonly"}
        >
      </div>
    `)
    .join("");
}

function updateStreamerVoiceEditMode() {
  streamerVoiceMenu?.classList.toggle("editing", streamerVoiceEditMode);
  if (streamerVoiceEditBtn) {
    streamerVoiceEditBtn.textContent = streamerVoiceEditMode ? "Done" : "Edit text";
    streamerVoiceEditBtn.classList.toggle("active", streamerVoiceEditMode);
  }

  streamerVoiceList
    ?.querySelectorAll(".streamer-voice-input")
    .forEach((input) => {
      input.toggleAttribute("readonly", !streamerVoiceEditMode);
    });
}

function setStreamerVoiceMenuOpen(open) {
  if (!streamerVoiceMenu || !streamerVoiceToggle) return;

  streamerVoiceMenu.classList.toggle("collapsed", !open);
  streamerVoiceToggle.setAttribute("aria-expanded", String(open));
  localStorage.setItem(VOICE_STORAGE.streamerOpen, open ? "true" : "false");
}

function initializeStreamerVoiceMenu() {
  setStreamerVoiceMenuOpen(
    localStorage.getItem(VOICE_STORAGE.streamerOpen) === "true"
  );
  streamerVoiceEditMode = false;
  updateStreamerVoiceEditMode();
}

streamerVoiceToggle?.addEventListener("click", () => {
  const isOpen = !streamerVoiceMenu?.classList.contains("collapsed");
  setStreamerVoiceMenuOpen(!isOpen);
});

streamerVoiceEditBtn?.addEventListener("click", () => {
  streamerVoiceEditMode = !streamerVoiceEditMode;
  setStreamerVoiceMenuOpen(true);
  updateStreamerVoiceEditMode();
});

streamerVoiceList?.addEventListener("input", (event) => {
  const input = event.target;
  if (!input?.matches?.(".streamer-voice-input")) return;
  if (!streamerVoiceEditMode) return;

  setStreamerVoiceOverride(input.dataset.streamerKey, input.value);
});

function isTypingInEditableField() {
  const active = document.activeElement;
  const tag = active?.tagName?.toLowerCase();

  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    Boolean(active?.isContentEditable)
  );
}

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
  if (isTypingInEditableField()) return;

  if (event.code === "Space" || event.key === " ") {
    event.preventDefault();
    handleStreamerSpaceHotkey();
    return;
  }

  const message = getStreamerVoiceMessage(event.key);
  if (!message) return;

  event.preventDefault();
  clearStreamerSpaceTimer();
  speakStreamerVoice(message);
});

function initializeVoiceSettings() {
  if (!speechSynthesisSupported) {
    console.warn("Flow Assistant voice disabled: browser speechSynthesis is unavailable.");
    voiceToggleBtn?.closest(".voice-controls")?.classList.add("hidden");
    flowAssistantSettings?.classList.add("hidden");
    return;
  }

  if (voiceSpeed) voiceSpeed.value = String(voiceState.rate);
  if (voicePitch) voicePitch.value = String(voiceState.pitch);
  if (assistantStyle) assistantStyle.value = voiceState.style;
  if (assistantPopupToggle) {
    assistantPopupToggle.checked = voiceState.popupEnabled;
  }
  if (voiceSpeedValue) voiceSpeedValue.textContent = voiceState.rate.toFixed(2);
  if (voicePitchValue) voicePitchValue.textContent = voiceState.pitch.toFixed(2);

  renderStreamerVoiceMenu();
  initializeStreamerVoiceMenu();
  refreshAssistantVoices();
  window.speechSynthesis.addEventListener?.(
    "voiceschanged",
    refreshAssistantVoices
  );
  updateAssistantLanguageUI();
}

function updateAssistantLanguageUI() {
  const copy = ASSISTANT_COPY[currentLang] || ASSISTANT_COPY.en;
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  setText("assistantModalTitle", copy.panelTitle);
  setText("flowAssistantSettingsTitle", copy.settings);
  setText("assistantVoiceLabel", copy.voice);
  setText("testVoiceBtn", copy.testVoice);
  setText("assistantPopupLabel", copy.showPopup);
  setText("assistantSpeedLabel", copy.speed);
  setText("assistantPitchLabel", copy.pitch);
  setText("assistantStyleLabel", copy.style);
  renderStreamerVoiceMenu();

  if (assistantStyle) {
    Array.from(assistantStyle.options).forEach((option, index) => {
      option.textContent = copy.styles[index] || option.textContent;
    });
  }

  updateVoiceControls();
}

function refreshVoiceForCurrentLanguage() {
  voiceState.selectedVoiceName = "";
  voiceState.selectedVoice = null;
  refreshAssistantVoices();
}

function clearPendingVoiceEvents() {
  Object.values(voiceState.pendingTimers).forEach((timer) => {
    window.clearTimeout(timer);
  });

  voiceState.pendingBySymbol = {};
  voiceState.pendingTimers = {};
}

function openAssistantPanel() {
  if (!assistantModal) return;

  assistantModal.classList.remove("hidden");
  sideMenu?.classList.add("hidden");
}

function closeAssistantPanel() {
  assistantModal?.classList.add("hidden");
}

function stopAssistantVoice() {
  if (speechSynthesisSupported) {
    window.speechSynthesis.cancel();
  }
  clearPendingVoiceEvents();
}

function speakVoiceEvent(event) {
  if (
    !voiceState.enabled ||
    !event?.message ||
    !speechSynthesisSupported ||
    voiceState.spokenFingerprints.has(event.fingerprint)
  ) {
    return;
  }

  const symbol = event.symbol || "SYSTEM";
  const now = Date.now();
  const repeatedTooSoon =
    event.message === voiceState.lastSpokenMessage &&
    now - voiceState.lastSpokenMessageAt < ASSISTANT_REPEAT_MS;

  if (repeatedTooSoon) return;

  const elapsed = now - (voiceState.lastSpokenAt[symbol] || 0);

  if (elapsed < VOICE_COOLDOWN_MS) {
    const currentPending = voiceState.pendingBySymbol[symbol];

    if (
      !currentPending ||
      currentPending.fingerprint === event.fingerprint ||
      event.priority >= currentPending.priority
    ) {
      voiceState.pendingBySymbol[symbol] = event;
    }

    window.clearTimeout(voiceState.pendingTimers[symbol]);
    voiceState.pendingTimers[symbol] = window.setTimeout(() => {
      const pending = voiceState.pendingBySymbol[symbol];

      delete voiceState.pendingBySymbol[symbol];
      delete voiceState.pendingTimers[symbol];

      if (pending) speakVoiceEvent(pending);
    }, VOICE_COOLDOWN_MS - elapsed + 50);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(event.message);
  configureAssistantUtterance(utterance);

  window.speechSynthesis.cancel();
  renderAssistantPopup(event.message, event.state || "UPDATE", {
    symbol,
    subtitle: getAssistantSubtitle(symbol)
  });
  voiceState.spokenFingerprints.add(event.fingerprint);
  voiceState.lastSpokenAt[symbol] = now;
  voiceState.lastSpokenMessage = event.message;
  voiceState.lastSpokenMessageAt = now;
  voiceState.lastLibraryMessage = event.message;
  window.speechSynthesis.speak(utterance);
}

function queueVoiceEvents(events) {
  const bestBySymbol = new Map();

  events.forEach((event) => {
    if (!event || voiceState.spokenFingerprints.has(event.fingerprint)) return;

    const symbol = event.symbol || "SYSTEM";
    const current = bestBySymbol.get(symbol);

    if (!current || event.priority > current.priority) {
      bestBySymbol.set(symbol, event);
    }
  });

  const selected = Array.from(bestBySymbol.values())
    .sort((left, right) => right.priority - left.priority)[0];

  if (selected) speakVoiceEvent(selected);
}

function normalizeVoiceSignal(item) {
  const signal = String(item?.signal || "WAIT").trim().toUpperCase();
  return signal === "BUY" || signal === "SELL" ? signal : "WAIT";
}

function getSpokenSymbol(symbol) {
  return symbol === "XAUUSD"
    ? assistantCopy("gold")
    : assistantCopy("euro");
}

function getAssistantSubtitle(symbol, timeframe = "") {
  const symbolName = symbol === "XAUUSD"
    ? (currentLang === "en" ? "Gold" : currentLang === "fr" ? "Or" : "Oro")
    : (currentLang === "es" ? "Euro Dólar" : "Euro Dollar");

  return timeframe
    ? `${symbolName} · ${timeframe}`
    : `${symbolName} ${assistantCopy("assistant")}`;
}

function getAssistantDisplaySymbol(symbol) {
  return symbol === "XAUUSD" ? "XAUUSD" : "EURUSD";
}

function getLocalizedTradeSide(side) {
  const normalized = String(side || "").toUpperCase();

  if (currentLang === "fr") return normalized === "SELL" ? "vente" : "achat";
  if (currentLang === "es") return normalized === "SELL" ? "venta" : "compra";
  return normalized === "SELL" ? "sell" : "buy";
}

function getVoiceBlockedReason(status) {
  const reason = getShortAutoTradeReason(status)
    .replace(/\bTrade not sent\.?/gi, "")
    .trim();
  const lower = reason.toLowerCase();
  const copy = ASSISTANT_COPY[currentLang] || ASSISTANT_COPY.en;

  if (lower.includes("min") && lower.includes("distance")) {
    return copy.blockedReasons.distance;
  }

  if (lower.includes("volume") || lower.includes("risk")) {
    return copy.blockedReasons.volume;
  }

  if (lower.includes("already running") || lower.includes("already active")) {
    return copy.blockedReasons.running;
  }

  if (lower.includes("disconnect")) {
    return copy.blockedReasons.disconnected;
  }

  return (reason || copy.blockedReasons.safety)
    .split(/[.!?]/)[0]
    .trim()
    .toLowerCase();
}

function getVoiceBlockedExplanation(status) {
  const shortReason = getVoiceBlockedReason(status);
  const details = getAutoTradeDetails(status);
  const actualRisk =
    details.final_risk_percent ??
    details.risk_percent_if_minimum ??
    details.minimum_volume_risk_percent;
  const maximumRisk =
    details.maximum_allowed_risk_percent ??
    details.required_risk_percent ??
    details.risk_percent;
  const actualRiskText = formatRiskPercent(actualRisk);
  const maximumRiskText = formatRiskPercent(maximumRisk);

  if (
    (
      shortReason === ASSISTANT_COPY.en.blockedReasons.volume ||
      shortReason === ASSISTANT_COPY.fr.blockedReasons.volume ||
      shortReason === ASSISTANT_COPY.es.blockedReasons.volume
    ) &&
    actualRiskText &&
    maximumRiskText
  ) {
    return assistantCopy("riskBlocked", {
      actual: actualRiskText,
      maximum: maximumRiskText
    });
  }

  return shortReason;
}

function getVoiceTradeKey(trade, fallback = "") {
  return String(
    getLiveTradeMatchId(trade) ||
    trade?.trade_id ||
    `${fallback}:${getTradeTimestampMs(trade) || "unknown"}`
  );
}

function wasActiveTradeAnnounced(tradeKey) {
  if (!tradeKey) return false;

  try {
    return sessionStorage.getItem(`flowsignal_voice_active_${tradeKey}`) === "true";
  } catch (error) {
    return false;
  }
}

function markActiveTradeAnnounced(tradeKey) {
  if (!tradeKey) return;

  try {
    sessionStorage.setItem(`flowsignal_voice_active_${tradeKey}`, "true");
  } catch (error) {
    // Session storage is optional; voice still works without persistence.
  }
}

function buildVoiceSnapshot(symbol, data, meta) {
  const autoStatus = meta?.live_auto_status_by_symbol?.[symbol] || {};
  const autoState = String(autoStatus.status || "").toUpperCase();
  const possibleActiveTrade = meta?.live_active_orders?.[symbol] || null;
  const activeTrade = (
    ["", "broker", "ctrader"].includes(
      String(possibleActiveTrade?.source || "").toLowerCase()
    ) &&
    hasRealLiveBrokerId(possibleActiveTrade) &&
    isLiveTradeActiveForDisplay(possibleActiveTrade)
  )
    ? possibleActiveTrade
    : null;
  const activeTradeKey = activeTrade ? getVoiceTradeKey(activeTrade, symbol) : "";
  const history = Array.isArray(meta?.live_trade_history)
    ? meta.live_trade_history
    : [];
  const closedTrades = history
    .filter((trade) => (
      String(trade?.symbol || "").toUpperCase() === symbol &&
      !isLiveTradeActiveForDisplay(trade)
    ))
    .map((trade) => {
      const result = getLiveTradeResult(trade);
      const pnl = getLiveTradePnl(trade);

      return {
        key: getVoiceTradeKey(trade, symbol),
        result,
        pnl
      };
    });

  return {
    rawSignal: String(data?.[symbol]?.signal || "WAIT").trim().toUpperCase(),
    signal: normalizeVoiceSignal(data?.[symbol]),
    autoState,
    liveAutoEnabled:
      typeof meta?.live_auto_enabled === "boolean"
        ? meta.live_auto_enabled
        : Boolean(liveAutoEnabled),
    autoReason: getVoiceBlockedExplanation(autoStatus),
    autoFingerprint: [
      autoState,
      autoStatus.signal || autoStatus.action || "",
      stringifyAutoTradeValue(autoStatus.reason)
    ].join("|"),
    confidence: Number(data?.[symbol]?.confidence ?? 0),
    momentumScore: Math.max(
      Number(data?.[symbol]?.displacement_score ?? 0),
      Number(data?.[symbol]?.momentum_score ?? 0),
      Number(data?.[symbol]?.volume_score ?? 0)
    ),
    activeTradeKey,
    activeTradeSide: String(
      activeTrade?.side || activeTrade?.action || ""
    ).toUpperCase(),
    tp1Hit: Boolean(
      activeTrade?.hit_tp1 ||
      getLiveTradeResult(activeTrade) === "TP1 HIT" ||
      hasConfirmedProfitProtection(activeTrade)
    ),
    tp2Hit: Boolean(
      activeTrade?.hit_tp2 ||
      getLiveTradeResult(activeTrade) === "TP2 HIT" ||
      getLiveTradeResult(activeTrade) === "TARGET HIT"
    ),
    protectedSl: hasConfirmedProfitProtection(activeTrade),
    closedTrades
  };
}

function buildVoiceSystemSnapshot(meta, rawData) {
  const feedStatuses = Object.values(rawData?.feed_status || {});
  const marketClosed = Boolean(
    rawData?.market_closed ||
    feedStatuses.some((status) => Boolean(status?.market_closed))
  );
  const brokerKnown = Boolean(meta?.live_account);
  const brokerConnected = brokerKnown
    ? Boolean(meta.live_account.connected)
    : null;

  return {
    brokerKnown,
    brokerConnected,
    marketClosed
  };
}

function buildVoiceSystemEvents(meta, rawData) {
  const next = buildVoiceSystemSnapshot(meta, rawData);
  const previous = voiceState.systemSnapshot;
  const events = [];

  if (!voiceState.initialized || !previous) {
    events.push({
      symbol: "SYSTEM",
      state: "APP",
      priority: VOICE_EVENT_PRIORITY.APP_OPENED,
      fingerprint: "system:app-opened",
      message: assistantEventMessage("appOpened")
    });

    if (next.brokerKnown && next.brokerConnected === false) {
      events.push({
        symbol: "SYSTEM",
        state: "BROKER",
        priority: VOICE_EVENT_PRIORITY.BROKER_DISCONNECTED,
        fingerprint: "system:broker-disconnected:initial",
        message: assistantEventMessage("brokerDisconnected")
      });
    }

    if (next.marketClosed) {
      events.push({
        symbol: "SYSTEM",
        state: "MARKET CLOSED",
        priority: VOICE_EVENT_PRIORITY.MARKET_CLOSED,
        fingerprint: "system:market-closed:initial",
        message: assistantEventMessage("marketClosed")
      });
    }

    return { snapshot: next, events };
  }

  if (
    next.brokerKnown &&
    previous.brokerConnected !== null &&
    next.brokerConnected !== previous.brokerConnected
  ) {
    const connected = Boolean(next.brokerConnected);
    events.push({
      symbol: "SYSTEM",
      state: "BROKER",
      priority: connected
        ? VOICE_EVENT_PRIORITY.BROKER_CONNECTED
        : VOICE_EVENT_PRIORITY.BROKER_DISCONNECTED,
      fingerprint: `system:broker:${connected ? "connected" : "disconnected"}:${Date.now()}`,
      message: assistantEventMessage(
        connected ? "brokerConnected" : "brokerDisconnected"
      )
    });
  }

  if (next.marketClosed && !previous.marketClosed) {
    events.push({
      symbol: "SYSTEM",
      state: "MARKET CLOSED",
      priority: VOICE_EVENT_PRIORITY.MARKET_CLOSED,
      fingerprint: `system:market-closed:${Date.now()}`,
      message: assistantEventMessage("marketClosed")
    });
  }

  return { snapshot: next, events };
}

function processVoiceAnnouncements(data, meta, rawData = null) {
  const symbols = ["EURUSD", "XAUUSD"];
  const nextSnapshots = {};
  const system = buildVoiceSystemEvents(meta, rawData);
  const events = [...system.events];

  symbols.forEach((symbol) => {
    const next = buildVoiceSnapshot(symbol, data, meta);
    const previous = voiceState.snapshots[symbol];
    nextSnapshots[symbol] = next;

    if (!voiceState.initialized || !previous) {
      if (
        next.activeTradeKey &&
        !wasActiveTradeAnnounced(next.activeTradeKey)
      ) {
        markActiveTradeAnnounced(next.activeTradeKey);
      }
      return;
    }

    next.closedTrades.forEach((trade) => {
      const profitable =
        ["WIN", "PROTECTED_WIN"].includes(trade.result) ||
        (["BROKER_CLOSED", "DISCONNECTED", "CLOSED"].includes(trade.result) && trade.pnl > 0);
      const losing =
        trade.result === "LOSS" ||
        (["BROKER_CLOSED", "DISCONNECTED", "CLOSED"].includes(trade.result) && trade.pnl < 0);
      const previousTrade = previous.closedTrades.find((item) => item.key === trade.key);
      const previousProfitable = previousTrade && (
        ["WIN", "PROTECTED_WIN"].includes(previousTrade.result) ||
        (["BROKER_CLOSED", "DISCONNECTED", "CLOSED"].includes(previousTrade.result) && previousTrade.pnl > 0)
      );
      const previousLosing = previousTrade && (
        previousTrade.result === "LOSS" ||
        (["BROKER_CLOSED", "DISCONNECTED", "CLOSED"].includes(previousTrade.result) && previousTrade.pnl < 0)
      );
      const sameKnownOutcome =
        (profitable && previousProfitable) ||
        (losing && previousLosing);

      if (sameKnownOutcome) return;

      if (profitable || losing) {
        events.push({
          symbol,
          state: profitable ? "WIN" : "LOSS",
          priority: profitable ? VOICE_EVENT_PRIORITY.WIN : VOICE_EVENT_PRIORITY.LOSS,
          fingerprint: `${symbol}:closed:${trade.key}:${profitable ? "WIN" : "LOSS"}`,
          message: assistantEventMessage(profitable ? "win" : "loss")
        });
      }
    });

    if (
      next.activeTradeKey &&
      next.activeTradeKey === previous.activeTradeKey &&
      next.tp2Hit &&
      !previous.tp2Hit
    ) {
      events.push({
        symbol,
        state: "TP2",
        priority: VOICE_EVENT_PRIORITY.TP2,
        fingerprint: `${symbol}:tp2:${next.activeTradeKey}`,
        message: assistantEventMessage("tp2")
      });
    } else if (
      next.activeTradeKey &&
      next.activeTradeKey === previous.activeTradeKey &&
      next.tp1Hit &&
      !previous.tp1Hit
    ) {
      events.push({
        symbol,
        state: "TP1",
        priority: VOICE_EVENT_PRIORITY.TP1,
        fingerprint: `${symbol}:tp1:${next.activeTradeKey}`,
        message: assistantEventMessage("tp1")
      });
    } else if (
      next.activeTradeKey &&
      next.activeTradeKey === previous.activeTradeKey &&
      next.protectedSl &&
      !previous.protectedSl
    ) {
      events.push({
        symbol,
        state: "PROTECTED",
        priority: VOICE_EVENT_PRIORITY.PROTECTED,
        fingerprint: `${symbol}:protected:${next.activeTradeKey}`,
        message: assistantEventMessage("protected")
      });
    }

    if (
      next.activeTradeKey &&
      next.activeTradeKey !== previous.activeTradeKey
    ) {
      markActiveTradeAnnounced(next.activeTradeKey);
      events.push({
        symbol,
        state: "EXECUTED",
        priority: VOICE_EVENT_PRIORITY.EXECUTED,
        fingerprint: `${symbol}:executed:${next.activeTradeKey}`,
        message: assistantEventMessage("executed")
      });
    }

    if (
      next.autoState === "BLOCKED" &&
      ["BUY", "SELL"].includes(next.rawSignal) &&
      !next.activeTradeKey &&
      next.autoFingerprint !== previous.autoFingerprint
    ) {
      events.push({
        symbol,
        state: "BLOCKED",
        priority: VOICE_EVENT_PRIORITY.BLOCKED,
        fingerprint: createVoiceFingerprint(`${symbol}:blocked:${next.autoFingerprint}`),
        message: assistantBlockedLine(next.autoReason)
      });
    }

    if (
      next.rawSignal === "WAIT" &&
      previous.rawSignal !== "WAIT" &&
      smartExplain?.dataset.symbol === symbol &&
      smartExplain?.dataset.state === "blocked"
    ) {
      renderAssistantPopup(
        assistantEventMessage("wait", { symbol: getSpokenSymbol(symbol) }),
        "WAIT",
        {
          symbol,
          subtitle: getAssistantSubtitle(symbol)
        }
      );
    }

    // WAIT is normal market noise during refreshes. Keep it for user clicks only.

    if (
      next.signal !== previous.signal &&
      ["BUY", "SELL"].includes(next.signal)
    ) {
      const liveAutoOff = !next.liveAutoEnabled;
      const message = liveAutoOff
        ? assistantBlockedLine(assistantLiveAutoOffReason())
        : next.signal === "BUY"
          ? assistantEventMessage("buySetup", { symbol: getSpokenSymbol(symbol) })
          : assistantEventMessage("sellSetup", { symbol: getSpokenSymbol(symbol) });

      events.push({
        symbol,
        state: liveAutoOff ? "BLOCKED" : next.signal,
        priority: liveAutoOff
          ? VOICE_EVENT_PRIORITY.BLOCKED
          : VOICE_EVENT_PRIORITY[next.signal],
        fingerprint: createVoiceFingerprint(`${symbol}:signal:${previous.signal}:${next.signal}`),
        message
      });
    }

    if (
      ["BUY", "SELL"].includes(next.signal) &&
      next.confidence >= 75 &&
      (!previous.confidence || previous.confidence < 75)
    ) {
      events.push({
        symbol,
        state: "CONFIDENCE",
        priority: VOICE_EVENT_PRIORITY.HIGH_CONFIDENCE,
        fingerprint: createVoiceFingerprint(`${symbol}:confidence:${Math.floor(next.confidence)}`),
        message: assistantEventMessage("highConfidence")
      });
    }

    if (
      ["BUY", "SELL"].includes(next.signal) &&
      next.momentumScore >= 80 &&
      (!previous.momentumScore || previous.momentumScore < 80)
    ) {
      events.push({
        symbol,
        state: "MOMENTUM",
        priority: VOICE_EVENT_PRIORITY.STRONG_MOMENTUM,
        fingerprint: createVoiceFingerprint(`${symbol}:momentum:${Math.floor(next.momentumScore)}`),
        message: assistantEventMessage("strongMomentum")
      });
    }
  });

  voiceState.snapshots = nextSnapshots;
  voiceState.systemSnapshot = system.snapshot;

  if (!voiceState.initialized) {
    voiceState.initialized = true;
  }

  if (events.length) {
    queueVoiceEvents(events);
  }
}

function setVoiceEnabled(nextEnabled) {
  if (!speechSynthesisSupported) return;

  const shouldEnable = Boolean(nextEnabled);

  if (!shouldEnable) {
    window.speechSynthesis.cancel();
    clearPendingVoiceEvents();
  }

  voiceState.enabled = shouldEnable;
  localStorage.setItem(
    VOICE_STORAGE.enabled,
    voiceState.enabled ? "true" : "false"
  );
  updateVoiceControls();

  showAssistantMessage(
    voiceState.enabled
      ? assistantEventMessage("voiceOn")
      : assistantEventMessage("voiceOff"),
    voiceState.enabled ? "VOICE ON" : "VOICE OFF",
    { forceSpeech: true }
  );
}

[voiceToggleBtn, menuVoiceToggleBtn].forEach((button) => {
  button?.addEventListener("click", () => {
    const nextEnabled = !voiceState.enabled;
    setVoiceEnabled(nextEnabled);
  });
});

voiceSelect?.addEventListener("change", () => {
  voiceState.selectedVoiceName = voiceSelect.value;
  voiceState.selectedVoice = findVoiceByName(
    voiceState.voices,
    voiceState.selectedVoiceName
  );
  localStorage.setItem(VOICE_STORAGE.name, voiceState.selectedVoiceName);
});

voiceSpeed?.addEventListener("input", () => {
  voiceState.rate = Number(voiceSpeed.value) || VOICE_DEFAULTS.rate;
  if (voiceSpeedValue) voiceSpeedValue.textContent = voiceState.rate.toFixed(2);
  localStorage.setItem(VOICE_STORAGE.rate, String(voiceState.rate));
});

voicePitch?.addEventListener("input", () => {
  voiceState.pitch = Number(voicePitch.value) || VOICE_DEFAULTS.pitch;
  if (voicePitchValue) voicePitchValue.textContent = voiceState.pitch.toFixed(2);
  localStorage.setItem(VOICE_STORAGE.pitch, String(voiceState.pitch));
});

assistantStyle?.addEventListener("change", () => {
  voiceState.style = assistantStyle.value;
  localStorage.setItem(VOICE_STORAGE.style, voiceState.style);
  showAssistantMessage(
    applyAssistantStyleText(assistantCopy("testMessage")),
    "VOICE STYLE",
    { forceSpeech: true }
  );
});

assistantPopupToggle?.addEventListener("change", () => {
  voiceState.popupEnabled = assistantPopupToggle.checked;
  localStorage.setItem(
    VOICE_STORAGE.popup,
    voiceState.popupEnabled ? "true" : "false"
  );

  if (!voiceState.popupEnabled) {
    hideSmartExplanation();
  }
});

testVoiceBtn?.addEventListener("click", () => {
  showAssistantMessage(
    applyAssistantStyleText(assistantCopy("testMessage")),
    "TEST VOICE",
    { forceSpeech: true }
  );
});

initializeVoiceSettings();
updateVoiceControls();

function getSmartExplainBlockedStatus(symbol, data) {
  const autoStatus = liveAutoStatusBySymbol?.[symbol] || {};
  const autoState = String(autoStatus.status || "").toUpperCase();
  const currentSignal = String(data?.signal || "WAIT").trim().toUpperCase();

  if (
    ["BUY", "SELL"].includes(currentSignal) &&
    autoState === "BLOCKED"
  ) {
    return {
      blocked: true,
      reason: getVoiceBlockedExplanation({
        ...autoStatus,
        reason: autoStatus.reason || "current live auto safety check"
      }),
      status: autoStatus
    };
  }

  return { blocked: false, reason: "", status: autoStatus };
}

function formatAssistantNumber(value, maximumFractionDigits = 4) {
  const number = Number(value);

  if (!Number.isFinite(number)) return null;

  return number.toLocaleString(undefined, {
    maximumFractionDigits
  });
}

function buildVolumeSafetyAssistantDetails(status) {
  const details = getAutoTradeDetails(status);
  const requestedVolume =
    details.broker_interpreted_volume ??
    details.final_volume ??
    details.volume_in_payload ??
    details.volume_units ??
    details.calculated_volume_units;
  const brokerMinimum =
    details.broker_min_volume ??
    details.min_volume_units ??
    details.minVolume;
  const brokerStep =
    details.broker_volume_step ??
    details.volume_step_units ??
    details.stepVolume;
  const actualRisk =
    details.final_risk_percent ??
    details.risk_percent_if_minimum ??
    details.minimum_volume_risk_percent;
  const allowedRisk =
    details.maximum_allowed_risk_percent ??
    details.required_risk_percent ??
    details.risk_percent;
  const parts = [];
  const requestedText = formatAssistantNumber(requestedVolume);
  const minimumText = formatAssistantNumber(brokerMinimum);
  const stepText = formatAssistantNumber(brokerStep);
  const actualRiskText = formatRiskPercent(actualRisk);
  const allowedRiskText = formatRiskPercent(allowedRisk);

  if (requestedText !== null) parts.push(`Requested ${requestedText}`);
  if (minimumText !== null) parts.push(`Broker min ${minimumText}`);
  if (stepText !== null) parts.push(`Step ${stepText}`);

  if (actualRiskText && allowedRiskText) {
    parts.push(`Risk ${actualRiskText} / max ${allowedRiskText}`);
  } else if (actualRiskText) {
    parts.push(`Risk ${actualRiskText}`);
  }

  return parts.join(" • ");
}

function getVerifiedActiveTrade(symbol) {
  const trade = activeLiveOrders?.[symbol] || null;
  const source = String(trade?.source || "").toLowerCase();

  if (
    !trade ||
    !["", "broker", "ctrader"].includes(source) ||
    !hasRealLiveBrokerId(trade) ||
    !isLiveTradeActiveForDisplay(trade)
  ) {
    return null;
  }

  return trade;
}

function buildSmartExplanation(symbol) {
  const data = latestPanelData?.[symbol] || {};
  const rawSignal = String(data?.signal || "WAIT").trim().toUpperCase();
  const signal = normalizeVoiceSignal(data);
  const blocked = getSmartExplainBlockedStatus(symbol, data);
  const activeTrade = getVerifiedActiveTrade(symbol);
  let message = "";
  let state = signal;
  let details = "";

  if (activeTrade) {
    state = "EXECUTED";
    message = assistantEventMessage("activeTrade", {
      symbol: getSpokenSymbol(symbol)
    });
  } else if (
    rawSignal === "WAIT" ||
    rawSignal === "HOLD BUY" ||
    rawSignal === "HOLD SELL"
  ) {
    state = "WAIT";
    message = assistantEventMessage("wait", {
      symbol: getSpokenSymbol(symbol)
    });
  } else if (blocked.blocked) {
    state = "BLOCKED";
    message = assistantBlockedLine(blocked.reason);
    details = buildVolumeSafetyAssistantDetails(blocked.status);
  } else if (signal === "BUY") {
    if (!liveAutoEnabled) {
      state = "BLOCKED";
      message = assistantBlockedLine(assistantLiveAutoOffReason());
    } else {
      message = assistantEventMessage("buySetup", {
        symbol: getSpokenSymbol(symbol)
      });
    }
  } else if (signal === "SELL") {
    if (!liveAutoEnabled) {
      state = "BLOCKED";
      message = assistantBlockedLine(assistantLiveAutoOffReason());
    } else {
      message = assistantEventMessage("sellSetup", {
        symbol: getSpokenSymbol(symbol)
      });
    }
  } else {
    state = "WAIT";
    message = assistantEventMessage("wait", {
      symbol: getSpokenSymbol(symbol)
    });
  }

  return {
    symbol,
    state,
    message,
    details
  };
}

function speakAssistantMessage(
  message,
  force = false,
  symbol = "SYSTEM",
  interaction = false,
  bypassSymbolCooldown = false
) {
  if (interaction) {
    window.clearTimeout(voiceState.interactionTimer);
    voiceState.interactionTimer = window.setTimeout(() => {
      speakAssistantMessage(message, force, symbol, false, true);
    }, ASSISTANT_CLICK_DEBOUNCE_MS);
    return;
  }

  if (
    (!voiceState.enabled && !force) ||
    !message ||
    !speechSynthesisSupported
  ) {
    return;
  }

  const now = Date.now();
  const repeatedTooSoon =
    message === voiceState.lastSpokenMessage &&
    now - voiceState.lastSpokenMessageAt < ASSISTANT_REPEAT_MS;

  if (repeatedTooSoon) return;

  if (
    !bypassSymbolCooldown &&
    ["EURUSD", "XAUUSD"].includes(symbol) &&
    now - (voiceState.lastSpokenAt[symbol] || 0) < VOICE_COOLDOWN_MS
  ) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);
  configureAssistantUtterance(utterance);
  voiceState.lastAssistantMessage = message;
  voiceState.lastAssistantSpokenAt = now;
  voiceState.lastSpokenMessage = message;
  voiceState.lastSpokenMessageAt = now;
  voiceState.lastLibraryMessage = message;
  voiceState.lastSpokenAt[symbol] = now;
  window.speechSynthesis.speak(utterance);
}

function hideSmartExplanation() {
  smartExplain?.classList.add("hidden");
}

function renderAssistantPopup(message, state = "INFO", options = {}) {
  if (!smartExplain || !smartExplainTitle || !smartExplainText || !smartExplainState) {
    return;
  }

  if (!voiceState.popupEnabled && !options.forcePopup) {
    hideSmartExplanation();
    return;
  }

  smartExplainTitle.textContent = "Flow Assistant";
  if (smartExplainSubtitle) {
    smartExplainSubtitle.textContent = options.subtitle || "Market Assistant";
  }
  smartExplainText.textContent = message;
  if (smartExplainDetails) {
    smartExplainDetails.textContent = options.details || "";
    smartExplainDetails.classList.toggle("hidden", !options.details);
  }
  smartExplainState.textContent = state;
  smartExplainState.dataset.state = String(state).toLowerCase().split(" ")[0];
  smartExplain.dataset.state = String(state).toLowerCase().split(" ")[0];
  smartExplain.dataset.symbol = options.symbol || "SYSTEM";
  smartExplain.classList.remove("hidden");
}

function showAssistantMessage(message, state = "INFO", options = {}) {
  renderAssistantPopup(message, state, options);

  speakAssistantMessage(
    message,
    Boolean(options.forceSpeech),
    options.symbol || "SYSTEM",
    Boolean(options.interaction)
  );
}

function showSmartExplanation(symbol) {
  const result = buildSmartExplanation(symbol);
  showAssistantMessage(result.message, result.state, {
    subtitle: getAssistantSubtitle(symbol),
    symbol,
    details: result.details,
    interaction: true
  });
}

function getChartDirection(symbol, timeframe) {
  const candles =
    latestRawPanelData?.candles?.[symbol]?.[timeframe] || [];
  const recent = candles.slice(-12);

  if (recent.length < 2) return "unclear";

  const first = Number(recent[0]?.close);
  const last = Number(recent[recent.length - 1]?.close);

  if (!Number.isFinite(first) || !Number.isFinite(last) || first === 0) {
    return "unclear";
  }

  const move = (last - first) / Math.abs(first);
  const flatThreshold = symbol === "XAUUSD" ? 0.0008 : 0.00025;

  if (Math.abs(move) < flatThreshold) return "sideways";
  return move > 0 ? "bullish" : "bearish";
}

function getChartWaitingText(data, timeframe) {
  const timeframeStructure = timeframe === "1h"
    ? data?.structure_trend
    : timeframe === "15m"
      ? data?.structure_type
      : data?.structure_next;
  const structure = String(timeframeStructure || "").toLowerCase();
  const planReason = String(data?.plan_reason || "").trim();
  const copy = ASSISTANT_COPY[currentLang] || ASSISTANT_COPY.en;

  const combined = `${structure} ${planReason}`.toLowerCase();
  if (combined.includes("swing")) return copy.waiting.swing;
  if (combined.includes("closed") && combined.includes("candle")) {
    return copy.waiting.swing;
  }
  if (combined.includes("choch")) return copy.waiting.choch;
  if (combined.includes("bos")) return copy.waiting.bos;
  if (combined.includes("confirmation")) return copy.waiting.candle;
  return copy.waiting.structure;
}

function buildChartExplanation(symbol, timeframe) {
  const data = latestPanelData?.[symbol] || {};
  const direction = getChartDirection(symbol, timeframe);
  const spokenSymbol = getSpokenSymbol(symbol);
  const waitingFor = getChartWaitingText(data, timeframe);
  const signal = String(data?.signal || "WAIT").trim().toUpperCase();
  const state = ["BUY", "SELL"].includes(signal) ? signal : "WAIT";
  const copy = ASSISTANT_COPY[currentLang] || ASSISTANT_COPY.en;
  const spokenTimeframe = copy.timeframes[timeframe] || timeframe;
  const spokenDirection = copy.directions[direction] || direction;

  return {
    state,
    message: assistantCopy("chart", {
      symbol: spokenSymbol,
      timeframe: spokenTimeframe,
      direction: spokenDirection,
      waiting: waitingFor
    })
  };
}

function showChartExplanation(symbol, timeframe) {
  const explanation = buildChartExplanation(symbol, timeframe);
  showAssistantMessage(explanation.message, explanation.state, {
    subtitle: getAssistantSubtitle(symbol, timeframe),
    symbol,
    interaction: true
  });
}

function makeSmartExplainTarget(element, symbol) {
  if (!element) return;

  element.classList.add("smart-explain-target");
  element.setAttribute("role", "button");
  element.setAttribute("tabindex", "0");
  element.setAttribute("aria-label", `Explain ${symbol} signal`);

  element.addEventListener("click", (event) => {
    if (event.target.closest("button, input, select, a")) return;
    showSmartExplanation(symbol);
  });

  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showSmartExplanation(symbol);
    }
  });
}

makeSmartExplainTarget(document.getElementById("eurusd-card"), "EURUSD");
makeSmartExplainTarget(document.getElementById("gold-card"), "XAUUSD");

const mainSmcPanel = document.querySelector(".main-smc-panel");

if (mainSmcPanel) {
  mainSmcPanel.classList.add("smart-explain-target");
  mainSmcPanel.setAttribute("role", "button");
  mainSmcPanel.setAttribute("tabindex", "0");
  mainSmcPanel.setAttribute("aria-label", "Explain current SMC plan");
  mainSmcPanel.addEventListener("click", (event) => {
    if (event.target.closest("button, input, select, a")) return;
    showSmartExplanation(currentChartSymbol);
  });
  mainSmcPanel.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showSmartExplanation(currentChartSymbol);
    }
  });
}

smartExplainClose?.addEventListener("click", hideSmartExplanation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideSmartExplanation();
});

function setAuthMessage(text, isError = false) {
  if (!authMsg) return;
  authMsg.textContent = text;
  authMsg.style.color = isError ? "#ff8f8f" : "#cdd5df";
}

// ==============================
// HELPERS
// ==============================

function applyLanguage(lang) {
  currentLang = lang;
// ==============================
// LANDING PAGE TRANSLATION
// ==============================

// HERO TITLE
const heroTitle = document.querySelector(".hero-left h1");
if (heroTitle) {
  heroTitle.innerHTML = `
    ${LANG[lang].heroTitle1}<br>
    <span>${LANG[lang].heroTitle2}</span>
  `;
}

// HERO TEXT
const heroText = document.querySelector(".hero-left p");
if (heroText) {
  heroText.textContent = LANG[lang].heroText;
}

// HERO LINE (pill)
const heroPill = document.querySelector(".hero-pill");
if (heroPill) {
  heroPill.innerHTML = `
    <span>${LANG[lang].liveHero}</span>
    ${LANG[lang].heroLine}
  `;
}

// BUTTONS
const startBtn = document.getElementById("openAccessBtnHero");

if (startBtn) {
  startBtn.textContent =
    window.innerWidth <= 700
      ? "Get Access →"
      : LANG[lang].startTrading;
}
const getBtn = document.getElementById("openAccessBtn");
if (getBtn) getBtn.textContent = LANG[lang].getStarted;

const viewBtn = document.querySelector(".hero-secondary");
if (viewBtn) viewBtn.textContent = LANG[lang].viewFeatures;

// BADGES
const badges = document.querySelectorAll(".hero-badges span");
if (badges[0]) badges[0].textContent = LANG[lang].realTimeAlerts;
if (badges[1]) badges[1].textContent = LANG[lang].highAccuracy;
if (badges[2]) badges[2].textContent = LANG[lang].riskManaged;

// STATS
const stats = document.querySelectorAll(".hero-stats span");
if (stats[0]) stats[0].textContent = LANG[lang].activeTraders;
if (stats[1]) stats[1].textContent = LANG[lang].signalAccuracy;

// TRUST TEXT
const trusted = document.querySelector(".trusted-text");
if (trusted) trusted.textContent = LANG[lang].trustedText;
// ==============================
// TOP NAV LINKS (ADD HERE)
// ==============================

const linkContact = document.getElementById("linkContact");
const linkSupport = document.getElementById("linkSupport");
const linkFacebook = document.getElementById("linkFacebook");
const loginBtn = document.getElementById("openAdminLoginBtn");

if (linkContact) linkContact.textContent = lang === "fr" ? "Contact" : lang === "es" ? "Contacto" : "Contact";
if (linkSupport) linkSupport.textContent = lang === "fr" ? "Support" : lang === "es" ? "Soporte" : "Support";
if (linkFacebook) linkFacebook.textContent = lang === "fr" ? "Facebook" : lang === "es" ? "Facebook" : "Facebook";
if (loginBtn) loginBtn.textContent = LANG[lang].login;
// ==============================
// EXTRA TRANSLATIONS - STATIC UI
// ==============================

// Top status
document.querySelectorAll("#status, .main-live").forEach((el) => {
  if (!el) return;

  el.textContent = el.textContent
    .replace("MARKET CLOSED", LANG[lang].marketClosed)
    .replace("LIVE", LANG[lang].live);
});

// Card tags
document.querySelectorAll(".glow-tag").forEach((el) => {
  const text = el.textContent.trim().toUpperCase();

  if (text === "MARKET CLOSED") el.textContent = LANG[lang].marketClosed;
  if (text === "WEAK") el.textContent = LANG[lang].weak;
  if (text === "NEUTRAL") el.textContent = LANG[lang].neutral;
  if (text === "MIXED") el.textContent = LANG[lang].mixed;
  if (text === "CHOPPY") el.textContent = LANG[lang].choppy;
});

// Main metrics
const mainMetricLabels = document.querySelectorAll(".main-metrics span");
if (mainMetricLabels[0]) mainMetricLabels[0].textContent = LANG[lang].buy;
if (mainMetricLabels[1]) mainMetricLabels[1].textContent = LANG[lang].sell;
if (mainMetricLabels[2]) mainMetricLabels[2].textContent = LANG[lang].confidence;

// SMC plan title
const smcHeader = document.querySelector(".smc-header");
if (smcHeader) smcHeader.textContent = `⚡ ${LANG[lang].smcPlan}`;

// SMC rows
const smcRows = document.querySelectorAll(".main-smc-panel .smc-row span:first-child");
if (smcRows[0]) smcRows[0].textContent = LANG[lang].type;
if (smcRows[1]) smcRows[1].textContent = LANG[lang].bias;
if (smcRows[2]) smcRows[2].textContent = LANG[lang].entry;
if (smcRows[3]) smcRows[3].textContent = LANG[lang].sl;
if (smcRows[4]) smcRows[4].textContent = LANG[lang].tp1;
if (smcRows[5]) smcRows[5].textContent = LANG[lang].tp2;
if (smcRows[6]) smcRows[6].textContent = LANG[lang].riskReward;
if (smcRows[7]) smcRows[7].textContent = LANG[lang].invalidation;
if (smcRows[8]) smcRows[8].textContent = LANG[lang].reason;

// Structure title
const structureTitle = document.querySelector(".structure-title");

if (structureTitle) {
const safeSymbol =
  typeof currentChartSymbol !== "undefined" ? currentChartSymbol : "EURUSD";

const safeTimeframe =
  typeof currentChartTimeframe !== "undefined" ? currentChartTimeframe : "5m";

const displayName = DISPLAY_NAMES[safeSymbol] || safeSymbol;

structureTitle.textContent =
  `${LANG[lang].marketStructure} • ${displayName} • ${safeTimeframe}`;
}
// Structure labels
const structureLabels = document.querySelectorAll(".structure-info-row span");
if (structureLabels[0]) structureLabels[0].textContent = LANG[lang].trend; 
if (structureLabels[1]) structureLabels[1].textContent = LANG[lang].structure;
if (structureLabels[2]) structureLabels[2].textContent = LANG[lang].nextStep;
if (structureLabels[3]) structureLabels[3].textContent = LANG[lang].keyLevel;
if (structureLabels[4]) structureLabels[4].textContent = LANG[lang].keyLevel;

// History empty row
const noHistoryCell = document.querySelector("#historyBody td");
if (noHistoryCell) noHistoryCell.textContent = LANG[lang].noHistory;

// Bottom last signal
const mainLastSignal = document.getElementById("main-last-signal");
if (mainLastSignal) {
  const rawSignal = mainLastSignal.textContent.split(":")[1]?.trim() || "WAIT";
  const translatedSignal =
    rawSignal === "WAIT" ? LANG[lang].wait :
    rawSignal === "BUY" ? LANG[lang].buy.toUpperCase() :
    rawSignal === "SELL" ? LANG[lang].sell.toUpperCase() :
    rawSignal;

  mainLastSignal.textContent = `${LANG[lang].lastSignal}: ${translatedSignal}`;
}

  // Feedback modal
  const feedbackTitle = document.querySelector("#feedbackModal .trade-modal-title");
  const feedbackText = document.getElementById("feedbackHelpText");
  const feedbackInput = document.getElementById("feedbackInput");
  const feedbackSendBtn = document.getElementById("feedbackSendBtn");
  const feedbackCancelBtn = document.getElementById("feedbackCancelBtn");
  const feedbackToast = document.getElementById("feedbackToast");

  if (feedbackTitle) feedbackTitle.textContent = LANG[lang].feedbackTitle;
  if (feedbackText) feedbackText.textContent = LANG[lang].feedbackText;
  if (feedbackInput) feedbackInput.placeholder = LANG[lang].feedbackPlaceholder;
  if (feedbackSendBtn) feedbackSendBtn.textContent = LANG[lang].send;
  if (feedbackCancelBtn) feedbackCancelBtn.textContent = LANG[lang].cancel;
  if (feedbackToast) feedbackToast.textContent = LANG[lang].thanks;

  // History
  const historyTitle = document.querySelector(".history-header h2");
  if (historyTitle) historyTitle.textContent = LANG[lang].history;

  const emptyRow = document.querySelector("#historyBody td");
  if (emptyRow) emptyRow.textContent = LANG[lang].noHistory;

  // BUY / SELL buttons
  document.querySelectorAll(".buy-button").forEach((btn) => {
    btn.textContent = LANG[lang].buy;
  });

  document.querySelectorAll(".sell-button").forEach((btn) => {
    btn.textContent = LANG[lang].sell;
  });

  // WAIT text
  document.querySelectorAll("#eurusd-signal, #gold-signal").forEach((el) => {
    const current = el.textContent.trim().toUpperCase();

    // Top controls
    const alertsLabel = document.querySelector('label[for="alertsToggle"], .switch-wrap span');
    const switchSpans = document.querySelectorAll(".switch-wrap span");
    if (switchSpans[0]) switchSpans[0].textContent = LANG[lang].alerts;
    if (switchSpans[1]) switchSpans[1].textContent = LANG[lang].strong;

    // Menu items
    const menuFeedbackText = document.querySelector("#menuFeedbackBtn .menu-row-text");
    const menuAdminText = document.querySelector("#menuAdminBtn .menu-row-text");
    const menuViewText = document.querySelector("#menuViewBtn .menu-row-text");

    if (menuFeedbackText) menuFeedbackText.textContent = LANG[lang].feedback;
    if (menuAdminText) menuAdminText.textContent = LANG[lang].adminLock;
    if (menuViewText) menuViewText.textContent = LANG[lang].fitFullMode;

    // History table headers
    const historyHeaders = document.querySelectorAll(".history-table thead th");
    if (historyHeaders[0]) historyHeaders[0].textContent = LANG[lang].time;
    if (historyHeaders[1]) historyHeaders[1].textContent = LANG[lang].symbol;
    if (historyHeaders[2]) historyHeaders[2].textContent = LANG[lang].signal;
    if (historyHeaders[3]) historyHeaders[3].textContent = LANG[lang].confidence;
    if (historyHeaders[4]) historyHeaders[4].textContent = LANG[lang].result;
    if (historyHeaders[5]) historyHeaders[5].textContent = LANG[lang].pips;

    if (
      current === "WAIT" ||
      current === "ATTENTE" ||
      current === "ESPERA"
    ) {
      el.textContent = LANG[lang].wait;
    }
  });
}



function clampPct(value) {
  const num = parseInt(value, 10);
  if (Number.isNaN(num)) return 0;
  return Math.max(0, Math.min(num, 100));
}

function setBar(symbol, type, pct, immediate = false) {
  setSmoothBar(symbol, type, pct, immediate);
}

function setTagStyle(el, mode, text) {
  if (!el) return;
  el.textContent = text;
  el.className = `glow-tag ${mode}`;
}

function applySignalStyle(symbol, signal) {
  const shell = document.getElementById(`${symbol.toLowerCase()}-signal-shell`);
  const box = document.getElementById(`${symbol.toLowerCase()}-signal-box`);
  const text = document.getElementById(`${symbol.toLowerCase()}-signal`);
  const note = document.getElementById(`${symbol.toLowerCase()}-signal-note`);

  if (!shell || !box || !text) {
    console.warn(`Missing signal elements for ${symbol}`);
    return;
  }

  shell.className = "signal-shell";
  box.className = "signal-box";
  text.className = "signal-text";

  if (signal === "BUY") {
    shell.classList.add("signal-buy");
    box.classList.add("signal-border-buy");
    text.classList.add("buy-text");
  } else if (signal === "SELL") {
    shell.classList.add("signal-sell");
    box.classList.add("signal-border-sell");
    text.classList.add("sell-text");
  } else if (signal.includes("EXIT")) {
    shell.classList.add("signal-sell");
    box.classList.add("signal-border-sell");
    text.classList.add("sell-text");
  } else if (signal === "NO DATA") {
    shell.classList.add("signal-no-data");
    box.classList.add("signal-border-no-data");
    text.classList.add("no-data-text");
  } else {
    shell.classList.add("signal-wait");
    box.classList.add("signal-border-wait");
    text.classList.add("wait-text");
  }

  const isHold = signal === "HOLD BUY" || signal === "HOLD SELL";

  if (note) {
    note.classList.add("hidden");
  }

  if (signal === "WAIT" || isHold) {
    text.textContent = LANG[currentLang].wait;
  } else if (signal === "BUY") {
    text.textContent = LANG[currentLang].buy.toUpperCase();
  } else if (signal === "SELL") {
    text.textContent = LANG[currentLang].sell.toUpperCase();
  } else {
    text.textContent = signal;
  }
}

function tSignal(signal) {
  const s = String(signal || "WAIT").toUpperCase();

  if (s === "WAIT") return LANG[currentLang].wait;
  if (s === "BUY") return LANG[currentLang].buy.toUpperCase();
  if (s === "SELL") return LANG[currentLang].sell.toUpperCase();
  if (s === "HOLD BUY" || s === "HOLD SELL") return LANG[currentLang].wait;

  if (s === "EXIT SELL") return "EXIT SELL";
  if (s === "EXIT BUY") return "EXIT BUY";

  return s;
}

function tMarketText(text) {
  const s = String(text || "").toUpperCase();

  if (s === "MARKET CLOSED") return LANG[currentLang].marketClosed;
  if (s === "WEAK") return LANG[currentLang].weak;
  if (s === "NEUTRAL") return LANG[currentLang].neutral;
  if (s === "MIXED") return LANG[currentLang].mixed;
  if (s === "CHOPPY") return LANG[currentLang].choppy;
  if (s === "TRENDING") return LANG[currentLang].trending;
  if (s === "STRONG") return LANG[currentLang].strongQuality;

  if (s === "WAIT BUY RETEST") {
    if (currentLang === "fr") return "ATTENTE RETEST ACHAT";
    if (currentLang === "es") return "ESPERA RETEST COMPRA";
  }

  if (s === "BUY") return LANG[currentLang].buy.toUpperCase();
  if (s === "SELL") return LANG[currentLang].sell.toUpperCase();

if (currentLang === "fr") {
  return String(text)
    .replaceAll("Wait for CHOCH/BOS + retest", "Attendre CHOCH/BOS + retest")
    .replaceAll("STRONG_BEARISH(", "BAISSIER FORT (")
    .replaceAll("STRONG_BULLISH(", "HAUSSIER FORT (")
    .replaceAll("MEDIUM_BEARISH(", "BAISSIER MOYEN (")
    .replaceAll("MEDIUM_BULLISH(", "HAUSSIER MOYEN (")
    .replaceAll("WEAK_BEARISH(", "BAISSIER FAIBLE (")
    .replaceAll("WEAK_BULLISH(", "HAUSSIER FAIBLE (")
    .replaceAll("LOW_ACTIVITY • LOW VOLUME", "FAIBLE ACTIVITÉ • FAIBLE VOLUME")
    .replaceAll("LOW_ACTIVITY", "FAIBLE ACTIVITÉ")
    .replaceAll("LOW VOLUME", "FAIBLE VOLUME")

    .replaceAll("MEDIUM_BULLISH", "HAUSSIER MOYEN")
    .replaceAll("MEDIUM BEARISH", "BAISSIER MOYEN")
    .replaceAll("MEDIUM_BEARISH", "BAISSIER MOYEN")

    .replaceAll("WEAK_BULLISH", "HAUSSIER FAIBLE")
    .replaceAll("WEAK BEARISH", "BAISSIER FAIBLE")
    .replaceAll("WEAK_BEARISH", "BAISSIER FAIBLE")

    .replaceAll("STRONG_BULLISH", "HAUSSIER FORT")
    .replaceAll("STRONG BEARISH", "BAISSIER FORT")
    .replaceAll("STRONG_BEARISH", "BAISSIER FORT")
    .replaceAll("No entry until structure confirms", "Pas d’entrée avant confirmation de la structure")
    .replaceAll("Wait for CHOCH/BOS + retest", "Attendre CHOCH/BOS + retest")
    .replaceAll("LOW_ACTIVITY", "FAIBLE ACTIVITÉ")
    .replaceAll("MEDIUM_BULLISH", "HAUSSIER MOYEN")
    .replaceAll("MEDIUM_BEARISH", "BAISSIER MOYEN")
    .replaceAll("WEAK_BULLISH", "HAUSSIER FAIBLE")
    .replaceAll("WEAK_BEARISH", "BAISSIER FAIBLE")
    .replaceAll("STRONG_BULLISH", "HAUSSIER FORT")
    .replaceAll("STRONG_BEARISH", "BAISSIER FORT")
    .replaceAll("WAIT BUY BREAK", "ATTENTE CASSURE ACHAT")
    .replaceAll("WAIT SELL BREAK", "ATTENTE CASSURE VENTE")
    .replaceAll("BUY HOLDING", "ACHAT EN ATTENTE")
    .replaceAll("SELL HOLDING", "VENTE EN ATTENTE")
    .replaceAll("SELL READY", "VENTE PRÊTE")
    .replaceAll("BUY READY", "ACHAT PRÊT")
    .replaceAll("WAIT", "ATTENTE")
    .replaceAll("BUY", "ACHAT")
    .replaceAll("SELL", "VENTE")
    .replaceAll("BEARISH", "BAISSIER")
    .replaceAll("BULLISH", "HAUSSIER")
    .replaceAll("LOW_ACTIVITY", "FAIBLE ACTIVITÉ")
    .replaceAll("LOW VOLUME", "FAIBLE VOLUME")
    .replaceAll("DISPLACEMENT", "DÉPLACEMENT")
    .replaceAll("FAKE BREAKOUT", "FAUSSE CASSURE")
    .replaceAll("NONE", "AUCUN");
}

if (currentLang === "es") {
  return String(text)

    .replaceAll(
    "No entry until structure confirms",
    "Sin entrada hasta que la estructura confirme"
  )
    .replaceAll("Wait for CHOCH/BOS + retest", "Esperar CHOCH/BOS + retest")
    .replaceAll("STRONG_BEARISH(", "BAJISTA FUERTE (")
    .replaceAll("STRONG_BULLISH(", "ALCISTA FUERTE (")
    .replaceAll("MEDIUM_BEARISH(", "BAJISTA MEDIO (")
    .replaceAll("MEDIUM_BULLISH(", "ALCISTA MEDIO (")
    .replaceAll("WEAK_BEARISH(", "BAJISTA DÉBIL (")
    .replaceAll("WEAK_BULLISH(", "ALCISTA DÉBIL (")
    .replaceAll("WAIT BUY BREAK", "ESPERA RUPTURA COMPRA")
    .replaceAll("WAIT SELL BREAK", "ESPERA RUPTURA VENTA")
    .replaceAll("BUY HOLDING", "COMPRA ACTIVA")
    .replaceAll("SELL HOLDING", "VENTA ACTIVA")
    .replaceAll("SELL READY", "VENTA LISTA")
    .replaceAll("BUY READY", "COMPRA LISTA")
    .replaceAll("WAIT", "ESPERA")
    .replaceAll("BUY", "COMPRA")
    .replaceAll("SELL", "VENTA")
    .replaceAll("BEARISH", "BAJISTA")
    .replaceAll("BULLISH", "ALCISTA")
    .replaceAll("LOW_ACTIVITY", "BAJA ACTIVIDAD")
    .replaceAll("LOW VOLUME", "BAJO VOLUMEN")
    .replaceAll("DISPLACEMENT", "DESPLAZAMIENTO")
    .replaceAll("FAKE BREAKOUT", "RUPTURA FALSA")
    .replaceAll("NONE", "NINGUNO");
}

  return text;
}

// ==============================
// CARD UPDATE
// ==============================
function getCardPrefix(symbol) {
  return symbol === "XAUUSD" ? "gold" : symbol.toLowerCase();
}

function getLiveTickMid(symbol) {
  const tick = livePrices?.[symbol];
  const mid = Number(tick?.mid);
  const timestamp = Number(tick?.timestamp);
  const ageSeconds = Number.isFinite(timestamp)
    ? (Date.now() / 1000) - timestamp
    : Infinity;

  return Number.isFinite(mid) && mid > 0 && ageSeconds <= 20 ? mid : null;
}

function updateCard(symbol, data) {
  const cardPrefix = getCardPrefix(symbol);
  let signal = String(data.signal || "WAIT").trim().toUpperCase();
  const buyPct = clampPct(data.buy_pct ?? data.buy_percentage ?? data.buy_percent ?? 0);
  const sellPct = clampPct(data.sell_pct ?? data.sell_percentage ?? data.sell_percent ?? 0);
  const confidence = clampPct(data.confidence ?? 0);
  const marketCondition = String(data.market_condition || "UNKNOWN").trim().toUpperCase();
  const entryQuality = String(data.entry_quality || "WEAK").trim().toUpperCase();
  const entryTiming = String(data.entry_timing || "NEUTRAL").trim().toUpperCase();
  const marketClosed = Boolean(data.market_closed);

  const noData = marketCondition === "UNKNOWN" && buyPct === 0 && sellPct === 0 && confidence === 0;

  if (marketClosed) {
    signal = "WAIT";
  } else if (noData) {
    signal = "NO DATA";
  }
  applySignalStyle(cardPrefix, signal);

  const buyLabel = document.getElementById(`${cardPrefix}-buy-label`);
  const sellLabel = document.getElementById(`${cardPrefix}-sell-label`);
  const confLabel = document.getElementById(`${cardPrefix}-conf-label`);

  if (buyLabel) buyLabel.textContent = `${LANG[currentLang].buy}: ${buyPct}%`;
if (sellLabel) sellLabel.textContent = `${LANG[currentLang].sell}: ${sellPct}%`;
if (confLabel) confLabel.textContent = `${LANG[currentLang].confidence}: ${confidence}%`;

  if (!data._barsInit) {
  setBar(cardPrefix, "buy", buyPct, true);
  setBar(cardPrefix, "sell", sellPct, true);
  setBar(cardPrefix, "conf", confidence, true);
  data._barsInit = true;
} else {
  setBar(cardPrefix, "buy", buyPct);
  setBar(cardPrefix, "sell", sellPct);
  setBar(cardPrefix, "conf", confidence);
}

  const marketTag = document.getElementById(`${cardPrefix}-market-tag`);
  const qualityTag = document.getElementById(`${cardPrefix}-quality-tag`);
  const timingTag = document.getElementById(`${cardPrefix}-timing-tag`);

  const rawMarketText = marketCondition.replaceAll("_", " ");
  const rawQualityText = entryQuality.replaceAll("_", " ");
  const rawTimingText = entryTiming.replaceAll("_", " ");

  let marketText = rawMarketText;
  let qualityText = rawQualityText;
  let timingText = rawTimingText;

  if (rawMarketText === "CHOPPY") marketText = LANG[currentLang].choppy;
  if (rawMarketText === "MIXED") marketText = LANG[currentLang].mixed;

  if (rawQualityText === "WEAK") qualityText = LANG[currentLang].weak;
  if (rawQualityText === "MEDIUM") qualityText = LANG[currentLang].medium;
  if (rawQualityText === "NEUTRAL") qualityText = LANG[currentLang].neutral;

  if (rawTimingText === "WEAK") timingText = LANG[currentLang].weak;
  if (rawTimingText === "MEDIUM") timingText = LANG[currentLang].medium;
  if (rawTimingText === "NEUTRAL") timingText = LANG[currentLang].neutral;
  if (marketClosed) {
  setTagStyle(marketTag, "gray", LANG[currentLang].marketClosed);
  setTagStyle(qualityTag, "gray", qualityText || "WAIT");
  setTagStyle(timingTag, "gray", LANG[currentLang].closed);
} else if (signal === "NO DATA") {
  setTagStyle(marketTag, "gray", "NO FEED");
  setTagStyle(qualityTag, "gray", "WAIT");
  setTagStyle(timingTag, "gray", "NO TIMING");
} else {
  if (marketText.includes("TRENDING")) {
    setTagStyle(marketTag, "green", marketText);
  } else if (marketText.includes("MIXED") || marketText.includes("CHOPPY")) {
    setTagStyle(marketTag, "gray", marketText);
  } else {
    setTagStyle(marketTag, "neutral", marketText);
  }

  if (qualityText === "STRONG") {
    setTagStyle(qualityTag, "green", qualityText);
  } else if (qualityText === "MEDIUM") {
    setTagStyle(qualityTag, "gold", qualityText);
  } else {
    setTagStyle(qualityTag, "gray", qualityText);
  }

  if (timingText.includes("GOOD")) {
    setTagStyle(timingTag, "green", timingText);
  } else if (timingText.includes("LATE")) {
    setTagStyle(timingTag, "gold", timingText);
  } else if (timingText.includes("WAIT PULLBACK")) {
    setTagStyle(timingTag, "gray", timingText);
  } else {
    setTagStyle(timingTag, "neutral", timingText);
  }
}
        // SMC PLAN PANEL DATA
    const smcSymbol = cardPrefix;

    const typeEl = document.getElementById(`${smcSymbol}-plan-type`);
    const biasEl = document.getElementById(`${smcSymbol}-plan-bias`);
    const entryEl = document.getElementById(`${smcSymbol}-entry-price`);
    const slEl = document.getElementById(`${smcSymbol}-sl`);
    const tp1El = document.getElementById(`${smcSymbol}-tp1`);
    const tp2El = document.getElementById(`${smcSymbol}-tp2`);
    const rrEl = document.getElementById(`${smcSymbol}-rr`);
    const invalidationEl = document.getElementById(`${smcSymbol}-invalidation`);
    const reasonEl = document.getElementById(`${smcSymbol}-reason`);

const planType = String(data.plan_type || "").toUpperCase();
const isHoldSignal = signal === "HOLD BUY" || signal === "HOLD SELL";
const safePlanType = isHoldSignal
  ? "WAIT FOR STRATEGY CONFIRMATION"
  : data.plan_type || "--";

if (typeEl) typeEl.textContent = safePlanType;
if (biasEl) biasEl.textContent = isHoldSignal ? "WAIT" : data.plan_bias || "--";

[typeEl, biasEl].forEach((el) => {
  if (!el) return;
  el.classList.remove("plan-buy", "plan-sell", "plan-exit", "plan-wait");

  if (!isHoldSignal && planType.includes("BUY")) el.classList.add("plan-buy");
  else if (!isHoldSignal && planType.includes("SELL")) el.classList.add("plan-sell");
  else if (planType.includes("EXIT")) el.classList.add("plan-exit");
  else el.classList.add("plan-wait");
});
if (entryEl) entryEl.textContent = isHoldSignal ? "--" : data.entry_price || "--";
if (slEl) slEl.textContent = isHoldSignal ? "--" : data.stop_loss || "--";
if (tp1El) tp1El.textContent = isHoldSignal ? "--" : data.tp1 || "--";
if (tp2El) tp2El.textContent = isHoldSignal ? "--" : data.tp2 || "--";
if (rrEl) rrEl.textContent = isHoldSignal ? "--" : data.risk_reward || "--";
if (invalidationEl) invalidationEl.textContent = data.invalidation || "--";
if (reasonEl) reasonEl.textContent = data.plan_reason || "--";

  // STRUCTURE PANEL DATA
  const trendEl = document.getElementById("structure-trend");
  const structureTypeEl = document.getElementById("structure-type");
  const nextEl = document.getElementById("structure-next");
  const resistanceEl = document.getElementById("structure-resistance");
  const supportEl = document.getElementById("structure-support");

  if (trendEl) trendEl.textContent = data.structure_trend || "--";
  if (structureTypeEl) structureTypeEl.textContent = data.structure_type || "--";
  if (nextEl) nextEl.textContent = data.structure_next || "--";
  if (resistanceEl) resistanceEl.textContent = data.structure_resistance || "--";
  if (supportEl) supportEl.textContent = data.structure_support || "--";

  if (lastSignals[symbol] !== signal) {
    const alertsOn = alertsToggle ? alertsToggle.checked : false;
    const strongOnly = strongToggle ? strongToggle.checked : false;

    let shouldAlert =
    signal === "BUY" ||
    signal === "SELL" ||
    signal === "EXIT BUY" ||
    signal === "EXIT SELL";
    if (strongOnly) {
      shouldAlert = shouldAlert && qualityText === "STRONG";
    }

    if (shouldAlert && alertsOn) {
      playAlert(symbol, signal);
    }

    lastSignals[symbol] = signal;
  }
}
function updateSmcVisual(data) {
  const structure = String(data.structure_type || "").toUpperCase();
  const trend = String(data.structure_trend || "").toUpperCase();

  const liveLine = document.getElementById("smcLiveLine");
  const projection = document.getElementById("smcProjectionLine");
  const liquidityLayer = document.getElementById("smcLiquidityLayer");
  const bosText = document.getElementById("smcBosText");
  const chochText = document.getElementById("smcChochText");
  const bosLine = document.getElementById("smcBosLine");
  const chochLine = document.getElementById("smcChochLine");
  const lowText = document.getElementById("smcLowText");
  const highText = document.getElementById("smcHighText");

  if (!liveLine) return;

  const swings = (data.smc_swings || []).slice(-12);
  const equalHighs = data.equal_highs || [];
  const equalLows = data.equal_lows || [];

  if (swings.length < 3) {
    liveLine.setAttribute("points", "35,105 80,75 125,98 170,65 215,82 260,55");
    return;
  }

  const prices = swings.map(s => Number(s.price));
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const range = maxPrice - minPrice || 1;

  const pts = swings.map((s, i) => {
    const x = 30 + i * 24;
    const y = 125 - ((Number(s.price) - minPrice) / range) * 90;
    return { x, y, type: s.type, price: Number(s.price) };
  });

  liveLine.setAttribute("points", pts.map(p => `${p.x},${p.y}`).join(" "));
  
  liveLine.setAttribute("stroke", trend.includes("BEARISH") ? "#ef4444" : "#22c55e");
  liveLine.setAttribute("stroke-width", "4");

  const highs = pts.filter(p => p.type === "HIGH");
  const lows = pts.filter(p => p.type === "LOW");

  const lastHigh = highs[highs.length - 1];
  const lastLow = lows[lows.length - 1];

  if (lastHigh && highText) {
    highText.textContent = trend.includes("BEARISH") ? "LH" : "HH";
    highText.setAttribute("x", String(lastHigh.x - 8));
    highText.setAttribute("y", String(lastHigh.y - 10));
  }

  if (lastLow && lowText) {
    lowText.textContent = trend.includes("BEARISH") ? "LL" : "HL";
    lowText.setAttribute("x", String(lastLow.x - 8));
    lowText.setAttribute("y", String(lastLow.y + 20));
  }

  const bosPoint = structure.includes("SELL") ? lastLow : lastHigh;
  const chochPoint = structure.includes("SELL") ? lastHigh : lastLow;

  if (bosPoint && bosLine && bosText) {
    bosLine.setAttribute("x1", String(Math.max(30, bosPoint.x - 55)));
    bosLine.setAttribute("x2", String(Math.min(310, bosPoint.x + 55)));
    bosLine.setAttribute("y1", String(bosPoint.y));
    bosLine.setAttribute("y2", String(bosPoint.y));

    bosText.textContent = "BOS";
    bosText.setAttribute("x", String(bosPoint.x - 5));
    bosText.setAttribute("y", String(bosPoint.y - 24));
  }

  if (chochPoint && chochLine && chochText) {
    chochLine.setAttribute("x1", String(Math.max(30, chochPoint.x - 45)));
    chochLine.setAttribute("x2", String(Math.min(310, chochPoint.x + 45)));
    chochLine.setAttribute("y1", String(chochPoint.y));
    chochLine.setAttribute("y2", String(chochPoint.y));

    chochText.textContent = "CHOCH";
    chochText.setAttribute("x", String(chochPoint.x - 25));
    chochText.setAttribute("y", String(chochPoint.y + 32));
  }

  const showBos = structure.includes("BOS");
  const showChoch = structure.includes("CHOCH");

  if (bosLine) bosLine.style.opacity = showBos ? "1" : "0.25";
  if (bosText) bosText.style.opacity = showBos ? "1" : "0.3";

  if (chochLine) chochLine.style.opacity = showChoch ? "1" : "0";
  if (chochText) chochText.style.opacity = showChoch ? "1" : "0";

  if (projection && pts.length >= 2) {
    const last = pts[pts.length - 1];
    const prev = pts[pts.length - 2];

    projection.setAttribute(
      "points",
      `${prev.x},${prev.y} ${last.x},${last.y} ${last.x + 35},${last.y}`
    );

    projection.style.opacity = "0.55";
  }
}

function updateMainPanel(symbol) {
  if (!latestPanelData) return;

  const data = latestPanelData[symbol];

  if (!data) return;

 const smcData = data;
 updateSmcVisual(data);
  const marketClosed = Boolean(data.market_closed);
  const mainLive = document.querySelector(".main-live");

  if (mainLive) {
    mainLive.textContent = marketClosed
      ? `• ${LANG[currentLang].marketClosed}`
      : `• ${LANG[currentLang].live}`;
    mainLive.style.color = marketClosed ? "#ef4444" : "#35ff8a";
  }

  let signal = String(data.signal || "WAIT").trim().toUpperCase();

  const buyPct = clampPct(data.buy_pct ?? data.buy_percentage ?? data.buy_percent ?? 0);
  const sellPct = clampPct(data.sell_pct ?? data.sell_percentage ?? data.sell_percent ?? 0);
  const confidence = clampPct(data.confidence ?? 0);


  const liveCandles =
  latestRawPanelData?.candles?.[symbol]?.[currentChartTimeframe] || [];

const lastCandle = liveCandles[liveCandles.length - 1];

const fixedPrice =
  getLiveTickMid(symbol) || lastCandle?.close || data.entry_price || data.price;

const priceEl = document.getElementById("main-live-price");

if (priceEl) {
  if (fixedPrice) {
    priceEl.textContent =
      symbol === "XAUUSD"
        ? Number(fixedPrice).toFixed(2)
        : Number(fixedPrice).toFixed(5);
  } else {
    priceEl.textContent = "--";
  }
}
  const displayName =
  DISPLAY_NAMES[symbol] || symbol;
  document.getElementById("main-symbol-title").innerHTML =
    symbol === "EURUSD"
      ? `${displayName} <img src="eurusd.png" class="main-symbol-icon">`
      : `${displayName} <img src="gold.png" class="main-symbol-icon gold-main-icon">`;

  const mainDisplaySignal =
    signal === "HOLD BUY"
      ? "WAIT"
      : signal === "HOLD SELL"
        ? "WAIT"
        : signal;
  document.getElementById("main-signal").textContent = tSignal(mainDisplaySignal);
  const mainSignal = document.getElementById("main-signal");
  const mainSignalNote = document.getElementById("main-signal-note");

  if (mainSignalNote) {
    mainSignalNote.classList.add("hidden");
  }

  if (mainSignal) {
    mainSignal.className = "main-signal-text";

    if (signal === "BUY") {
      mainSignal.classList.add("buy-text");
    } else if (signal === "SELL" || signal.includes("EXIT")) {
      mainSignal.classList.add("sell-text");
    } else {
      mainSignal.classList.add("wait-text");
    }
  }
  document.getElementById("main-buy").textContent = `${buyPct}%`;
  document.getElementById("main-sell").textContent = `${sellPct}%`;
  document.getElementById("main-confidence").textContent = `${confidence}%`;
  const mainLastSignal = document.getElementById("main-last-signal");
  const mainLocalTime = document.getElementById("main-local-time");

  if (mainLastSignal) {
    mainLastSignal.textContent = `${LANG[currentLang].lastSignal}: ${tSignal(signal)}`;
  }

  if (mainLocalTime) {
    mainLocalTime.textContent = new Date().toLocaleTimeString();
  }

  document.getElementById("main-plan-type").textContent = tMarketText(data.plan_type || "--");
  const mainPlanType = document.getElementById("main-plan-type");
  const mainPlanBias = document.getElementById("main-plan-bias");
  const mainPlanRaw = String(data.plan_type || "").toUpperCase();

  [mainPlanType, mainPlanBias].forEach((el) => {
    if (!el) return;

    el.classList.remove("plan-buy", "plan-sell", "plan-exit", "plan-wait");

    if (mainPlanRaw.includes("EXIT")) el.classList.add("plan-exit");
    else if (mainPlanRaw.includes("BUY")) el.classList.add("plan-buy");
    else if (mainPlanRaw.includes("SELL")) el.classList.add("plan-sell");
    else el.classList.add("plan-wait");
  });
  document.getElementById("main-plan-bias").textContent = tMarketText(data.plan_bias || "--");
  document.getElementById("main-entry-price").textContent = data.entry_price || "--";
  document.getElementById("main-sl").textContent = data.stop_loss || "--";
  document.getElementById("main-tp1").textContent = data.tp1 || "--";
  document.getElementById("main-tp2").textContent = data.tp2 || "--";
  document.getElementById("main-rr").textContent = data.risk_reward || "--";
  document.getElementById("main-invalidation").textContent = tMarketText(data.invalidation || "--");
  document.getElementById("main-reason").textContent = tMarketText(data.plan_reason || "--");

  // ==============================
// FVG + SESSION INFO
// ==============================

  const fvg = data.fvg;
  const session = data.session || "UNKNOWN";
  const sessionActive = data.session_active;

  let sessionText = session;

  if (!sessionActive) {
    sessionText += " • LOW VOLUME";
  }

  let fvgText = "--";

  if (fvg) {
    fvgText =
      `${fvg.type} FVG • ${fvg.low.toFixed(5)} → ${fvg.high.toFixed(5)}`;
  }

  // Add session to reason
  const reasonEl = document.getElementById("main-reason");

  if (reasonEl) {
    const baseReason = tMarketText(String(data.plan_reason || "--"));

    const displacement = data.displacement || "UNKNOWN";
    const displacementScore = data.displacement_score ?? 0;
    const fakeBreakout = data.fake_breakout || "NONE";

    reasonEl.innerHTML = `
      ${baseReason}<br>
      <span style="color:#5eead4;">${tMarketText("SESSION")}:</span> ${tMarketText(sessionText)}<br>
    <span style="color:#facc15;">FVG:</span> ${tMarketText(fvgText)}<br>
    <span style="color:#60a5fa;">${tMarketText("DISPLACEMENT")}:</span> ${tMarketText(displacement)} (${displacementScore})<br>
    <span style="color:#fb7185;">${tMarketText("FAKE BREAKOUT")}:</span> ${tMarketText(fakeBreakout)}
    `;
  }

  const showSignalBlocker =
    signal === "WAIT" &&
    buyPct !== sellPct &&
    Boolean(data.blocked_by || data.blocked_reason);
  const blockedByRow = document.getElementById("main-blocked-by-row");
  const blockedReasonRow = document.getElementById("main-blocked-reason-row");
  const blockedByEl = document.getElementById("main-blocked-by");
  const blockedReasonEl = document.getElementById("main-blocked-reason");

  [blockedByRow, blockedReasonRow].forEach((row) => {
    if (row) row.classList.toggle("hidden", !showSignalBlocker);
  });

  if (blockedByEl) {
    blockedByEl.textContent = showSignalBlocker
      ? tMarketText(String(data.blocked_by || "--"))
      : "--";
  }

  if (blockedReasonEl) {
    blockedReasonEl.textContent = showSignalBlocker
      ? tMarketText(String(data.blocked_reason || "--"))
      : "--";
  }

  document.getElementById("structure-trend").textContent = tMarketText(smcData.structure_trend || "--");
  document.getElementById("structure-type").textContent = tMarketText(smcData.structure_type || "--");
  document.getElementById("structure-next").textContent = tMarketText(smcData.structure_next || "--");
  document.getElementById("structure-resistance").textContent = smcData.structure_resistance || "--";
  document.getElementById("structure-support").textContent = smcData.structure_support || "--";
  const structureTitle = document.querySelector(".structure-title");

  if (structureTitle) {
    const displayName =
      DISPLAY_NAMES[symbol] || symbol;

    structureTitle.textContent =
      `${LANG[currentLang].marketStructure} • ${displayName} • ${currentChartTimeframe}`;
  }
  }

function playAlert(symbol, signal) {
  try {
    if (localStorage.getItem("soundEnabled") !== "true") {
      return;
    }

    const audio = document.getElementById("alertSound");

    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.9;

      audio.play().catch(() => {});  
    }

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("FlowSignal Alert", {
          body: `${symbol} ${signal} signal detected`
        });
      } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            new Notification("FlowSignal Alert", {
                body: `${symbol} ${signal} signal detected`
            });
        }
    });
}
    }

  } catch (err) {
    console.log(err);
  }
}

function updateUTC() {
  if (!utcLabel) return;
  const now = new Date();
  const utc = now.toUTCString().split(" ")[4];
  utcLabel.textContent = `UTC ${utc}`;
}

function setConnectionBadge(state = "live", details = "") {
  if (!statusEl) return;

  const normalized = ["loading", "live", "stale", "error"].includes(state)
    ? state
    : "live";
  const labels = {
    loading: "● LIVE loading...",
    live: "● Live",
    stale: "● LIVE loading...",
    error: "● Connection issue"
  };

  statusEl.textContent = labels[normalized];
  statusEl.title = details || labels[normalized];
  statusEl.dataset.fullStatus = details || labels[normalized];
  statusEl.dataset.connectionState = normalized;
  statusEl.className = `status status-${normalized}`;
}

function setStatus(text, mode = "live") {
  const upperText = String(text || "").toUpperCase();

  if (mode === "error" || upperText.includes("ERROR")) {
    setConnectionBadge("error", text);
  } else if (upperText.includes("STALE") || upperText.includes("CACHE")) {
    setConnectionBadge("stale", text);
  } else if (upperText.includes("LOADING") || upperText.includes("SENDING")) {
    setConnectionBadge("loading", text);
  } else {
    setConnectionBadge("live", text);
  }
}

function refreshConnectionBadgeFreshness() {
  if (!statusEl || !latestPanelFetchedAt) return;
  if (Date.now() - latestPanelFetchedAt <= 60000) return;

  const state = statusEl.dataset.connectionState;
  if (state === "error" || state === "stale") return;

  setConnectionBadge(
    "stale",
    `Last updated: ${new Date(latestPanelFetchedAt).toLocaleTimeString()}`
  );
}

function updateTradeButtonsLock() {
  const buttons = document.querySelectorAll(".buy-button, .sell-button");

  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.classList.toggle("trade-locked", !isAdminUnlocked);
  });

  if (adminUnlockBtn) {
    adminUnlockBtn.textContent = isAdminUnlocked ? "Admin On" : "Admin Lock";
    adminUnlockBtn.classList.remove("locked", "unlocked");
    adminUnlockBtn.classList.add(isAdminUnlocked ? "unlocked" : "locked");
  }
}

function showAdminModal() {
  if (adminModal) {
    adminModal.classList.remove("hidden");
  }

  if (adminCodeInput) {
    adminCodeInput.value = "";
    setTimeout(() => adminCodeInput.focus(), 50);
  }
}

function hideAdminModal() {
  if (adminModal) {
    adminModal.classList.add("hidden");
  }
}

function unlockAdminAccess() {
  const entered = adminCodeInput ? adminCodeInput.value.trim() : "";

  if (entered === ADMIN_CODE) {
    isAdminUnlocked = true;
    updateTradeButtonsLock();
    hideAdminModal();
    setStatus("● ADMIN MODE • trading unlocked", "live");
    return;
  }

  setStatus("● ADMIN LOCK • wrong code", "error");
  if (adminCodeInput) {
    adminCodeInput.value = "";
    adminCodeInput.focus();
  }
}

// ==============================
// TRADE MODAL
// ==============================

function showTradeModal(symbol, action) {
  if (tradeConfirmBtn) {
    tradeConfirmBtn.style.display = "inline-flex";
}

if (tradeCancelBtn) {
    tradeCancelBtn.textContent = "Cancel";
}
  pendingTrade = { symbol, action };

  if (tradeModalTitle) tradeModalTitle.textContent = `${action} Confirmation`;
  if (tradeModalText) tradeModalText.textContent = `Confirm ${action} on ${symbol}?`;

  if (tradeConfirmBtn) {
    tradeConfirmBtn.classList.remove("sell-mode");
    if (action === "SELL") {
      tradeConfirmBtn.classList.add("sell-mode");
    }
  }

  if (tradeModal) {
    tradeModal.classList.remove("hidden");
  }
}

function hideTradeModal() {
  if (tradeModal) {
    tradeModal.classList.add("hidden");
  }
  pendingTrade = null;
}

async function maybeExecuteLiveOrder(symbol, data) {

  const signal =
    String(data?.signal || "WAIT").toUpperCase();

  if (signal !== "BUY" && signal !== "SELL") return;
  if (activeLiveOrders[symbol]) return;

  if (!liveAutoEnabled) return;

  if (!liveConnectionState.connected) return;

  const orderKey =
    `${symbol}_${signal}_${data?.entry_price || ""}`;

  if (lastLiveOrderKey === orderKey) return;

  lastLiveOrderKey = orderKey;

  try {

    const res = await fetch(
      `${BASE_URL}/execute-live-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          symbol,
          side: signal
        })
      }
    );

    const result = await res.json();

    console.log(
      "LIVE ORDER RESULT:",
      result
    );

    if (!result.ok) {
      lastLiveOrderKey = null;
      return;
    }

    if (result.active_order) {
      activeLiveOrders[symbol] = result.active_order;
      renderLiveActiveOrders();
    }

  } catch (err) {

    lastLiveOrderKey = null;

    console.error(
      "LIVE ORDER ERROR:",
      err
    );

  }
}

async function executeTrade(symbol, action) {
  setStatus(`● SENDING • ${symbol} ${action}`, action === "BUY" ? "live" : "sell");

  try {
    const res = await fetch(TRADE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symbol, action, token: ADMIN_CODE })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const result = await res.json();
    console.log("Trade result:", result);

    setStatus(`● TRADE SENT • ${symbol} ${action}`, action === "BUY" ? "live" : "sell");

    setTimeout(() => {
      const local = new Date().toLocaleTimeString();
      setStatus(`● LIVE • updated (${local})`, "live");
    }, 2500);
  } catch (err) {
    console.error("Trade error:", err);
    setStatus(`● TRADE ERROR • ${err.message}`, "error");
  }
}

function confirmTrade(symbol, action) {
  const internalSignal = String(
    latestPanelData?.[symbol]?.signal || "WAIT"
  ).toUpperCase();

  if (internalSignal === "HOLD BUY" || internalSignal === "HOLD SELL") {
    showAssistantMessage(
      internalSignal === "HOLD BUY"
        ? assistantCopy("holdBuy")
        : assistantCopy("holdSell"),
      "HOLD",
      { symbol, interaction: true }
    );
    setStatus(`● HOLD • ${symbol} has no fresh entry`, "error");
    return;
  }

  showAssistantMessage(
    assistantEventMessage(action === "BUY" ? "manualBuy" : "manualSell"),
    action,
    { symbol, interaction: true }
  );

  const role = localStorage.getItem("flowsignal_role");

  // PUBLIC USERS → blocked
  if (role !== "admin") {
    if (tradeModalTitle) {
        tradeModalTitle.textContent = LANG[currentLang].accessRestricted;
    }

    if (tradeModalText) {
        tradeModalText.textContent = LANG[currentLang].tradeAdminOnly;
    }

    if (tradeConfirmBtn) {
        tradeConfirmBtn.style.display = "none";
    }

    if (tradeCancelBtn) {
        tradeCancelBtn.textContent = LANG[currentLang].close;
    }

    if (tradeModal) {
        tradeModal.classList.remove("hidden");
    }

    return;
}

  showTradeModal(symbol, action);
}

window.confirmTrade = confirmTrade;

// ==============================
// DATA NORMALIZATION
// ==============================
function normalizePanelData(data) {
  if (data && (data.EURUSD || data.XAUUSD)) {
    return {
      EURUSD: data.EURUSD || {},
      XAUUSD: data.XAUUSD || {}
    };
  }

  return {
    EURUSD: {},
    XAUUSD: {}
  };
}
function renderHistory(history) {
  const body = document.getElementById("historyBody");
  if (!body) return;

  if (!history || !history.length) {
    body.innerHTML = `
      <tr class="history-empty-row">
        <td colspan="6">No history yet</td>
      </tr>
    `;
    return;
  }

  body.innerHTML = history
  .slice()
  .reverse()

    .map((item) => {
      const signal = String(item.signal || "WAIT").toUpperCase();
      const result = String(item.result || "RUNNING").toUpperCase();
      const confidence = item.confidence ?? "--";
      const pips = item.pips ?? "0";

      let signalClass = "history-signal-wait";
      if (signal === "BUY") signalClass = "history-signal-buy";
      if (signal === "SELL") signalClass = "history-signal-sell";

      let resultClass = "history-result-running";
      if (result === "WIN") resultClass = "history-result-win";
      if (result === "LOSS") resultClass = "history-result-loss";
      if (["BROKER_CLOSED", "CLOSED", "STALE_CLOSED"].includes(result)) {
        resultClass = "history-result-closed";
      }

      let rowClass = "history-row-neutral";
      if (signal === "BUY") rowClass = "history-row-buy";
      if (signal === "SELL") rowClass = "history-row-sell";

      let pipsClass = "history-pips-flat";
      const pipsText = String(pips).trim();
      if (pipsText.startsWith("+")) pipsClass = "history-pips-plus";
      if (pipsText.startsWith("-")) pipsClass = "history-pips-minus";

      return `
        <tr class="history-row ${rowClass}">
          <td class="history-time">${item.time || "--"}</td>
          <td class="history-symbol">${DISPLAY_NAMES[item.symbol] || item.symbol || "--"}</td>
          <td>
            <span class="history-pill ${signalClass}">${signal}</span>
          </td>
          <td class="history-confidence">${confidence}</td>
          <td>
            <span class="history-pill ${resultClass}">${result}</span>
          </td>
          <td class="${pipsClass}">${pipsText}</td>
        </tr>
      `;
    })
    .join("");
}

// ==============================
// PANEL REFRESH
// ==============================
function setAutoTradeFilter(filter) {
  autoTradeFilter = filter;

  document.querySelectorAll(".paper-filter-btn").forEach((btn) => {
    btn.classList.remove("active");

    if (btn.dataset.filter === filter) {
      btn.classList.add("active");
    }
  });

  if (latestRawPanelData) {
    updatePaperPanel(
      latestRawPanelData?.paper_trades || {},
      latestRawPanelData?.paper_trade_history || [],
      latestRawPanelData?.paper_trade_stats || {}
    );
  }
}

function isLiveBrokerTrade(trade) {
  const source = String(trade?.source || "").toLowerCase();

  return source === "broker"
    || !!trade?.broker_position_id
    || !!trade?.broker_order_id
    || !!trade?.broker_result;
}

function hasConfirmedProfitProtection(trade) {
  if (!trade?.profit_protected) return false;

  if (!isLiveBrokerTrade(trade)) return true;

  return trade?.sl_protection_broker_result?.ok === true;
}

function getProfitProtectionLabel(trade) {
  return hasConfirmedProfitProtection(trade)
    ? "Profit Protected (+50% TP2 locked)"
    : "";
}

function getSlProtectionWarning(trade) {
  if (
    trade?.broker_stop_loss_missing ||
    (isLiveBrokerTrade(trade) && !trade?.broker_stop_loss_confirmed)
  ) {
    return "No broker stop loss attached";
  }

  return trade?.sl_protection_failed || trade?.sl_protection_warning
    ? "TP1 hit, but broker SL protection failed"
    : "";
}

function getBrokerTargetWarning(trade) {
  if (
    trade?.broker_take_profit_missing ||
    (isLiveBrokerTrade(trade) && !trade?.broker_take_profit_confirmed)
  ) {
    return "No broker take profit attached";
  }

  return "";
}

function getBrokerStopLossDisplay(trade) {
  if (
    trade?.broker_stop_loss_missing ||
    (isLiveBrokerTrade(trade) && !trade?.broker_stop_loss_confirmed)
  ) {
    return "No broker SL";
  }

  return trade?.sl ?? trade?.current_sl ?? trade?.stop_loss ?? "--";
}

function getBrokerTakeProfitDisplay(trade) {
  if (
    trade?.broker_take_profit_missing ||
    (isLiveBrokerTrade(trade) && !trade?.broker_take_profit_confirmed)
  ) {
    return "No broker TP";
  }

  return trade?.tp2 ?? trade?.take_profit_2 ?? trade?.take_profit ?? trade?.takeProfit ?? "--";
}

function getTp1Display(trade) {
  if (
    trade?.broker_take_profit_missing ||
    (isLiveBrokerTrade(trade) && !trade?.broker_take_profit_confirmed)
  ) {
    return trade?.planned_tp1 ? `${trade.planned_tp1} planned` : "Planned only";
  }

  return trade?.tp1 ?? trade?.take_profit_1 ?? "--";
}

function getTradeDisplayResult(trade) {
  if (!trade) return "--";
  if (hasConfirmedProfitProtection(trade)) return "TP1 HIT";
  if (trade?.hit_tp1) return "TP1 HIT";

  return trade.result || trade.status || "RUNNING";
}

function getTradeProtectedText(trade) {
  return hasConfirmedProfitProtection(trade) ? "YES" : "NO";
}

function updatePaperPanel(paperTrades, paperHistory = [], backendStats = {}) {
  if (executionPage === "live") {
    if (paperHistoryList) {
      paperHistoryList.classList.add("hidden");
      paperHistoryList.style.setProperty(
        "display",
        "none",
        "important"
      );
    }

    return;
  }

  if (!paperTrades) paperTrades = {};

  if (paperHistoryList) {
    paperHistoryList.classList.remove("hidden");
    paperHistoryList.style.setProperty(
      "display",
      "flex",
      "important"
    );
  }

  if (liveHistoryList) {
    liveHistoryList.classList.add("hidden");
    liveHistoryList.style.setProperty(
      "display",
      "none",
      "important"
    );
  }

  const eurusd = paperTrades.EURUSD;
  const gold = paperTrades.XAUUSD;

  if (paperEurusdStatus) {
    paperEurusdStatus.textContent = eurusd
      ? `${eurusd.side} • ${getTradeDisplayResult(eurusd)} • Entry ${eurusd.entry} • SL ${eurusd.sl} • TP1 ${eurusd.tp1} • TP2 ${eurusd.tp2}`
      : "No paper trade";
  }

  if (paperGoldStatus) {
    paperGoldStatus.textContent = gold
      ? `${gold.side} • ${getTradeDisplayResult(gold)} • Entry ${gold.entry} • SL ${gold.sl} • TP1 ${gold.tp1} • TP2 ${gold.tp2}`
      : "No paper trade";
  }

  if (paperHistoryList) {
    paperHistory = Array.isArray(paperHistory) ? paperHistory : [];

const activeTrades = Object.values(paperTrades || {})
  .filter(Boolean)
  .map((t) => ({
    ...t,
    status: "OPEN",
    result: t.result || "RUNNING"
  }));

const closedHistory = paperHistory.filter((t) => {
  const r = String(t?.result || t?.status || "").toUpperCase();
  const s = String(t?.status || "").toUpperCase();
  return r === "WIN" || r === "LOSS" || s === "CLOSED";
});

const allPaperTrades = [
  ...activeTrades,
  ...closedHistory
];

function getPaperResult(t) {
  const r = String(t?.result || t?.status || "RUNNING").toUpperCase();
  const s = String(t?.status || "").toUpperCase();

  if (t?.profit_protected && s === "CLOSED") return "WIN";
  if (r.includes("STALE") || r.includes("RESET") || r.includes("CLOSED")) return "CLOSED";
  if (s === "CLOSED" && (r.includes("WIN") || r.includes("TP") || r.includes("PROFIT"))) return "WIN";
  if (s === "CLOSED" && (r.includes("LOSS") || r.includes("SL") || r.includes("STOP"))) return "LOSS";
  if (r === "WIN") return "WIN";
  if (r === "LOSS") return "LOSS";

  return "RUNNING";
}

const wins = backendStats.wins ?? allPaperTrades.filter(t => getPaperResult(t) === "WIN").length;
const losses = backendStats.losses ?? allPaperTrades.filter(t => getPaperResult(t) === "LOSS").length;
const running = backendStats.running ?? allPaperTrades.filter(t => getPaperResult(t) === "RUNNING").length;
const total = backendStats.total ?? (wins + losses + running);

const filteredHistory =
  autoTradeFilter === "ALL"
    ? allPaperTrades
    : allPaperTrades.filter((t) => {
        const r = getPaperResult(t);

        if (autoTradeFilter === "WIN") return r === "WIN";
        if (autoTradeFilter === "LOSS") return r === "LOSS";
        if (autoTradeFilter === "RUNNING") return r === "RUNNING";

        return true;
      });
paperHistoryList.innerHTML = `
  <div style="display:grid;gap:8px;">

    <div style="padding:8px;border-radius:14px;background:rgba(15,23,42,.55);border:1px solid rgba(148,163,184,.14);">
      <div style="font-size:11px;font-weight:900;color:#cbd5e1;margin-bottom:6px;">✦ ACTIVE STRATEGIES</div>

      ${activeTrades.length === 0 ? `
        <div class="live-empty">
          <div class="live-empty-title">No active paper trades</div>
          <div class="live-empty-subtitle">
            Paper auto will track one setup per symbol when conditions align.
          </div>
        </div>
      ` : ["EURUSD", "XAUUSD"].map((sym) => {
        const t = paperTrades?.[sym];
        if (!t) return "";

        const side = t.side || "--";
        const result = t.result || "RUNNING";
        const source = (t.source || "paper").toUpperCase();
        const display = DISPLAY_NAMES[sym] || sym;
        const sideColor = side === "SELL" ? "#ef4444" : "#22c55e";
        const protectionLabel = getProfitProtectionLabel(t);
        const originalSl = t.original_sl ?? t.initial_sl ?? t.sl ?? "--";
        const currentSl = t.sl ?? "--";
        const tp1 = t.tp1 ?? "--";
        const tp2 = t.tp2 ?? t.tp ?? "--";
        const displayResult = getTradeDisplayResult(t);
        const protectedText = getTradeProtectedText(t);

        return `
          <div style="margin-bottom:5px;padding:7px 9px;border-radius:12px;background:rgba(30,41,59,.70);border:1px solid rgba(148,163,184,.16);">
            <div style="display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center;">
              <strong style="font-size:12px;color:#f8fafc;">${display}</strong>
              <span style="
                font-size:9px;
                font-weight:900;
                color:#38bdf8;
                background:rgba(56,189,248,.12);
                border:1px solid rgba(56,189,248,.25);
                padding:2px 6px;
                border-radius:7px;
              ">
                ${source}
              </span>
              <span style="color:${sideColor};background:${sideColor}22;padding:2px 6px;border-radius:7px;font-size:9px;font-weight:900;">${side}</span>
              <span style="color:#60a5fa;background:#60a5fa22;padding:2px 6px;border-radius:7px;font-size:9px;font-weight:900;">${displayResult}</span>
            </div>
            <div style="margin-top:4px;font-size:10px;color:#cbd5e1;font-weight:700;line-height:1.25;">
              Entry ${t.entry ?? "--"} • Original SL ${originalSl} • Current SL ${currentSl}<br>
              TP1 ${tp1} • TP2 ${tp2} • Protected ${protectedText} • Result ${displayResult}
              ${protectionLabel ? `<br><span style="color:#86efac;">${protectionLabel}</span>` : ""}
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
      <div onclick="setAutoTradeFilter('WIN')" style="background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.35);border-radius:12px;padding:7px;cursor:pointer;text-align:center;">
        <div style="font-size:16px;font-weight:900;color:#22c55e;">${wins}</div>
        <div style="font-size:9px;color:#86efac;font-weight:800;">Wins</div>
      </div>
      <div onclick="setAutoTradeFilter('LOSS')" style="background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.35);border-radius:12px;padding:7px;cursor:pointer;text-align:center;">
        <div style="font-size:16px;font-weight:900;color:#ef4444;">${losses}</div>
        <div style="font-size:9px;color:#fca5a5;font-weight:800;">Losses</div>
      </div>
      <div onclick="setAutoTradeFilter('RUNNING')" style="background:rgba(250,204,21,.12);border:1px solid rgba(250,204,21,.35);border-radius:12px;padding:7px;cursor:pointer;text-align:center;">
        <div style="font-size:16px;font-weight:900;color:#facc15;">${running}</div>
        <div style="font-size:9px;color:#fde68a;font-weight:800;">Running</div>
      </div>
      <div onclick="setAutoTradeFilter('ALL')" style="background:rgba(96,165,250,.12);border:1px solid rgba(96,165,250,.35);border-radius:12px;padding:7px;cursor:pointer;text-align:center;">
        <div style="font-size:16px;font-weight:900;color:#60a5fa;">${total}</div>
        <div style="font-size:9px;color:#bfdbfe;font-weight:800;">Total</div>
      </div>
    </div>

    <div style="padding:8px;border-radius:14px;background:rgba(15,23,42,.55);border:1px solid rgba(148,163,184,.14);">
      <div style="font-size:11px;font-weight:900;color:#cbd5e1;margin-bottom:6px;">RECENT TRADES</div>

      <div style="max-height:175px;overflow-y:auto;padding-right:3px;">
        ${filteredHistory.length === 0 ? `
          <div class="live-empty">
            <div class="live-empty-title">No paper trades yet</div>
            <div class="live-empty-subtitle">
              New paper trades will appear here after the next valid setup.
            </div>
          </div>
        ` : filteredHistory.slice().reverse().map((t) => {
          const result = t.result || "RUNNING";
          const side = t.side || "--";
          const symbol = DISPLAY_NAMES[t.symbol] || t.symbol || "--";
          const sideColor = side === "SELL" ? "#ef4444" : "#22c55e";
          const normalizedResult = getPaperResult(t);
          const badgeColor = normalizedResult === "WIN" ? "#22c55e" : normalizedResult === "LOSS" ? "#ef4444" : normalizedResult === "CLOSED" ? "#94a3b8" : "#60a5fa";
          const protectionLabel = getProfitProtectionLabel(t);
          const originalSl = t.original_sl ?? t.initial_sl ?? t.sl ?? "--";
          const currentSl = t.sl ?? "--";
          const tp1 = t.tp1 ?? "--";
          const tp2 = t.tp2 ?? t.tp ?? "--";
          const protectedText = getTradeProtectedText(t);

          return `
            <details style="margin-bottom:4px;border-radius:11px;background:rgba(30,41,59,.70);border:1px solid rgba(148,163,184,.16);overflow:hidden;">
              <summary style="list-style:none;cursor:pointer;padding:5px 8px;display:grid;grid-template-columns:1fr auto auto;gap:5px;align-items:center;font-weight:900;color:#f8fafc;">
                <span style="font-size:12px;">${symbol}</span>
                <span style="color:${sideColor};background:${sideColor}22;padding:2px 6px;border-radius:7px;font-size:9px;">${side}</span>
                <span style="color:${badgeColor};background:${badgeColor}22;padding:2px 6px;border-radius:7px;font-size:9px;">${result}</span>
              </summary>
              <div style="padding:0 8px 7px;color:#cbd5e1;font-size:10px;line-height:1.35;">
                Entry: <b>${t.entry ?? "--"}</b><br>
                Original SL: <b>${originalSl}</b> • Current SL: <b>${currentSl}</b><br>
                TP1: <b>${tp1}</b> • TP2: <b>${tp2}</b> • Protected: <b>${protectedText}</b><br>
                ${protectionLabel ? `<span style="color:#86efac;font-weight:900;">${protectionLabel}</span><br>` : ""}
                Pips: <b>${t.pips ?? 0}</b>
              </div>
            </details>
          `;
        }).join("")}
      </div>
    </div>

  </div>
`;
  }

  }

function updateLivePanel(liveTrades, liveHistory = [], stats = null) {
  activeLiveOrders =
    liveConnectionState.connected
      ? sanitizeActiveLiveOrders(liveTrades)
      : {
          EURUSD: null,
          XAUUSD: null
        };

  liveTradeHistory =
    Array.isArray(liveHistory)
      ? liveHistory
      : [];

  if (stats && typeof stats === "object") {
    liveTradeStats = {
      ...liveTradeStats,
      ...stats
    };
  }

  clearTradeLines("EURUSD");
  clearTradeLines("XAUUSD");
  clearInactiveTradeVisualLines();

  renderLiveTotalTradesCard();
  renderLiveActiveOrders();
  renderLiveHistory();
  drawTradeVisualLevels();

}

function formatMarketSource(value) {
  const text = String(value || "--").toLowerCase();

  if (text === "ctrader") return "cTrader";
  if (text === "twelvedata") return "Twelve Data";
  if (text === "hybrid") return "hybrid";

  return value || "--";
}

function ensureMarketDataStatusEl() {
  if (!paperModal) return null;

  let el = document.getElementById("marketDataSourceStatus");

  if (el) return el;

  const anchor = document.querySelector(".execution-page-tabs");
  const box = paperModal.querySelector(".trade-modal-box");

  if (!box) return null;

  el = document.createElement("div");
  el.id = "marketDataSourceStatus";
  el.className = "market-data-source-status";
  el.textContent = "Data Health: --";

  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(el, anchor);
  } else {
    box.appendChild(el);
  }

  return el;
}

function renderMarketDataSourceStatus() {
  const el = ensureMarketDataStatusEl();

  if (!el) return;

  if (executionPage !== "live") {
    el.classList.add("hidden");
    el.style.setProperty("display", "none", "important");
    return;
  }

  el.classList.remove("hidden");
  el.style.removeProperty("display");

  const status = marketDataSourceStatus || {};
  const staleKeys = Array.isArray(status.stale_keys)
    ? status.stale_keys
    : [];
  const rawHealth = String(status.data_health || "").toUpperCase();
  const dataHealth =
    rawHealth === "OK" && staleKeys.length === 0
      ? "OK"
      : (rawHealth || staleKeys.length)
        ? "STALE"
        : "--";

  el.replaceChildren();

  [
    `Data Health: ${dataHealth}`,
    `Live Price: ${String(status.live_price_health || "--").toUpperCase()}`,
    staleKeys.length ? `Stale: ${staleKeys.join(", ")}` : null
  ]
    .filter(Boolean)
    .forEach((text) => {
      const item = document.createElement("span");
      item.textContent = text;

      if (
        text.includes("Data Health: STALE") ||
        text.includes("Live Price: STALE") ||
        text.startsWith("Stale:")
      ) {
        item.classList.add("warning");
      }

      el.appendChild(item);
    });
}

function ensureAutoTradeStatusEl() {
  if (!paperModal) return null;

  let el = document.getElementById("autoTradeStatus");

  if (el) return el;

  const anchor = document.querySelector(".execution-page-tabs");
  const marketEl = document.getElementById("marketDataSourceStatus");
  const box = paperModal.querySelector(".trade-modal-box");

  if (!box) return null;

  el = document.createElement("div");
  el.id = "autoTradeStatus";
  el.className = "auto-trade-status";
  el.textContent = "Auto Trade: Waiting";

  if (marketEl && marketEl.parentNode) {
    marketEl.parentNode.insertBefore(el, marketEl.nextSibling);
  } else if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(el, anchor);
  } else {
    box.appendChild(el);
  }

  return el;
}

function ensureLiveAutoSymbolStatusEl() {
  if (!paperModal) return null;

  let el = document.getElementById("liveAutoSymbolStatus");

  if (el) return el;

  const anchor = ensureAutoTradeStatusEl();
  const box = paperModal.querySelector(".trade-modal-box");

  if (!box) return null;

  el = document.createElement("div");
  el.id = "liveAutoSymbolStatus";
  el.className = "auto-trade-status live-auto-symbol-status";

  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(el, anchor.nextSibling);
  } else {
    box.appendChild(el);
  }

  return el;
}

function ensureLiveTotalTradesCard() {
  if (!liveAutoSection) return null;

  if (!isAdminAccount()) {
    document.getElementById("livePnlCardRow")?.remove();
    return null;
  }

  const oldTotalCard = document.getElementById("liveTotalTradesCard");
  const existingRow = document.getElementById("livePnlCardRow");

  if (oldTotalCard) {
    oldTotalCard.remove();
  }

  if (existingRow) return existingRow;

  const oldWeeklyCard = document.getElementById("liveWeeklyPnlCard");
  const oldFloatingCard = document.getElementById("liveFloatingPnlCard");

  if (oldWeeklyCard) oldWeeklyCard.remove();
  if (oldFloatingCard) oldFloatingCard.remove();

  let el = document.createElement("div");
  el.id = "livePnlCardRow";
  el.className = "live-pnl-card-row";
  el.innerHTML = `
    <div id="liveWeeklyPnlCard" class="live-pnl-card">
      <small>Weekly P/L</small>
      <strong>$0.00</strong>
    </div>
    <div id="liveFloatingPnlCard" class="live-pnl-card">
      <small>Floating P/L</small>
      <strong>$0.00</strong>
    </div>
  `;
  liveAutoSection.appendChild(el);

  return el;
}

function renderLiveTotalTradesCard() {
  if (!isAdminAccount()) {
    document.getElementById("livePnlCardRow")?.remove();
    return;
  }

  ensureLiveTotalTradesCard();

  const weeklyEl = document.getElementById("liveWeeklyPnlCard");
  const floatingEl = document.getElementById("liveFloatingPnlCard");

  if (!weeklyEl || !floatingEl) return;

  const floatingPnl = Number.isFinite(Number(liveTradeStats.floating_live_pl))
    ? Number(liveTradeStats.floating_live_pl)
    : Object.values(activeLiveOrders || {})
      .filter((trade) => trade && isLiveTradeActiveForDisplay(trade))
      .reduce((sum, trade) => {
        const pnl = getLiveTradePnl(trade);

        return sum + (Number.isFinite(pnl) ? pnl : 0);
      }, 0);
  const realizedPnl = Number.isFinite(Number(liveTradeStats.weekly_realized_pl))
    ? Number(liveTradeStats.weekly_realized_pl)
    : 0;
  const weeklyPnl = Number.isFinite(Number(liveTradeStats.weekly_total_pl))
    ? Number(liveTradeStats.weekly_total_pl)
    : realizedPnl + floatingPnl;

  [
    [weeklyEl, "Weekly P/L", weeklyPnl],
    [floatingEl, "Floating P/L", floatingPnl]
  ].forEach(([card, label, value]) => {
    const pnlClass = value > 0 ? "positive" : value < 0 ? "negative" : "";

    card.classList.toggle("positive", value > 0);
    card.classList.toggle("negative", value < 0);
    card.innerHTML = `<small>${label}</small><strong class="${pnlClass}">${formatLiveMoney(value)}</strong>`;
  });
}

function sanitizeActiveLiveOrders(liveTrades = {}) {
  const cleaned = {
    EURUSD: null,
    XAUUSD: null
  };

  ["EURUSD", "XAUUSD"].forEach((symbol) => {
    const trade = liveTrades?.[symbol] || null;
    cleaned[symbol] = isLiveTradeActiveForDisplay(trade) ? trade : null;
  });

  return cleaned;
}

function formatDashboardMoney(value) {
  const amount = Number(value);
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const sign = safeAmount >= 0 ? "+" : "-";

  return `${sign}$${Math.abs(safeAmount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function renderDashboardPerformance(meta = {}) {
  updatePnlVisibility();

  const floating = Number(
    meta.floating_live_pl ??
    liveTradeStats.floating_live_pl ??
    0
  );
  const weeklyPnl = Number(
    meta.weekly_total_pl ??
    liveTradeStats.weekly_total_pl ??
    (
      Number(
        meta.weekly_realized_pl ??
        liveTradeStats.weekly_realized_pl ??
        0
      ) + floating
    )
  );
  const activeTrades = Object.values(
    sanitizeActiveLiveOrders(meta.live_active_orders || activeLiveOrders || {})
  ).filter(Boolean);

  [
    [dashboardWeeklyPnl, weeklyPnl],
    [dashboardFloatingPnl, floating]
  ].forEach(([element, value]) => {
    if (!element) return;

    const safeValue = Number.isFinite(value) ? value : 0;
    element.textContent = formatDashboardMoney(safeValue);
    element.classList.toggle("negative", safeValue < 0);
    element.classList.toggle("neutral", safeValue === 0);
  });

  if (dashboardOpenTrades) {
    dashboardOpenTrades.textContent = String(activeTrades.length);
  }

  if (!activeTrades.length) {
    clearTradeLines("EURUSD");
    clearTradeLines("XAUUSD");
  }
}

function formatAutoTradeStatusText(status) {
  const item = status || {};
  const state = String(item.status || "WAITING").toUpperCase();
  const symbol = item.symbol || "";
  const action = item.action || item.signal || "";
  const reason = getShortAutoTradeReason(item);

  if (state === "ORDER_SENT" || state === "EXECUTED") {
    if (reason && reason !== "Order sent") {
      return `Auto Trade: ${reason} - ${symbol} ${action}`.trim();
    }

    return `Auto Trade: Order sent - ${symbol} ${action}`.trim();
  }

  if (state === "ORDER_REJECTED") {
    return `Auto Trade: Rejected - ${reason || "order rejected"}`;
  }

  if (state === "BLOCKED") {
    return `Auto Trade: Blocked - ${reason || "safety check"}`;
  }

  if (state === "WAIT") {
    return `Auto Trade: ${reason || "Waiting"}`;
  }

  return `Auto Trade: ${reason || "Waiting"}`;
}

function stringifyAutoTradeValue(value) {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") return value;

  try {
    return JSON.stringify(value);
  } catch (err) {
    return String(value);
  }
}

function formatRiskPercent(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) return null;

  return `${number.toFixed(2)}%`;
}

function getAutoTradeDetails(item) {
  const details = item?.details && typeof item.details === "object"
    ? item.details
    : {};

  return {
    ...details,
    ...(item && typeof item.reason === "object" ? item.reason : {})
  };
}

function getShortAutoTradeReason(item) {
  const reasonText = stringifyAutoTradeValue(item?.reason);
  const details = getAutoTradeDetails(item);
  const finalRisk =
    details.final_risk_percent ??
    details.risk_percent_if_minimum ??
    details.minimum_volume_risk_percent;
  const requiredRisk = details.risk_percent ?? details.required_risk_percent ?? 0.5;

  if (
    reasonText.includes("Calculated risk is not close")
    || reasonText.includes("Calculated volume is below broker minimum")
    || reasonText.includes("minimum broker volume")
    || Number.isFinite(Number(finalRisk))
  ) {
    const finalRiskText = formatRiskPercent(finalRisk);
    const requiredRiskText = formatRiskPercent(requiredRisk) || "0.50%";

    return [
      finalRiskText
        ? `Minimum broker volume would risk ${finalRiskText}.`
        : "Minimum broker volume would exceed the allowed risk.",
      `Required risk: ${requiredRiskText}.`,
      "Trade not sent."
    ].join(" ");
  }

  if (typeof item?.reason === "object" || reasonText.trim().startsWith("{") || reasonText.trim().startsWith("[")) {
    return "Safety check blocked trade. Trade not sent.";
  }

  if (reasonText.length > 140) {
    return `${reasonText.slice(0, 137).trim()}...`;
  }

  return reasonText || "Waiting";
}

function formatAutoTradeDetailsPreview(item) {
  const details = getAutoTradeDetails(item);
  const lines = [];

  if (details.entry_price ?? details.entry) {
    lines.push(`Entry ${details.entry_price ?? details.entry}`);
  }

  if (details.sl_price ?? details.sl) {
    lines.push(`SL ${details.sl_price ?? details.sl}`);
  }

  if (details.tp1 ?? details.tp_price) {
    lines.push(`TP1 ${details.tp1 ?? details.tp_price}`);
  }

  if (details.tp2) {
    lines.push(`TP2 ${details.tp2}`);
  }

  if (details.sl_distance_pips) {
    lines.push(`SL distance ${details.sl_distance_pips} pips`);
  }

  if (details.broker_minimum_distance_pips) {
    lines.push(`Broker min ${details.broker_minimum_distance_pips} pips`);
  }

  if (details.final_risk_percent) {
    lines.push(`Rounded risk ${formatRiskPercent(details.final_risk_percent)}`);
  }

  return lines.slice(0, 6);
}

function formatBrokerMinDistanceDetails(item) {
  const details = getAutoTradeDetails(item);
  const lines = [];
  const minDistance = details.broker_minimum_distance_pips;
  const slDistance = details.sl_distance_pips;
  const tp1Distance = details.tp1_distance_pips ?? details.tp_distance_pips;
  const tp2Distance = details.tp2_distance_pips;
  const failed = Array.isArray(details.failed_distance_fields)
    ? details.failed_distance_fields.filter(Boolean).join(", ")
    : details.failed_distance;

  if (minDistance !== undefined && minDistance !== null) {
    lines.push(`Minimum required: ${minDistance} pips`);
  }

  if (slDistance !== undefined && slDistance !== null) {
    lines.push(`Current SL distance: ${slDistance} pips`);
  }

  if (tp1Distance !== undefined && tp1Distance !== null) {
    lines.push(`Current TP1 distance: ${tp1Distance} pips`);
  }

  if (tp2Distance !== undefined && tp2Distance !== null) {
    lines.push(`Current TP2 distance: ${tp2Distance} pips`);
  }

  if (failed) {
    lines.push(`Failed: ${failed}`);
  }

  return lines.slice(0, 5);
}

function formatVolumeSafetyDetails(item) {
  const details = getAutoTradeDetails(item);
  const lines = [];

  if (details.risk_percent !== undefined && details.risk_percent !== null) {
    lines.push(`Risk: ${details.risk_percent}%`);
  }

  if (details.stop_loss_pips ?? details.sl_pips) {
    lines.push(`SL pips: ${details.stop_loss_pips ?? details.sl_pips}`);
  }

  if (details.stop_loss_price_distance !== undefined && details.stop_loss_price_distance !== null) {
    lines.push(`SL price distance: ${details.stop_loss_price_distance}`);
  }

  if (details.lot_size_before_rounding ?? details.calculated_lots ?? details.raw_lots) {
    lines.push(`Lot before rounding: ${details.lot_size_before_rounding ?? details.calculated_lots ?? details.raw_lots}`);
  }

  if (details.lot_size_after_rounding ?? details.lot_size ?? details.rounded_lots) {
    lines.push(`Lot after rounding: ${details.lot_size_after_rounding ?? details.lot_size ?? details.rounded_lots}`);
  }

  if (details.broker_min_volume ?? details.min_volume_units ?? details.minVolume) {
    lines.push(`Broker min volume: ${details.broker_min_volume ?? details.min_volume_units ?? details.minVolume}`);
  }

  if (details.broker_max_volume ?? details.max_volume_units ?? details.maxVolume) {
    lines.push(`Broker max volume: ${details.broker_max_volume ?? details.max_volume_units ?? details.maxVolume}`);
  }

  if (details.broker_volume_step ?? details.volume_step_units ?? details.stepVolume) {
    lines.push(`Broker step: ${details.broker_volume_step ?? details.volume_step_units ?? details.stepVolume}`);
  }

  if (details.final_volume ?? details.volume_in_payload ?? details.volume_units) {
    lines.push(`Final volume: ${details.final_volume ?? details.volume_in_payload ?? details.volume_units}`);
  }

  if (details.blocked_reason || details.broker_rejection_reason) {
    lines.push(`Blocked: ${details.blocked_reason || details.broker_rejection_reason}`);
  }

  return lines.slice(0, 10);
}

function escapeLiveAutoStatusText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLiveAutoSymbolReason(symbol, status) {
  const item = status || {};
  const state = String(item.status || "WAIT").toUpperCase();
  const signal = String(item.signal || item.action || "--").toUpperCase();
  const rawReason = stringifyAutoTradeValue(item.reason);
  const activeSide =
    item.active_trade?.side ||
    item.active_trade?.action ||
    null;

  if (state === "BLOCKED" || state === "ORDER_REJECTED") {
    const lowerReason = rawReason.toLowerCase();
    let blockedLabel = "safety check";

    if (activeSide || lowerReason.includes("already running")) {
      blockedLabel = "trade already running";
    } else if (lowerReason.includes("volume") || lowerReason.includes("risk")) {
      blockedLabel = "volume safety";
    } else if (lowerReason.includes("minimum") || lowerReason.includes("distance")) {
      blockedLabel = "broker min distance";
    } else if (lowerReason.includes("stale") || lowerReason.includes("market data")) {
      blockedLabel = "stale market data";
    } else if (lowerReason.includes("cooldown")) {
      blockedLabel = "cooldown active";
    } else if (lowerReason.includes("broker") || lowerReason.includes("disconnect")) {
      blockedLabel = "broker disconnected";
    }

    return escapeLiveAutoStatusText(
      `${symbol}: NOT EXECUTED • ${blockedLabel}`
    );
  }

  if (state === "WAIT" || state === "WAITING") {
    if (signal === "BUY" || signal === "SELL") {
      const shortWaitReason = rawReason
        ? rawReason.replace(/^Blocked:\s*/i, "").slice(0, 80)
        : "strategy not complete";

      return escapeLiveAutoStatusText(
        `${symbol}: NOT EXECUTED • ${shortWaitReason}`
      );
    }

    return escapeLiveAutoStatusText(
      `${symbol}: WAIT • No valid entry`
    );
  }

  return escapeLiveAutoStatusText(
    `${symbol}: ${state} • ${signal}`
  );
}

function renderLiveAutoSymbolStatus() {
  const el = ensureLiveAutoSymbolStatusEl();

  if (!el) return;

  el.classList.add("hidden");
  el.style.setProperty("display", "none", "important");
  el.innerHTML = "";
}

function renderAutoTradeStatus() {
  const el = ensureAutoTradeStatusEl();

  if (!el) return;

  el.classList.remove("hidden");
  el.classList.add("hidden");
  el.style.setProperty("display", "none", "important");
  el.textContent = "";
  el.classList.remove("blocked", "sent");
  renderLiveAutoSymbolStatus();
}

async function fetchAutoTradeStatus() {
  try {
    const res = await fetch(`${BASE_URL}/auto-trade-status`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const status = await res.json();
    autoTradeStatus = status;
    liveAutoStatusBySymbol =
      status?.live_auto_status_by_symbol || liveAutoStatusBySymbol || {};
    renderAutoTradeStatus();
  } catch (err) {
    console.warn("AUTO TRADE STATUS ERROR:", err);
  }
}

async function fetchMarketDataSourceStatus() {
  try {
    const res = await fetch(`${BASE_URL}/market-data-source`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    marketDataSourceStatus = await res.json();
    renderMarketDataSourceStatus();
  } catch (err) {
    console.warn("MARKET DATA SOURCE STATUS ERROR:", err);
  }
}

function applyCtraderStatus(status) {
  if (!status || typeof status !== "object") return;

  liveConnectionState.connected = Boolean(status.connected);
  liveConnectionState.reason = status.reason || "";
  liveConnectionState.account_id = status.account_id || null;
  liveConnectionState.live_positions_count =
    Number(status.live_positions_count || 0);
  liveConnectionState.last_success = status.last_success || null;
  liveConnectionState.last_error = status.last_error || null;

  if (!liveConnectionState.connected) {
    liveAutoEnabled = false;
    activeLiveOrders = {
      EURUSD: null,
      XAUUSD: null
    };
    clearTradeLines("EURUSD");
    clearTradeLines("XAUUSD");
  }

  updateLiveToggleUI();
  renderAutoTradeStatus();
}

async function fetchCtraderStatus() {
  try {
    const res = await fetch(`${BASE_URL}/ctrader-status`, {
      method: "GET",
      cache: "no-store"
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const status = await res.json();
    applyCtraderStatus(status);
    return status;
  } catch (err) {
    console.warn("CTRADER STATUS ERROR:", err);
    return null;
  }
}

async function closeLiveTrade(symbol) {
  try {
    const res = await fetch(
      `${BASE_URL}/close-live-trade`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol })
      }
    );

    const result = await res.json();

    if (!result.ok) {
      setStatus(
        `● CLOSE BLOCKED • ${result.reason || result.message || "no active trade"}`,
        "error"
      );
      return;
    }

    setStatus(
      `● LIVE CLOSED • ${result.symbol || symbol}`,
      "live"
    );

    await refreshPanel();
  } catch (err) {
    console.error("CLOSE LIVE TRADE ERROR:", err);
    setStatus(
      `● CLOSE ERROR • ${err.message}`,
      "error"
    );
  }
}

async function refreshPanel() {
  if (panelRefreshInProgress) {
    console.log("⏭️ refreshPanel skipped: previous request still running");
    return;
  }

  panelRefreshInProgress = true;
  let badgeSettled = false;

  try {
    setConnectionBadge("loading", "Updating panel data...");

    console.log("⏳ Fetching panel data from:", API_URL);

    const res = await fetch(API_URL, {
      method: "GET",
      cache: "no-store"
    });

    console.log("✅ Response status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

   const rawData = await res.json();

const liveCandles = rawData?.candles?.[currentChartSymbol]?.[currentChartTimeframe] || [];
const lastCandle = liveCandles[liveCandles.length - 1];
console.log("LAST CANDLE", currentChartSymbol, lastCandle);

const feedStatus = rawData?.feed_status?.[currentChartSymbol];
const marketClosed = Boolean(rawData?.market_closed || feedStatus?.market_closed);

MARKET_IS_CLOSED = marketClosed;
_CHART_IDLE_ENABLED = !marketClosed;

// 🧊 FREEZE BACKEND CANDLES BEFORE SAVING rawData
if (marketClosed) {
  if (!frozenCandlesCache && rawData?.candles) {
    frozenCandlesCache = JSON.parse(JSON.stringify(rawData.candles));
    console.log("🧊 Frozen candle cache saved");
  }

  if (frozenCandlesCache) {
    rawData.candles = frozenCandlesCache;
  }
} else {
  frozenCandlesCache = null;
  frozenChart = {};
}

latestRawPanelData = rawData;
latestPanelFetchedAt = Date.now();
lastGoodPanelData = rawData;

console.log("🔥 Raw panel data:", rawData);

const data = normalizePanelData(rawData);
latestPanelData = data;

const meta = rawData?._meta || {};

if (typeof meta.paper_auto_enabled === "boolean") {
  paperAutoEnabled = meta.paper_auto_enabled;
  localStorage.setItem(
    "paper_auto_enabled",
    paperAutoEnabled ? "true" : "false"
  );
  updatePaperToggleUI();
}

if (typeof meta.live_auto_enabled === "boolean") {
  liveAutoEnabled = meta.live_auto_enabled;
}

if (meta.live_account) {

  liveConnectionState.connected =
    Boolean(meta.live_account.connected);

  liveConnectionState.mode =
    meta.live_account.mode || "broker";

  activeLiveOrders =
    sanitizeActiveLiveOrders(meta.live_active_orders || {});

  liveTradeHistory =
    Array.isArray(meta.live_trade_history)
      ? meta.live_trade_history
      : [];

  if (meta.live_trade_stats) {
    liveTradeStats = {
      ...liveTradeStats,
      ...meta.live_trade_stats
    };
  }

  renderDashboardPerformance(meta);

  if (meta.auto_trade_status) {
    autoTradeStatus = meta.auto_trade_status;
    liveAutoStatusBySymbol =
      meta.live_auto_status_by_symbol || liveAutoStatusBySymbol || {};
    renderAutoTradeStatus();
  }

  if (meta.live_prices) {
    livePrices = meta.live_prices;
  }

  if (meta.live_price_health) {
    marketDataSourceStatus = {
      ...(marketDataSourceStatus || {}),
      live_price_health: meta.live_price_health,
      live_price_last_update: meta.live_price_last_update
    };
    renderMarketDataSourceStatus();
  }

  renderLiveHistory();
  renderLiveActiveOrders(); 

  updateLiveToggleUI();
}

const ctraderStatus = await fetchCtraderStatus();

if (ctraderStatus && !ctraderStatus.connected) {
  liveAutoEnabled = false;
}

if (paperModal && !paperModal.classList.contains("hidden")) {
  fetchMarketDataSourceStatus();
  fetchAutoTradeStatus();
}

updateCard("EURUSD", data.EURUSD);
updateCard("XAUUSD", data.XAUUSD);

updateMainPanel(currentChartSymbol);
   renderHistory(rawData?.history || []);
updatePaperPanel(
  rawData?.paper_trades || {},
  rawData?.paper_trade_history || [],
  rawData?.paper_trade_stats || {}
);

updateLivePanel(
  meta.live_active_orders || {},
  meta.live_trade_history || [],
  meta.live_trade_stats || null
);

processVoiceAnnouncements(data, meta, rawData);

if (meta.auto_trade_status) {
  autoTradeStatus = meta.auto_trade_status;
  liveAutoStatusBySymbol =
    meta.live_auto_status_by_symbol || liveAutoStatusBySymbol || {};
  renderAutoTradeStatus();
}

const chartCandles =
  rawData?.candles?.[currentChartSymbol]?.[currentChartTimeframe] || [];

const alreadyHasChart =
  lastChartData?.[currentChartSymbol]?.[currentChartTimeframe]?.length > 0;

if (chartCandles.length && (!marketClosed || !alreadyHasChart)) {
  renderChartFromPanel(rawData, currentChartSymbol, currentChartTimeframe);
} else if (marketClosed) {
  console.log("🧊 Market closed: chart frozen");
} else {
  console.warn(`No chart candles found for ${currentChartSymbol}`);
}


updateUTC();
    const local = new Date().toLocaleTimeString();
    const currentFeed = rawData?.feed_status?.[currentChartSymbol];
    const feedStaleMinutes = Number(currentFeed?.stale_minutes);
    const dataAgeMs = Date.now() - latestPanelFetchedAt;
    const isDelayed =
      marketClosed ||
      meta?.source === "cache" ||
      (Number.isFinite(feedStaleMinutes) && feedStaleMinutes >= 1) ||
      dataAgeMs > 60000;
    const updateDetail = `Last updated: ${local}`;

    if (meta?.source === "fallback_cache" && meta?.error) {
      setConnectionBadge("error", `Connection issue: ${meta.error}`);
    } else if (isDelayed) {
      setConnectionBadge(
        "stale",
        marketClosed
          ? `${updateDetail}; market closed`
          : `${updateDetail}; live loading`
      );
    } else {
      setConnectionBadge("live", updateDetail);
    }
    badgeSettled = true;
  } catch (err) {
  console.error("❌ Refresh error:", err);
  updateUTC();

  if (lastGoodPanelData) {
    console.log("🟡 Using last good panel data");

    const cachedData = normalizePanelData(lastGoodPanelData);

    updateCard("EURUSD", cachedData.EURUSD);
    updateCard("XAUUSD", cachedData.XAUUSD);

    if (lastGoodPanelData?.candles?.[currentChartSymbol]?.[currentChartTimeframe]?.length) {
  latestRawPanelData = lastGoodPanelData;
  renderChartFromPanel(lastGoodPanelData, currentChartSymbol, currentChartTimeframe);
}

    setConnectionBadge("error", `Connection issue: ${err.message}; using last successful panel data`);
    badgeSettled = true;
  } else {
    setConnectionBadge("error", `Connection issue: ${err.message}`);
    badgeSettled = true;
  }
} finally {
    if (!badgeSettled) {
      setConnectionBadge("error", "Panel refresh ended before status updated");
    }
    panelRefreshInProgress = false;
  }
}
   

// ==============================
// MODAL EVENTS
// ==============================

let paperSavedScrollY = 0;

function openPaperPanel() {
  if (!paperModal) return;

  paperSavedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

  paperModal.classList.remove("hidden");
  updateExecutionPageUI();
  fetchCtraderStatus();
  fetchMarketDataSourceStatus();
  fetchAutoTradeStatus();

  document.documentElement.classList.add("paper-open");
  document.body.classList.add("paper-open");

  document.body.style.position = "fixed";
  document.body.style.top = `-${paperSavedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  if (sideMenu) sideMenu.classList.add("hidden");
}

function closePaperPanel() {
  if (!paperModal) return;

  paperModal.classList.add("hidden");

  document.documentElement.classList.remove("paper-open");
  document.body.classList.remove("paper-open");

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  window.scrollTo(0, paperSavedScrollY);
}

if (menuPaperBtn) {
  menuPaperBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPaperPanel();
  });
}

if (closePaperBtn) {
  closePaperBtn.addEventListener("click", closePaperPanel);
}

if (paperModal) {
  paperModal.addEventListener("click", (e) => {
    if (e.target === paperModal) {
      closePaperPanel();
    }
  });
}

const paperBox = paperModal
  ? paperModal.querySelector(".trade-modal-box")
  : null;

if (paperBox) {
  paperBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
function updatePaperToggleUI() {
  if (!paperAutoToggleBtn) return;

  paperAutoToggleBtn.textContent =
    paperAutoEnabled
      ? "Paper Auto: ON"
      : "Paper Auto: OFF";

  paperAutoToggleBtn.style.background =
  paperAutoEnabled
    ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
    : "#374151";
}

if (paperAutoToggleBtn) {
  paperAutoToggleBtn.addEventListener("click", async () => {
    const previousPaperAutoEnabled = paperAutoEnabled;
    paperAutoEnabled = !paperAutoEnabled;

    localStorage.setItem(
      "paper_auto_enabled",
      paperAutoEnabled ? "true" : "false"
    );

    updatePaperToggleUI();

    try {

      const response = await fetch(
        `${BASE_URL}/paper-auto-toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            enabled: paperAutoEnabled,
            token: ADMIN_CODE
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      paperAutoEnabled =
        typeof data.enabled === "boolean"
          ? data.enabled
          : paperAutoEnabled;
      localStorage.setItem(
        "paper_auto_enabled",
        paperAutoEnabled ? "true" : "false"
      );
      updatePaperToggleUI();
      showAssistantMessage(
        assistantEventMessage(
          paperAutoEnabled ? "paperAutoOn" : "paperAutoOff"
        ),
        `PAPER AUTO ${paperAutoEnabled ? "ON" : "OFF"}`
      );

      console.log("AUTO TRADE:", data);

      await refreshPanel();

    } catch (err) {
      paperAutoEnabled = previousPaperAutoEnabled;
      updatePaperToggleUI();

      console.error(
        "Auto trade toggle failed:",
        err
      );

      setStatus(
        `● AUTO TRADE ERROR • ${err.message}`,
        "error"
      );
    }

  });
}

let pendingLiveAutoState = null;

function hideLiveAutoConfirm() {
  pendingLiveAutoState = null;

  if (!liveAutoConfirmOverlay) return;

  liveAutoConfirmOverlay.classList.add("hidden");
}

function showLiveAutoConfirm(nextEnabled) {
  pendingLiveAutoState = Boolean(nextEnabled);

  if (!liveAutoConfirmOverlay || !liveAutoConfirmMessage || !liveAutoConfirmOk) {
    applyLiveAutoToggle(pendingLiveAutoState);
    return;
  }

  liveAutoConfirmMessage.textContent = pendingLiveAutoState
    ? "FlowSignal will place trades on your connected broker account. Continue?"
    : "Turn Live Auto OFF?";

  liveAutoConfirmOk.classList.toggle("confirm-on", pendingLiveAutoState);
  liveAutoConfirmOk.classList.toggle("confirm-off", !pendingLiveAutoState);
  liveAutoConfirmOverlay.classList.remove("hidden");
  liveAutoConfirmOk.focus();
}

async function applyLiveAutoToggle(nextEnabled) {
  liveAutoEnabled = Boolean(nextEnabled);

  try {
    const response = await fetch(
      `${BASE_URL}/live-auto-toggle`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          enabled: liveAutoEnabled
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    liveAutoEnabled = Boolean(result.enabled);

    if (nextEnabled && !result.enabled && result.message) {
      setStatus(
        `● LIVE AUTO BLOCKED • ${result.message}`,
        "error"
      );
      showAssistantMessage(
        assistantBlockedLine(getVoiceBlockedReason({ reason: result.message })),
        "LIVE AUTO BLOCKED"
      );
    } else {
      showAssistantMessage(
        assistantEventMessage(
          liveAutoEnabled ? "liveAutoOn" : "liveAutoOff"
        ),
        `LIVE AUTO ${liveAutoEnabled ? "ON" : "OFF"}`
      );
    }

  } catch (err) {

    liveAutoEnabled = false;

    console.error(
      "LIVE toggle error:",
      err
    );
  }

  updateLiveToggleUI();
  refreshPanel();
}

if (liveAutoToggleBtn) {

  liveAutoToggleBtn.addEventListener(
    "click",
    () => {

      if (!liveConnectionState.connected) {
        liveAutoEnabled = false;
        updateLiveToggleUI();
        setStatus(
          "● LIVE AUTO BLOCKED • broker disconnected",
          "error"
        );
        showAssistantMessage(
          assistantBlockedLine(
            (ASSISTANT_COPY[currentLang] || ASSISTANT_COPY.en)
              .blockedReasons.disconnected
          ),
          "LIVE AUTO BLOCKED"
        );
        return;
      }

      const nextEnabled = !liveAutoEnabled;
      showLiveAutoConfirm(nextEnabled);
    }
  );

}

if (liveAutoConfirmCancel) {
  liveAutoConfirmCancel.addEventListener("click", hideLiveAutoConfirm);
}

if (liveAutoConfirmOk) {
  liveAutoConfirmOk.addEventListener("click", async () => {
    const nextEnabled = pendingLiveAutoState;
    hideLiveAutoConfirm();

    if (nextEnabled === null) return;

    await applyLiveAutoToggle(nextEnabled);
  });
}

if (liveAutoConfirmOverlay) {
  liveAutoConfirmOverlay.addEventListener("click", (event) => {
    if (event.target === liveAutoConfirmOverlay) {
      hideLiveAutoConfirm();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    liveAutoConfirmOverlay &&
    !liveAutoConfirmOverlay.classList.contains("hidden")
  ) {
    hideLiveAutoConfirm();
  }
});

updatePaperToggleUI();
updateLiveToggleUI();
updateExecutionPageUI();

if (tradeCancelBtn) {
  tradeCancelBtn.addEventListener("click", hideTradeModal);
}

if (tradeConfirmBtn) {
  tradeConfirmBtn.addEventListener("click", async () => {
    if (!pendingTrade) return;

    const { symbol, action } = pendingTrade;
    hideTradeModal();
    await executeTrade(symbol, action);
  });
}

if (tradeModal) {
  tradeModal.addEventListener("click", (event) => {
    if (event.target === tradeModal) {
      hideTradeModal();
    }
  });
}

function getLiveSourceBadge(trade) {
  const source =
    String(trade?.source || "").toLowerCase();

  if (source === "broker") return "BROKER";
  if (source === "test") return "TEST";
  if (source === "sim") return "SIM";

  return "LIVE";
}

function formatLiveNumber(value, digits = 2) {
  const number = Number(value);

  if (!Number.isFinite(number)) return "--";

  const displayNumber = number >= 1000
    ? number / (100000 * 100)
    : number;

  return displayNumber.toFixed(digits);
}

function formatLiveMoney(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) return "--";

  if (number > 0) return `+$${number.toFixed(2)}`;
  if (number < 0) return `-$${Math.abs(number).toFixed(2)}`;

  return "$0.00";
}

function getLiveTradePnl(trade) {
  const candidates = [
    trade?.floating_pl,
    trade?.floating_pnl,
    trade?.broker_pnl,
    trade?.pnl,
    trade?.profit,
    trade?.floatingProfit,
    trade?.floatingPnl,
    trade?.result?.pnl,
    trade?.result?.profit,
    trade?.result?.netProfit
  ];

  for (const value of candidates) {
    const number = Number(value);

    if (Number.isFinite(number)) return number;
  }

  return null;
}

function getLiveTradeId(trade) {
  return (
    trade?.trade_id ||
    trade?.broker_position_id ||
    trade?.position_id ||
    trade?.broker_order_id ||
    trade?.order_id ||
    "--"
  );
}

function getLiveTradeMatchId(trade) {
  const positionId = trade?.broker_position_id || trade?.position_id;

  if (positionId) return `position:${positionId}`;

  const orderId = trade?.broker_order_id || trade?.order_id;

  if (orderId) return `order:${orderId}`;

  if (trade?.trade_id) return `trade:${trade.trade_id}`;

  return "";
}

function getLiveTradeResult(trade) {
  if (hasConfirmedProfitProtection(trade) && String(trade?.status || "").toUpperCase() === "CLOSED") {
    return "WIN";
  }

  const result =
    typeof trade?.result === "string"
      ? trade.result
      : trade?.result?.result || trade?.result?.status;

  return String(result || trade?.status || "TRACKED").toUpperCase();
}

function formatLiveTime(value) {
  const time = value || Date.now();
  return new Date(time * (time < 10000000000 ? 1000 : 1)).toLocaleTimeString();
}

function renderLiveStatsRow() {
  const stats = calculateLiveDisplayStats();

  return `
    <div class="live-stats-row live-paper-match-stats">
      <span class="live-win-stat"><strong>${stats.wins ?? 0}</strong><small>Wins</small></span>
      <span class="live-loss-stat"><strong>${stats.losses ?? 0}</strong><small>Losses</small></span>
      <span class="live-running-stat"><strong>${stats.running ?? 0}</strong><small>Running</small></span>
      <span class="live-total-stat"><strong>${stats.total ?? 0}</strong><small>Total</small></span>
    </div>
  `;
}

function getLiveSymbolCardStatus(symbol, trade) {
  if (trade) {
    const result = getTradeDisplayResult(trade);
    const side = trade.side || trade.action || "";

    return {
      signal: side || "--",
      liveAuto: result === "TP1 HIT" ? "EXECUTED • TP1 HIT" : "EXECUTED",
      reason: "live trade open"
    };
  }

  return null;
}

function getLiveSymbolCardStatusClass(statusInfo) {
  const value = String(statusInfo?.liveAuto || statusInfo || "").toUpperCase();

  if (value.includes("BLOCKED")) return "blocked";
  if (value.includes("BROKER CLOSED")) return "closed";
  if (value.includes("EXECUTED") || value.includes("TP1")) return "running";

  return "";
}

function getLiveSymbolSignal(item) {
  const signal = String(item?.signal || item?.action || "WAIT").toUpperCase();

  return ["BUY", "SELL"].includes(signal) ? signal : "WAIT";
}

function getShortMissedTradeReason(item) {
  const signal = getLiveSymbolSignal(item);
  const reason = stringifyAutoTradeValue(item?.reason).toLowerCase();
  const details = getAutoTradeDetails(item);
  const failedDistanceFields = Array.isArray(details.failed_distance_fields)
    ? details.failed_distance_fields.filter(Boolean)
    : [];
  const distanceDebug = details.broker_min_distance_debug || {};
  const distanceActuallyFailed =
    Boolean(details.should_block_for_distance) ||
    Boolean(distanceDebug.blocked) ||
    failedDistanceFields.length > 0 ||
    Boolean(details.failed_distance) ||
    reason.includes("minimum distance") ||
    reason.includes("min distance") ||
    reason.includes("adjusted broker distances would make trade invalid");

  if (signal === "WAIT") return "no BUY/SELL signal";

  if (reason.includes("already running") || reason.includes("already active")) {
    return "trade already running";
  }

  if (
    reason.includes("stale")
    || reason.includes("market data")
    || reason.includes("data unhealthy")
  ) {
    return "stale data";
  }

  if (distanceActuallyFailed) {
    return "broker min distance";
  }

  if (
    reason.includes("volume")
    || reason.includes("risk sizing")
    || reason.includes("broker minimum")
    || details.final_risk_percent
  ) {
    return "volume safety";
  }

  if (reason.includes("cooldown")) return "cooldown";
  if (reason.includes("disconnected")) return "broker disconnected";
  if (reason.includes("off")) return "live auto off";

  return "no valid entry";
}

function getRecentClosedLiveStatusForSymbol(symbol) {
  const executionSymbol = String(symbol || "").toUpperCase();
  const trade = (liveTradeHistory || []).find((item) => {
    const itemSymbol = String(item?.symbol || "").toUpperCase();

    return itemSymbol === executionSymbol && !isLiveTradeActiveForDisplay(item);
  });

  if (!trade) return "";

  const result = getLiveTradeResult(trade);

  if (result === "BROKER_CLOSED") return "BROKER CLOSED";
  if (result === "STALE_CLOSED") return "STALE CLOSED";
  if (result === "PROTECTED_WIN") return "PROTECTED WIN";
  if (result === "MANUAL_CLOSE") return "MANUAL CLOSE";
  if (["WIN", "LOSS", "BE", "CLOSED"].includes(result)) return result;

  return "";
}

function isLiveTradeActiveForDisplay(trade) {
  const status = getLiveTradeResult(trade);
  const closedStatuses = [
    "WIN",
    "LOSS",
    "BE",
    "PROTECTED_WIN",
    "BROKER_CLOSED",
    "CLOSED",
    "STALE_CLOSED",
    "DISCONNECTED",
    "MANUAL_CLOSE"
  ];

  if (closedStatuses.includes(status)) return false;

  return ["RUNNING", "OPEN", "TP1 HIT"].includes(status);
}

function isPaperTradeActiveForDisplay(trade) {
  if (!trade) return false;

  const status = String(trade.status || "").toUpperCase();
  const result = String(trade.result || "").toUpperCase();
  const closedStatuses = [
    "WIN",
    "LOSS",
    "BE",
    "PROTECTED_WIN",
    "BROKER_CLOSED",
    "CLOSED",
    "STALE_CLOSED",
    "MANUAL_CLOSE"
  ];

  if (closedStatuses.includes(status) || closedStatuses.includes(result)) {
    return false;
  }

  return status === "OPEN" && ["RUNNING", "OPEN", "TP1 HIT"].includes(result || "RUNNING");
}

function hasRealLiveBrokerId(trade) {
  return Boolean(
    trade?.position_id ||
    trade?.broker_position_id ||
    trade?.broker_order_id ||
    trade?.order_id
  );
}

function getLiveTradeAcceptedStatus(trade) {
  const status = getLiveTradeResult(trade);

  if (["RUNNING", "OPEN", "TP1 HIT"].includes(status)) return "RUNNING";
  if (["WIN", "LOSS", "PROTECTED_WIN", "BROKER_CLOSED", "DISCONNECTED"].includes(status)) return status;

  return "";
}

function getTradeTimestampMs(trade) {
  const raw =
    trade?.closed_at ||
    trade?.opened_at ||
    trade?.time ||
    trade?.timestamp;
  const value = Number(raw);

  if (!Number.isFinite(value) || value <= 0) return 0;

  return value < 10000000000 ? value * 1000 : value;
}

function isCurrentWeekTrade(trade) {
  const now = new Date();
  const start = new Date(now);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  start.setDate(start.getDate() + mondayOffset);
  start.setHours(0, 0, 0, 0);

  return getTradeTimestampMs(trade) >= start.getTime();
}

function calculateLiveDisplayStats() {
  const activeTrades = Object.values(activeLiveOrders || {})
    .filter((trade) => (
      trade &&
      String(trade.source || "broker").toLowerCase() === "broker" &&
      hasRealLiveBrokerId(trade) &&
      getLiveTradeAcceptedStatus(trade) === "RUNNING"
    ));
  const activeIds = new Set(
    activeTrades.map((trade) => String(getLiveTradeMatchId(trade))).filter(Boolean)
  );
  const closedTrades = Array.isArray(liveTradeHistory)
    ? liveTradeHistory.filter((trade) => (
        trade &&
        String(trade.source || "broker").toLowerCase() === "broker" &&
        hasRealLiveBrokerId(trade) &&
        isCurrentWeekTrade(trade) &&
        !activeIds.has(String(getLiveTradeMatchId(trade))) &&
        ["WIN", "LOSS", "PROTECTED_WIN", "BROKER_CLOSED", "DISCONNECTED"].includes(getLiveTradeAcceptedStatus(trade))
      ))
    : [];
  const unique = new Map();

  activeTrades.filter(isCurrentWeekTrade).forEach((trade) => {
    const key = trade.position_id || trade.broker_position_id || trade.broker_order_id || trade.order_id;
    unique.set(String(key), trade);
  });

  closedTrades.forEach((trade) => {
    const status = getLiveTradeResult(trade);

    if (["WIN", "LOSS", "PROTECTED_WIN", "BROKER_CLOSED", "DISCONNECTED"].includes(status)) {
      const key = trade.position_id || trade.broker_position_id || trade.broker_order_id || trade.order_id;
      unique.set(String(key), trade);
    }
  });

  return {
    wins: closedTrades.filter((trade) => {
      const status = getLiveTradeAcceptedStatus(trade);
      const pnl = getLiveTradePnl(trade);

      return ["WIN", "PROTECTED_WIN"].includes(status) || (["BROKER_CLOSED", "DISCONNECTED"].includes(status) && pnl > 0);
    }).length,
    losses: closedTrades.filter((trade) => {
      const status = getLiveTradeAcceptedStatus(trade);
      const pnl = getLiveTradePnl(trade);

      return status === "LOSS" || (["BROKER_CLOSED", "DISCONNECTED"].includes(status) && pnl < 0);
    }).length,
    running: activeTrades.length,
    total: unique.size,
  };
}

function getLiveTradeTarget(trade, targetNumber) {
  if (!trade) return "--";

  const value = targetNumber === 1
    ? (
        trade.tp1 ??
        trade.tp_price ??
        trade.take_profit ??
        trade.takeProfit ??
        trade.original_tp_price ??
        trade.raw?.tp1 ??
        trade.raw?.takeProfit ??
        trade.raw?.closePositionDetail?.tp1 ??
        trade.raw?.closePositionDetail?.takeProfit
      )
    : (
        trade.tp2 ??
        trade.tp2_price ??
        trade.tp ??
        trade.original_tp2_price ??
        trade.raw?.tp2 ??
        trade.raw?.closePositionDetail?.tp2
      );

  return value ?? "--";
}

function renderLiveHistory() {

  if (!liveHistoryList) return;
  const activeIds = new Set(
    Object.values(activeLiveOrders || {})
      .filter((trade) => trade && isLiveTradeActiveForDisplay(trade))
      .map((trade) => String(getLiveTradeMatchId(trade)))
  );

  const history =
    Array.isArray(liveTradeHistory)
      ? liveTradeHistory.filter((trade) => {
          const source = String(trade?.source || "broker").toLowerCase();
          return (
            source === "broker" &&
            !isLiveTradeActiveForDisplay(trade) &&
            !activeIds.has(String(getLiveTradeMatchId(trade)))
          );
        })
      : [];

  if (!history.length) {
    liveHistoryList.innerHTML =
      `<div class="live-paper-section">
        <div class="live-active-title">RECENT LIVE TRADES</div>
        <div class="live-empty">
          <div class="live-empty-title">No recent live trades</div>
          <div class="live-empty-subtitle">
            Closed live trades will appear here.
          </div>
        </div>
      </div>`;
    return;
  }

  liveHistoryList.innerHTML =
    `<div class="live-paper-section">
      <div class="live-active-title">RECENT LIVE TRADES</div>
      <div class="live-recent-scroll">
        ${history.map((trade) => {
      const time =
        trade.closed_at ||
        trade.opened_at ||
        trade.time ||
        Date.now();
      const result = getLiveTradeResult(trade);
      const pnl = getLiveTradePnl(trade);
      const pnlClass = pnl > 0 ? "positive" : pnl < 0 ? "negative" : "";
      const protectionLabel = getProfitProtectionLabel(trade);
      const protectionWarning = getSlProtectionWarning(trade);
      const targetWarning = getBrokerTargetWarning(trade);
      const entry = trade.entry || trade.entry_price || "--";
      const originalSl = trade.original_sl || trade.initial_sl || trade.sl || "--";
      const currentSl = getBrokerStopLossDisplay(trade);
      const tp1 = getTp1Display(trade);
      const tp2 = getBrokerTakeProfitDisplay(trade);
      const protectedSl = trade.protected_sl_price || "--";
      const tp1Hit = trade.hit_tp1 ? "Yes" : "No";
      const profitProtected = trade.profit_protected ? "Yes" : "No";
      const tradeId = getLiveTradeId(trade);
      const brokerOrderId = trade.broker_order_id || trade.position_id || "--";
      const pips = trade.pips ?? "--";
      const reason = trade.exit_reason || trade.note || trade.reason || "--";
      const sideColor = String(trade.side || "").toUpperCase() === "SELL" ? "#ef4444" : "#22c55e";
      const badgeColor = result === "WIN" || result === "PROTECTED_WIN" ? "#22c55e" : result === "LOSS" ? "#ef4444" : result === "BROKER_CLOSED" ? "#94a3b8" : "#60a5fa";

      return `
        <details style="margin-bottom:4px;border-radius:11px;background:rgba(30,41,59,.70);border:1px solid rgba(148,163,184,.16);overflow:hidden;">
          <summary style="list-style:none;cursor:pointer;padding:5px 8px;display:grid;grid-template-columns:1fr auto auto auto;gap:5px;align-items:center;font-weight:900;color:#f8fafc;">
            <span style="font-size:12px;">${DISPLAY_NAMES[trade.symbol] || trade.symbol}</span>
            <span style="color:${sideColor};background:${sideColor}22;padding:2px 6px;border-radius:7px;font-size:9px;">${trade.side || "-"}</span>
            <span style="color:${badgeColor};background:${badgeColor}22;padding:2px 6px;border-radius:7px;font-size:9px;">${result}</span>
            <span class="live-pnl ${pnlClass}" style="font-size:10px;">${pnl === null ? "$0.00" : formatLiveMoney(pnl)}</span>
          </summary>

          <div style="padding:0 8px 7px;color:#cbd5e1;font-size:10px;line-height:1.35;">
            ${protectionLabel ? `<div class="live-side" style="color:#86efac;">${protectionLabel}</div>` : ""}
            ${protectionWarning ? `<div class="live-side" style="color:#fbbf24;">${protectionWarning}</div>` : ""}
            ${targetWarning ? `<div class="live-side" style="color:#fbbf24;">${targetWarning}</div>` : ""}
            Trade ID: <b>${tradeId}</b><br>
            Entry: <b>${entry}</b><br>
            Original SL: <b>${originalSl}</b> • Current SL: <b>${currentSl}</b><br>
            <span class="live-target-prices">TP1: <b>${tp1}</b> • TP2: <b>${tp2}</b></span><br>
            Protected SL: <b>${protectedSl}</b><br>
            TP1 Hit: <b>${tp1Hit}</b> • Profit Protected: <b>${profitProtected}</b><br>
            Pips: <b>${pips}</b> • Result: <b>${result}</b><br>
            Reason: <b>${reason}</b><br>
            Order: <b>${brokerOrderId}</b> • Time: <b>${formatLiveTime(time)}</b>
          </div>
        </details>
      `;
    }).join("")}
      </div>
    </div>`;
}

function renderLiveActiveOrders() {

  if (!liveActiveList) return;

  liveActiveList.innerHTML = "";

  const entries = Object.entries(activeLiveOrders || {})
    .filter(([_, trade]) => {
      const source = String(trade?.source || "broker").toLowerCase();
      return trade && source === "broker" && isLiveTradeActiveForDisplay(trade);
    });
  const tradesBySymbol = Object.fromEntries(entries);
  const symbols = ["EURUSD", "XAUUSD"];

  function getLatestSignalForLiveSymbol(symbol) {
    if (!latestPanelData) return null;

    return symbol === "XAUUSD"
      ? latestPanelData.XAUUSD
      : latestPanelData[symbol];
  }

  function hasCurrentBlockedLiveSignal(symbol, autoStatus) {
    const signalData = getLatestSignalForLiveSymbol(symbol) || {};
    const finalSignal = String(signalData.signal || "").toUpperCase();
    const signalBeforeFilters = String(signalData.signal_before_filters || "").toUpperCase();
    const blockedBy = String(signalData.blocked_by || "").toUpperCase();
    const statusSignal = String(autoStatus?.signal || autoStatus?.action || "").toUpperCase();
    const reasonText = String(autoStatus?.reason || signalData.blocked_reason || "").toLowerCase();
    const isSameSymbolDuplicateBlock =
      reasonText.includes("already running") ||
      reasonText.includes("already active") ||
      reasonText.includes("active trade already exists") ||
      reasonText.includes("broker already has open position") ||
      reasonText.includes("broker position already exists") ||
      reasonText.includes("order already being sent") ||
      blockedBy.includes("DUPLICATE");
    const hasCurrentBlocker =
      isSameSymbolDuplicateBlock &&
      blockedBy &&
      blockedBy !== "MISSING_15M_SETUP" &&
      blockedBy !== "STRUCTURE_WAIT";

    return (
      (
        (signalBeforeFilters === "BUY" || signalBeforeFilters === "SELL") &&
        hasCurrentBlocker
      ) ||
      (
        statusSignal === "BUY" &&
        isSameSymbolDuplicateBlock
      ) ||
      (
        statusSignal === "SELL" &&
        isSameSymbolDuplicateBlock
      )
    );
  }

  symbols.forEach((symbol) => {
    const trade = tradesBySymbol[symbol] || null;
    const autoStatus = liveAutoStatusBySymbol?.[symbol] || null;
    const autoState = String(autoStatus?.status || "").toUpperCase();
    const autoSignal = String(autoStatus?.signal || autoStatus?.action || "").toUpperCase();
    const showBlockedCard =
      !trade &&
      autoStatus &&
      hasCurrentBlockedLiveSignal(symbol, autoStatus) &&
      (
        autoState === "BLOCKED" ||
        autoState === "ORDER_REJECTED" ||
        ((autoSignal === "BUY" || autoSignal === "SELL") && (autoState === "WAIT" || autoState === "WAITING"))
      );

    if (showBlockedCard) {
      const reason = getShortAutoTradeReason(autoStatus);
      const sideColor = autoSignal === "SELL" ? "#ef4444" : autoSignal === "BUY" ? "#22c55e" : "#facc15";
      const div = document.createElement("div");

      div.className = `live-active-item blocked ${autoSignal.toLowerCase()}`;
      div.innerHTML = `
        <details class="live-active-details">
          <summary class="live-active-summary">
            <div class="live-active-main">
              <strong class="live-symbol">${symbol}</strong>
              <span class="live-side" style="color:${sideColor};">${autoSignal || "SIGNAL"} • BLOCKED</span>
              <span class="live-blocked-reason-inline">Reason: ${escapeLiveAutoStatusText(reason || "safety check")}</span>
            </div>
            <div class="live-compact-meta">
              <span class="live-blocked-pill">NOT EXECUTED</span>
              <span class="live-expand-arrow">⌄</span>
            </div>
          </summary>
          <div class="live-expanded-body">
            <div class="live-status-reason">Reason ${escapeLiveAutoStatusText(reason || "safety check")}</div>
          </div>
        </details>
      `;

      liveActiveList.appendChild(div);
      return;
    }

    const cardStatus = getLiveSymbolCardStatus(symbol, trade);

    if (!cardStatus) return;

    const statusClass = getLiveSymbolCardStatusClass(cardStatus);

    const div = document.createElement("div");
    const lotSize = trade.lot_size ?? trade.volume;
    const entry = trade.entry || trade.entry_price || "--";
    const originalSl = trade.original_sl || trade.initial_sl || trade.sl || "--";
    const currentSl = getBrokerStopLossDisplay(trade);
    const tp1 = getTp1Display(trade);
    const tp2 = getBrokerTakeProfitDisplay(trade);
    const protectedSl = trade.protected_sl_price || "--";
    const tp1Hit = trade.hit_tp1 ? "Yes" : "No";
    const profitProtected = trade.profit_protected ? "Yes" : "No";
    const pnl = getLiveTradePnl(trade);
    const pnlClass = pnl > 0 ? "positive" : pnl < 0 ? "negative" : "";
    const currentPrice = trade.current_price ?? trade.currentPrice ?? "--";
    const tradeId = getLiveTradeId(trade);
    const pips = trade.pips ?? "--";
    const status = trade.status || "--";
    const reason = trade.exit_reason || trade.note || trade.reason || "--";
    const protectionLabel = getProfitProtectionLabel(trade);
    const targetWarning = getBrokerTargetWarning(trade);
    const displayResult = getTradeDisplayResult(trade);
    const cardSignalText = cardStatus.signal || trade.side || "--";
    const cardLiveAutoText = getTradeDisplayResult(trade);
    const sideColor = cardSignalText === "SELL" ? "#ef4444" : "#22c55e";

    div.className =
      `live-active-item ${String(trade.side || "").toLowerCase()} ${statusClass}`;

    div.innerHTML = `
      <details class="live-active-details">
        <summary class="live-active-summary">
          <div class="live-active-main">
            <strong class="live-symbol">${symbol}</strong>
            <span class="live-side" style="color:${sideColor};">${cardSignalText} • ${displayResult}</span>
          </div>
          <div class="live-compact-meta">
            <span class="live-pnl ${pnlClass}">${pnl === null ? "$0.00" : formatLiveMoney(pnl)}</span>
            <span>Lot ${formatLiveNumber(lotSize, 2)}</span>
            <span class="live-expand-arrow">⌄</span>
          </div>
        </summary>
        <div class="live-expanded-body">
          <div class="live-detail-grid">
            <span>Trade ID <b>${tradeId}</b></span>
            <span>Status <b>${status}</b></span>
            <span>Pips <b>${pips}</b></span>
            <span>Entry <b>${entry}</b></span>
            <span>Current <b>${currentPrice}</b></span>
            <span>Original SL <b>${originalSl}</b></span>
            <span>Current SL <b>${currentSl}</b></span>
            <span>TP1 <b>${tp1}</b></span>
            <span>TP2 <b>${tp2}</b></span>
            <span>Protected SL <b>${protectedSl}</b></span>
            <span>TP1 Hit <b>${tp1Hit}</b></span>
            <span>Profit Protected <b>${profitProtected}</b></span>
            <span>Result <b>${displayResult}</b></span>
          </div>
          <div class="live-status-reason">Reason ${reason}</div>
          ${protectionLabel ? `<div class="live-side" style="color:#86efac;">${protectionLabel}</div>` : ""}
          ${targetWarning ? `<div class="live-side" style="color:#fbbf24;">${targetWarning}</div>` : ""}
        </div>
      </details>
    `;

    liveActiveList.appendChild(div);
  });

  liveActiveList.insertAdjacentHTML("beforeend", renderLiveStatsRow());
}

function updateLiveToggleUI() {

  if (!liveAutoToggleBtn) return;

  liveAutoToggleBtn.classList.remove(
    "toggle-on",
    "toggle-off",
    "toggle-live"
  );

  if (!liveConnectionState.connected) {

    liveAutoEnabled = false;

    liveAutoToggleBtn.classList.remove(
      "toggle-on",
      "toggle-off",
      "toggle-live"
    );

    liveAutoToggleBtn.classList.add("toggle-off");

    liveAutoToggleBtn.textContent =
      "Live Auto paused — broker disconnected";

    if (brokerConnectionStatus) {
      brokerConnectionStatus.textContent =
        "Live Auto paused — broker disconnected";
      brokerConnectionStatus.classList.remove("connected", "live");
    }

    return;
  }

  liveAutoToggleBtn.classList.add(
    liveAutoEnabled ? "toggle-live" : "toggle-off"
  );

  liveAutoToggleBtn.textContent =
    liveAutoEnabled
      ? "Live Auto: ON"
      : "Live Auto: OFF";

  if (brokerConnectionStatus) {
    brokerConnectionStatus.textContent = "Live Broker: Connected";
    brokerConnectionStatus.classList.add("connected");
    brokerConnectionStatus.classList.remove("live");
  }
}

function updateExecutionPageUI() {
  if (!paperPageBtn || !livePageBtn) return;

  const show = (el) => {
    if (!el) return;
    el.classList.remove("hidden");
    el.style.setProperty("display", "block", "important");
  };

  const hide = (el) => {
    if (!el) return;
    el.classList.add("hidden");
    el.style.setProperty("display", "none", "important");
  };
  const marketStatusEl = document.getElementById("marketDataSourceStatus");
  const autoStatusEl = document.getElementById("autoTradeStatus");
  const liveAutoSymbolStatusEl = document.getElementById("liveAutoSymbolStatus");

  paperPageBtn.classList.remove("active");
  livePageBtn.classList.remove("active");

  if (executionPage === "paper") {
    paperPageBtn.classList.add("active");

    show(paperAutoSection);
    hide(liveAutoSection);
    hide(brokerConnectionStatus);
    hide(marketStatusEl);
    hide(autoStatusEl);
    hide(liveAutoSymbolStatusEl);

    show(paperHistoryList);
    hide(liveHistoryList);

    hide(document.getElementById("liveActiveOrders"));
  }

  if (executionPage === "live") {
    livePageBtn.classList.add("active");

    show(liveAutoSection);
    renderLiveTotalTradesCard();
    show(brokerConnectionStatus);
    show(marketStatusEl);
    show(autoStatusEl);
    hide(liveAutoSymbolStatusEl);

    hide(paperAutoSection);

    hide(paperHistoryList);
    show(liveHistoryList);
    renderLiveHistory();

    show(document.getElementById("liveActiveOrders"));
    
  }

  if (executionPage === "live") {
    renderMarketDataSourceStatus();
    renderAutoTradeStatus();
  }
}

paperPageBtn?.addEventListener("click", () => {
  executionPage = "paper";
  updateExecutionPageUI();
});

livePageBtn?.addEventListener("click", () => {
  executionPage = "live";
  updateExecutionPageUI();
});

if (adminUnlockBtn) {
  adminUnlockBtn.addEventListener("click", () => {
    if (isAdminUnlocked) {
      isAdminUnlocked = false;
      updateTradeButtonsLock();
      if (!latestPanelData) {
      setStatus("● LOADING PANEL...", "live");
    }
      return;
    }

    showAdminModal();
  });
}

if (adminCancelBtn) {
  adminCancelBtn.addEventListener("click", hideAdminModal);
}

if (adminConfirmBtn) {
  adminConfirmBtn.addEventListener("click", unlockAdminAccess);
}

if (adminCodeInput) {
  adminCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      unlockAdminAccess();
    }
  });
}

if (adminModal) {
  adminModal.addEventListener("click", (event) => {
    if (event.target === adminModal) {
      hideAdminModal();
    }
  });
}
// ==============================
// LIVE CHART
// ==============================

let chart = null;
let candleSeries = null;
let structureLine = null;
let tradeVisualPriceLines = {};
let currentChartSymbol = "EURUSD";
let currentChartTimeframe = "5m";
let chartRefreshInProgress = false;
let lastChartData = {
  EURUSD: { "5m": [], "15m": [], "1h": [] },
  XAUUSD: { "5m": [], "15m": [], "1h": [] }
};
let _CHART_IDLE_PHASE = 0;
let _CHART_IDLE_ENABLED = false;
let MARKET_IS_CLOSED = false;
let frozenChart = {};
let frozenCandlesCache = null;

function normalizeTradeChartSymbol(symbol) {
  return String(symbol || "").toUpperCase();
}

function normalizeTradeExecutionSymbol(symbol) {
  return String(symbol || "").toUpperCase();
}

function initChart() {
  const container = document.getElementById("chartContainer");

  if (!container) {
    console.error("Chart init failed: chartContainer not found");
    return;
  }

  if (typeof LightweightCharts === "undefined") {
    console.error("Chart init failed: LightweightCharts not loaded");
    return;
  }

  if (chart) {
    chart.remove();
    chart = null;
    candleSeries = null;
    tradeVisualPriceLines = {};
  }

  chart = LightweightCharts.createChart(container, {
  width: container.clientWidth || 800,
  height: Math.max(container.clientHeight || 420, 320),

  layout: {
    background: { color: "#0b0f1a" },
    textColor: "#9fb0c8"
  },
  priceFormat: {
    type: 'price',
    precision: currentChartSymbol === "EURUSD" ? 5 : 2,
    minMove: currentChartSymbol === "EURUSD" ? 0.00001 : 0.01,
  },
  grid: {
    vertLines: { color: "rgba(42, 51, 66, 0.45)" },
    horzLines: { color: "rgba(42, 51, 66, 0.45)" }
  },
  crosshair: {
    mode: 1,
    vertLine: {
      color: "rgba(180, 190, 210, 0.35)",
      width: 1,
      style: 2,
      labelBackgroundColor: "#111827"
    },
    horzLine: {
      color: "rgba(180, 190, 210, 0.35)",
      width: 1,
      style: 2,
      labelBackgroundColor: "#111827"
    }
  },
  rightPriceScale: {
    borderColor: "#1f2937",
    scaleMargins: {
      top: 0.08,
      bottom: 0.08
    }
  },
  timeScale: {
    borderColor: "#1f2937",
    timeVisible: true,
    secondsVisible: false,
    barSpacing: 14,
    rightOffset: 10,
    lockVisibleTimeRangeOnResize: true
  }
});

  candleSeries = chart.addCandlestickSeries({
  upColor: "#26a69a",
  borderUpColor: "#26a69a",
  wickUpColor: "#26a69a",
  downColor: "#ef5350",
  borderDownColor: "#ef5350",
  wickDownColor: "#ef5350",
  priceLineVisible: true,
  lastValueVisible: true,

  priceFormat: {
    type: "price",
    precision: currentChartSymbol === "EURUSD" ? 5 : 2,
    minMove: currentChartSymbol === "EURUSD" ? 0.00001 : 0.01
  }
});

  window.addEventListener("resize", () => {
  if (chart && container) {
    chart.applyOptions({
      width: container.clientWidth || 800,
      height: Math.max(container.clientHeight || 420, 320)
    });
  }
});
}

// ==============================
// CHART HELPERS
// ==============================

function getChartCandles(rawData, symbol = currentChartSymbol, timeframe = currentChartTimeframe) {
  const candles = rawData?.candles?.[symbol]?.[timeframe] || [];

  const cleaned = candles.filter((c) => {
    const o = Number(c.open);
    const h = Number(c.high);
    const l = Number(c.low);
    const close = Number(c.close);

    if (!o || !h || !l || !close) return false;

    const maxBodyPrice = Math.max(o, close);
    const minBodyPrice = Math.min(o, close);

    // normal candle rule
    if (h < maxBodyPrice) return false;
    if (l > minBodyPrice) return false;

    // remove crazy spikes
    const mid = (o + close) / 2;
    const range = h - l;

    if (symbol === "XAUUSD" && range > mid * 0.03) return false;
    if (symbol === "EURUSD" && range > mid * 0.01) return false;

    return true;
  });

  return cleaned.slice(-5000);
}

function updateChartOverlay(symbol, timeframe, candles) {
  const title = document.getElementById("chartOverlayTitle");
  const ohlc = document.getElementById("chartOverlayOhlc");

  if (!title || !ohlc || !candles || candles.length === 0) return;

  const last = candles[candles.length - 1];

  title.textContent = `${DISPLAY_NAMES[symbol] || symbol} · ${timeframe}`;

  const decimals = symbol === "XAUUSD" ? 2 : 5;

  ohlc.innerHTML = `
    O <span>${Number(last.open).toFixed(decimals)}</span>
    H <span>${Number(last.high).toFixed(decimals)}</span>
    L <span>${Number(last.low).toFixed(decimals)}</span>
    C <span>${Number(last.close).toFixed(decimals)}</span>
  `;
}
let structureLineSeries = null;

function getActiveTradeForChartSymbol(symbol = currentChartSymbol) {
  const tradeSymbol = normalizeTradeChartSymbol(symbol);
  const liveTrade = activeLiveOrders?.[tradeSymbol] || null;

  if (liveTrade && isLiveTradeActiveForDisplay(liveTrade)) return liveTrade;

  return null;
}

function clearInactiveTradeVisualLines() {
  ["EURUSD", "XAUUSD"].forEach((symbol) => {
    const liveTrade = activeLiveOrders?.[symbol] || null;

    if (!isLiveTradeActiveForDisplay(liveTrade)) {
      clearTradeLines(symbol);
    }
  });
}

function clearTradeLines(symbol = currentChartSymbol) {
  const executionSymbol = normalizeTradeExecutionSymbol(symbol);
  const lines = tradeVisualPriceLines[executionSymbol] || [];

  if (!candleSeries || !lines.length) {
    tradeVisualPriceLines[executionSymbol] = [];
    return;
  }

  lines.forEach((line) => {
    try {
      candleSeries.removePriceLine(line);
    } catch (err) {
      console.warn("Trade level line cleanup skipped");
    }
  });

  tradeVisualPriceLines[executionSymbol] = [];
}

function clearTradeVisualLevels() {
  clearTradeLines(currentChartSymbol);
}

function getDisplayedOpenTradeCount() {
  const value = Number(String(dashboardOpenTrades?.textContent || "").trim());
  return Number.isFinite(value) ? value : null;
}

function addTradeVisualLine(price, title, color, options = {}) {
  const numericPrice = Number(price);

  if (!candleSeries || !Number.isFinite(numericPrice)) return;

  const executionSymbol = normalizeTradeExecutionSymbol(currentChartSymbol);
  const line = candleSeries.createPriceLine({
    price: numericPrice,
    color,
    lineWidth: options.lineWidth || 2,
    lineStyle: options.lineStyle ?? LightweightCharts.LineStyle.Dashed,
    axisLabelVisible: true,
    title,
  });

  if (!tradeVisualPriceLines[executionSymbol]) {
    tradeVisualPriceLines[executionSymbol] = [];
  }

  tradeVisualPriceLines[executionSymbol].push(line);
}

function getTradeChartLevels(trade, symbol = currentChartSymbol) {
  const raw = trade?.raw && typeof trade.raw === "object" ? trade.raw : {};
  const nestedRaw = raw?.raw && typeof raw.raw === "object" ? raw.raw : {};
  const tradeSymbol = normalizeTradeChartSymbol(symbol);
  const signalPlan = latestRawPanelData?.[tradeSymbol] || {};
  const liveBrokerTrade = isLiveBrokerTrade(trade);
  const brokerStopLossMissing = Boolean(trade?.broker_stop_loss_missing);
  const brokerStopLossConfirmed = Boolean(trade?.broker_stop_loss_confirmed);
  const brokerStopLoss =
    trade?.sl ??
    trade?.current_sl ??
    trade?.stop_loss ??
    trade?.stopLoss ??
    raw?.stopLoss ??
    nestedRaw?.stopLoss;
  const brokerTakeProfitMissing = Boolean(trade?.broker_take_profit_missing);
  const brokerTakeProfitConfirmed = Boolean(trade?.broker_take_profit_confirmed);
  const brokerTakeProfit =
    trade?.tp2 ??
    trade?.take_profit_2 ??
    trade?.tp2_price ??
    trade?.take_profit ??
    trade?.takeProfit ??
    raw?.tp2 ??
    raw?.takeProfit ??
    nestedRaw?.tp2 ??
    nestedRaw?.takeProfit;
  const plannedStopLoss =
    trade?.planned_sl ??
    trade?.original_sl ??
    trade?.initial_sl ??
    signalPlan?.stop_loss;
  const plannedTp1 =
    trade?.planned_tp1 ??
    trade?.take_profit_1 ??
    signalPlan?.tp1;
  const plannedTp2 =
    trade?.planned_tp2 ??
    signalPlan?.tp2;

  return {
    entry:
      trade?.entry ??
      trade?.entry_price ??
      raw?.entry ??
      nestedRaw?.price ??
      signalPlan?.entry_price,
    original_sl:
      trade?.original_sl ??
      trade?.initial_sl ??
      brokerStopLoss ??
      plannedStopLoss,
    planned_sl: plannedStopLoss,
    current_sl: brokerStopLossMissing ? null : brokerStopLoss,
    broker_stop_loss_confirmed: brokerStopLossConfirmed || (!liveBrokerTrade && brokerStopLoss != null),
    broker_stop_loss_missing: brokerStopLossMissing || (liveBrokerTrade && !brokerStopLossConfirmed) || brokerStopLoss == null,
    tp1: brokerTakeProfitMissing ? null : trade?.tp1 ?? trade?.take_profit_1 ?? raw?.tp1 ?? nestedRaw?.tp1,
    tp2: brokerTakeProfitMissing ? null : brokerTakeProfit,
    planned_tp1: plannedTp1,
    planned_tp2: plannedTp2,
    broker_take_profit_confirmed: brokerTakeProfitConfirmed || (!liveBrokerTrade && brokerTakeProfit != null),
    broker_take_profit_missing: brokerTakeProfitMissing || (liveBrokerTrade && !brokerTakeProfitConfirmed) || brokerTakeProfit == null,
  };
}

function hasCompleteTradeChartLevels(levels) {
  return ["entry"].every((key) => {
    const value = Number(levels?.[key]);
    return Number.isFinite(value);
  });
}

function drawTradeVisualLevels() {
  clearTradeVisualLevels();
  clearInactiveTradeVisualLines();

  if (!chart || !candleSeries) return;

  if (getDisplayedOpenTradeCount() === 0) {
    clearTradeLines("EURUSD");
    clearTradeLines("XAUUSD");
    return;
  }

  const trade = getActiveTradeForChartSymbol(currentChartSymbol);
  const symbol = normalizeTradeChartSymbol(currentChartSymbol);
  const hasActiveTrade = Boolean(trade);

  if (!hasActiveTrade) return;

  const chartLevels = getTradeChartLevels(trade, symbol);
  if (!hasCompleteTradeChartLevels(chartLevels)) {
    console.warn("TRADE_VISUAL_LEVELS_SKIPPED_INCOMPLETE =", {
      symbol,
      levels: chartLevels,
    });
    return;
  }

  const levels = {
    symbol,
    ...chartLevels,
    hit_tp1: Boolean(trade?.hit_tp1),
    profit_protected: hasConfirmedProfitProtection(trade),
    protected_sl_price: trade?.protected_sl_price,
  };

  console.log("TRADE_VISUAL_LEVELS =", levels);

  addTradeVisualLine(levels.entry, "Entry", "#f8fafc", {
    lineStyle: LightweightCharts.LineStyle.Solid,
  });

  if (levels.hit_tp1 && levels.profit_protected) {
    addTradeVisualLine(levels.original_sl, "Original SL inactive", "rgba(239, 68, 68, 0.45)", {
      lineStyle: LightweightCharts.LineStyle.Dotted,
      lineWidth: 1,
    });
    addTradeVisualLine(
      levels.protected_sl_price ?? levels.current_sl,
      "Protected SL",
      "#facc15",
      {
        lineStyle: LightweightCharts.LineStyle.Solid,
        lineWidth: 3,
      }
    );
  } else if (levels.broker_stop_loss_confirmed) {
    addTradeVisualLine(levels.current_sl, "Broker SL", "#ef4444", {
      lineStyle: LightweightCharts.LineStyle.Solid,
    });
  } else {
    addTradeVisualLine(levels.planned_sl ?? levels.original_sl, "Planned SL inactive", "rgba(248, 113, 113, 0.55)", {
      lineStyle: LightweightCharts.LineStyle.Dotted,
      lineWidth: 1,
    });
  }

  if (levels.broker_take_profit_confirmed) {
    addTradeVisualLine(levels.tp1, "TP1 app target", "#facc15", {
      lineStyle: levels.hit_tp1
        ? LightweightCharts.LineStyle.Solid
        : LightweightCharts.LineStyle.Dashed,
      lineWidth: levels.hit_tp1 ? 3 : 2,
    });

    addTradeVisualLine(levels.tp2, "Broker TP", "#22c55e", {
      lineStyle: LightweightCharts.LineStyle.Solid,
    });
  } else {
    addTradeVisualLine(levels.planned_tp1, "Planned TP1 inactive", "rgba(250, 204, 21, 0.55)", {
      lineStyle: LightweightCharts.LineStyle.Dotted,
      lineWidth: 1,
    });
    addTradeVisualLine(levels.planned_tp2, "Planned TP2 inactive", "rgba(34, 197, 94, 0.55)", {
      lineStyle: LightweightCharts.LineStyle.Dotted,
      lineWidth: 1,
    });
  }
}

function drawStructureLine(data) {
  if (!chart || !data) return;

  const type = String(data.structure_type || "").toUpperCase();
  const resistance = Number(data.structure_resistance);
  const support = Number(data.structure_support);

  if (structureLineSeries) {
    chart.removeSeries(structureLineSeries);
    structureLineSeries = null;
  }

  const candles =
    latestRawPanelData?.candles?.[currentChartSymbol]?.[currentChartTimeframe] || [];

  if (!candles.length) return;

  const firstTime = candles[Math.max(0, candles.length - 80)].time;
  const lastTime = candles[candles.length - 1].time;

  let level = null;

  if (type.includes("BUY")) {
    level = resistance;
  }

  if (type.includes("SELL")) {
    level = support;
  }

  if (!level || Number.isNaN(level)) return;

  structureLineSeries = chart.addLineSeries({
    color: type.includes("SELL") ? "#ef4444" : "#22c55e",
    lineWidth: 2,
    lineStyle: LightweightCharts.LineStyle.Dashed,
    priceLineVisible: true,
    lastValueVisible: true,
  });

  structureLineSeries.setData([
    { time: firstTime, value: level },
    { time: lastTime, value: level },
  ]);
}
async function loadChartData(symbol = currentChartSymbol, timeframe = currentChartTimeframe) {
  currentChartSymbol = symbol;
  currentChartTimeframe = timeframe;
  currentChartSymbol = symbol;

  if (!chart || !candleSeries) {
    initChart();
  }

  if (!chart || !candleSeries) {
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "GET",
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const rawData = await res.json();

    if (!rawData) {
      throw new Error("Panel data returned null");
    }
    const candles = getChartCandles(rawData, symbol, currentChartTimeframe);
    if (!candles.length) {
      console.warn(`No candle data for ${symbol}`);
      return;
    }

    candleSeries.setData(candles);
  } catch (err) {
    console.error("Real chart data error:", err);
  }
}

function renderChartFromPanel(rawData, symbol = currentChartSymbol, timeframe = currentChartTimeframe) {
  currentChartSymbol = symbol;
  currentChartTimeframe = timeframe;
  
  if (!chart || !candleSeries) {
    initChart();
  }

  if (!chart || !candleSeries) return;

    let candles = getChartCandles(rawData, symbol, timeframe);
    if (!candles.length) return;

    const key = `${symbol}_${timeframe}`;

    // 🧊 FREEZE LOGIC
    if (MARKET_IS_CLOSED) {
      if (!frozenChart[key]) {
        frozenChart[key] = candles.map(c => ({ ...c }));
        console.log("🧊 Chart snapshot saved");
      }

      candles = frozenChart[key];
    } else {
      frozenChart[key] = null;
    }
  const alreadyHasChart =
  lastChartData?.[symbol]?.[timeframe]?.length > 0;

if (MARKET_IS_CLOSED && alreadyHasChart) {
  console.log("🧊 HARD FREEZE (chart already loaded)");
  drawTradeVisualLevels();
  return;
}

  updateChartOverlay(symbol, timeframe, candles);

  const previous = lastChartData[symbol]?.[timeframe] || [];

  // 🟢 FIRST LOAD → FULL SET
  if (!previous.length) {
  candleSeries.setData(candles);
  lastChartData[symbol][timeframe] = [...candles];
  drawTradeVisualLevels();
  return;
}

  const lastNew = candles[candles.length - 1];
  const lastOld = previous[previous.length - 1];

  if (MARKET_IS_CLOSED) {
    candleSeries.setData(candles);
    lastChartData[symbol][timeframe] = [...candles];
    chart.timeScale().scrollToPosition(0, false);
    console.log("🧊 Chart locked");
    drawTradeVisualLevels();
    return;
  }

  if (lastNew.time === lastOld.time) {
    candleSeries.update(lastNew);
  } else {
    candleSeries.update(lastNew);
  }

  lastChartData[symbol][timeframe] = [...candles];
  drawTradeVisualLevels();
}

function applyIdleMotionToLastCandle(symbol = currentChartSymbol, timeframe = currentChartTimeframe) {
  if (!_CHART_IDLE_ENABLED || MARKET_IS_CLOSED) return;
  if (!chart || !candleSeries) return;

  const candles = lastChartData[symbol]?.[timeframe] || [];
  if (!candles.length) return;

  const last = candles[candles.length - 1];
  if (!last) return;

  const prev = candles.length > 1 ? candles[candles.length - 2] : null;

  let range = Math.abs(last.high - last.low);
  if (range <= 0 && prev) {
    range = Math.abs(prev.high - prev.low);
  }
  if (range <= 0) {
    range = Math.max(Math.abs(last.close) * 0.0003, 0.0001);
  }

  const wave = Math.sin((_CHART_IDLE_PHASE + symbol.length) * 0.85);
  const drift = range * 0.08 * wave;

  const visualClose = Math.max(last.low, Math.min(last.high, last.close + drift));

  const visualLast = {
    ...last,
    close: visualClose,
    high: Math.max(last.high, visualClose),
    low: Math.min(last.low, visualClose)
  };

  try {
    candleSeries.update(visualLast);
  } catch (err) {
    console.warn("Idle candle update skipped");
  }
}

function refreshIdleChartMotion() {
  _CHART_IDLE_PHASE += 1;
  applyIdleMotionToLastCandle(currentChartSymbol, currentChartTimeframe);
}
function forceChartRenderFromLatest(symbol = currentChartSymbol, timeframe = currentChartTimeframe) {
  if (!latestRawPanelData) return;

 const candles = getChartCandles(latestRawPanelData, symbol, timeframe).slice(-5000);
  if (!candles.length) {
    console.warn(`No candles available for ${symbol}`);
    return;
  }

 updateChartOverlay(symbol, timeframe, candles);

  if (!chart || !candleSeries) {
    initChart();
  }

  if (!chart || !candleSeries) return;

 lastChartData[symbol][timeframe] = [];
  candleSeries.setData(candles);
  drawTradeVisualLevels();
}

async function quickRefreshChart() {
  if (chartRefreshInProgress) return;

  chartRefreshInProgress = true;

  try {
    await loadChartData(currentChartSymbol);
  } catch (err) {
    console.error("Quick chart refresh error:", err);
  } finally {
    chartRefreshInProgress = false;
  }
}
function switchChart(symbol, timeframe = currentChartTimeframe) {
  currentChartSymbol = symbol;
  currentChartTimeframe = timeframe;

  initChart(); // 🔥 FORCE NEW PRECISION

  try {
    const hasCandles = latestRawPanelData?.candles?.[symbol]?.[timeframe]?.length;

    if (hasCandles) {
      forceChartRenderFromLatest(symbol, timeframe);
      updateMainPanel(symbol);
      console.log(`📈 Chart updated: ${symbol} ${timeframe} at ${new Date().toLocaleTimeString()}`);
    } else {
      applyLanguage(currentLang);
      refreshPanel();
    }
  } catch (err) {
    console.error("Switch chart error:", err);
  }
}

window.switchChart = switchChart;


// ==============================
// TIMEFRAME SWITCH
// ==============================

function switchTimeframe(timeframe) {
  currentChartTimeframe = timeframe;

  try {
    const hasCandles = latestRawPanelData?.candles?.[currentChartSymbol]?.[timeframe]?.length;

    if (hasCandles) {
      forceChartRenderFromLatest(currentChartSymbol, timeframe);
      updateMainPanel(currentChartSymbol);

      console.log(`⏱️ Timeframe switched: ${currentChartSymbol} ${timeframe}`);
    } else {
      refreshPanel();
    }
  } catch (err) {
    console.error("Switch timeframe error:", err);
  }
}

window.switchTimeframe = switchTimeframe;

document.querySelectorAll(".chart-symbol-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    const symbol = button.textContent.trim().toUpperCase() === "GOLD"
      ? "XAUUSD"
      : "EURUSD";
    window.setTimeout(() => {
      showChartExplanation(symbol, currentChartTimeframe);
    }, 0);
  });
});

document.querySelectorAll(".chart-timeframes button").forEach((button) => {
  button.addEventListener("click", () => {
    const timeframe = button.textContent.trim();
    window.setTimeout(() => {
      showChartExplanation(currentChartSymbol, timeframe);
    }, 0);
  });
});

function bootMainApp() {
  updateUTC();
  updatePnlVisibility();

  const role = localStorage.getItem("flowsignal_role");

  if (menuStatsBtn) {
    menuStatsBtn.classList.toggle("hidden", role !== "admin");
  }

  let visitorId = localStorage.getItem("flowsignal_visitor_id");

fetch(`${BASE_URL}/track-visit`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        visitor_id: visitorId
    })
})
.then(res => res.json())
.then(data => {
    console.log("Visit tracked:", data);

    if (data.visitor_id) {
        localStorage.setItem(
            "flowsignal_visitor_id",
            data.visitor_id
        );
    }
})
.catch(err => console.log(err));

  updateTradeButtonsLock();
  initChart();
  applyLanguage(currentLang);
  refreshPanel();
  }

// ==============================
// LOGOUT BUTTON
// ==============================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("flowsignal_access");
    localStorage.removeItem("flowsignal_role");
    localStorage.removeItem("flowsignal_admin");
    location.reload();
  });
}

const goldTitle = document.getElementById("gold-title");
if (goldTitle) {
  goldTitle.textContent = "XAUUSD";
}

// ==============================
// STARTUP
// ==============================
let access = null;

try {
  access = JSON.parse(localStorage.getItem("flowsignal_access") || "null");
} catch (e) {
  access = null;
}

const role = localStorage.getItem("flowsignal_role");
updatePnlVisibility();

if (access?.granted || role === "user" || role === "admin") {
  if (landingPage) {
    landingPage.classList.add("hidden");
    landingPage.style.display = "none";
  }

  if (mainApp) {
    mainApp.classList.remove("hidden");
    mainApp.classList.remove("locked");
    mainApp.style.display = "flex";
  }

  setTimeout(() => {
if (localStorage.getItem("flowsignal_role") === "admin") {
  if (menuStatsBtn) menuStatsBtn.classList.remove("hidden");
  if (menuPaperBtn) menuPaperBtn.classList.remove("hidden");
}
updatePnlVisibility();

    bootMainApp();
  }, 120);
}
setInterval(() => {
  console.log("🔄 Auto refresh running...");
  refreshPanel();
}, 15000);

setInterval(refreshConnectionBadgeFreshness, 5000);

_BAR_IDLE_TIMER = setInterval(() => {
  _BAR_IDLE_PHASE += 1;

  if (!_BAR_ANIMATING) {
    _BAR_ANIMATING = true;
    requestAnimationFrame(animateBars);
  }

  if (_CHART_IDLE_ENABLED && !MARKET_IS_CLOSED) {
  refreshIdleChartMotion();
}
}, 5000);
const feedbackModal = document.getElementById("feedbackModal");
const feedbackInput = document.getElementById("feedbackInput");
const feedbackCancelBtn = document.getElementById("feedbackCancelBtn");
const feedbackSendBtn = document.getElementById("feedbackSendBtn");
const feedbackSuccessMsg = document.getElementById("feedbackSuccessMsg");
const feedbackToast = document.getElementById("feedbackToast");

function openFeedbackModal() {
  if (!feedbackModal) return;
  feedbackModal.classList.remove("hidden");

  if (feedbackInput) {
    feedbackInput.value = "";
    setTimeout(() => feedbackInput.focus(), 50);
  }

  if (feedbackSuccessMsg) {
    feedbackSuccessMsg.classList.add("hidden");
  }
}

function closeFeedbackModal() {
  if (!feedbackModal) return;
  feedbackModal.classList.add("hidden");
}

function showFeedbackToast() {
  if (!feedbackToast) return;

  feedbackToast.classList.remove("hidden");
  feedbackToast.classList.add("show");

  setTimeout(() => {
    feedbackToast.classList.add("hidden");
  }, 2600);
}

if (feedbackCancelBtn) {
  feedbackCancelBtn.addEventListener("click", closeFeedbackModal);
}

if (feedbackSendBtn) {
  feedbackSendBtn.addEventListener("click", async () => {
    const message = feedbackInput ? feedbackInput.value.trim() : "";

    if (!message) {
      alert("Write something first.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          user: "anonymous",
          time: new Date().toISOString()
        })
      });

      const result = await res.json();

      if (result.status === "sent" || result.status === "ok") {
        closeFeedbackModal();
        if (feedbackInput) feedbackInput.value = "";
        if (feedbackSuccessMsg) feedbackSuccessMsg.classList.add("hidden");
        showFeedbackToast();
      } else {
        alert(`Feedback failed ❌\n${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Feedback request error:", err);
      alert("Error sending feedback ❌");
    }
  });
}

if (feedbackModal) {
  feedbackModal.addEventListener("click", (e) => {
    if (e.target === feedbackModal) {
      closeFeedbackModal();
    }
  });
}

if (menuToggleBtn && sideMenu) {
  menuToggleBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("hidden");
  });
}

menuAssistantBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  openAssistantPanel();
});

closeAssistantPanelBtn?.addEventListener("click", closeAssistantPanel);

assistantModal?.addEventListener("click", (event) => {
  if (event.target === assistantModal) {
    closeAssistantPanel();
  }
});

if (menuFeedbackBtn) {
  menuFeedbackBtn.addEventListener("click", () => {
    if (sideMenu) sideMenu.classList.add("hidden");
    openFeedbackModal();
  });
}

if (menuAdminBtn) {
  menuAdminBtn.addEventListener("click", () => {
    const btn = document.getElementById("adminUnlockBtn");
    if (btn) btn.click();
  });
}

if (menuStatsBtn) {
  menuStatsBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin-stats`);
      const data = await res.json();

      if (totalVisitorsCount) {
        totalVisitorsCount.textContent = data.total_visits || 0;
      }

      if (uniqueVisitorsCount) {
        uniqueVisitorsCount.textContent = data.unique_visitors || 0;
      }

      if (todayVisitsCount) {
        todayVisitsCount.textContent = data.today_visits || 0;
      }

      if (lastVisitTime) {
        if (data.last_visit) {
          const d = new Date(data.last_visit * 1000);
          lastVisitTime.textContent = d.toLocaleString();
        } else {
          lastVisitTime.textContent = "--";
        }
      }

      if (countryStats) {
      if (data.countries && data.countries.length > 0) {
        countryStats.textContent = data.countries.join(", ");
      } else {
        countryStats.textContent = "No data";
      }
    }

      if (statsModal) statsModal.classList.remove("hidden");
      if (sideMenu) sideMenu.classList.add("hidden");
    } catch (err) {
      console.error(err);
      alert("Failed to load stats");
    }
  });
}

if (closeStatsBtn) {
  closeStatsBtn.addEventListener("click", () => {
    if (statsModal) statsModal.classList.add("hidden");
  });
}

document.addEventListener("click", (e) => {
  if (!sideMenu || !menuToggleBtn) return;

  const clickedInsideMenu = sideMenu.contains(e.target);
  const clickedToggle = menuToggleBtn.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle) {
    sideMenu.classList.add("hidden");
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    assistantModal &&
    !assistantModal.classList.contains("hidden")
  ) {
    closeAssistantPanel();
  }
});

const langSelect = document.getElementById("langSelect");

if (langSelect) {
  langSelect.value = currentLang;

  langSelect.addEventListener("change", (e) => {
    currentLang = e.target.value;
    localStorage.setItem("flowsignal_lang", currentLang);

    applyLanguage(currentLang);
    updateAssistantLanguageUI();
    refreshVoiceForCurrentLanguage();
    showAssistantMessage(
      assistantEventMessage("languageChanged"),
      "LANGUAGE"
    );

    if (latestPanelData) {
      updateCard("EURUSD", latestPanelData.EURUSD);
      updateCard("XAUUSD", latestPanelData.XAUUSD);
      updateMainPanel(currentChartSymbol);
    }
  });
}

const eurusdCard = document.getElementById("eurusd-card");
const goldCard = document.getElementById("gold-card");

if (eurusdCard) {
  eurusdCard.addEventListener("click", () => {
    switchChart("EURUSD", currentChartTimeframe);
    updateMainPanel("EURUSD");
  });
}

if (goldCard) {
  goldCard.addEventListener("click", () => {
    switchChart("XAUUSD", currentChartTimeframe);
    updateMainPanel("XAUUSD");
  });
}

applyLanguage(currentLang);

const openAccessBtnHero = document.getElementById("openAccessBtnHero");

if (openAccessBtnHero && openAccessBtn) {
  openAccessBtnHero.addEventListener("click", () => {
    openAccessBtn.click();
  });
}

 // ===== LANDING BUTTONS CONTROL =====

// Start Trading Now → Access Code box
document.getElementById("openAccessBtnHero")?.addEventListener("click", () => {
  document.getElementById("accessBox")?.classList.remove("hidden");
});

// Get Started → Access Code box
document.getElementById("openAccessBtn")?.addEventListener("click", () => {
  document.getElementById("accessBox")?.classList.remove("hidden");
});

// Login → Admin Login box
document.getElementById("openAdminLoginBtn")?.addEventListener("click", () => {
  document.getElementById("adminLoginBox")?.classList.remove("hidden");
});

// Close access box
document.getElementById("closeAccessBtn")?.addEventListener("click", () => {
  document.getElementById("accessBox")?.classList.add("hidden");
});

// Close admin login box
document.getElementById("closeAdminLoginBtn")?.addEventListener("click", () => {
  document.getElementById("adminLoginBox")?.classList.add("hidden");
});

function moveStructurePanel() {
  const structure = document.querySelector(".structure-panel");
  const mainPanel = document.querySelector(".main-trade-card");
  const chartPanel = document.querySelector(".chart-section");

  if (!structure || !mainPanel || !chartPanel) return;

  const smcPanel = mainPanel.querySelector(".main-smc-panel");

  if (window.innerWidth <= 850) {
    // MOVE INTO MAIN PANEL (above SMC PLAN)
    if (smcPanel && structure.parentNode !== mainPanel) {
      mainPanel.insertBefore(structure, smcPanel);
    }
  } else {
    // MOVE BACK UNDER CHART (original position)
    const historySection = chartPanel.querySelector(".history-section");
    if (structure.parentNode !== chartPanel && historySection) {
      chartPanel.insertBefore(structure, historySection);
    }
  }
}

moveStructurePanel();
window.addEventListener("resize", moveStructurePanel);

applyLanguage(currentLang);
