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
			set() {},
			enumerable: true,
		});
	}
	return result;
}
