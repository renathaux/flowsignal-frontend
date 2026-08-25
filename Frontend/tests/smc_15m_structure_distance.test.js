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
assert.equal(result.accepted, false, "99 EURUSD points is internal structure");
assert.equal(eurusd.getLastAcceptedLevel(), 1.1, "a rejected event cannot move the reference");
assert.equal(eurusd.getDirection(), 2, "a rejected opposite break cannot flip trend");

result = eurusd.evaluate(1.10075, 1);
assert.equal(result.accepted, false, "another sub-threshold event remains internal");
assert.equal(eurusd.getLastAcceptedLevel(), 1.1, "multiple rejections keep the accepted reference");

result = eurusd.evaluate(1.101, 1);
assert.equal(result.accepted, true, "exactly 100 EURUSD points is accepted");
assert.equal(result.eventType, "CHOCH", "the later valid opposite break is still CHoCH");
assert.equal(eurusd.getDirection(), 1);

result = eurusd.evaluate(1.10201, 1);
assert.equal(result.accepted, true, "more than 100 points is accepted");
assert.equal(result.eventType, "BOS", "same-direction continuation remains BOS");

const gold = gate("15m", 0.01);
gold.evaluate(2500, 1);
assert.equal(gold.evaluate(2500.99, 2).accepted, false, "99 XAUUSD points is rejected using its tick size");
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
assert.match(source, /if \(acceptance\.accepted\) \{[\s\S]*?events\.push/);

console.log("15m SMC structural-distance checks passed");
