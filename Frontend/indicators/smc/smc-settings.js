/* FlowSignal SMC visual settings. Appearance only; no strategy impact. */
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

  function load() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (_) {}
    const output = clone(defaults);
    ["bos", "choch", "structure"].forEach((key) => Object.assign(output[key], saved?.[key] || {}));
    Object.keys(output.fibs).forEach((key) => Object.assign(output.fibs[key], saved?.fibs?.[key] || {}));
    return output;
  }

  let state = load();
  const get = () => clone(state);

  function persist() {
    localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("flowsignal:smc-style-change", { detail: get() }));
  }

  function set(path, value) {
    const parts = String(path).split(".");
    let cursor = state;
    for (let i = 0; i < parts.length - 1; i += 1) cursor = cursor[parts[i]];
    cursor[parts[parts.length - 1]] = value;
    persist();
  }

  function row(label, path, cfg) {
    return `<div class="smc-settings-row" data-path="${path}">
      <label><input type="checkbox" data-k="show" ${cfg.show ? "checked" : ""}> ${label}</label>
      <input type="color" data-k="color" value="${cfg.color}">
      <select data-k="style"><option value="solid">Solid</option><option value="dashed">Dashed</option><option value="dotted">Dotted</option></select>
      <input type="number" min="1" max="5" step="1" data-k="width" value="${cfg.width}" title="Line width">
    </div>`;
  }

  const chartSection = () => document.querySelector(".chart-panel .chart-section");
  const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;

  function panelHost() {
    const section = chartSection();
    return section && fullscreenElement() === section ? section : document.body;
  }

  function ensureCss() {
    if (document.getElementById("smcSettingsCss")) return;
    const style = document.createElement("style");
    style.id = "smcSettingsCss";
    style.textContent = `
      .smc-settings-btn{display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:34px;border:1px solid #31506f;background:#101b29;color:#d9e7f7;border-radius:9px;padding:0 10px;font-weight:700;cursor:pointer;flex:0 0 auto;position:relative;z-index:20}
      .smc-settings-panel{position:fixed;right:22px;top:85px;left:auto;z-index:2147483647;width:min(430px,calc(100vw - 30px));max-height:calc(100vh - 110px);overflow:auto;overscroll-behavior:contain;background:#0d1724;border:1px solid #29425f;border-radius:14px;box-shadow:0 18px 50px #0009;color:#eaf2fb;pointer-events:auto;isolation:isolate}
      .smc-settings-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #24364d;cursor:grab;touch-action:none;background:#101c2b;border-radius:14px 14px 0 0;user-select:none}
      .smc-settings-head.is-dragging{cursor:grabbing}
      .smc-settings-head button,.smc-settings-body>button{background:#132238;color:#dce9f8;border:1px solid #304968;border-radius:8px;padding:7px 10px;cursor:pointer;position:relative;z-index:5}
      .smc-settings-head button{min-width:38px;min-height:34px;font-size:18px;line-height:1}
      .smc-master-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;margin-bottom:8px;background:#101c2b;border:1px solid #24364d;border-radius:10px}
      .smc-master-row strong{font-size:13px}
      .smc-master-toggle{border:1px solid #31506f;background:#182638;color:#b8c7da;border-radius:999px;padding:7px 14px;font-weight:800;cursor:pointer;min-width:88px}
      .smc-master-toggle.is-on{border-color:#1dbf73;background:rgba(29,191,115,.14);color:#55e59b}
      .smc-settings-body{padding:12px 14px 16px;user-select:auto}
      .smc-settings-sub{font-weight:800;margin:14px 0 7px;color:#9eb5cf}
      .smc-settings-row{display:grid;grid-template-columns:minmax(145px,1fr) 44px 94px 58px;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid #172538}
      .smc-settings-row label{font-size:13px}
      .smc-settings-row input[type=color]{width:40px;height:30px;border:0;background:transparent}
      .smc-settings-row select,.smc-settings-row input[type=number]{width:100%;background:#101d2c;color:#dce8f7;border:1px solid #30445e;border-radius:6px;padding:6px}
      .smc-settings-body>button{margin-top:14px;width:100%}
      .chart-section:fullscreen .smc-settings-panel,.chart-section:-webkit-full-screen .smc-settings-panel{top:68px;right:16px;max-height:calc(100vh - 90px)}
      @media(max-width:700px){.smc-settings-panel{right:10px;top:65px}.smc-settings-row{grid-template-columns:1fr 42px 82px 52px}}
    `;
    document.head.appendChild(style);
  }

  function smcApi() { return window.FlowSignalSMC || null; }
  function smcEnabled() { return Boolean(smcApi()?.getState?.().enabled); }

  function syncMasterToggle() {
    const button = document.querySelector("#smcSettingsPanel [data-smc-master]");
    if (!button) return;
    const enabled = smcEnabled();
    button.textContent = enabled ? "SMC ON" : "SMC OFF";
    button.classList.toggle("is-on", enabled);
    button.setAttribute("aria-pressed", enabled ? "true" : "false");
  }

  function setSmcEnabled(enabled) {
    const api = smcApi();
    if (!api?.setEnabled) return false;
    api.setEnabled(Boolean(enabled));
    syncMasterToggle();
    return true;
  }

  function closePanel() {
    document.getElementById("smcSettingsPanel")?.remove();
  }

  function resetPanelPosition(panel) {
    if (!panel) return;
    panel.style.left = "";
    panel.style.top = panelHost() === document.body ? "85px" : "68px";
    panel.style.right = panelHost() === document.body ? "22px" : "16px";
  }

  function syncHost() {
    const panel = document.getElementById("smcSettingsPanel");
    if (!panel) return;
    const host = panelHost();
    if (panel.parentNode !== host) {
      host.appendChild(panel);
      resetPanelPosition(panel);
    }
  }

  function isolatePanelEvents(panel) {
    ["click", "dblclick", "contextmenu", "pointerdown", "pointerup", "mousedown", "mouseup", "touchstart", "touchend"].forEach((name) => {
      panel.addEventListener(name, (event) => event.stopPropagation(), false);
    });
    panel.addEventListener("wheel", (event) => {
      event.stopPropagation();
      event.preventDefault();
      panel.scrollTop += event.deltaY;
      panel.scrollLeft += event.deltaX;
    }, { passive: false });
  }

  function makeDraggable(panel) {
    const head = panel.querySelector(".smc-settings-head");
    if (!head) return;

    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    function boundsForHost() {
      const host = panelHost();
      if (host === document.body) return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      return host.getBoundingClientRect();
    }

    head.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || event.target.closest("button,input,select,label")) return;
      const rect = panel.getBoundingClientRect();
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      panel.style.left = `${rect.left}px`;
      panel.style.top = `${rect.top}px`;
      panel.style.right = "auto";
      head.classList.add("is-dragging");
      try { head.setPointerCapture(pointerId); } catch (_) {}
      event.preventDefault();
      event.stopPropagation();
    });

    head.addEventListener("pointermove", (event) => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      const bounds = boundsForHost();
      const rect = panel.getBoundingClientRect();
      const minLeft = bounds.left + 4;
      const minTop = bounds.top + 4;
      const maxLeft = Math.max(minLeft, bounds.left + bounds.width - rect.width - 4);
      const maxTop = Math.max(minTop, bounds.top + bounds.height - rect.height - 4);
      panel.style.left = `${Math.min(maxLeft, Math.max(minLeft, startLeft + event.clientX - startX))}px`;
      panel.style.top = `${Math.min(maxTop, Math.max(minTop, startTop + event.clientY - startY))}px`;
      event.preventDefault();
      event.stopPropagation();
    });

    function endDrag(event) {
      if (pointerId === null || (event?.pointerId != null && event.pointerId !== pointerId)) return;
      try { head.releasePointerCapture(pointerId); } catch (_) {}
      pointerId = null;
      head.classList.remove("is-dragging");
      event?.preventDefault?.();
      event?.stopPropagation?.();
    }

    head.addEventListener("pointerup", endDrag);
    head.addEventListener("pointercancel", endDrag);
    head.addEventListener("lostpointercapture", () => {
      pointerId = null;
      head.classList.remove("is-dragging");
    });
  }

  function bindRows(panel) {
    panel.querySelectorAll(".smc-settings-row").forEach((rowEl) => {
      const path = rowEl.dataset.path;
      const cfg = path.startsWith("fibs.") ? state.fibs[path.split(".")[1]] : state[path];
      rowEl.querySelector('[data-k="style"]').value = cfg.style;
      rowEl.querySelectorAll("input,select").forEach((input) => {
        input.addEventListener("change", () => {
          const key = input.dataset.k;
          const value = input.type === "checkbox" ? input.checked : input.type === "number" ? Number(input.value) : input.value;
          set(`${path}.${key}`, value);
        });
      });
    });
  }

  function open() {
    ensureCss();
    let panel = document.getElementById("smcSettingsPanel");
    if (panel) {
      syncHost();
      syncMasterToggle();
      return;
    }

    panel = document.createElement("div");
    panel.id = "smcSettingsPanel";
    panel.className = "smc-settings-panel";
    panel.innerHTML = `
      <div class="smc-settings-head">
        <strong>SMC Settings</strong>
        <button type="button" data-close aria-label="Close SMC settings">✕</button>
      </div>
      <div class="smc-settings-body">
        <div class="smc-master-row"><strong>Indicator</strong><button type="button" class="smc-master-toggle" data-smc-master aria-pressed="false">SMC OFF</button></div>
        ${row("BOS", "bos", state.bos)}
        ${row("CHoCH", "choch", state.choch)}
        ${row("Structure High/Low", "structure", state.structure)}
        <div class="smc-settings-sub">Fibonacci</div>
        ${Object.keys(state.fibs).map((key) => row(key, `fibs.${key}`, state.fibs[key])).join("")}
        <button type="button" data-reset>Reset appearance</button>
      </div>`;

    panelHost().appendChild(panel);
    isolatePanelEvents(panel);
    bindRows(panel);
    makeDraggable(panel);
    syncMasterToggle();

    const close = panel.querySelector("[data-close]");
    close.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closePanel();
    });

    const master = panel.querySelector("[data-smc-master]");
    master.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setSmcEnabled(!smcEnabled());
    });

    panel.querySelector("[data-reset]").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state = clone(defaults);
      persist();
      closePanel();
      open();
    });
  }

  function attachButton() {
    ensureCss();
    const controls = document.querySelector(".chart-panel .chart-controls");
    if (!controls) return false;
    document.getElementById("smcOverlayToggleBtn")?.remove();
    let button = document.getElementById("smcSettingsBtn");
    if (!button) {
      button = document.createElement("button");
      button.id = "smcSettingsBtn";
      button.type = "button";
      button.className = "smc-settings-btn";
      button.textContent = "⚙";
      button.setAttribute("aria-label", "SMC settings");
      button.title = "SMC settings";
      button.addEventListener("click", open);
      controls.appendChild(button);
    } else if (!button.parentNode) {
      controls.appendChild(button);
    }
    return true;
  }

  window.FlowSignalSmcSettings = {
    get,
    set,
    open,
    close: closePanel,
    attachButton,
    syncHost,
    defaults: () => clone(defaults),
  };

  window.addEventListener("load", () => {
    attachButton();
    window.setTimeout(attachButton, 250);
  }, { once: true });
  window.addEventListener("flowsignal:smc-toggle", syncMasterToggle);
  document.addEventListener("fullscreenchange", syncHost);
  document.addEventListener("webkitfullscreenchange", syncHost);
})();
