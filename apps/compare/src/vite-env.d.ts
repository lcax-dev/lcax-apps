/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UMAMI_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
