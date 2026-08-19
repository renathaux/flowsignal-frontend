(function(){
  'use strict';
  const BACKEND=(location.hostname==='localhost'||location.hostname==='127.0.0.1')?'http://127.0.0.1:8001':'https://flowsignal-backend-3.onrender.com';
  const CSRF_KEY='flowsignal_csrf_token';
  const OAUTH_USER_KEY='flowsignal_deriv_oauth_user_id';
  const LEGACY_BINARY_USER_KEY='flowsignal_binary_user_id';
  const LEGACY_SESSION_TOKEN_KEY='flowsignal_session_token';
  const TRADING_MODE_KEY='flowsignal_trading_mode';
  let sessionUser=null;
  let csrfToken=sessionStorage.getItem(CSRF_KEY)||'';
  const nativeFetch=window.fetch.bind(window);

  function legacyOwner(){return String(sessionStorage.getItem('flowsignal_tab_role')||localStorage.getItem('flowsignal_role')||'').toLowerCase()==='admin';}
  function isBackend(input){try{const raw=typeof input==='string'?input:input?.url; return raw&&new URL(raw,location.href).origin===new URL(BACKEND).origin;}catch(_error){return false;}}
  function rewriteDerivUrl(url){
    const parsed=new URL(url,location.href);
    if(!sessionUser?.id) return parsed.toString();
    let match=parsed.pathname.match(/^\/deriv\/binary\/account-settings\/[^/]+\/([^/]+)$/);
    if(match) parsed.pathname=`/deriv/binary/account-settings/${match[1]}`;
    match=parsed.pathname.match(/^\/deriv\/binary\/execution-status\/[^/]+\/([^/]+)$/);
    if(match) parsed.pathname=`/deriv/binary/execution-status/${match[1]}`;
    if(parsed.pathname.startsWith('/deriv/')) parsed.pathname=`/user${parsed.pathname}`;
    return parsed.toString();
  }
  function rewriteBody(body){
    if(!sessionUser?.id||!body||typeof body!=='string') return body;
    try{const payload=JSON.parse(body); if(payload&&typeof payload==='object') delete payload.user_id; return JSON.stringify(payload);}catch(_error){return body;}
  }
  window.fetch=async function(input,init={}){
    if(!isBackend(input)) return nativeFetch(input,init);
    const raw=typeof input==='string'?input:input.url;
    const url=rewriteDerivUrl(raw);
    const options={...init,credentials:'include'};
    options.headers=new Headers(init.headers||{});
    const method=String(options.method||'GET').toUpperCase();
    if(sessionUser?.id&&!['GET','HEAD','OPTIONS'].includes(method)&&csrfToken) options.headers.set('X-FlowSignal-CSRF',csrfToken);
    if(!sessionUser?.id&&legacyOwner()&&!options.headers.has('Authorization')){
      const ownerToken=localStorage.getItem(LEGACY_SESSION_TOKEN_KEY);
      if(ownerToken) options.headers.set('Authorization',`Bearer ${ownerToken}`);
    }
    if(options.body) options.body=rewriteBody(options.body);
    if(sessionUser?.id&&url.includes('/user/deriv/config')) sessionStorage.setItem(OAUTH_USER_KEY,sessionUser.id);
    return nativeFetch(url,options);
  };

  function style(){if(document.getElementById('flowsignalUserAuthStyle')) return; const link=document.createElement('link'); link.id='flowsignalUserAuthStyle'; link.rel='stylesheet'; link.href='user-auth.css?v=1'; document.head.appendChild(link);}
  function authRoot(){let root=document.getElementById('flowsignalUserAuth'); if(root) return root; root=document.createElement('div'); root.id='flowsignalUserAuth'; root.innerHTML=`<div class="fs-auth-card"><div class="fs-auth-brand">FlowSignal <span>USER</span></div><h1 id="fsAuthTitle">Log in</h1><p id="fsAuthCopy">Access Forex signals and your own Binary account.</p><form id="fsAuthForm"><label>Email<input id="fsAuthEmail" type="email" autocomplete="email" required></label><label>Password<input id="fsAuthPassword" type="password" autocomplete="current-password" minlength="10" required></label><label id="fsAuthConfirmWrap" class="hidden">Confirm password<input id="fsAuthConfirm" type="password" autocomplete="new-password" minlength="10"></label><button id="fsAuthSubmit" type="submit">Log in</button></form><button id="fsAuthSwitch" type="button" class="fs-auth-link">Create account</button><p id="fsAuthError" class="fs-auth-error"></p></div>`; document.body.appendChild(root); return root;}
  let signupMode=false;
  function setSignupMode(value){signupMode=Boolean(value); const root=authRoot(); root.querySelector('#fsAuthTitle').textContent=signupMode?'Create account':'Log in'; root.querySelector('#fsAuthSubmit').textContent=signupMode?'Create account':'Log in'; root.querySelector('#fsAuthSwitch').textContent=signupMode?'Already have an account? Log in':'Create account'; root.querySelector('#fsAuthConfirmWrap').classList.toggle('hidden',!signupMode); root.querySelector('#fsAuthPassword').autocomplete=signupMode?'new-password':'current-password'; root.querySelector('#fsAuthError').textContent='';}
  function showAuth(){style(); const root=authRoot(); root.classList.add('visible'); document.body.classList.add('flowsignal-user-auth-required');}
  function hideAuth(){document.getElementById('flowsignalUserAuth')?.classList.remove('visible'); document.body.classList.remove('flowsignal-user-auth-required');}

  function enterFullUserDashboard(user){
    if(!user||String(user.role||'user').toLowerCase()!=='user') return;
    if(!localStorage.getItem(TRADING_MODE_KEY)) localStorage.setItem(TRADING_MODE_KEY,'forex');
    let attempts=0;
    const reveal=()=>{
      attempts+=1;
      const selector=document.getElementById('flowsignalTradingModeSelector');
      const forex=document.getElementById('flowsignalForexMode');
      const binary=document.getElementById('flowsignalBinaryMode');
      if(selector){selector.hidden=false; selector.removeAttribute('hidden'); selector.setAttribute('aria-hidden','false'); selector.style.removeProperty('display'); selector.style.removeProperty('visibility');}
      if(selector&&forex&&binary){
        const mode=String(localStorage.getItem(TRADING_MODE_KEY)||'forex').toLowerCase()==='binary'?'binary':'forex';
        selector.querySelector(`[data-trading-mode="${mode}"]`)?.click();
        document.dispatchEvent(new CustomEvent('flowsignal:user-dashboard-ready',{detail:{user,mode}}));
        return;
      }
      if(attempts<50) setTimeout(reveal,100);
    };
    reveal();
  }

  function applyUser(user){sessionUser=user||null; if(!user) return; localStorage.setItem(LEGACY_BINARY_USER_KEY,user.id); localStorage.setItem('flowsignal_role',user.role||'user'); sessionStorage.setItem('flowsignal_tab_role',user.role||'user'); document.body.dataset.userRole=user.role||'user'; hideAuth(); document.dispatchEvent(new CustomEvent('flowsignal:authenticated',{detail:{user}})); enterFullUserDashboard(user);}
  async function session(){const response=await nativeFetch(`${BACKEND}/auth/session`,{credentials:'include',cache:'no-store'}); const data=await response.json().catch(()=>({})); if(data?.authenticated&&data?.user){csrfToken=String(data.csrf_token||''); sessionStorage.setItem(CSRF_KEY,csrfToken); applyUser(data.user); return data.user;} sessionUser=null; csrfToken=''; sessionStorage.removeItem(CSRF_KEY); if(!legacyOwner()) showAuth(); return null;}
  async function submit(event){event.preventDefault(); const root=authRoot(), email=root.querySelector('#fsAuthEmail').value.trim(), password=root.querySelector('#fsAuthPassword').value, confirm=root.querySelector('#fsAuthConfirm').value, error=root.querySelector('#fsAuthError'), button=root.querySelector('#fsAuthSubmit'); if(signupMode&&password!==confirm){error.textContent='Passwords do not match.'; return;} button.disabled=true; error.textContent=''; try{const response=await nativeFetch(`${BACKEND}/auth/${signupMode?'signup':'login'}`,{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); const data=await response.json().catch(()=>({})); if(!response.ok) throw new Error(data.detail||'Authentication failed'); csrfToken=String(data.csrf_token||''); sessionStorage.setItem(CSRF_KEY,csrfToken); applyUser(data.user);}catch(err){error.textContent=String(err.message||'Authentication failed').replaceAll('_',' ');}finally{button.disabled=false;}}
  async function logout(){try{await window.fetch(`${BACKEND}/auth/logout`,{method:'POST'});}catch(_error){} sessionUser=null; csrfToken=''; sessionStorage.removeItem(CSRF_KEY); localStorage.removeItem(LEGACY_BINARY_USER_KEY); localStorage.removeItem('flowsignal_deriv_connection_id'); localStorage.removeItem('flowsignal_deriv_account_id'); if(!legacyOwner()) showAuth();}
  function bind(){const root=authRoot(); root.querySelector('#fsAuthForm').addEventListener('submit',submit); root.querySelector('#fsAuthSwitch').addEventListener('click',()=>setSignupMode(!signupMode)); document.addEventListener('click',event=>{if(event.target?.closest?.('#logoutBtn,#binaryLogoutBtn')){event.preventDefault(); logout();}},true);}
  style(); bind();
  window.FlowSignalAuth={get user(){return sessionUser;},get csrf(){return csrfToken;},currentUserId(){return sessionUser?.id||'';},session,logout,backend:BACKEND};
  session();
})();