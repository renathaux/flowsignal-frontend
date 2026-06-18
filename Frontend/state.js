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

  window.FlowSignalState = {
    loadFeatureFlags,
    saveFeatureFlags,
  };
})();
