const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

class Element {
  constructor() { this.textContent = ""; this.dataset = {}; this.innerHTML = ""; }
  setAttribute(name, value) { this[name] = value; }
}

const ids = [
  "v2-shadow-card", "v2-shadow-symbol", "v2-shadow-status", "v2-shadow-v1-decision",
  "v2-shadow-v2-decision", "v2-shadow-reason", "v2-shadow-extension", "v2-shadow-retest",
  "v2-shadow-reset", "v2-shadow-open", "v2-shadow-v1-trades", "v2-shadow-v1-linked",
  "v2-shadow-v1-extended", "v2-shadow-v2-trades", "v2-shadow-v2-wl", "v2-shadow-v2-net",
  "v2-shadow-started", "v2-shadow-history-list", "v2-shadow-refresh",
];
const elements = Object.fromEntries(ids.map((id) => [id, new Element()]));
const pending = [];
const context = vm.createContext({
  document: {
    getElementById(id) { return elements[id] || null; },
  },
  fetch(url) {
    let resolve;
    const promise = new Promise((done) => { resolve = done; });
    pending.push({ url, resolve });
    return promise;
  },
  console: { warn() {} },
  Date, Number, String, Object, Array, Math, Set, Map, Promise, encodeURIComponent,
});
vm.runInContext(`
  const BASE_URL = "https://example.test";
  let currentChartSymbol = "EURUSD";
  let currentLang = "en";
  function normalizeFundamentalSymbol(value) { return String(value).toUpperCase(); }
`, context);
const start = script.indexOf("const v2ShadowState");
const end = script.indexOf('document.getElementById("v2-shadow-refresh")?.addEventListener');
assert.ok(start >= 0 && end > start);
vm.runInContext(script.slice(start, end), context);

const response = (data) => ({ ok: true, json: async () => data });
const data = (symbol, decision) => ({
  symbol, shadow_only: true, strategy_version: `${symbol}_V2`, started_at: "2026-08-13T12:00:00Z",
  current: { v1_decision: "TRADE", v2_decision: decision, v2_reason: "ENTRY_TOO_EXTENDED", extension_atr: 1.13 },
  v1: { trade_decisions: 1, linked_executions: 0, entries_over_075_atr: 1 },
  v2: { trades: 0, wins: 0, losses: 0, net_r: 0 }, recent_trades: [],
});

(async () => {
  const eur = context.fetchV2Shadow("EURUSD");
  vm.runInContext('currentChartSymbol = "XAUUSD"', context);
  const gold = context.fetchV2Shadow("XAUUSD");
  assert.match(pending[0].url, /symbol=EURUSD$/);
  assert.match(pending[1].url, /symbol=XAUUSD$/);
  pending[0].resolve(response(data("EURUSD", "WAIT_RETEST")));
  await eur;
  assert.notEqual(elements["v2-shadow-symbol"].textContent, "EURUSD", "late EUR response cannot overwrite XAU");
  pending[1].resolve(response(data("XAUUSD", "WAIT_EXTENDED")));
  await gold;
  assert.equal(elements["v2-shadow-symbol"].textContent, "XAUUSD");
  assert.equal(elements["v2-shadow-v2-decision"].textContent, "WAIT_EXTENDED");
  assert.equal(elements["v2-shadow-extension"].textContent, "1.13 ATR");
  assert.match(elements["v2-shadow-history-list"].innerHTML, /No forward shadow trades/);
  assert.match(html, /SHADOW — DOES NOT PLACE ORDERS/);
  console.log("V2 shadow card and symbol isolation tests passed");
})().catch((error) => { console.error(error); process.exitCode = 1; });
