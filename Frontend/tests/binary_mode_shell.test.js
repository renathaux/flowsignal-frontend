const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'binary', 'binary-app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'binary', 'binary.css'), 'utf8');
const loader = fs.readFileSync(path.join(root, 'tab-role-session.js'), 'utf8');
const mobile = fs.readFileSync(path.join(root, 'mobile.html'), 'utf8');

function extract(startNeedle, endNeedle, exports) {
  const start = script.indexOf(startNeedle);
  const end = script.indexOf(endNeedle, start);
  assert.ok(start >= 0 && end > start, `${startNeedle} is extractable`);
  const context = {};
  vm.runInNewContext(`${script.slice(start, end)}\n${exports}`, context);
  return context;
}

const modes = extract(
  'function normalizeMode',
  'function accountId',
  'this.normalizeMode=normalizeMode;',
);
assert.equal(modes.normalizeMode(null), 'forex', 'fresh users default to Forex');
assert.equal(modes.normalizeMode('forex'), 'forex');
assert.equal(modes.normalizeMode('binary'), 'binary');
assert.equal(modes.normalizeMode('unexpected'), 'forex');

assert.match(script, /const MODE_KEY='flowsignal_trading_mode'/);
assert.match(script, /localStorage\.setItem\(MODE_KEY,normalized\)/, 'mode persists');
assert.match(script, /else localStorage\.setItem\(MODE_KEY,'forex'\)/, 'normal page loads default to Forex');
assert.match(script, /sessionStorage\.getItem\(FOREX_ALERT_GUARD_KEY\)/, 'OAuth return can restore Binary');
assert.match(script, /forex\.hidden=normalized!==['"]forex['"]/);
assert.match(script, /binary\.hidden=normalized!==['"]binary['"]/);
assert.match(script, /localStorage\.setItem\(MODE_KEY,['"]binary['"]\)/, 'OAuth preserves Binary mode');
assert.match(script, /if\(normalized===['"]binary['"]\)\{refreshAll\(\); startPolling\(\);\}else stopPolling\(\)/, 'hidden Binary polling pauses');

assert.match(script, /id="flowsignalBinaryMode"|BINARY_MODE_ID='flowsignalBinaryMode'/);
assert.match(script, /FOREX_MODE_ID='flowsignalForexMode'/);
assert.match(script, /Authoritative V5 Signal/i);
assert.match(script, /Waiting for next signal/);
assert.match(script, /5-minute RISE signal/);
assert.match(script, /5-minute FALL signal/);
assert.match(script, /ACTIVE CONTRACT/);
assert.match(script, /RECENT BINARY CONTRACTS/);
assert.match(script, /No contracts yet/);
assert.match(script, /EXECUTION STATUS/);
assert.match(script, /RISE <span>[^<]+<\/span> CALL/);
assert.match(script, /FALL <span>[^<]+<\/span> PUT/);
assert.match(script, /Binary Dashboard/);
assert.match(script, /Deriv Accounts/);
assert.match(script, /Binary History/);
assert.match(script, /V5 Research/);
assert.match(script, /Relay/);
assert.match(script, /Execution Engine/);

assert.match(script, /DEFAULT_STAKE=10/);
assert.match(script, /value="10"/);
assert.match(script, /binary\/account-settings/);
assert.match(script, /binary_auto_enabled/);
assert.match(script, /account_type_normalized/);
assert.match(script, /formatMoney\(account\?\.balance,currency\)/);
assert.match(script, /REAL BINARY EXECUTION DISABLED/);
assert.match(script, /5 Minutes/);
assert.match(script, /No SL \/ TP/);
assert.doesNotMatch(script, /id="[^\"]*(?:stopLoss|takeProfit|riskReward|bos|ema|smc)[^\"]*"/i);

const constantsStart = script.indexOf("const STRATEGY_VERSION=");
const validatorStart = script.indexOf('function genuineV5Signal');
const validatorEnd = script.indexOf('function renderSignal', validatorStart);
const validatorContext = {};
vm.runInNewContext(`${script.slice(constantsStart, script.indexOf('let mounted', constantsStart))}${script.slice(validatorStart, validatorEnd)}this.genuineV5Signal=genuineV5Signal;`, validatorContext);
const genuine = {
  signal: 'RISE',
  strategy_version: 'DERIV_BINARY_V5_NOISY_REVERSAL_FROZEN_1',
  rule_hash: 'fab52bb80f7f4dd9150adb2f90d7e090816915ff70e6b368518e7fb39444b249',
  signal_id: 'DERIV_BINARY_V5_NOISY_REVERSAL_FROZEN_1:frxEURUSD:1787097600:RISE',
};
assert.equal(validatorContext.genuineV5Signal(genuine), true);
assert.equal(validatorContext.genuineV5Signal({...genuine, signal:'FALL'}), false, 'direction mismatch is blocked');
assert.equal(validatorContext.genuineV5Signal({...genuine, signal_id:'TEST-V5-RELAY-20260818-A'}), false, 'TEST rows are blocked');
assert.equal(validatorContext.genuineV5Signal({...genuine, signal_id:'malformed'}), false);
assert.equal(validatorContext.genuineV5Signal({...genuine, rule_hash:'wrong'}), false);

assert.match(script, /getCurrentFlowSignalUserId/, 'temporary user identity is abstracted');
assert.match(script, /flowsignal_binary_user_id/);
assert.doesNotMatch(script, /\/binary-v3|V3_RECOMPUTED|binary\/v3/i);
assert.doesNotMatch(script, /ctrader|Forex LIVE Auto|Forex PAPER Auto/i, 'Binary code does not mutate Forex/cTrader state');
assert.equal((script.match(/\/deriv\/binary\/v5\/execute/g)||[]).length, 1, 'only the genuine execution path can call execute');
assert.match(loader, /binary\/binary-app\.js\?v=5/);
assert.match(mobile, /binary\/binary\.css\?v=5/);
assert.match(mobile, /binary\/binary-app\.js\?v=5/);
assert.match(script, /const mobileApp=document\.getElementById\('mobileApp'\)/);
assert.match(script, /forex\.appendChild\(mobileApp\)/, 'mobile Forex structure is preserved intact');

assert.match(css, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\) 306px/);
assert.match(css, /\.binary-signal-card\{grid-column:1\/4/);
assert.match(css, /#binaryAccountCard\{grid-column:4/);
assert.match(css, /\.binary-system-card\{position:fixed/);
assert.match(css, /\.flowsignal-mode-selector\{position:fixed[^}]*right:164px/);
assert.match(css, /@media\(max-width:1050px\)/);
assert.match(css, /@media\(max-width:700px\)/);
assert.match(css, /@media\(max-width:430px\)/);
assert.match(css, /\.flowsignal-mode-panel\[hidden\]\{display:none!important\}/, 'both dashboards cannot display simultaneously');

console.log('binary mode shell tests passed');
