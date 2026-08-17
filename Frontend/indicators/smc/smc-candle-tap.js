(function () {
  "use strict";

  let wrappedSeries = null;

  function currentSeries() {
    try {
      return typeof candleSeries !== "undefined" ? candleSeries : null;
    } catch (_) {
      return null;
    }
  }

  function currentSymbol() {
    try {
      return typeof currentChartSymbol !== "undefined" && currentChartSymbol
        ? String(currentChartSymbol).toUpperCase()
        : "EURUSD";
    } catch (_) {
      return "EURUSD";
    }
  }

  function currentTimeframe() {
    try {
      return typeof currentChartTimeframe !== "undefined" && currentChartTimeframe
        ? String(currentChartTimeframe).toLowerCase()
        : "5m";
    } catch (_) {
      return "5m";
    }
  }

  function publish(candles) {
    if (!Array.isArray(candles) || !candles.length) return;
    window.dispatchEvent(new CustomEvent("flowsignal:chart-candles", {
      detail: {
        symbol: currentSymbol(),
        timeframe: currentTimeframe(),
        candles: candles.map((c) => ({ ...c })),
      },
    }));
  }

  function wrap() {
    const series = currentSeries();
    if (!series || typeof series.setData !== "function") return false;
    if (series === wrappedSeries && series.__flowSmcCandleTapWrapped) return true;

    if (!series.__flowSmcCandleTapWrapped) {
      const originalSetData = series.setData.bind(series);
      series.setData = function (candles) {
        const result = originalSetData(candles);
        publish(candles);
        return result;
      };
      series.__flowSmcCandleTapWrapped = true;
    }

    wrappedSeries = series;
    return true;
  }

  window.addEventListener("load", () => {
    wrap();
    window.setTimeout(wrap, 250);
    window.setTimeout(wrap, 1000);
  });
  document.addEventListener("click", () => window.setTimeout(wrap, 0), true);
  const timer = window.setInterval(wrap, 500);
  window.addEventListener("beforeunload", () => window.clearInterval(timer), { once: true });

  window.FlowSignalSmcCandleTap = { wrap };
})();
