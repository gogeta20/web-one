/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NOMBRE_APP: string;
  readonly VITE_VERSION: string;
  readonly VITE_API_URL: string;
  readonly VITE_LOGIN_URL: string;
  readonly VITE_LOGOUT_URL: string;
  readonly VITE_BASE_URL: string;

  // mas env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
