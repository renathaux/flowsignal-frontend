(() => {
  const BASE_URL = location.hostname === "127.0.0.1" || location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://flowsignal-backend-3.onrender.com";

  const $ = id => document.getElementById(id);
  const first = (...values) => values.find(v => v !== undefined && v !== null && v !== "");
  const esc = value => String(value ?? "--").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const readable = value => String(value ?? "--").replaceAll("_"," ");
  const PANEL_CACHE_KEY = "flowsignal_mobile_panel_cache_v1";
  const FUND_CACHE_KEY = symbol => `flowsignal_mobile_fund_cache_${symbol}_v1`;
  const MODE_KEY = "flowsignal_trading_mode";

  function tradingMode(){
    return String(localStorage.getItem(MODE_KEY)||"forex").toLowerCase()==="binary" ? "binary" : "forex";
  }

  function installMobileModeNavStyle(){
    if(document.getElementById("mobileFxBiStyle")) return;
    const style=document.createElement("style");
    style.id="mobileFxBiStyle";
    style.textContent=`
      #flowsignalTradingModeSelector{display:none!important}
      .bottom-nav.shared-mode-nav{position:fixed!important;left:9px;right:9px;bottom:max(8px,env(safe-area-inset-bottom));height:62px;z-index:3100}
      body[data-trading-mode="binary"] #flowsignalBinaryMode{padding-bottom:calc(78px + env(safe-area-inset-bottom))}
      @media(max-height:820px){.bottom-nav.shared-mode-nav{height:52px}}
    `;
    document.head.appendChild(style);
  }

  function ensureSharedModeNav(){
    const nav=document.querySelector(".bottom-nav");
    if(!nav) return null;
    installMobileModeNavStyle();
    if(nav.parentElement!==document.body) document.body.appendChild(nav);
    nav.classList.add("shared-mode-nav");
    return nav;
  }

  function syncFxBiNav(mode=tradingMode()){
    const nav=ensureSharedModeNav();
    if(!nav) return;
    const fxbi=nav.querySelector('[data-nav="fxbi"]');
    const home=nav.querySelector('[data-nav="home"]');
    if(fxbi){
      fxbi.setAttribute("aria-label",mode==="binary"?"Switch to Forex":"Switch to Binary");
      fxbi.classList.toggle("active",mode==="binary");
    }
    if(mode==="binary") nav.querySelectorAll("button").forEach(button=>{if(button!==fxbi) button.classList.remove("active");});
    else if(home&&!nav.querySelector('button.active:not([data-nav="fxbi"])')) home.classList.add("active");
  }

  function fxBiToggle(){
    closeSheets();
    const next=tradingMode()==="binary"?"forex":"binary";
    const switchButton=document.querySelector(`#flowsignalTradingModeSelector [data-trading-mode="${next}"]`);
    if(switchButton) switchButton.click();
    else {
      localStorage.setItem(MODE_KEY,next);
      document.dispatchEvent(new CustomEvent("flowsignal:trading-mode-changed",{detail:{mode:next}}));
    }
    syncFxBiNav(next);
  }
  const cache = { panel: null, fundamentals: {} };
  let activePanel = "home";
  let panelRefreshInFlight = null;

  function selectedSymbol(){
    return document.querySelector(".symbol-switch-btn.active")?.dataset.symbol || "EURUSD";
  }

  function loadStoredCache(){
    try{cache.panel=JSON.parse(localStorage.getItem(PANEL_CACHE_KEY)||"null");}catch(e){}
    ["EURUSD","XAUUSD"].forEach(symbol=>{
      try{cache.fundamentals[symbol]=JSON.parse(localStorage.getItem(FUND_CACHE_KEY(symbol))||"null");}catch(e){}
    });
  }

  function closeSheets(){
    activePanel="home";
    [$("mobileMenu"),$("mobileDetail")].forEach(el=>{
      if(!el) return;
      el.classList.add("hidden");
      el.setAttribute("aria-hidden","true");
    });
    const back=$("mobileBackdrop");
    if(back){back.classList.add("hidden");back.setAttribute("aria-hidden","true");}
    document.body.classList.remove("sheet-open");
  }

  function openDetail(title, eyebrow, html){
    const menu=$("mobileMenu"), detail=$("mobileDetail"), back=$("mobileBackdrop");
    if(menu){menu.classList.add("hidden");menu.setAttribute("aria-hidden","true");}
    $("mobileDetailTitle").textContent=title;
    $("mobileDetailEyebrow").textContent=eyebrow;
    $("mobileDetailBody").innerHTML=html;
    detail.classList.remove("hidden");
    detail.setAttribute("aria-hidden","false");
    back.classList.remove("hidden");
    back.setAttribute("aria-hidden","false");
    document.body.classList.add("sheet-open");
  }

  function row(label,value,extra=""){
    const shown=value===undefined||value===null||value==="" ? "--" : (typeof value==="object" ? JSON.stringify(value) : readable(value));
    return `<div class="detail-row ${extra}"><span>${esc(label)}</span><strong>${esc(shown)}</strong></div>`;
  }

  function status(value){
    if(value===undefined||value===null||value==="") return "NOT EVALUATED";
    if(typeof value === "boolean") return value ? "YES" : "NO";
    if(typeof value === "object") return status(first(value.status,value.state,value.result,value.passed,value.ok));
    const text=String(value).replaceAll("_"," ").toUpperCase();
    if(["TRUE","PASS","PASSED","READY","CONFIRMED"].includes(text)) return "YES";
    if(["FALSE","FAIL","FAILED"].includes(text)) return "NO";
    return text;
  }

  async function refreshPanelCache(){
    if(panelRefreshInFlight) return panelRefreshInFlight;
    panelRefreshInFlight=(async()=>{
      try{
        const res=await fetch(`${BASE_URL}/panel-data`,{credentials:"include",cache:"no-store"});
        if(!res.ok) throw new Error(`panel ${res.status}`);
        cache.panel=await res.json();
        try{localStorage.setItem(PANEL_CACHE_KEY,JSON.stringify(cache.panel));}catch(e){}
        rerenderOpenPanel();
        return cache.panel;
      }catch(e){
        console.warn("mobile nav panel refresh failed",e);
        return cache.panel;
      }finally{
        panelRefreshInFlight=null;
      }
    })();
    return panelRefreshInFlight;
  }

  async function refreshFundamental(symbol){
    try{
      const res=await fetch(`${BASE_URL}/fundamentals/insight?symbol=${encodeURIComponent(symbol)}`,{cache:"no-store"});
      if(!res.ok) throw new Error(String(res.status));
      cache.fundamentals[symbol]=await res.json();
      try{localStorage.setItem(FUND_CACHE_KEY(symbol),JSON.stringify(cache.fundamentals[symbol]));}catch(e){}
      if(activePanel==="fundamental" && selectedSymbol()===symbol) renderFundamental(symbol,cache.fundamentals[symbol]);
      return cache.fundamentals[symbol];
    }catch(e){
      console.warn("mobile fundamental refresh failed",symbol,e);
      return cache.fundamentals[symbol];
    }
  }

  function mergedStrategyDebug(plan={}){
    return {
      ...(plan.signal_diagnostics||{}),
      ...(plan.entry_strategy_debug||{}),
      ...(plan.strategy_debug||{})
    };
  }

  function strategyStages(plan,debug){
    return first(plan?.strategy_stage_states,plan?.strategy_cycle?.stage_states,debug?.stage_states,{})||{};
  }

  function renderIsch(data=cache.panel||{}){
    const symbol=selectedSymbol();
    const plan=data?.[symbol]||{};
    const debug=mergedStrategyDebug(plan);
    const stages=strategyStages(plan,debug);
    const bosFallback = debug.bos_detected || debug.choch_detected || ["BUY","SELL"].includes(String(debug.smc_direction||"").toUpperCase());
    const bos=first(stages.bos,bosFallback);
    const swingBreak=first(stages.bos,debug.swing_break_confirmed,debug.swing_break,debug.fifteen_m_break_confirmed,debug.break_confirmed,bos);
    const close15=first(stages.fifteenClose,stages.fifteen_close,debug.fifteen_m_close_confirmed,debug.fifteen_m_candle_close_confirmed);
    const confirm5=first(stages.fiveMinute,stages.five_minute,debug.five_m_confirmation);
    const swingSl=first(stages.swingSl,stages.swing_sl,debug.swing_sl_confirmed,debug.swing_sl_valid,debug.sl_valid,plan.swing_sl_confirmed);
    const decision=first(debug.final_signal,debug.final_entry_decision,plan.strategy_decision,plan.display_signal,plan.final_signal,plan.signal,"WAIT");
    const reason=first(debug.blocked_reason,plan.blocked_reason,plan.execution_block_reason,"--");
    openDetail("ISCH", "ENTRY STRATEGY CHECKS", `<div class="detail-card desktop-isch-card"><h3>${symbol} · ENTRY STRATEGY CHECKS</h3>${row("15m BOS/CHOCH",status(bos))}${row("Swing break",status(swingBreak))}${row("15m close",status(close15))}${row("5m confirm",status(confirm5))}${row("Swing SL",status(swingSl))}${row("Signal",String(decision).toUpperCase())}${row("Reason",reason,"strategy-reason")}</div>`);
  }

  function ischDetail(){
    activePanel="isch";
    renderIsch();
    refreshPanelCache();
  }

  function score(value){
    const n=Number(value);
    return Number.isFinite(n) ? `${n>=0?"+":""}${n.toFixed(2)}` : "--";
  }

  function reasonText(reasons){
    if(!Array.isArray(reasons)||!reasons.length) return "--";
    return reasons.slice(0,2).map(r=>first(r?.label,r?.title,r?.reason,r?.name,r)).filter(Boolean).join(" · ");
  }

  function renderFundamental(symbol,v={}){
    const overall=v?.overall_bias||{};
    const active=String(overall.status||"").toUpperCase()==="ACTIVE";
    const direction=active?String(overall.direction||"NEUTRAL").toUpperCase():"NEUTRAL";
    const confidence=Number(overall.confidence);
    const isGold=symbol==="XAUUSD";
    const usd=isGold?v?.usd_macro_score:v?.currency_strength?.USD?.score;
    const secondary=isGold?v?.gold_support_score:v?.currency_strength?.EUR?.score;
    const secondaryLabel=isGold?"GOLD strength":"EUR strength";
    const guidance=v?.trading_guidance||{};
    const preference=String(guidance.preference||"NEUTRAL").toUpperCase();
    const guidanceText=preference==="PREFER_BUY"?"Prefer BUY setups":preference==="PREFER_SELL"?"Prefer SELL setups":active?"Neutral":"Neutral — insufficient data";
    const nextEvent=first(v?.next_high_impact_event?.name,v?.next_high_impact_event?.title,v?.next_high_impact_event?.event,"No trusted high-impact event");
    openDetail("Fundamental Insight", "FUNDAMENTAL INSIGHT", `<div class="detail-card desktop-fundamental-card"><h3>${symbol} · FUNDAMENTAL INSIGHT</h3>${row("Overall bias",direction,"fundamental-bias-row")}${row("Confidence",active&&Number.isFinite(confidence)?`${confidence.toFixed(2)}%`:"Insufficient data")}${row("USD strength",score(usd))}${row(secondaryLabel,score(secondary))}${row("Why this bias?",reasonText(v?.top_reasons))}${row("Next high-impact",nextEvent)}${row("Trading guidance",guidanceText)}</div>`);
  }

  function fundamentalDetail(){
    activePanel="fundamental";
    const symbol=selectedSymbol();
    renderFundamental(symbol,cache.fundamentals[symbol]||{});
    refreshFundamental(symbol);
  }

  function historyTime(value){
    if(!value) return "--";
    const d=new Date(value);
    if(Number.isNaN(d.getTime())) return String(value).slice(0,5);
    return d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:false});
  }

  function renderHistory(data=cache.panel||{}){
    const history=Array.isArray(data?.history)?data.history:[];
    const items=history.slice(0,5);
    const body=items.map(x=>`<div class="history-mini-row"><span>${esc(historyTime(first(x.time,x.timestamp,x.created_at)))}</span><strong>${esc(first(x.symbol,"--"))}</strong><b>${esc(first(x.signal,x.side,"--"))}</b><em>${esc(first(x.confidence,x.bias_strength,"--"))}</em><i>${esc(first(x.result,x.status,"--"))}</i><u>${esc(first(x.pips,"--"))}</u></div>`).join("");
    openDetail("Recent Signal History", "HISTORY", `<div class="detail-card desktop-history-card"><h3>Recent Signal History</h3><div class="history-mini-head"><span>Time</span><span>Symbol</span><span>Signal</span><span>Strength</span><span>Result</span><span>Pips</span></div>${body||"<p>No history yet.</p>"}</div>`);
  }

  function historyDetail(){
    activePanel="history";
    renderHistory();
    refreshPanelCache();
  }

  function rerenderOpenPanel(){
    if(activePanel==="isch") renderIsch();
    else if(activePanel==="history") renderHistory();
  }

  const actions={home:closeSheets,isch:ischDetail,fundamental:fundamentalDetail,history:historyDetail,fxbi:fxBiToggle};
  document.querySelectorAll(".bottom-nav button").forEach(button=>{
    button.onclick=()=>{
      document.querySelectorAll(".bottom-nav button").forEach(x=>x.classList.remove("active"));
      button.classList.add("active");
      (actions[button.dataset.nav]||closeSheets)();
    };
  });

  loadStoredCache();

  document.addEventListener("flowsignal:trading-mode-changed",event=>{
    syncFxBiNav(event.detail?.mode);
  });
  window.addEventListener("load",()=>syncFxBiNav(),{once:true});
  setTimeout(()=>syncFxBiNav(),0);

  // Do not duplicate the main dashboard's 5-second /panel-data polling here.
  // Menu panels refresh only when opened. Fundamentals are prefetched later,
  // after the dashboard has already established its main connection.
  setTimeout(()=>{
    ["EURUSD","XAUUSD"].forEach(symbol=>{
      if(!cache.fundamentals[symbol]) refreshFundamental(symbol);
    });
  },12000);
})();