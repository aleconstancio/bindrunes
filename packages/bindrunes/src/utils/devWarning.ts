/**
 * Logs a warning in development mode only. Silenced in production builds.
 * Use this instead of `console.warn` in library code.
 */
export function devWarning(message: string, ...args: unknown[]): void {
	if (import.meta.env?.DEV) {
		console.warn(`[bindrunes] ${message}`, ...args);
	}
}
