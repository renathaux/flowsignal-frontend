(function () {
  if (document.readyState === "loading") {
    if (window.matchMedia("(min-width: 701px)").matches) {
      document.write('<link rel="stylesheet" href="desktop.css?v=2" media="(min-width: 701px)">');
    }
    if (!window.FlowSignalLiveCandles) {
      document.write('<script src="chart/live-candles/live-candle-controller.js?v=3"><\/script>');
    }
    document.write('<link rel="stylesheet" href="indicators/smc/smc.css?v=4">');
    document.write('<script src="indicators/smc/smc-settings.js?v=8"><\/script>');
    document.write('<script src="indicators/smc/smc-renderer.js?v=11"><\/script>');
    document.write('<script src="indicators/smc/smc-indicator.js?v=4"><\/script>');
    document.write('<script src="indicators/smc/smc-chart-bridge.js?v=6"><\/script>');
    document.write('<script src="indicators/smc/smc-local-engine.js?v=4"><\/script>');
    document.write('<script src="indicators/smc/smc-local-visual.js?v=6"><\/script>');
  }

  function loadTabRoleSession() {
    if (window.FlowSignalTabRole || document.querySelector('script[data-flow-tab-role-session]')) return;
    const script = document.createElement("script");
    script.src = "tab-role-session.js?v=1";
    script.dataset.flowTabRoleSession = "true";
    script.async = false;
    document.body.appendChild(script);
  }

  function shouldUseSeparatedMobileDashboard() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("desktop") === "1") return false;
      if (!window.matchMedia("(max-width: 700px)").matches) return false;
      if (/\/mobile\.html$/i.test(window.location.pathname)) return false;
      const access = JSON.parse(localStorage.getItem("flowsignal_access") || "null");
      const role = String(localStorage.getItem("flowsignal_role") || "").toLowerCase();
      return access?.granted === true || role === "admin" || role === "user";
    } catch (_error) { return false; }
  }

  if (shouldUseSeparatedMobileDashboard()) {
    const target = new URL("mobile.html", window.location.href);
    target.searchParams.set("from", "dashboard");
    window.location.replace(target.toString());
    return;
  }

  const startedAt = new Date().toISOString();
  const events = [];
  let menuOpen = false;

  function safeDetail(detail) {
    if (!detail || typeof detail !== "object") return detail || null;
    const cleaned = {};
    Object.entries(detail).forEach(([key, value]) => {
      if (/token|secret|password|authorization/i.test(key)) return;
      cleaned[key] = value instanceof Error ? value.message : value;
    });
    return cleaned;
  }

  function record(event, detail) {
    const entry = { event, timestamp: new Date().toISOString(), detail: safeDetail(detail) };
    events.push(entry);
    if (events.length > 100) events.shift();
    console.info("FLOWSIGNAL_STARTUP", entry);
    return entry;
  }

  function setMenuOpen(open) {
    const sideMenu = document.getElementById("sideMenu");
    const mainApp = document.getElementById("mainApp");
    if (!sideMenu) return false;
    menuOpen = Boolean(open);
    sideMenu.classList.toggle("hidden", !menuOpen);
    sideMenu.classList.toggle("is-open", menuOpen);
    sideMenu.setAttribute("aria-hidden", menuOpen ? "false" : "true");
    mainApp?.classList.toggle("menu-drawer-open", menuOpen);
    document.body?.classList.toggle("menu-drawer-open", menuOpen);
    document.dispatchEvent(new CustomEvent("flowsignal:menu-state", { detail: { open: menuOpen } }));
    return true;
  }

  function attachMenu() {
    const button = document.getElementById("menuToggleBtn");
    const sideMenu = document.getElementById("sideMenu");
    if (!button || !sideMenu) {
      record("menu_listener_missing", { button: Boolean(button), sideMenu: Boolean(sideMenu) });
      return false;
    }
    if (button.dataset.flowSignalShellBound === "true") return true;
    button.dataset.flowSignalShellBound = "true";
    button.disabled = false;
    button.setAttribute("aria-controls", "sideMenu");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuOpen(!menuOpen);
    });
    record("menu_listener_attached");
    return true;
  }

  function openRequestedDesktopPanel() {
    let requested = "";
    try { requested = new URLSearchParams(window.location.search).get("open") || ""; } catch (_error) { return; }
    if (!requested) return;
    const allowed = new Set(["menuDashboardBtn","menuAssistantBtn","menuPaperBtn","menuFeedbackBtn","menuHistoryBtn","menuStatsBtn","menuGeneralSettingsBtn","menuRiskSettingsBtn","menuBrokerAccountsBtn","menuNotificationsSettingsBtn","menuStrategySettingsBtn"]);
    if (!allowed.has(requested)) return;
    let attempts = 0;
    const tryOpen = () => {
      attempts += 1;
      const target = document.getElementById(requested);
      if (target && typeof target.click === "function") {
        target.click();
        record("requested_desktop_panel_opened", { requested });
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete("open");
          history.replaceState(null, "", url.toString());
        } catch (_error) {}
        return;
      }
      if (attempts < 30) window.setTimeout(tryOpen, 100);
    };
    window.setTimeout(tryOpen, 150);
  }

  function setTransportStatus(state, message) {
    const status = document.getElementById("status");
    if (!status) return;
    status.dataset.transportState = state;
    status.title = message;
    status.textContent = message;
  }

  function installBinaryShadowStyles() {
    if (document.getElementById("binaryShadowStyles")) return;
    const style = document.createElement("style");
    style.id = "binaryShadowStyles";
    style.textContent = `
      .binary-shadow-card{border:1px solid rgba(93,153,224,.46);border-radius:12px;background:linear-gradient(180deg,rgba(8,21,36,.96),rgba(5,14,25,.98));padding:12px;margin:0 0 14px;color:#dce9f8;box-sizing:border-box}
      .binary-shadow-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:9px}
      .binary-shadow-kicker{display:block;font-size:9px;font-weight:800;letter-spacing:.12em;color:#7eb7f4;margin-bottom:3px}
      .binary-shadow-title{font-size:15px;font-weight:900;color:#f0f6ff}
      .binary-shadow-badge{border:1px solid rgba(255,183,58,.5);border-radius:999px;padding:4px 7px;font-size:8px;font-weight:900;color:#ffc85f;background:rgba(112,69,0,.25);white-space:nowrap}
      .binary-shadow-signal{display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(255,170,30,.5);border-radius:9px;padding:8px 10px;margin-bottom:9px;background:rgba(76,47,0,.18)}
      .binary-shadow-signal span{font-size:9px;font-weight:800;color:#90a7c1;text-transform:uppercase;letter-spacing:.08em}
      .binary-shadow-signal strong{font-size:19px;color:#ffc14d}
      .binary-shadow-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
      .binary-shadow-grid>div{border:1px solid rgba(75,118,166,.34);border-radius:8px;padding:7px;background:rgba(4,13,23,.52);min-width:0}
      .binary-shadow-grid span{display:block;font-size:8px;font-weight:800;color:#839ab4;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px}
      .binary-shadow-grid strong{display:block;font-size:11px;color:#e5effa;overflow-wrap:anywhere}
      .binary-shadow-foot{margin-top:8px;font-size:9px;color:#7890aa;line-height:1.35}
      @media(max-width:700px){.binary-shadow-grid{grid-template-columns:1fr 1fr}.binary-shadow-card{margin-bottom:10px}}
    `;
    document.head.appendChild(style);
  }

  function createBinaryShadowCard() {
    let card = document.getElementById("binaryShadowCenterCard");
    if (card) return card;
    installBinaryShadowStyles();
    card = document.createElement("section");
    card.id = "binaryShadowCenterCard";
    card.className = "binary-shadow-card";
    card.setAttribute("aria-label", "Binary shadow research");
    card.innerHTML = `
      <div class="binary-shadow-head">
        <div>
          <span class="binary-shadow-kicker">BINARY RESEARCH</span>
          <div class="binary-shadow-title">BINARY SHADOW · <span id="binaryShadowSymbol">EURUSD</span></div>
        </div>
        <span class="binary-shadow-badge">NO ORDERS</span>
      </div>
      <div class="binary-shadow-signal">
        <span>Current direction</span>
        <strong id="binaryShadowDecision">WAIT</strong>
      </div>
      <div class="binary-shadow-grid">
        <div><span>Expiry</span><strong id="binaryShadowExpiry">15m</strong></div>
        <div><span>Confidence</span><strong id="binaryShadowConfidence">--%</strong></div>
        <div><span>Status</span><strong id="binaryShadowStatus">NOT WIRED</strong></div>
      </div>
      <div class="binary-shadow-foot">Research/shadow only. This panel does not place binary orders. Signal logic will be wired separately.</div>
    `;
    return card;
  }

  function syncBinaryShadowSymbol() {
    const symbolText = String(document.getElementById("main-symbol-title")?.textContent || "EURUSD").toUpperCase();
    const symbol = symbolText.includes("XAUUSD") || symbolText.includes("GOLD") ? "XAUUSD" : "EURUSD";
    const target = document.getElementById("binaryShadowSymbol");
    if (target) target.textContent = symbol;
  }

  function arrangeCenterAnalysis() {
    if (!window.matchMedia("(min-width: 701px)").matches) return false;
    const card = document.querySelector(".main-trade-card");
    const metrics = card?.querySelector(".main-metrics");
    const biasNote = card?.querySelector(".bias-only-note");
    const checks = card?.querySelector(".entry-strategy-debug");
    const smcPlan = card?.querySelector(".main-smc-panel");
    if (!card || !metrics || !checks || !smcPlan) return false;

    const anchor = biasNote || metrics;
    anchor.insertAdjacentElement("afterend", checks);
    checks.open = true;

    const binary = createBinaryShadowCard();
    checks.insertAdjacentElement("afterend", binary);
    binary.insertAdjacentElement("afterend", smcPlan);
    syncBinaryShadowSymbol();

    if (card.dataset.binaryLayoutObserver !== "true") {
      card.dataset.binaryLayoutObserver = "true";
      const observer = new MutationObserver(() => {
        syncBinaryShadowSymbol();
        if (!document.getElementById("binaryShadowCenterCard")) arrangeCenterAnalysis();
      });
      observer.observe(card, { childList: true, subtree: true, characterData: true });
    }
    record("center_analysis_reordered", { order: ["metrics", "strategy_checks", "binary_shadow", "smc_plan"] });
    return true;
  }

  function attachCenterAnalysisLayout() {
    let attempts = 0;
    const tryArrange = () => {
      attempts += 1;
      if (arrangeCenterAnalysis() || attempts >= 40) return;
      window.setTimeout(tryArrange, 100);
    };
    tryArrange();
  }

  function attachDesktopChartFullscreen() {
    if (!window.matchMedia("(min-width: 701px)").matches) return false;
    const chartSection = document.querySelector(".chart-panel .chart-section");
    const controls = chartSection?.querySelector(".chart-controls");
    if (!chartSection || !controls) {
      record("desktop_chart_fullscreen_missing", { chartSection: Boolean(chartSection), controls: Boolean(controls) });
      return false;
    }
    if (document.getElementById("desktopChartFullscreenBtn")) return true;

    const button = document.createElement("button");
    button.id = "desktopChartFullscreenBtn";
    button.className = "desktop-chart-fullscreen-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Open chart in full screen");
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = '<span aria-hidden="true">⛶</span><span class="desktop-chart-fullscreen-label">Full Screen</span>';
    controls.appendChild(button);

    let fallbackActive = false;
    const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;
    const isNativeFullscreen = () => fullscreenElement() === chartSection;
    const isActive = () => isNativeFullscreen() || fallbackActive;
    const notifyChartResize = () => window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
      window.setTimeout(() => window.dispatchEvent(new Event("resize")), 120);
    });
    const renderState = () => {
      const active = isActive();
      chartSection.classList.toggle("is-desktop-chart-fullscreen", active);
      document.body.classList.toggle("desktop-chart-fullscreen-open", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.setAttribute("aria-label", active ? "Exit chart full screen" : "Open chart in full screen");
      button.innerHTML = active
        ? '<span aria-hidden="true">✕</span><span class="desktop-chart-fullscreen-label">Exit Full Screen</span>'
        : '<span aria-hidden="true">⛶</span><span class="desktop-chart-fullscreen-label">Full Screen</span>';
      window.FlowSignalSmcSettings?.syncHost?.();
      notifyChartResize();
    };
    const leaveFallback = () => {
      if (!fallbackActive) return;
      fallbackActive = false;
      renderState();
    };

    button.addEventListener("click", async () => {
      if (isActive()) {
        if (isNativeFullscreen()) {
          try {
            if (document.exitFullscreen) await document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
          } catch (error) {
            record("desktop_chart_fullscreen_exit_error", { message: error?.message });
          }
        } else {
          leaveFallback();
        }
        return;
      }
      try {
        if (chartSection.requestFullscreen) await chartSection.requestFullscreen({ navigationUI: "hide" });
        else if (chartSection.webkitRequestFullscreen) chartSection.webkitRequestFullscreen();
        else {
          fallbackActive = true;
          renderState();
        }
      } catch (error) {
        record("desktop_chart_fullscreen_request_error", { message: error?.message });
        fallbackActive = true;
        renderState();
      }
    });

    document.addEventListener("fullscreenchange", renderState);
    document.addEventListener("webkitfullscreenchange", renderState);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && fallbackActive) leaveFallback();
    });
    record("desktop_chart_fullscreen_attached");
    return true;
  }

  window.addEventListener("error", (event) => record("uncaught_initialization_error", {
    message: event.message || "Unknown JavaScript error",
    source: event.filename || null,
    line: event.lineno || null,
  }));
  window.addEventListener("unhandledrejection", (event) => record("unhandled_initialization_rejection", {
    message: event.reason?.message || String(event.reason || "Unknown rejection"),
  }));
  window.addEventListener("load", openRequestedDesktopPanel, { once: true });
  window.addEventListener("load", attachDesktopChartFullscreen, { once: true });
  window.addEventListener("load", attachCenterAnalysisLayout, { once: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadTabRoleSession, { once: true });
    document.addEventListener("DOMContentLoaded", attachCenterAnalysisLayout, { once: true });
  } else {
    loadTabRoleSession();
    attachCenterAnalysisLayout();
  }

  window.FlowSignalStartup = {
    startedAt,
    record,
    events: () => events.slice(),
    attachMenu,
    setMenuOpen,
    isMenuOpen: () => menuOpen,
    setTransportStatus,
    attachDesktopChartFullscreen,
    arrangeCenterAnalysis,
  };

  record("application_initialization_started");
  record("live_chart_tick_transport_ready", { transport: "ctrader_tick_snapshot", pollMs: 250 });
  record("smc_overlay_module_ready", { observationOnly: true, affectsStrategy: false, singleInstance: true });
  attachMenu();
})();