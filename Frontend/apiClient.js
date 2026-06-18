(function () {
  const state = {
    lastApiCalled: null,
    statusCode: null,
    errorMessage: null,
  };

  function ensureErrorPanel() {
    let panel = document.getElementById("frontendErrorPanel");

    if (panel) return panel;

    panel = document.createElement("div");
    panel.id = "frontendErrorPanel";
    panel.className = "frontend-error-panel hidden";
    panel.innerHTML = `
      <strong>API Error</strong>
      <span id="frontendErrorApi">Last API: --</span>
      <span id="frontendErrorStatus">Status: --</span>
      <span id="frontendErrorMessage">Message: --</span>
      <button id="frontendErrorDismiss" type="button">Dismiss</button>
    `;
    document.body.appendChild(panel);
    panel.querySelector("#frontendErrorDismiss")?.addEventListener("click", () => {
      panel.classList.add("hidden");
    });
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
    state.lastApiCalled = url || "unknown";

    try {
      const response = await window.FlowSignalApi.nativeFetch(input, init);
      state.statusCode = response.status;

      if (!response.ok) {
        state.errorMessage = `HTTP ${response.status}`;
        renderErrorPanel();
      }

      return response;
    } catch (error) {
      state.statusCode = "network";
      state.errorMessage = error.message || "Network request failed";
      renderErrorPanel();
      throw error;
    }
  }

  window.FlowSignalApi = {
    nativeFetch: window.fetch.bind(window),
    fetch: apiFetch,
    getState: () => ({ ...state }),
    clearError: () => {
      state.errorMessage = null;
      renderErrorPanel();
    },
  };

  window.fetch = apiFetch;
})();
