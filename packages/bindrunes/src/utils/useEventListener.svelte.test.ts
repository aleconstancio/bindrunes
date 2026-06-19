import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useEventListener } from "./useEventListener.svelte";

describe("useEventListener", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("calls handler when event fires", async () => {
		const handler = vi.fn();
		await mountComposable(() => useEventListener("resize", handler));

		window.dispatchEvent(new Event("resize"));
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it("cleanup removes listener", async () => {
		const handler = vi.fn();
		const result = await mountComposable(() => useEventListener("resize", handler));

		window.dispatchEvent(new Event("resize"));
		expect(handler).toHaveBeenCalledTimes(1);

		result.destroy();
		window.dispatchEvent(new Event("resize"));
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it("passes event object to handler", async () => {
		const handler = vi.fn();
		await mountComposable(() => useEventListener("click", handler));

		const event = new MouseEvent("click", { bubbles: true });
		window.dispatchEvent(event);
		expect(handler).toHaveBeenCalledWith(event);
	});
});
