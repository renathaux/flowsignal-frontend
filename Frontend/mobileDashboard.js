(() => {
  const BASE_URL = location.hostname === "127.0.0.1" || location.hostname === "localhost" ? "http://127.0.0.1:8001" : "https://flowsignal-backend-3.onrender.com";
  const state = { symbol: "EURUSD", timeframe: "5m", panel: null, chart: null, series: null };
  const $ = (id) => document.getElementById(id);
  const money = (v) => `${Number(v || 0) >= 0 ? "+" : "-"}$${Math.abs(Number(v || 0)).toFixed(2)}`;
  const num = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;
  const first = (...values) => values.find((v) => v !== undefined && v !== null && v !== "");

  function colorMoney(el, value) {
    if (!el) return;
    const n = num(value);
    el.classList.toggle("positive", n >= 0);
    el.classList.toggle("negative", n < 0);
    el.textContent = money(n);
  }

  function setMeter(prefix, buy, sell, strength) {
    const values = [["Buy", buy], ["Sell", sell], ["Str", strength]];
    values.forEach(([name, value]) => {
      const pct = Math.max(0, Math.min(100, num(value)));
      const bar = $(`m${prefix}${name}`);
      const text = $(`m${prefix}${name}Text`);
      if (bar) bar.style.width = `${pct}%`;
      if (text) text.textContent = `${Math.round(pct)}%`;
    });
  }

  function renderSignals(data) {
    const eur = data?.EURUSD || {};
    const gold = data?.XAUUSD || {};
    $("mEurSignal").textContent = String(first(eur.strategy_decision, eur.signal, "WAIT")).replace("_EXECUTED", "");
    $("mGoldSignal").textContent = String(first(gold.strategy_decision, gold.signal, "WAIT")).replace("_EXECUTED", "");
    setMeter("Eur", first(eur.buy_pct, eur.buy_percentage, 0), first(eur.sell_pct, eur.sell_percentage, 0), eur.confidence || 0);
    setMeter("Gold", first(gold.buy_pct, gold.buy_percentage, 0), first(gold.sell_pct, gold.sell_percentage, 0), gold.confidence || 0);
  }

  function extractMeta(data) {
    return data?.live_meta || data?.meta || data || {};
  }

  function extractPl(data) {
    const meta = extractMeta(data);
    return first(meta.live_pl_sync, data?.live_pl_sync, {}) || {};
  }

  function extractPositions(data) {
    const meta = extractMeta(data);
    const candidates = [meta.live_positions, data?.live_positions, data?.active_trades, meta.active_trades];
    return candidates.find(Array.isArray) || [];
  }

  function renderPerformance(data) {
    const pl = extractPl(data);
    colorMoney($("mDaily"), first(pl.daily_total_pl, pl.daily_realized_pl, 0));
    colorMoney($("mWeekly"), first(pl.weekly_total_pl, pl.weekly_realized_pl, 0));
    colorMoney($("mLive"), first(pl.floating_live_pl, pl.floating_pnl, 0));
    $("mOpenCount").textContent = String(first(pl.open_positions_count, extractPositions(data).length, 0));
  }

  function normalizeSide(v) {
    const s = String(v || "").toUpperCase();
    if (["1", "BUY", "LONG"].includes(s)) return "BUY";
    if (["2", "SELL", "SHORT"].includes(s)) return "SELL";
    return s || "--";
  }

  function renderTrade(data) {
    const positions = extractPositions(data);
    const p = positions[0];
    const empty = $("mTradeEmpty");
    const body = $("mTradeBody");
    if (!p) {
      empty.classList.remove("hidden");
      body.classList.add("hidden");
      return;
    }
    empty.classList.add("hidden");
    body.classList.remove("hidden");
    const side = normalizeSide(first(p.side, p.action, p.tradeSide));
    $("mTradeSymbol").textContent = first(p.symbol, "--");
    $("mTradeSide").textContent = side;
    colorMoney($("mTradePnl"), first(p.floating_pl, p.floating_pnl, p.pnl, p.profit, 0));
    $("mLot").textContent = first(p.display_lots, p.lots, p.volume_lots, p.volume, "--");
    $("mEntry").textContent = first(p.entry, p.entry_price, "--");
    $("mSl").textContent = first(p.sl, p.stop_loss, "--");
    $("mTp1").textContent = first(p.tp1, "--");
    $("mTp2").textContent = first(p.tp2, p.take_profit, "--");
  }

  function candleArray(data, symbol, timeframe) {
    const candles = data?.candles?.[symbol]?.[timeframe] || data?.[symbol]?.candles?.[timeframe] || [];
    if (!Array.isArray(candles)) return [];
    return candles.map((c) => {
      const rawTime = first(c.time, c.timestamp, c.ts, c.open_time, c.openTime);
      const t = typeof rawTime === "number" ? (rawTime > 2e12 ? Math.floor(rawTime / 1000) : Math.floor(rawTime)) : Math.floor(new Date(rawTime).getTime() / 1000);
      return { time: t, open: num(c.open), high: num(c.high), low: num(c.low), close: num(c.close) };
    }).filter((c) => c.time && c.open && c.high && c.low && c.close).sort((a,b) => a.time - b.time);
  }

  function ensureChart() {
    const host = $("mobileChart");
    if (!host || !window.LightweightCharts) return false;
    if (!state.chart) {
      state.chart = LightweightCharts.createChart(host, {
        autoSize: true,
        layout: { background: { color: "#06101b" }, textColor: "#8fa0b6" },
        grid: { vertLines: { color: "#142238" }, horzLines: { color: "#142238" } },
        rightPriceScale: { borderColor: "#22344b" },
        timeScale: { borderColor: "#22344b", timeVisible: true, secondsVisible: false }
      });
      state.series = state.chart.addCandlestickSeries({ upColor: "#2fb7a3", downColor: "#ef5b5b", wickUpColor: "#2fb7a3", wickDownColor: "#ef5b5b", borderVisible: false });
    }
    return true;
  }

  function renderChart() {
    if (!state.panel || !ensureChart()) return;
    const rows = candleArray(state.panel, state.symbol, state.timeframe);
    $("mChartTitle").textContent = `${state.symbol} · ${state.timeframe}`;
    if (rows.length) {
      state.series.setData(rows);
      state.chart.timeScale().fitContent();
      const c = rows[rows.length - 1];
      $("mOhlc").textContent = `O ${c.open} H ${c.high} L ${c.low} C ${c.close}`;
    }
  }

  function renderSmc(data) {
    const plan = data?.[state.symbol] || {};
    const intel = plan.smc_plan_intel || plan.smc || plan;
    const structure = first(intel.market_structure, intel.structure, plan.market_structure, plan.trend, "--");
    const trigger = first(intel.next_trigger, plan.next_trigger, plan.execution_status, plan.strategy_decision, plan.signal, "--");
    $("mSmcStructure").textContent = String(structure).replaceAll("_", " ");
    $("mSmcTrigger").textContent = String(trigger).replaceAll("_", " ");
  }

  function renderConnection(ok, detail) {
    const el = $("mobileConnection");
    el.textContent = ok ? "● LIVE" : detail || "OFFLINE";
    el.classList.toggle("negative", !ok);
  }

  async function loadPanel() {
    try {
      const res = await fetch(`${BASE_URL}/panel-data`, { credentials: "include", cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.panel = data;
      renderSignals(data); renderPerformance(data); renderTrade(data); renderSmc(data); renderChart(); renderConnection(true);
    } catch (error) {
      renderConnection(false, "Connection issue");
      console.error("mobile panel load failed", error);
    }
  }

  function showDetail(kind) {
    const detail = $("mobileDetail");
    const title = $("mobileDetailTitle");
    const body = $("mobileDetailBody");
    const plan = state.panel?.[state.symbol] || {};
    detail.classList.remove("hidden");
    if (kind === "smc") {
      title.textContent = "SMC Plan";
      body.innerHTML = `<div class="detail-card"><h3>${state.symbol}</h3>${Object.entries(plan.smc_plan_intel || plan.smc || {}).map(([k,v]) => `<div class="detail-row"><span>${k.replaceAll("_"," ")}</span><strong>${typeof v === "object" ? JSON.stringify(v) : v}</strong></div>`).join("") || "<p>No SMC detail available.</p>"}</div>`;
    } else if (kind === "v2") {
      title.textContent = "V2 Shadow";
      body.innerHTML = '<div class="detail-card"><h3>V2 Shadow</h3><p>Loading…</p></div>';
      fetch(`${BASE_URL}/shadow/v2/summary?symbol=${state.symbol}`, { credentials:"include", cache:"no-store" }).then(r=>r.json()).then(v=>{body.innerHTML=`<div class="detail-card"><h3>V2 Shadow · ${state.symbol}</h3>${Object.entries(v).map(([k,val])=>`<div class="detail-row"><span>${k.replaceAll("_"," ")}</span><strong>${typeof val === "object" ? JSON.stringify(val) : val}</strong></div>`).join("")}</div>`}).catch(()=>{body.innerHTML='<div class="detail-card"><p>V2 data unavailable.</p></div>'});
    } else if (kind === "history") {
      title.textContent = "Signal History";
      const history = first(state.panel?.live_recent_history, extractMeta(state.panel).live_recent_history, []);
      body.innerHTML = `<div class="detail-card"><h3>Recent Signals</h3>${(Array.isArray(history)?history:[]).slice(0,20).map(x=>`<div class="detail-row"><span>${first(x.symbol,"")} ${first(x.signal,x.side,"")}</span><strong>${first(x.result,x.status,"")}</strong></div>`).join("") || "<p>No recent signals.</p>"}</div>`;
    } else {
      title.textContent = "Fundamental Insight";
      body.innerHTML = `<div class="detail-card"><h3>${state.symbol}</h3><p>Fundamental Insight stays separate from the Home dashboard and will be wired to the existing fundamental endpoint during the final merge.</p></div>`;
    }
  }

  function bindUi() {
    $("mobileMenuBtn").onclick = () => { $("mobileMenu").classList.remove("hidden"); $("mobileMenu").setAttribute("aria-hidden","false"); };
    $("mobileMenuClose").onclick = () => { $("mobileMenu").classList.add("hidden"); $("mobileMenu").setAttribute("aria-hidden","true"); };
    $("mobileDetailClose").onclick = () => $("mobileDetail").classList.add("hidden");
    $("mSmcBtn").onclick = () => showDetail("smc");
    document.querySelectorAll("#mobileMenu [data-panel]").forEach(btn => btn.onclick = () => { $("mobileMenu").classList.add("hidden"); showDetail(btn.dataset.panel); });
    document.querySelectorAll(".symbol-tab").forEach(btn => btn.onclick = () => {
      state.symbol = btn.dataset.symbol;
      document.querySelectorAll(".symbol-tab").forEach(x=>x.classList.toggle("active",x===btn));
      renderSmc(state.panel); renderChart();
    });
    document.querySelectorAll(".tf").forEach(btn => btn.onclick = () => {
      state.timeframe = btn.dataset.tf;
      document.querySelectorAll(".tf").forEach(x=>x.classList.toggle("active",x.dataset.tf===state.timeframe));
      renderChart();
    });
  }

  bindUi();
  loadPanel();
  setInterval(loadPanel, 5000);
  window.addEventListener("load", () => setTimeout(renderChart, 250));
})();
