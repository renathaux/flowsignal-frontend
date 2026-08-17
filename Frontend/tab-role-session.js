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

  if (isChromeDesktop()) {
    document.body?.classList.add("flowsignal-chrome-desktop");
  }

  function getTabRole() {
    return normalizeRole(sessionStorage.getItem(TAB_ROLE_KEY));
  }

  function setTabRole(role) {
    const normalized = normalizeRole(role);
    if (!normalized) return false;
    sessionStorage.setItem(TAB_ROLE_KEY, normalized);
    document.body.dataset.userRole = normalized;
    return true;
  }

  // First load in this tab inherits the currently selected role once. After
  // that, this tab owns its role through sessionStorage and ignores role
  // changes made by other Chrome tabs.
  if (!getTabRole()) {
    const inherited = normalizeRole(localStorage.getItem(SHARED_ROLE_KEY));
    if (inherited) setTabRole(inherited);
  }

  // isAdminAccount is a global function declared by script.js. Replacing the
  // global binding makes all existing role guards use the per-tab role.
  window.isAdminAccount = function () {
    return getTabRole() === "admin";
  };

  function currentStrategyHasFreshSignal() {
    const signal = String(document.getElementById("main-signal")?.textContent || "")
      .trim()
      .toUpperCase();
    return signal === "BUY" || signal === "SELL";
  }

  function syncFreshStrategyVisibility() {
    const freshSignal = currentStrategyHasFreshSignal();
    const strategyChecks = document.querySelector(".entry-strategy-debug");
    const smcIntel = document.getElementById("main-smc-plan-intel");

    // These blocks describe the CURRENT setup only. A running broker position
    // must never keep old setup checks visible after the strategy returns WAIT.
    [strategyChecks, smcIntel].forEach((element) => {
      if (!element) return;
      if (freshSignal) {
        element.style.removeProperty("display");
        element.style.removeProperty("visibility");
        element.classList.remove("hidden");
      } else {
        element.style.setProperty("display", "none", "important");
        element.style.setProperty("visibility", "hidden", "important");
      }
    });

    if (strategyChecks && freshSignal) strategyChecks.open = true;
  }

  function ensureUserAnalysisVisibility() {
    if (getTabRole() !== "user") {
      syncFreshStrategyVisibility();
      return;
    }

    const smcPlan = document.querySelector(".main-smc-panel");
    if (smcPlan) {
      smcPlan.classList.remove("hidden");
      smcPlan.style.setProperty("display", "block", "important");
      smcPlan.style.setProperty("visibility", "visible", "important");
    }

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

    syncFreshStrategyVisibility();
  }

  function attachFreshSignalObserver() {
    const signal = document.getElementById("main-signal");
    if (!signal || signal.dataset.flowSignalFreshObserver === "true") return;
    signal.dataset.flowSignalFreshObserver = "true";
    const observer = new MutationObserver(() => syncFreshStrategyVisibility());
    observer.observe(signal, { childList: true, characterData: true, subtree: true });
    syncFreshStrategyVisibility();
  }

  function refreshRoleUi() {
    const role = getTabRole();
    if (!role) return;
    document.body.dataset.userRole = role;
    try { window.applyRoleVisibility?.(); } catch (_error) {}
    try { window.updatePnlVisibility?.(); } catch (_error) {}
    ensureUserAnalysisVisibility();
    attachFreshSignalObserver();
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

  // Login buttons still write the legacy shared key inside script.js. Capture
  // which role THIS tab requested, then adopt it into sessionStorage once that
  // login succeeds. Other tabs keep their own existing session role.
  document.addEventListener("click", (event) => {
    const target = event.target?.closest?.("#adminLoginBtn, #accessBtn");
    if (!target) return;
    if (target.id === "adminLoginBtn") adoptRequestedRole("admin");
    if (target.id === "accessBtn") adoptRequestedRole("user");
  }, true);

  // Cross-tab localStorage changes are intentionally ignored. Reassert the
  // current tab role if another tab changes the shared legacy key.
  window.addEventListener("storage", (event) => {
    if (event.key !== SHARED_ROLE_KEY) return;
    refreshRoleUi();
  });

  // Some legacy role/layout code runs after startup and can hide these panels
  // again. Re-apply the user analysis visibility after the app is ready.
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
