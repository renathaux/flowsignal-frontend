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
    html.includes('script.js?v=117'),
  "desktop chart and live-candle state default to 15m",
);

const startup = fs.readFileSync(path.join(frontend, "startup.js"), "utf8");
assert.ok(
  html.includes('startup.js?v=13') &&
    startup.includes('live-candle-controller.js?v=4'),
  "updated chart assets use fresh production cache keys",
);

const desktopCss = fs.readFileSync(path.join(frontend, "desktop.css"), "utf8");
assert.ok(
  html.includes('desktop.css?v=3') &&
    startup.includes('desktop.css?v=3') &&
    desktopCss.includes("body.desktop-chart-fullscreen-open .history-section") &&
    desktopCss.includes(".chart-section:fullscreen>.history-section") &&
    desktopCss.includes("body.fit-mode.desktop-chart-fullscreen-open .chart-panel .chart-section>.chart-box"),
  "desktop full-screen reserves the viewport for the chart and hides signal history",
);

const tabRole = fs.readFileSync(path.join(frontend, "tab-role-session.js"), "utf8");
assert.ok(
  startup.includes('tab-role-session.js?v=12') &&
    !tabRole.includes("new MutationObserver") &&
    !tabRole.includes("setInterval(() =>"),
  "desktop role layout runs on lifecycle events rather than global polling",
);

const signalDisplay = fs.readFileSync(
  path.join(frontend, "signal-display-state.js"),
  "utf8",
);
assert.ok(
  startup.includes('signal-display-state.js?v=4') &&
    signalDisplay.includes("if (signalEl.textContent !== label)") &&
    signalDisplay.includes("if (status && status.textContent !== value)") &&
    !signalDisplay.includes("new MutationObserver"),
  "signal display renders from data responses without rescanning the page on every mutation",
);

assert.ok(
  dashboard.includes("const CHART_DISPLAY_CANDLE_LIMIT = 300") &&
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

assert.ok(
  dashboard.includes("fullUiTranslationObserver.observe(document.body") &&
    !/fullUiTranslationObserver\.observe\(document\.body,[\s\S]{0,160}characterData\s*:\s*true/.test(dashboard),
  "live clocks and prices do not trigger the full-interface translator",
);

console.log("chart interaction performance checks passed");
