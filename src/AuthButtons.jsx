// React precisa estar em escopo: este projeto NAO tem vite.config (sem
// @vitejs/plugin-react), entao o JSX usa o runtime CLASSICO (React.createElement)
// e cada arquivo .jsx deve importar React explicitamente (igual App.jsx). Sem isso
// => "React is not defined" em runtime e a arvore inteira nao renderiza (tela branca).
import React, { useEffect, useRef, useState } from 'react';
// oidc-client-ts vendorizado (mesmo bundle ESM de public/vendor, NUNCA CDN — ver
// public/vendor/README.md). Importado estatico para o Vite empacotar same-origin.
import { UserManager, WebStorageStateStore } from './vendor/oidc-client-ts.js';

// Login multibackend (arquitetura C, PKCE direto ao IdP central). Integrado ao
// header do site (sem widget flutuante). Config IDENTICA a do
// public/oidc-pkce-snippet.js para compartilhar a MESMA sessao (mesmo
// authority+client_id => mesma chave no localStorage userStore). O retorno do
// login e tratado pela pagina dedicada /auth/callback (que roda o snippet);
// aqui so disparamos o redirect e refletimos o estado da sessao ja existente.
const OIDC_CONFIG = {
  authority: 'https://www.systemforgedashboard.com',
  client_id: 'liliansousa',
  redirect_uri: 'https://liliansousa.dev/auth/callback',
  post_logout_redirect_uri: 'https://liliansousa.dev/',
  response_type: 'code',
  scope: 'openid profile email',
  code_challenge_method: 'S256',
  automaticSilentRenew: false,
};

const DASHBOARD_URL = 'https://www.systemforgedashboard.com/dashboard';

export default function AuthButtons() {
  // 'loading' so na 1a resolucao da sessao; depois 'anon' | 'authed' | 'error'.
  const [status, setStatus] = useState('loading');
  const [label, setLabel] = useState('Minha conta');
  const mgrRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mgr = new UserManager({
          ...OIDC_CONFIG,
          userStore: new WebStorageStateStore({ store: window.localStorage }),
        });
        mgrRef.current = mgr;
        const user = await mgr.getUser();
        if (cancelled) return;
        if (user && !user.expired) {
          const p = user.profile || {};
          setLabel(p.name || p.email || 'Minha conta');
          setStatus('authed');
        } else {
          setStatus('anon');
        }
      } catch {
        // Falha ao carregar o SDK: nao deixa os botoes mortos sem sinal — mostra
        // estado clicavel mesmo assim (o clique tentara recarregar o SDK).
        if (!cancelled) setStatus('anon');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function startLogin(create) {
    setStatus('redirecting');
    try {
      let mgr = mgrRef.current;
      if (!mgr) {
        mgr = new UserManager({
          ...OIDC_CONFIG,
          userStore: new WebStorageStateStore({ store: window.localStorage }),
        });
        mgrRef.current = mgr;
      }
      await mgr.signinRedirect(
        create ? { extraQueryParams: { prompt: 'create' } } : undefined,
      );
      // navega para fora; nao volta aqui
    } catch {
      setStatus('error');
    }
  }

  async function handleLogout() {
    try {
      await mgrRef.current?.removeUser();
    } catch {
      /* sessao ja ausente */
    }
    setStatus('anon');
  }

  if (status === 'authed') {
    return (
      <div className="auth-actions" data-testid="multibackend-login-widget" data-mb-state="success">
        <a
          className="button button-small button-ghost"
          data-testid="multibackend-account"
          href={DASHBOARD_URL}
        >
          {label}
        </a>
        <button
          type="button"
          className="button button-small button-ghost"
          data-testid="multibackend-logout"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    );
  }

  const busy = status === 'loading' || status === 'redirecting';
  return (
    <div
      className="auth-actions"
      data-testid="multibackend-login-widget"
      data-mb-state={status === 'error' ? 'error' : 'empty'}
    >
      <button
        type="button"
        className="button button-small button-ghost"
        data-testid="multibackend-login"
        disabled={busy}
        onClick={() => startLogin(false)}
      >
        Entrar
      </button>
      <button
        type="button"
        className="button button-small button-primary"
        data-testid="multibackend-register"
        disabled={busy}
        onClick={() => startLogin(true)}
      >
        Criar conta
      </button>
      {status === 'error' && (
        <span className="auth-error" role="alert" data-testid="multibackend-login-error">
          Tente novamente.
        </span>
      )}
    </div>
  );
}
