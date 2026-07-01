(function () {
  window.FlowSignalSettings = {
    loadDashboardPreferences() {
      try {
        return JSON.parse(localStorage.getItem("flowsignal_dashboard_preferences") || "{}");
      } catch {
        return {};
      }
    },
    loadRiskPreferences() {
      try {
        return JSON.parse(localStorage.getItem("flowsignal_risk_preferences") || "{}");
      } catch {
        return {};
      }
    },
  };
})();
