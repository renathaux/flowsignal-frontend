const assert = require("assert");
const fs = require("fs");
const path = require("path");

const frontend = path.resolve(__dirname, "..");
const dashboard = fs.readFileSync(path.join(frontend, "script.js"), "utf8");
const html = fs.readFileSync(path.join(frontend, "app.html"), "utf8");

const start = dashboard.indexOf("function addTradeVisualLine(");
const end = dashboard.indexOf("function getTradeLevelPriceStep", start);
const renderer = dashboard.slice(start, end);

assert.ok(start >= 0 && end > start, "desktop trade-level renderer exists");
assert.ok(
  renderer.includes("candleSeries.createPriceLine({"),
  "SL, TP1, and broker TP are rendered as real chart price lines",
);
assert.ok(renderer.includes("axisLabelVisible: true"), "trade prices remain visible on the price axis");
assert.ok(html.includes('script.js?v=119'), "new trade-level renderer bypasses stale cache");

console.log("trade level price-line tests passed");
