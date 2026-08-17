(function () {
  const TAB_ROLE_KEY = "flowsignal_tab_role";
  const SHARED_ROLE_KEY = "flowsignal_role";

  function normalizeRole(value) {
    const role = String(value || "").toLowerCase();
    return role === "admin" || role === "user" ? role : "";
  }

  function isChromeDesktop() {
    const ua = String(navigator.userAgent || "");
    const chrome = /Chrome\//.test(ua) && !/(Edg|OPR|SamsungBrowser)\//.test(ua);
    return chrome && window.matchMedia("(min-width: 701px)").matches;
  }

  function isSafariDesktop() {
    const ua = String(navigator.userAgent || "");
    const safari = /Safari\//.test(ua) && /Version\//.test(ua) && !/(Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS)\//.test(ua);
    return safari && window.matchMedia("(min-width: 701px)").matches;
  }

  const chromeDesktop = isChromeDesktop();
  const safariDesktop = isSafariDesktop();
  const supportedDesktop = chromeDesktop || safariDesktop;
  if (chromeDesktop) document.body?.classList.add("flowsignal-chrome-desktop");
  if (safariDesktop) document.body?.classList.add("flowsignal-safari-desktop");

  function installSafariSpeechNormalizer() {
    if (!safariDesktop || !window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") return;
    if (window.speechSynthesis.__flowSignalSafariVoicePatched) return;
    const synth = window.speechSynthesis;
    const nativeSpeak = synth.speak.bind(synth);
    function languagePrefix(lang) { return String(lang || document.documentElement.lang || "en-US").toLowerCase().split("-")[0]; }
    function preferredVoiceFor(lang) {
      const voices = synth.getVoices?.() || [];
      if (!voices.length) return null;
      const prefix = languagePrefix(lang);
      const preferredNames = prefix === "fr" ? ["Amélie", "Audrey", "Thomas"] : prefix === "es" ? ["Mónica", "Monica", "Jorge", "Paulina"] : ["Samantha", "Ava", "Allison", "Susan", "Alex"];
      for (const name of preferredNames) {
        const exact = voices.find((voice) => voice.name === name && languagePrefix(voice.lang) === prefix);
        if (exact) return exact;
      }
      return voices.find((voice) => languagePrefix(voice.lang) === prefix && voice.localService !== false) || voices.find((voice) => languagePrefix(voice.lang) === prefix) || null;
    }
    synth.speak = function (utterance) {
      if (utterance instanceof SpeechSynthesisUtterance) {
        const voice = preferredVoiceFor(utterance.lang);
        if (voice) { utterance.voice = voice; if (!utterance.lang) utterance.lang = voice.lang; }
        utterance.rate = 0.94; utterance.pitch = 1.0; utterance.volume = 1.0;
      }
      return nativeSpeak(utterance);
    };
    synth.__flowSignalSafariVoicePatched = true;
  }
  installSafariSpeechNormalizer();

  function getTabRole() { return normalizeRole(sessionStorage.getItem(TAB_ROLE_KEY)); }
  function setTabRole(role) {
    const normalized = normalizeRole(role); if (!normalized) return false;
    sessionStorage.setItem(TAB_ROLE_KEY, normalized); document.body.dataset.userRole = normalized; return true;
  }
  if (!getTabRole()) { const inherited = normalizeRole(localStorage.getItem(SHARED_ROLE_KEY)); if (inherited) setTabRole(inherited); }
  window.isAdminAccount = function () { return getTabRole() === "admin"; };

  function currentStrategyHasFreshSignal() {
    const signal = String(document.getElementById("main-signal")?.textContent || "").trim().toUpperCase();
    return signal === "BUY" || signal === "SELL";
  }
  function setText(id, value) { const element = document.getElementById(id); if (element && element.textContent !== value) element.textContent = value; }
  function currentWaitReason() {
    const values = [document.getElementById("main-blocked-reason")?.textContent, document.getElementById("main-rr")?.textContent, document.getElementById("v2-shadow-reason")?.textContent].map((value) => String(value || "").trim()).filter(Boolean);
    return values.find((value) => /^WAIT(?:_|$)/i.test(value)) || values.find((value) => value !== "--" && value !== "WAIT") || "--";
  }
  function forceVisible(element, display = "block") {
    if (!element) return; element.classList.remove("hidden", "admin-only-hidden"); element.removeAttribute("hidden"); element.setAttribute("aria-hidden", "false"); element.style.setProperty("display", display, "important"); element.style.setProperty("visibility", "visible", "important"); element.style.setProperty("opacity", "1", "important");
  }
  function applyChromeReadability() {
    if (!chromeDesktop) return; const bias = document.getElementById("fundamental-bias");
    if (bias) { bias.style.setProperty("font-size", "30px", "important"); bias.style.setProperty("line-height", "1", "important"); bias.style.setProperty("letter-spacing", "-0.02em", "important"); bias.style.setProperty("white-space", "nowrap", "important"); }
  }
  function ensureSafariInsightVisibility() { if (!safariDesktop) return; forceVisible(document.querySelector(".news-impact-panel")); forceVisible(document.getElementById("fundamental-insight-card")); forceVisible(document.getElementById("v2-shadow-card")); }
  function keepAnalysisCardsVisible() {
    const smcPlan = document.querySelector(".main-smc-panel"); const smcIntel = document.getElementById("main-smc-plan-intel"); const strategyChecks = document.querySelector(".entry-strategy-debug");
    forceVisible(smcPlan); forceVisible(smcIntel); forceVisible(strategyChecks); if (strategyChecks) strategyChecks.open = true;
  }

  function ensureDesktopAnalysisLayout() {
    if (!supportedDesktop) return;
    const leftColumn = document.querySelector(".left-panel") || document.querySelector(".left-column") || document.getElementById("eurusd-card")?.parentElement;
    const mainCard = document.querySelector(".main-trade-card");
    const strategyChecks = document.querySelector(".entry-strategy-debug");
    if (leftColumn && strategyChecks && document.getElementById("gold-card")) {
      const gold = document.getElementById("gold-card");
      if (strategyChecks.parentElement !== leftColumn || gold.nextElementSibling !== strategyChecks) gold.insertAdjacentElement("afterend", strategyChecks);
    }
    let binary = document.getElementById("binary-shadow-placeholder");
    if (!binary) {
      binary = document.createElement("section"); binary.id = "binary-shadow-placeholder"; binary.className = "binary-shadow-placeholder";
      binary.innerHTML = '<div class="binary-shadow-title">BINARY SHADOW</div><div class="binary-shadow-signal">WAIT</div><div class="binary-shadow-meta">15m EXPIRY &nbsp; • &nbsp; CONFIDENCE --</div><div class="binary-shadow-note">SHADOW — NO ORDERS</div>';
    }
    if (mainCard) {
      const smc = mainCard.querySelector(".main-smc-panel");
      if (smc && binary.parentElement !== mainCard) smc.insertAdjacentElement("afterend", binary);
      else if (smc && smc.nextElementSibling !== binary) smc.insertAdjacentElement("afterend", binary);
    }
  }

  function clearExpiredEntryChecks() {
    if (!supportedDesktop || currentStrategyHasFreshSignal()) return; keepAnalysisCardsVisible();
    ["strategy-debug-smc","strategy-debug-swing-break","strategy-debug-15m-close","strategy-debug-5m-confirm","strategy-debug-swing-sl"].forEach((id) => setText(id, "NO"));
    setText("strategy-debug-decision", "WAIT"); setText("strategy-debug-block-reason", currentWaitReason());
  }
  function syncCurrentStrategyPresentation() { if (!supportedDesktop) return; keepAnalysisCardsVisible(); ensureDesktopAnalysisLayout(); applyChromeReadability(); if (!currentStrategyHasFreshSignal()) clearExpiredEntryChecks(); }
  function ensureUserAnalysisVisibility() {
    if (!supportedDesktop || getTabRole() !== "user") { if (supportedDesktop) syncCurrentStrategyPresentation(); return; }
    const mainTradePanel = document.querySelector(".main-trade-panel"); const mainTradeCard = document.querySelector(".main-trade-card"); forceVisible(mainTradePanel); forceVisible(mainTradeCard);
    [mainTradePanel, mainTradeCard].forEach((element) => { if (!element) return; element.style.setProperty("height", "auto", "important"); element.style.setProperty("max-height", "none", "important"); element.style.setProperty("overflow", "visible", "important"); });
    keepAnalysisCardsVisible(); syncCurrentStrategyPresentation();
  }
  function attachDashboardObserver() {
    if (!supportedDesktop) return; const dashboard = document.querySelector(".dashboard-grid") || document.getElementById("mainApp"); if (!dashboard || dashboard.dataset.flowSignalUserAnalysisObserver === "true") return;
    dashboard.dataset.flowSignalUserAnalysisObserver = "true"; let scheduled = false;
    const observer = new MutationObserver(() => { if (scheduled) return; scheduled = true; window.requestAnimationFrame(() => { scheduled = false; applyChromeReadability(); ensureSafariInsightVisibility(); ensureDesktopAnalysisLayout(); if (getTabRole() === "user") ensureUserAnalysisVisibility(); }); });
    observer.observe(dashboard, { childList:true, subtree:true, attributes:true, attributeFilter:["class","style","hidden","aria-hidden"] });
  }
  function refreshRoleUi() {
    const role = getTabRole(); if (!role) return; document.body.dataset.userRole = role;
    try { window.applyRoleVisibility?.(); } catch (_error) {} try { window.updatePnlVisibility?.(); } catch (_error) {}
    applyChromeReadability(); ensureSafariInsightVisibility(); ensureDesktopAnalysisLayout(); if (supportedDesktop) ensureUserAnalysisVisibility(); attachDashboardObserver();
  }
  function adoptRequestedRole(requestedRole) {
    const wanted = normalizeRole(requestedRole); if (!wanted) return; let tries = 0;
    const timer = window.setInterval(() => { tries += 1; const shared = normalizeRole(localStorage.getItem(SHARED_ROLE_KEY)); if (shared === wanted) { window.clearInterval(timer); setTabRole(wanted); refreshRoleUi(); return; } if (tries >= 60) window.clearInterval(timer); }, 100);
  }
  document.addEventListener("click", (event) => { const target = event.target?.closest?.("#adminLoginBtn, #accessBtn"); if (!target) return; if (target.id === "adminLoginBtn") adoptRequestedRole("admin"); if (target.id === "accessBtn") adoptRequestedRole("user"); }, true);
  window.addEventListener("storage", (event) => { if (event.key !== SHARED_ROLE_KEY) return; refreshRoleUi(); });
  document.addEventListener("flowsignal:authenticated", () => { window.setTimeout(refreshRoleUi, 0); window.setTimeout(refreshRoleUi, 250); });
  window.addEventListener("load", () => { window.setTimeout(refreshRoleUi, 0); window.setTimeout(refreshRoleUi, 300); }, { once:true });
  if (supportedDesktop) window.setInterval(() => { applyChromeReadability(); ensureSafariInsightVisibility(); ensureDesktopAnalysisLayout(); if (getTabRole() === "user") ensureUserAnalysisVisibility(); }, 750);
  refreshRoleUi();
  window.FlowSignalTabRole = { get:getTabRole, set(role) { if (!setTabRole(role)) return false; refreshRoleUi(); return true; } };
})();
