(function () {
  const earlyParams = new URLSearchParams(window.location.search);
  const isAppRoute = /^\/app\/?$/i.test(window.location.pathname);
  const customerSessionToken = String(sessionStorage.getItem('flowsignal_user_session_token') || '').trim();
  const ownerRequested = earlyParams.get('owner') === '1';
  const legacyRole = String(sessionStorage.getItem('flowsignal_tab_role') || localStorage.getItem('flowsignal_role') || '').toLowerCase();

  // /app is never a public landing page. If this tab has no customer session and
  // is not intentionally entering Owner/Admin mode, leave before dashboard code boots.
  if (isAppRoute && !customerSessionToken && !ownerRequested && legacyRole !== 'admin') {
    window.location.replace('/');
    return;
  }

  if (ownerRequested) {
    sessionStorage.removeItem('flowsignal_user_session_token');
    sessionStorage.removeItem('flowsignal_binary_user_id');
    sessionStorage.removeItem('flowsignal_tab_signed_out');
    sessionStorage.removeItem('flowsignal_public_home_mode');
  }

  // Customer logout must leave the app document completely. This listener is
  // installed before the legacy dashboard listeners, so they cannot reveal the old
  // embedded landing page or keep voice/polling alive underneath it.
  document.addEventListener('click', async (event) => {
    const target = event.target?.closest?.('#logoutBtn,#binaryLogoutBtn');
    if (!target) return;
    const token = String(sessionStorage.getItem('flowsignal_user_session_token') || '').trim();
    if (!token) return; // Owner/admin keeps the existing legacy logout flow.
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    try {
      await window.FlowSignalAuth?.logout?.();
    } catch (_error) {
      sessionStorage.removeItem('flowsignal_user_session_token');
      sessionStorage.removeItem('flowsignal_binary_user_id');
      sessionStorage.removeItem('flowsignal_csrf_token');
      sessionStorage.removeItem('flowsignal_tab_role');
    }
    try { window.speechSynthesis?.cancel?.(); } catch (_error) {}
    window.location.replace('/');
  }, true);

  // Apply the old public-home guard only for backward-compatible URLs. The new
  // production public page is home.html and does not load this file at all.
  try {
    const publicHome = earlyParams.get('home') === '1' || sessionStorage.getItem('flowsignal_public_home_mode') === '1';
    if (publicHome) {
      document.body?.classList.add('flowsignal-public-home');
      if (!document.getElementById('flowsignalEarlyPublicHomeStyle')) {
        const style = document.createElement('style');
        style.id = 'flowsignalEarlyPublicHomeStyle';
        style.textContent = `
          body.flowsignal-public-home #mainApp,
          body.flowsignal-public-home #smartExplain,
          body.flowsignal-public-home #assistantModal,
          body.flowsignal-public-home #tradeModal,
          body.flowsignal-public-home #adminModal,
          body.flowsignal-public-home #feedbackModal,
          body.flowsignal-public-home #feedbackToast,
          body.flowsignal-public-home #statsModal,
          body.flowsignal-public-home #settingsModal,
          body.flowsignal-public-home #newsModeConfirmModal,
          body.flowsignal-public-home #brokerAccountsModal,
          body.flowsignal-public-home #paperModal,
          body.flowsignal-public-home #tradeLevelConfirmModal,
          body.flowsignal-public-home #flowsignalTradingModeSelector,
          body.flowsignal-public-home .trade-modal,
          body.flowsignal-public-home .smart-explain,
          body.flowsignal-public-home .feedback-toast {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `;
        document.head.appendChild(style);
      }
      try { window.speechSynthesis?.cancel?.(); } catch (_error) {}
      window.__FLOWSIGNAL_PUBLIC_HOME_BOOT = true;
    }
  } catch (_error) {}

  // Keep browser dashboard reads isolated from the heavyweight /panel-data
  // trading/diagnostic endpoint. This is installed before script.js loads.
  if (!window.__flowSignalDashboardFetchPatched) {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      try {
        const method = String(init?.method || (input instanceof Request ? input.method : 'GET') || 'GET').toUpperCase();
        const raw = typeof input === 'string' || input instanceof URL
          ? String(input)
          : input instanceof Request
            ? input.url
            : '';
        if (method === 'GET' && raw) {
          const url = new URL(raw, window.location.href);
          if (url.pathname === '/panel-data') {
            url.pathname = '/dashboard-feed';
            if (input instanceof Request) {
              input = new Request(url.toString(), input);
            } else {
              input = url.toString();
            }
          }
        }
      } catch (_error) {}
      return nativeFetch(input, init);
    };
    window.__flowSignalDashboardFetchPatched = true;
  }

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
    document.write('<script src="signal-display-state.js?v=2"><\/script>');
  }

  function loadTabRoleSession() {
    if (window.FlowSignalTabRole || document.querySelector('script[data-flow-tab-role-session]')) return;
    const script = document.createElement("script");
    script.src = "tab-role-session.js?v=8";
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
      const role = String(sessionStorage.getItem('flowsignal_tab_role') || localStorage.getItem("flowsignal_role") || "").toLowerCase();
      const userToken = String(sessionStorage.getItem('flowsignal_user_session_token') || '').trim();
      return Boolean(userToken) || access?.granted === true || role === "admin";
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

  if (ownerRequested) {
    window.addEventListener('load', () => {
      let attempts = 0;
      const openOwner = () => {
        attempts += 1;
        if (typeof window.openFlowSignalAdminLogin === 'function') {
          window.openFlowSignalAdminLogin();
          return;
        }
        if (attempts < 30) window.setTimeout(openOwner, 100);
      };
      openOwner();
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadTabRoleSession, { once: true });
  } else {
    loadTabRoleSession();
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
  };

  record("application_initialization_started");
  record("dashboard_transport_ready", { transport: "isolated_cache_feed", path: "/dashboard-feed" });
  record("live_chart_tick_transport_ready", { transport: "ctrader_tick_snapshot", pollMs: 250 });
  record("smc_overlay_module_ready", { observationOnly: true, affectsStrategy: false, singleInstance: true });
  attachMenu();
})();
