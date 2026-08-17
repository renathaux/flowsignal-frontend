/* FlowSignal SMC settings runtime adapter.
 * Fixes dotted Fibonacci keys (0.786, 0.705, ...), keeps one appearance state,
 * and synchronizes the visible renderer with the master ON/OFF state.
 * Appearance only; no strategy or broker impact.
 */
(function () {
  "use strict";

  const KEY = "flowsignal_smc_visual_settings_v1";
  const defaults = {
    bos: { show: true, color: "#c7cbd1", width: 1, style: "solid" },
    choch: { show: true, color: "#f0c419", width: 1, style: "solid" },
    structure: { show: true, color: "#2962ff", width: 1, style: "solid" },
    fibs: {
      "0.786": { show: true, color: "#64b5f6", width: 1, style: "solid" },
      "0.705": { show: true, color: "#f23645", width: 1, style: "solid" },
      "0.618": { show: true, color: "#089981", width: 1, style: "solid" },
      "0.5": { show: true, color: "#4caf50", width: 1, style: "solid" },
      "0.382": { show: true, color: "#81c784", width: 1, style: "solid" },
    },
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));
  function loadState() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (_) {}
    const out = clone(defaults);
    ["bos", "choch", "structure"].forEach((key) => Object.assign(out[key], saved?.[key] || {}));
    Object.keys(out.fibs).forEach((key) => Object.assign(out.fibs[key], saved?.fibs?.[key] || {}));
    return out;
  }

  let state = loadState();

  function persist() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function resolve(path) {
    const value = String(path || "");
    if (value.startsWith("fibs.")) {
      const rest = value.slice(5);
      const lastDot = rest.lastIndexOf(".");
      if (lastDot < 0) return null;
      const fibKey = rest.slice(0, lastDot);
      const property = rest.slice(lastDot + 1);
      if (!Object.prototype.hasOwnProperty.call(state.fibs, fibKey)) return null;
      return { target: state.fibs[fibKey], property };
    }
    const dot = value.indexOf(".");
    if (dot < 0) return null;
    const group = value.slice(0, dot);
    const property = value.slice(dot + 1);
    if (!state[group]) return null;
    return { target: state[group], property };
  }

  function setValue(path, value) {
    const resolved = resolve(path);
    if (!resolved) return false;
    resolved.target[resolved.property] = value;
    persist();
    redraw();
    return true;
  }

  function redraw() {
    const renderer = window.FlowSignalSmcRenderer;
    const smc = window.FlowSignalSMC;
    if (!renderer) return;
    const enabled = Boolean(smc?.getState?.().enabled);
    renderer.setEnabled?.(enabled);
    if (!enabled) {
      renderer.clear?.();
      return;
    }
    if (renderer.lastStructure) renderer.render?.(renderer.lastStructure);
    else smc?.refresh?.();
  }

  function syncMaster() {
    const smc = window.FlowSignalSMC;
    const renderer = window.FlowSignalSmcRenderer;
    if (!smc || !renderer) return;
    const enabled = Boolean(smc.getState?.().enabled);
    renderer.setEnabled?.(enabled);
    if (!enabled) renderer.clear?.();
    const button = document.querySelector("#smcSettingsPanel [data-smc-master]");
    if (button) {
      button.textContent = enabled ? "SMC ON" : "SMC OFF";
      button.classList.toggle("is-on", enabled);
      button.setAttribute("aria-pressed", enabled ? "true" : "false");
    }
  }

  function rowPathFromInput(input) {
    const row = input?.closest?.(".smc-settings-row");
    const base = row?.dataset?.path;
    const key = input?.dataset?.k;
    return base && key ? `${base}.${key}` : null;
  }

  function inputValue(input) {
    if (input.type === "checkbox") return input.checked;
    if (input.type === "number") return Math.max(1, Math.min(5, Number(input.value) || 1));
    return input.value;
  }

  function handleAppearanceInput(event) {
    const input = event.target?.closest?.("#smcSettingsPanel .smc-settings-row input, #smcSettingsPanel .smc-settings-row select");
    if (!input) return;
    const path = rowPathFromInput(input);
    if (!path) return;
    // Prevent the older dotted-path handler from running for the same control.
    event.stopImmediatePropagation();
    setValue(path, inputValue(input));
  }

  document.addEventListener("change", handleAppearanceInput, true);
  document.addEventListener("input", handleAppearanceInput, true);

  // Replace the public accessor so the renderer reads this same canonical state.
  function installApiAdapter() {
    const api = window.FlowSignalSmcSettings;
    if (!api) return false;
    api.get = () => clone(state);
    api.set = setValue;
    api.redraw = redraw;
    api.runtimeVersion = "2";
    return true;
  }

  function reconcile() {
    installApiAdapter();
    syncMaster();
    redraw();
  }

  window.addEventListener("flowsignal:smc-toggle", () => window.setTimeout(syncMaster, 0));
  window.addEventListener("flowsignal:smc-style-change", () => {
    state = loadState();
    redraw();
  });
  window.addEventListener("load", () => {
    reconcile();
    window.setTimeout(reconcile, 250);
    window.setTimeout(reconcile, 1000);
  }, { once: true });

  window.FlowSignalSmcSettingsRuntime = {
    get: () => clone(state),
    set: setValue,
    redraw,
    reconcile,
    version: "2",
  };
})();
