const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const binary = fs.readFileSync(path.join(root, 'binary', 'binary-app.js'), 'utf8');
const callback = fs.readFileSync(path.join(root, 'deriv', 'callback', 'index.html'), 'utf8');
const roleSession = fs.readFileSync(path.join(root, 'tab-role-session.js'), 'utf8');

assert.match(binary, /function isLegacyAdmin\(\)/, 'Binary mode detects the Owner/Admin session');
assert.match(binary, /isLegacyAdmin\(\)\?'\/deriv':'\/user\/deriv'/, 'Admin and customer Deriv APIs stay separate');
assert.match(binary, /if\(!isLegacyAdmin\(\)\)\{const stateResponse=/, 'Legacy admin OAuth does not call the customer-only state endpoint');
assert.match(callback, /location\.replace\('\/app\.html\?deriv=connected'\)/, 'OAuth returns to the authenticated app');
assert.match(callback, /flowsignal_trading_mode','binary'/, 'OAuth preserves Binary mode');
assert.match(roleSession, /binary\/binary-app\.js\?v=9/, 'Binary bundle cache is bumped');

console.log('admin Binary OAuth routing checks passed');
