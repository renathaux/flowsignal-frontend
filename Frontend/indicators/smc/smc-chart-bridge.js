(function () {
  "use strict";

  let lastSeries = null;
  let lastChart = null;
  let lastSymbol = null;
  let lastTimeframe = null;
  let lastMountAt = 0;

  function currentSeries() {
    try { return typeof candleSeries !== "undefined" ? candleSeries : null; }
    catch (_) { return null; }
  }

  function currentChart() {
    try { return typeof chart !== "undefined" ? chart : null; }
    catch (_) { return null; }
  }

  function currentSymbol() {
    try {
      return typeof currentChartSymbol !== "undefined" && currentChartSymbol
        ? String(currentChartSymbol).toUpperCase()
        : "EURUSD";
    } catch (_) { return "EURUSD"; }
  }

  function currentTimeframe() {
    try {
      return typeof currentChartTimeframe !== "undefined" && currentChartTimeframe
        ? String(currentChartTimeframe).toLowerCase()
        : "5m";
    } catch (_) { return "5m"; }
  }

  function report(error) {
    window.dispatchEvent(new CustomEvent("flowsignal:smc-bridge-error", {
      detail: { message: error?.message || String(error) },
    }));
  }

  function sync() {
    try {
      const smc = window.FlowSignalSMC;
      const series = currentSeries();
      const chartInstance = currentChart();
      if (!smc || !series || !chartInstance) return false;

      const symbol = currentSymbol();
      const timeframe = currentTimeframe();
      const mountChanged = series !== lastSeries || chartInstance !== lastChart;
      const contextChanged = symbol !== lastSymbol || timeframe !== lastTimeframe;

      if (mountChanged) {
        smc.mount({ chart: chartInstance, candleSeries: series, symbol, timeframe });
        lastSeries = series;
        lastChart = chartInstance;
        lastMountAt = Date.now();
      } else if (contextChanged) {
        smc.setContext({ symbol, timeframe });
      }

      lastSymbol = symbol;
      lastTimeframe = timeframe;

      if (smc.getState?.().enabled && (mountChanged || contextChanged || Date.now() - lastMountAt < 1500)) {
        smc.refresh?.();
      }
      return true;
    } catch (error) {
      report(error);
      return false;
    }
  }

  window.addEventListener("load", () => {
    sync();
    window.setTimeout(sync, 250);
    window.setTimeout(sync, 1000);
  });
  window.addEventListener("flowsignal:smc-toggle", sync);
  window.addEventListener("flowsignal:chart-context", sync);
  document.addEventListener("click", () => window.setTimeout(sync, 0), true);

  const timer = window.setInterval(sync, 1000);
  window.addEventListener("beforeunload", () => window.clearInterval(timer), { once: true });

  window.FlowSignalSmcChartBridge = {
    sync,
    getState: () => ({
      mounted: Boolean(lastSeries && lastChart),
      symbol: lastSymbol,
      timeframe: lastTimeframe,
      lastMountAt,
    }),
  };
})();
