const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

class TestClassList {
  constructor() { this.values = new Set(); }
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.values.has(name) : Boolean(force);
    if (enabled) this.values.add(name); else this.values.delete(name);
    return enabled;
  }
}

class TestElement {
  constructor() {
    this.children = [];
    this.dataset = {};
    this.classList = new TestClassList();
    this.textContent = "";
    this.disabled = false;
  }
  append(...children) { this.children.push(...children); }
  appendChild(child) { this.children.push(child); return child; }
  replaceChildren(...children) { this.children = [...children]; }
  setAttribute() {}
  querySelector(selector) { return selector.includes("usd") ? this.usdStrength : this.secondaryStrength; }
}

const ids = [
  "fundamental-insight-card", "fundamental-status-line", "fundamental-refresh-btn",
  "fundamental-symbol", "fundamental-primary-label", "fundamental-primary-mark",
  "fundamental-secondary-label", "fundamental-secondary-mark", "fundamental-bias",
  "fundamental-confidence", "fundamental-usd-strength", "fundamental-eur-strength",
  "fundamental-usd-label", "fundamental-eur-label", "fundamental-last-update",
  "fundamental-reasons-list", "fundamental-event-content", "fundamental-guidance-preference",
  "fundamental-guidance-message", "fundamental-quality-note",
];
const elements = Object.fromEntries(ids.map((id) => [id, new TestElement()]));
elements["fundamental-insight-card"].usdStrength = new TestElement();
elements["fundamental-insight-card"].secondaryStrength = new TestElement();

const pending = [];
const context = vm.createContext({
  document: {
    getElementById(id) { return elements[id] || null; },
    createElement() { return new TestElement(); },
    querySelector() { return null; },
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
  const FUNDAMENTAL_INSIGHT_SYMBOLS = new Set(["EURUSD", "XAUUSD"]);
  const fundamentalInsightStates = new Map();
  let fundamentalInsightRenderRequest = 0;
  const FUNDAMENTAL_INSIGHT_CACHE_MS = 5 * 60 * 1000;
  const FUNDAMENTAL_INSIGHT_FAILURE_BACKOFF_MS = 2 * 60 * 1000;
  let currentChartSymbol = "EURUSD";
`, context);
const helperStart = script.indexOf("function formatFundamentalNumber");
const helperEnd = script.indexOf('document.getElementById("fundamental-refresh-btn")?.addEventListener');
assert.ok(helperStart >= 0 && helperEnd > helperStart);
vm.runInContext(script.slice(helperStart, helperEnd), context);

function response(data) {
  return { ok: true, json: async () => data };
}

function eurusdData(direction = "SELL") {
  return {
    symbol: "EURUSD",
    generated_at: "2026-08-10T10:00:00Z",
    overall_bias: { direction, confidence: 71.58, status: "ACTIVE" },
    currency_strength: {
      USD: { score: 17.81, factors: {}, missing_factors: [] },
      EUR: { score: -12.06, factors: {}, missing_factors: [] },
    },
    top_reasons: [], next_high_impact_event: null,
    trading_guidance: { preference: "PREFER_SELL" }, data_quality: {},
  };
}

function xauusdData() {
  return {
    symbol: "XAUUSD",
    generated_at: "2026-08-10T10:00:00Z",
    overall_bias: { direction: "NEUTRAL", confidence: 69.93, status: "ACTIVE" },
    usd_macro_score: 17.16, gold_support_score: -9.89,
    drivers: { risk_sentiment: { status: "INSUFFICIENT_DATA" } },
    top_reasons: [], next_high_impact_event: null,
    trading_guidance: { preference: "NEUTRAL" }, data_quality: { missing_factors: ["risk_sentiment"] },
  };
}

(async () => {
  const eurRequest = context.fetchFundamentalInsight({ symbol: "EURUSD", force: true, symbolSwitch: true });
  vm.runInContext('currentChartSymbol = "XAUUSD"', context);
  const goldRequest = context.fetchFundamentalInsight({ symbol: "XAUUSD", force: true, symbolSwitch: true });

  assert.match(pending[0].url, /symbol=EURUSD$/);
  assert.match(pending[1].url, /symbol=XAUUSD$/);
  assert.equal(elements["fundamental-symbol"].textContent, "XAUUSD");
  assert.equal(elements["fundamental-usd-strength"].textContent, "--", "symbol switch clears previous values");

  pending[0].resolve(response(eurusdData()));
  await eurRequest;
  assert.equal(elements["fundamental-symbol"].textContent, "XAUUSD", "late EURUSD response cannot relabel XAUUSD");
  assert.equal(elements["fundamental-usd-strength"].textContent, "--", "late EURUSD response cannot render into XAUUSD");

  pending[1].resolve(response(xauusdData()));
  await goldRequest;
  assert.equal(elements["fundamental-symbol"].textContent, "XAUUSD");
  assert.equal(elements["fundamental-primary-label"].textContent, "USD MACRO");
  assert.equal(elements["fundamental-secondary-label"].textContent, "GOLD SUPPORT");
  assert.equal(elements["fundamental-eur-strength"].textContent, "-9.89");

  vm.runInContext('currentChartSymbol = "EURUSD"', context);
  const finalEurRequest = context.fetchFundamentalInsight({ symbol: "EURUSD", force: true, symbolSwitch: true });
  pending[2].resolve(response(eurusdData("BUY")));
  await finalEurRequest;
  assert.equal(elements["fundamental-symbol"].textContent, "EURUSD");
  assert.equal(elements["fundamental-primary-label"].textContent, "USD STRENGTH");
  assert.equal(elements["fundamental-secondary-label"].textContent, "EUR STRENGTH");
  assert.equal(elements["fundamental-bias"].textContent, "BUY");

  console.log("fundamental symbol sync race tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
