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

  const state = {
    series: null,
    symbol: "EURUSD",
    timeframe: "5m",
    candle: null,
  };

  const api = {
    mount({ candleSeries, symbol, timeframe } = {}) {
      state.series = candleSeries || null;
      if (symbol) state.symbol = String(symbol).toUpperCase();
      if (timeframe) state.timeframe = String(timeframe).toLowerCase();
      state.candle = null;
      return Boolean(state.series);
    },

    setContext({ symbol, timeframe } = {}) {
      if (symbol && String(symbol).toUpperCase() !== state.symbol) {
        state.symbol = String(symbol).toUpperCase();
        state.candle = null;
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

    onTick({ symbol, price, timestamp } = {}) {
      if (!state.series) return null;
      if (symbol && String(symbol).toUpperCase() !== state.symbol) return null;
      const numericPrice = Number(price);
      let epoch = Number(timestamp);
      if (!Number.isFinite(numericPrice) || !Number.isFinite(epoch)) return null;
      if (epoch > 10_000_000_000) epoch /= 1000;

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
      state.series.update(candle);
      window.dispatchEvent(new CustomEvent("flowsignal:live-candle", {
        detail: { symbol: state.symbol, timeframe: state.timeframe, candle: { ...candle } },
      }));
      return { ...candle };
    },

    getState() {
      return {
        symbol: state.symbol,
        timeframe: state.timeframe,
        candle: state.candle ? { ...state.candle } : null,
        mounted: Boolean(state.series),
      };
    },
  };

  window.FlowSignalLiveCandles = api;
})();
