(function () {
  const MOBILE_QUERY = "(max-width: 700px)";
  const STYLE_ID = "flowsignalMobileDashboardV3";
  const moved = new Map();
  let mobileApplied = false;

  function isMobile() { return window.matchMedia(MOBILE_QUERY).matches; }
  function remember(node) {
    if (!node || moved.has(node)) return;
    moved.set(node, { parent: node.parentNode, next: node.nextSibling });
  }
  function restore(node) {
    const origin = moved.get(node);
    if (!node || !origin?.parent) return;
    if (origin.next && origin.next.parentNode === origin.parent) origin.parent.insertBefore(node, origin.next);
    else origin.parent.appendChild(node);
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
@media (max-width:700px){
  html,body{width:100%!important;min-height:100%!important;overflow-x:hidden!important}
  body.fit-mode #mainApp.app:not(.locked){width:100%!important;min-height:100dvh!important;height:auto!important;max-height:none!important;padding:max(7px,env(safe-area-inset-top)) 8px max(10px,env(safe-area-inset-bottom))!important;gap:7px!important;overflow:visible!important}
  body.fit-mode #mainApp.app:not(.locked)>.top-header{height:42px!important;min-height:42px!important;margin:0!important;padding:0!important;grid-template-columns:38px minmax(0,1fr) 72px!important;gap:8px!important;border:0!important;background:transparent!important;box-shadow:none!important}
  .top-header .menu-toggle{grid-column:1!important;width:38px!important;height:38px!important;border-radius:11px!important}
  .top-header .brand-left{grid-column:2!important;font-size:20px!important;line-height:1!important;letter-spacing:-.5px!important}
  .top-header .app-logo-wave{font-size:24px!important}
  .mobile-live-status{display:grid!important;visibility:visible!important;grid-column:3!important;justify-self:end!important;place-items:center!important;width:70px!important;height:27px!important;border-radius:999px!important;font-size:8px!important;line-height:1.05!important;text-align:center!important}
  body.fit-mode #mainApp.app:not(.locked)>.topbar,.mobile-notify-btn,.divider{display:none!important}

  body.fit-mode #mainApp.app:not(.locked)>.performance-strip{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;width:100%!important;height:52px!important;min-height:52px!important;margin:0!important;padding:5px 3px!important;gap:0!important;border-radius:13px!important;overflow:hidden!important}
  .performance-strip>.performance-card{display:grid!important;place-content:center!important;height:42px!important;min-height:0!important;min-width:0!important;padding:2px 4px!important;border-right:1px solid rgba(148,163,184,.14)!important;overflow:hidden!important}
  .performance-strip>.performance-daily{order:1!important}.performance-strip>.performance-weekly{order:2!important}.performance-strip>.performance-floating{order:3!important;display:grid!important;visibility:visible!important}.performance-strip>.performance-trades{order:4!important}.performance-strip>.performance-monthly{display:none!important}
  .performance-strip .performance-icon,.performance-strip .performance-sparkline{display:none!important}.performance-strip .performance-copy{width:100%!important;min-width:0!important;text-align:center!important;overflow:hidden!important}
  .performance-strip .performance-copy span{display:block!important;font-size:7px!important;line-height:1!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}.performance-strip .performance-copy strong{display:block!important;margin-top:4px!important;font-size:clamp(12px,3.6vw,16px)!important;line-height:1!important;white-space:nowrap!important}
  .performance-floating .performance-copy span{font-size:0!important}.performance-floating .performance-copy span:after{content:"LIVE P/L"!important;font-size:7px!important}.performance-trades .performance-copy span{font-size:0!important}.performance-trades .performance-copy span:after{content:"OPEN TRADES"!important;font-size:7px!important}

  body.fit-mode #mainApp.app:not(.locked)>.dashboard-grid{display:flex!important;flex-direction:column!important;width:100%!important;height:auto!important;min-height:0!important;margin:0!important;padding:0!important;gap:7px!important;overflow:visible!important}
  .dashboard-grid>.signals-panel{order:1!important;width:100%!important;height:88px!important;min-height:88px!important;margin:0!important;padding:0!important;overflow:hidden!important}
  .signals-panel .content-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;width:100%!important;height:88px!important;gap:6px!important;margin:0!important;padding:0!important}
  body.fit-mode .signals-panel .symbol-card{box-sizing:border-box!important;position:relative!important;width:100%!important;min-width:0!important;height:88px!important;min-height:88px!important;margin:0!important;padding:7px!important;border-radius:13px!important;overflow:hidden!important}
  .symbol-card .card-header{height:16px!important;min-height:16px!important}.symbol-card .title-wrap{gap:4px!important}.symbol-card .card-title{font-size:12px!important;line-height:1!important;letter-spacing:0!important}.symbol-card .symbol-icon{height:14px!important;max-width:30px!important}
  .symbol-card .signal-shell{position:absolute!important;top:29px!important;left:7px!important;width:51%!important;height:40px!important}.symbol-card .signal-box{width:100%!important;height:40px!important;min-height:40px!important;border-radius:10px!important}.symbol-card .signal-text{font-size:clamp(18px,5.3vw,23px)!important;letter-spacing:-.5px!important}.symbol-card .signal-freshness-note,.symbol-card .tags-row{display:none!important}
  .symbol-card .metric-label{position:absolute!important;left:61%!important;width:35%!important;height:10px!important;font-size:0!important;line-height:1!important;overflow:visible!important}#eurusd-buy-label,#gold-buy-label{top:27px!important}#eurusd-sell-label,#gold-sell-label{top:45px!important}#eurusd-conf-label,#gold-conf-label{top:63px!important}#eurusd-buy-label:after,#gold-buy-label:after{content:"B"!important;font-size:7px!important}#eurusd-sell-label:after,#gold-sell-label:after{content:"S"!important;font-size:7px!important}#eurusd-conf-label:after,#gold-conf-label:after{content:"STR"!important;font-size:7px!important}
  .symbol-card .bar-wrap{position:absolute!important;left:68%!important;width:27%!important;height:6px!important}#eurusd-buy-label+.bar-wrap,#gold-buy-label+.bar-wrap{top:29px!important}#eurusd-sell-label+.bar-wrap,#gold-sell-label+.bar-wrap{top:47px!important}#eurusd-conf-label+.bar-wrap,#gold-conf-label+.bar-wrap{top:65px!important}.symbol-card .glow-bar{display:block!important;width:100%!important;height:6px!important;margin:0!important}

  .dashboard-grid>.main-trade-panel{display:none!important}
  .dashboard-grid>.chart-panel{order:2!important;width:100%!important;height:auto!important;min-height:0!important;margin:0!important;padding:0!important;overflow:visible!important}.chart-panel .chart-wrap,.chart-panel .chart-section{width:100%!important;height:auto!important;min-height:0!important;margin:0!important;padding:0!important;overflow:visible!important}
  .chart-panel .chart-section{display:flex!important;flex-direction:column!important;gap:6px!important}

  #mobileOpenTradeCard{order:1!important;box-sizing:border-box!important;width:100%!important;height:108px!important;min-height:108px!important;margin:0!important;padding:8px 10px!important;border-radius:13px!important;overflow:hidden!important}.mobile-open-trade-head{min-height:17px!important;font-size:10px!important}.mobile-trade-empty{min-height:62px!important;display:grid!important;place-items:center!important;font-size:11px!important}.mobile-trade-main{margin-top:3px!important;min-height:20px!important}.mobile-trade-main strong,.mobile-trade-main b{font-size:14px!important}.mobile-trade-side{font-size:8px!important;padding:2px 7px!important}.mobile-trade-grid{margin-top:4px!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:2px!important}.mobile-trade-grid span{min-width:0!important;font-size:7px!important;text-align:center!important}.mobile-trade-grid b{display:block!important;margin-top:1px!important;font-size:8px!important;white-space:nowrap!important}.mobile-trade-protection{display:none!important}.mobile-trade-progress{margin-top:6px!important;height:22px!important}.mobile-trade-line{top:7px!important}.mobile-trade-line .marker b{font-size:6px!important;margin-top:14px!important;white-space:nowrap!important}.mobile-trade-line .marker.live b{display:none!important}

  .chart-section>.chart-controls{order:2!important;display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;height:30px!important;min-height:30px!important;margin:0!important;padding:3px 5px!important;border-radius:10px!important}.chart-controls .chart-symbols,.chart-controls .chart-timeframes{display:flex!important;gap:4px!important}.chart-controls button{height:24px!important;min-height:24px!important;padding:0 8px!important;border-radius:7px!important;font-size:8px!important}
  .chart-section>.chart-box{order:3!important;width:100%!important;height:260px!important;min-height:260px!important;margin:0!important;border-radius:12px!important;overflow:hidden!important}.chart-box #chartContainer{width:100%!important;height:260px!important;min-height:260px!important}.chart-overlay-header{top:7px!important;left:9px!important}#chartOverlayTitle{font-size:12px!important}#chartOverlayOhlc{margin-top:3px!important;font-size:7px!important}
  .chart-section>.mobile-timeframe-row{order:4!important;display:flex!important;width:100%!important;height:32px!important;min-height:32px!important;margin:0!important;padding:2px!important;gap:3px!important}.mobile-timeframe-row button{flex:1 1 0!important;height:28px!important;min-height:28px!important;font-size:8px!important}
  .chart-section>.main-smc-panel{order:5!important;box-sizing:border-box!important;display:grid!important;grid-template-columns:auto minmax(0,1fr)!important;align-items:center!important;width:100%!important;height:46px!important;min-height:46px!important;margin:0!important;padding:6px 10px!important;gap:10px!important;border-radius:12px!important;overflow:hidden!important;cursor:pointer!important}.chart-section>.main-smc-panel .smc-header{margin:0!important;padding:0!important;border:0!important;font-size:9px!important;white-space:nowrap!important}.chart-section>.main-smc-panel .smc-row,.chart-section>.main-smc-panel .smc-intel-section,.chart-section>.main-smc-panel .smc-intel-levels,.chart-section>.main-smc-panel .smc-intel-progress{display:none!important}.chart-section>.main-smc-panel .smc-plan-intel{margin:0!important;padding:0!important;border:0!important}.chart-section>.main-smc-panel .smc-intel-grid:first-child{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:6px!important;margin:0!important}.chart-section>.main-smc-panel .smc-intel-grid:first-child>div{min-width:0!important;padding:0 5px!important;border:0!important;background:transparent!important}.chart-section>.main-smc-panel .smc-intel-grid:first-child span{font-size:6px!important}.chart-section>.main-smc-panel .smc-intel-grid:first-child strong{display:block!important;margin-top:2px!important;font-size:8px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}

  .history-section,.news-impact-panel,#v2-shadow-card,.entry-strategy-debug,.main-buttons-row,.main-bottom-row{display:none!important}
  #mobileDashboardDetailOverlay{position:fixed!important;inset:0!important;z-index:100000!important;display:none!important;box-sizing:border-box!important;padding:max(10px,env(safe-area-inset-top)) 10px max(10px,env(safe-area-inset-bottom))!important;background:#020812!important;overflow:hidden!important}#mobileDashboardDetailOverlay.is-open{display:grid!important;grid-template-rows:46px minmax(0,1fr)!important}#mobileDashboardDetailOverlay .mobile-detail-head{display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 3px 6px!important}#mobileDashboardDetailOverlay .mobile-detail-head strong{font-size:17px!important}#mobileDashboardDetailOverlay .mobile-detail-close{width:38px!important;height:38px!important;border:1px solid rgba(148,163,184,.25)!important;border-radius:11px!important;background:#081321!important;color:#fff!important;font-size:21px!important}#mobileDashboardDetailOverlay .mobile-detail-body{min-height:0!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;padding-bottom:18px!important}#mobileDashboardDetailOverlay .news-impact-panel,#mobileDashboardDetailOverlay #v2-shadow-card,#mobileDashboardDetailOverlay .history-section,#mobileDashboardDetailOverlay .main-smc-panel{display:block!important;visibility:visible!important;width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0!important;overflow:visible!important}#mobileDashboardDetailOverlay .main-smc-panel{padding:14px!important;border-radius:16px!important;cursor:default!important}#mobileDashboardDetailOverlay .main-smc-panel .smc-row{display:flex!important}#mobileDashboardDetailOverlay .main-smc-panel .smc-plan-intel,#mobileDashboardDetailOverlay .main-smc-panel .smc-intel-section,#mobileDashboardDetailOverlay .main-smc-panel .smc-intel-grid,#mobileDashboardDetailOverlay .main-smc-panel .smc-intel-levels,#mobileDashboardDetailOverlay .main-smc-panel .smc-intel-progress{display:block!important}#mobileDashboardDetailOverlay .main-smc-panel .smc-intel-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}#mobileDashboardDetailOverlay .main-smc-panel .smc-intel-levels{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important}
}
`;
    document.head.appendChild(style);
  }

  function ensureOverlay() {
    let overlay = document.getElementById("mobileDashboardDetailOverlay");
    if (overlay) return overlay;
    overlay = document.createElement("section");
    overlay.id = "mobileDashboardDetailOverlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = '<div class="mobile-detail-head"><strong id="mobileDetailTitle">Details</strong><button class="mobile-detail-close" type="button" aria-label="Close">×</button></div><div class="mobile-detail-body"></div>';
    document.body.appendChild(overlay);
    overlay.querySelector(".mobile-detail-close")?.addEventListener("click", closeDetail);
    return overlay;
  }

  function target(kind) {
    if (kind === "fundamental") return document.querySelector(".news-impact-panel");
    if (kind === "v2") return document.getElementById("v2-shadow-card");
    if (kind === "smc") return document.querySelector(".main-smc-panel");
    if (kind === "history") return document.querySelector(".history-section");
    return null;
  }
  function closeSideMenu() {
    const menu = document.getElementById("sideMenu");
    if (!menu) return;
    menu.classList.add("hidden");
    menu.setAttribute("aria-hidden", "true");
  }
  function openDetail(kind, title) {
    if (!isMobile()) return;
    const node = target(kind); if (!node) return;
    remember(node);
    const overlay = ensureOverlay();
    overlay.querySelector(".mobile-detail-body")?.replaceChildren(node);
    const heading = overlay.querySelector("#mobileDetailTitle"); if (heading) heading.textContent = title || "Details";
    overlay.classList.add("is-open"); overlay.setAttribute("aria-hidden", "false"); closeSideMenu();
  }
  function closeDetail() {
    const overlay = document.getElementById("mobileDashboardDetailOverlay"); if (!overlay) return;
    const node = overlay.querySelector(".mobile-detail-body")?.firstElementChild; if (node) restore(node);
    overlay.classList.remove("is-open"); overlay.setAttribute("aria-hidden", "true");
  }
  function makeMenuRow(id, icon, text, kind) {
    if (document.getElementById(id)) return null;
    const button = document.createElement("button"); button.id=id; button.type="button"; button.className="menu-row mobile-detail-menu-row";
    button.innerHTML='<span class="menu-row-icon">'+icon+'</span><span class="menu-row-text">'+text+'</span>';
    button.addEventListener("click",()=>openDetail(kind,text)); return button;
  }
  function ensureMobileMenuItems() {
    const inner=document.querySelector("#sideMenu .side-menu-inner"); if(!inner)return;
    const settings=document.querySelector("#sideMenu .menu-settings-group");
    [["menuFundamentalInsightBtn","◎","Fundamental Insight","fundamental"],["menuV2ShadowBtn","V2","V2 Shadow","v2"],["menuSmcDetailsBtn","⚡","SMC Plan Details","smc"]].forEach(args=>{const row=makeMenuRow(...args);if(row)inner.insertBefore(row,settings||null)});
  }
  function moveForMobile() {
    const section=document.querySelector(".chart-panel .chart-section"); const open=document.getElementById("mobileOpenTradeCard"); const smc=document.querySelector(".main-smc-panel"); const controls=section?.querySelector(".chart-controls");
    if(!section||!open||!smc)return; remember(open); remember(smc);
    if(open.parentNode!==section)section.insertBefore(open,controls||section.firstChild); if(smc.parentNode!==section)section.appendChild(smc);
    smc.setAttribute("role","button"); smc.setAttribute("tabindex","0"); smc.setAttribute("aria-label","Open full SMC plan");
    if(!smc.dataset.mobileDetailBound){smc.dataset.mobileDetailBound="1";smc.addEventListener("click",()=>{if(isMobile()&&smc.parentNode?.classList?.contains("chart-section"))openDetail("smc","SMC Plan")});smc.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&isMobile()){e.preventDefault();openDetail("smc","SMC Plan")}})}
  }
  function restoreDesktop(){closeDetail();restore(document.getElementById("mobileOpenTradeCard"));restore(document.querySelector(".main-smc-panel"))}
  function applyResponsiveRoleGuards(){if(typeof window.applyRoleVisibility==="function")window.applyRoleVisibility();installStyles();ensureOverlay();ensureMobileMenuItems();if(isMobile()){moveForMobile();mobileApplied=true}else if(mobileApplied){restoreDesktop();mobileApplied=false}}
  window.FlowSignalResponsiveLayout={apply:applyResponsiveRoleGuards,openDetail,closeDetail};
  window.addEventListener("resize",applyResponsiveRoleGuards);window.addEventListener("orientationchange",applyResponsiveRoleGuards);window.addEventListener("DOMContentLoaded",applyResponsiveRoleGuards);document.addEventListener("click",e=>{if(e.target?.closest?.("#menuDashboardBtn"))closeDetail()});
})();
