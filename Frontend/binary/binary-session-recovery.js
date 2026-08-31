(function () {
  'use strict';

  const CONNECTION_KEY = 'flowsignal_deriv_connection_id';
  const ACCOUNT_KEY = 'flowsignal_deriv_account_id';
  const MODE_KEY = 'flowsignal_trading_mode';
  const BACKEND = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8001'
    : `${location.origin}/api/proxy`;
  const STATUS_URL = `${BACKEND}/user/deriv/status`;

  let recoveryBusy = false;
  let retryTimer = null;
  let retryCount = 0;

  function isLegacyAdmin() {
    return sessionStorage.getItem('flowsignal_tab_role') === 'admin'
      && !sessionStorage.getItem('flowsignal_user_session_token');
  }

  function isBinaryVisible() {
    return String(localStorage.getItem(MODE_KEY) || '').toLowerCase() === 'binary';
  }

  function text(id) {
    return String(document.getElementById(id)?.textContent || '').trim().toUpperCase();
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && element.textContent !== value) element.textContent = value;
  }

  async function ensureAuthenticatedUser() {
    if (isLegacyAdmin()) return false;
    if (window.FlowSignalAuth?.user) return true;
    if (window.FlowSignalAuth && typeof window.FlowSignalAuth.session === 'function') {
      try { await window.FlowSignalAuth.session(); } catch (_error) {}
    }
    return Boolean(window.FlowSignalAuth?.user);
  }

  async function recoverPersistedConnection() {
    if (recoveryBusy || localStorage.getItem(CONNECTION_KEY) || isLegacyAdmin()) return false;
    recoveryBusy = true;
    try {
      if (!(await ensureAuthenticatedUser())) return false;
      const response = await fetch(STATUS_URL, { cache: 'no-store' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.connected || !data?.connection_id) return false;

      localStorage.setItem(CONNECTION_KEY, String(data.connection_id));
      const selected = String(data.selected_account_id || '').trim();
      if (selected) localStorage.setItem(ACCOUNT_KEY, selected);
      console.info('BINARY_DERIV_CONNECTION_RECOVERED');
      return true;
    } catch (error) {
      console.warn('BINARY_DERIV_CONNECTION_RECOVERY_WARNING', error);
      return false;
    } finally {
      recoveryBusy = false;
    }
  }

  function syncCurrentExecutionEngineStatus() {
    if (!isBinaryVisible()) return;
    const system = document.getElementById('binarySystemExecution');
    if (!system) return;

    const derivConnected = text('binarySystemDeriv') === 'CONNECTED';
    const accountType = text('binaryAccountBadge');
    const autoEnabled = text('binaryAutoStatusText') === 'ON';
    const contractStatus = text('binaryContractStatus');

    if (contractStatus === 'RUNNING') {
      setText('binarySystemExecution', 'RUNNING');
      return;
    }
    if (!derivConnected) return;

    // The main Binary app deliberately keeps the previous failed attempt visible
    // in the lifecycle card. That historical row must not make a currently
    // connected DEMO account look permanently blocked. Current readiness is
    // determined by the selected account and its saved Binary Auto setting.
    if (accountType === 'DEMO' && autoEnabled) {
      setText('binarySystemExecution', 'READY');
    } else if (accountType === 'DEMO' && !autoEnabled) {
      setText('binarySystemExecution', 'IDLE');
    }
  }

  async function recoveryTick() {
    const recovered = await recoverPersistedConnection();
    syncCurrentExecutionEngineStatus();
    if (recovered) {
      // binary-app polls every few seconds and will pick up the restored id.
      // Keep the page in Binary mode without forcing a reload or a new OAuth flow.
      localStorage.setItem(MODE_KEY, 'binary');
    }
  }

  function startRecoveryWindow() {
    if (retryTimer) return;
    retryCount = 0;
    recoveryTick();
    retryTimer = window.setInterval(() => {
      retryCount += 1;
      recoveryTick();
      if (localStorage.getItem(CONNECTION_KEY) || retryCount >= 20) {
        window.clearInterval(retryTimer);
        retryTimer = null;
      }
    }, 1000);
  }

  const observer = new MutationObserver(syncCurrentExecutionEngineStatus);
  observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });

  document.addEventListener('flowsignal:authenticated', startRecoveryWindow);
  window.addEventListener('pageshow', startRecoveryWindow);
  window.setInterval(syncCurrentExecutionEngineStatus, 1500);
  startRecoveryWindow();
})();
