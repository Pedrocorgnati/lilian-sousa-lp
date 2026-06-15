const DEFAULT_CENTRAL_BACKEND_URL = "https://www.corgnati.com";

export function centralBackendUrl(path) {
  const baseUrl =
    import.meta.env.VITE_CENTRAL_BACKEND_URL || DEFAULT_CENTRAL_BACKEND_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(`/api${normalizedPath}`, baseUrl).toString();
}

export async function fetchCentralBackend(path, init = {}) {
  const response = await fetch(centralBackendUrl(path), {
    ...init,
    credentials: init.credentials || "include",
  });

  if (!response.ok) {
    throw new Error(`Central backend request failed: ${response.status}`);
  }

  return response.json();
}

export function fetchCentralIntegrationContext() {
  return fetchCentralBackend("/integration/context");
}
