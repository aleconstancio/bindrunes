/**
 * Typed localStorage wrapper with prefix.
 *
 * Usage:
 * const storage = createStorage('thoth');
 * storage.set('token', 'abc123');
 * storage.get('token'); // 'abc123'
 * storage.remove('token');
 */
export function createStorage(prefix: string) {
  const key = (k: string) => `${prefix}_${k}`;

  return {
    get<T = string>(k: string): T | null {
      try {
        const raw = localStorage.getItem(key(k));
        return raw ? (JSON.parse(raw) as T) : null;
      } catch { return null; }
    },
    set<T>(k: string, v: T): void {
      localStorage.setItem(key(k), JSON.stringify(v));
    },
    remove(k: string): void {
      localStorage.removeItem(key(k));
    },
    clear(): void {
      const prefixMatch = (k: string) => k.startsWith(`${prefix}_`);
      Object.keys(localStorage).filter(prefixMatch).forEach(k => localStorage.removeItem(k));
    },
  };
}
