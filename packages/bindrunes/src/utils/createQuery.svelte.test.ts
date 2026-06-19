import { render, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import MountSvelte from "../helpers/mount.svelte";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { getEntry, invalidateQuery, setQueryData } from "../utils/queryCache";
import { createQuery } from "./createQuery.svelte";

describe("createQuery", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("creates a query and fetches on mount when enabled is true", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		const query = await mountComposable(() => createQuery({ key: "test-fetch", fetcher }));
		await vi.waitFor(() => {
			expect(query.isSuccess).toBe(true);
		});
		expect(query.data).toBe("data");
		expect(fetcher).toHaveBeenCalled();
	});

	it("does not fetch on mount when enabled is false", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		await mountComposable(() => createQuery({ key: "test-disabled", fetcher, enabled: false }));
		await new Promise((r) => setTimeout(r, 50));
		expect(fetcher).not.toHaveBeenCalled();
	});

	it("returns cached data when same key is used by a previous query", async () => {
		setQueryData("cached-key", "pre-cached");
		const fetcher = vi.fn().mockResolvedValue("fresh");
		const query = await mountComposable(() =>
			createQuery({ key: "cached-key", fetcher, staleTime: 60000 }),
		);
		expect(query.data).toBe("pre-cached");
		expect(fetcher).not.toHaveBeenCalled();
	});

	it("refetches when staleTime is exceeded on mount", async () => {
		setQueryData("stale-key", "old-data");
		invalidateQuery("stale-key");
		const fetcher = vi.fn().mockResolvedValue("new-data");
		const query = await mountComposable(() =>
			createQuery({ key: "stale-key", fetcher, staleTime: 1000 }),
		);
		await vi.waitFor(() => {
			expect(query.isSuccess).toBe(true);
		});
		expect(query.data).toBe("new-data");
	});

	it("refetches at the given refetchInterval", async () => {
		vi.useFakeTimers();
		const fetcher = vi.fn().mockResolvedValueOnce("first").mockResolvedValueOnce("second");

		const query = await mountComposable(() =>
			createQuery({ key: "interval-key", fetcher, refetchInterval: 5000 }),
		);

		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		expect(fetcher).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(5000);
		await vi.waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
	});

	it("does not refetch when refetchInterval is not set", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		const query = await mountComposable(() => createQuery({ key: "no-interval", fetcher }));
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		const callCount = fetcher.mock.calls.length;
		await new Promise((r) => setTimeout(r, 100));
		expect(fetcher).toHaveBeenCalledTimes(callCount);
	});

	it("refetches on window focus when refetchOnWindowFocus is true", async () => {
		vi.useFakeTimers();
		setQueryData("focus-key", "data");
		const fetcher = vi.fn().mockResolvedValue("refreshed");
		const query = await mountComposable(() =>
			createQuery({ key: "focus-key", fetcher, staleTime: 5000, refetchOnWindowFocus: true }),
		);
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		fetcher.mockClear();

		// Advance past staleTime so data becomes stale
		await vi.advanceTimersByTimeAsync(6000);

		window.dispatchEvent(new Event("focus"));
		await vi.waitFor(() => expect(fetcher).toHaveBeenCalled());
	});

	it("does not refetch on window focus when refetchOnWindowFocus is false", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		const query = await mountComposable(() =>
			createQuery({ key: "no-focus", fetcher, refetchOnWindowFocus: false }),
		);
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		fetcher.mockClear();

		window.dispatchEvent(new Event("focus"));
		await new Promise((r) => setTimeout(r, 100));
		expect(fetcher).not.toHaveBeenCalled();
	});

	it("does not refetch on window focus when enabled is false", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		await mountComposable(() =>
			createQuery({ key: "disabled-focus", fetcher, enabled: false, refetchOnWindowFocus: true }),
		);
		await new Promise((r) => setTimeout(r, 50));
		window.dispatchEvent(new Event("focus"));
		await new Promise((r) => setTimeout(r, 50));
		expect(fetcher).not.toHaveBeenCalled();
	});

	it("refetch() manually triggers a fetch and syncs from cache", async () => {
		const fetcher = vi.fn().mockResolvedValueOnce("first").mockResolvedValueOnce("second");
		const query = await mountComposable(() => createQuery({ key: "manual-refetch", fetcher }));
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		expect(query.data).toBe("first");

		await query.refetch();
		expect(query.data).toBe("second");
		expect(fetcher).toHaveBeenCalledTimes(2);
	});

	it("refetch() calls onSuccess when status is success", async () => {
		const onSuccess = vi.fn();
		const fetcher = vi.fn().mockResolvedValue("ok");
		const query = await mountComposable(() =>
			createQuery({ key: "success-cb", fetcher, onSuccess }),
		);
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		await query.refetch();
		expect(onSuccess).toHaveBeenCalledWith("ok");
	});

	it("refetch() calls onError when status is error", async () => {
		const onError = vi.fn();
		const fetcher = vi.fn().mockRejectedValue(new Error("fail"));
		const query = await mountComposable(() =>
			createQuery({ key: "error-cb", fetcher, onError, retry: 0 }),
		);
		await vi.waitFor(() => expect(query.isError).toBe(true));
		fetcher.mockClear();
		fetcher.mockRejectedValueOnce(new Error("fail again"));
		await query.refetch();
		expect(onError).toHaveBeenCalled();
	});

	it("exposes reactive data, error, status, isLoading, isSuccess, isError, isFetching, isStale", async () => {
		const fetcher = vi.fn().mockResolvedValue("data");
		const query = await mountComposable(() => createQuery({ key: "reactive-props", fetcher }));
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));

		expect(query.data).toBe("data");
		expect(query.error).toBeNull();
		expect(query.status).toBe("success");
		expect(query.isLoading).toBe(false);
		expect(query.isSuccess).toBe(true);
		expect(query.isError).toBe(false);
		expect(query.isFetching).toBe(false);
		expect(typeof query.isStale).toBe("boolean");
	});

	it("isStale is true when lastUpdatedAt is 0", async () => {
		// Pre-populate cache, then invalidate to set lastUpdatedAt = 0
		setQueryData("stale-zero", "data");
		invalidateQuery("stale-zero");
		// The query will refetch on mount (since data is stale), so after mount
		// the data is fresh and isStale is false
		const query = await mountComposable(() =>
			createQuery({
				key: "stale-zero",
				fetcher: vi.fn().mockResolvedValue("new"),
				staleTime: 60000,
			}),
		);
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		expect(query.isStale).toBe(false);

		// Manually invalidate to make it stale again
		invalidateQuery("stale-zero");
		// isStale should now be true since lastUpdatedAt is 0
		expect(query.isStale).toBe(true);
	});

	it("isStale is false when data is fresh within staleTime", async () => {
		setQueryData("fresh-key", "data");
		const query = await mountComposable(() =>
			createQuery({
				key: "fresh-key",
				fetcher: vi.fn().mockResolvedValue("new"),
				staleTime: 60000,
			}),
		);
		await vi.waitFor(() => expect(query.isSuccess).toBe(true));
		expect(query.isStale).toBe(false);
	});

	it("cleans up subscription and schedules garbage collection on destroy", async () => {
		vi.useFakeTimers();

		const fetcher = vi.fn().mockResolvedValue("data");
		const { unmount } = render(MountSvelte, {
			props: {
				composable: () => createQuery({ key: "cleanup-test-key", fetcher, gcTime: 1000 }),
				onResult: () => {},
			},
		});

		await waitFor(() => expect(fetcher).toHaveBeenCalled());
		unmount();

		// After unmount, the entry should eventually be garbage collected
		// Verify the entry still exists immediately after unmount
		expect(getEntry("cleanup-test-key")).toBeDefined();

		vi.advanceTimersByTime(1500);

		// After GC timeout, the entry should be removed
		expect(getEntry("cleanup-test-key")).toBeUndefined();

		vi.useRealTimers();
	});
});

describe("createQuery — error state", () => {
	it("enters error state when fetcher throws", async () => {
		const fetcher = vi.fn().mockRejectedValue(new Error("fetch failed"));
		const query = await mountComposable(() =>
			createQuery({ key: "error-state", fetcher, retry: 0 }),
		);
		await vi.waitFor(() => expect(query.isError).toBe(true));
		expect(query.error?.message).toBe("fetch failed");
		expect(query.data).toBeUndefined();
	});
});
