type AutosaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";

interface CreateAutosaveOptions<T> {
	data: () => T;
	save: (data: T) => Promise<void>;
	delay?: number;
	onError?: (error: Error) => void;
	onSave?: (data: T) => void;
}

export function createAutosave<T>(options: CreateAutosaveOptions<T>) {
	const { data, save, onError, onSave } = options;

	let status = $state<AutosaveStatus>("idle");
	let lastSaved = $state<Date | null>(null);
	let error = $state<Error | null>(null);

	const isDirty = $derived(status === "dirty");
	const isSaving = $derived(status === "saving");
	const isSaved = $derived(status === "saved");

	let timer: ReturnType<typeof setTimeout> | null = null;

	async function doSave() {
		status = "saving";
		error = null;
		try {
			const currentData = data();
			await save(currentData);
			status = "saved";
			lastSaved = new Date();
			onSave?.(currentData);
		} catch (err) {
			status = "error";
			error = err instanceof Error ? err : new Error(String(err));
			onError?.(error);
		}
	}

	async function forceSave() {
		if (timer) clearTimeout(timer);
		await doSave();
	}

	function destroy() {
		if (timer) clearTimeout(timer);
	}

	return {
		get status() {
			return status;
		},
		get isDirty() {
			return isDirty;
		},
		get isSaving() {
			return isSaving;
		},
		get isSaved() {
			return isSaved;
		},
		get lastSaved() {
			return lastSaved;
		},
		get error() {
			return error;
		},
		forceSave,
		destroy,
	};
}
