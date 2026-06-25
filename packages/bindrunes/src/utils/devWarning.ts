export function devWarning(condition: boolean, message: string) {
	if (import.meta.env?.DEV && condition) {
		console.warn(`[bindrunes] ${message}`);
	}
}
