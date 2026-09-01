const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.join(__dirname, "..", "indicators", "smc", "smc-local-engine.js"),
  "utf8",
);
const context = { window: {} };
vm.runInNewContext(source, context);

const { createStructureAcceptance } = context.window.FlowSignalSmcLocalEngine;

function gate(timeframe, pointSize) {
  return createStructureAcceptance({ timeframe, pointSize });
}

const eurusd = gate("15m", 0.00001);
let result = eurusd.evaluate(1.1, 2);
assert.equal(result.accepted, true, "the first structural event establishes the reference");
assert.equal(result.eventType, "CHOCH");

result = eurusd.evaluate(1.10099, 1);
assert.equal(result.accepted, true, "99 EURUSD points remains visible structure");
assert.equal(eurusd.getLastAcceptedLevel(), 1.10099, "the indicator follows the latest swing");
assert.equal(eurusd.getDirection(), 1, "the indicator is no longer execution-filtered");

result = eurusd.evaluate(1.10075, 1);
assert.equal(result.accepted, true, "another sub-100-point event remains visible");
assert.equal(eurusd.getLastAcceptedLevel(), 1.10075);

result = eurusd.evaluate(1.101, 1);
assert.equal(result.accepted, true, "exactly 100 EURUSD points is accepted");
assert.equal(result.eventType, "BOS", "classification follows the visible structure state");
assert.equal(eurusd.getDirection(), 1);

result = eurusd.evaluate(1.10201, 1);
assert.equal(result.accepted, true, "more than 100 points is accepted");
assert.equal(result.eventType, "BOS", "same-direction continuation remains BOS");

const gold = gate("15m", 0.01);
gold.evaluate(2500, 1);
assert.equal(gold.evaluate(2500.99, 2).accepted, true, "99 XAUUSD points remains visible");
assert.equal(gold.evaluate(2501, 2).accepted, true, "100 XAUUSD points is accepted using its tick size");

for (const timeframe of ["5m", "30m", "1h", "4h"]) {
  const unchanged = gate(timeframe, 0.00001);
  unchanged.evaluate(1.2, 2);
  assert.equal(
    unchanged.evaluate(1.20001, 1).accepted,
    true,
    `${timeframe} preserves the prior no-minimum-distance behavior`,
  );
}

assert.match(source, /structureAcceptance\.evaluate\(structureLow, 1\)/);
assert.match(source, /structureAcceptance\.evaluate\(structureHigh, 2\)/);
assert.match(source, /const accepted = Number\.isFinite\(level\)/);

console.log("15m SMC structural-distance checks passed");
