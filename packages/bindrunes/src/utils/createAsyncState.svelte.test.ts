import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createAsyncState } from "./createAsyncState.svelte";

describe("createAsyncState", () => {
	it("has idle initial state", async () => {
		const state = await mountComposable(() => createAsyncState());
		expect(state.status).toBe("idle");
		expect(state.isLoading).toBe(false);
		expect(state.isSuccess).toBe(false);
		expect(state.isError).toBe(false);
		expect(state.error).toBeNull();
	});

	it("transitions to success after successful run", async () => {
		const state = await mountComposable(() => createAsyncState());
		await state.run(async () => "done");
		expect(state.status).toBe("success");
		expect(state.isSuccess).toBe(true);
		expect(state.isLoading).toBe(false);
		expect(state.isError).toBe(false);
	});

	it("transitions to error after failed run", async () => {
		const state = await mountComposable(() => createAsyncState());
		try {
			await state.run(async () => {
				throw new Error("boom");
			});
		} catch {
			// expected
		}
		expect(state.status).toBe("error");
		expect(state.isError).toBe(true);
		expect(state.error?.message).toBe("boom");
	});

	it("reset returns to idle", async () => {
		const state = await mountComposable(() => createAsyncState());
		await state.run(async () => "ok");
		expect(state.status).toBe("success");
		state.reset();
		expect(state.status).toBe("idle");
		expect(state.error).toBeNull();
	});
});
