(function(){
  'use strict';

  // Binary trading has been retired from FlowSignal. Keep this tiny compatibility
  // shim so old cached mobile pages cannot restart Deriv polling or execution.
  const MODE_KEY = 'flowsignal_trading_mode';

  function forceForexMode(){
    try { localStorage.setItem(MODE_KEY, 'forex'); } catch (_error) {}
    document.documentElement.classList.remove('binary-mode');
    document.body?.classList.remove('binary-mode');

    const binaryShell = document.getElementById('flowsignalBinaryMode');
    if (binaryShell) binaryShell.remove();

    document.querySelectorAll('[data-nav="mode"]').forEach((button) => button.remove());
  }

  function setMode(){
    forceForexMode();
    return 'forex';
  }

  function currentMode(){
    return 'forex';
  }

  function noOp(){
    return false;
  }

  window.FlowSignalBinary = {
    disabled: true,
    mount: noOp,
    setMode,
    currentMode,
    refreshStatus: noOp,
    pollBinary: noOp,
    refreshExecution: noOp,
    refreshHistory: noOp,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceForexMode, { once: true });
  } else {
    forceForexMode();
  }

  document.addEventListener('flowsignal:authenticated', forceForexMode);
  window.addEventListener('pageshow', forceForexMode);
  console.info('FLOWSIGNAL_BINARY_DISABLED');
})();
