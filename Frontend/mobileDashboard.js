(() => {
  const BASE_URL =
    location.hostname === "127.0.0.1" || location.hostname === "localhost"
      ? "http://127.0.0.1:8001"
      : "https://flowsignal-backend-3.onrender.com";

  const state = {
    symbol: "EURUSD",
    timeframe: "5m",
    panel: null,
    chart: null,
    series: null,
    loading: false,
  };

  const $ = (id) => document.getElementById(id);
  const first = (...values) => values.find((v) => v !== undefined && v !== null && v !== "");
  const finite = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function money(value) {
    const n = finite(value);
    return `${n >= 0 ? "+" : "-"}$${Math.abs(n).toFixed(2)}`;
  }

  function colorMoney(el, value) {
    if (!el) return;
    const n = finite(value);
    el.classList.toggle("positive", n >= 0);
    el.classList.toggle("negative", n < 0);
    el.textContent = money(n);
  }

  function normalizeSignal(value) {
    const raw = String(value || "WAIT").trim().toUpperCase();
    if (raw.includes("BUY")) return "BUY";
    if (raw.includes("SELL")) return "SELL";
    return "WAIT";
  }

  function normalizeSide(value) {
    const raw = String(value || "").trim().toUpperCase();
    if (["1", "BUY", "LONG"].includes(raw)) return "BUY";
    if (["2", "SELL", "SHORT"].includes(raw)) return "SELL";
    return raw || "--";
  }

  function formatPrice(value, symbol = state.symbol) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "--";
    return n.toFixed(symbol === "XAUUSD" ? 2 : 5);
  }

  function setSignalVisual(el, signal) {
    if (!el) return;
    el.textContent = signal;
    el.dataset.signal = signal;
  }

  function setMeter(prefix, buy, sell, strength) {
    [["Buy", buy], ["Sell", sell], ["Str", strength]].forEach(([name, value]) => {
      const pct = Math.max(0, Math.min(100, finite(value)));
      const bar = $(`m${prefix}${name}`);
      const text = $(`m${prefix}${name}Text`);
      if (bar) bar.style.width = `${pct}%`;
      if (text) text.textContent = `${Math.round(pct)}%`;
    });
  }

  function renderSignals(data) {
    const eur = data?.EURUSD || {};
    const gold = data?.XAUUSD || {};
    setSignalVisual($("mEurSignal"), normalizeSignal(first(eur.strategy_decision, eur.display_signal, eur.final_signal, eur.signal)));
    setSignalVisual($("mGoldSignal"), normalizeSignal(first(gold.strategy_decision, gold.display_signal, gold.final_signal, gold.signal)));
    setMeter("Eur", first(eur.buy_pct, eur.buy_percentage, 0), first(eur.sell_pct, eur.sell_percentage, 0), first(eur.confidence, eur.bias_strength, 0));
    setMeter("Gold", first(gold.buy_pct, gold.buy_percentage, 0), first(gold.sell_pct, gold.sell_percentage, 0), first(gold.confidence, gold.bias_strength, 0));
  }

  function extractMeta(data) {
    return first(data?.live_meta, data?.meta, data?.live, {}) || {};
  }

  function extractPl(data) {
    const meta = extractMeta(data);
    return first(
      data?.live_pl_sync,
      meta?.live_pl_sync,
      data?.performance?.live_pl_sync,
      data?.live?.pl_sync,
      {}
    ) || {};
  }

  function asPositionArray(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (value && typeof value === "object") return Object.values(value).filter((item) => item && typeof item === "object");
    return [];
  }

  function extractPositions(data) {
    const meta = extractMeta(data);
    const sources = [
      data?.live_positions,
      data?.live_active_orders,
      data?.active_trades,
      data?.live?.positions,
      data?.live?.active_orders,
      meta?.live_positions,
      meta?.live_active_orders,
      meta?.active_trades,
    ];
    for (const source of sources) {
      const rows = asPositionArray(source);
      if (rows.length) return rows;
    }
    return [];
  }

  function renderPerformance(data) {
    const pl = extractPl(data);
    const positions = extractPositions(data);
    colorMoney($("mDaily"), first(pl.daily_total_pl, pl.daily_realized_pl, data?.daily_pl, 0));
    colorMoney($("mWeekly"), first(pl.weekly_total_pl, pl.weekly_realized_pl, data?.weekly_pl, 0));
    colorMoney($("mLive"), first(pl.floating_live_pl, pl.floating_pnl, data?.floating_live_pl, 0));
    $("mOpenCount").textContent = String(first(pl.open_positions_count, data?.open_positions_count, positions.length, 0));
  }

  function chosenPosition(data) {
    const positions = extractPositions(data);
    if (!positions.length) return null;
    return positions.find((p) => String(p?.symbol || "").toUpperCase() === state.symbol) || positions[0];
  }

  function renderTrade(data) {
    const p = chosenPosition(data);
    const empty = $("mTradeEmpty");
    const body = $("mTradeBody");
    if (!p) {
      empty.classList.remove("hidden");
      body.classList.add("hidden");
      return;
    }

    empty.classList.add("hidden");
    body.classList.remove("hidden");
    const symbol = String(first(p.symbol, state.symbol)).toUpperCase();
    const side = normalizeSide(first(p.side, p.action, p.tradeSide));
    $("mTradeSymbol").textContent = symbol;
    $("mTradeSide").textContent = side;
    $("mTradeSide").dataset.side = side;
    colorMoney($("mTradePnl"), first(p.floating_pl, p.floating_pnl, p.broker_pnl, p.pnl, p.profit, 0));
    $("mLot").textContent = first(p.display_lots, p.lots, p.volume_lots, p.lot_size, p.volume, "--");
    $("mEntry").textContent = formatPrice(first(p.entry, p.entry_price), symbol);
    $("mSl").textContent = formatPrice(first(p.current_sl, p.sl, p.stop_loss), symbol);
    $("mTp1").textContent = formatPrice(p.tp1, symbol);
    $("mTp2").textContent = formatPrice(first(p.tp2, p.take_profit), symbol);
  }

  function rawCandles(data, symbol, timeframe) {
    return first(
      data?.candles?.[symbol]?.[timeframe],
      data?.[symbol]?.candles?.[timeframe],
      data?.market_data?.[symbol]?.[timeframe],
      []
    ) || [];
  }

  function candleTime(rawTime) {
    if (typeof rawTime === "number") {
      if (rawTime > 2e12) return Math.floor(rawTime / 1000);
      if (rawTime > 2e9) return Math.floor(rawTime);
      return Math.floor(rawTime);
    }
    const parsed = new Date(rawTime).getTime();
    return Number.isFinite(parsed) ? Math.floor(parsed / 1000) : 0;
  }

  function normalizeCandles(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map((c) => ({
      time: candleTime(first(c.time, c.timestamp, c.ts, c.open_time, c.openTime)),
      open: finite(c.open, NaN),
      high: finite(c.high, NaN),
      low: finite(c.low, NaN),
      close: finite(c.close, NaN),
    })).filter((c) => c.time && [c.open, c.high, c.low, c.close].every(Number.isFinite))
      .sort((a, b) => a.time - b.time);
  }

  function aggregateCandles(rows, bucketSeconds) {
    const buckets = new Map();
    rows.forEach((c) => {
      const bucket = Math.floor(c.time / bucketSeconds) * bucketSeconds;
      const existing = buckets.get(bucket);
      if (!existing) {
        buckets.set(bucket, { time: bucket, open: c.open, high: c.high, low: c.low, close: c.close });
      } else {
        existing.high = Math.max(existing.high, c.high);
        existing.low = Math.min(existing.low, c.low);
        existing.close = c.close;
      }
    });
    return [...buckets.values()].sort((a, b) => a.time - b.time);
  }

  function candleArray(data, symbol, timeframe) {
    const direct = normalizeCandles(rawCandles(data, symbol, timeframe));
    if (direct.length) return direct;
    const hourly = normalizeCandles(rawCandles(data, symbol, "1h"));
    if (timeframe === "4h" && hourly.length) return aggregateCandles(hourly, 4 * 60 * 60);
    if (timeframe === "1d" && hourly.length) return aggregateCandles(hourly, 24 * 60 * 60);
    return [];
  }

  function ensureChart() {
    const host = $("mobileChart");
    if (!host || !window.LightweightCharts) return false;
    if (!state.chart) {
      state.chart = LightweightCharts.createChart(host, {
        autoSize: true,
        layout: { background: { color: "#06101b" }, textColor: "#8fa0b6" },
        grid: { vertLines: { color: "#142238" }, horzLines: { color: "#142238" } },
        rightPriceScale: { borderColor: "#22344b", scaleMargins: { top: 0.12, bottom: 0.12 } },
        timeScale: { borderColor: "#22344b", timeVisible: true, secondsVisible: false, rightOffset: 4 },
        handleScale: true,
        handleScroll: true,
      });
      state.series = state.chart.addCandlestickSeries({
        upColor: "#2fb7a3",
        downColor: "#ef5b5b",
        wickUpColor: "#2fb7a3",
        wickDownColor: "#ef5b5b",
        borderVisible: false,
        priceLineVisible: true,
      });
    }
    return true;
  }

  function renderChart() {
    if (!state.panel || !ensureChart()) return;
    const rows = candleArray(state.panel, state.symbol, state.timeframe);
    $("mChartTitle").textContent = `${state.symbol} · ${state.timeframe}`;
    if (!rows.length) {
      $("mOhlc").textContent = "Waiting for candles";
      state.series.setData([]);
      return;
    }
    state.series.setData(rows);
    state.chart.timeScale().fitContent();
    const c = rows[rows.length - 1];
    $("mOhlc").textContent = `O ${formatPrice(c.open)} H ${formatPrice(c.high)} L ${formatPrice(c.low)} C ${formatPrice(c.close)}`;
  }

  function smcIntel(data, symbol = state.symbol) {
    const plan = data?.[symbol] || {};
    return first(plan.smc_plan_intel, plan.smc_intel, plan.smc, {}) || {};
  }

  function renderSmc(data) {
    const plan = data?.[state.symbol] || {};
    const intel = smcIntel(data);
    const structure = first(intel.market_structure, intel.structure, plan.market_structure, plan.market_bias, plan.trend, "--");
    const trigger = first(intel.next_trigger, plan.next_trigger, plan.execution_status, plan.strategy_decision, plan.signal, "--");
    $("mSmcStructure").textContent = String(structure).replaceAll("_", " ");
    $("mSmcTrigger").textContent = String(trigger).replaceAll("_", " ");
  }

  function renderConnection(ok, detail) {
    const el = $("mobileConnection");
    if (!el) return;
    el.textContent = ok ? "● LIVE" : detail || "OFFLINE";
    el.classList.toggle("negative", !ok);
  }

  function renderAll(data) {
    renderSignals(data);
    renderPerformance(data);
    renderTrade(data);
    renderSmc(data);
    renderChart();
  }

  async function loadPanel() {
    if (state.loading) return;
    state.loading = true;
    try {
      const res = await fetch(`${BASE_URL}/panel-data`, { credentials: "include", cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.panel = data;
      renderAll(data);
      renderConnection(true);
    } catch (error) {
      renderConnection(false, "Connection issue");
      console.error("mobile panel load failed", error);
    } finally {
      state.loading = false;
    }
  }

  function detailRow(label, value) {
    if (value === undefined || value === null || value === "") return "";
    const shown = typeof value === "object" ? JSON.stringify(value) : String(value);
    return `<div class="detail-row"><span>${escapeHtml(String(label).replaceAll("_", " "))}</span><strong>${escapeHtml(shown)}</strong></div>`;
  }

  function openDetailShell(title, html) {
    $("mobileDetailTitle").textContent = title;
    $("mobileDetailBody").innerHTML = html;
    $("mobileDetail").classList.remove("hidden");
  }

  function renderSmcDetail() {
    const plan = state.panel?.[state.symbol] || {};
    const intel = smcIntel(state.panel);
    const rows = [
      ["Market structure", first(intel.market_structure, intel.structure, plan.market_structure)],
      ["Next trigger", first(intel.next_trigger, plan.next_trigger)],
      ["Entry zone", first(intel.next_entry_zone, intel.entry_zone, plan.entry)],
      ["Estimated SL", first(intel.estimated_sl, plan.sl)],
      ["Estimated TP", first(intel.estimated_tp, plan.tp2)],
      ["Progress", first(intel.progress, intel.progress_pct)],
      ["Strategy decision", first(plan.strategy_decision, plan.signal)],
      ["Reason", first(plan.strategy_reason, plan.blocked_reason, plan.reason)],
    ];
    const waiting = first(intel.waiting_for, intel.waiting, []);
    let html = `<div class="detail-card"><h3>SMC Plan · ${state.symbol}</h3>${rows.map(([k,v]) => detailRow(k,v)).join("")}`;
    if (Array.isArray(waiting) && waiting.length) {
      html += `<div class="detail-list"><h4>Waiting for</h4>${waiting.map((x) => `<p>✓ ${escapeHtml(typeof x === "object" ? first(x.label, x.name, JSON.stringify(x)) : x)}</p>`).join("")}</div>`;
    }
    html += "</div>";
    openDetailShell("SMC Plan", html);
  }

  async function renderV2Detail() {
    openDetailShell("V2 Shadow", '<div class="detail-card"><h3>V2 Shadow</h3><p>Loading…</p></div>');
    try {
      const [summaryRes, historyRes] = await Promise.all([
        fetch(`${BASE_URL}/shadow/v2/summary?symbol=${encodeURIComponent(state.symbol)}`, { credentials: "include", cache: "no-store" }),
        fetch(`${BASE_URL}/shadow/v2/history?symbol=${encodeURIComponent(state.symbol)}&limit=8`, { credentials: "include", cache: "no-store" }),
      ]);
      if (!summaryRes.ok) throw new Error(`summary ${summaryRes.status}`);
      const summary = await summaryRes.json();
      const history = historyRes.ok ? await historyRes.json() : { items: [] };
      const rows = [
        ["V1 current", first(summary.v1_current, summary.v1_decision, summary.v1?.decision)],
        ["V2 current", first(summary.v2_current, summary.v2_decision, summary.current_decision)],
        ["Reason", first(summary.v2_reason, summary.reason, summary.current_reason)],
        ["Extension", first(summary.extension_atr, summary.extension)],
        ["Post-SL reset", first(summary.post_sl_reset, summary.reset_state)],
        ["V2 trades", first(summary.v2_trades, summary.trades)],
        ["Wins / losses", first(summary.wins_losses, summary.record)],
        ["Net R", first(summary.net_r, summary.r_result)],
      ];
      const items = Array.isArray(history.items) ? history.items : [];
      let html = `<div class="detail-card"><h3>V2 Shadow · ${state.symbol}</h3><p class="warning">SHADOW — DOES NOT PLACE ORDERS</p>${rows.map(([k,v]) => detailRow(k,v)).join("")}</div>`;
      if (items.length) {
        html += `<div class="detail-card"><h3>Recent shadow evaluations</h3>${items.map((item) => detailRow(first(item.evaluated_at, item.entry_timestamp, "Evaluation"), `${first(item.v2_decision, item.decision, "--")} · ${first(item.v2_reason, item.reason, "")}`)).join("")}</div>`;
      }
      openDetailShell("V2 Shadow", html);
    } catch (error) {
      openDetailShell("V2 Shadow", `<div class="detail-card"><h3>V2 Shadow</h3><p>V2 data unavailable right now.</p><small>${escapeHtml(error.message)}</small></div>`);
    }
  }

  async function renderFundamentalDetail() {
    openDetailShell("Fundamental Insight", '<div class="detail-card"><h3>Fundamental Insight</h3><p>Loading…</p></div>');
    try {
      const res = await fetch(`${BASE_URL}/fundamentals/insight?symbol=${encodeURIComponent(state.symbol)}`, { credentials: "include", cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const insight = await res.json();
      const rows = [
        ["Bias", first(insight.overall_bias, insight.bias, insight.direction)],
        ["Confidence", first(insight.confidence_pct, insight.confidence)],
        ["USD strength", first(insight.usd_strength, insight.primary_strength)],
        [state.symbol === "EURUSD" ? "EUR strength" : "Gold strength", first(insight.eur_strength, insight.gold_strength, insight.secondary_strength)],
        ["Guidance", first(insight.trading_guidance, insight.guidance, insight.preference)],
        ["Next event", first(insight.next_high_impact_event?.name, insight.next_event?.name, insight.next_event)],
        ["Updated", first(insight.calculated_at, insight.updated_at, insight.last_update)],
      ];
      const reasons = first(insight.reasons, insight.why_this_bias, insight.evidence, []);
      let html = `<div class="detail-card"><h3>Fundamental Insight · ${state.symbol}</h3>${rows.map(([k,v]) => detailRow(k,v)).join("")}</div>`;
      if (Array.isArray(reasons) && reasons.length) {
        html += `<div class="detail-card"><h3>Why this bias?</h3>${reasons.slice(0,10).map((r) => `<p>${escapeHtml(typeof r === "object" ? first(r.title, r.label, r.reason, JSON.stringify(r)) : r)}</p>`).join("")}</div>`;
      }
      openDetailShell("Fundamental Insight", html);
    } catch (error) {
      openDetailShell("Fundamental Insight", `<div class="detail-card"><h3>Fundamental Insight</h3><p>Fundamental data unavailable right now.</p><small>${escapeHtml(error.message)}</small></div>`);
    }
  }

  function renderHistoryDetail() {
    const meta = extractMeta(state.panel);
    const history = first(
      state.panel?.live_recent_history,
      state.panel?.recent_signal_history,
      state.panel?.signal_history,
      meta?.live_recent_history,
      meta?.recent_signal_history,
      []
    );
    const items = Array.isArray(history) ? history : [];
    const html = `<div class="detail-card"><h3>Recent Signals</h3>${items.slice(0,30).map((x) => {
      const left = `${first(x.time, x.timestamp, "")} ${first(x.symbol, "")} ${normalizeSignal(first(x.signal, x.side, "WAIT"))}`.trim();
      const right = `${first(x.result, x.status, "")} ${x.pips !== undefined ? `${x.pips} pips` : ""}`.trim();
      return detailRow(left, right || "--");
    }).join("") || "<p>No recent signal history.</p>"}</div>`;
    openDetailShell("Signal History", html);
  }

  function showDetail(kind) {
    if (kind === "smc") return renderSmcDetail();
    if (kind === "v2") return renderV2Detail();
    if (kind === "history") return renderHistoryDetail();
    return renderFundamentalDetail();
  }

  function selectSymbol(symbol) {
    state.symbol = symbol === "XAUUSD" ? "XAUUSD" : "EURUSD";
    document.querySelectorAll(".symbol-tab").forEach((btn) => btn.classList.toggle("active", btn.dataset.symbol === state.symbol));
    renderTrade(state.panel);
    renderSmc(state.panel);
    renderChart();
  }

  function selectTimeframe(timeframe) {
    state.timeframe = ["5m", "15m", "1h", "4h", "1d"].includes(timeframe) ? timeframe : "5m";
    document.querySelectorAll(".tf").forEach((btn) => btn.classList.toggle("active", btn.dataset.tf === state.timeframe));
    renderChart();
  }

  function bindUi() {
    $("mobileMenuBtn").onclick = () => {
      $("mobileMenu").classList.remove("hidden");
      $("mobileMenu").setAttribute("aria-hidden", "false");
    };
    $("mobileMenuClose").onclick = () => {
      $("mobileMenu").classList.add("hidden");
      $("mobileMenu").setAttribute("aria-hidden", "true");
    };
    $("mobileDetailClose").onclick = () => $("mobileDetail").classList.add("hidden");
    $("mSmcBtn").onclick = () => showDetail("smc");

    document.querySelectorAll("#mobileMenu [data-panel]").forEach((btn) => {
      btn.onclick = () => {
        $("mobileMenu").classList.add("hidden");
        showDetail(btn.dataset.panel);
      };
    });

    document.querySelectorAll(".signal-card[data-symbol]").forEach((card) => {
      card.addEventListener("click", () => selectSymbol(card.dataset.symbol));
    });
    document.querySelectorAll(".symbol-tab").forEach((btn) => {
      btn.onclick = () => selectSymbol(btn.dataset.symbol);
    });
    document.querySelectorAll(".tf").forEach((btn) => {
      btn.onclick = () => selectTimeframe(btn.dataset.tf);
    });
  }

  bindUi();
  loadPanel();
  setInterval(loadPanel, 5000);
  window.addEventListener("load", () => setTimeout(renderChart, 350));
})();
