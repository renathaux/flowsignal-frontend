const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'signal-display-state.js'), 'utf8');

const context = {
  window: {
    fetch: async () => ({ json: async () => ({}) }),
    requestAnimationFrame: (fn) => fn(),
    addEventListener: () => {},
  },
  document: {
    readyState: 'loading',
    addEventListener: () => {},
    getElementById: () => null,
    body: {},
  },
  MutationObserver: class { observe() {} },
  URL,
  Request: class {},
};
context.window.window = context.window;
vm.runInNewContext(source, context);

const api = context.window.FlowSignalSignalDisplayState;
assert.ok(api, 'lifecycle display API is exported');

// A setup that changed before execution is no longer a fresh SELL: visible state must be WAIT.
let state = api.canonicalize('EURUSD', {
  strategy_decision: 'SELL',
  fresh_entry_available: false,
  execution_allowed: false,
  execution_status: 'BLOCKED',
  execution_block_reason: 'WAIT_SETUP_SWING_CHANGED_BEFORE_EXECUTION',
});
assert.equal(state.signal, 'WAIT');
assert.equal(api.displayLabel(state), 'WAIT');

// A running broker position must not force BUY/SELL into the strategy signal display.
state = api.canonicalize('XAUUSD', {
  strategy_decision: 'SELL',
  fresh_entry_available: false,
  execution_allowed: false,
  execution_status: 'BLOCKED',
  execution_block_reason: 'ACTIVE_TRADE_ALREADY_RUNNING',
  active_trade_direction: 'SELL',
  active_trade_id: '57804337',
  active_trade_status: 'RUNNING',
});
assert.equal(state.running, true);
assert.equal(state.signal, 'WAIT');
assert.equal(api.displayLabel(state), 'WAIT');

// BUY/SELL is visible only for a genuinely fresh setup.
state = api.canonicalize('EURUSD', {
  strategy_decision: 'BUY',
  fresh_entry_available: true,
  execution_allowed: true,
  execution_status: 'PENDING',
});
assert.equal(state.signal, 'BUY');
assert.equal(api.displayLabel(state), 'BUY');

state = api.canonicalize('EURUSD', {
  strategy_decision: 'WAIT',
  fresh_entry_available: false,
  execution_allowed: false,
  execution_status: 'NOT_APPLICABLE',
});
assert.equal(state.signal, 'WAIT');
assert.equal(api.displayLabel(state), 'WAIT');

// A later final safety result can invalidate what was initially a fresh signal.
api.ingest({
  EURUSD: {
    strategy_decision: 'SELL',
    fresh_entry_available: true,
    execution_status: 'PENDING',
  },
  XAUUSD: { strategy_decision: 'WAIT', fresh_entry_available: false },
  live_auto_status_by_symbol: {
    EURUSD: {
      symbol: 'EURUSD',
      signal: 'SELL',
      status: 'BLOCKED',
      reason: 'WAIT_SETUP_SWING_CHANGED_BEFORE_EXECUTION',
    },
  },
});
assert.equal(api.state.EURUSD.signal, 'WAIT');
assert.equal(api.state.EURUSD.fresh, false);
assert.equal(api.displayLabel(api.state.EURUSD), 'WAIT');

console.log('fresh signal lifecycle display tests passed');
