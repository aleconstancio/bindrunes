import { afterEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useClipboard } from "./useClipboard.svelte";

function stubClipboard(mock: { writeText: ReturnType<typeof vi.fn> }) {
	Object.defineProperty(navigator, "clipboard", {
		value: mock,
		writable: true,
		configurable: true,
	});
}

describe("useClipboard", () => {
	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("initializes with copied=false and error=null", async () => {
		const clipboard = await mountComposable(() => useClipboard());
		expect(clipboard.copied).toBe(false);
		expect(clipboard.error).toBeNull();
	});

	it("copy() sets copied to true on success", async () => {
		vi.useFakeTimers();
		stubClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });

		const clipboard = await mountComposable(() => useClipboard());
		const result = await clipboard.copy("hello");

		expect(result).toBe(true);
		expect(clipboard.copied).toBe(true);
	});

	it("copy() resets copied after 2 seconds", async () => {
		vi.useFakeTimers();
		stubClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });

		const clipboard = await mountComposable(() => useClipboard());
		await clipboard.copy("hello");
		expect(clipboard.copied).toBe(true);

		vi.advanceTimersByTime(2000);
		expect(clipboard.copied).toBe(false);
	});

	it("copy() sets error on failure", async () => {
		const failError = new Error("clipboard write failed");
		stubClipboard({ writeText: vi.fn().mockRejectedValue(failError) });

		const clipboard = await mountComposable(() => useClipboard());
		const result = await clipboard.copy("hello");

		expect(result).toBe(false);
		expect(clipboard.error).toBeInstanceOf(Error);
		expect(clipboard.error?.message).toBe("clipboard write failed");
	});
});
