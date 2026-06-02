import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	getEntry,
	getOrCreateEntry,
	subscribe,
	notify,
	fetchQuery,
	defaultRetryDelay,
	invalidateQuery,
	setQueryData,
	removeEntry,
} from "../src/utils/queryCache";

describe("queryCache", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	const sharedKeys = [
		'nonexistent', 'fresh-key', 'existing-key', 'get-test',
		'sub-key', 'notify-key', 'unsub-key', 'multi-key',
		'fetch-key', 'notify-fetch', 'dedup-key',
		'retry-success-key', 'retry-fail-key', 'no-retry-key', 'default-retry-key',
		'inv-key', 'inv-notify', 'set-key', 'set-notify', 'set-create',
		'remove-key',
	];

	beforeEach(() => {
		sharedKeys.forEach(k => removeEntry(k));
	});

	describe("getEntry / getOrCreateEntry", () => {
		it("getEntry returns undefined for missing key", () => {
			expect(getEntry("nonexistent")).toBeUndefined();
		});

		it("getOrCreateEntry creates a new entry for a missing key", () => {
			const entry = getOrCreateEntry("fresh-key");
			expect(entry).toBeDefined();
			expect(entry.key).toBe("fresh-key");
			expect(entry.status).toBe("loading");
			expect(entry.fetchStatus).toBe("idle");
			expect(entry.data).toBeUndefined();
			expect(entry.error).toBeNull();
			expect(entry.lastUpdatedAt).toBe(0);
			expect(entry.promise).toBeNull();
			expect(entry.subscribers).toBeInstanceOf(Set);
		});

		it("getOrCreateEntry returns existing entry for existing key", () => {
			const a = getOrCreateEntry("existing-key");
			const b = getOrCreateEntry("existing-key");
			expect(a).toBe(b);
		});

		it("getEntry retrieves a previously created entry", () => {
			getOrCreateEntry("get-test");
			const entry = getEntry("get-test");
			expect(entry).toBeDefined();
			expect(entry!.key).toBe("get-test");
		});
	});

	describe("subscribe / notify", () => {
		it("subscribe returns an unsubscribe function", () => {
			const unsub = subscribe("sub-key", () => { });
			expect(typeof unsub).toBe("function");
			unsub();
		});

		it("subscriber is called when notify is invoked", () => {
			const listener = vi.fn();
			subscribe("notify-key", listener);
			const entry = getOrCreateEntry("notify-key");
			notify(entry);
			expect(listener).toHaveBeenCalledOnce();
		});

		it("subscriber is not called after unsubscribe", () => {
			const listener = vi.fn();
			const unsub = subscribe("unsub-key", listener);
			unsub();
			const entry = getOrCreateEntry("unsub-key");
			notify(entry);
			expect(listener).not.toHaveBeenCalled();
		});

		it("multiple subscribers are all notified", () => {
			const a = vi.fn();
			const b = vi.fn();
			subscribe("multi-key", a);
			subscribe("multi-key", b);
			const entry = getOrCreateEntry("multi-key");
			notify(entry);
			expect(a).toHaveBeenCalledOnce();
			expect(b).toHaveBeenCalledOnce();
		});
	});

	describe("fetchQuery", () => {
		it("fetches data and stores it in the cache", async () => {
			const fetcher = vi.fn().mockResolvedValue("hello");
			await fetchQuery("fetch-key", fetcher);
			const entry = getEntry("fetch-key");
			expect(entry?.data).toBe("hello");
			expect(entry?.status).toBe("success");
			expect(entry?.fetchStatus).toBe("idle");
			expect(entry?.error).toBeNull();
			expect(entry?.promise).toBeNull();
			expect(entry?.lastUpdatedAt).toBeGreaterThan(0);
		});

		it("notifies subscribers after fetch completes", async () => {
			const listener = vi.fn();
			subscribe("notify-fetch", listener);
			const fetcher = vi.fn().mockResolvedValue("data");
			await fetchQuery("notify-fetch", fetcher);
			expect(listener).toHaveBeenCalled();
		});
	});

	describe("fetchQuery dedup", () => {
	it("concurrent calls with the same key use the cached promise", async () => {
			let resolveFetcher: (v: string) => void;
			const fetcher = vi.fn().mockReturnValue(
				new Promise<string>(resolve => { resolveFetcher = resolve; })
			);

			fetchQuery("dedup-key", fetcher);
			// After the first call, entry.promise is set by the sync portion of fetchQuery
			const entry = getEntry<string>("dedup-key");
			const cachedPromise = entry!.promise;
			expect(cachedPromise).not.toBeNull();

			// Second call returns the same cached promise (via early return)
			fetchQuery("dedup-key", fetcher);
			expect(entry!.promise).toBe(cachedPromise);

			resolveFetcher!("done");
			await cachedPromise;
			expect(fetcher).toHaveBeenCalledTimes(1);
		});
	});

	describe("fetchQuery retry", () => {
		it("retries on failure and eventually succeeds", async () => {
			vi.useFakeTimers();
			const fetcher = vi.fn()
				.mockRejectedValueOnce(new Error("fail 1"))
				.mockResolvedValueOnce("success-after-retry");

			const promise = fetchQuery("retry-success-key", fetcher, { retry: 1 });
			await vi.advanceTimersByTimeAsync(2000);
			await promise;

			const entry = getEntry("retry-success-key");
			expect(entry?.status).toBe("success");
			expect(entry?.data).toBe("success-after-retry");
			expect(fetcher).toHaveBeenCalledTimes(2);
		});

		it("enters error state after exhausting all retries", async () => {
			vi.useFakeTimers();
			const error = new Error("persistent failure");
			const fetcher = vi.fn().mockRejectedValue(error);

			const promise = fetchQuery("retry-fail-key", fetcher, { retry: 2 });
			// Delays: 1000ms + 2000ms = 3000ms total for 2 retries
			await vi.advanceTimersByTimeAsync(10000);
			await promise;

			const entry = getEntry("retry-fail-key");
			expect(entry?.status).toBe("error");
			expect(entry?.error?.message).toBe("persistent failure");
			expect(fetcher).toHaveBeenCalledTimes(3); // initial + 2 retries
		});

		it("does not retry when retry is 0", async () => {
			vi.useFakeTimers();
			const fetcher = vi.fn().mockRejectedValue(new Error("no retry"));
			const promise = fetchQuery("no-retry-key", fetcher, { retry: 0 });
			await vi.advanceTimersByTimeAsync(1000);
			await promise;

			const entry = getEntry("no-retry-key");
			expect(entry?.status).toBe("error");
			expect(fetcher).toHaveBeenCalledTimes(1);
		});

		it("retries the default number of times when retry option is omitted", async () => {
			vi.useFakeTimers();
			const fetcher = vi.fn().mockRejectedValue(new Error("default retries"));
			const promise = fetchQuery("default-retry-key", fetcher);
			// Default retry = 3, so 4 total calls. Delays: 1000+2000+4000 = 7000ms
			await vi.advanceTimersByTimeAsync(20000);
			await promise;

			expect(fetcher).toHaveBeenCalledTimes(4);
		});
	});

	describe("defaultRetryDelay", () => {
		it("returns exponential backoff capped at 30000", () => {
			expect(defaultRetryDelay(0)).toBe(1000);
			expect(defaultRetryDelay(1)).toBe(2000);
			expect(defaultRetryDelay(2)).toBe(4000);
			expect(defaultRetryDelay(3)).toBe(8000);
			expect(defaultRetryDelay(4)).toBe(16000);
			expect(defaultRetryDelay(5)).toBe(30000);
			expect(defaultRetryDelay(10)).toBe(30000);
		});
	});

	describe("invalidateQuery", () => {
		it("marks the entry as stale by setting lastUpdatedAt to 0", () => {
			setQueryData("inv-key", "some data");
			const before = getEntry("inv-key");
			const updatedAt = before!.lastUpdatedAt;
			expect(updatedAt).toBeGreaterThan(0);

			invalidateQuery("inv-key");
			const after = getEntry("inv-key");
			expect(after!.lastUpdatedAt).toBe(0);
		});

		it("notifies subscribers when entry is invalidated", () => {
			const listener = vi.fn();
			subscribe("inv-notify", listener);
			setQueryData("inv-notify", "val");
			listener.mockClear();

			invalidateQuery("inv-notify");
			expect(listener).toHaveBeenCalled();
		});

		it("is a no-op for a missing key", () => {
			expect(() => invalidateQuery("does-not-exist")).not.toThrow();
		});
	});

	describe("setQueryData", () => {
		it("directly sets data in the cache", () => {
			setQueryData("set-key", { foo: 42 });
			const entry = getEntry("set-key");
			expect(entry?.data).toEqual({ foo: 42 });
			expect(entry?.status).toBe("success");
		});

		it("notifies subscribers", () => {
			const listener = vi.fn();
			subscribe("set-notify", listener);
			setQueryData("set-notify", "value");
			expect(listener).toHaveBeenCalled();
		});

		it("creates the entry if it does not exist", () => {
			setQueryData("set-create", "fresh");
			const entry = getEntry("set-create");
			expect(entry).toBeDefined();
			expect(entry!.data).toBe("fresh");
		});
	});

	describe("removeEntry", () => {
		it("removes an entry from the cache", () => {
			getOrCreateEntry("remove-key");
			removeEntry("remove-key");
			expect(getEntry("remove-key")).toBeUndefined();
		});

		it("is a no-op for a missing key", () => {
			expect(() => removeEntry("does-not-exist")).not.toThrow();
		});
	});
});
