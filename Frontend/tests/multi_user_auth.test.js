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
assert.match(auth, /LEGACY_SESSION_TOKEN_KEY='flowsignal_session_token'/, 'existing owner session token is reused');
assert.match(auth, /options\.headers\.set\('Authorization',`Bearer \$\{ownerToken\}`\)/, 'legacy admin requests carry the owner bearer token');
assert.match(auth, /if\(!sessionUser\?\.id\) return parsed\.toString\(\)/, 'legacy owner keeps original Deriv namespace');
assert.match(auth, /parsed\.pathname=`\/user\$\{parsed\.pathname\}`/, 'authenticated customers use user Deriv namespace');
assert.match(auth, /if\(!sessionUser\?\.id\|\|!body/, 'browser user_id stripping applies only to authenticated customers');
assert.match(auth, /delete payload\.user_id/, 'customer requests cannot authorize with browser user_id');
assert.match(auth, /binary\/account-settings\/\$\{match\[1\]\}/, 'legacy account-settings URL is normalized before customer namespace rewrite');
assert.match(auth, /binary\/execution-status\/\$\{match\[1\]\}/, 'legacy execution-status URL is normalized before customer namespace rewrite');
assert.match(auth, /sessionUser\?\.id/, 'authenticated backend identity is exposed to the UI');
assert.match(loader, /user-auth\.js\?v=1/);
assert.match(loader, /authenticatedRole\(\)/);
assert.match(loader, /if \(authenticatedRole\(\) && normalized !== authenticatedRole\(\)\) return false/, 'authenticated role cannot be changed by storage UI state');

assert.match(callback, /\/auth\/session/);
assert.match(callback, /flowsignal_deriv_oauth_user_id/);
assert.match(callback, /\/user\/deriv\/oauth\/state/);
assert.match(callback, /\/user\/deriv\/oauth\/exchange/);
assert.match(callback, /X-FlowSignal-CSRF/);
assert.match(callback, /initiatingUser&&initiatingUser!==sessionData\.user\.id/, 'customer OAuth callback is bound to initiating FlowSignal user');
assert.match(callback, /\/deriv\/oauth\/exchange/, 'legacy owner OAuth exchange is preserved');
assert.match(callback, /user_id:legacyUserId/, 'legacy owner keeps its existing temporary execution identity');

assert.match(binary, /FOREX_MODE_ID='flowsignalForexMode'/);
assert.match(binary, /BINARY_MODE_ID='flowsignalBinaryMode'/);
assert.match(binary, /AUTHORITATIVE V5 SIGNAL/);
assert.match(binary, /Connect Deriv/);
assert.doesNotMatch(auth, /localStorage\.setItem\([^,]*password/i, 'password is never persisted in local storage');

console.log('multi-user auth frontend tests passed');
