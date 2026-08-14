(() => {
  const BASE_URL = location.hostname === "127.0.0.1" || location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://flowsignal-backend-3.onrender.com";

  let lines = [];
  let refreshing = false;

  const first = (...values) => values.find(v => v !== undefined && v !== null && v !== "");
  const asArray = value => Array.isArray(value)
    ? value.filter(Boolean)
    : value && typeof value === "object"
      ? Object.values(value).filter(v => v && typeof v === "object")
      : [];

  function activeSymbol() {
    return String(document.querySelector('.symbol-switch-btn.active')?.dataset?.symbol || 'EURUSD').toUpperCase();
  }

  function activePositions(data) {
    const candidates = [
      data?.live_positions,
      data?._meta?.live_positions,
      data?.live?.positions,
      data?.active_trades,
      data?.live_active_orders,
      data?._meta?.live_active_orders,
      data?.live?.active_orders,
    ];
    const seen = new Set();
    const out = [];
    candidates.forEach(group => asArray(group).forEach(p => {
      const key = String(first(p.position_id, p.broker_position_id, p.trade_id, p.order_id, `${p.symbol}-${p.entry}`));
      if (!seen.has(key)) {
        seen.add(key);
        out.push(p);
      }
    }));
    return out;
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
    const value = Number(price);
    if (!series || !Number.isFinite(value)) return;
    const line = series.createPriceLine({
      price: value,
      color,
      lineWidth: width,
      lineStyle: style,
      axisLabelVisible: false,
      title,
    });
    lines.push(line);
  }

  function renderLevels(data) {
    const L = window.LightweightCharts;
    const series = window.FlowSignalMobileCandleSeries;
    if (!L || !series) return;

    clearLines();
    const symbol = activeSymbol();
    const trade = activePositions(data).find(p => String(p.symbol || '').toUpperCase() === symbol);
    if (!trade) return;

    const plan = data?.[symbol] || {};
    const raw = trade?.raw && typeof trade.raw === 'object' ? trade.raw : {};
    const nestedRaw = raw?.raw && typeof raw.raw === 'object' ? raw.raw : {};

    const entry = first(trade.entry, trade.entry_price, raw.entry, nestedRaw.price, plan.entry_price);
    const sl = first(trade.current_sl, trade.sl, trade.stop_loss, trade.stopLoss, raw.stopLoss, nestedRaw.stopLoss, trade.planned_sl, trade.original_sl, trade.initial_sl, plan.stop_loss);
    const tp1 = first(trade.tp1, trade.take_profit_1, raw.tp1, nestedRaw.tp1, trade.planned_tp1, plan.tp1);
    const tp2 = first(trade.tp2, trade.take_profit_2, trade.tp2_price, trade.take_profit, trade.takeProfit, raw.tp2, raw.takeProfit, nestedRaw.tp2, nestedRaw.takeProfit, trade.planned_tp2, plan.tp2);

    addLine(entry, 'ENTRY', '#f8fafc', L.LineStyle.Solid, 2);
    addLine(sl, trade?.hit_tp1 ? 'PROTECTED SL' : 'SL', trade?.hit_tp1 ? '#facc15' : '#ef4444', L.LineStyle.Solid, trade?.hit_tp1 ? 3 : 2);
    addLine(tp1, 'TP1', '#facc15', trade?.hit_tp1 ? L.LineStyle.Solid : L.LineStyle.Dashed, trade?.hit_tp1 ? 3 : 2);
    addLine(tp2, 'TP2', '#22c55e', L.LineStyle.Solid, 2);
  }

  async function refresh() {
    if (refreshing || !window.FlowSignalMobileCandleSeries) return;
    refreshing = true;
    try {
      const response = await fetch(`${BASE_URL}/panel-data`, { credentials: 'include', cache: 'no-store' });
      if (!response.ok) return;
      renderLevels(await response.json());
    } catch (_) {
      // Keep the chart usable if the overlay refresh fails.
    } finally {
      refreshing = false;
    }
  }

  document.addEventListener('flowsignal:mobile-chart-ready', refresh);
  document.addEventListener('click', event => {
    if (event.target.closest('.symbol-switch-btn') || event.target.closest('.tf')) {
      setTimeout(refresh, 100);
    }
  });
  window.addEventListener('load', () => setTimeout(refresh, 500));
  setInterval(refresh, 5000);
})();