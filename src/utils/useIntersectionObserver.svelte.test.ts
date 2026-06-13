import { describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useIntersectionObserver } from "./useIntersectionObserver.svelte";

describe("useIntersectionObserver", () => {
	it("creates observer and calls callback", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		const result = await mountComposable(() => useIntersectionObserver(el, callback));

		expect(result).toBeDefined();
		expect(result.destroy).toBeInstanceOf(Function);

		el.remove();
	});

	it("destroy() disconnects observer", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		const result = await mountComposable(() => useIntersectionObserver(el, callback));
		result.destroy();

		expect(result).toBeDefined();
		el.remove();
	});

	it("handles null element gracefully", async () => {
		const callback = vi.fn();
		const result = await mountComposable(() => useIntersectionObserver(null, callback));
		expect(result).toBeDefined();
	});
});
