(() => {
  const BASE_URL = location.hostname === "127.0.0.1" || location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://flowsignal-backend-3.onrender.com";

  let levelSeries = [];
  let refreshing = false;

  const $ = id => document.getElementById(id);
  const first = (...values) => values.find(v => v !== undefined && v !== null && v !== "");
  const finite = (v, fallback = NaN) => Number.isFinite(Number(v)) ? Number(v) : fallback;

  function numberFromText(id) {
    const value = Number(String($(id)?.textContent || "").trim().replace(/,/g, ""));
    return Number.isFinite(value) ? value : null;
  }

  function activeSymbol() {
    return String(document.querySelector('.symbol-switch-btn.active')?.dataset?.symbol || 'EURUSD').toUpperCase();
  }

  function activeTimeframe() {
    return String(document.querySelector('.tf.active')?.dataset?.tf || '5m').toLowerCase();
  }

  function tradeSymbol() {
    return String($("mTradeSymbol")?.textContent || "").trim().toUpperCase();
  }

  function candleTime(v) {
    if (typeof v === "number") return v > 2e12 ? Math.floor(v / 1000) : Math.floor(v);
    const t = new Date(v).getTime();
    return Number.isFinite(t) ? Math.floor(t / 1000) : 0;
  }

  function normalizeCandles(rows) {
    return Array.isArray(rows)
      ? rows.map(c => ({
          time: candleTime(first(c.time, c.timestamp, c.ts, c.open_time, c.openTime)),
          open: finite(c.open),
          high: finite(c.high),
          low: finite(c.low),
          close: finite(c.close),
        })).filter(c => c.time && [c.open, c.high, c.low, c.close].every(Number.isFinite)).sort((a, b) => a.time - b.time)
      : [];
  }

  function aggregate(rows, seconds) {
    const map = new Map();
    rows.forEach(c => {
      const time = Math.floor(c.time / seconds) * seconds;
      const existing = map.get(time);
      if (!existing) map.set(time, { ...c, time });
      else {
        existing.high = Math.max(existing.high, c.high);
        existing.low = Math.min(existing.low, c.low);
        existing.close = c.close;
      }
    });
    return [...map.values()].sort((a, b) => a.time - b.time);
  }

  function rawCandles(data, symbol, tf) {
    return first(
      data?.candles?.[symbol]?.[tf],
      data?.[symbol]?.candles?.[tf],
      data?.market_data?.[symbol]?.[tf],
      []
    ) || [];
  }

  function candlesFor(data, symbol, tf) {
    const direct = normalizeCandles(rawCandles(data, symbol, tf));
    if (direct.length) return direct;
    const hourly = normalizeCandles(rawCandles(data, symbol, "1h"));
    if (tf === "4h") return aggregate(hourly, 14400);
    if (tf === "1d") return aggregate(hourly, 86400);
    return [];
  }

  function clearLevels() {
    const chart = window.FlowSignalMobileChart;
    if (chart) {
      levelSeries.forEach(series => {
        try { chart.removeSeries(series); } catch (_) {}
      });
    }
    levelSeries = [];
  }

  function addLevel(firstTime, lastTime, price, color, style, width = 2) {
    const chart = window.FlowSignalMobileChart;
    if (!chart || !Number.isFinite(price) || !firstTime || !lastTime) return;

    try {
      const series = chart.addLineSeries({
        priceScaleId: "",
        color,
        lineWidth: width,
        lineStyle: style,
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: false,
      });
      series.setData([
        { time: firstTime, value: price },
        { time: lastTime, value: price },
      ]);
      levelSeries.push(series);
    } catch (error) {
      console.warn("Mobile trade level series failed", error);
    }
  }

  function renderLevels(data) {
    const L = window.LightweightCharts;
    const chart = window.FlowSignalMobileChart;
    if (!L || !chart) return;

    clearLevels();

    const symbol = activeSymbol();
    if (tradeSymbol() !== symbol) return;

    const rows = candlesFor(data, symbol, activeTimeframe());
    if (rows.length < 2) return;

    const firstTime = rows[0].time;
    const lastTime = rows[rows.length - 1].time;
    const entry = numberFromText("mEntry");
    const sl = numberFromText("mSl");
    const tp1 = numberFromText("mTp1");
    const tp2 = numberFromText("mTp2");

    addLevel(firstTime, lastTime, entry, "#f8fafc", L.LineStyle.Solid, 2);
    addLevel(firstTime, lastTime, sl, "#ef4444", L.LineStyle.Solid, 2);
    addLevel(firstTime, lastTime, tp1, "#facc15", L.LineStyle.Dashed, 2);
    addLevel(firstTime, lastTime, tp2, "#22c55e", L.LineStyle.Solid, 2);
  }

  async function refresh() {
    if (refreshing || !window.FlowSignalMobileChart) return;
    refreshing = true;
    try {
      const response = await fetch(`${BASE_URL}/panel-data`, { credentials: "include", cache: "no-store" });
      if (!response.ok) return;
      renderLevels(await response.json());
    } catch (error) {
      console.warn("Mobile trade levels refresh failed", error);
    } finally {
      refreshing = false;
    }
  }

  document.addEventListener("flowsignal:mobile-chart-ready", () => setTimeout(refresh, 50));
  document.addEventListener("click", event => {
    if (event.target.closest(".symbol-switch-btn") || event.target.closest(".tf")) {
      setTimeout(refresh, 150);
    }
  });
  window.addEventListener("load", () => setTimeout(refresh, 700));

  const observer = new MutationObserver(() => {
    if (window.FlowSignalMobileChart) setTimeout(refresh, 50);
  });
  ["mTradeSymbol", "mEntry", "mSl", "mTp1", "mTp2"].forEach(id => {
    const node = $(id);
    if (node) observer.observe(node, { childList: true, characterData: true, subtree: true });
  });

  setInterval(refresh, 3000);
})();