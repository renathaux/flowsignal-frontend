(function () {
  "use strict";

  function timeframeSeconds(value) {
    const normalized = String(value || "5m").toLowerCase();
    if (normalized === "5m") return 300;
    if (normalized === "15m") return 900;
    if (normalized === "1h") return 3600;
    return 300;
  }

  function bucketTime(epochSeconds, timeframe) {
    const size = timeframeSeconds(timeframe);
    return Math.floor(Number(epochSeconds) / size) * size;
  }

  function normalizeEpoch(value) {
    if (typeof value === "string" && value.trim()) {
      const parsed = Date.parse(value);
      if (Number.isFinite(parsed)) return parsed / 1000;
    }
    let epoch = Number(value);
    if (!Number.isFinite(epoch)) return null;
    if (epoch > 10_000_000_000) epoch /= 1000;
    return epoch;
  }

  function normalizePriceTick(payload, symbol) {
    const root = payload && typeof payload === "object" ? payload : {};
    const livePrices = root.live_prices && typeof root.live_prices === "object"
      ? root.live_prices
      : root.prices && typeof root.prices === "object"
        ? root.prices
        : root;
    const tick = livePrices?.[symbol] || livePrices?.[String(symbol).toLowerCase()] || null;
    if (!tick || typeof tick !== "object") return null;
    const bid = Number(tick.bid);
    const ask = Number(tick.ask);
    const suppliedMid = Number(tick.mid);
    const price = Number.isFinite(suppliedMid)
      ? suppliedMid
      : Number.isFinite(bid) && Number.isFinite(ask)
        ? (bid + ask) / 2
        : Number.isFinite(bid)
          ? bid
          : Number.isFinite(ask)
            ? ask
            : null;
    const timestamp = normalizeEpoch(
      tick.timestamp ?? tick.time ?? tick.updated_at ?? root.live_price_last_update ?? root.last_update
    );
    if (!Number.isFinite(price) || !Number.isFinite(timestamp)) return null;
    return { symbol, price, timestamp, bid, ask };
  }

  const state = {
    series: null,
    symbol: "EURUSD",
    timeframe: "5m",
    candle: null,
    endpoint: "",
    pollMs: 500,
    timer: null,
    requestInFlight: false,
    lastTickTimestamp: 0,
    lastTickPrice: null,
    running: false,
  };

  function schedulePoll(delay = state.pollMs) {
    window.clearTimeout(state.timer);
    if (!state.running) return;
    state.timer = window.setTimeout(pollOnce, Math.max(100, Number(delay) || state.pollMs));
  }

  async function pollOnce() {
    if (!state.running || !state.endpoint) return;
    if (document.hidden) {
      schedulePoll(Math.max(state.pollMs, 1500));
      return;
    }
    if (state.requestInFlight) {
      schedulePoll();
      return;
    }
    state.requestInFlight = true;
    try {
      const response = await fetch(state.endpoint, { method: "GET", cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const tick = normalizePriceTick(payload, state.symbol);
      if (tick) api.onTick(tick);
    } catch (error) {
      window.dispatchEvent(new CustomEvent("flowsignal:live-candle-error", {
        detail: { message: error?.message || String(error) },
      }));
    } finally {
      state.requestInFlight = false;
      schedulePoll();
    }
  }

  const api = {
    mount({ candleSeries, symbol, timeframe } = {}) {
      state.series = candleSeries || null;
      if (symbol) state.symbol = String(symbol).toUpperCase();
      if (timeframe) state.timeframe = String(timeframe).toLowerCase();
      state.candle = null;
      state.lastTickTimestamp = 0;
      state.lastTickPrice = null;
      return Boolean(state.series);
    },

    setContext({ symbol, timeframe } = {}) {
      if (symbol && String(symbol).toUpperCase() !== state.symbol) {
        state.symbol = String(symbol).toUpperCase();
        state.candle = null;
        state.lastTickTimestamp = 0;
        state.lastTickPrice = null;
      }
      if (timeframe && String(timeframe).toLowerCase() !== state.timeframe) {
        state.timeframe = String(timeframe).toLowerCase();
        state.candle = null;
      }
    },

    seed(candle) {
      if (!candle) return;
      const time = Number(candle.time);
      const open = Number(candle.open);
      const high = Number(candle.high);
      const low = Number(candle.low);
      const close = Number(candle.close);
      if (![time, open, high, low, close].every(Number.isFinite)) return;
      state.candle = { time, open, high, low, close };
    },

    start({ endpoint, pollMs } = {}) {
      if (endpoint) state.endpoint = String(endpoint);
      if (Number.isFinite(Number(pollMs))) state.pollMs = Math.max(250, Number(pollMs));
      if (!state.endpoint) return false;
      state.running = true;
      schedulePoll(0);
      return true;
    },

    stop() {
      state.running = false;
      window.clearTimeout(state.timer);
      state.timer = null;
    },

    onTick({ symbol, price, timestamp } = {}) {
      if (!state.series) return null;
      if (symbol && String(symbol).toUpperCase() !== state.symbol) return null;
      const numericPrice = Number(price);
      const epoch = normalizeEpoch(timestamp);
      if (!Number.isFinite(numericPrice) || !Number.isFinite(epoch)) return null;
      if (epoch < state.lastTickTimestamp) return null;
      if (epoch === state.lastTickTimestamp && numericPrice === state.lastTickPrice) return null;

      const time = bucketTime(epoch, state.timeframe);
      let candle = state.candle;
      if (!candle || Number(candle.time) !== time) {
        const previousClose = Number(candle?.close);
        const open = Number.isFinite(previousClose) ? previousClose : numericPrice;
        candle = {
          time,
          open,
          high: Math.max(open, numericPrice),
          low: Math.min(open, numericPrice),
          close: numericPrice,
        };
      } else {
        candle = {
          ...candle,
          high: Math.max(Number(candle.high), numericPrice),
          low: Math.min(Number(candle.low), numericPrice),
          close: numericPrice,
        };
      }

      state.candle = candle;
      state.lastTickTimestamp = epoch;
      state.lastTickPrice = numericPrice;
      state.series.update(candle);
      window.dispatchEvent(new CustomEvent("flowsignal:live-candle", {
        detail: {
          symbol: state.symbol,
          timeframe: state.timeframe,
          candle: { ...candle },
          tick: { price: numericPrice, timestamp: epoch },
        },
      }));
      return { ...candle };
    },

    getState() {
      return {
        symbol: state.symbol,
        timeframe: state.timeframe,
        candle: state.candle ? { ...state.candle } : null,
        mounted: Boolean(state.series),
        running: state.running,
        endpoint: state.endpoint,
        pollMs: state.pollMs,
        lastTickTimestamp: state.lastTickTimestamp || null,
      };
    },
  };

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && state.running) schedulePoll(0);
  });

  window.FlowSignalLiveCandles = api;
})();
