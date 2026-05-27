const BASE_URL =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://flowsignalfx.com";

const API_URL = `${BASE_URL}/panel-data`;;
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
    trend: "Trend:",
    structure: "Structure:",
    nextStep: "Next Step:",
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
    trend: "Tendance:",
    structure: "Structure:",
    nextStep: "Prochaine étape:",
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
    trend: "Tendencia:",
    structure: "Estructura:",
    nextStep: "Siguiente paso:",
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

const openAccessBtn = document.getElementById("openAccessBtn");
const landingLang = document.getElementById("landingLang");

if (landingLang) {
  landingLang.value = currentLang.toUpperCase();

  landingLang.addEventListener("change", () => {
    const lang = landingLang.value.toLowerCase();

    localStorage.setItem("flowsignal_lang", lang);

    applyLanguage(lang);
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

const connectDemoBtn =
  document.getElementById(
    "connectDemoBtn"
  );

const connectLiveBtn =
  document.getElementById(
    "connectLiveBtn"
  );

const disconnectLiveBtn =
  document.getElementById(
    "disconnectLiveBtn"
  );

const testLiveOrderBtn =
  document.getElementById(
    "testLiveOrderBtn"
  );

const mockBrokerPositionBtn =
  document.getElementById(
    "mockBrokerPositionBtn"
  );

const clearBrokerPositionBtn =
  document.getElementById(
    "clearBrokerPositionBtn"
  );

const liveActiveList =
  document.getElementById(
    "liveActiveList"
  );

const liveHistoryList =
  document.getElementById(
    "liveHistoryList"
  );

const paperModeBtn =
  document.getElementById("paperModeBtn");

const liveModeBtn =
  document.getElementById("liveModeBtn");

const paperPageBtn =
  document.getElementById("paperPageBtn");

const livePageBtn =
  document.getElementById("livePageBtn");

let executionPage = "paper";

let paperAutoEnabled =
  localStorage.getItem("paper_auto_enabled") === "true";
let liveAutoEnabled =
  false;

let executionMode = "paper";

let liveConnectionState = {
  connected: false,
  mode: "demo"
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
  GOLD: null
};

let pendingTrade = null;
let panelRefreshInProgress = false;
let isAdminUnlocked = false;
const ADMIN_CODE = "nathaux123";

let latestRawPanelData = null;
let latestPanelFetchedAt = 0;
let lastGoodPanelData = null;
let latestPanelData = null;
let lastLiveOrderKey = null;
let activeLiveOrders = {
  EURUSD: null,
  GOLD: null
};
let liveTradeHistory = [];

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

  if (signal === "WAIT") {
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
function getDataSymbol(symbol) {
  return symbol === "XAUUSD" ? "GOLD" : symbol;
}

function updateCard(symbol, data) {
  let signal = String(data.signal || "WAIT").trim().toUpperCase();
  const buyPct = clampPct(data.buy_pct ?? data.buy_percent ?? 0);
  const sellPct = clampPct(data.sell_pct ?? data.sell_percent ?? 0);
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
  applySignalStyle(symbol, signal);

  const buyLabel = document.getElementById(`${symbol.toLowerCase()}-buy-label`);
  const sellLabel = document.getElementById(`${symbol.toLowerCase()}-sell-label`);
  const confLabel = document.getElementById(`${symbol.toLowerCase()}-conf-label`);

  if (buyLabel) buyLabel.textContent = `${LANG[currentLang].buy}: ${buyPct}%`;
if (sellLabel) sellLabel.textContent = `${LANG[currentLang].sell}: ${sellPct}%`;
if (confLabel) confLabel.textContent = `${LANG[currentLang].confidence}: ${confidence}%`;

  if (!data._barsInit) {
  setBar(symbol, "buy", buyPct, true);
  setBar(symbol, "sell", sellPct, true);
  setBar(symbol, "conf", confidence, true);
  data._barsInit = true;
} else {
  setBar(symbol, "buy", buyPct);
  setBar(symbol, "sell", sellPct);
  setBar(symbol, "conf", confidence);
}

  const marketTag = document.getElementById(`${symbol.toLowerCase()}-market-tag`);
  const qualityTag = document.getElementById(`${symbol.toLowerCase()}-quality-tag`);
  const timingTag = document.getElementById(`${symbol.toLowerCase()}-timing-tag`);

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
    const smcSymbol = symbol.toLowerCase();

    const typeEl = document.getElementById(`${smcSymbol}-plan-type`);
    const biasEl = document.getElementById(`${smcSymbol}-plan-bias`);
    const entryEl = document.getElementById(`${smcSymbol}-entry-price`);
    const slEl = document.getElementById(`${smcSymbol}-sl`);
    const tp1El = document.getElementById(`${smcSymbol}-tp1`);
    const tp2El = document.getElementById(`${smcSymbol}-tp2`);
    const rrEl = document.getElementById(`${smcSymbol}-rr`);
    const invalidationEl = document.getElementById(`${smcSymbol}-invalidation`);
    const reasonEl = document.getElementById(`${smcSymbol}-reason`);

if (typeEl) typeEl.textContent = data.plan_type || "--";
if (biasEl) biasEl.textContent = data.plan_bias || "--";
const planType = String(data.plan_type || "").toUpperCase();

[typeEl, biasEl].forEach((el) => {
  if (!el) return;
  el.classList.remove("plan-buy", "plan-sell", "plan-exit", "plan-wait");

  if (planType.includes("BUY")) el.classList.add("plan-buy");
  else if (planType.includes("SELL")) el.classList.add("plan-sell");
  else if (planType.includes("EXIT")) el.classList.add("plan-exit");
  else el.classList.add("plan-wait");
});
if (entryEl) entryEl.textContent = data.entry_price || "--";
if (slEl) slEl.textContent = data.stop_loss || "--";
if (tp1El) tp1El.textContent = data.tp1 || "--";
if (tp2El) tp2El.textContent = data.tp2 || "--";
if (rrEl) rrEl.textContent = data.risk_reward || "--";
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
  const dataSymbol = getDataSymbol(symbol);

  if (!latestPanelData || !latestPanelData[dataSymbol]) return;

  const data = latestPanelData[dataSymbol];

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

  const buyPct = clampPct(data.buy_pct ?? data.buy_percent ?? 0);
  const sellPct = clampPct(data.sell_pct ?? data.sell_percent ?? 0);
  const confidence = clampPct(data.confidence ?? 0);


  const liveCandles =
  latestRawPanelData?.candles?.[dataSymbol]?.[currentChartTimeframe] || [];

const lastCandle = liveCandles[liveCandles.length - 1];

const fixedPrice =
  lastCandle?.close || data.entry_price || data.price;

const priceEl = document.getElementById("main-live-price");

if (priceEl) {
  if (fixedPrice) {
    priceEl.textContent =
      dataSymbol === "GOLD"
        ? Number(fixedPrice).toFixed(2)
        : Number(fixedPrice).toFixed(5);
  } else {
    priceEl.textContent = "--";
  }
}
  const displayName =
  DISPLAY_NAMES[getDataSymbol(symbol)] || getDataSymbol(symbol);
  document.getElementById("main-symbol-title").innerHTML =
    symbol === "EURUSD"
      ? `${displayName} <img src="eurusd.png" class="main-symbol-icon">`
      : `${displayName} <img src="gold.png" class="main-symbol-icon gold-main-icon">`;

  document.getElementById("main-signal").textContent = tSignal(signal);
  const mainSignal = document.getElementById("main-signal");

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

  document.getElementById("structure-trend").textContent = tMarketText(smcData.structure_trend || "--");
  document.getElementById("structure-type").textContent = tMarketText(smcData.structure_type || "--");
  document.getElementById("structure-next").textContent = tMarketText(smcData.structure_next || "--");
  document.getElementById("structure-resistance").textContent = smcData.structure_resistance || "--";
  document.getElementById("structure-support").textContent = smcData.structure_support || "--";
  const structureTitle = document.querySelector(".structure-title");

  if (structureTitle) {
    const displayName =
      DISPLAY_NAMES[getDataSymbol(symbol)] || getDataSymbol(symbol);

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

    const utter = new SpeechSynthesisUtterance(`${symbol} ${signal}`);
    utter.volume = 0.6;
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);

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

function setStatus(text, mode = "live") {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.className = `status ${mode}`;
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
  if (data && (data.EURUSD || data.GOLD || data.XAUUSD)) {
    return {
      EURUSD: data.EURUSD || {},
      GOLD: data.GOLD || data.XAUUSD || {}
    };
  }

  return {
    EURUSD: {},
    GOLD: {}
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
      rawData?.paper_trades || {},
      rawData?.paper_trade_history || [],
      rawData?.paper_trade_stats || {}
    );
  }
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

    if (liveHistoryList) {
      liveHistoryList.classList.remove("hidden");

      liveHistoryList.style.setProperty(
        "display",
        "block",
        "important"
      );

      liveHistoryList.innerHTML =
        "No live trades yet";
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
  const gold = paperTrades.GOLD;

  if (paperEurusdStatus) {
    paperEurusdStatus.textContent = eurusd
      ? `${eurusd.side} • ${eurusd.result} • Entry ${eurusd.entry} • SL ${eurusd.sl} • TP2 ${eurusd.tp2}`
      : "No paper trade";
  }

  if (paperGoldStatus) {
    paperGoldStatus.textContent = gold
      ? `${gold.side} • ${gold.result} • Entry ${gold.entry} • SL ${gold.sl} • TP2 ${gold.tp2}`
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
      ` : ["EURUSD", "GOLD"].map((sym) => {
        const t = paperTrades?.[sym];
        if (!t) return "";

        const side = t.side || "--";
        const result = t.result || "RUNNING";
        const source = (t.source || "paper").toUpperCase();
        const display = DISPLAY_NAMES[sym] || sym;
        const sideColor = side === "SELL" ? "#ef4444" : "#22c55e";

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
              <span style="color:#60a5fa;background:#60a5fa22;padding:2px 6px;border-radius:7px;font-size:9px;font-weight:900;">${result}</span>
            </div>
            <div style="margin-top:4px;font-size:10px;color:#cbd5e1;font-weight:700;line-height:1.25;">
              Entry ${t.entry ?? "--"} • SL ${t.sl ?? "--"} • TP1 ${t.tp1 ?? "--"}
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

          return `
            <details style="margin-bottom:4px;border-radius:11px;background:rgba(30,41,59,.70);border:1px solid rgba(148,163,184,.16);overflow:hidden;">
              <summary style="list-style:none;cursor:pointer;padding:5px 8px;display:grid;grid-template-columns:1fr auto auto;gap:5px;align-items:center;font-weight:900;color:#f8fafc;">
                <span style="font-size:12px;">${symbol}</span>
                <span style="color:${sideColor};background:${sideColor}22;padding:2px 6px;border-radius:7px;font-size:9px;">${side}</span>
                <span style="color:${badgeColor};background:${badgeColor}22;padding:2px 6px;border-radius:7px;font-size:9px;">${result}</span>
              </summary>
              <div style="padding:0 8px 7px;color:#cbd5e1;font-size:10px;line-height:1.35;">
                Entry: <b>${t.entry ?? "--"}</b><br>
                SL: <b>${t.sl ?? "--"}</b> • TP1: <b>${t.tp1 ?? "--"}</b> • TP2: <b>${t.tp2 ?? "--"}</b><br>
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

function updateLivePanel(liveTrades, liveHistory = []) {
  activeLiveOrders =
    liveTrades || {
      EURUSD: null,
      GOLD: null
    };

  liveTradeHistory =
    Array.isArray(liveHistory)
      ? liveHistory
      : [];

  renderLiveActiveOrders();
  renderLiveHistory();

}

async function refreshPanel() {
  if (panelRefreshInProgress) {
    console.log("⏭️ refreshPanel skipped: previous request still running");
    return;
  }

  panelRefreshInProgress = true;

  try {
    if (!statusEl || !statusEl.textContent.includes("TRADE")) {
      setStatus("● LOADING PANEL...", "live");
    }

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

if (meta.execution_mode) {
  executionMode = meta.execution_mode;
}

if (typeof meta.live_auto_enabled === "boolean") {
  liveAutoEnabled = meta.live_auto_enabled;
}

if (meta.live_account) {

  liveConnectionState.connected =
    Boolean(meta.live_account.connected);

  liveConnectionState.mode =
    meta.live_account.mode || "demo";

  activeLiveOrders =
  meta.live_active_orders || {
    EURUSD: null,
    GOLD: null
  };

  liveTradeHistory =
    Array.isArray(meta.live_trade_history)
      ? meta.live_trade_history
      : [];

  renderLiveHistory();
  renderLiveActiveOrders(); 

  updateLiveToggleUI();
}

updateCard("EURUSD", data.EURUSD);
updateCard("GOLD", data.GOLD);
maybeExecuteLiveOrder("EURUSD", data.EURUSD);
maybeExecuteLiveOrder("GOLD", data.GOLD);

updateMainPanel(currentChartSymbol);
   renderHistory(rawData?.history || []);
  updatePaperPanel(
  rawData?.paper_trades || {},
  rawData?.paper_trade_history || []
);

updateLivePanel(
  meta.live_active_orders || {},
  meta.live_trade_history || []
);

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
    if (!statusEl || !statusEl.textContent.includes("TRADE")) {
      const local = new Date().toLocaleTimeString();
      const currentFeed = rawData?.feed_status?.[currentChartSymbol];
      const marketClosed = Boolean(rawData?.market_closed || currentFeed?.market_closed);

      if (marketClosed) {
        const stale = currentFeed?.stale_minutes;
        setStatus(`● ${LANG[currentLang].marketClosed} • ${currentLang === "fr" ? "dernières bougies valides" : currentLang === "es" ? "últimas velas válidas" : "last valid candles"}${stale ? ` (${stale}m stale)` : ""}`, "market-closed");
      } else if (meta?.source === "fallback_cache" && meta?.error) {
        setStatus(`● CACHE • ${meta.error}`, "error");
      } else if (meta?.source === "cache") {
        setStatus(`● CACHE • updated (${local})`, "live");
      } else {
        setStatus(`● LIVE • updated (${local})`, "live");
      }
    }
  } catch (err) {
  console.error("❌ Refresh error:", err);
  updateUTC();

  if (lastGoodPanelData) {
    console.log("🟡 Using last good panel data");

    const cachedData = normalizePanelData(lastGoodPanelData);

    updateCard("EURUSD", cachedData.EURUSD);
    updateCard("GOLD", cachedData.GOLD);

    if (lastGoodPanelData?.candles?.[currentChartSymbol]?.[currentChartTimeframe]?.length) {
  latestRawPanelData = lastGoodPanelData;
  renderChartFromPanel(lastGoodPanelData, currentChartSymbol, currentChartTimeframe);
}

    setStatus("● CACHE • using last good data", "live");
  } else {
    setStatus(`● Error • ${err.message}`, "error");
  }
} finally {
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

  paperAutoToggleBtn.textContent = paperAutoEnabled ? "ON" : "OFF";

  paperAutoToggleBtn.style.background =
  paperAutoEnabled
    ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
    : "#374151";
}

if (paperAutoToggleBtn) {
  paperAutoToggleBtn.addEventListener("click", async () => {

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

      const data = await response.json();

      console.log("AUTO TRADE:", data);

      await refreshPanel();

    } catch (err) {

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

if (liveAutoToggleBtn) {

  liveAutoToggleBtn.addEventListener(
    "click",
    async () => {

      // BLOCK if not connected
      if (!liveConnectionState.connected) {
        liveAutoEnabled = false;
        updateLiveToggleUI();
        setStatus(
          "● LIVE AUTO BLOCKED • connect sim or live first",
          "error"
        );
        return;
      }

      liveAutoEnabled =
        !liveAutoEnabled;

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

        const result = await response.json();
        liveAutoEnabled = Boolean(result.enabled);

        if (!result.enabled && result.message) {
          setStatus(
            `● LIVE AUTO BLOCKED • ${result.message}`,
            "error"
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
  );

}

connectDemoBtn?.addEventListener(
  "click",
  async () => {

    try {

      const res = await fetch(
        `${BASE_URL}/connect-ctrader`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            mode: "demo"
          })
        }
      );

      const result = await res.json();

      if (result.ok) {

        liveConnectionState.connected =
          true;

        liveConnectionState.mode =
          "demo";

        updateLiveToggleUI();

        refreshPanel();
      }

    } catch (err) {

      console.error(
        "DEMO CONNECT ERROR:",
        err
      );
    }
  }
);

connectLiveBtn?.addEventListener(
  "click",
  async () => {

    const confirmLive = confirm(
      "Connect REAL LIVE account?"
    );

    if (!confirmLive) return;

    try {

      const res = await fetch(
        `${BASE_URL}/connect-ctrader`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            mode: "live"
          })
        }
      );

      const result = await res.json();

      if (result.ok) {

        liveConnectionState.connected =
          true;

        liveConnectionState.mode =
          "live";

        updateLiveToggleUI();

        refreshPanel();
      }

    } catch (err) {

      console.error(
        "LIVE CONNECT ERROR:",
        err
      );
    }
  }
);

disconnectLiveBtn?.addEventListener(
  "click",
  async () => {

    try {

      await fetch(
        `${BASE_URL}/disconnect-ctrader`,
        {
          method: "POST"
        }
      );

      liveAutoEnabled = false;
      activeLiveOrders = {
        EURUSD: null,
        GOLD: null
      };

      liveConnectionState.connected =
        false;

      liveConnectionState.mode =
        "demo";

      updateLiveToggleUI();

      refreshPanel();

    } catch (err) {

      console.error(
        "DISCONNECT ERROR:",
        err
      );
    }
  }
);

const isDevHost =
  ["localhost", "127.0.0.1"].includes(
    window.location.hostname
  );

[
  testLiveOrderBtn,
  mockBrokerPositionBtn,
  clearBrokerPositionBtn
].forEach((btn) => {
  if (btn && isDevHost) {
    btn.style.display = "inline-flex";
  }
});

if (testLiveOrderBtn) {

  testLiveOrderBtn.addEventListener(
    "click",
    async () => {
      if (!isDevHost) return;

      try {
        if (!liveConnectionState.connected) {
          setStatus(
            "● TEST LIVE ORDER BLOCKED • connect sim or live first",
            "error"
          );
          return;
        }

        if (!liveAutoEnabled) {
          const toggleRes = await fetch(
            `${BASE_URL}/live-auto-toggle`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                enabled: true
              })
            }
          );

          const toggleResult =
            await toggleRes.json();

          liveAutoEnabled =
            Boolean(toggleResult.enabled);

          if (!liveAutoEnabled) {
            setStatus(
              `● TEST LIVE ORDER BLOCKED • ${toggleResult.message || "live auto unavailable"}`,
              "error"
            );
            updateLiveToggleUI();
            return;
          }

          updateLiveToggleUI();
        }

        const res = await fetch(
          `${BASE_URL}/execute-live-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              symbol: "EURUSD",
              side: "BUY"
            })
          }
        );

        const result = await res.json();

        if (!result.ok) {
          setStatus(
            `● TEST LIVE ORDER BLOCKED • ${result.message || "check live mode"}`,
            "error"
          );
        }

        await refreshPanel();
      } catch (err) {
        console.error(
          "TEST LIVE ORDER ERROR:",
          err
        );

        setStatus(
          `● TEST LIVE ORDER ERROR • ${err.message}`,
          "error"
        );
      }
    }
  );
}

async function setDebugBrokerPositions(positions) {
  const payload = {
    positions
  };

  console.log(
    "DEBUG BROKER POSITIONS PAYLOAD:",
    payload
  );

  const res = await fetch(
    `${BASE_URL}/debug/set-broker-positions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  const result = await res.json();

  if (!result.ok) {
    setStatus(
      `● BROKER MOCK ERROR • ${result.message || "debug endpoint blocked"}`,
      "error"
    );
    return;
  }

  await refreshPanel();
}

mockBrokerPositionBtn?.addEventListener(
  "click",
  async () => {
    if (!isDevHost) return;

    try {
      await setDebugBrokerPositions([
        {
          position_id: "mock-eurusd-001",
          symbol: "EURUSD",
          side: "BUY",
          volume: 1000,
          entry: 1.16191
        }
      ]);
    } catch (err) {
      console.error("MOCK BROKER POSITION ERROR:", err);
      setStatus(
        `● BROKER MOCK ERROR • ${err.message}`,
        "error"
      );
    }
  }
);

clearBrokerPositionBtn?.addEventListener(
  "click",
  async () => {
    if (!isDevHost) return;

    try {
      await setDebugBrokerPositions([]);
    } catch (err) {
      console.error("CLEAR BROKER POSITION ERROR:", err);
      setStatus(
        `● BROKER CLEAR ERROR • ${err.message}`,
        "error"
      );
    }
  }
);

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

async function setExecutionMode(mode) {

  try {

    const response = await fetch(
      `${BASE_URL}/execution-mode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode
        })
      }
    );

    const result = await response.json();

    if (!result.ok) {
      console.error("Execution mode failed");
      return;
    }

    executionMode = result.mode;

    updateExecutionModeUI();

    console.log(
      "Execution mode:",
      executionMode
    );

  } catch (err) {

    console.error(
      "Execution mode error:",
      err
    );

  }

}

function updateExecutionModeUI() {

  if (!paperModeBtn || !liveModeBtn) {
    return;
  }

  paperModeBtn.classList.remove("active");
  liveModeBtn.classList.remove("active");

  if (executionMode === "paper") {

    paperModeBtn.classList.add("active");

  } else if (
    executionMode === "live"
  ) {

    liveModeBtn.classList.add("active");
  }

}

function getLiveSourceBadge(trade) {
  const source =
    String(trade?.source || "").toLowerCase();

  if (source === "broker") return "BROKER";
  if (source === "test") return "TEST";
  if (source === "sim") return "SIM";

  return "LIVE";
}

function renderLiveHistory() {

  if (!liveHistoryList) return;

  const history =
    Array.isArray(liveTradeHistory)
      ? liveTradeHistory
      : [];

  if (!history.length) {
    liveHistoryList.innerHTML =
      `<div class="live-empty">
        <div class="live-empty-title">No recent live trades</div>
        <div class="live-empty-subtitle">
          Connect broker mode and enable LIVE auto when ready.
        </div>
      </div>`;
    return;
  }

  liveHistoryList.innerHTML =
    history.map((trade) => {
      const result =
        typeof trade.result === "string"
          ? trade.result
          : trade.result?.status || "TRACKED";

      const time =
        trade.closed_at ||
        trade.opened_at ||
        trade.time ||
        Date.now();
      const sourceBadge = getLiveSourceBadge(trade);

      return `
        <div class="trade-history-item">
          <div>
            <strong>${DISPLAY_NAMES[trade.symbol] || trade.symbol}</strong>
            <div style="font-size:11px;color:#7f8faa;">
              ${trade.side || "-"} • ${result}
            </div>
          </div>

          <div class="live-meta-stack">
            <span class="live-source-badge">${sourceBadge}</span>
            <span>
              ${new Date(time * (time < 10000000000 ? 1000 : 1)).toLocaleTimeString()}
            </span>
          </div>
        </div>
      `;
    }).join("");
}

function renderLiveActiveOrders() {

  if (!liveActiveList) return;

  liveActiveList.innerHTML = "";

  const entries = Object.entries(activeLiveOrders || {})
    .filter(([_, trade]) => trade);

  if (!entries.length) {
    liveActiveList.innerHTML =
      `<div class="live-empty">
        <div class="live-empty-title">No active live trades</div>
        <div class="live-empty-subtitle">
          FlowSignal will track one live order per symbol.
        </div>
      </div>`;
    return;
  }

  entries.forEach(([symbol, trade]) => {

    const div = document.createElement("div");
    const sourceBadge = getLiveSourceBadge(trade);

    div.className =
      `live-active-item ${String(trade.side || "").toLowerCase()}`;

    div.innerHTML = `
      <div>
        <div class="live-symbol">${symbol}</div>
        <div class="live-side">
          ${trade.side || "-"} • RUNNING
        </div>
      </div>

      <div class="live-meta-stack">
        <span class="live-source-badge">${sourceBadge}</span>
        <span class="live-status">
          ${(trade.mode || "LIVE").toUpperCase()}
        </span>
      </div>
    `;

    liveActiveList.appendChild(div);
  });
}

function updateLiveToggleUI() {

  if (!liveAutoToggleBtn) return;

  liveAutoToggleBtn.classList.remove(
    "toggle-on",
    "toggle-demo",
    "toggle-live"
  );

  // OFFLINE
  if (!liveConnectionState.connected) {

    liveAutoEnabled = false;

    liveAutoToggleBtn.classList.remove(
      "toggle-on",
      "toggle-demo",
      "toggle-live"
    );

    liveAutoToggleBtn.textContent =
      "OFFLINE";

    return;
  }
  

  // DEMO
  if (
    liveConnectionState.connected &&
    liveConnectionState.mode === "demo"
  ) {

    liveAutoToggleBtn.classList.add(
      "toggle-demo"
    );

    liveAutoToggleBtn.textContent =
      liveAutoEnabled
        ? "LIVE CONNECTED • ON"
        : "SIM CONNECTED";

    return;
  }

  // LIVE
  if (
    liveConnectionState.connected &&
    liveConnectionState.mode === "live"
  ) {

    liveAutoToggleBtn.classList.add(
      "toggle-live"
    );

    liveAutoToggleBtn.textContent =
      liveAutoEnabled
        ? "LIVE CONNECTED • ON"
        : "LIVE CONNECTED";
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

  paperPageBtn.classList.remove("active");
  livePageBtn.classList.remove("active");

  if (executionPage === "paper") {
    paperPageBtn.classList.add("active");

    show(paperAutoSection);
    hide(liveAutoSection);

    hide(document.querySelector(".live-connection-actions"));

    show(paperHistoryList);
    hide(liveHistoryList);

    hide(document.getElementById("liveActiveOrders"));
  }

  if (executionPage === "live") {
    livePageBtn.classList.add("active");

    show(liveAutoSection);

    show(document.querySelector(".live-connection-actions"));

    hide(paperAutoSection);

    hide(paperHistoryList);
    show(liveHistoryList);
    renderLiveHistory();

    show(document.getElementById("liveActiveOrders"));
    
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

paperModeBtn?.addEventListener(
  "click",
  () => {
    setExecutionMode("paper");
  }
);

liveModeBtn?.addEventListener(
  "click",
  () => {
    setExecutionMode("live");
  }
);

if (adminUnlockBtn) {
  adminUnlockBtn.addEventListener("click", () => {
    if (isAdminUnlocked) {
      isAdminUnlocked = false;
      updateTradeButtonsLock();
      setStatus("● ADMIN LOCK • trading locked", "live");
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
let currentChartSymbol = "EURUSD";
let currentChartTimeframe = "5m";
let chartRefreshInProgress = false;
let lastChartData = {
  EURUSD: { "5m": [], "15m": [], "1h": [] },
  GOLD: { "5m": [], "15m": [], "1h": [] }
};
let _CHART_IDLE_PHASE = 0;
let _CHART_IDLE_ENABLED = false;
let MARKET_IS_CLOSED = false;
let frozenChart = {};
let frozenCandlesCache = null;

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

    if (symbol === "GOLD" && range > mid * 0.03) return false;
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

  const decimals = symbol === "GOLD" ? 2 : 5;

  ohlc.innerHTML = `
    O <span>${Number(last.open).toFixed(decimals)}</span>
    H <span>${Number(last.high).toFixed(decimals)}</span>
    L <span>${Number(last.low).toFixed(decimals)}</span>
    C <span>${Number(last.close).toFixed(decimals)}</span>
  `;
}
let structureLineSeries = null;

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
  return;
}

  updateChartOverlay(symbol, timeframe, candles);

  const previous = lastChartData[symbol]?.[timeframe] || [];

  // 🟢 FIRST LOAD → FULL SET
  if (!previous.length) {
  candleSeries.setData(candles);
  lastChartData[symbol][timeframe] = [...candles];
  return;
}

  const lastNew = candles[candles.length - 1];
  const lastOld = previous[previous.length - 1];

  if (MARKET_IS_CLOSED) {
    candleSeries.setData(candles);
    lastChartData[symbol][timeframe] = [...candles];
    chart.timeScale().scrollToPosition(0, false);
    console.log("🧊 Chart locked");
    return;
  }

  if (lastNew.time === lastOld.time) {
    candleSeries.update(lastNew);
  } else {
    candleSeries.update(lastNew);
  }

  lastChartData[symbol][timeframe] = [...candles];
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

function bootMainApp() {
  updateUTC();

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

    bootMainApp();
  }, 120);
}
setInterval(() => {
  console.log("🔄 Auto refresh running...");
  refreshPanel();
}, 15000);

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

const langSelect = document.getElementById("langSelect");

if (langSelect) {
  langSelect.value = currentLang;

  langSelect.addEventListener("change", (e) => {
    currentLang = e.target.value;
    localStorage.setItem("flowsignal_lang", currentLang);

    applyLanguage(currentLang);

    if (latestPanelData) {
      updateCard("EURUSD", latestPanelData.EURUSD);
      updateCard("GOLD", latestPanelData.GOLD);
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
    switchChart("GOLD", currentChartTimeframe);
    updateMainPanel("GOLD");
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
