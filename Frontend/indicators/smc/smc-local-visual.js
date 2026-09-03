(function () {
  "use strict";

  // Compatibility shim only. BOS/CHoCH is now calculated by the authoritative
  // backend SMC engine. Keeping this object avoids breaking older startup code,
  // but it must never generate or render a second browser-side structure model.
  function wrap() {
    return true;
  }

  function apply() {
    window.FlowSignalSMC?.refresh?.();
    return false;
  }

  window.addEventListener("flowsignal:smc-toggle", () => {
    if (window.FlowSignalSMC?.getState?.().enabled) {
      window.setTimeout(() => window.FlowSignalSMC?.refresh?.(), 0);
    }
  });

  window.addEventListener("flowsignal:chart-context", () => {
    if (window.FlowSignalSMC?.getState?.().enabled) {
      window.setTimeout(() => window.FlowSignalSMC?.refresh?.(), 0);
    }
  });

  window.FlowSignalSmcLocalVisual = {
    wrap,
    apply,
    getState: () => ({
      candles: 0,
      wrapped: false,
      engine: "backend_smc_indicator_authority",
      observationOnly: false,
      browserCalculationDisabled: true,
    }),
  };
})();
