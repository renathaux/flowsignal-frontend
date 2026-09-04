from pathlib import Path
import re

startup_path = Path('Frontend/startup.js')
startup = startup_path.read_text(encoding='utf-8')
startup = startup.replace(
    "  const isAppRoute = /^\\/app\\/?$/i.test(window.location.pathname);",
    "  const isAppRoute = /^\\/app(?:\\.html)?\\/?$/i.test(window.location.pathname);",
    1,
)
if "PERSISTED_USER_SESSION_KEY" not in startup:
    startup = startup.replace(
        "  const USER_SESSION_KEY = 'flowsignal_user_session_token';\n",
        "  const USER_SESSION_KEY = 'flowsignal_user_session_token';\n  const PERSISTED_USER_SESSION_KEY = 'flowsignal_user_session_persist';\n",
        1,
    )
pattern = re.compile(r"  function recoverThisTabBeforeRouteGate\(\) \{.*?\n  \}\n\n  recoverThisTabBeforeRouteGate\(\);", re.S)
replacement = '''  function recoverThisTabBeforeRouteGate() {
    if (sessionStorage.getItem(USER_SESSION_KEY)) return;

    const current = String(window.name || '');
    const tabId = current.startsWith(TAB_WINDOW_PREFIX)
      ? current.slice(TAB_WINDOW_PREFIX.length)
      : '';

    if (tabId) {
      try {
        const customer = JSON.parse(localStorage.getItem(`flowsignal_tab_user_session:${tabId}`) || 'null');
        if (customer?.token) {
          sessionStorage.setItem(USER_SESSION_KEY, String(customer.token));
          if (customer.csrf) sessionStorage.setItem(CSRF_KEY, String(customer.csrf));
          sessionStorage.setItem(TAB_ROLE_KEY, 'user');
          sessionStorage.removeItem('flowsignal_public_home_mode');
          sessionStorage.removeItem('flowsignal_tab_signed_out');
          return;
        }
      } catch (_error) {}

      try {
        const owner = JSON.parse(localStorage.getItem(`flowsignal_tab_admin_session:${tabId}`) || 'null');
        if (owner?.token) {
          sessionStorage.setItem(TAB_ROLE_KEY, 'admin');
          localStorage.setItem('flowsignal_session_token', String(owner.token));
          sessionStorage.removeItem('flowsignal_public_home_mode');
          sessionStorage.removeItem('flowsignal_tab_signed_out');
          return;
        }
      } catch (_error) {}
    }

    try {
      const saved = JSON.parse(localStorage.getItem(PERSISTED_USER_SESSION_KEY) || 'null');
      if (!saved?.token) return;
      sessionStorage.setItem(USER_SESSION_KEY, String(saved.token));
      if (saved.csrf) sessionStorage.setItem(CSRF_KEY, String(saved.csrf));
      sessionStorage.setItem(TAB_ROLE_KEY, 'user');
      sessionStorage.removeItem('flowsignal_public_home_mode');
      sessionStorage.removeItem('flowsignal_tab_signed_out');

      if (!tabId) {
        const newTabId = (crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`);
        window.name = `${TAB_WINDOW_PREFIX}${newTabId}`;
        localStorage.setItem(`flowsignal_tab_user_session:${newTabId}`, JSON.stringify({
          token: String(saved.token),
          csrf: String(saved.csrf || '')
        }));
      }
    } catch (_error) {}
  }

  recoverThisTabBeforeRouteGate();'''
startup, count = pattern.subn(replacement, startup, count=1)
if count != 1:
    raise SystemExit(f'Could not replace startup recovery function: {count}')
startup_path.write_text(startup, encoding='utf-8')

auth_path = Path('Frontend/user-auth.js')
auth = auth_path.read_text(encoding='utf-8')
if "PERSISTED_USER_SESSION_KEY" not in auth:
    auth = auth.replace(
        "  const USER_SESSION_KEY='flowsignal_user_session_token';\n",
        "  const USER_SESSION_KEY='flowsignal_user_session_token';\n  const PERSISTED_USER_SESSION_KEY='flowsignal_user_session_persist';\n",
        1,
    )
    auth = auth.replace(
        "  function recoverTabAuth(){\n",
        "  function savedDeviceSession(){try{return JSON.parse(localStorage.getItem(PERSISTED_USER_SESSION_KEY)||'null');}catch(_error){return null;}}\n  function saveDeviceSession(token,csrf=''){if(!token)return;localStorage.setItem(PERSISTED_USER_SESSION_KEY,JSON.stringify({token:String(token),csrf:String(csrf||''),saved_at:Date.now()}));}\n  function clearDeviceSession(){localStorage.removeItem(PERSISTED_USER_SESSION_KEY);}\n  function recoverTabAuth(){\n",
        1,
    )
    auth = auth.replace("    if(!id)return;\n", "", 1)
    marker = """    if(!sessionStorage.getItem(USER_SESSION_KEY)&&sessionStorage.getItem(TAB_ROLE_KEY)!=='admin'){
      try{
        const saved=JSON.parse(localStorage.getItem(`flowsignal_tab_admin_session:${id}`)||'null');
        if(saved?.token){
          sessionStorage.setItem(TAB_ROLE_KEY,'admin');
          localStorage.setItem(LEGACY_SESSION_TOKEN_KEY,String(saved.token));
          sessionStorage.removeItem(PUBLIC_HOME_KEY);
          sessionStorage.removeItem(TAB_SIGNED_OUT_KEY);
        }
      }catch(_error){}
    }
  }
"""
    replacement_auth = """    if(!sessionStorage.getItem(USER_SESSION_KEY)&&sessionStorage.getItem(TAB_ROLE_KEY)!=='admin'&&id){
      try{
        const saved=JSON.parse(localStorage.getItem(`flowsignal_tab_admin_session:${id}`)||'null');
        if(saved?.token){
          sessionStorage.setItem(TAB_ROLE_KEY,'admin');
          localStorage.setItem(LEGACY_SESSION_TOKEN_KEY,String(saved.token));
          sessionStorage.removeItem(PUBLIC_HOME_KEY);
          sessionStorage.removeItem(TAB_SIGNED_OUT_KEY);
        }
      }catch(_error){}
    }
    if(!sessionStorage.getItem(USER_SESSION_KEY)&&sessionStorage.getItem(TAB_ROLE_KEY)!=='admin'){
      const saved=savedDeviceSession();
      if(saved?.token){
        sessionStorage.setItem(USER_SESSION_KEY,String(saved.token));
        if(saved.csrf)sessionStorage.setItem(CSRF_KEY,String(saved.csrf));
        sessionStorage.setItem(TAB_ROLE_KEY,'user');
        sessionStorage.removeItem(PUBLIC_HOME_KEY);
        sessionStorage.removeItem(TAB_SIGNED_OUT_KEY);
      }
    }
  }
"""
    if marker not in auth:
        raise SystemExit('Could not find user-auth recovery marker')
    auth = auth.replace(marker, replacement_auth, 1)
    auth = auth.replace(
        "if(data?.authenticated&&data?.user){csrfToken=String(data.csrf_token||'');sessionStorage.setItem(CSRF_KEY,csrfToken);applyUser(data.user);return data.user;}",
        "if(data?.authenticated&&data?.user){csrfToken=String(data.csrf_token||'');sessionStorage.setItem(CSRF_KEY,csrfToken);saveDeviceSession(token,csrfToken);applyUser(data.user);return data.user;}",
        1,
    )
    invalid = """    sessionStorage.removeItem(USER_SESSION_KEY);
    sessionStorage.removeItem(TAB_ROLE_KEY);
    sessionUser=null;csrfToken='';sessionStorage.removeItem(CSRF_KEY);"""
    auth = auth.replace(
        invalid,
        """    sessionStorage.removeItem(USER_SESSION_KEY);
    sessionStorage.removeItem(TAB_ROLE_KEY);
    clearDeviceSession();
    sessionUser=null;csrfToken='';sessionStorage.removeItem(CSRF_KEY);""",
        1,
    )
    auth = auth.replace(
        "    if(tabId)localStorage.removeItem(`flowsignal_tab_user_session:${tabId}`);\n    window.name='';",
        "    if(tabId)localStorage.removeItem(`flowsignal_tab_user_session:${tabId}`);\n    clearDeviceSession();\n    window.name='';",
        1,
    )
auth_path.write_text(auth, encoding='utf-8')

account_path = Path('Frontend/account.html')
account = account_path.read_text(encoding='utf-8')
if "PERSISTED_USER_SESSION_KEY" not in account:
    account = account.replace(
        "      const USER_SESSION_KEY='flowsignal_user_session_token';\n",
        "      const USER_SESSION_KEY='flowsignal_user_session_token';\n      const PERSISTED_USER_SESSION_KEY='flowsignal_user_session_persist';\n",
        1,
    )
    account = account.replace(
        "        localStorage.setItem(`flowsignal_tab_user_session:${tabId}`,JSON.stringify({token:String(data.session_token),csrf:String(data.csrf_token||'')}));",
        "        localStorage.setItem(`flowsignal_tab_user_session:${tabId}`,JSON.stringify({token:String(data.session_token),csrf:String(data.csrf_token||'')}));\n        localStorage.setItem(PERSISTED_USER_SESSION_KEY,JSON.stringify({token:String(data.session_token),csrf:String(data.csrf_token||''),saved_at:Date.now()}));",
        1,
    )
account_path.write_text(account, encoding='utf-8')

app_path = Path('Frontend/app.html')
app = app_path.read_text(encoding='utf-8')
app = app.replace('startup.js?v=16', 'startup.js?v=17')
app = app.replace('script.js?v=124', 'script.js?v=125')
app_path.write_text(app, encoding='utf-8')
