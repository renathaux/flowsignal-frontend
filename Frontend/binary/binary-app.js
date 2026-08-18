(function(){
  'use strict';

  const ROOT_ID='flowsignalBinaryApp';
  const CONNECTION_KEY='flowsignal_deriv_connection_id';
  const STATE_KEY='flowsignal_deriv_oauth_state';
  const VERIFIER_KEY='flowsignal_deriv_pkce_verifier';
  const USER_KEY='flowsignal_binary_user_id';
  const ACCOUNT_KEY='flowsignal_deriv_account_id';
  const FOREX_ALERT_PREF_KEY='soundEnabled';
  const FOREX_ALERT_GUARD_KEY='flowsignal_binary_oauth_forex_alert_guard';
  const BACKEND=(location.hostname==='localhost'||location.hostname==='127.0.0.1')?'http://127.0.0.1:8001':'https://flowsignal-backend-3.onrender.com';
  const POLL_MS=6000;
  const DEFAULT_STAKE=1;
  const EXPIRY_MINUTES=5;
  let mounted=false;
  let pollTimer=null;
  let executionBusy=false;
  let lastLocalSignalId='';
  let selectedAccount=null;

  function binaryUserId(){
    let value=localStorage.getItem(USER_KEY);
    if(!value){ value=crypto.randomUUID(); localStorage.setItem(USER_KEY,value); }
    return value;
  }

  // Deriv OAuth leaves FlowSignal and returns with a full-page reload. The
  // Forex alert module keeps its lastSignals only in JS memory, so a reload can
  // make an already-running BUY/SELL look "new" and replay an alert. During a
  // Binary OAuth round-trip only, temporarily mute Forex alerts while the first
  // dashboard snapshot establishes its baseline, then restore the exact prior
  // user preference. This does not touch Forex strategy/execution state.
  function beginForexAlertIsolationGuard(){
    const previous=localStorage.getItem(FOREX_ALERT_PREF_KEY);
    sessionStorage.setItem(FOREX_ALERT_GUARD_KEY,JSON.stringify({previous,startedAt:Date.now()}));
    localStorage.setItem(FOREX_ALERT_PREF_KEY,'false');
  }

  function restoreForexAlertIsolationGuard(){
    const raw=sessionStorage.getItem(FOREX_ALERT_GUARD_KEY);
    if(!raw) return;
    let state=null;
    try{ state=JSON.parse(raw); }catch(_error){}
    // Keep alerts muted long enough for at least two normal panel refreshes to
    // record the existing EURUSD/XAUUSD state as baseline after OAuth return.
    window.setTimeout(()=>{
      const prior=state?.previous;
      if(prior===null||prior===undefined) localStorage.removeItem(FOREX_ALERT_PREF_KEY);
      else localStorage.setItem(FOREX_ALERT_PREF_KEY,String(prior));
      sessionStorage.removeItem(FOREX_ALERT_GUARD_KEY);
      console.info('BINARY_OAUTH_FOREX_ALERT_GUARD_RESTORED');
    },15000);
  }

  // Run immediately on script evaluation, before normal dashboard polling has a
  // chance to replay an already-active Forex signal after the Deriv redirect.
  if(sessionStorage.getItem(FOREX_ALERT_GUARD_KEY)){
    localStorage.setItem(FOREX_ALERT_PREF_KEY,'false');
    restoreForexAlertIsolationGuard();
  }

  function injectCss(){
    if(document.querySelector('link[data-flowsignal-binary-css]')) return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='binary/binary.css?v=2';
    link.dataset.flowsignalBinaryCss='true';
    document.head.appendChild(link);
  }

  function cardHtml(){
    return '<div class="binary-app-title">BINARY 5M</div>'+
      '<div class="binary-app-signal" id="binaryDerivSignal">WAIT</div>'+
      `<div class="binary-app-meta" id="binaryDerivMeta">EURUSD · ${EXPIRY_MINUTES}m · AUTHORITATIVE V5 RELAY</div>`+
      '<div class="binary-app-account" id="binaryDerivAccount">ACCOUNT · NOT CONNECTED</div>'+
      '<div class="binary-app-status" id="binaryDerivStatus">DERIV-NATIVE STRATEGY · NOT CONNECTED</div>'+
      '<div class="binary-app-settings"><select id="binaryDerivAccountSelect" aria-label="Deriv account"></select><label><input id="binaryAutoToggle" type="checkbox"> Binary Auto</label><label>Stake <input id="binaryStake" type="number" min="0.01" step="0.01" value="1"></label><button type="button" id="binarySaveSettings">Save</button></div>'+
      '<div class="binary-app-actions">'+
        '<button type="button" id="binaryDerivConnectBtn">Connect Deriv</button>'+
        '<button type="button" id="binaryDerivDisconnectBtn" class="hidden">Disconnect</button>'+
      '</div>';
  }

  function findMountAnchor(){ return document.querySelector('.main-trade-card .main-smc-panel'); }
  function removeLegacyBinary(){ const legacy=document.getElementById('binary-shadow-placeholder'); if(legacy) legacy.remove(); }

  function mount(){
    removeLegacyBinary();
    if(document.getElementById(ROOT_ID)){mounted=true;startPolling();return true;}
    const anchor=findMountAnchor();
    if(!anchor) return false;
    injectCss();
    const root=document.createElement('section');
    root.id=ROOT_ID;
    root.className='flowsignal-binary-app';
    root.innerHTML=cardHtml();
    anchor.insertAdjacentElement('afterend',root);
    root.querySelector('#binaryDerivConnectBtn')?.addEventListener('click',onConnectClick);
    root.querySelector('#binaryDerivDisconnectBtn')?.addEventListener('click',onDisconnectClick);
    root.querySelector('#binaryDerivAccountSelect')?.addEventListener('change',onAccountSelect);
    root.querySelector('#binarySaveSettings')?.addEventListener('click',saveBinarySettings);
    mounted=true;
    refreshStatus();
    startPolling();
    console.info('BINARY_NATIVE_5M_APP_MOUNTED');
    return true;
  }

  function setStatus(text,isError=false){
    const el=document.getElementById('binaryDerivStatus');
    if(!el) return;
    el.textContent=text;
    el.classList.toggle('binary-app-error',Boolean(isError));
  }

  function setSignal(signal,confidence){
    const signalEl=document.getElementById('binaryDerivSignal');
    const metaEl=document.getElementById('binaryDerivMeta');
    const normalized=['RISE','FALL'].includes(String(signal||'').toUpperCase())?String(signal).toUpperCase():'WAIT';
    if(signalEl) signalEl.textContent=normalized;
    if(metaEl){
      const confidenceText=Number.isFinite(Number(confidence))?`${Math.round(Number(confidence))}%`:'--';
      metaEl.textContent=`EURUSD · ${EXPIRY_MINUTES}m · AUTHORITATIVE V5 · CONFIDENCE ${confidenceText}`;
    }
  }

  function randomVerifier(){
    const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const bytes=crypto.getRandomValues(new Uint8Array(64));
    return Array.from(bytes,b=>alphabet[b%alphabet.length]).join('');
  }
  async function codeChallenge(verifier){
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier));
    return btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/g,'');
  }
  function randomState(){ return Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join(''); }
  async function getConfig(){
    const response=await fetch(`${BACKEND}/deriv/config`,{cache:'no-store'});
    if(!response.ok) throw new Error(`backend ${response.status}`);
    return response.json();
  }

  async function onConnectClick(event){
    event.preventDefault(); event.stopPropagation();
    const button=event.currentTarget;
    button.disabled=true; button.textContent='Connecting…'; setStatus('PREPARING DERIV LOGIN…');
    try{
      const cfg=await getConfig();
      if(!cfg?.configured||!cfg?.client_id||!cfg?.authorization_url) throw new Error('Deriv app configuration unavailable');
      const verifier=randomVerifier(); const state=randomState(); const challenge=await codeChallenge(verifier);
      sessionStorage.setItem(VERIFIER_KEY,verifier); sessionStorage.setItem(STATE_KEY,state);
      const url=new URL(cfg.authorization_url);
      url.searchParams.set('response_type','code'); url.searchParams.set('client_id',cfg.client_id);
      url.searchParams.set('redirect_uri',cfg.redirect_uri); url.searchParams.set('scope',cfg.scope||'trade');
      url.searchParams.set('state',state); url.searchParams.set('code_challenge',challenge); url.searchParams.set('code_challenge_method','S256');
      beginForexAlertIsolationGuard();
      window.location.href=url.toString();
    }catch(error){
      console.error('BINARY_DERIV_CONNECT_ERROR',error); setStatus(`CONNECT ERROR · ${error.message||'unknown error'}`,true);
      button.disabled=false; button.textContent='Connect Deriv';
    }
  }

  async function onDisconnectClick(event){
    event.preventDefault(); const id=localStorage.getItem(CONNECTION_KEY);
    try{ if(id) await fetch(`${BACKEND}/deriv/disconnect`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({connection_id:id})}); }
    catch(error){ console.warn('BINARY_DERIV_DISCONNECT_WARNING',error); }
    localStorage.removeItem(CONNECTION_KEY); localStorage.removeItem(ACCOUNT_KEY); selectedAccount=null; lastLocalSignalId=''; refreshStatus();
  }

  async function loadBinarySettings(){
    if(!selectedAccount) return;
    const response=await fetch(`${BACKEND}/deriv/binary/account-settings/${encodeURIComponent(binaryUserId())}/${encodeURIComponent(selectedAccount.account_id||selectedAccount.id||selectedAccount.loginid)}`,{cache:'no-store'});
    if(!response.ok) return;
    const data=await response.json();
    document.getElementById('binaryAutoToggle').checked=Boolean(data.binary_auto_enabled);
    document.getElementById('binaryStake').value=String(data.binary_stake??DEFAULT_STAKE);
  }

  async function saveBinarySettings(){
    if(!selectedAccount) return setStatus('SELECT A DERIV ACCOUNT',true);
    const accountId=selectedAccount.account_id||selectedAccount.id||selectedAccount.loginid;
    const response=await fetch(`${BACKEND}/deriv/binary/account-settings`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:binaryUserId(),deriv_account_id:accountId,enabled:document.getElementById('binaryAutoToggle').checked,stake:Number(document.getElementById('binaryStake').value)})});
    const data=await response.json().catch(()=>({})); if(!response.ok) return setStatus(data.detail||'BINARY SETTINGS ERROR',true);
    await loadBinarySettings(); setStatus(`${data.account_type} ${data.deriv_account_id} · BINARY AUTO ${data.binary_auto_enabled?'ON':'OFF'}`);
  }

  async function onAccountSelect(event){
    const connectionId=localStorage.getItem(CONNECTION_KEY); const accountId=event.target.value;
    const response=await fetch(`${BACKEND}/deriv/account/select`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({connection_id:connectionId,user_id:binaryUserId(),deriv_account_id:accountId})});
    const data=await response.json().catch(()=>({})); if(!response.ok) return setStatus(data.detail||'ACCOUNT SELECTION BLOCKED',true);
    localStorage.setItem(ACCOUNT_KEY,accountId); await refreshStatus();
  }

  async function refreshStatus(){
    const root=document.getElementById(ROOT_ID); if(!root) return false;
    const connect=root.querySelector('#binaryDerivConnectBtn'); const disconnect=root.querySelector('#binaryDerivDisconnectBtn');
    const id=localStorage.getItem(CONNECTION_KEY);
    if(!id){ setStatus('DERIV-NATIVE 5M · NOT CONNECTED'); connect?.classList.remove('hidden'); disconnect?.classList.add('hidden'); return false; }
    try{
      const response=await fetch(`${BACKEND}/deriv/status`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({connection_id:id}),cache:'no-store'});
      const data=await response.json().catch(()=>({}));
      if(!response.ok||!data.connected){ localStorage.removeItem(CONNECTION_KEY); setStatus('DEMO CONNECTION EXPIRED',true); connect?.classList.remove('hidden'); disconnect?.classList.add('hidden'); return false; }
      connect?.classList.add('hidden'); disconnect?.classList.remove('hidden');
      const select=document.getElementById('binaryDerivAccountSelect'); const wanted=data.selected_account_id||localStorage.getItem(ACCOUNT_KEY)||'';
      select.innerHTML=(data.accounts||[]).map(a=>{const id=a.account_id||a.id||a.loginid; const type=a.account_type_normalized||'UNKNOWN'; return `<option value="${id}" ${id===wanted?'selected':''}>${type} · ${id}</option>`;}).join('');
      selectedAccount=(data.accounts||[]).find(a=>(a.account_id||a.id||a.loginid)===wanted)||null;
      if(!selectedAccount){ setStatus('DERIV CONNECTED · SELECT AN ACCOUNT',true); return false; }
      const id=selectedAccount.account_id||selectedAccount.id||selectedAccount.loginid; const type=selectedAccount.account_type_normalized||'UNKNOWN';
      localStorage.setItem(ACCOUNT_KEY,id); document.getElementById('binaryDerivAccount').textContent=`${type} · ${id} · ${selectedAccount.balance??'--'} ${selectedAccount.currency||''}`;
      await loadBinarySettings(); setStatus(`DERIV ${type} CONNECTED`); return type!=='UNKNOWN';
    }catch(error){ console.warn('BINARY_DERIV_STATUS_WARNING',error); setStatus('DERIV STATUS UNAVAILABLE',true); return false; }
  }

  async function executeNativeSignal(nativeSignal){
    if(executionBusy) return;
    const direction=String(nativeSignal?.signal||'WAIT').toUpperCase();
    const confidence=nativeSignal?.confidence;
    setSignal(direction,confidence);
    if(!['RISE','FALL'].includes(direction)) return;

    const connectionId=localStorage.getItem(CONNECTION_KEY);
    if(!connectionId) return;
    const signalId=String(nativeSignal?.signal_id||'').trim();
    if(!signalId){ setStatus('DEMO CONNECTED · WAITING FOR CLOSED 5M SIGNAL'); return; }
    if(signalId===lastLocalSignalId) return;

    const executionSide=direction==='RISE'?'BUY':'SELL';
    executionBusy=true;
    try{
      const accountType=selectedAccount?.account_type_normalized||'UNKNOWN'; const stake=document.getElementById('binaryStake').value;
      setStatus(`${direction} · ${accountType} · $${stake} / ${EXPIRY_MINUTES}m…`);
      const response=await fetch(`${BACKEND}/deriv/binary/v5/execute`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({connection_id:connectionId,user_id:binaryUserId(),signal_id:signalId}),
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data?.detail||`backend ${response.status}`);
      lastLocalSignalId=signalId;
      if(data.executed){
        const contract=data.contract_id?` · #${data.contract_id}`:'';
        setStatus(`${data.account_type} ${direction} · ${data.outcome||'OPEN'}${contract}`);
        console.info('BINARY_NATIVE_5M_EXECUTED',data);
      }else if(data.duplicate){ setStatus('DERIV DEMO CONNECTED · 5M SIGNAL ALREADY EXECUTED'); }
    }catch(error){
      console.error('BINARY_NATIVE_5M_EXECUTION_ERROR',error);
      setStatus(`DEMO EXECUTION ERROR · ${error.message||'unknown error'}`,true);
    }finally{ executionBusy=false; }
  }

  async function pollBinary(){
    if(!document.getElementById(ROOT_ID)) return;
    try{
      const response=await fetch(`${BACKEND}/deriv/binary/v5/signal`,{cache:'no-store'});
      if(!response.ok) throw new Error(`binary signal ${response.status}`);
      const data=await response.json();
      setSignal(data?.signal,data?.confidence);
      if(!data?.ok){
        setStatus(`BINARY DATA WAIT · ${data?.reason||'UNAVAILABLE'}`,true);
        return;
      }
      const connected=Boolean(localStorage.getItem(CONNECTION_KEY));
      if(connected){
        if(['RISE','FALL'].includes(String(data?.signal||'').toUpperCase())) await executeNativeSignal(data);
        else setStatus(`DERIV ${selectedAccount?.account_type_normalized||''} CONNECTED · WAIT · ${data?.reason||'NO RELAYED V5 SIGNAL'}`);
      }else{
        setStatus(`DERIV-NATIVE 5M · ${data?.reason||'READY'}`);
      }
    }catch(error){
      console.warn('BINARY_NATIVE_5M_POLL_WARNING',error);
      setSignal('WAIT',0);
      setStatus('BINARY 5M DATA UNAVAILABLE',true);
    }
  }

  function startPolling(){ if(pollTimer) return; pollBinary(); pollTimer=setInterval(pollBinary,POLL_MS); }
  function start(){
    removeLegacyBinary(); if(mount()) return; let tries=0;
    const timer=setInterval(()=>{ tries+=1; if(mount()||tries>=40) clearInterval(timer); },250);
  }

  document.addEventListener('flowsignal:authenticated',()=>setTimeout(start,0));
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
  window.addEventListener('focus',()=>{if(mounted){refreshStatus();pollBinary();}});
  window.FlowSignalBinary={mount,refreshStatus,pollBinary};
})();
