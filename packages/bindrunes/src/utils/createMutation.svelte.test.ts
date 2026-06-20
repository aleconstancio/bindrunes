import { describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createMutation } from "./createMutation.svelte";

describe("createMutation", () => {
	it("initial state is idle", async () => {
		const mutation = await mountComposable(() => createMutation({ mutator: vi.fn() }));
		expect(mutation.status).toBe("idle");
		expect(mutation.data).toBeUndefined();
		expect(mutation.error).toBeNull();
	});

	it("transitions to success after mutate", async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue("result") }),
		);
		await mutation.mutate("vars");
		expect(mutation.status).toBe("success");
		expect(mutation.data).toBe("result");
		expect(mutation.isSuccess).toBe(true);
	});

	it("transitions to error after failed mutate", async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockRejectedValue(new Error("fail")) }),
		);
		await expect(mutation.mutate("vars")).rejects.toThrow("fail");
		expect(mutation.status).toBe("error");
		expect(mutation.isError).toBe(true);
	});

	it("calls onSuccess with data and variables", async () => {
		const onSuccess = vi.fn();
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue("data"), onSuccess }),
		);
		await mutation.mutate("vars");
		expect(onSuccess).toHaveBeenCalledWith("data", "vars");
	});

	it("calls onError with error and variables", async () => {
		const onError = vi.fn();
		const error = new Error("fail");
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockRejectedValue(error), onError }),
		);
		await expect(mutation.mutate("vars")).rejects.toThrow();
		expect(onError).toHaveBeenCalledWith(error, "vars");
	});

	it("calls onMutate before the mutator runs", async () => {
		const order: string[] = [];
		const mutation = await mountComposable(() =>
			createMutation({
				mutator: async () => {
					order.push("mutator");
					return "ok";
				},
				onMutate: () => {
					order.push("onMutate");
				},
			}),
		);
		await mutation.mutate("vars");
		expect(order).toEqual(["onMutate", "mutator"]);
	});

	it("reset() clears state back to idle", async () => {
		const mutation = await mountComposable(() =>
			createMutation({ mutator: vi.fn().mockResolvedValue("data") }),
		);
		await mutation.mutate("vars");
		expect(mutation.status).toBe("success");
		mutation.reset();
		expect(mutation.status).toBe("idle");
		expect(mutation.data).toBeUndefined();
	});
});
