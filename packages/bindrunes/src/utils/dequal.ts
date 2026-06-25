export function dequal(a: unknown, b: unknown): boolean {
	if (a === b) return true;
	if (a !== Object(a) || b !== Object(b)) return false;
	if (Array.isArray(a)) {
		if (a.length !== (b as unknown[]).length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!dequal(a[i], (b as unknown[])[i])) return false;
		}
		return true;
	}
	const keysA = Object.keys(a);
	if (keysA.length !== Object.keys(b).length) return false;
	for (const key of keysA) {
		if (!Object.hasOwn(b, key)) return false;
		if (!dequal((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]))
			return false;
	}
	return true;
}
