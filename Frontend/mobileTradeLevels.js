(() => {
  const $ = id => document.getElementById(id);
  let overlay = null;

  function numberFromText(id) {
    const value = Number(String($(id)?.textContent || "").trim().replace(/,/g, ""));
    return Number.isFinite(value) ? value : null;
  }

  function activeSymbol() {
    return String(document.querySelector('.symbol-switch-btn.active')?.dataset?.symbol || 'EURUSD').toUpperCase();
  }

  function tradeSymbol() {
    return String($("mTradeSymbol")?.textContent || "").trim().toUpperCase();
  }

  function ensureOverlay() {
    const host = $("mobileChart");
    if (!host) return null;
    if (getComputedStyle(host).position === "static") host.style.position = "relative";

    if (!overlay || !overlay.isConnected) {
      overlay = document.createElement("div");
      overlay.id = "mobileTradeLevelOverlay";
      Object.assign(overlay.style, {
        position: "absolute",
        inset: "0",
        pointerEvents: "none",
        zIndex: "20",
        overflow: "hidden",
      });
      host.appendChild(overlay);
    }
    return overlay;
  }

  function clearOverlay() {
    const layer = ensureOverlay();
    if (layer) layer.replaceChildren();
  }

  function addLevel(price, color, dashed = false) {
    const series = window.FlowSignalMobileCandleSeries;
    const layer = ensureOverlay();
    if (!series || !layer || !Number.isFinite(price)) return;

    let y = null;
    try { y = series.priceToCoordinate(price); } catch (_) {}
    if (!Number.isFinite(y)) return;

    const line = document.createElement("div");
    Object.assign(line.style, {
      position: "absolute",
      left: "0",
      right: "0",
      top: `${Math.round(y)}px`,
      height: dashed ? "0" : "2px",
      borderTop: dashed ? `2px dashed ${color}` : "none",
      background: dashed ? "transparent" : color,
      opacity: "0.98",
      boxShadow: dashed ? "none" : `0 0 2px ${color}`,
    });
    layer.appendChild(line);
  }

  function renderLevels() {
    const series = window.FlowSignalMobileCandleSeries;
    if (!series) return;

    clearOverlay();
    if (tradeSymbol() !== activeSymbol()) return;

    const entry = numberFromText("mEntry");
    const sl = numberFromText("mSl");
    const tp1 = numberFromText("mTp1");
    const tp2 = numberFromText("mTp2");

    addLevel(entry, "#f8fafc");
    addLevel(sl, "#ef4444");
    addLevel(tp1, "#facc15", true);
    addLevel(tp2, "#22c55e");
  }

  function scheduleRender(delay = 0) {
    setTimeout(() => {
      requestAnimationFrame(() => requestAnimationFrame(renderLevels));
    }, delay);
  }

  document.addEventListener("flowsignal:mobile-chart-ready", () => scheduleRender(50));
  document.addEventListener("click", event => {
    if (event.target.closest(".symbol-switch-btn") || event.target.closest(".tf")) {
      scheduleRender(180);
    }
  });

  window.addEventListener("load", () => scheduleRender(800));
  window.addEventListener("resize", () => scheduleRender(50));

  const observer = new MutationObserver(() => scheduleRender(25));
  ["mTradeSymbol", "mEntry", "mSl", "mTp1", "mTp2", "mOhlc"].forEach(id => {
    const node = $(id);
    if (node) observer.observe(node, { childList: true, characterData: true, subtree: true });
  });

  setInterval(renderLevels, 2000);
})();