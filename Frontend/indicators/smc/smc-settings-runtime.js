/* FlowSignal SMC settings compatibility shim.
 * Keeps the original SMC Settings panel as the single owner.
 * Only fixes dotted Fibonacci keys such as 0.786.
 * Appearance only; no strategy or broker impact.
 */
(function () {
  "use strict";

  const KEY = "flowsignal_smc_visual_settings_v1";

  function readSaved() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch (_) { return {}; }
  }

  function writeSaved(saved) {
    localStorage.setItem(KEY, JSON.stringify(saved || {}));
  }

  function installDynamicGetter() {
    const api = window.FlowSignalSmcSettings;
    if (!api || api.__fibCompatInstalled) return false;
    const originalGet = typeof api.get === "function" ? api.get.bind(api) : null;
    api.get = function () {
      const base = originalGet ? originalGet() : {};
      const saved = readSaved();
      if (saved.bos) Object.assign(base.bos || (base.bos = {}), saved.bos);
      if (saved.choch) Object.assign(base.choch || (base.choch = {}), saved.choch);
      if (saved.structure) Object.assign(base.structure || (base.structure = {}), saved.structure);
      base.fibs = base.fibs || {};
      Object.entries(saved.fibs || {}).forEach(([key, value]) => {
        Object.assign(base.fibs[key] || (base.fibs[key] = {}), value || {});
      });
      return base;
    };
    api.__fibCompatInstalled = true;
    return true;
  }

  function redraw() {
    const renderer = window.FlowSignalSmcRenderer;
    if (!renderer) return;
    const enabled = Boolean(window.FlowSignalSMC?.getState?.().enabled);
    renderer.setEnabled?.(enabled);
    if (!enabled) {
      renderer.clear?.();
      return;
    }
    if (renderer.lastStructure) renderer.render?.(renderer.lastStructure);
  }

  function handleFib(event) {
    const input = event.target?.closest?.('#smcSettingsPanel .smc-settings-row[data-path^="fibs."] input, #smcSettingsPanel .smc-settings-row[data-path^="fibs."] select');
    if (!input) return;
    const row = input.closest('.smc-settings-row');
    const path = String(row?.dataset?.path || "");
    const fibKey = path.startsWith("fibs.") ? path.slice(5) : "";
    const property = String(input.dataset.k || "");
    if (!fibKey || !property) return;

    // Stop only the original broken dotted-path handler for Fibonacci rows.
    event.stopImmediatePropagation();

    const saved = readSaved();
    saved.fibs = saved.fibs || {};
    saved.fibs[fibKey] = saved.fibs[fibKey] || {};
    const value = input.type === "checkbox"
      ? input.checked
      : input.type === "number"
        ? Math.max(1, Math.min(5, Number(input.value) || 1))
        : input.value;
    saved.fibs[fibKey][property] = value;
    writeSaved(saved);
    installDynamicGetter();
    redraw();
  }

  // Capture only Fibonacci appearance controls. BOS/CHoCH/Structure and master
  // ON/OFF remain entirely owned by smc-settings.js.
  document.addEventListener("change", handleFib, true);
  document.addEventListener("input", handleFib, true);

  function init() {
    installDynamicGetter();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
  window.addEventListener("load", init, { once: true });

  window.FlowSignalSmcSettingsRuntime = {
    redraw,
    version: "3-fib-only",
  };
})();