(function () {
  'use strict';

  if (window.__flowSignalSignalDisplayStateInstalled) return;
  window.__flowSignalSignalDisplayStateInstalled = true;

  const EMPTY = () => ({
    signal: 'WAIT',
    executionState: 'WAIT',
    executionStatus: 'NOT_APPLICABLE',
    executionAllowed: false,
    blockReason: '',
    running: false,
    direction: '',
    positionId: '',
  });

  const state = {
    EURUSD: EMPTY(),
    XAUUSD: EMPTY(),
  };

  function normalizeSymbol(value) {
    const text = String(value || '').toUpperCase();
    if (text.includes('XAUUSD') || text === 'GOLD') return 'XAUUSD';
    if (text.includes('EURUSD')) return 'EURUSD';
    return '';
  }

  function normalizeSignal(value) {
    const text = String(value || '').trim().toUpperCase();
    if (text === 'BUY' || text.startsWith('BUY ')) return 'BUY';
    if (text === 'SELL' || text.startsWith('SELL ')) return 'SELL';
    return 'WAIT';
  }

  function textValue(value) {
    if (value === null || value === undefined) return '';
    return String(value).trim();
  }

  function firstValue() {
    for (const value of arguments) {
      const text = textValue(value);
      if (text) return text;
    }
    return '';
  }

  function executionDebug(obj) {
    if (!obj || typeof obj !== 'object') return {};
    for (const key of ['strategy_debug', 'entry_strategy_debug', 'signal_diagnostics']) {
      if (obj[key] && typeof obj[key] === 'object') return obj[key];
    }
    return {};
  }

  function activeSnapshot(obj) {
    const snapshot = obj && typeof obj === 'object' ? obj.executed_trade_setup_snapshot : null;
    if (!snapshot || typeof snapshot !== 'object') return null;
    const status = String(obj.smc_status || snapshot.status || 'RUNNING').toUpperCase();
    if (status.includes('CLOSED') || status.includes('EXIT')) return null;
    return snapshot;
  }

  function canonicalize(symbol, obj) {
    if (!symbol || !obj || typeof obj !== 'object') return EMPTY();

    const debug = executionDebug(obj);
    const signal = normalizeSignal(
      obj.strategy_decision || obj.display_signal || obj.signal_display_state || obj.final_signal || obj.signal
    );
    const snapshot = activeSnapshot(obj);
    const direction = normalizeSignal(
      snapshot?.direction || snapshot?.side || obj.active_trade_direction || obj.active_trade_side
    );
    const positionId = firstValue(
      snapshot?.broker_position_id,
      snapshot?.position_id,
      obj.active_trade_id,
      obj.broker_position_id,
      obj.position_id,
    );
    const activeStatus = firstValue(obj.active_trade_status, obj.smc_status, snapshot?.status).toUpperCase();
    const running = Boolean(
      snapshot ||
      (direction !== 'WAIT' && positionId && !activeStatus.includes('CLOSED') && !activeStatus.includes('EXIT'))
    );

    const executionStatus = firstValue(
      obj.execution_status,
      debug.execution_status,
      running ? 'RUNNING' : (signal === 'WAIT' ? 'NOT_APPLICABLE' : 'PENDING'),
    ).toUpperCase();
    const blockReason = firstValue(
      obj.execution_block_reason,
      debug.execution_block_reason,
      obj.blocked_reason,
      obj.block_reason,
      debug.blocked_reason,
      debug.block_reason,
    );
    const explicitAllowed = obj.execution_allowed ?? debug.execution_allowed;
    const executionAllowed = explicitAllowed === true;

    let executionState = 'WAIT';
    if (running) {
      executionState = 'RUNNING';
    } else if (
      executionStatus === 'BLOCKED' ||
      Boolean(blockReason) ||
      (explicitAllowed === false && signal !== 'WAIT' && executionStatus !== 'NOT_APPLICABLE')
    ) {
      executionState = 'BLOCKED';
    } else if (
      executionStatus.includes('EXECUT') ||
      executionStatus.includes('SUBMIT') ||
      executionStatus.includes('ACCEPT') ||
      executionStatus.includes('ORDER_SENT')
    ) {
      executionState = 'EXECUTING';
    } else if (signal === 'BUY' || signal === 'SELL') {
      executionState = 'SIGNAL';
    }

    return {
      signal,
      executionState,
      executionStatus,
      executionAllowed,
      blockReason,
      running,
      direction: direction !== 'WAIT' ? direction : '',
      positionId,
    };
  }

  function remember(symbol, obj) {
    if (!symbol || !state[symbol] || !obj || typeof obj !== 'object') return;
    state[symbol] = canonicalize(symbol, obj);
  }

  function ingest(payload) {
    if (!payload || typeof payload !== 'object') return;

    // Dashboard payloads are authoritative at the top-level symbol object.
    // Do not recursively let nested diagnostics overwrite broker-position state.
    if (payload.EURUSD && typeof payload.EURUSD === 'object') remember('EURUSD', payload.EURUSD);
    if (payload.XAUUSD && typeof payload.XAUUSD === 'object') remember('XAUUSD', payload.XAUUSD);

    // Fallback for alternate envelopes used by some endpoints.
    if (!payload.EURUSD || !payload.XAUUSD) {
      const queue = [payload];
      const seen = new Set();
      while (queue.length) {
        const value = queue.shift();
        if (!value || typeof value !== 'object' || seen.has(value)) continue;
        seen.add(value);
        if (Array.isArray(value)) {
          queue.push(...value);
          continue;
        }
        const symbol = normalizeSymbol(value.symbol || value.instrument || value.pair);
        if (symbol && ('strategy_decision' in value || 'signal' in value)) remember(symbol, value);
        Object.values(value).forEach((child) => {
          if (child && typeof child === 'object') queue.push(child);
        });
      }
    }
  }

  function reasonLabel(reason) {
    const value = String(reason || '').trim();
    if (!value) return 'Execution safety gate blocked this setup';
    return value.replace(/^WAIT[_ -]*/i, '').replaceAll('_', ' ').toLowerCase();
  }

  function displayLabel(entry) {
    if (entry.signal !== 'BUY' && entry.signal !== 'SELL') return 'WAIT';
    if (entry.executionState === 'RUNNING') return `${entry.signal} · RUNNING`;
    if (entry.executionState === 'BLOCKED') return `${entry.signal} · BLOCKED`;
    if (entry.executionState === 'EXECUTING') return `${entry.signal} · EXECUTING`;
    return `${entry.signal} · SIGNAL`;
  }

  function displayNote(entry) {
    if (entry.executionState === 'RUNNING') {
      return `${entry.direction || entry.signal} position running${entry.positionId ? ` · ${entry.positionId}` : ''}`;
    }
    if (entry.executionState === 'BLOCKED') {
      return `No order sent · ${reasonLabel(entry.blockReason)}`;
    }
    if (entry.executionState === 'EXECUTING') {
      return 'Order submitted · waiting for broker position confirmation';
    }
    if (entry.executionState === 'SIGNAL') {
      return entry.executionAllowed
        ? 'Validated strategy signal · execution eligible'
        : 'Strategy signal · waiting for execution decision';
    }
    return '';
  }

  function decorateSymbol(symbol) {
    const entry = state[symbol];
    if (!entry) return;
    const prefix = symbol === 'XAUUSD' ? 'gold' : 'eurusd';
    const signalEl = document.getElementById(`${prefix}-signal`);
    const noteEl = document.getElementById(`${prefix}-signal-note`);

    if (signalEl && (entry.signal === 'BUY' || entry.signal === 'SELL')) {
      signalEl.textContent = displayLabel(entry);
      signalEl.dataset.executionState = entry.executionState.toLowerCase();
    }

    if (noteEl && (entry.signal === 'BUY' || entry.signal === 'SELL')) {
      noteEl.textContent = displayNote(entry);
      noteEl.classList.remove('hidden');
    }
  }

  function decorateMain() {
    const title = document.getElementById('main-symbol-title');
    const signalEl = document.getElementById('main-signal');
    const noteEl = document.getElementById('main-signal-note');
    if (!title || !signalEl) return;

    const symbol = normalizeSymbol(title.textContent);
    const entry = state[symbol];
    if (!entry || (entry.signal !== 'BUY' && entry.signal !== 'SELL')) return;

    signalEl.textContent = displayLabel(entry);
    signalEl.dataset.executionState = entry.executionState.toLowerCase();
    if (noteEl) {
      noteEl.textContent = displayNote(entry);
      noteEl.classList.remove('hidden');
    }
  }

  function render() {
    decorateSymbol('EURUSD');
    decorateSymbol('XAUUSD');
    decorateMain();
  }

  const nativeFetch = window.fetch.bind(window);
  window.fetch = async function (input, init) {
    const response = await nativeFetch(input, init);
    try {
      const raw = typeof input === 'string' || input instanceof URL
        ? String(input)
        : input instanceof Request
          ? input.url
          : '';
      const url = raw ? new URL(raw, window.location.href) : null;
      if (url && (url.pathname === '/dashboard-feed' || url.pathname === '/panel-data')) {
        const nativeJson = response.json.bind(response);
        response.json = async function () {
          const payload = await nativeJson();
          ingest(payload);
          window.requestAnimationFrame(render);
          return payload;
        };
      }
    } catch (_error) {}
    return response;
  };

  function installAlertGuard() {
    const original = window.playAlert;
    if (typeof original !== 'function' || original.__executionLifecycleGuarded) return;

    function guardedPlayAlert(symbol, signal) {
      const normalized = normalizeSymbol(symbol);
      const entry = normalized ? state[normalized] : null;
      // A blocked/rejected or already-running setup is not a new executable signal.
      // The Flow Assistant may still explain the block, but browser/audio SELL/BUY
      // notifications must not claim a fresh executable entry exists.
      if (entry && (entry.executionState === 'BLOCKED' || entry.executionState === 'RUNNING')) {
        return;
      }
      return original.apply(this, arguments);
    }
    guardedPlayAlert.__executionLifecycleGuarded = true;
    window.playAlert = guardedPlayAlert;
  }

  const observer = new MutationObserver(() => window.requestAnimationFrame(render));
  const start = () => {
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    installAlertGuard();
    render();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  window.addEventListener('load', installAlertGuard, { once: true });

  window.FlowSignalSignalDisplayState = {
    state,
    ingest,
    canonicalize,
    displayLabel,
    displayNote,
    render,
  };
})();
