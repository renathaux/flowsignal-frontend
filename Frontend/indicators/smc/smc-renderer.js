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

    addLine(options) {
      if (!this.series || typeof this.series.createPriceLine !== "function") return;
      const line = this.series.createPriceLine(options);
      this.lines.push(line);
    }

    render(structure) {
      this.clear();
      if (!this.enabled || !this.series || !structure) return;

      const events = Array.isArray(structure.events) ? structure.events : [];
      events.slice(-10).forEach((event) => {
        const price = Number(event.broken_level);
        if (!Number.isFinite(price)) return;
        const isChoch = String(event.event_type || "").toUpperCase() === "CHOCH";
        const isBullish = String(event.direction || "").toUpperCase() === "BULLISH";
        this.addLine({
          price,
          lineWidth: isChoch ? 2 : 1,
          lineStyle: isChoch ? 1 : 2,
          axisLabelVisible: false,
          title: `${isChoch ? "CHoCH" : "BOS"} ${isBullish ? "▲" : "▼"}`,
          color: isChoch ? "#ffb020" : (isBullish ? "#20d67b" : "#ff5f6d"),
        });
      });

      const swingHigh = Number(structure.last_swing_high?.price);
      if (Number.isFinite(swingHigh)) {
        this.addLine({
          price: swingHigh,
          lineWidth: 1,
          lineStyle: 3,
          axisLabelVisible: false,
          title: "Swing High",
          color: "#7aa2ff",
        });
      }

      const swingLow = Number(structure.last_swing_low?.price);
      if (Number.isFinite(swingLow)) {
        this.addLine({
          price: swingLow,
          lineWidth: 1,
          lineStyle: 3,
          axisLabelVisible: false,
          title: "Swing Low",
          color: "#d68cff",
        });
      }
    }
  }

  window.FlowSignalSmcRenderer = new SmcRenderer();
})();
