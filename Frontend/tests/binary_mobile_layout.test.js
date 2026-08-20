const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'binary/binary-app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'binary/binary.css'), 'utf8');
const mobile = fs.readFileSync(path.join(root, 'mobile.html'), 'utf8');
const mobileNav = fs.readFileSync(path.join(root, 'mobileNav.js'), 'utf8');

assert.match(css, /body\[data-trading-mode="binary"\] #flowsignalTradingModeSelector\{display:none!important\}/, 'mobile hides the duplicate top Forex/Binary selector');
assert.match(css, /body\[data-trading-mode="binary"\] #flowsignalForexMode\{display:none!important;visibility:hidden!important;pointer-events:none!important\}/, 'Binary and Forex mobile surfaces cannot overlay');
assert.match(css, /#binaryAccountCard\{grid-column:1\/-1;grid-row:1/, 'mobile starts with the Deriv account card');
assert.match(css, /\.binary-contract-card\{grid-column:1\/-1;grid-row:3/, 'live contract follows the account controls');
assert.match(css, /\.binary-mobile-stats-card\{grid-column:1\/-1;grid-row:4;display:block/, 'today stats are visible on mobile');
assert.match(app, /id="binaryTodayTrades"/, 'today trade totals are rendered');
assert.match(app, /todayItems\.reduce/, 'today profit is calculated from real contract history');
assert.match(app, /id="binaryLifeBar"/, 'live contract includes the entry/current-price position bar');
assert.match(app, /--binary-current-position/, 'life bar position is driven by the broker price snapshot');
assert.match(mobile, /data-nav="mode"[^>]*aria-label="Switch Forex or Binary mode"/, 'mobile bottom navigation exposes the Fx/Bi switch');
assert.match(mobile, /<span>Fx\/Bi<\/span>/, 'mobile switch uses the requested Fx/Bi label');
assert.match(mobileNav, /window\.FlowSignalBinary\?\.setMode/, 'bottom switch changes the real trading mode');

console.log('Binary mobile layout checks passed');
