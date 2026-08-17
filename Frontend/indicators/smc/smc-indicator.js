(function () {
  "use strict";

  const state = {
    enabled: false,
    symbol: "EURUSD",
    timeframe: "15m",
    latest: null,
    mounted: false,
  };

  function renderer() {
    return window.FlowSignalSmcRenderer || null;
  }

  function emit(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  const api = {
    mount({ candleSeries, symbol, timeframe } = {}) {
      if (symbol) state.symbol = String(symbol).toUpperCase();
      if (timeframe) state.timeframe = String(timeframe).toLowerCase();
      state.mounted = Boolean(renderer()?.mount({ candleSeries }));
      renderer()?.setEnabled(state.enabled);
      if (state.latest) renderer()?.render(state.latest);
      return state.mounted;
    },

    setContext({ symbol, timeframe } = {}) {
      if (symbol) state.symbol = String(symbol).toUpperCase();
      if (timeframe) state.timeframe = String(timeframe).toLowerCase();
      emit("flowsignal:smc-context", this.getState());
    },

    setEnabled(enabled) {
      state.enabled = Boolean(enabled);
      renderer()?.setEnabled(state.enabled);
      if (state.enabled && state.latest) renderer()?.render(state.latest);
      emit("flowsignal:smc-toggle", this.getState());
    },

    applyStructure(structure) {
      state.latest = structure || null;
      if (state.enabled) renderer()?.render(state.latest);
      emit("flowsignal:smc-update", {
        ...this.getState(),
        structure: state.latest,
      });
    },

    clear() {
      state.latest = null;
      renderer()?.clear();
    },

    getState() {
      return {
        enabled: state.enabled,
        symbol: state.symbol,
        timeframe: state.timeframe,
        mounted: state.mounted,
        bias: state.latest?.bias || "NEUTRAL",
      };
    },
  };

  window.FlowSignalSMC = api;
})();
