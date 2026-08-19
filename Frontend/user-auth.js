(function(){
  'use strict';

  const LOCAL_BACKEND='http://127.0.0.1:8001';
  const DIRECT_BACKEND='https://flowsignal-backend-3.onrender.com';
  const IS_LOCAL=location.hostname==='localhost'||location.hostname==='127.0.0.1';
  const BACKEND=IS_LOCAL?LOCAL_BACKEND:`${location.origin}/api/proxy`;
  const CSRF_KEY='flowsignal_csrf_token';
  const OAUTH_USER_KEY='flowsignal_deriv_oauth_user_id';
  const LEGACY_BINARY_USER_KEY='flowsignal_binary_user_id';
  const LEGACY_SESSION_TOKEN_KEY='flowsignal_session_token';
  const TRADING_MODE_KEY='flowsignal_trading_mode';
  const PUBLIC_HOME_KEY='flowsignal_public_home_mode';
  const params=new URLSearchParams(location.search);
  if(params.get('home')==='1') localStorage.setItem(PUBLIC_HOME_KEY,'1');
  if(params.get('user')==='1') localStorage.removeItem(PUBLIC_HOME_KEY);
  if(params.has('home')||params.has('user')){
    params.delete('home');
    params.delete('user');
    const clean=`${location.pathname}${params.toString()?`?${params.toString()}`:''}${location.hash||''}`;
    history.replaceState(null,'',clean||'/');
  }
  let sessionUser=null;
  let csrfToken=sessionStorage.getItem(CSRF_KEY)||'';
  const nativeFetch=window.fetch.bind(window);

  function publicHome(){return localStorage.getItem(PUBLIC_HOME_KEY)==='1';}
  function installPublicHomeStyle(){
    if(document.getElementById('flowsignalPublicHomeStyle'))return;
    const style=document.createElement('style');
    style.id='flowsignalPublicHomeStyle';
    style.textContent='body.flowsignal-public-home #mainApp,body.flowsignal-public-home #smartExplain,body.flowsignal-public-home #assistantModal,body.flowsignal-public-home #tradeModal,body.flowsignal-public-home #adminModal,body.flowsignal-public-home #feedbackModal,body.flowsignal-public-home #statsModal,body.flowsignal-public-home #settingsModal,body.flowsignal-public-home #newsModeConfirmModal,body.flowsignal-public-home #brokerAccountsModal,body.flowsignal-public-home #paperModal,body.flowsignal-public-home #flowsignalTradingModeSelector{display:none!important;visibility:hidden!important;pointer-events:none!important}';
    document.head.appendChild(style);
  }
  function setPublicHome(enabled){
    if(enabled){localStorage.setItem(PUBLIC_HOME_KEY,'1');document.body.classList.add('flowsignal-public-home');}
    else{localStorage.removeItem(PUBLIC_HOME_KEY);document.body.classList.remove('flowsignal-public-home');}
  }

  function legacyOwner(){
    return String(sessionStorage.getItem('flowsignal_tab_role')||localStorage.getItem('flowsignal_role')||'').toLowerCase()==='admin';
  }

  function isBackend(input){
    try{
      const raw=typeof input==='string'?input:input?.url;
      if(!raw)return false;
      const parsed=new URL(raw,location.href);
      if(parsed.origin===new URL(DIRECT_BACKEND).origin)return true;
      if(IS_LOCAL)return parsed.origin===new URL(LOCAL_BACKEND).origin;
      return parsed.origin===location.origin&&parsed.pathname.startsWith('/api/proxy/');
    }catch(_error){return false;}
  }

  function customerUrl(raw){
    const parsed=new URL(raw,location.href);
    if(!sessionUser?.id)return parsed.toString();
    let logicalPath=parsed.pathname;
    if(!IS_LOCAL&&parsed.origin===location.origin&&logicalPath.startsWith('/api/proxy')) logicalPath=logicalPath.slice('/api/proxy'.length)||'/';
    if(parsed.origin===new URL(DIRECT_BACKEND).origin||(!IS_LOCAL&&parsed.origin===location.origin)){
      let match=logicalPath.match(/^\/deriv\/binary\/account-settings\/[^/]+\/([^/]+)$/);
      if(match)logicalPath=`/deriv/binary/account-settings/${match[1]}`;
      match=logicalPath.match(/^\/deriv\/binary\/execution-status\/[^/]+\/([^/]+)$/);
      if(match)logicalPath=`/deriv/binary/execution-status/${match[1]}`;
      if(logicalPath.startsWith('/deriv/'))logicalPath=`/user${logicalPath}`;
      if(!IS_LOCAL)return `${location.origin}/api/proxy${logicalPath}${parsed.search}`;
      parsed.pathname=logicalPath;
    }
    return parsed.toString();
  }

  function cleanBody(body){
    if(!sessionUser?.id||!body||typeof body!=='string')return body;
    try{const payload=JSON.parse(body);if(payload&&typeof payload==='object')delete payload.user_id;return JSON.stringify(payload);}catch(_error){return body;}
  }

  window.fetch=async function(input,init={}){
    if(!isBackend(input))return nativeFetch(input,init);
    const raw=typeof input==='string'?input:input.url;
    const url=customerUrl(raw);
    const options={...init,credentials:'include'};
    options.headers=new Headers(init.headers||{});
    const method=String(options.method||'GET').toUpperCase();
    if(sessionUser?.id&&!['GET','HEAD','OPTIONS'].includes(method)&&csrfToken)options.headers.set('X-FlowSignal-CSRF',csrfToken);
    if(!sessionUser?.id&&legacyOwner()&&!options.headers.has('Authorization')){
      const ownerToken=localStorage.getItem(LEGACY_SESSION_TOKEN_KEY);
      if(ownerToken)options.headers.set('Authorization',`Bearer ${ownerToken}`);
    }
    if(options.body)options.body=cleanBody(options.body);
    if(sessionUser?.id&&url.includes('/user/deriv/config'))sessionStorage.setItem(OAUTH_USER_KEY,sessionUser.id);
    return nativeFetch(url,options);
  };

  function showLanding(){
    installPublicHomeStyle();
    setPublicHome(true);
    const landing=document.getElementById('landingPage');
    const app=document.getElementById('mainApp');
    if(landing){landing.classList.remove('hidden');landing.style.removeProperty('display');}
    if(app){app.classList.add('hidden');app.classList.add('locked');app.style.removeProperty('display');}
    document.getElementById('smartExplain')?.classList.add('hidden');
  }

  function showApp(){
    setPublicHome(false);
    const landing=document.getElementById('landingPage');
    const app=document.getElementById('mainApp');
    if(landing){landing.classList.add('hidden');landing.style.display='none';}
    if(app){app.classList.remove('hidden');app.classList.remove('locked');app.style.display='flex';}
  }

  function openAccount(mode){
    setPublicHome(false);
    location.href=`/account.html?mode=${mode==='signup'?'signup':'login'}`;
  }

  function openOwnerAccess(event){
    event?.preventDefault?.();
    setPublicHome(false);
    const landing=document.getElementById('landingPage');
    if(landing){landing.classList.remove('hidden');landing.style.removeProperty('display');}
    if(typeof window.openFlowSignalAdminLogin==='function')window.openFlowSignalAdminLogin(event);
    else{
      document.getElementById('adminLoginBox')?.classList.remove('hidden');
      setTimeout(()=>document.getElementById('adminEmailInput')?.focus(),50);
    }
  }

  function enterFullUserDashboard(user){
    if(!user||String(user.role||'user').toLowerCase()!=='user')return;
    showApp();
    if(!localStorage.getItem(TRADING_MODE_KEY))localStorage.setItem(TRADING_MODE_KEY,'forex');
    let attempts=0;
    const reveal=()=>{
      attempts+=1;
      const selector=document.getElementById('flowsignalTradingModeSelector');
      const forex=document.getElementById('flowsignalForexMode');
      const binary=document.getElementById('flowsignalBinaryMode');
      if(selector){selector.hidden=false;selector.removeAttribute('hidden');selector.setAttribute('aria-hidden','false');selector.style.removeProperty('display');selector.style.removeProperty('visibility');}
      if(selector&&forex&&binary){
        const mode=String(localStorage.getItem(TRADING_MODE_KEY)||'forex').toLowerCase()==='binary'?'binary':'forex';
        selector.querySelector(`[data-trading-mode="${mode}"]`)?.click();
        document.dispatchEvent(new CustomEvent('flowsignal:user-dashboard-ready',{detail:{user,mode}}));
        return;
      }
      if(attempts<50)setTimeout(reveal,100);
    };
    reveal();
  }

  function applyUser(user){
    sessionUser=user||null;
    if(!user)return;
    localStorage.setItem(LEGACY_BINARY_USER_KEY,user.id);
    localStorage.setItem('flowsignal_role',user.role||'user');
    sessionStorage.setItem('flowsignal_tab_role',user.role||'user');
    document.body.dataset.userRole=user.role||'user';
    document.dispatchEvent(new CustomEvent('flowsignal:authenticated',{detail:{user}}));
    enterFullUserDashboard(user);
  }

  async function session(){
    if(publicHome()){
      sessionUser=null;
      csrfToken='';
      sessionStorage.removeItem(CSRF_KEY);
      showLanding();
      return null;
    }
    if(legacyOwner())return null;
    try{
      const response=await nativeFetch(`${BACKEND}/auth/session`,{credentials:'include',cache:'no-store'});
      const data=await response.json().catch(()=>({}));
      if(data?.authenticated&&data?.user){csrfToken=String(data.csrf_token||'');sessionStorage.setItem(CSRF_KEY,csrfToken);applyUser(data.user);return data.user;}
    }catch(_error){}
    sessionUser=null;csrfToken='';sessionStorage.removeItem(CSRF_KEY);showLanding();return null;
  }

  async function logout(){
    try{await window.fetch(`${BACKEND}/auth/logout`,{method:'POST'});}catch(_error){}
    sessionUser=null;csrfToken='';sessionStorage.removeItem(CSRF_KEY);localStorage.removeItem(LEGACY_BINARY_USER_KEY);localStorage.removeItem('flowsignal_deriv_connection_id');localStorage.removeItem('flowsignal_deriv_account_id');if(String(localStorage.getItem('flowsignal_role')||'').toLowerCase()==='user')localStorage.removeItem('flowsignal_role');sessionStorage.removeItem('flowsignal_tab_role');showLanding();
  }

  function wireLanding(){
    const login=document.getElementById('openAdminLoginBtn');
    if(login){login.removeAttribute('onclick');login.textContent='Login';login.addEventListener('click',event=>{event.preventDefault();openAccount('login');});}
    const started=document.getElementById('openAccessBtn');
    if(started){started.removeAttribute('onclick');started.removeAttribute('data-open-access');started.textContent='Get Started';started.addEventListener('click',event=>{event.preventDefault();openAccount('signup');});}
    const hero=document.getElementById('openAccessBtnHero');
    if(hero){hero.removeAttribute('onclick');hero.removeAttribute('data-open-access');hero.textContent='Create Account →';hero.addEventListener('click',event=>{event.preventDefault();openAccount('signup');});}
    const nav=document.querySelector('.landing-nav-actions');
    if(nav&&!document.getElementById('landingOwnerBtn')){
      const owner=document.createElement('button');owner.id='landingOwnerBtn';owner.className='landing-login-btn';owner.type='button';owner.textContent='Owner';owner.title='Owner / Admin access';owner.addEventListener('click',openOwnerAccess);nav.appendChild(owner);
    }
  }

  document.addEventListener('click',event=>{if(event.target?.closest?.('#logoutBtn,#binaryLogoutBtn')){event.preventDefault();logout();}},true);

  installPublicHomeStyle();
  wireLanding();
  window.FlowSignalAuth={get user(){return sessionUser;},get csrf(){return csrfToken;},currentUserId(){return sessionUser?.id||'';},session,logout,open(mode='login'){openAccount(mode);},openOwner:openOwnerAccess,backend:BACKEND};
  session();
})();