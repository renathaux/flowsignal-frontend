const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.join(__dirname, "..", "indicators", "smc", "smc-local-visual.js"),
  "utf8",
);
const pending = [];
const applied = [];
const series = {
  setData() {},
  update() {},
  options() { return { priceFormat: { minMove: 0.01 } }; },
};
const context = {
  window: {
    addEventListener() {},
    setTimeout(callback) { pending.push(callback); },
    FlowSignalSmcLocalEngine: {
      analyze(rows) {
        applied.push(rows.map((row) => ({ ...row })));
        return { events: [], current_structure: null };
      },
    },
    FlowSignalSMC: {
      getState() { return { enabled: true }; },
      setContext() {},
      applyStructure() {},
    },
  },
  setInterval() { return 1; },
  clearInterval() {},
  candleSeries: series,
  currentChartSymbol: "XAUUSD",
  currentChartTimeframe: "15m",
  console,
};
vm.runInNewContext(source, context);

context.window.FlowSignalSmcLocalVisual.wrap();
series.setData(Array.from({ length: 15 }, (_, index) => ({
  time: 1_000 + index * 900,
  open: 4300 + index,
  high: 4301 + index,
  low: 4299 + index,
  close: 4300.5 + index,
})));
while (pending.length) pending.shift()();
assert.equal(applied.length, 1, "initial setData computes the overlay");

const formingTime = 1_000 + 14 * 900;
series.update({ time: formingTime, open: 4314, high: 4316, low: 4313, close: 4315 });
while (pending.length) pending.shift()();
assert.equal(applied.length, 1, "intrabar updates do not recompute SMC");

series.update({ time: formingTime + 900, open: 4315, high: 4315, low: 4315, close: 4315 });
while (pending.length) pending.shift()();
assert.equal(applied.length, 2, "a new candle recomputes SMC after the previous candle closes");
assert.equal(applied[1].length, 16, "the new forming candle is retained for analyze() to exclude");

series.update({ time: formingTime + 900, open: 4315, high: 4317, low: 4315, close: 4316 });
while (pending.length) pending.shift()();
assert.equal(applied.length, 2, "ticks within the new candle remain repaint-free");

console.log("SMC live closed-candle refresh checks passed");
