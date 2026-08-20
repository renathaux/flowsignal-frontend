const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'binary/binary-app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'binary/binary.css'), 'utf8');

assert.match(css, /body\[data-trading-mode="binary"\] #flowsignalTradingModeSelector\{display:none!important\}/, 'mobile hides the duplicate top Forex/Binary selector');
assert.match(css, /body\[data-trading-mode="binary"\] #flowsignalForexMode\{display:none!important;visibility:hidden!important;pointer-events:none!important\}/, 'Binary and Forex mobile surfaces cannot overlay');
assert.match(css, /#binaryAccountCard\{grid-column:1\/-1;grid-row:1/, 'mobile starts with the Deriv account card');
assert.match(css, /\.binary-contract-card\{grid-column:1\/-1;grid-row:3/, 'live contract follows the account controls');
assert.match(css, /\.binary-mobile-stats-card\{grid-column:1\/-1;grid-row:4;display:block/, 'today stats are visible on mobile');
assert.match(app, /id="binaryTodayTrades"/, 'today trade totals are rendered');
assert.match(app, /todayItems\.reduce/, 'today profit is calculated from real contract history');
assert.match(app, /id="binaryLifeBar"/, 'live contract includes the entry/current-price position bar');
assert.match(app, /--binary-current-position/, 'life bar position is driven by the broker price snapshot');

console.log('Binary mobile layout checks passed');
