/**
 * Typed environment variable accessor.
 * Throws in dev if a required variable is missing.
 *
 * Usage:
 * const env = createEnv({ prefix: 'VITE' });
 * env.get('API_URL');          // /api/v1
 * env.getNumber('PORT', 3000); // 3000 (fallback)
 */
export interface EnvOptions {
  prefix?: string;
  strict?: boolean;
}

export function createEnv(options: EnvOptions = {}) {
  const prefix = options.prefix ?? '';
  const strict = options.strict ?? false;

  function prefixed(key: string): string {
    return prefix ? `${prefix}_${key}` : key;
  }

  function get(key: string, fallback?: string): string | undefined {
    const k = prefixed(key);
    let val: string | undefined;
    if (typeof process !== 'undefined') {
      val = (process.env as Record<string, string | undefined>)?.[k];
    }
    if (val === undefined && fallback !== undefined) return fallback;
    if (val === undefined && strict) throw new Error(`Missing env var: ${k}`);
    return val;
  }

  function getNumber(key: string, fallback?: number): number | undefined {
    const val = get(key);
    if (val === undefined) return fallback;
    const n = Number(val);
    return isNaN(n) ? fallback : n;
  }

  function getBoolean(key: string, fallback?: boolean): boolean | undefined {
    const val = get(key);
    if (val === undefined) return fallback;
    return val === 'true' || val === '1';
  }

  return { get, getNumber, getBoolean };
}
