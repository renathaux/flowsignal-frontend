/* FlowSignal SMC visual settings. Appearance only; no strategy impact. */
(function(){
  "use strict";
  const KEY="flowsignal_smc_visual_settings_v1";
  const defaults={bos:{show:true,color:"#c7cbd1",width:1,style:"solid"},choch:{show:true,color:"#f0c419",width:1,style:"solid"},structure:{show:true,color:"#2962ff",width:1,style:"solid"},fibs:{"0.786":{show:true,color:"#64b5f6",width:1,style:"solid"},"0.705":{show:true,color:"#f23645",width:1,style:"solid"},"0.618":{show:true,color:"#089981",width:1,style:"solid"},"0.5":{show:true,color:"#4caf50",width:1,style:"solid"},"0.382":{show:true,color:"#81c784",width:1,style:"solid"}}};
  const clone=v=>JSON.parse(JSON.stringify(v));
  function load(){let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(_){}const out=clone(defaults);["bos","choch","structure"].forEach(k=>Object.assign(out[k],saved?.[k]||{}));Object.keys(out.fibs).forEach(k=>Object.assign(out.fibs[k],saved?.fibs?.[k]||{}));return out;}
  let state=load();
  const get=()=>clone(state);
  function persist(){localStorage.setItem(KEY,JSON.stringify(state));window.dispatchEvent(new CustomEvent("flowsignal:smc-style-change",{detail:get()}));}
  function set(path,value){const parts=String(path).split(".");let o=state;for(let i=0;i<parts.length-1;i++)o=o[parts[i]];o[parts.at(-1)]=value;persist();}
  function row(label,path,cfg){return `<div class="smc-settings-row" data-path="${path}"><label><input type="checkbox" data-k="show" ${cfg.show?"checked":""}> ${label}</label><input type="color" data-k="color" value="${cfg.color}"><select data-k="style"><option value="solid">Solid</option><option value="dashed">Dashed</option><option value="dotted">Dotted</option></select><input type="number" min="1" max="5" step="1" data-k="width" value="${cfg.width}" title="Line width"></div>`;}

  const chartSection=()=>document.querySelector(".chart-panel .chart-section");
  const fullscreenElement=()=>document.fullscreenElement||document.webkitFullscreenElement||null;
  function panelHost(){const section=chartSection();return section&&fullscreenElement()===section?section:document.body;}
  function movePanelToCorrectHost(){const p=document.getElementById("smcSettingsPanel");if(!p)return;const host=panelHost();if(host&&p.parentNode!==host){host.appendChild(p);resetPanelPosition(p);}}

  function ensureCss(){
    if(document.getElementById("smcSettingsCss"))return;
    const s=document.createElement("style");s.id="smcSettingsCss";
    s.textContent=`
      .smc-settings-btn{display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:34px;border:1px solid #31506f;background:#101b29;color:#d9e7f7;border-radius:9px;padding:0 10px;font-weight:700;cursor:pointer;flex:0 0 auto;pointer-events:auto;position:relative;z-index:20}
      .smc-settings-panel{position:fixed;right:22px;top:85px;left:auto;z-index:2147483647;width:min(430px,calc(100vw - 30px));max-height:calc(100vh - 110px);overflow:auto;background:#0d1724;border:1px solid #29425f;border-radius:14px;box-shadow:0 18px 50px #0009;color:#eaf2fb;pointer-events:auto!important;user-select:none;isolation:isolate}
      .smc-settings-panel *{pointer-events:auto}
      .smc-settings-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #24364d;cursor:grab;touch-action:none;background:#101c2b;border-radius:14px 14px 0 0}
      .smc-settings-head:active{cursor:grabbing}
      .smc-settings-head button,.smc-settings-body>button{background:#132238;color:#dce9f8;border:1px solid #304968;border-radius:8px;padding:7px 10px;cursor:pointer;position:relative;z-index:5}
      .smc-settings-head button{min-width:36px}
      .smc-master-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;margin-bottom:8px;background:#101c2b;border:1px solid #24364d;border-radius:10px}
      .smc-master-row strong{font-size:13px}.smc-master-toggle{border:1px solid #31506f;background:#182638;color:#b8c7da;border-radius:999px;padding:7px 14px;font-weight:800;cursor:pointer;min-width:78px;position:relative;z-index:5}.smc-master-toggle.is-on{border-color:#1dbf73;background:rgba(29,191,115,.14);color:#55e59b}
      .smc-settings-body{padding:12px 14px 16px;user-select:auto}.smc-settings-sub{font-weight:800;margin:14px 0 7px;color:#9eb5cf}
      .smc-settings-row{display:grid;grid-template-columns:minmax(145px,1fr) 44px 94px 58px;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid #172538}
      .smc-settings-row label{font-size:13px}.smc-settings-row input[type=color]{width:40px;height:30px;border:0;background:transparent}
      .smc-settings-row select,.smc-settings-row input[type=number]{width:100%;background:#101d2c;color:#dce8f7;border:1px solid #30445e;border-radius:6px;padding:6px}.smc-settings-body>button{margin-top:14px;width:100%}
      .chart-section:fullscreen .smc-settings-panel,.chart-section:-webkit-full-screen .smc-settings-panel{top:68px;right:16px;max-height:calc(100vh - 90px)}
      @media(max-width:700px){.smc-settings-panel{right:10px;top:65px}.smc-settings-row{grid-template-columns:1fr 42px 82px 52px}}
    `;document.head.appendChild(s);
  }

  const smcEnabled=()=>Boolean(window.FlowSignalSMC?.getState?.().enabled);
  function setSmcEnabled(enabled){const smc=window.FlowSignalSMC;if(!smc?.setEnabled)return false;smc.setEnabled(Boolean(enabled));syncMasterToggle();return true;}
  function syncMasterToggle(){const b=document.querySelector("#smcSettingsPanel [data-smc-master]");if(!b)return;const on=smcEnabled();b.textContent=on?"SMC ON":"SMC OFF";b.classList.toggle("is-on",on);b.setAttribute("aria-pressed",on?"true":"false");}
  function closePanel(event){event?.preventDefault?.();event?.stopPropagation?.();const p=document.getElementById("smcSettingsPanel");if(p)p.remove();}
  function resetPanelPosition(p){if(!p)return;p.style.left="";p.style.top="";p.style.right="";if(panelHost()===document.body){p.style.right="22px";p.style.top="85px";}else{p.style.right="16px";p.style.top="68px";}}

  function makeDraggable(panel){
    const head=panel.querySelector(".smc-settings-head");if(!head)return;
    let dragging=false,startX=0,startY=0,startLeft=0,startTop=0;
    function point(e){const t=e.touches?.[0]||e.changedTouches?.[0]||e;return {x:t.clientX,y:t.clientY};}
    function begin(e){if(e.target.closest("button,input,select,label"))return;const p=point(e),r=panel.getBoundingClientRect();dragging=true;startX=p.x;startY=p.y;startLeft=r.left;startTop=r.top;panel.style.right="auto";e.preventDefault();e.stopPropagation();document.addEventListener("mousemove",move,true);document.addEventListener("mouseup",stop,true);document.addEventListener("touchmove",move,{capture:true,passive:false});document.addEventListener("touchend",stop,true);}
    function move(e){if(!dragging)return;const p=point(e),host=panelHost(),bounds=host===document.body?{left:0,top:0,width:window.innerWidth,height:window.innerHeight}:host.getBoundingClientRect(),rect=panel.getBoundingClientRect();const minL=bounds.left+4,minT=bounds.top+4,maxL=Math.max(minL,bounds.left+bounds.width-rect.width-4),maxT=Math.max(minT,bounds.top+bounds.height-rect.height-4);panel.style.left=`${Math.min(maxL,Math.max(minL,startLeft+(p.x-startX)))}px`;panel.style.top=`${Math.min(maxT,Math.max(minT,startTop+(p.y-startY)))}px`;e.preventDefault?.();e.stopPropagation?.();}
    function stop(){dragging=false;document.removeEventListener("mousemove",move,true);document.removeEventListener("mouseup",stop,true);document.removeEventListener("touchmove",move,true);document.removeEventListener("touchend",stop,true);}
    head.addEventListener("mousedown",begin,true);head.addEventListener("touchstart",begin,{capture:true,passive:false});
  }

  function bindRows(p){p.querySelectorAll(".smc-settings-row").forEach(r=>{const path=r.dataset.path,cfg=path.startsWith("fibs.")?state.fibs[path.split(".")[1]]:state[path];r.querySelector('[data-k="style"]').value=cfg.style;r.querySelectorAll("input,select").forEach(el=>el.addEventListener("change",()=>{const k=el.dataset.k,v=el.type==="checkbox"?el.checked:el.type==="number"?Number(el.value):el.value;set(`${path}.${k}`,v);}));});}

  function open(){
    ensureCss();let p=document.getElementById("smcSettingsPanel");if(p){movePanelToCorrectHost();syncMasterToggle();return;}
    p=document.createElement("div");p.id="smcSettingsPanel";p.className="smc-settings-panel";
    p.innerHTML=`<div class="smc-settings-head"><strong>SMC Settings</strong><button type="button" data-close aria-label="Close SMC settings">✕</button></div><div class="smc-settings-body"><div class="smc-master-row"><strong>Indicator</strong><button type="button" class="smc-master-toggle" data-smc-master aria-pressed="false">SMC OFF</button></div>${row("BOS","bos",state.bos)}${row("CHoCH","choch",state.choch)}${row("Structure High/Low","structure",state.structure)}<div class="smc-settings-sub">Fibonacci</div>${Object.keys(state.fibs).map(k=>row(k,`fibs.${k}`,state.fibs[k])).join("")}<button type="button" data-reset>Reset appearance</button></div>`;
    panelHost().appendChild(p);bindRows(p);makeDraggable(p);syncMasterToggle();
    const close=p.querySelector("[data-close]");close.addEventListener("mousedown",e=>{e.preventDefault();e.stopPropagation();closePanel(e);},true);close.addEventListener("click",closePanel,true);
    const master=p.querySelector("[data-smc-master]");master.addEventListener("mousedown",e=>{e.preventDefault();e.stopPropagation();setSmcEnabled(!smcEnabled());},true);master.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();},true);
    p.querySelector("[data-reset]").addEventListener("click",e=>{e.preventDefault();e.stopPropagation();state=clone(defaults);persist();closePanel();open();},true);
  }

  function removeLegacyToggle(){document.getElementById("smcOverlayToggleBtn")?.remove();}
  function attachButton(){ensureCss();const controls=document.querySelector(".chart-panel .chart-controls");if(!controls)return false;removeLegacyToggle();let b=document.getElementById("smcSettingsBtn");if(!b){b=document.createElement("button");b.id="smcSettingsBtn";b.type="button";b.className="smc-settings-btn";b.textContent="⚙";b.setAttribute("aria-label","SMC settings");b.title="SMC settings";b.addEventListener("click",open,true);controls.appendChild(b);}else if(!b.parentNode){controls.appendChild(b);}return true;}

  const observer=new MutationObserver(()=>removeLegacyToggle());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  function onFullscreenChange(){movePanelToCorrectHost();attachButton();}
  window.FlowSignalSmcSettings={get,set,open,close:closePanel,attachButton,defaults:()=>clone(defaults)};
  window.addEventListener("load",()=>{attachButton();setTimeout(attachButton,300);},{once:true});window.addEventListener("flowsignal:smc-toggle",syncMasterToggle);
  document.addEventListener("fullscreenchange",onFullscreenChange);document.addEventListener("webkitfullscreenchange",onFullscreenChange);
  const t=setInterval(()=>{attachButton();removeLegacyToggle();if(document.getElementById("smcSettingsBtn"))clearInterval(t);},300);
})();