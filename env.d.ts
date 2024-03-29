/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_API_SPOT: string;
  readonly VITE_APP_API_DEGREES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
