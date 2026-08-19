const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

class ClassList {
  constructor(values = []) { this.values = new Set(values); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.values.has(name) : Boolean(force);
    if (enabled) this.values.add(name); else this.values.delete(name);
    return enabled;
  }
  contains(name) { return this.values.has(name); }
}

function element(classes = []) {
  const listeners = {};
  return {
    classList: new ClassList(classes),
    dataset: {},
    disabled: false,
    attributes: {},
    addEventListener(type, listener) { listeners[type] = listener; },
    dispatch(type) {
      listeners[type]?.({ preventDefault() {}, stopPropagation() {} });
    },
    setAttribute(name, value) { this.attributes[name] = value; },
  };
}

const button = element();
const sideMenu = element(["hidden"]);
const mainApp = element();
const body = element();
body.appendChild = () => {};
const documentListeners = {};
global.CustomEvent = class CustomEvent {
  constructor(type, options) { this.type = type; this.detail = options?.detail; }
};
global.document = {
  body,
  querySelector() { return null; },
  createElement() { return element(); },
  getElementById(id) {
    return { menuToggleBtn: button, sideMenu, mainApp }[id] || null;
  },
  addEventListener(type, listener) { documentListeners[type] = listener; },
  dispatchEvent(event) { documentListeners[event.type]?.(event); },
};
global.window = {
  fetch() {},
  addEventListener() {},
  setTimeout,
  clearTimeout,
};

require(path.join(__dirname, "..", "startup.js"));
assert.equal(button.dataset.flowSignalShellBound, "true", "menu binds immediately");
button.dispatch("click");
assert.equal(sideMenu.classList.contains("hidden"), false, "menu opens without API data");
assert.equal(sideMenu.classList.contains("is-open"), true);
button.dispatch("click");
assert.equal(sideMenu.classList.contains("hidden"), true, "menu closes without API data");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
assert.ok(
  html.indexOf("startup.js") < html.indexOf("apiClient.js") &&
  html.indexOf("startup.js") < html.indexOf("script.js"),
  "startup shell loads before API and dashboard code",
);
assert.match(
  html,
  /<script\s+async\s+data-flow-chart-library\s+src="https:\/\/unpkg\.com\/lightweight-charts@4\.2\.0\/dist\/lightweight-charts\.standalone\.production\.js"/,
  "the third-party chart library cannot block first-party startup modules",
);

const dashboard = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
assert.ok(
  dashboard.indexOf('let currentChartSymbol = "EURUSD"') < dashboard.indexOf("updateExecutionPageUI();"),
  "chart symbol is initialized before early execution-page rendering",
);
assert.equal(
  dashboard.includes("structure" + "Labels"),
  false,
  "language startup does not reference the removed legacy structure panel",
);
assert.ok(dashboard.includes("Promise.allSettled(Object.values(startupRequests))"));
assert.ok(
  dashboard.includes('chartLibraryScript?.addEventListener("load"') &&
  dashboard.includes('chartLibraryScript?.addEventListener("error"'),
  "chart loading is observable and retries initialization after a delayed CDN response",
);
assert.ok(
  dashboard.includes("function dashboardRuntimeActive()") &&
  dashboard.includes("if (!dashboardRuntimeActive()) return;"),
  "dashboard polling and animation work is gated while the app is hidden or inactive",
);
assert.equal(
  dashboard.includes('console.log("🔥 Raw panel data:", rawData)'),
  false,
  "large panel responses are not retained by repeated console logging",
);
assert.ok(
  dashboard.includes("translateUiAttributes(currentLang, node);") &&
  !dashboard.includes("\n      translateUiAttributes(currentLang);\n    });"),
  "live translation mutations are scoped to added subtrees instead of rescanning the full page",
);
assert.ok(
  dashboard.includes('fetch(`${BASE_URL}/modify-live-position-levels`') &&
  dashboard.includes("timeoutMs: 45000") &&
  dashboard.includes("suppressErrorPanel: true"),
  "broker level amendments use a dedicated timeout and report errors in their confirmation UI",
);
assert.ok(
  html.includes('apiClient.js?v=5'),
  "the API client cache is busted for the broker-request stability release",
);

window.fetch = (_input, init = {}) => new Promise((_resolve, reject) => {
  init.signal?.addEventListener("abort", () => {
    const error = new Error("aborted");
    error.name = "AbortError";
    reject(error);
  }, { once: true });
});
require(path.join(__dirname, "..", "apiClient.js"));

(async () => {
  await assert.rejects(
    window.FlowSignalApi.fetchWithTimeout("https://backend.invalid/panel-data", { timeoutMs: 20 }),
    (error) => error.name === "TimeoutError",
    "a pending startup request settles by timeout",
  );
  await assert.rejects(
    window.FlowSignalApi.fetch("https://backend.invalid/news-impact?symbol=EURUSD", {
      timeoutMs: 20,
      suppressErrorPanel: true,
    }),
    (error) => error.name === "TimeoutError",
    "optional news timeout still settles",
  );
  assert.equal(
    window.FlowSignalApi.getState().errorMessage,
    null,
    "optional news timeout does not create a global API error",
  );
  await assert.rejects(
    window.FlowSignalApi.fetch("https://backend.invalid/ctrader-status", {
      timeoutMs: 20,
    }),
    (error) => error.name === "TimeoutError",
    "broker status timeout still settles",
  );
  assert.equal(
    window.FlowSignalApi.getState().errorMessage,
    null,
    "broker status timeout does not create a global API error",
  );
  await assert.rejects(
    window.FlowSignalApi.fetch("https://backend.invalid/modify-live-position-levels", {
      timeoutMs: 20,
    }),
    (error) => error.name === "TimeoutError",
    "broker amendment timeout still settles",
  );
  assert.equal(
    window.FlowSignalApi.getState().errorMessage,
    null,
    "broker amendment failures stay out of the global API error panel",
  );
  console.log("startup resilience tests passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
