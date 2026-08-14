(() => {
  const BASE_URL = location.hostname === "127.0.0.1" || location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://flowsignal-backend-3.onrender.com";

  const $ = id => document.getElementById(id);
  const first = (...values) => values.find(v => v !== undefined && v !== null && v !== "");
  const esc = value => String(value ?? "--").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const readable = value => String(value ?? "--").replaceAll("_"," ");

  function selectedSymbol(){
    return document.querySelector(".symbol-switch-btn.active")?.dataset.symbol || "EURUSD";
  }

  function closeSheets(){
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

  function row(label,value){
    if(value===undefined||value===null||value==="") return "";
    const shown=typeof value==="object" ? JSON.stringify(value) : readable(value);
    return `<div class="detail-row"><span>${esc(label)}</span><strong>${esc(shown)}</strong></div>`;
  }

  function structureText(value){
    if(!value) return "--";
    if(typeof value!=="object"){
      const t=readable(value).toUpperCase();
      return /BULLISH|BEARISH/.test(t)&&!t.includes("BIAS") ? `${t} BIAS` : t;
    }
    const raw=first(value.label,value.name,value.bias,value.market_bias,value.structure,value.direction,value.trend,value.state,value.status);
    return structureText(raw);
  }

  async function panelData(){
    const res=await fetch(`${BASE_URL}/panel-data`,{credentials:"include",cache:"no-store"});
    if(!res.ok) throw new Error(`panel ${res.status}`);
    return res.json();
  }

  async function ischDetail(){
    const symbol=selectedSymbol();
    openDetail("ISCH", "ENTRY STRATEGY CHECK", `<div class="detail-card"><h3>${symbol} · Entry Strategy Check</h3><p>Checking strategy…</p></div>`);
    try{
      const data=await panelData();
      const plan=data?.[symbol]||{};
      const smc=first(plan.smc_plan_intel,plan.smc_intel,plan.smc,{})||{};
      const decision=first(plan.strategy_decision,plan.display_signal,plan.final_signal,plan.signal,"WAIT");
      const structure=first(smc.market_structure,smc.structure,smc.market_bias,plan.market_structure,plan.market_bias,plan.trend_15m,plan.trend,"--");
      const trigger=first(smc.next_trigger,smc.trigger,plan.next_trigger,plan.execution_status,"--");
      const execution=first(plan.execution_status,plan.execution_block_reason,"NOT APPLICABLE");
      const entry=first(smc.next_entry_zone,smc.entry_zone,plan.entry,"--");
      openDetail("ISCH", "ENTRY STRATEGY CHECK", `<div class="detail-card"><h3>${symbol} · Entry Strategy Check</h3>${row("Decision",decision)}${row("Market structure",structureText(structure))}${row("Next trigger",trigger)}${row("Execution",execution)}${row("Entry zone",entry)}</div>`);
    }catch(e){
      openDetail("ISCH", "ENTRY STRATEGY CHECK", `<div class="detail-card"><h3>${symbol}</h3><p>Strategy check unavailable.</p></div>`);
    }
  }

  async function fundamentalDetail(){
    const symbol=selectedSymbol();
    openDetail("Fundamental Insight", "MARKET BIAS", `<div class="detail-card"><h3>${symbol}</h3><p>Loading fundamentals…</p></div>`);
    try{
      const res=await fetch(`${BASE_URL}/fundamentals/insight?symbol=${symbol}`,{cache:"no-store"});
      if(!res.ok) throw new Error(String(res.status));
      const v=await res.json();
      const preferred=[
        ["Overall bias",first(v.overall_bias,v.bias,v.direction,v.signal)],
        ["Confidence",first(v.confidence,v.confidence_pct,v.score)],
        ["USD strength",first(v.usd_strength,v.USD_strength,v.usd_score)],
        ["EUR strength",first(v.eur_strength,v.EUR_strength,v.eur_score)],
        ["Guidance",first(v.trading_guidance,v.guidance,v.recommendation)]
      ].filter(([,x])=>x!==undefined&&x!==null&&x!=="");
      const fallback=Object.entries(v||{}).filter(([,x])=>["string","number","boolean"].includes(typeof x)).slice(0,5);
      const rows=(preferred.length?preferred:fallback).map(([k,x])=>row(k,x)).join("");
      openDetail("Fundamental Insight", "MARKET BIAS", `<div class="detail-card"><h3>${symbol}</h3>${rows||"<p>No fundamental summary available.</p>"}</div>`);
    }catch(e){
      openDetail("Fundamental Insight", "MARKET BIAS", `<div class="detail-card"><h3>${symbol}</h3><p>Fundamental data unavailable.</p></div>`);
    }
  }

  async function historyDetail(){
    openDetail("Signal History", "RECENT ACTIVITY", `<div class="detail-card"><h3>Recent Signals</h3><p>Loading history…</p></div>`);
    try{
      const data=await panelData();
      const rows=first(data?.live_recent_history,data?._meta?.live_recent_history,[]);
      const items=Array.isArray(rows)?rows.slice(0,4):[];
      const html=items.map(x=>row(`${first(x.symbol,"")} ${first(x.signal,x.side,"")}`.trim(),first(x.result,x.status,x.pips,"--"))).join("");
      openDetail("Signal History", "RECENT ACTIVITY", `<div class="detail-card"><h3>Recent Signals</h3>${html||"<p>No recent signals.</p>"}</div>`);
    }catch(e){
      openDetail("Signal History", "RECENT ACTIVITY", `<div class="detail-card"><h3>Recent Signals</h3><p>History unavailable.</p></div>`);
    }
  }

  async function autoTradeDetail(){
    openDetail("Auto Trade", "EXECUTION", `<div class="detail-card"><h3>Auto Trade Status</h3><p>Checking execution status…</p></div>`);
    try{
      const data=await panelData();
      const live=first(data.live_auto,data.live_auto_enabled,data.auto_live,data?._meta?.live_auto,data?._meta?.live_auto_enabled,"--");
      const paper=first(data.paper_auto,data.paper_auto_enabled,data.auto_paper,data?._meta?.paper_auto,data?._meta?.paper_auto_enabled,"--");
      const ready=first(data.execution_ready,data.ctrader_execution_ready,data?._meta?.execution_ready,data?._meta?.ctrader_execution_ready,"--");
      const count=first(data.broker_open_positions_count,data?._meta?.broker_open_positions_count,"--");
      openDetail("Auto Trade", "EXECUTION", `<div class="detail-card"><h3>Auto Trade Status</h3>${row("LIVE Auto",live)}${row("PAPER Auto",paper)}${row("Execution ready",ready)}${row("Open trades",count)}</div>`);
    }catch(e){
      openDetail("Auto Trade", "EXECUTION", `<div class="detail-card"><h3>Auto Trade Status</h3><p>Status unavailable.</p></div>`);
    }
  }

  const actions={home:closeSheets,isch:ischDetail,fundamental:fundamentalDetail,history:historyDetail,auto:autoTradeDetail};
  document.querySelectorAll(".bottom-nav button").forEach(button=>{
    button.onclick=()=>{
      document.querySelectorAll(".bottom-nav button").forEach(x=>x.classList.remove("active"));
      button.classList.add("active");
      (actions[button.dataset.nav]||closeSheets)();
    };
  });
})();