const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const style = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");

const strategyPanel = html.slice(
  html.indexOf('<section id="strategySettingsPanel"'),
  html.indexOf('<div id="newsModeConfirmModal"')
);

const editableFields = [
  "minimum_rr", "maximum_rr", "bos_buffer_points",
  "minimum_sl_distance_points", "consolidation_filter_enabled",
  "post_trade_cooldown_minutes",
];
for (const field of editableFields) {
  assert.match(html, new RegExp(`data-strategy-setting="${field}"`));
  assert.match(html, new RegExp(`data-strategy-reset="${field}"`));
}
for (const fixedField of [
  "m15_close_required", "m5_confirmation_required", "fresh_bos_after_consolidation",
  "ema_filter_enabled", "ema_fast_period", "ema_slow_period",
]) assert.doesNotMatch(strategyPanel, new RegExp(`data-strategy-setting="${fixedField}"`));
for (const duplicatedRiskField of [
  "risk_per_trade_percent", "tp1_percent_of_tp2", "protected_sl_percent_of_tp2",
  "max_open_trades",
]) {
  assert.doesNotMatch(strategyPanel, new RegExp(`data-strategy-setting="${duplicatedRiskField}"`));
}
assert.match(html, /Strategy changes apply to future evaluations only/);
assert.match(strategyPanel, /Six wired settings/);
assert.match(strategyPanel, /data-open-risk-management/);
assert.match(strategyPanel, /Open Risk Management/);
assert.match(strategyPanel, /Fixed Strategy Rules/);
assert.match(strategyPanel, /EMA Trend Filter/);
assert.match(strategyPanel, /10% ATR14/);
assert.match(strategyPanel, /data-strategy-pane="history"/);
assert.match(strategyPanel, /strategyHistoryList/);
assert.match(strategyPanel, /the strategy uses the greater of this value or its ATR-based buffer/);
assert.match(strategyPanel, /does not choose the swing/);
assert.match(script, /data-open-risk-management/);
assert.match(script, /openSettingsPage\("risk"\)/);
assert.match(script, /\/strategy\/settings\/history\?limit=50/);
assert.match(script, /function strategySettingsDirty/);
assert.match(script, /function resetStrategySettingDraft/);
assert.match(script, /function renderStrategyUnsavedSummary/);
assert.match(script, /protectedSlPercentOfTp2: "50"/);
assert.match(script, /protectedSlPercentOfTp2: DEFAULT_RISK_PREFS\.protectedSlPercentOfTp2/);
assert.match(style, /@media \(max-width: 800px\)[\s\S]*body\[data-active-settings-page="settings:strategy"\] #settingsModal \.settings-modal-box/);
assert.match(style, /body\[data-active-settings-page="settings:strategy"\] \.settings-modal-header[\s\S]*min-height: 58px/);
assert.match(style, /\.strategy-settings-grid \{ grid-template-columns: 1fr; \}/);
assert.match(style, /\.strategy-risk-link-card button \{[\s\S]*width: 100%/);

class ClassList {
  toggle() {}
  add() {}
  remove() {}
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
  new Element("bos_buffer_points"),
  new Element("minimum_sl_distance_points"),
  new Element("consolidation_filter_enabled", "checkbox"),
  new Element("post_trade_cooldown_minutes"),
];
const ranges = Object.fromEntries(inputs.map((input) => [input.dataset.strategySetting, new Element()]));
const metas = Object.fromEntries(inputs.map((input) => {
  const meta = new Element();
  meta.dataset.strategyValueMeta = input.dataset.strategySetting;
  return [input.dataset.strategySetting, meta];
}));
const saveButton = new Element();
const discardButton = new Element();
const restoreButton = new Element();
const status = new Element();
const summary = new Element();
const unsavedSummary = new Element();

const limits = {
  minimum_rr: { type: "number", min: 1, max: 5, step: 0.05, unit: "R" },
  maximum_rr: { type: "number", min: 1, max: 10, step: 0.05, unit: "R" },
  bos_buffer_points: { type: "integer", min: 0, max: 500, step: 1, unit: "points" },
  minimum_sl_distance_points: { type: "integer", min: 1, max: 2000, step: 1, unit: "points" },
  consolidation_filter_enabled: { type: "boolean" },
  post_trade_cooldown_minutes: { type: "integer", min: 0, max: 1440, step: 1, unit: "minutes" },
};
const initial = {
  minimum_rr: 1.2,
  maximum_rr: 2,
  ema_filter_enabled: true,
  risk_per_trade_percent: 1,
  ema_fast_period: 9,
  ema_slow_period: 21,
  consolidation_filter_enabled: true,
  bos_buffer_points: 10,
  minimum_sl_distance_points: 100,
  m15_close_required: true,
  m5_confirmation_required: true,
  fresh_bos_after_consolidation: true,
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
  strategyUnsavedSummary: unsavedSummary,
  strategyHistoryState: new Element(),
  strategyHistoryList: new Element(),
  strategyNewsModeSummary: new Element(),
  currentLang: "en",
  translateDynamicUiText: (value) => value,
  document: {
    querySelectorAll(selector) {
      if (selector === "[data-strategy-setting]") return inputs;
      if (selector === "[data-strategy-value-meta]") return Object.values(metas);
      if (selector === "[data-fixed-rule]") return [];
      if (selector === "[data-strategy-reset]") return [];
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
      json: async () => ({ current: submitted, defaults: initial, limits, fixed_rules: {}, last_updated: "2026-08-11T15:00:00Z" }),
    };
  },
});

vm.runInContext(`
  let confirmedStrategySettings = null;
  let draftStrategySettings = null;
  let strategySettingsLimits = {};
  let strategySettingsDefaults = {};
  let strategyFixedRules = {};
  let strategyHistoryItems = [];
  let strategySettingsSaveInProgress = false;
`, context);
const start = script.indexOf("function strategySettingInputs");
const end = script.indexOf("async function loadNewsTradingMode");
assert.ok(start >= 0 && end > start);
vm.runInContext(script.slice(start, end), context);

(async () => {
  context.applyConfirmedStrategySettings({ current: initial, defaults: initial, limits, fixed_rules: {}, last_updated: null });
  assert.equal(saveButton.disabled, true, "fresh backend values are not dirty");
  assert.equal(inputs[0].min, 1);
  assert.equal(inputs[0].max, 5);

  inputs[0].value = "1.4";
  vm.runInContext(`
    draftStrategySettings.minimum_rr = readStrategySettingInput(document.querySelectorAll("[data-strategy-setting]")[0]);
    syncStrategySettingsPresentation();
  `, context);
  assert.equal(context.strategySettingsDirty(), true, "editing creates local unsaved state");
  assert.equal(saveButton.disabled, false, "save is enabled only for a dirty draft");
  assert.match(unsavedSummary.innerHTML, /1 unsaved change/);
  assert.match(unsavedSummary.innerHTML, /1\.20 → 1\.40/);

  assert.equal(context.resetStrategySettingDraft("minimum_rr"), true);
  assert.equal(inputs[0].value, 1.2, "individual reset changes only the local draft");
  assert.equal(context.strategySettingsDirty(), false, "reset to saved default can clear the draft");
  inputs[0].value = "1.4";
  vm.runInContext(`
    draftStrategySettings.minimum_rr = readStrategySettingInput(document.querySelectorAll("[data-strategy-setting]")[0]);
    syncStrategySettingsPresentation();
  `, context);

  await context.persistStrategySettings();
  assert.equal(JSON.parse(capturedRequest.body).settings.minimum_rr, 1.4);
  assert.deepEqual(
    Object.keys(JSON.parse(capturedRequest.body).settings).sort(),
    editableFields.slice().sort(),
    "fixed rules are never submitted",
  );
  assert.equal(context.strategySettingsDirty(), false, "successful save confirms the backend value");
  assert.equal(saveButton.disabled, true);

  capturedRequest = null;
  assert.equal(context.resetStrategySettingDraft("minimum_rr"), true);
  assert.equal(inputs[0].value, 1.2);
  assert.equal(context.strategySettingsDirty(), true, "reset changes the local draft when saved value differs");
  assert.equal(capturedRequest, null, "individual reset does not write before Save");
  context.renderStrategySettings(JSON.parse(JSON.stringify({ ...initial, minimum_rr: 1.4 })), limits);
  assert.equal(inputs[0].value, 1.4, "discard restores the saved value");
  context.resetStrategySettingDraft("minimum_rr");
  await context.persistStrategySettings();
  assert.equal(JSON.parse(capturedRequest.body).settings.minimum_rr, 1.2, "reset is persisted only after Save");
  vm.runInContext(`
    strategyHistoryItems = [{
      setting_name: "minimum_rr",
      previous_value: 1.2,
      new_value: 1.4,
      changed_at: "2026-08-11T18:30:00Z",
    }];
    renderStrategySettingsHistory();
  `, context);
  assert.match(context.strategyHistoryList.innerHTML, /Minimum RR/);
  assert.match(context.strategyHistoryList.innerHTML, /1\.20 → 1\.40/);
  console.log("strategy settings frontend tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
