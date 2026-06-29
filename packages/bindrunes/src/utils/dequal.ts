export function dequal(a: unknown, b: unknown): boolean {
	if (a === b) return true;
	if (a !== Object(a) || b !== Object(b)) return false;
	const objA = a as Record<string, unknown>;
	const objB = b as Record<string, unknown>;
	if (Array.isArray(a)) {
		if (a.length !== (b as unknown[]).length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!dequal(a[i], (b as unknown[])[i])) return false;
		}
		return true;
	}
	const keysA = Object.keys(objA);
	if (keysA.length !== Object.keys(objB).length) return false;
	for (const key of keysA) {
		if (!Object.hasOwn(objB, key)) return false;
		if (!dequal(objA[key], objB[key])) return false;
	}
	return true;
}
