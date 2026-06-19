import { isBrowser } from "./isBrowser";
import { toError } from "./toError";

export function useClipboard() {
	let copied = $state(false);
	let error = $state<Error | null>(null);
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		return () => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}
		};
	});

	async function copy(text: string): Promise<boolean> {
		if (!isBrowser) return false;

		copied = false;
		error = null;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			timeoutId = setTimeout(() => {
				copied = false;
			}, 2000);
			return true;
		} catch (err) {
			error = toError(err);
			return false;
		}
	}

	return {
		get copied() {
			return copied;
		},
		get error() {
			return error;
		},
		copy,
	};
}
