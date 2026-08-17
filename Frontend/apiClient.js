(function () {
  const state = { lastApiCalled: null, statusCode: null, errorMessage: null };
  const DEFAULT_TIMEOUT_MS = 12000;

  function requestWithTimeout(input, init = {}) {
    const timeoutMs = Number(init.timeoutMs || DEFAULT_TIMEOUT_MS);
    const requestInit = { ...init };
    delete requestInit.timeoutMs;
    delete requestInit.suppressErrorPanel;
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return window.FlowSignalApi.nativeFetch(input, requestInit);
    const controller = new AbortController();
    const upstreamSignal = requestInit.signal;
    const abortFromUpstream = () => controller.abort(upstreamSignal?.reason);
    if (upstreamSignal) {
      if (upstreamSignal.aborted) abortFromUpstream();
      else upstreamSignal.addEventListener("abort", abortFromUpstream, { once: true });
    }
    requestInit.signal = controller.signal;
    const timeout = window.setTimeout(() => controller.abort("FlowSignal request timeout"), timeoutMs);
    return window.FlowSignalApi.nativeFetch(input, requestInit)
      .catch((error) => {
        if (controller.signal.aborted && !upstreamSignal?.aborted) {
          const timeoutError = new Error(`Request timed out after ${timeoutMs}ms`);
          timeoutError.name = "TimeoutError";
          throw timeoutError;
        }
        throw error;
      })
      .finally(() => {
        window.clearTimeout(timeout);
        upstreamSignal?.removeEventListener?.("abort", abortFromUpstream);
      });
  }

  function ensureErrorPanel() {
    let panel = document.getElementById("frontendErrorPanel");
    if (panel) return panel;
    panel = document.createElement("div");
    panel.id = "frontendErrorPanel";
    panel.className = "frontend-error-panel hidden";
    panel.innerHTML = `<strong>API Error</strong><span id="frontendErrorApi">Last API: --</span><span id="frontendErrorStatus">Status: --</span><span id="frontendErrorMessage">Message: --</span><button id="frontendErrorDismiss" type="button">Dismiss</button>`;
    document.body.appendChild(panel);
    panel.querySelector("#frontendErrorDismiss")?.addEventListener("click", () => window.FlowSignalApi.clearError());
    return panel;
  }

  function renderErrorPanel() {
    const panel = ensureErrorPanel();
    const api = panel.querySelector("#frontendErrorApi");
    const status = panel.querySelector("#frontendErrorStatus");
    const message = panel.querySelector("#frontendErrorMessage");
    if (api) api.textContent = `Last API: ${state.lastApiCalled || "--"}`;
    if (status) status.textContent = `Status: ${state.statusCode || "--"}`;
    if (message) message.textContent = `Message: ${state.errorMessage || "--"}`;
    panel.classList.toggle("hidden", !state.errorMessage);
  }

  async function apiFetch(input, init) {
    const url = typeof input === "string" ? input : input?.url;
    const suppressErrorPanel = Boolean(init?.suppressErrorPanel || String(url || "").includes("/news-impact") || String(url || "").includes("/ctrader-status") || String(url || "").includes("/ctrader/status") || String(url || "").includes("/chart/live-ticks") || String(url || "").includes("/chart/smc-structure") || String(url || "").includes("/modify-live-position-levels"));
    if (!suppressErrorPanel) state.lastApiCalled = url || "unknown";
    try {
      const response = await requestWithTimeout(input, init);
      if (suppressErrorPanel) return response;
      state.statusCode = response.status;
      if (!response.ok) { state.errorMessage = `HTTP ${response.status}`; renderErrorPanel(); }
      else if (state.errorMessage) { state.errorMessage = null; renderErrorPanel(); }
      return response;
    } catch (error) {
      if (suppressErrorPanel) throw error;
      state.statusCode = "network";
      state.errorMessage = error.message || "Network request failed";
      renderErrorPanel();
      throw error;
    }
  }

  window.FlowSignalApi = {
    nativeFetch: window.fetch.bind(window),
    fetch: apiFetch,
    fetchWithTimeout: requestWithTimeout,
    getState: () => ({ ...state }),
    clearError: () => { state.errorMessage = null; renderErrorPanel(); },
  };
  window.fetch = apiFetch;

  function loadScriptOnce(selector, src, dataKey, warning) {
    if (document.querySelector(selector)) return;
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset[dataKey] = "true";
    script.addEventListener("error", () => console.warn(warning));
    document.head.appendChild(script);
  }

  loadScriptOnce('script[data-flow-smc-settings]', "indicators/smc/smc-settings.js?v=3", "flowSmcSettings", "FLOW_SMC_SETTINGS_LOAD_FAILED");
  loadScriptOnce('script[data-flow-smc-renderer-port]', "indicators/smc/smc-renderer.js?v=7", "flowSmcRendererPort", "FLOW_SMC_RENDERER_PORT_LOAD_FAILED");
  loadScriptOnce('script[data-flow-smc-chart-bridge]', "indicators/smc/smc-chart-bridge.js?v=5", "flowSmcChartBridge", "FLOW_SMC_CHART_BRIDGE_LOAD_FAILED");
  loadScriptOnce('script[data-flow-smc-local-engine]', "indicators/smc/smc-local-engine.js?v=3", "flowSmcLocalEngine", "FLOW_SMC_LOCAL_ENGINE_LOAD_FAILED");
  loadScriptOnce('script[data-flow-smc-local-visual]', "indicators/smc/smc-local-visual.js?v=4", "flowSmcLocalVisual", "FLOW_SMC_LOCAL_VISUAL_LOAD_FAILED");
})();