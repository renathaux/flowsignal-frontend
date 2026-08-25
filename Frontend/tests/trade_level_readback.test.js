const assert = require("assert");
const fs = require("fs");
const path = require("path");

const dashboard = fs.readFileSync(path.resolve(__dirname, "..", "script.js"), "utf8");
const start = dashboard.indexOf("function tradeLevelMatchesBrokerReadback(");
const end = dashboard.indexOf("async function verifyTradeLevelBrokerReadback", start);
const source = dashboard.slice(start, end);

assert.ok(start >= 0 && end > start, "broker readback matcher exists");

const matcher = new Function(
  "getTradeLevelPriceStep",
  `${source}; return tradeLevelMatchesBrokerReadback;`,
)(symbol => symbol === "XAUUSD" ? 0.01 : 0.00001);

assert.equal(
  matcher({ current_sl: 4590.55 }, "sl", 4590.55, "XAUUSD"),
  true,
  "XAUUSD broker SL readback confirms the requested price",
);
assert.equal(
  matcher({ user_modified_levels: { tp1: 4717.82 } }, "tp1", 4717.82, "XAUUSD"),
  true,
  "application-managed TP1 readback confirms the saved target",
);
assert.equal(
  matcher({ take_profit: 4734.15 }, "tp2", 4734.15, "XAUUSD"),
  true,
  "broker TP readback confirms the requested price",
);
assert.equal(
  matcher({ current_sl: 4590.55 }, "sl", 4590.57, "XAUUSD"),
  false,
  "a different broker price is not reported as confirmed",
);

console.log("trade level readback tests passed");
