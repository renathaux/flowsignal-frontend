const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const start = script.indexOf("function dashboardRuntimeActive");
const end = script.indexOf("function refreshAllNewsImpact", start);
assert.ok(start >= 0 && end > start, "polling visibility helpers are extractable");

class TestClassList {
  constructor(values = []) { this.values = new Set(values); }
  contains(value) { return this.values.has(value); }
}

const calls = [];
const document = { hidden: true, body: { dataset: {} } };
const mainApp = {
  classList: new TestClassList(),
  style: { display: "flex" },
};
const context = vm.createContext({
  document,
  mainApp,
  currentChartSymbol: "EURUSD",
  Promise,
  fetchFundamentalInsight(options) {
    calls.push(options);
    return Promise.resolve(options.symbol);
  },
});
vm.runInContext(script.slice(start, end), context);

(async () => {
  await context.pollFundamentalInsightIfActive();
  assert.equal(calls.length, 0, "hidden tabs do not poll fundamentals");

  document.hidden = false;
  await context.handleFundamentalVisibilityChange();
  assert.equal(calls[0].symbol, "EURUSD");
  assert.equal(calls[0].force, true);

  mainApp.classList = new TestClassList(["hidden"]);
  await context.pollFundamentalInsightIfActive();
  assert.equal(calls.length, 1, "inactive authenticated dashboard does not poll");

  mainApp.classList = new TestClassList();
  document.body.dataset.activeSettingsPage = "settings:risk";
  await context.pollFundamentalInsightIfActive();
  assert.equal(calls.length, 1, "attached settings pages do not poll the dashboard card");

  document.body.dataset.activeSettingsPage = "";
  context.currentChartSymbol = "XAUUSD";
  await context.pollFundamentalInsightIfActive();
  assert.equal(calls[1].symbol, "XAUUSD");
  assert.equal(calls[1].force, true);

  assert.ok(
    script.includes('document.addEventListener("visibilitychange", handleFundamentalVisibilityChange)'),
    "becoming visible triggers an immediate selected-symbol refresh",
  );
  assert.ok(
    script.includes('bypassBackendCache: true'),
    "manual refresh explicitly bypasses the backend cache",
  );
  assert.ok(
    script.includes('options.bypassBackendCache === true ? "&refresh=true" : ""'),
    "only explicit refresh requests ask the backend to revalidate",
  );

  console.log("fundamental polling visibility tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
