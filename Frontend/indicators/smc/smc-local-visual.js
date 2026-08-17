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
    return rows.map((c) => ({
      time: Number(c?.time), open: Number(c?.open), high: Number(c?.high), low: Number(c?.low), close: Number(c?.close),
    })).filter((c) => [c.time, c.open, c.high, c.low, c.close].every(Number.isFinite)).sort((a,b) => a.time - b.time);
  }
  function analyze(rows) {
    const all = normalize(rows);
    const candles = all.length > 1 ? all.slice(0, -1) : all;
    const leftBars = 2, rightBars = 2;
    const swings = [];
    for (let i = leftBars; i < candles.length - rightBars; i += 1) {
      const c = candles[i];
      const left = candles.slice(i-leftBars, i);
      const right = candles.slice(i+1, i+1+rightBars);
      const confirmedIndex = i + rightBars;
      if (c.high > Math.max(...left.map(x=>x.high)) && c.high >= Math.max(...right.map(x=>x.high))) {
        swings.push({ swing_type:"HIGH", index:i, confirmed_index:confirmedIndex, timestamp:c.time, confirmed_timestamp:candles[confirmedIndex].time, price:c.high });
      }
      if (c.low < Math.min(...left.map(x=>x.low)) && c.low <= Math.min(...right.map(x=>x.low))) {
        swings.push({ swing_type:"LOW", index:i, confirmed_index:confirmedIndex, timestamp:c.time, confirmed_timestamp:candles[confirmedIndex].time, price:c.low });
      }
    }
    swings.sort((a,b)=>a.confirmed_index-b.confirmed_index || a.index-b.index);
    const byConfirmation = new Map();
    swings.forEach(s => { const arr=byConfirmation.get(s.confirmed_index)||[]; arr.push(s); byConfirmation.set(s.confirmed_index,arr); });
    let high=null, low=null, brokenHigh=null, brokenLow=null, bias="NEUTRAL";
    const events=[];
    candles.forEach((c,index)=>{
      (byConfirmation.get(index)||[]).forEach(s=>{
        if(s.swing_type==="HIGH"){ high=s; brokenHigh=null; } else { low=s; brokenLow=null; }
      });
      if(high){ const key=`${high.timestamp}:${high.price}`; if(c.close>high.price && brokenHigh!==key){ const previous=bias; const type=bias==="BEARISH"?"CHOCH":"BOS"; bias="BULLISH"; events.push({event_type:type,direction:"BULLISH",timestamp:c.time,close:c.close,broken_swing_timestamp:high.timestamp,broken_level:high.price,previous_bias:previous,new_bias:bias}); brokenHigh=key; } }
      if(low){ const key=`${low.timestamp}:${low.price}`; if(c.close<low.price && brokenLow!==key){ const previous=bias; const type=bias==="BULLISH"?"CHOCH":"BOS"; bias="BEARISH"; events.push({event_type:type,direction:"BEARISH",timestamp:c.time,close:c.close,broken_swing_timestamp:low.timestamp,broken_level:low.price,previous_bias:previous,new_bias:bias}); brokenLow=key; } }
    });
    return {
      bias,
      last_swing_high: high,
      last_swing_low: low,
      swings,
      events,
      closed_candle_count: candles.length,
      symbol: currentSymbol(),
      timeframe: currentTimeframe(),
      source: "browser_closed_chart_candles",
      observation_only: true,
      affects_strategy: false,
      config:{left_bars:2,right_bars:2,closed_candles_only:true,repainting:false},
    };
  }
  function apply() {
    const smc = window.FlowSignalSMC;
    if (!smc?.getState?.().enabled || lastCandles.length < 10) return false;
    const key = `${currentSymbol()}:${currentTimeframe()}`;
    if (key !== lastContextKey) lastContextKey = key;
    try {
      smc.setContext?.({ symbol: currentSymbol(), timeframe: currentTimeframe() });
      smc.applyStructure?.(analyze(lastCandles));
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
      series.setData = function(candles){
        const result = original(candles);
        const normalized = normalize(candles);
        if (normalized.length) {
          lastCandles = normalized;
          window.setTimeout(apply, 0);
        }
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
  window.FlowSignalSmcLocalVisual={ wrap, apply, getState:()=>({candles:lastCandles.length,symbol:currentSymbol(),timeframe:currentTimeframe(),wrapped:Boolean(wrappedSeries)}) };
})();
