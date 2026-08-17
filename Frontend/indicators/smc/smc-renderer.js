(function () {
  "use strict";

  function epoch(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value > 10_000_000_000 ? Math.floor(value / 1000) : Math.floor(value);
    }
    const parsed = Date.parse(String(value || ""));
    return Number.isFinite(parsed) ? Math.floor(parsed / 1000) : null;
  }

  function safeRemoveSeries(chart, series) {
    try {
      if (chart && series && typeof chart.removeSeries === "function") chart.removeSeries(series);
    } catch (_) {}
  }

  class SmcRenderer {
    constructor() {
      this.chart = null;
      this.candleSeries = null;
      this.structureSeries = [];
      this.enabled = false;
    }

    mount({ chart, candleSeries } = {}) {
      if (chart) this.chart = chart;
      if (candleSeries) this.candleSeries = candleSeries;
      return Boolean(this.chart && this.candleSeries);
    }

    setEnabled(enabled) {
      this.enabled = Boolean(enabled);
      if (!this.enabled) this.clear();
    }

    clear() {
      this.structureSeries.forEach((series) => safeRemoveSeries(this.chart, series));
      this.structureSeries = [];
    }

    addSegment(event) {
      if (!this.chart || typeof this.chart.addLineSeries !== "function") return;

      const price = Number(event?.broken_level);
      let start = epoch(event?.broken_swing_timestamp);
      let end = epoch(event?.timestamp);
      if (!Number.isFinite(price) || !Number.isFinite(start) || !Number.isFinite(end)) return;
      if (end <= start) end = start + 1;

      const isChoch = String(event?.event_type || "").toUpperCase() === "CHOCH";
      const isBullish = String(event?.direction || "").toUpperCase() === "BULLISH";
      const color = isChoch ? "#6d8cff" : (isBullish ? "#d9e3f0" : "#f0c9cf");
      const lineWidth = isChoch ? 2 : 1;

      const series = this.chart.addLineSeries({
        color,
        lineWidth,
        lineStyle: 0,
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: false,
        autoscaleInfoProvider: () => null,
      });

      series.setData([
        { time: start, value: price },
        { time: end, value: price },
      ]);

      if (typeof series.setMarkers === "function") {
        series.setMarkers([{
          time: end,
          position: isBullish ? "aboveBar" : "belowBar",
          shape: isBullish ? "arrowUp" : "arrowDown",
          color,
          text: isChoch ? "CHoCH" : "BOS",
          size: 0.55,
        }]);
      }

      this.structureSeries.push(series);
    }

    render(structure) {
      this.clear();
      if (!this.enabled || !this.chart || !this.candleSeries || !structure) return;

      const events = Array.isArray(structure.events) ? structure.events : [];
      events.slice(-14).forEach((event) => this.addSegment(event));
    }
  }

  window.FlowSignalSmcRenderer = new SmcRenderer();
})();
