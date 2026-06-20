import { describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { invalidateQuery, setQueryData } from "../utils/queryCache";
import { createQuery } from "./createQuery.svelte";

describe("createQuery", () => {
	it("creates a query and fetches on mount", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		const query = await mountComposable(() => createQuery({ key: "cq-test", fetcher }));
		await vi.waitFor(() => {
			expect(query.isSuccess).toBe(true);
		});
		expect(query.data).toBe("data");
		expect(fetcher).toHaveBeenCalled();
	});

	it("returns cached data when available", async () => {
		setQueryData("cq-cached", "pre-cached");
		const fetcher = vi.fn().mockResolvedValue("fresh");
		const query = await mountComposable(() =>
			createQuery({ key: "cq-cached", fetcher, staleTime: 60000 }),
		);
		expect(query.data).toBe("pre-cached");
		expect(fetcher).not.toHaveBeenCalled();
	});

	it("does not fetch when enabled is false", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		await mountComposable(() => createQuery({ key: "cq-disabled", fetcher, enabled: false }));
		await new Promise((r) => setTimeout(r, 50));
		expect(fetcher).not.toHaveBeenCalled();
	});

	it("exposes reactive status properties", async () => {
		const fetcher = vi.fn().mockResolvedValue("ok");
		const query = await mountComposable(() => createQuery({ key: "cq-status", fetcher }));
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		expect(query.status).toBe("success");
		expect(query.isLoading).toBe(false);
		expect(query.isError).toBe(false);
		expect(query.isFetching).toBe(false);
	});

	it("enters error state when fetcher fails", async () => {
		const fetcher = vi.fn().mockRejectedValue(new Error("fail"));
		const query = await mountComposable(() => createQuery({ key: "cq-error", fetcher, retry: 0 }));
		await vi.waitFor(() => expect(query.isError).toBe(true));
		expect(query.error?.message).toBe("fail");
	});

	it("calls onSuccess callback", async () => {
		const onSuccess = vi.fn();
		const fetcher = vi.fn().mockResolvedValue("ok");
		await mountComposable(() => createQuery({ key: "cq-success-cb", fetcher, onSuccess }));
		await vi.waitFor(() => expect(onSuccess).toHaveBeenCalledWith("ok"));
	});

	it("calls onError callback", async () => {
		const onError = vi.fn();
		const fetcher = vi.fn().mockRejectedValue(new Error("fail"));
		await mountComposable(() => createQuery({ key: "cq-error-cb", fetcher, onError, retry: 0 }));
		await vi.waitFor(() => expect(onError).toHaveBeenCalled());
	});
});

describe("invalidateQuery (re-export)", () => {
	it("is the same function as queryCache.invalidateQuery", async () => {
		const { invalidateQuery: 原版 } = await import("../utils/queryCache");
		expect(invalidateQuery).toBe(原版);
	});

	it("invalidates a cached query entry", async () => {
		setQueryData("cq-inv", "data");
		invalidateQuery("cq-inv");
		const entry = (await import("../utils/queryCache")).getEntry("cq-inv");
		expect(entry?.lastUpdatedAt).toBe(0);
	});
});
