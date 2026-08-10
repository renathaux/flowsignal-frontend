const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const frontend = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(frontend, "index.html"), "utf8");
const script = fs.readFileSync(path.join(frontend, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(frontend, "style.css"), "utf8");
const phone = fs.readFileSync(path.join(frontend, "phone.css"), "utf8");

assert.ok(html.includes("FUNDAMENTAL INSIGHT"));
assert.ok(html.includes('id="fundamental-bias"'));
assert.ok(html.includes('id="fundamental-usd-strength"'));
assert.ok(html.includes('id="fundamental-eur-strength"'));
assert.ok(html.includes('id="fundamental-reasons-list"'));
assert.ok(html.includes('id="fundamental-event-content"'));
assert.ok(html.includes('id="fundamental-guidance-preference"'));
assert.ok(html.includes('id="fundamental-quality-note"'));

assert.ok(script.includes('/fundamentals/insight?symbol=EURUSD'));
assert.ok(script.includes("FUNDAMENTAL_INSIGHT_CACHE_MS = 5 * 60 * 1000"));
assert.ok(script.includes('overall.status || "").toUpperCase() !== "ACTIVE"'));
assert.ok(script.includes('card.dataset.bias = ["BUY", "SELL"].includes(direction)'));
assert.ok(script.includes('"NEUTRAL"'));
assert.ok(script.includes('"Insufficient fundamental data"'));
assert.ok(script.includes("No trusted high-impact event currently available."));
assert.ok(script.includes("Showing last successful result"));
assert.ok(script.includes("provisional_factor_count"));
assert.ok(script.includes("provider_failures_recent"));
assert.ok(script.includes("next_high_impact_event"));
assert.ok(script.includes("trading_guidance"));
assert.ok(script.includes("updateFundamentalEventCountdown"));

assert.ok(styles.includes('.fundamental-insight-card[data-bias="BUY"]'));
assert.ok(styles.includes('.fundamental-insight-card[data-bias="SELL"]'));
assert.ok(styles.includes(".fundamental-strength.is-positive"));
assert.ok(styles.includes(".fundamental-strength.is-negative"));
assert.ok(styles.includes(".fundamental-strength.is-neutral"));
assert.ok(phone.includes("Fundamental Insight remains available and readable on phones."));
assert.ok(phone.includes(".fundamental-detail-grid { grid-template-columns: 1fr; }"));

class TestClassList {
  constructor() { this.values = new Set(); }
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.values.has(name) : Boolean(force);
    if (enabled) this.values.add(name); else this.values.delete(name);
    return enabled;
  }
  contains(name) { return this.values.has(name); }
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
}

const ids = [
  "fundamental-insight-card", "fundamental-status-line", "fundamental-refresh-btn",
  "fundamental-bias", "fundamental-confidence", "fundamental-usd-strength",
  "fundamental-eur-strength", "fundamental-usd-label", "fundamental-eur-label",
  "fundamental-last-update", "fundamental-reasons-list", "fundamental-event-content",
  "fundamental-guidance-preference", "fundamental-guidance-message", "fundamental-quality-note",
];
const elements = Object.fromEntries(ids.map((id) => [id, new TestElement()]));
const usdStrength = new TestElement();
const eurStrength = new TestElement();
elements["fundamental-insight-card"].querySelector = (selector) => (
  selector.includes("usd") ? usdStrength : eurStrength
);

const documentStub = {
  getElementById(id) { return elements[id] || null; },
  createElement() { return new TestElement(); },
  querySelector() { return null; },
};
const helperStart = script.indexOf("function formatFundamentalNumber");
const helperEnd = script.indexOf("async function fetchFundamentalInsight");
assert.ok(helperStart >= 0 && helperEnd > helperStart, "fundamental renderer helpers are extractable");
const context = vm.createContext({ document: documentStub, Date, Number, String, Object, Array, Math, Set });
vm.runInContext(script.slice(helperStart, helperEnd), context);

function renderState(direction, status = "ACTIVE", event = null) {
  context.renderFundamentalInsight({
    generated_at: "2026-08-10T08:52:09Z",
    overall_bias: { direction, confidence: 71.58, status },
    currency_strength: {
      USD: { score: direction === "BUY" ? -20 : 17.81, factors: {}, missing_factors: [] },
      EUR: { score: direction === "BUY" ? 30 : -12.06, factors: {}, missing_factors: [] },
    },
    top_reasons: [{ currency: "USD", factor: "growth_score", direction: "BULLISH", summary: "Verified reason" }],
    next_high_impact_event: event,
    trading_guidance: { preference: direction === "BUY" ? "PREFER_BUY" : direction === "SELL" ? "PREFER_SELL" : "NEUTRAL" },
    data_quality: {},
  });
}

renderState("SELL");
assert.equal(elements["fundamental-bias"].textContent, "SELL");
assert.equal(elements["fundamental-guidance-preference"].textContent, "Prefer SELL setups");
assert.ok(usdStrength.classList.contains("is-positive"));
assert.ok(eurStrength.classList.contains("is-negative"));

renderState("BUY");
assert.equal(elements["fundamental-bias"].textContent, "BUY");
assert.equal(elements["fundamental-guidance-preference"].textContent, "Prefer BUY setups");
assert.ok(usdStrength.classList.contains("is-negative"));
assert.ok(eurStrength.classList.contains("is-positive"));

renderState("NEUTRAL");
assert.equal(elements["fundamental-bias"].textContent, "NEUTRAL");
assert.equal(elements["fundamental-guidance-preference"].textContent, "Neutral fundamental guidance");

renderState("SELL", "INSUFFICIENT_DATA");
assert.equal(elements["fundamental-bias"].textContent, "NEUTRAL");
assert.equal(elements["fundamental-confidence"].textContent, "Insufficient fundamental data");

renderState("SELL", "ACTIVE", null);
assert.equal(
  elements["fundamental-event-content"].children[0].textContent,
  "No trusted high-impact event currently available.",
);

context.renderFundamentalInsight({
  overall_bias: { direction: "SELL", confidence: 70, status: "ACTIVE" },
  currency_strength: {
    USD: { score: 10, factors: { employment_score: { status: "STALE" } }, missing_factors: ["employment_score"] },
    EUR: { score: -10, factors: {}, missing_factors: [] },
  },
  top_reasons: [],
  next_high_impact_event: null,
  trading_guidance: { preference: "PREFER_SELL" },
  data_quality: { provisional_factor_count: 2, provider_failures_recent: 1 },
});
assert.match(elements["fundamental-quality-note"].textContent, /USD employment stale/);
assert.match(elements["fundamental-quality-note"].textContent, /provisional evidence/);

console.log("fundamental insight card tests passed");
