const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const start = script.indexOf("function getVisibleSignal");
const end = script.indexOf("function tMarketText", start);
assert.ok(start > 0 && end > start, "visible-signal helper is extractable");

const context = {};
vm.runInNewContext(
  `${script.slice(start, end)}\nthis.getVisibleSignal = getVisibleSignal;`,
  context,
);

assert.equal(
  context.getVisibleSignal({
    strategy_decision: "SELL",
    display_signal: "BUY",
    execution_allowed: false,
    execution_block_reason: "ACTIVE_TRADE_ALREADY_RUNNING",
  }),
  "SELL",
  "a blocked execution must still render the fresh strategy decision",
);
assert.equal(
  context.getVisibleSignal({
    strategy_decision: "BUY",
    signal: "WAIT",
    execution_allowed: false,
  }),
  "BUY",
);
assert.equal(
  context.getVisibleSignal({
    strategy_decision: "WAIT",
    signal: "BUY",
  }),
  "WAIT",
  "a genuine strategy WAIT remains WAIT",
);
assert.ok(
  script.includes('executionBlockReason === "ACTIVE_TRADE_ALREADY_RUNNING"'),
  "active-trade execution blocks are recognized canonically",
);

console.log("signal/execution separation tests passed");
