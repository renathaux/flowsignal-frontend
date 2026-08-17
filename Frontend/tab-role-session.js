(function () {
  const TAB_ROLE_KEY = "flowsignal_tab_role";
  const SHARED_ROLE_KEY = "flowsignal_role";

  function normalizeRole(value) {
    const role = String(value || "").toLowerCase();
    return role === "admin" || role === "user" ? role : "";
  }

  function isChromeDesktop() {
    const ua = String(navigator.userAgent || "");
    const chrome = /Chrome\//.test(ua) && !/(Edg|OPR|SamsungBrowser)\//.test(ua);
    return chrome && window.matchMedia("(min-width: 701px)").matches;
  }

  const chromeDesktop = isChromeDesktop();
  if (chromeDesktop) document.body?.classList.add("flowsignal-chrome-desktop");

  function getTabRole() { return normalizeRole(sessionStorage.getItem(TAB_ROLE_KEY)); }
  function setTabRole(role) {
    const normalized = normalizeRole(role);
    if (!normalized) return false;
    sessionStorage.setItem(TAB_ROLE_KEY, normalized);
    document.body.dataset.userRole = normalized;
    return true;
  }

  if (!getTabRole()) {
    const inherited = normalizeRole(localStorage.getItem(SHARED_ROLE_KEY));
    if (inherited) setTabRole(inherited);
  }

  window.isAdminAccount = function () { return getTabRole() === "admin"; };

  function currentStrategyHasFreshSignal() {
    const signal = String(document.getElementById("main-signal")?.textContent || "").trim().toUpperCase();
    return signal === "BUY" || signal === "SELL";
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && element.textContent !== value) element.textContent = value;
  }

  function keepAnalysisCardsVisible() {
    const elements = [
      document.querySelector(".main-smc-panel"),
      document.getElementById("main-smc-plan-intel"),
      document.querySelector(".entry-strategy-debug"),
    ];
    elements.forEach((element) => {
      if (!element) return;
      element.classList.remove("hidden");
      element.style.removeProperty("display");
      element.style.removeProperty("visibility");
    });
    const checks = document.querySelector(".entry-strategy-debug");
    if (checks) checks.open = true;
  }

  function clearExpiredEntryChecks() {
    if (!chromeDesktop || currentStrategyHasFreshSignal()) return;
    keepAnalysisCardsVisible();

    // Only ENTRY STRATEGY CHECKS are reset when the entry signal expires.
    // SMC PLAN intelligence remains live and continues showing what the
    // strategy is currently waiting for, its structure, levels and progress.
    [
      "strategy-debug-smc",
      "strategy-debug-swing-break",
      "strategy-debug-15m-close",
      "strategy-debug-5m-confirm",
      "strategy-debug-swing-sl",
    ].forEach((id) => setText(id, "NO"));
    setText("strategy-debug-decision", "WAIT");
    setText("strategy-debug-block-reason", "--");
  }

  function syncCurrentStrategyPresentation() {
    if (!chromeDesktop) return;
    keepAnalysisCardsVisible();
    if (!currentStrategyHasFreshSignal()) clearExpiredEntryChecks();
  }

  function ensureUserAnalysisVisibility() {
    if (getTabRole() !== "user") {
      syncCurrentStrategyPresentation();
      return;
    }

    const smcPlan = document.querySelector(".main-smc-panel");
    const smcIntel = document.getElementById("main-smc-plan-intel");
    const strategyChecks = document.querySelector(".entry-strategy-debug");
    [smcPlan, smcIntel, strategyChecks].forEach((element) => {
      if (!element) return;
      element.classList.remove("hidden");
      element.style.setProperty("display", "block", "important");
      element.style.setProperty("visibility", "visible", "important");
    });
    if (strategyChecks) strategyChecks.open = true;

    const mainTradePanel = document.querySelector(".main-trade-panel");
    const mainTradeCard = document.querySelector(".main-trade-card");
    [mainTradePanel, mainTradeCard].forEach((element) => {
      if (!element) return;
      element.classList.remove("hidden");
      element.style.setProperty("display", "block", "important");
      element.style.setProperty("visibility", "visible", "important");
      element.style.setProperty("height", "auto", "important");
      element.style.setProperty("max-height", "none", "important");
      element.style.setProperty("overflow", "visible", "important");
    });

    syncCurrentStrategyPresentation();
  }

  function attachCurrentSetupObserver() {
    if (!chromeDesktop) return;
    const card = document.querySelector(".main-trade-card");
    if (!card || card.dataset.flowSignalSetupObserver === "true") return;
    card.dataset.flowSignalSetupObserver = "true";
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        syncCurrentStrategyPresentation();
      });
    });
    observer.observe(card, { childList: true, characterData: true, subtree: true });
    syncCurrentStrategyPresentation();
  }

  function refreshRoleUi() {
    const role = getTabRole();
    if (!role) return;
    document.body.dataset.userRole = role;
    try { window.applyRoleVisibility?.(); } catch (_error) {}
    try { window.updatePnlVisibility?.(); } catch (_error) {}
    ensureUserAnalysisVisibility();
    attachCurrentSetupObserver();
  }

  function adoptRequestedRole(requestedRole) {
    const wanted = normalizeRole(requestedRole);
    if (!wanted) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const shared = normalizeRole(localStorage.getItem(SHARED_ROLE_KEY));
      if (shared === wanted) {
        window.clearInterval(timer);
        setTabRole(wanted);
        refreshRoleUi();
        return;
      }
      if (tries >= 60) window.clearInterval(timer);
    }, 100);
  }

  document.addEventListener("click", (event) => {
    const target = event.target?.closest?.("#adminLoginBtn, #accessBtn");
    if (!target) return;
    if (target.id === "adminLoginBtn") adoptRequestedRole("admin");
    if (target.id === "accessBtn") adoptRequestedRole("user");
  }, true);

  window.addEventListener("storage", (event) => {
    if (event.key !== SHARED_ROLE_KEY) return;
    refreshRoleUi();
  });

  document.addEventListener("flowsignal:authenticated", () => {
    window.setTimeout(refreshRoleUi, 0);
    window.setTimeout(refreshRoleUi, 250);
  });
  window.addEventListener("load", () => {
    window.setTimeout(refreshRoleUi, 0);
    window.setTimeout(refreshRoleUi, 300);
  }, { once: true });

  refreshRoleUi();

  window.FlowSignalTabRole = {
    get: getTabRole,
    set(role) {
      if (!setTabRole(role)) return false;
      refreshRoleUi();
      return true;
    },
  };
})();
