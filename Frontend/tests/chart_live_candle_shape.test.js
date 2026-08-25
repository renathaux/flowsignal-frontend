const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const start = source.indexOf("function preserveFormingCandleShape(");
const end = source.indexOf("\nfunction updateCard(", start);
assert.ok(start >= 0 && end > start, "forming-candle preservation helper exists");

const now = 1_800_000;
const context = {
  MARKET_IS_CLOSED: false,
  Date: { now: () => now * 1000 },
  Math,
  Number,
  Array,
  getTimeframeSeconds: () => 900,
};
vm.runInNewContext(source.slice(start, end), context);

const currentBucket = Math.floor(now / 900) * 900;
const priorBucket = currentBucket - 900;
const flatIncoming = [{
  time: currentBucket,
  open: 4660.94,
  high: 4660.94,
  low: 4660.94,
  close: 4660.94,
}];
const priorClosed = [{
  time: priorBucket,
  open: 4658,
  high: 4665,
  low: 4657,
  close: 4663.25,
}];

const seeded = context.preserveFormingCandleShape(flatIncoming, priorClosed, "15m");
assert.equal(seeded[0].open, 4663.25, "a flat live snapshot is seeded from the previous close");
assert.equal(seeded[0].high, 4663.25);
assert.equal(seeded[0].low, 4660.94);
assert.equal(seeded[0].close, 4660.94);

const priorForming = [{
  time: currentBucket,
  open: 4663.25,
  high: 4668.5,
  low: 4659.75,
  close: 4664,
}];
const merged = context.preserveFormingCandleShape(flatIncoming, priorForming, "15m");
assert.equal(merged[0].open, 4663.25, "refresh does not replace the forming candle open");
assert.equal(merged[0].high, 4668.5, "refresh preserves the forming candle high");
assert.equal(merged[0].low, 4659.75, "refresh preserves the forming candle low");
assert.equal(merged[0].close, 4660.94, "latest tick remains the close");

console.log("live candle shape checks passed");
