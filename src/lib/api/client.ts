import { env } from '@/lib/env'
import { ApiError } from './errors'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type QueryValue = string | number | boolean | null | undefined

export interface RequestOptions {
  /** Query string params. `null`/`undefined` values are skipped. */
  query?: Record<string, QueryValue>
  /** JSON-serializable request body. */
  body?: unknown
  headers?: HeadersInit
  signal?: AbortSignal
  /** Abort the request after this many ms. Defaults to 15s; `0` disables. */
  timeoutMs?: number
  credentials?: RequestCredentials
}

export interface ApiClientConfig {
  baseUrl: string
  defaultTimeoutMs?: number
  defaultCredentials?: RequestCredentials
  defaultHeaders?: HeadersInit
}

function buildUrl(
  baseUrl: string,
  path: string,
  query?: RequestOptions['query'],
) {
  const url = /^https?:\/\//.test(path)
    ? path
    : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
  if (!query) return url
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== null && value !== undefined) params.set(key, String(value))
  }
  const qs = params.toString()
  return qs ? `${url}${url.includes('?') ? '&' : '?'}${qs}` : url
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined
  const text = await response.text()
  if (!text) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export function createApiClient(config: ApiClientConfig) {
  const {
    baseUrl,
    defaultTimeoutMs = 15_000,
    defaultCredentials,
    defaultHeaders,
  } = config

  async function request<T>(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const timeoutMs = options.timeoutMs ?? defaultTimeoutMs
    const signals = [
      options.signal,
      timeoutMs > 0 ? AbortSignal.timeout(timeoutMs) : undefined,
    ].filter((s): s is AbortSignal => s !== undefined)
    const signal = signals.length > 1 ? AbortSignal.any(signals) : signals[0]

    const headers = new Headers(defaultHeaders)
    new Headers(options.headers).forEach((value, key) =>
      headers.set(key, value),
    )
    headers.set('Accept', 'application/json')
    if (options.body !== undefined && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    let response: Response
    try {
      response = await fetch(buildUrl(baseUrl, path, options.query), {
        method,
        headers,
        signal,
        credentials: options.credentials ?? defaultCredentials,
        body:
          options.body === undefined ? undefined : JSON.stringify(options.body),
      })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new ApiError('Request timed out', 408)
      }
      if (error instanceof DOMException && error.name === 'AbortError')
        throw error
      throw new ApiError('Network error. Check your connection.', 0, error)
    }

    const data = await parseBody(response)
    if (!response.ok) {
      const message =
        typeof data === 'object' && data !== null && 'message' in data
          ? String(data.message)
          : response.statusText ||
            `Request failed with status ${response.status}`
      throw new ApiError(message, response.status, data)
    }
    return data as T
  }

  return {
    get: <T>(path: string, options?: Omit<RequestOptions, 'body'>) =>
      request<T>('GET', path, options),
    post: <T>(
      path: string,
      body?: unknown,
      options?: Omit<RequestOptions, 'body'>,
    ) => request<T>('POST', path, { ...options, body }),
    put: <T>(
      path: string,
      body?: unknown,
      options?: Omit<RequestOptions, 'body'>,
    ) => request<T>('PUT', path, { ...options, body }),
    patch: <T>(
      path: string,
      body?: unknown,
      options?: Omit<RequestOptions, 'body'>,
    ) => request<T>('PATCH', path, { ...options, body }),
    delete: <T>(path: string, options?: Omit<RequestOptions, 'body'>) =>
      request<T>('DELETE', path, options),
  }
}

/** Default client bound to `VITE_API_BASE_URL`. */
export const api = createApiClient({ baseUrl: env.API_BASE_URL })
