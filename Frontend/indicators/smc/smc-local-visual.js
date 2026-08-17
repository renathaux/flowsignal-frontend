(function () {
  "use strict";

  let wrappedSeries = null;
  let lastCandles = [];
  let lastContextKey = "";

  function currentSeries() {
    try { return typeof candleSeries !== "undefined" ? candleSeries : null; } catch (_) { return null; }
  }
  function currentSymbol() {
    try { return String(typeof currentChartSymbol !== "undefined" && currentChartSymbol ? currentChartSymbol : "EURUSD").toUpperCase(); }
    catch (_) { return "EURUSD"; }
  }
  function currentTimeframe() {
    try { return String(typeof currentChartTimeframe !== "undefined" && currentChartTimeframe ? currentChartTimeframe : "5m").toLowerCase(); }
    catch (_) { return "5m"; }
  }
  function normalize(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map((c) => ({ time:Number(c?.time), open:Number(c?.open), high:Number(c?.high), low:Number(c?.low), close:Number(c?.close) }))
      .filter((c) => [c.time,c.open,c.high,c.low,c.close].every(Number.isFinite)).sort((a,b) => a.time-b.time);
  }
  function analyze(rows) {
    const engine = window.FlowSignalSmcLocalEngine;
    if (!engine || typeof engine.analyze !== "function") return null;
    return engine.analyze(rows);
  }
  function apply() {
    const smc = window.FlowSignalSMC;
    if (!smc?.getState?.().enabled || lastCandles.length < 15) return false;
    const key = `${currentSymbol()}:${currentTimeframe()}`;
    if (key !== lastContextKey) lastContextKey = key;
    try {
      const structure = analyze(lastCandles);
      if (!structure) return false;
      structure.symbol = currentSymbol();
      structure.timeframe = currentTimeframe();
      smc.setContext?.({ symbol:currentSymbol(), timeframe:currentTimeframe() });
      smc.applyStructure?.(structure);
      return true;
    } catch (error) {
      console.warn("FLOW_SMC_LOCAL_VISUAL_ERROR", error);
      return false;
    }
  }
  function wrap() {
    const series = currentSeries();
    if (!series || typeof series.setData !== "function") return false;
    if (series === wrappedSeries && series.__flowSmcLocalVisualWrapped) return true;
    if (!series.__flowSmcLocalVisualWrapped) {
      const original = series.setData.bind(series);
      series.setData = function(candles) {
        const result = original(candles);
        const normalized = normalize(candles);
        if (normalized.length) { lastCandles = normalized; window.setTimeout(apply, 0); }
        return result;
      };
      series.__flowSmcLocalVisualWrapped = true;
    }
    wrappedSeries = series;
    return true;
  }
  function tick(){ wrap(); apply(); }
  window.addEventListener("load", ()=>{ tick(); setTimeout(tick,250); setTimeout(tick,1000); });
  window.addEventListener("flowsignal:smc-toggle", ()=>setTimeout(tick,0));
  document.addEventListener("click", ()=>setTimeout(tick,0), true);
  const timer=setInterval(tick,1000);
  window.addEventListener("beforeunload",()=>clearInterval(timer),{once:true});
  window.FlowSignalSmcLocalVisual={ wrap, apply, getState:()=>({ candles:lastCandles.length, symbol:currentSymbol(), timeframe:currentTimeframe(), wrapped:Boolean(wrappedSeries), engine:"ludogh68_structure_port_no_fvg" }) };
})();
