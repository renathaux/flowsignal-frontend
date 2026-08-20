const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const startup = fs.readFileSync(path.join(__dirname, '..', 'startup.js'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.html'), 'utf8');

const recoveryCall = startup.indexOf('recoverThisTabBeforeRouteGate();');
const tokenSnapshot = startup.indexOf("const customerSessionToken = String(sessionStorage.getItem('flowsignal_user_session_token')");
const routeGate = startup.indexOf("if (isAppRoute && !customerSessionToken");

assert.notEqual(recoveryCall, -1, 'startup includes per-tab recovery');
assert.notEqual(tokenSnapshot, -1, 'startup snapshots the recovered customer token');
assert.notEqual(routeGate, -1, 'startup includes the authenticated /app gate');
assert.ok(recoveryCall < tokenSnapshot, 'per-tab recovery runs before the token snapshot');
assert.ok(tokenSnapshot < routeGate, 'the recovered token is available before redirect evaluation');
assert.match(startup, /flowsignal_tab_user_session:\$\{tabId\}/, 'customer recovery is scoped by tab id');
assert.match(startup, /flowsignal_tab_admin_session:\$\{tabId\}/, 'owner recovery is scoped by tab id');
assert.doesNotMatch(startup, /localStorage\.getItem\(['"]flowsignal_user_session_token/, 'shared customer identity is not read from localStorage');
assert.match(app, /startup\.js\?v=4/, 'production HTML cache-busts the corrected startup gate');

console.log('auth refresh boot-order regression test passed');
