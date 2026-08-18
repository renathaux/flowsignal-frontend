(function () {
  'use strict';

  if (window.__flowSignalSignalDisplayStateInstalled) return;
  window.__flowSignalSignalDisplayStateInstalled = true;

  const state = {
    EURUSD: { signal: 'WAIT', running: false, direction: '', positionId: '' },
    XAUUSD: { signal: 'WAIT', running: false, direction: '', positionId: '' },
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

  function activeSnapshot(obj) {
    const snapshot = obj && typeof obj === 'object' ? obj.executed_trade_setup_snapshot : null;
    if (!snapshot || typeof snapshot !== 'object') return null;
    const status = String(obj.smc_status || snapshot.status || 'RUNNING').toUpperCase();
    if (status.includes('CLOSED') || status.includes('EXIT')) return null;
    return snapshot;
  }

  function remember(symbol, obj) {
    if (!symbol || !state[symbol] || !obj || typeof obj !== 'object') return;
    const signal = normalizeSignal(
      obj.strategy_decision || obj.display_signal || obj.signal_display_state || obj.final_signal || obj.signal
    );
    const snapshot = activeSnapshot(obj);
    const direction = normalizeSignal(snapshot?.direction || snapshot?.side || obj.active_trade_direction);
    const positionId = snapshot?.broker_position_id ?? snapshot?.position_id ?? obj.active_trade_id ?? '';

    state[symbol] = {
      signal,
      running: Boolean(snapshot || (direction !== 'WAIT' && positionId)),
      direction: direction !== 'WAIT' ? direction : '',
      positionId: positionId ? String(positionId) : '',
    };
  }

  function walk(value, keyHint = '') {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      value.forEach((item) => walk(item, keyHint));
      return;
    }

    const hintedSymbol = normalizeSymbol(keyHint);
    const ownSymbol = normalizeSymbol(
      value.symbol || value.instrument || value.pair || value.executed_trade_setup_snapshot?.symbol
    );
    const symbol = ownSymbol || hintedSymbol;
    if (symbol && (
      'strategy_decision' in value || 'display_signal' in value || 'final_signal' in value ||
      'signal' in value || 'executed_trade_setup_snapshot' in value || 'active_trade_id' in value
    )) {
      remember(symbol, value);
    }

    Object.entries(value).forEach(([key, child]) => {
      if (child && typeof child === 'object') walk(child, key);
    });
  }

  function decorateSymbol(symbol) {
    const entry = state[symbol];
    if (!entry) return;
    const prefix = symbol === 'XAUUSD' ? 'gold' : 'eurusd';
    const signalEl = document.getElementById(`${prefix}-signal`);
    const noteEl = document.getElementById(`${prefix}-signal-note`);

    if (signalEl && (entry.signal === 'BUY' || entry.signal === 'SELL')) {
      const runningSameSide = entry.running && entry.direction === entry.signal;
      signalEl.textContent = runningSameSide
        ? `${entry.signal} · RUNNING`
        : `${entry.signal} · SIGNAL`;
      signalEl.dataset.executionState = runningSameSide ? 'running' : 'signal';
    }

    if (noteEl) {
      if (entry.running && entry.direction) {
        noteEl.textContent = `${entry.direction} position running${entry.positionId ? ` · ${entry.positionId}` : ''}`;
        noteEl.classList.remove('hidden');
      } else if (entry.signal === 'BUY' || entry.signal === 'SELL') {
        noteEl.textContent = 'Strategy signal · no broker position open';
        noteEl.classList.remove('hidden');
      }
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

    const runningSameSide = entry.running && entry.direction === entry.signal;
    signalEl.textContent = runningSameSide
      ? `${entry.signal} · RUNNING`
      : `${entry.signal} · SIGNAL`;
    signalEl.dataset.executionState = runningSameSide ? 'running' : 'signal';

    if (noteEl) {
      noteEl.textContent = runningSameSide
        ? `${entry.direction} broker position is active${entry.positionId ? ` · ${entry.positionId}` : ''}`
        : 'Fresh strategy decision · no broker position open';
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
        response.clone().json().then((payload) => {
          walk(payload);
          window.requestAnimationFrame(render);
        }).catch(() => {});
      }
    } catch (_error) {}
    return response;
  };

  const observer = new MutationObserver(() => window.requestAnimationFrame(render));
  const start = () => {
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    render();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();

  window.FlowSignalSignalDisplayState = { state, render };
})();
