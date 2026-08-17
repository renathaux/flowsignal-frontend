(function () {
  const FEATURE_FLAGS_KEY = "flowsignal_feature_flags";
  const DEFAULT_FLAGS = {
    brokerAccounts: true,
    liveTrading: true,
    flowAssistant: true,
    performance: true,
    settings: true,
    healthPage: true,
  };

  function loadFeatureFlags() {
    try {
      return {
        ...DEFAULT_FLAGS,
        ...JSON.parse(localStorage.getItem(FEATURE_FLAGS_KEY) || "{}"),
      };
    } catch {
      return { ...DEFAULT_FLAGS };
    }
  }

  function saveFeatureFlags(flags) {
    localStorage.setItem(FEATURE_FLAGS_KEY, JSON.stringify({
      ...loadFeatureFlags(),
      ...(flags || {}),
    }));
  }

  function loadTabRoleSession() {
    if (window.FlowSignalTabRole || document.querySelector('script[data-flow-tab-role]')) return;
    const script = document.createElement("script");
    script.src = "tab-role-session.js?v=1";
    script.dataset.flowTabRole = "true";
    script.async = false;
    document.body.appendChild(script);
  }

  // script.js owns the legacy login handlers and is parsed after this file.
  // Load the per-tab role adapter only after the page has finished loading so
  // it can replace the global role guard without racing initial definitions.
  window.addEventListener("load", loadTabRoleSession, { once: true });

  window.FlowSignalState = {
    loadFeatureFlags,
    saveFeatureFlags,
  };
})();
