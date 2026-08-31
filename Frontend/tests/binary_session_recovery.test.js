const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const recovery = fs.readFileSync(path.join(root, 'binary', 'binary-session-recovery.js'), 'utf8');
const loader = fs.readFileSync(path.join(root, 'tab-role-session.js'), 'utf8');

assert.match(recovery, /\/user\/deriv\/status/, 'recovery uses the authenticated user-scoped Deriv status endpoint');
assert.match(recovery, /method\s*:/i, 'test intentionally checks that no POST status recovery body was introduced');
assert.doesNotMatch(recovery, /method\s*:\s*['"]POST['"]/i, 'recovery is a read-only GET');
assert.match(recovery, /localStorage\.setItem\(CONNECTION_KEY,\s*String\(data\.connection_id\)\)/, 'server connection id is restored to browser storage');
assert.match(recovery, /localStorage\.setItem\(ACCOUNT_KEY,\s*selected\)/, 'server-selected Deriv account is restored');
assert.match(recovery, /accountType === 'DEMO' && autoEnabled/, 'current engine readiness is limited to connected DEMO auto execution');
assert.match(recovery, /setText\('binarySystemExecution', 'READY'\)/, 'stale failed execution no longer leaves current demo engine visually blocked');
assert.doesNotMatch(recovery, /BINARY_REAL_EXECUTION_ENABLED|\/binary\/v5\/execute|ctrader/i, 'recovery cannot enable real execution, place Binary contracts, or touch cTrader');
assert.match(loader, /binary\/binary-session-recovery\.js\?v=1/, 'desktop shell loads recovery script');

console.log('binary session recovery tests passed');
