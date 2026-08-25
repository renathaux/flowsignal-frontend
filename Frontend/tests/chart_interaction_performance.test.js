const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const frontend = path.join(__dirname, "..");
const dashboard = fs.readFileSync(path.join(frontend, "script.js"), "utf8");
const html = fs.readFileSync(path.join(frontend, "app.html"), "utf8");
const liveCandles = fs.readFileSync(
  path.join(frontend, "chart", "live-candles", "live-candle-controller.js"),
  "utf8",
);

assert.ok(
  dashboard.includes('let currentChartTimeframe = "15m"') &&
    liveCandles.includes('timeframe: "15m"') &&
    html.includes('id="chartOverlayTitle">EURUSD · 15m') &&
    html.includes('script.js?v=115'),
  "desktop chart and live-candle state default to 15m",
);

const startup = fs.readFileSync(path.join(frontend, "startup.js"), "utf8");
assert.ok(
  html.includes('startup.js?v=9') &&
    startup.includes('live-candle-controller.js?v=4'),
  "updated chart assets use fresh production cache keys",
);

const tabRole = fs.readFileSync(path.join(frontend, "tab-role-session.js"), "utf8");
assert.ok(
  startup.includes('tab-role-session.js?v=11') &&
    tabRole.includes(".observe(dashboard, { childList: true, subtree: true })") &&
    !tabRole.includes("attributeFilter: ['class', 'style', 'hidden', 'aria-hidden']"),
  "desktop layout observer does not retrigger itself from its own style writes",
);

const signalDisplay = fs.readFileSync(
  path.join(frontend, "signal-display-state.js"),
  "utf8",
);
assert.ok(
  startup.includes('signal-display-state.js?v=3') &&
    signalDisplay.includes("if (signalEl.textContent !== label)") &&
    signalDisplay.includes("if (status && status.textContent !== value)"),
  "signal display observer writes are idempotent and cannot self-trigger continuously",
);

assert.ok(
  dashboard.includes("const CHART_DISPLAY_CANDLE_LIMIT = 750") &&
    dashboard.includes("cleaned.slice(-CHART_DISPLAY_CANDLE_LIMIT)") &&
    !dashboard.includes("cleaned.slice(-5000)"),
  "the 5,000-row 15m payload is capped before chart and SMC rendering",
);

assert.ok(
  dashboard.includes("if (tradeLevelRepositionFrame === null)") &&
    dashboard.includes('if (!layer?.querySelector(".trade-level-drag-line")) return') &&
    dashboard.includes("window.clearTimeout(tradeLevelRepositionTrailingTimer)") &&
    !dashboard.includes('container.addEventListener("wheel", scheduleTradeLevelReposition') &&
    !dashboard.includes("window.setTimeout(repositionTradeLevelDragLines, 40)") &&
    !dashboard.includes("window.setTimeout(repositionTradeLevelDragLines, 120)"),
  "pan and zoom redraw work is coalesced instead of queued per range event",
);

assert.ok(
  dashboard.includes("if (!window.__flowSignalChartResizeBound)") &&
    liveCandles.includes("pollMs: 500") &&
    liveCandles.includes("Math.max(500, Number(pollMs))"),
  "chart recreation does not multiply resize listeners and live polling is bounded",
);

console.log("chart interaction performance checks passed");
