(function(){
  'use strict';

  const ROOT_ID='flowsignalBinaryApp';
  const CONNECTION_KEY='flowsignal_deriv_connection_id';
  const STATE_KEY='flowsignal_deriv_oauth_state';
  const VERIFIER_KEY='flowsignal_deriv_pkce_verifier';
  const BACKEND=(location.hostname==='localhost'||location.hostname==='127.0.0.1')?'http://127.0.0.1:8001':'https://flowsignal-backend-3.onrender.com';
  const POLL_MS=6000;
  let mounted=false;
  let pollTimer=null;
  let executionBusy=false;
  let lastLocalSignalId='';

  function injectCss(){
    if(document.querySelector('link[data-flowsignal-binary-css]')) return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='binary/binary.css?v=2';
    link.dataset.flowsignalBinaryCss='true';
    document.head.appendChild(link);
  }

  function cardHtml(){
    return '<div class="binary-app-title">BINARY SHADOW</div>'+
      '<div class="binary-app-signal" id="binaryDerivSignal">WAIT</div>'+
      '<div class="binary-app-meta" id="binaryDerivMeta">EURUSD · 15m EXPIRY · $1 DEMO STAKE · CONFIDENCE --</div>'+
      '<div class="binary-app-status" id="binaryDerivStatus">DEMO ONLY · NOT CONNECTED</div>'+
      '<div class="binary-app-actions">'+
        '<button type="button" id="binaryDerivConnectBtn">Connect Deriv Demo</button>'+
        '<button type="button" id="binaryDerivDisconnectBtn" class="hidden">Disconnect</button>'+
      '</div>';
  }

  function findMountAnchor(){ return document.querySelector('.main-trade-card .main-smc-panel'); }

  function removeLegacyBinary(){
    const legacy=document.getElementById('binary-shadow-placeholder');
    if(legacy) legacy.remove();
  }

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
    mounted=true;
    refreshStatus();
    startPolling();
    console.info('BINARY_APP_MOUNTED');
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
    const normalized=['BUY','SELL'].includes(String(signal||'').toUpperCase())?String(signal).toUpperCase():'WAIT';
    if(signalEl) signalEl.textContent=normalized;
    if(metaEl){
      const confidenceText=Number.isFinite(Number(confidence))?`${Math.round(Number(confidence))}%`:'--';
      metaEl.textContent=`EURUSD · 15m EXPIRY · $1 DEMO STAKE · CONFIDENCE ${confidenceText}`;
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
    event.preventDefault();
    event.stopPropagation();
    const button=event.currentTarget;
    button.disabled=true;
    button.textContent='Connecting…';
    setStatus('PREPARING DERIV LOGIN…');
    console.info('BINARY_CONNECT_CLICK');
    try{
      const cfg=await getConfig();
      if(!cfg?.configured||!cfg?.client_id||!cfg?.authorization_url) throw new Error('Deriv app configuration unavailable');
      const verifier=randomVerifier();
      const state=randomState();
      const challenge=await codeChallenge(verifier);
      sessionStorage.setItem(VERIFIER_KEY,verifier);
      sessionStorage.setItem(STATE_KEY,state);
      const url=new URL(cfg.authorization_url);
      url.searchParams.set('response_type','code');
      url.searchParams.set('client_id',cfg.client_id);
      url.searchParams.set('redirect_uri',cfg.redirect_uri);
      url.searchParams.set('scope',cfg.scope||'trade');
      url.searchParams.set('state',state);
      url.searchParams.set('code_challenge',challenge);
      url.searchParams.set('code_challenge_method','S256');
      window.location.href=url.toString();
    }catch(error){
      console.error('BINARY_DERIV_CONNECT_ERROR',error);
      setStatus(`CONNECT ERROR · ${error.message||'unknown error'}`,true);
      button.disabled=false;
      button.textContent='Connect Deriv Demo';
    }
  }

  async function onDisconnectClick(event){
    event.preventDefault();
    const id=localStorage.getItem(CONNECTION_KEY);
    try{
      if(id) await fetch(`${BACKEND}/deriv/disconnect`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({connection_id:id})});
    }catch(error){ console.warn('BINARY_DERIV_DISCONNECT_WARNING',error); }
    localStorage.removeItem(CONNECTION_KEY);
    lastLocalSignalId='';
    refreshStatus();
  }

  async function refreshStatus(){
    const root=document.getElementById(ROOT_ID);
    if(!root) return false;
    const connect=root.querySelector('#binaryDerivConnectBtn');
    const disconnect=root.querySelector('#binaryDerivDisconnectBtn');
    const id=localStorage.getItem(CONNECTION_KEY);
    if(!id){
      setStatus('DEMO ONLY · NOT CONNECTED');
      connect?.classList.remove('hidden');
      disconnect?.classList.add('hidden');
      return false;
    }
    try{
      const response=await fetch(`${BACKEND}/deriv/status`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({connection_id:id}),cache:'no-store'});
      const data=await response.json().catch(()=>({}));
      if(!response.ok||!data.connected){
        localStorage.removeItem(CONNECTION_KEY);
        setStatus('DEMO ONLY · CONNECTION EXPIRED',true);
        connect?.classList.remove('hidden');
        disconnect?.classList.add('hidden');
        return false;
      }
      connect?.classList.add('hidden');
      disconnect?.classList.remove('hidden');
      const demo=(data.demo_accounts||[])[0];
      if(data.demo_account_verified){
        const balance=demo?.balance!=null?` · ${demo.balance} ${demo.currency||''}`:'';
        setStatus(`DERIV DEMO CONNECTED${balance}`);
        return true;
      }
      setStatus('DERIV CONNECTED · DEMO VERIFICATION REQUIRED',true);
      return false;
    }catch(error){
      console.warn('BINARY_DERIV_STATUS_WARNING',error);
      setStatus('DERIV STATUS UNAVAILABLE',true);
      return false;
    }
  }

  function uniqueSignalId(plan,side){
    const setup=plan?.signal_setup_id||plan?.setup_id||plan?.setup_identity?.id;
    if(setup) return `EURUSD:${side}:${setup}`;
    const timestamp=plan?.fifteen_m_break_close_time||plan?.fifteen_m_break_time||plan?.signal_timestamp||plan?.last_signal_time||plan?.decision_time;
    if(timestamp) return `EURUSD:${side}:${timestamp}`;
    return '';
  }

  async function executeIfActionable(plan){
    if(executionBusy) return;
    const side=String(plan?.strategy_decision||plan?.signal||'WAIT').toUpperCase();
    const confidence=plan?.confidence??plan?.bias_strength??plan?.signal_confidence;
    setSignal(side,confidence);
    if(!['BUY','SELL'].includes(side)) return;

    const connectionId=localStorage.getItem(CONNECTION_KEY);
    if(!connectionId) return;
    const signalId=uniqueSignalId(plan,side);
    if(!signalId){
      setStatus('DEMO CONNECTED · WAITING FOR UNIQUE SETUP ID');
      return;
    }
    if(signalId===lastLocalSignalId) return;

    executionBusy=true;
    try{
      setStatus(`${side} SIGNAL · SENDING $1 DEMO CONTRACT…`);
      const response=await fetch(`${BACKEND}/deriv/demo/execute-signal`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({connection_id:connectionId,signal:side,signal_id:signalId}),
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data?.detail||`backend ${response.status}`);
      lastLocalSignalId=signalId;
      if(data.executed){
        const direction=data.contract_type==='CALL'?'RISE':'FALL';
        const contract=data.contract_id?` · #${data.contract_id}`:'';
        setStatus(`DEMO ${direction} OPEN · $1 · 15m${contract}`);
        console.info('BINARY_DERIV_DEMO_EXECUTED',data);
      }else if(data.duplicate){
        setStatus('DERIV DEMO CONNECTED · SIGNAL ALREADY EXECUTED');
      }
    }catch(error){
      console.error('BINARY_DERIV_EXECUTION_ERROR',error);
      setStatus(`DEMO EXECUTION ERROR · ${error.message||'unknown error'}`,true);
    }finally{
      executionBusy=false;
    }
  }

  async function pollBinary(){
    if(!document.getElementById(ROOT_ID)) return;
    try{
      const response=await fetch(`${BACKEND}/dashboard-feed`,{cache:'no-store'});
      if(!response.ok) return;
      const data=await response.json();
      const plan=data?.EURUSD||{};
      const connected=Boolean(localStorage.getItem(CONNECTION_KEY));
      if(connected) await executeIfActionable(plan);
      else setSignal(plan?.strategy_decision||plan?.signal,plan?.confidence??plan?.bias_strength);
    }catch(error){
      console.warn('BINARY_SIGNAL_POLL_WARNING',error);
    }
  }

  function startPolling(){
    if(pollTimer) return;
    pollBinary();
    pollTimer=setInterval(pollBinary,POLL_MS);
  }

  function start(){
    removeLegacyBinary();
    if(mount()) return;
    let tries=0;
    const timer=setInterval(()=>{
      tries+=1;
      if(mount()||tries>=40) clearInterval(timer);
    },250);
  }

  document.addEventListener('flowsignal:authenticated',()=>setTimeout(start,0));
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
  window.addEventListener('focus',()=>{if(mounted){refreshStatus();pollBinary();}});
  window.FlowSignalBinary={mount,refreshStatus,pollBinary};
})();
