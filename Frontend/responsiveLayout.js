(function () {
  const MOBILE_QUERY = "(max-width: 700px)";
  const DETAIL_OVERLAY_ID = "mobileDashboardDetailOverlay";
  const STYLE_ID = "flowsignalMobileDashboardV2";
  const moved = new Map();
  let mobileApplied = false;

  function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }

  function remember(node) {
    if (!node || moved.has(node)) return;
    moved.set(node, {
      parent: node.parentNode,
      next: node.nextSibling,
    });
  }

  function restore(node) {
    const origin = moved.get(node);
    if (!node || !origin?.parent) return;
    if (origin.next && origin.next.parentNode === origin.parent) {
      origin.parent.insertBefore(node, origin.next);
    } else {
      origin.parent.appendChild(node);
    }
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
@media (max-width: 700px) {
  html, body {
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    overflow: hidden !important;
    overscroll-behavior: none !important;
  }

  body.fit-mode #mainApp.app:not(.locked) {
    box-sizing: border-box !important;
    width: 100% !important;
    height: 100dvh !important;
    min-height: 100dvh !important;
    max-height: 100dvh !important;
    padding: max(6px, env(safe-area-inset-top)) 8px max(6px, env(safe-area-inset-bottom)) !important;
    gap: 6px !important;
    overflow: hidden !important;
  }

  body.fit-mode #mainApp.app:not(.locked) > .top-header {
    flex: 0 0 42px !important;
    min-height: 42px !important;
    height: 42px !important;
    margin: 0 !important;
    padding: 0 !important;
    grid-template-columns: 38px minmax(0, 1fr) 64px !important;
    gap: 8px !important;
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  .top-header .menu-toggle {
    grid-column: 1 !important;
    width: 38px !important;
    height: 38px !important;
    border-radius: 11px !important;
  }

  .top-header .brand-left {
    grid-column: 2 !important;
    font-size: 20px !important;
    line-height: 1 !important;
    letter-spacing: -0.5px !important;
  }

  .top-header .app-logo-wave { font-size: 25px !important; }

  .mobile-live-status {
    display: grid !important;
    visibility: visible !important;
    grid-column: 3 !important;
    justify-self: end !important;
    place-items: center !important;
    width: 62px !important;
    height: 26px !important;
    border-radius: 999px !important;
    font-size: 9px !important;
  }

  body.fit-mode #mainApp.app:not(.locked) > .topbar,
  .mobile-notify-btn,
  .divider {
    display: none !important;
  }

  body.fit-mode #mainApp.app:not(.locked) > .performance-strip {
    flex: 0 0 50px !important;
    height: 50px !important;
    min-height: 50px !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 5px 4px !important;
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 0 !important;
    overflow: hidden !important;
    border-radius: 13px !important;
  }

  .performance-strip > .performance-card {
    min-width: 0 !important;
    min-height: 0 !important;
    height: 40px !important;
    padding: 2px 3px !important;
    display: grid !important;
    place-content: center !important;
    border-right: 1px solid rgba(148, 163, 184, 0.14) !important;
  }

  .performance-strip > .performance-daily { order: 1 !important; }
  .performance-strip > .performance-weekly { order: 2 !important; }
  .performance-strip > .performance-trades { order: 3 !important; }
  .performance-strip > .performance-floating { order: 4 !important; display: grid !important; visibility: visible !important; }
  .performance-strip > .performance-monthly { display: none !important; }
  .performance-strip > .performance-card:last-child { border-right: 0 !important; }
  .performance-strip .performance-icon,
  .performance-strip .performance-sparkline { display: none !important; }
  .performance-strip .performance-copy { min-width: 0 !important; text-align: center !important; }
  .performance-strip .performance-copy span {
    display: block !important;
    font-size: 7px !important;
    line-height: 1.05 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .performance-strip .performance-copy strong {
    display: block !important;
    margin-top: 3px !important;
    font-size: clamp(13px, 3.7vw, 17px) !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }
  .performance-floating .performance-copy span { font-size: 0 !important; }
  .performance-floating .performance-copy span::after { content: "LIVE P/L" !important; font-size: 7px !important; }
  .performance-trades .performance-copy span { font-size: 0 !important; }
  .performance-trades .performance-copy span::after { content: "OPEN" !important; font-size: 7px !important; }

  body.fit-mode #mainApp.app:not(.locked) > .dashboard-grid {
    flex: 1 1 auto !important;
    min-height: 0 !important;
    height: auto !important;
    overflow: hidden !important;
    display: grid !important;
    grid-template-columns: 1fr !important;
    grid-template-rows: 86px minmax(0, 1fr) !important;
    gap: 6px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .dashboard-grid > .signals-panel {
    order: 1 !important;
    min-height: 0 !important;
    height: 86px !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  .signals-panel .content-grid {
    height: 86px !important;
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 6px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  body.fit-mode .signals-panel .symbol-card {
    box-sizing: border-box !important;
    position: relative !important;
    min-width: 0 !important;
    width: 100% !important;
    height: 86px !important;
    min-height: 86px !important;
    margin: 0 !important;
    padding: 7px 7px 5px !important;
    border-radius: 13px !important;
    overflow: hidden !important;
  }

  .symbol-card .card-header { min-height: 15px !important; height: 15px !important; }
  .symbol-card .title-wrap { gap: 4px !important; }
  .symbol-card .card-title { font-size: 12px !important; line-height: 1 !important; letter-spacing: 0 !important; }
  .symbol-card .symbol-icon { height: 14px !important; max-width: 30px !important; }

  .symbol-card .signal-shell {
    position: absolute !important;
    top: 27px !important;
    left: 7px !important;
    width: 48% !important;
    height: 38px !important;
  }
  .symbol-card .signal-box {
    width: 100% !important;
    height: 38px !important;
    min-height: 38px !important;
    border-radius: 10px !important;
  }
  .symbol-card .signal-text {
    font-size: clamp(18px, 5.2vw, 23px) !important;
    letter-spacing: -0.5px !important;
  }
  .symbol-card .signal-freshness-note,
  .symbol-card .tags-row { display: none !important; }

  .symbol-card .metric-label {
    position: absolute !important;
    left: 56% !important;
    width: 39% !important;
    height: 10px !important;
    font-size: 0 !important;
    line-height: 1 !important;
    overflow: visible !important;
  }
  #eurusd-buy-label, #gold-buy-label { top: 25px !important; }
  #eurusd-sell-label, #gold-sell-label { top: 43px !important; }
  #eurusd-conf-label, #gold-conf-label { top: 61px !important; }
  #eurusd-buy-label::after, #gold-buy-label::after { content: "B" !important; font-size: 7px !important; }
  #eurusd-sell-label::after, #gold-sell-label::after { content: "S" !important; font-size: 7px !important; }
  #eurusd-conf-label::after, #gold-conf-label::after { content: "STR" !important; font-size: 7px !important; }

  .symbol-card .bar-wrap {
    position: absolute !important;
    left: 64% !important;
    width: 31% !important;
    height: 6px !important;
  }
  #eurusd-buy-label + .bar-wrap, #gold-buy-label + .bar-wrap { top: 27px !important; }
  #eurusd-sell-label + .bar-wrap, #gold-sell-label + .bar-wrap { top: 45px !important; }
  #eurusd-conf-label + .bar-wrap, #gold-conf-label + .bar-wrap { top: 63px !important; }
  .symbol-card .glow-bar {
    width: 100% !important;
    height: 6px !important;
    margin: 0 !important;
  }

  .dashboard-grid > .main-trade-panel { display: none !important; }

  .dashboard-grid > .chart-panel {
    order: 2 !important;
    min-height: 0 !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }
  .chart-panel .chart-wrap,
  .chart-panel .chart-section {
    min-height: 0 !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .chart-panel .chart-section {
    display: grid !important;
    grid-template-columns: 1fr !important;
    grid-template-rows: 104px 28px minmax(170px, 1fr) 32px 44px !important;
    gap: 5px !important;
    overflow: hidden !important;
  }

  #mobileOpenTradeCard {
    grid-row: 1 !important;
    width: 100% !important;
    height: 104px !important;
    min-height: 104px !important;
    margin: 0 !important;
    padding: 7px 9px !important;
    border-radius: 13px !important;
    overflow: hidden !important;
  }
  .mobile-open-trade-head { min-height: 16px !important; font-size: 10px !important; }
  .mobile-trade-empty { min-height: 54px !important; display: grid !important; place-items: center !important; font-size: 11px !important; }
  .mobile-trade-main { margin-top: 3px !important; min-height: 19px !important; }
  .mobile-trade-main strong { font-size: 14px !important; }
  .mobile-trade-main b { font-size: 14px !important; }
  .mobile-trade-side { font-size: 9px !important; padding: 2px 7px !important; }
  .mobile-trade-grid {
    margin-top: 4px !important;
    display: grid !important;
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
    gap: 2px !important;
  }
  .mobile-trade-grid span { min-width: 0 !important; font-size: 7px !important; text-align: center !important; }
  .mobile-trade-grid b { display: block !important; margin-top: 1px !important; font-size: 8.5px !important; white-space: nowrap !important; }
  .mobile-trade-protection { display: none !important; }
  .mobile-trade-progress { margin-top: 6px !important; height: 22px !important; }
  .mobile-trade-line { top: 7px !important; }
  .mobile-trade-line .marker b { font-size: 6.5px !important; margin-top: 14px !important; white-space: nowrap !important; }
  .mobile-trade-line .marker.live b { display: none !important; }

  .chart-section > .chart-controls {
    grid-row: 2 !important;
    min-height: 28px !important;
    height: 28px !important;
    margin: 0 !important;
    padding: 2px 5px !important;
    border-radius: 10px !important;
  }
  .chart-controls button { height: 23px !important; min-height: 23px !important; padding: 0 7px !important; font-size: 8px !important; }

  .chart-section > .chart-box {
    grid-row: 3 !important;
    min-height: 0 !important;
    height: 100% !important;
    margin: 0 !important;
    border-radius: 12px !important;
    overflow: hidden !important;
  }
  .chart-box #chartContainer {
    min-height: 0 !important;
    height: 100% !important;
  }
  .chart-overlay-header { top: 6px !important; left: 8px !important; }
  #chartOverlayTitle { font-size: 12px !important; }
  #chartOverlayOhlc { margin-top: 3px !important; font-size: 7px !important; }

  .chart-section > .mobile-timeframe-row {
    grid-row: 4 !important;
    height: 32px !important;
    min-height: 32px !important;
    margin: 0 !important;
    padding: 2px !important;
    gap: 3px !important;
  }
  .mobile-timeframe-row button { height: 28px !important; min-height: 28px !important; font-size: 8px !important; }

  .chart-section > .main-smc-panel {
    grid-row: 5 !important;
    box-sizing: border-box !important;
    display: grid !important;
    grid-template-columns: auto minmax(0, 1fr) !important;
    align-items: center !important;
    width: 100% !important;
    height: 44px !important;
    min-height: 44px !important;
    margin: 0 !important;
    padding: 5px 9px !important;
    gap: 9px !important;
    overflow: hidden !important;
    border-radius: 12px !important;
    cursor: pointer !important;
  }
  .chart-section > .main-smc-panel .smc-header {
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    font-size: 10px !important;
    white-space: nowrap !important;
  }
  .chart-section > .main-smc-panel .smc-row,
  .chart-section > .main-smc-panel .smc-intel-section,
  .chart-section > .main-smc-panel .smc-intel-levels,
  .chart-section > .main-smc-panel .smc-intel-progress { display: none !important; }
  .chart-section > .main-smc-panel .smc-plan-intel { margin: 0 !important; padding: 0 !important; border: 0 !important; }
  .chart-section > .main-smc-panel .smc-intel-grid:first-child {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 5px !important;
    margin: 0 !important;
  }
  .chart-section > .main-smc-panel .smc-intel-grid:first-child > div {
    min-width: 0 !important;
    padding: 0 6px !important;
    border: 0 !important;
    background: transparent !important;
  }
  .chart-section > .main-smc-panel .smc-intel-grid:first-child span { font-size: 6px !important; }
  .chart-section > .main-smc-panel .smc-intel-grid:first-child strong {
    display: block !important;
    margin-top: 2px !important;
    font-size: 9px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .news-impact-panel,
  #v2-shadow-card,
  .history-section,
  .entry-strategy-debug,
  .main-buttons-row,
  .main-bottom-row { display: none !important; }

  #mobileDashboardDetailOverlay {
    position: fixed !important;
    inset: 0 !important;
    z-index: 100000 !important;
    display: none !important;
    box-sizing: border-box !important;
    padding: max(10px, env(safe-area-inset-top)) 10px max(10px, env(safe-area-inset-bottom)) !important;
    background: #020812 !important;
    overflow: hidden !important;
  }
  #mobileDashboardDetailOverlay.is-open { display: grid !important; grid-template-rows: 46px minmax(0, 1fr) !important; }
  #mobileDashboardDetailOverlay .mobile-detail-head {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 10px !important;
    padding: 0 3px 6px !important;
  }
  #mobileDashboardDetailOverlay .mobile-detail-head strong { font-size: 17px !important; }
  #mobileDashboardDetailOverlay .mobile-detail-close {
    width: 38px !important;
    height: 38px !important;
    border: 1px solid rgba(148, 163, 184, 0.25) !important;
    border-radius: 11px !important;
    background: #081321 !important;
    color: #fff !important;
    font-size: 21px !important;
  }
  #mobileDashboardDetailOverlay .mobile-detail-body {
    min-height: 0 !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 18px !important;
  }
  #mobileDashboardDetailOverlay .news-impact-panel,
  #mobileDashboardDetailOverlay #v2-shadow-card,
  #mobileDashboardDetailOverlay .history-section,
  #mobileDashboardDetailOverlay .main-smc-panel {
    display: block !important;
    visibility: visible !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    margin: 0 !important;
    overflow: visible !important;
  }
  #mobileDashboardDetailOverlay .main-smc-panel {
    padding: 14px !important;
    border-radius: 16px !important;
    cursor: default !important;
  }
  #mobileDashboardDetailOverlay .main-smc-panel .smc-row { display: flex !important; }
  #mobileDashboardDetailOverlay .main-smc-panel .smc-plan-intel,
  #mobileDashboardDetailOverlay .main-smc-panel .smc-intel-section,
  #mobileDashboardDetailOverlay .main-smc-panel .smc-intel-grid,
  #mobileDashboardDetailOverlay .main-smc-panel .smc-intel-levels,
  #mobileDashboardDetailOverlay .main-smc-panel .smc-intel-progress { display: block !important; }
  #mobileDashboardDetailOverlay .main-smc-panel .smc-intel-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }
  #mobileDashboardDetailOverlay .main-smc-panel .smc-intel-levels {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }

  .side-menu .mobile-detail-menu-row { display: flex !important; }
}
`;
    document.head.appendChild(style);
  }

  function ensureOverlay() {
    let overlay = document.getElementById(DETAIL_OVERLAY_ID);
    if (overlay) return overlay;
    overlay = document.createElement("section");
    overlay.id = DETAIL_OVERLAY_ID;
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="mobile-detail-head">
        <strong id="mobileDetailTitle">Details</strong>
        <button class="mobile-detail-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="mobile-detail-body"></div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector(".mobile-detail-close")?.addEventListener("click", closeDetail);
    return overlay;
  }

  function detailTarget(kind) {
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
    const node = detailTarget(kind);
    if (!node) return;
    remember(node);
    const overlay = ensureOverlay();
    const body = overlay.querySelector(".mobile-detail-body");
    const heading = overlay.querySelector("#mobileDetailTitle");
    if (!body) return;
    body.replaceChildren(node);
    if (heading) heading.textContent = title || "Details";
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    closeSideMenu();
  }

  function closeDetail() {
    const overlay = document.getElementById(DETAIL_OVERLAY_ID);
    if (!overlay) return;
    const body = overlay.querySelector(".mobile-detail-body");
    const node = body?.firstElementChild;
    if (node) restore(node);
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
  }

  function makeMenuRow(id, icon, text, handler) {
    if (document.getElementById(id)) return null;
    const button = document.createElement("button");
    button.id = id;
    button.type = "button";
    button.className = "menu-row mobile-detail-menu-row";
    button.innerHTML = `<span class="menu-row-icon">${icon}</span><span class="menu-row-text">${text}</span>`;
    button.addEventListener("click", handler);
    return button;
  }

  function ensureMobileMenuItems() {
    const menuInner = document.querySelector("#sideMenu .side-menu-inner");
    if (!menuInner) return;
    const settings = document.querySelector("#sideMenu .menu-settings-group");
    const rows = [
      makeMenuRow("menuFundamentalInsightBtn", "◎", "Fundamental Insight", () => openDetail("fundamental", "Fundamental Insight")),
      makeMenuRow("menuV2ShadowBtn", "V2", "V2 Shadow", () => openDetail("v2", "V2 Shadow")),
      makeMenuRow("menuSmcDetailsBtn", "⚡", "SMC Plan Details", () => openDetail("smc", "SMC Plan")),
    ].filter(Boolean);
    rows.forEach((row) => menuInner.insertBefore(row, settings || null));
  }

  function moveForMobile() {
    const chartSection = document.querySelector(".chart-panel .chart-section");
    const openTrade = document.getElementById("mobileOpenTradeCard");
    const smc = document.querySelector(".main-smc-panel");
    const chartControls = chartSection?.querySelector(".chart-controls");
    if (!chartSection || !openTrade || !smc) return;

    remember(openTrade);
    remember(smc);

    if (openTrade.parentNode !== chartSection || openTrade.nextSibling !== chartControls) {
      chartSection.insertBefore(openTrade, chartControls || chartSection.firstChild);
    }
    if (smc.parentNode !== chartSection) {
      chartSection.appendChild(smc);
    }

    smc.setAttribute("role", "button");
    smc.setAttribute("tabindex", "0");
    smc.setAttribute("aria-label", "Open full SMC plan");
    if (!smc.dataset.mobileDetailBound) {
      smc.dataset.mobileDetailBound = "1";
      smc.addEventListener("click", () => {
        if (isMobile() && smc.parentNode?.classList?.contains("chart-section")) {
          openDetail("smc", "SMC Plan");
        }
      });
      smc.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && isMobile()) {
          event.preventDefault();
          openDetail("smc", "SMC Plan");
        }
      });
    }
  }

  function restoreDesktopLayout() {
    closeDetail();
    const openTrade = document.getElementById("mobileOpenTradeCard");
    const smc = document.querySelector(".main-smc-panel");
    restore(openTrade);
    restore(smc);
  }

  function applyResponsiveRoleGuards() {
    if (typeof window.applyRoleVisibility === "function") {
      window.applyRoleVisibility();
    }

    installStyles();
    ensureOverlay();
    ensureMobileMenuItems();

    if (isMobile()) {
      moveForMobile();
      mobileApplied = true;
    } else if (mobileApplied) {
      restoreDesktopLayout();
      mobileApplied = false;
    }
  }

  window.FlowSignalResponsiveLayout = {
    apply: applyResponsiveRoleGuards,
    openDetail,
    closeDetail,
  };

  window.addEventListener("resize", applyResponsiveRoleGuards);
  window.addEventListener("orientationchange", applyResponsiveRoleGuards);
  window.addEventListener("DOMContentLoaded", applyResponsiveRoleGuards);

  document.addEventListener("click", (event) => {
    if (event.target?.closest?.("#menuDashboardBtn")) closeDetail();
  });
})();
