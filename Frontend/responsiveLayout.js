(function () {
  function applyResponsiveRoleGuards() {
    if (typeof window.applyRoleVisibility === "function") {
      window.applyRoleVisibility();
    }
  }

  window.FlowSignalResponsiveLayout = {
    apply: applyResponsiveRoleGuards,
  };

  window.addEventListener("resize", applyResponsiveRoleGuards);
  window.addEventListener("orientationchange", applyResponsiveRoleGuards);
  window.addEventListener("DOMContentLoaded", applyResponsiveRoleGuards);
})();
