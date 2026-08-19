const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const auth = fs.readFileSync(path.join(root, 'user-auth.js'), 'utf8');
const callback = fs.readFileSync(path.join(root, 'deriv', 'callback', 'index.html'), 'utf8');
const loader = fs.readFileSync(path.join(root, 'tab-role-session.js'), 'utf8');
const binary = fs.readFileSync(path.join(root, 'binary', 'binary-app.js'), 'utf8');

assert.match(auth, /\/auth\/session/);
assert.match(auth, /\/auth\/signup/);
assert.match(auth, /\/auth\/login/);
assert.match(auth, /\/auth\/logout/);
assert.match(auth, /credentials:'include'/);
assert.match(auth, /X-FlowSignal-CSRF/);
assert.match(auth, /delete payload\.user_id/, 'legacy browser user_id is stripped before authenticated Deriv requests');
assert.match(auth, /binary\/account-settings\/\$\{match\[1\]\}/, 'legacy account settings URL is rewritten without browser user id');
assert.match(auth, /binary\/execution-status\/\$\{match\[1\]\}/, 'legacy execution status URL is rewritten without browser user id');
assert.match(auth, /sessionUser\?\.id/, 'authenticated backend identity is exposed to the UI');
assert.match(loader, /user-auth\.js\?v=1/);
assert.match(loader, /authenticatedRole\(\)/);
assert.match(loader, /if \(authenticatedRole\(\) && normalized !== authenticatedRole\(\)\) return false/, 'authenticated role cannot be changed by storage UI state');

assert.match(callback, /\/auth\/session/);
assert.match(callback, /flowsignal_deriv_oauth_user_id/);
assert.match(callback, /\/deriv\/oauth\/state/);
assert.match(callback, /\/deriv\/oauth\/exchange/);
assert.match(callback, /X-FlowSignal-CSRF/);
assert.doesNotMatch(callback, /user_id:userId|flowsignal_binary_user_id/, 'OAuth callback no longer authorizes from a browser-generated user id');

assert.match(binary, /FOREX_MODE_ID='flowsignalForexMode'/);
assert.match(binary, /BINARY_MODE_ID='flowsignalBinaryMode'/);
assert.match(binary, /AUTHORITATIVE V5 SIGNAL/);
assert.match(binary, /Connect Deriv/);
assert.doesNotMatch(auth, /localStorage\.setItem\([^,]*password/i, 'password is never persisted in local storage');

console.log('multi-user auth frontend tests passed');
