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

const compact = context.window.FlowSignalCompactSmcEvents;
assert.ok(
  !source.match(/render\(structure\).*this\.addCurrentStructure\(structure,settings\)/),
  "renderer does not draw the long current-structure high/low projection bars",
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

const result = compact(events);
assert.deepEqual(
  JSON.parse(JSON.stringify(result)),
  [events[0], events[3], events[4], events[6]],
  "renderer keeps CHoCH boundaries and only the latest BOS in each continuation leg",
);

console.log("SMC renderer event compaction checks passed");
