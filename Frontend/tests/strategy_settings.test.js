const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

for (const field of [
  "minimum_rr", "maximum_rr", "risk_per_trade_percent", "tp1_percent_of_tp2",
  "protected_sl_percent_of_tp2", "bos_buffer_min_points",
  "minimum_sl_distance_points", "ema_filter_enabled", "ema_fast_period",
  "ema_slow_period", "consolidation_filter_enabled", "post_trade_cooldown_minutes",
]) {
  assert.match(html, new RegExp(`data-strategy-setting="${field}"`));
}
assert.match(html, /Strategy changes apply only to future evaluations/);
assert.match(html, /TP1 Distance Toward TP2 \(%\)/);
assert.match(html, /It does not control how much of the position is closed/);
assert.match(html, /Current production behavior is 50%/);
assert.match(html, /Wired: Minimum RR, Maximum RR, and Post Trade Cooldown only/);
assert.match(script, /\/strategy\/settings\/reset/);
assert.match(script, /function strategySettingsDirty/);
assert.match(script, /protectedSlPercentOfTp2: "50"/);
assert.match(script, /protectedSlPercentOfTp2: DEFAULT_RISK_PREFS\.protectedSlPercentOfTp2/);

class ClassList {
  toggle() {}
}
class Element {
  constructor(key = null, type = "number") {
    this.dataset = key ? { strategySetting: key } : {};
    this.type = type;
    this.value = "";
    this.checked = false;
    this.disabled = false;
    this.textContent = "";
    this.innerHTML = "";
    this.classList = new ClassList();
  }
}

const inputs = [
  new Element("minimum_rr"),
  new Element("maximum_rr"),
  new Element("ema_filter_enabled", "checkbox"),
];
const ranges = Object.fromEntries(inputs.map((input) => [input.dataset.strategySetting, new Element()]));
const saveButton = new Element();
const discardButton = new Element();
const restoreButton = new Element();
const status = new Element();
const summary = new Element();

const limits = {
  minimum_rr: { type: "number", min: 1, max: 5, step: 0.05, unit: "R" },
  maximum_rr: { type: "number", min: 1, max: 10, step: 0.05, unit: "R" },
  ema_filter_enabled: { type: "boolean" },
};
const initial = {
  minimum_rr: 1.2,
  maximum_rr: 2,
  ema_filter_enabled: true,
  risk_per_trade_percent: 1,
  ema_fast_period: 9,
  ema_slow_period: 21,
  consolidation_filter_enabled: true,
  post_trade_cooldown_minutes: 15,
};
let capturedRequest = null;

const context = vm.createContext({
  console,
  Date,
  Number,
  JSON,
  BASE_URL: "https://example.test",
  strategySettingsLoadState: status,
  strategySaveBtn: saveButton,
  strategyDiscardBtn: discardButton,
  strategyRestoreBtn: restoreButton,
  strategyConfigSummary: summary,
  strategyNewsModeSummary: new Element(),
  document: {
    querySelectorAll(selector) {
      if (selector === "[data-strategy-setting]") return inputs;
      return [];
    },
    querySelector(selector) {
      const match = selector.match(/data-strategy-limit="([^"]+)"/);
      return match ? ranges[match[1]] : null;
    },
  },
  window: { confirm: () => true },
  hasLocalFlowSignalAccess: () => true,
  loadNewsTradingMode() {},
  async authenticatedSettingsFetch(_url, options) {
    capturedRequest = options;
    const submitted = JSON.parse(options.body).settings;
    return {
      ok: true,
      json: async () => ({ current: submitted, limits, last_updated: "2026-08-11T15:00:00Z" }),
    };
  },
});

vm.runInContext(`
  let confirmedStrategySettings = null;
  let draftStrategySettings = null;
  let strategySettingsLimits = {};
  let strategySettingsSaveInProgress = false;
`, context);
const start = script.indexOf("function strategySettingInputs");
const end = script.indexOf("async function loadNewsTradingMode");
assert.ok(start >= 0 && end > start);
vm.runInContext(script.slice(start, end), context);

(async () => {
  context.applyConfirmedStrategySettings({ current: initial, limits, last_updated: null });
  assert.equal(saveButton.disabled, true, "fresh backend values are not dirty");
  assert.equal(inputs[0].min, 1);
  assert.equal(inputs[0].max, 5);

  inputs[0].value = "1.4";
  vm.runInContext(`
    draftStrategySettings.minimum_rr = readStrategySettingInput(document.querySelectorAll("[data-strategy-setting]")[0]);
    syncStrategySettingsActions();
  `, context);
  assert.equal(context.strategySettingsDirty(), true, "editing creates local unsaved state");
  assert.equal(saveButton.disabled, false, "save is enabled only for a dirty draft");

  await context.persistStrategySettings();
  assert.equal(JSON.parse(capturedRequest.body).settings.minimum_rr, 1.4);
  assert.equal(context.strategySettingsDirty(), false, "successful save confirms the backend value");
  assert.equal(saveButton.disabled, true);
  console.log("strategy settings frontend tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
