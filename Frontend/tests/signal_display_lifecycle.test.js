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

let state = api.canonicalize('EURUSD', {
  strategy_decision: 'SELL',
  execution_allowed: false,
  execution_status: 'BLOCKED',
  execution_block_reason: 'WAIT_SETUP_SWING_CHANGED_BEFORE_EXECUTION',
});
assert.equal(state.executionState, 'BLOCKED');
assert.equal(api.displayLabel(state), 'SELL · BLOCKED');
assert.match(api.displayNote(state), /No order sent/);

state = api.canonicalize('XAUUSD', {
  strategy_decision: 'SELL',
  execution_allowed: false,
  execution_status: 'BLOCKED',
  execution_block_reason: 'ACTIVE_TRADE_ALREADY_RUNNING',
  active_trade_direction: 'SELL',
  active_trade_id: '57804337',
  active_trade_status: 'RUNNING',
});
assert.equal(state.executionState, 'RUNNING');
assert.equal(api.displayLabel(state), 'SELL · RUNNING');
assert.match(api.displayNote(state), /57804337/);

state = api.canonicalize('EURUSD', {
  strategy_decision: 'BUY',
  execution_allowed: true,
  execution_status: 'PENDING',
});
assert.equal(state.executionState, 'SIGNAL');
assert.equal(api.displayLabel(state), 'BUY · SIGNAL');

state = api.canonicalize('EURUSD', {
  strategy_decision: 'WAIT',
  execution_allowed: false,
  execution_status: 'NOT_APPLICABLE',
});
assert.equal(state.executionState, 'WAIT');

// Nested diagnostics must not overwrite authoritative top-level broker state.
api.ingest({
  EURUSD: {
    strategy_decision: 'SELL',
    execution_status: 'BLOCKED',
    execution_block_reason: 'WAIT_SETUP_SWING_CHANGED_BEFORE_EXECUTION',
    strategy_debug: {
      strategy_decision: 'SELL',
      execution_status: 'PENDING',
    },
  },
});
assert.equal(api.state.EURUSD.executionState, 'BLOCKED');
assert.equal(api.state.EURUSD.blockReason, 'WAIT_SETUP_SWING_CHANGED_BEFORE_EXECUTION');

console.log('signal display lifecycle tests passed');
