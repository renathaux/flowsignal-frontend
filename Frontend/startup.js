(function () {
  if (document.readyState === "loading") {
    if (!window.FlowSignalLiveCandles) {
      document.write('<script src="chart/live-candles/live-candle-controller.js?v=3"><\/script>');
    }
    document.write('<link rel="stylesheet" href="indicators/smc/smc.css?v=4">');
    document.write('<script src="indicators/smc/smc-settings.js?v=7"><\/script>');
    document.write('<script src="indicators/smc/smc-renderer.js?v=9"><\/script>');
    document.write('<script src="indicators/smc/smc-indicator.js?v=4"><\/script>');
    document.write('<script src="indicators/smc/smc-chart-bridge.js?v=6"><\/script>');
    document.write('<script src="indicators/smc/smc-local-engine.js?v=4"><\/script>');
    document.write('<script src="indicators/smc/smc-local-visual.js?v=6"><\/script>');
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
  record("live_chart_tick_transport_ready", { transport: "ctrader_tick_snapshot", pollMs: 250 });
  record("smc_overlay_module_ready", { observationOnly: true, affectsStrategy: false, singleInstance: true });
  attachMenu();
})();