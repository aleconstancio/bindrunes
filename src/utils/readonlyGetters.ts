type GetterOnly<T> = {
	readonly [K in keyof T]: T[K] extends (...args: any[]) => any
		? T[K]
		: T[K] extends object
			? Readonly<T[K]>
			: T[K];
};

export function readonlyGetters<T extends Record<string, any>>(state: T): GetterOnly<T> {
	const result = {} as any;
	for (const key of Object.keys(state)) {
		Object.defineProperty(result, key, {
			get() {
				return state[key];
			},
			set(v) {
				if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
					console.warn(`[bindrunes] Attempted to set readonly property "${key}"`);
				}
			},
			enumerable: true,
		});
	}
	return result;
}
