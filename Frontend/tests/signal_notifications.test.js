const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = script.indexOf("function normalizeSignalAlert");
const end = script.indexOf("function showSignalAlertMessage", start);
assert.ok(start > 0 && end > start, "signal normalization is extractable");

const context = {};
vm.runInNewContext(`${script.slice(start, end)}\nthis.normalizeSignalAlert = normalizeSignalAlert;`, context);

assert.equal(context.normalizeSignalAlert("BUY"), "BUY");
assert.equal(context.normalizeSignalAlert("BUY RUNNING"), "BUY");
assert.equal(context.normalizeSignalAlert("SELL RUNNING"), "SELL");
assert.equal(context.normalizeSignalAlert("WAIT", { signal: "BUY" }), "BUY");
assert.equal(context.normalizeSignalAlert("WAIT"), "WAIT");

assert.ok(html.includes('id="generalSignalAlertsToggle"'), "General Settings includes the notification switch");
assert.ok(script.includes("const alertsOn = signalAlertsEnabled();"), "delivery uses the persisted setting as source of truth");
assert.ok(script.includes("showSignalAlertMessage(symbol, signal);"), "every enabled alert has an in-app fallback");
assert.ok(script.includes("generalSignalAlertsToggle?.addEventListener"), "General Settings switch is wired");

console.log("signal notification tests passed");
