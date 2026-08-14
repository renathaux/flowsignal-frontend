(() => {
  let lines = [];

  const $ = id => document.getElementById(id);

  function numberFromText(id) {
    const text = String($(id)?.textContent || "").trim().replace(/,/g, "");
    const value = Number(text);
    return Number.isFinite(value) ? value : null;
  }

  function activeSymbol() {
    return String(document.querySelector('.symbol-switch-btn.active')?.dataset?.symbol || 'EURUSD').toUpperCase();
  }

  function tradeSymbol() {
    return String($("mTradeSymbol")?.textContent || "").trim().toUpperCase();
  }

  function clearLines() {
    const series = window.FlowSignalMobileCandleSeries;
    if (series) {
      lines.forEach(line => {
        try { series.removePriceLine(line); } catch (_) {}
      });
    }
    lines = [];
  }

  function addLine(price, title, color, style, width = 2) {
    const series = window.FlowSignalMobileCandleSeries;
    if (!series || !Number.isFinite(price)) return;

    try {
      const line = series.createPriceLine({
        price,
        color,
        lineWidth: width,
        lineStyle: style,
        axisLabelVisible: false,
        title,
      });
      lines.push(line);
    } catch (error) {
      console.warn("Mobile trade level line failed", title, error);
    }
  }

  function renderLevels() {
    const L = window.LightweightCharts;
    const series = window.FlowSignalMobileCandleSeries;
    if (!L || !series) return;

    clearLines();

    if (tradeSymbol() !== activeSymbol()) return;

    const entry = numberFromText("mEntry");
    const sl = numberFromText("mSl");
    const tp1 = numberFromText("mTp1");
    const tp2 = numberFromText("mTp2");

    addLine(entry, "ENTRY", "#f8fafc", L.LineStyle.Solid, 2);
    addLine(sl, "SL", "#ef4444", L.LineStyle.Solid, 2);
    addLine(tp1, "TP1", "#facc15", L.LineStyle.Dashed, 2);
    addLine(tp2, "TP2", "#22c55e", L.LineStyle.Solid, 2);
  }

  document.addEventListener("flowsignal:mobile-chart-ready", () => {
    setTimeout(renderLevels, 50);
  });

  document.addEventListener("click", event => {
    if (event.target.closest(".symbol-switch-btn") || event.target.closest(".tf")) {
      setTimeout(renderLevels, 150);
    }
  });

  window.addEventListener("load", () => {
    setTimeout(renderLevels, 700);
  });

  const observer = new MutationObserver(() => {
    if (window.FlowSignalMobileCandleSeries) renderLevels();
  });

  ["mTradeSymbol", "mEntry", "mSl", "mTp1", "mTp2"].forEach(id => {
    const node = $(id);
    if (node) observer.observe(node, { childList: true, characterData: true, subtree: true });
  });

  setInterval(renderLevels, 3000);
})();