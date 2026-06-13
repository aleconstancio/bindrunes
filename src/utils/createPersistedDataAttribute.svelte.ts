import { createStorage } from "./createStorage";

type PersistedDataAttributeOptions<T extends string> = {
	storageKey: string;
	attributeName: string;
	values: readonly T[];
	default: T;
};

export function createPersistedDataAttribute<T extends string>(
	options: PersistedDataAttributeOptions<T>,
) {
	const storage = createStorage("bindrunes");
	const stored = storage.get<string>(options.storageKey);
	let value = $state<T>(
		stored && (options.values as readonly string[]).includes(stored)
			? (stored as T)
			: options.default,
	);

	$effect(() => {
		document.documentElement.setAttribute(options.attributeName, value);
		storage.set(options.storageKey, value);
	});

	return {
		get value() {
			return value;
		},
		setValue(v: T) {
			value = v;
		},
		values: options.values,
	};
}
