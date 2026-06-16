// multibackend:login — snippet PKCE (arquitetura C, SDK direto ao IdP central).
// Gerado por /multibackend:link-auth. NAO editar a mao: re-rodar o comando.
// Valores lidos do scan-report.json (Zero Assumido / Zero hardcode no corpo do comando):
//   authority  = oidc_issuer       (https://www.systemforgedashboard.com)
//   client_id  = oidc_client_id    (liliansousa  -> bare brand, R-44; NUNCA o slug)
//   redirect_uri aponta para o PROPRIO site_domain (sem open-redirect)
//   code_challenge_method: "S256"  (PKCE; default do oidc-client-ts, declarado explicitamente)
//
// oidc-client-ts vendorizado local (same-origin, /vendor/oidc-client-ts.js), NUNCA CDN:
// se o CDN for bloqueado (adblock/proxy/rede) o import falha ANTES do bind e os botoes
// "Entrar"/"Criar conta" ficam mortos sem sinal (regressao "botao nao faz nada", 2026-06-15).
// Servir local elimina esse ponto unico de falha. Regenerar: ver public/vendor/README.md.
import { UserManager, WebStorageStateStore } from '/vendor/oidc-client-ts.js';

const OIDC_CONFIG = {
  authority: 'https://www.systemforgedashboard.com',
  client_id: 'liliansousa',
  redirect_uri: 'https://liliansousa.dev/auth/callback',
  post_logout_redirect_uri: 'https://liliansousa.dev/',
  response_type: 'code',
  scope: 'openid profile email',
  code_challenge_method: 'S256',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: false,
};

const DASHBOARD_URL = 'https://www.systemforgedashboard.com/dashboard';
const mgr = new UserManager(OIDC_CONFIG);

// --- Reentrancia (R-26): resolver TUDO por data-testid/classe DENTRO de cada
// widget, nunca por getElementById global (pode haver 2+ instancias). ---
function widgets() {
  return Array.from(document.querySelectorAll('[data-testid="multibackend-login-widget"]'));
}
function setState(w, state) {
  w.setAttribute('data-mb-state', state);
  w.querySelectorAll('[data-mb-state-for]').forEach((el) => {
    el.hidden = el.getAttribute('data-mb-state-for') !== state;
  });
}
function renderAll(user) {
  const logged = !!user && !user.expired;
  widgets().forEach((w) => {
    const login = w.querySelector('[data-testid="multibackend-login"]');
    const register = w.querySelector('[data-testid="multibackend-register"]');
    const account = w.querySelector('.mb-account');
    const label = w.querySelector('.mb-user-label');
    if (login) login.hidden = logged;
    if (register) register.hidden = logged;
    if (account) account.hidden = !logged;
    if (logged && label) {
      const p = user.profile || {};
      label.textContent = p.name || p.email || 'Minha conta';
      label.setAttribute('href', DASHBOARD_URL);
    }
    setState(w, logged ? 'success' : 'empty');
  });
}
function wire() {
  widgets().forEach((w) => {
    if (w.__mbWired) return;
    w.__mbWired = true;
    const login = w.querySelector('[data-testid="multibackend-login"]');
    const register = w.querySelector('[data-testid="multibackend-register"]');
    const logout = w.querySelector('[data-testid="multibackend-logout"]');
    if (login) login.addEventListener('click', async () => {
      setState(w, 'loading');
      try { await mgr.signinRedirect(); } catch (e) { setState(w, 'error'); }
    });
    if (register) register.addEventListener('click', async () => {
      setState(w, 'loading');
      try { await mgr.signinRedirect({ extraQueryParams: { prompt: 'create' } }); } catch (e) { setState(w, 'error'); }
    });
    if (logout) logout.addEventListener('click', async () => {
      try { await mgr.removeUser(); } catch (e) { /* sessao ja ausente */ }
      renderAll(null);
    });
  });
}

function isCallback() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const q = new URLSearchParams(window.location.search);
  return path === '/auth/callback' || (q.has('code') && q.has('state'));
}

async function init() {
  if (window.__mbAuthInit) return; // idempotencia: 1 init mesmo com snippet duplicado
  window.__mbAuthInit = true;
  wire();
  if (isCallback()) {
    widgets().forEach((w) => setState(w, 'loading'));
    try {
      const user = await mgr.signinRedirectCallback();
      renderAll(user);
      window.location.replace('/'); // volta ao site ja logado (sem deadend)
      return;
    } catch (e) {
      widgets().forEach((w) => setState(w, 'error'));
      return;
    }
  }
  try {
    const user = await mgr.getUser();
    renderAll(user);
  } catch (e) {
    renderAll(null);
  }
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
