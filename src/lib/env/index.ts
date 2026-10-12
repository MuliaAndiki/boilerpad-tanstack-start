/**
 * Typed, validated access to public environment variables.
 *
 * Only `VITE_*` variables are exposed to the client bundle. Never put
 * secrets here; server-only secrets belong in Wrangler secrets / `.dev.vars`.
 */
const appEnvs = ['development', 'staging', 'production'] as const
type AppEnv = (typeof appEnvs)[number]

function parseAppEnv(value: string | undefined): AppEnv {
  return appEnvs.find((env) => env === value) ?? 'development'
}

export const env = {
  /** Base URL of the external REST API (no trailing slash). */
  API_BASE_URL: (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, ''),
  APP_ENV: parseAppEnv(import.meta.env.VITE_APP_ENV),
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Boilerpad',
} as const
