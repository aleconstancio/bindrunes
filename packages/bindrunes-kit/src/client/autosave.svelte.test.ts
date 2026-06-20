import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createAutosave } from "./autosave.svelte";

describe("createAutosave", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("initializes with idle status", () => {
		const as = createAutosave({
			data: () => ({ text: "hello" }),
			save: vi.fn(),
		});

		expect(as.status).toBe("idle");
		expect(as.isDirty).toBe(false);
		expect(as.isSaving).toBe(false);
		expect(as.isSaved).toBe(false);
		expect(as.lastSaved).toBeNull();
		expect(as.error).toBeNull();
	});

	it("forceSave calls save and transitions to saved", async () => {
		const saveFn = vi.fn();
		const dataFn = vi.fn().mockReturnValue({ text: "hello" });
		const onSave = vi.fn();

		const as = createAutosave({
			data: dataFn,
			save: saveFn,
			onSave,
		});

		await as.forceSave();

		expect(saveFn).toHaveBeenCalledWith({ text: "hello" });
		expect(as.status).toBe("saved");
		expect(as.isSaved).toBe(true);
		expect(as.lastSaved).toBeInstanceOf(Date);
		expect(onSave).toHaveBeenCalledWith({ text: "hello" });
	});

	it("forceSave handles error", async () => {
		const saveFn = vi.fn().mockRejectedValue(new Error("disk full"));
		const onError = vi.fn();

		const as = createAutosave({
			data: () => ({}),
			save: saveFn,
			onError,
		});

		await as.forceSave();

		expect(as.status).toBe("error");
		expect(as.error).toBeInstanceOf(Error);
		expect(as.error?.message).toBe("disk full");
		expect(onError).toHaveBeenCalled();
	});

	it("destroy clears timer", () => {
		const saveFn = vi.fn();
		const as = createAutosave({
			data: () => ({}),
			save: saveFn,
			delay: 100,
		});

		as.destroy();
		vi.advanceTimersByTime(200);
		expect(saveFn).not.toHaveBeenCalled();
	});
});
