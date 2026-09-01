const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.join(__dirname, "..", "indicators", "smc", "smc-renderer.js"),
  "utf8",
);
const context = { window: {}, Date, Math, Number, String, Array };
vm.runInNewContext(source, context);

const displayedEvents = context.window.FlowSignalStructureEvents;
assert.ok(
  source.match(/render\(structure\).*this\.addCurrentStructure\(structure,settings\)/),
  "renderer draws TradingView's current structure high and low",
);
const events = [
  { event_type: "CHOCH", direction: "BULLISH", broken_level: 4600 },
  { event_type: "BOS", direction: "BULLISH", broken_level: 4610 },
  { event_type: "BOS", direction: "BULLISH", broken_level: 4620 },
  { event_type: "BOS", direction: "BULLISH", broken_level: 4630 },
  { event_type: "CHOCH", direction: "BEARISH", broken_level: 4615 },
  { event_type: "BOS", direction: "BEARISH", broken_level: 4605 },
  { event_type: "BOS", direction: "BEARISH", broken_level: 4595 },
];

const result = displayedEvents(events);
assert.deepEqual(
  JSON.parse(JSON.stringify(result)),
  events,
  "renderer preserves Pine's accepted BOS and CHoCH sequence",
);

const twelveEvents = Array.from({ length: 12 }, (_, index) => ({
  event_type: index % 3 === 0 ? "CHOCH" : "BOS",
  direction: index % 2 ? "BULLISH" : "BEARISH",
  broken_level: 4300 + index,
}));
assert.deepEqual(
  JSON.parse(JSON.stringify(displayedEvents(twelveEvents))),
  twelveEvents.slice(-10),
  "renderer matches Pine's default structHistoryNbr of ten",
);

console.log("SMC renderer TradingView parity checks passed");
