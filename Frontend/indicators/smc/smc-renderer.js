/*
 * FlowSignal SMC renderer.
 * Structure/Fibonacci presentation adapted from "SMC Structures and FVG"
 * © LudoGH68, MPL-2.0. FVG intentionally excluded.
 */
(function () {
  "use strict";

  const FIB_COLORS = {
    "0.786": "#64b5f6",
    "0.705": "#f23645",
    "0.618": "#089981",
    "0.5": "#4caf50",
    "0.382": "#81c784",
  };

  function epoch(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value > 10_000_000_000 ? Math.floor(value / 1000) : Math.floor(value);
    }
    const parsed = Date.parse(String(value || ""));
    return Number.isFinite(parsed) ? Math.floor(parsed / 1000) : null;
  }

  function safeRemoveSeries(chart, series) {
    try { if (chart && series && typeof chart.removeSeries === "function") chart.removeSeries(series); } catch (_) {}
  }

  function midTime(start, end) {
    return Math.max(start, Math.floor(start + (end - start) / 2));
  }

  class SmcRenderer {
    constructor() {
      this.chart = null;
      this.candleSeries = null;
      this.series = [];
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
      this.series.forEach((item) => safeRemoveSeries(this.chart, item));
      this.series = [];
    }

    addHorizontal({ start, end, price, color, width = 1, label = null, labelPosition = "aboveBar", dashed = false }) {
      if (!this.chart || typeof this.chart.addLineSeries !== "function") return;
      if (![start, end, price].every(Number.isFinite)) return;
      const finalEnd = end <= start ? start + 1 : end;
      const middle = midTime(start, finalEnd);
      const line = this.chart.addLineSeries({
        color,
        lineWidth: width,
        lineStyle: dashed ? 2 : 0,
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: false,
        autoscaleInfoProvider: () => null,
      });
      line.setData([
        { time: start, value: price },
        { time: middle, value: price },
        { time: finalEnd, value: price },
      ]);
      if (label && typeof line.setMarkers === "function") {
        line.setMarkers([{
          time: middle,
          position: labelPosition,
          shape: "circle",
          color,
          text: label,
          size: 0.1,
        }]);
      }
      this.series.push(line);
    }

    addBreak(event) {
      const price = Number(event?.broken_level);
      const start = epoch(event?.broken_swing_timestamp);
      const end = epoch(event?.timestamp);
      if (![price, start, end].every(Number.isFinite)) return;
      const isChoch = String(event?.event_type || "").toUpperCase() === "CHOCH";
      const isBullish = String(event?.direction || "").toUpperCase() === "BULLISH";
      const color = isChoch ? "#f0c419" : "#c7cbd1";
      this.addHorizontal({
        start,
        end,
        price,
        color,
        width: 1,
        label: isChoch ? "CHoCH" : "BOS",
        labelPosition: isBullish ? "aboveBar" : "belowBar",
      });
    }

    addCurrentStructure(structure) {
      const current = structure?.current_structure;
      if (!current) return;
      const end = epoch(current.end_timestamp);
      const highStart = epoch(current.high_start_timestamp);
      const lowStart = epoch(current.low_start_timestamp);
      const high = Number(current.high);
      const low = Number(current.low);
      const color = "#2962ff";
      if ([highStart, end, high].every(Number.isFinite)) {
        this.addHorizontal({ start: highStart, end, price: high, color, width: 1, label: "Structure High", labelPosition: "aboveBar" });
      }
      if ([lowStart, end, low].every(Number.isFinite)) {
        this.addHorizontal({ start: lowStart, end, price: low, color, width: 1, label: "Structure Low", labelPosition: "belowBar" });
      }
    }

    addFibs(structure) {
      const end = epoch(structure?.current_structure?.end_timestamp);
      const levels = Array.isArray(structure?.fib_levels) ? structure.fib_levels : [];
      if (!Number.isFinite(end)) return;
      levels.forEach((level) => {
        const value = Number(level?.value);
        const price = Number(level?.price);
        const start = epoch(level?.start_timestamp);
        if (![value, price, start].every(Number.isFinite)) return;
        const key = String(value);
        const color = FIB_COLORS[key] || "#8ea0b8";
        this.addHorizontal({
          start,
          end,
          price,
          color,
          width: 1,
          label: key,
          labelPosition: "aboveBar",
        });
      });
    }

    render(structure) {
      this.clear();
      if (!this.enabled || !this.chart || !this.candleSeries || !structure) return;
      const events = Array.isArray(structure.events) ? structure.events : [];
      events.slice(-10).forEach((event) => this.addBreak(event));
      this.addCurrentStructure(structure);
      this.addFibs(structure);
    }
  }

  window.FlowSignalSmcRenderer = new SmcRenderer();
})();
