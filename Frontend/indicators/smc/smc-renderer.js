(function () {
  "use strict";

  function safeRemove(series, line) {
    try {
      if (series && line && typeof series.removePriceLine === "function") {
        series.removePriceLine(line);
      }
    } catch (_) {}
  }

  class SmcRenderer {
    constructor() {
      this.series = null;
      this.lines = [];
      this.enabled = false;
    }

    mount({ candleSeries }) {
      this.series = candleSeries || null;
      return Boolean(this.series);
    }

    setEnabled(enabled) {
      this.enabled = Boolean(enabled);
      if (!this.enabled) this.clear();
    }

    clear() {
      this.lines.forEach((line) => safeRemove(this.series, line));
      this.lines = [];
    }

    render(structure) {
      this.clear();
      if (!this.enabled || !this.series || !structure) return;

      const events = Array.isArray(structure.events) ? structure.events : [];
      events.slice(-12).forEach((event) => {
        const price = Number(event.broken_level);
        if (!Number.isFinite(price)) return;
        const isChoch = String(event.event_type || "").toUpperCase() === "CHOCH";
        const isBullish = String(event.direction || "").toUpperCase() === "BULLISH";
        const line = this.series.createPriceLine({
          price,
          lineWidth: isChoch ? 2 : 1,
          lineStyle: 2,
          axisLabelVisible: false,
          title: `${isChoch ? "CHoCH" : "BOS"} ${isBullish ? "▲" : "▼"}`,
          color: isChoch ? "#ff6b6b" : (isBullish ? "#20d67b" : "#4f8cff"),
        });
        this.lines.push(line);
      });
    }
  }

  window.FlowSignalSmcRenderer = new SmcRenderer();
})();
