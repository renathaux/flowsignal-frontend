(function () {
  "use strict";

  const base = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://flowsignal-backend-3.onrender.com";

  const state = {
    enabled: localStorage.getItem("flowsignal_smc_overlay") === "1",
    symbol: "EURUSD",
    timeframe: "5m",
    latest: null,
    mounted: false,
    timer: null,
    requestInFlight: false,
    lastError: null,
    localReady: false,
    localCandleCount: 0,
  };

  function renderer() {
    return window.FlowSignalSmcRenderer || null;
  }

  function emit(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function schedule(delay = 15000) {
    window.clearTimeout(state.timer);
    if (!state.enabled) return;
    state.timer = window.setTimeout(loadStructure, delay);
  }

  async function loadStructure() {
    if (!state.enabled || state.requestInFlight) return;
    if (state.localReady) {
      schedule();
      return;
    }
    state.requestInFlight = true;
    try {
      const url = new URL(`${base}/chart/smc-structure`);
      url.searchParams.set("symbol", state.symbol);
      url.searchParams.set("timeframe", state.timeframe);
      url.searchParams.set("limit", "250");
      const response = await fetch(url.toString(), { cache: "no-store", suppressErrorPanel: true });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const structure = await response.json();
      state.lastError = null;
      api.applyStructure(structure);
    } catch (error) {
      state.lastError = error?.message || String(error);
      emit("flowsignal:smc-error", api.getState());
    } finally {
      state.requestInFlight = false;
      schedule();
    }
  }

  function applyLocalCandles(detail) {
    const engine = window.FlowSignalSmcLocalEngine;
    if (!engine || typeof engine.analyze !== "function") return false;
    const symbol = String(detail?.symbol || state.symbol).toUpperCase();
    const timeframe = String(detail?.timeframe || state.timeframe).toLowerCase();
    if (symbol !== state.symbol || timeframe !== state.timeframe) return false;
    const candles = Array.isArray(detail?.candles) ? detail.candles : [];
    if (candles.length < 10) return false;

    const structure = engine.analyze(candles, { leftBars: 2, rightBars: 2 });
    structure.symbol = symbol;
    structure.timeframe = timeframe;
    structure.source = "browser_closed_chart_candles";
    structure.observation_only = true;
    structure.affects_strategy = false;

    state.localReady = true;
    state.localCandleCount = candles.length;
    state.lastError = null;
    api.applyStructure(structure);
    return true;
  }

  const api = {
    mount({ candleSeries, symbol, timeframe } = {}) {
      if (symbol) state.symbol = String(symbol).toUpperCase();
      if (timeframe) state.timeframe = String(timeframe).toLowerCase();
      state.mounted = Boolean(renderer()?.mount({ candleSeries }));
      renderer()?.setEnabled(state.enabled);
      if (state.latest) renderer()?.render(state.latest);
      if (state.enabled) schedule(0);
      return state.mounted;
    },

    setContext({ symbol, timeframe } = {}) {
      const nextSymbol = symbol ? String(symbol).toUpperCase() : state.symbol;
      const nextTimeframe = timeframe ? String(timeframe).toLowerCase() : state.timeframe;
      const changed = nextSymbol !== state.symbol || nextTimeframe !== state.timeframe;
      state.symbol = nextSymbol;
      state.timeframe = nextTimeframe;
      if (changed) {
        state.latest = null;
        state.localReady = false;
        state.localCandleCount = 0;
        renderer()?.clear();
        if (state.enabled) schedule(100);
      }
      emit("flowsignal:smc-context", this.getState());
    },

    setEnabled(enabled) {
      state.enabled = Boolean(enabled);
      localStorage.setItem("flowsignal_smc_overlay", state.enabled ? "1" : "0");
      renderer()?.setEnabled(state.enabled);
      if (state.enabled) {
        if (state.latest) renderer()?.render(state.latest);
        window.FlowSignalSmcCandleTap?.wrap?.();
        schedule(0);
      } else {
        window.clearTimeout(state.timer);
        state.timer = null;
      }
      emit("flowsignal:smc-toggle", this.getState());
    },

    refresh() {
      window.FlowSignalSmcCandleTap?.wrap?.();
      if (state.enabled) schedule(0);
    },

    applyStructure(structure) {
      state.latest = structure || null;
      if (state.enabled) renderer()?.render(state.latest);
      emit("flowsignal:smc-update", {
        ...this.getState(),
        structure: state.latest,
      });
    },

    applyLocalCandles,

    clear() {
      state.latest = null;
      state.localReady = false;
      state.localCandleCount = 0;
      renderer()?.clear();
    },

    getState() {
      return {
        enabled: state.enabled,
        symbol: state.symbol,
        timeframe: state.timeframe,
        mounted: state.mounted,
        bias: state.latest?.bias || "NEUTRAL",
        closedCandleCount: state.latest?.closed_candle_count || 0,
        localReady: state.localReady,
        localCandleCount: state.localCandleCount,
        source: state.latest?.source || null,
        lastError: state.lastError,
        affectsStrategy: false,
      };
    },
  };

  window.FlowSignalSMC = api;

  window.addEventListener("flowsignal:chart-candle-series", (event) => {
    const detail = event.detail || {};
    api.mount(detail);
  });
  window.addEventListener("flowsignal:chart-context", (event) => {
    api.setContext(event.detail || {});
  });
  window.addEventListener("flowsignal:chart-candles", (event) => {
    applyLocalCandles(event.detail || {});
  });
  window.addEventListener("flowsignal:live-candle", (event) => {
    const detail = event.detail || {};
    if (detail.symbol !== state.symbol || detail.timeframe !== state.timeframe) return;
    const candleTime = Number(detail.candle?.time);
    if (!Number.isFinite(candleTime)) return;
    const lastSeen = Number(state.latest?._visual_live_bucket || 0);
    if (candleTime !== lastSeen && state.enabled && !state.localReady) {
      if (state.latest) state.latest._visual_live_bucket = candleTime;
      schedule(250);
    }
  });
})();
