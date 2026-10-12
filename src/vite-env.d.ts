/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the external REST API. */
  readonly VITE_API_BASE_URL?: string
  readonly VITE_APP_ENV?: 'development' | 'staging' | 'production'
  readonly VITE_APP_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
