const assert = require("assert");
const fs = require("fs");
const path = require("path");

const frontend = path.resolve(__dirname, "..");
const dashboard = fs.readFileSync(path.join(frontend, "script.js"), "utf8");
const html = fs.readFileSync(path.join(frontend, "app.html"), "utf8");

const amendmentStart = dashboard.indexOf("async function applyDraggedTradeLevelChange()");
const amendmentEnd = dashboard.indexOf("function beginTradeLevelDrag", amendmentStart);
const amendment = dashboard.slice(amendmentStart, amendmentEnd);

assert.ok(amendmentStart >= 0 && amendmentEnd > amendmentStart, "trade-level amendment handler exists");
assert.ok(
  amendment.includes('...newsModeAuthHeaders()'),
  "owner bearer credentials accompany chart SL/TP amendments",
);
assert.ok(
  html.includes('script.js?v=118'),
  "dashboard loads the authenticated amendment bundle with a fresh cache key",
);

console.log("trade level auth tests passed");
