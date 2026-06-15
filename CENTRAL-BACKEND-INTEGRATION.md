# Integracao com backend central

Este projeto e Vite estatico, entao acessa o backend central por CORS direto.

Configure:

```env
VITE_CENTRAL_BACKEND_URL=https://www.corgnati.com
```

Use `src/lib/centralBackend.js`:

```js
import { fetchCentralIntegrationContext } from "./lib/centralBackend";

const context = await fetchCentralIntegrationContext();
```

O dominio `liliansousa.dev` ja esta liberado no backend central.

Para fluxos autenticados com cookie first-party, este projeto precisara de um
proxy no dominio `liliansousa.dev` encaminhando `/api/central/*` para
`https://www.corgnati.com/api/*`.
