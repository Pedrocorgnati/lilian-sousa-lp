# vendor/

`oidc-client-ts.js` é um bundle ESM self-contained (jwt-decode inlined) de
`oidc-client-ts`, servido same-origin por liliansousa.dev. Usado pelo widget de
login multibackend (bloco `multibackend:login` em `index.html` +
`public/oidc-pkce-snippet.js`, Arq C / PKCE).

Por que vendorizar em vez de importar de CDN (jsdelivr/esm.sh): se o CDN for
bloqueado (adblock, extensão de privacidade, proxy corporativo, rede), o
`import` em runtime falha ANTES de ligar os handlers e os botões
"Entrar"/"Criar conta" ficam mortos sem sinal. Servir local elimina esse ponto
único de falha (regressão "botão não faz nada", 2026-06-15).

## Regenerar (ao bumpar a versão)

```bash
npm install oidc-client-ts@<versao>
node_modules/.bin/esbuild node_modules/oidc-client-ts/dist/esm/oidc-client-ts.js \
  --bundle --format=esm --minify --legal-comments=none \
  --outfile=public/vendor/oidc-client-ts.js
```

Confirme que o bundle exporta `UserManager` e `WebStorageStateStore` e não tem
`import`/`from` de módulos externos (deve ser self-contained).
