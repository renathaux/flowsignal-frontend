(function () {
  function shouldUseSeparatedMobileDashboard() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("desktop") === "1") return false;
      if (!window.matchMedia("(max-width: 700px)").matches) return false;
      if (/\/mobile\.html$/i.test(window.location.pathname)) return false;

      const access = JSON.parse(localStorage.getItem("flowsignal_access") || "null");
      const role = String(localStorage.getItem("flowsignal_role") || "").toLowerCase();
      const authenticated = access?.granted === true || role === "admin" || role === "user";
      return authenticated;
    } catch (_error) {
      return false;
    }
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
    const entry = {
      event,
      timestamp: new Date().toISOString(),
      detail: safeDetail(detail),
    };
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
    document.dispatchEvent(new CustomEvent("flowsignal:menu-state", {
      detail: { open: menuOpen },
    }));
    return true;
  }

  function attachMenu() {
    const button = document.getElementById("menuToggleBtn");
    const sideMenu = document.getElementById("sideMenu");
    if (!button || !sideMenu) {
      record("menu_listener_missing", {
        button: Boolean(button),
        sideMenu: Boolean(sideMenu),
      });
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
    try {
      requested = new URLSearchParams(window.location.search).get("open") || "";
    } catch (_error) {
      return;
    }
    if (!requested) return;

    const allowed = new Set([
      "menuDashboardBtn",
      "menuAssistantBtn",
      "menuPaperBtn",
      "menuFeedbackBtn",
      "menuHistoryBtn",
      "menuStatsBtn",
      "menuGeneralSettingsBtn",
      "menuRiskSettingsBtn",
      "menuBrokerAccountsBtn",
      "menuNotificationsSettingsBtn",
      "menuStrategySettingsBtn",
    ]);
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

  window.addEventListener("error", (event) => {
    record("uncaught_initialization_error", {
      message: event.message || "Unknown JavaScript error",
      source: event.filename || null,
      line: event.lineno || null,
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    record("unhandled_initialization_rejection", {
      message: event.reason?.message || String(event.reason || "Unknown rejection"),
    });
  });

  window.addEventListener("load", openRequestedDesktopPanel, { once: true });

  window.FlowSignalStartup = {
    startedAt,
    record,
    events: () => events.slice(),
    attachMenu,
    setMenuOpen,
    isMenuOpen: () => menuOpen,
    setTransportStatus,
  };

  record("application_initialization_started");
  record("websocket_not_used", { transport: "rest_polling" });
  attachMenu();
})();
