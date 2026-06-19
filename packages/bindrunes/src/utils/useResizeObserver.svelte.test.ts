import { describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useResizeObserver } from "./useResizeObserver.svelte";

describe("useResizeObserver", () => {
	it("creates observer and returns destroy", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		const result = await mountComposable(() => useResizeObserver(el, callback));

		expect(result).toBeDefined();
		expect(result.destroy).toBeInstanceOf(Function);

		el.remove();
	});

	it("destroy() disconnects observer", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		const result = await mountComposable(() => useResizeObserver(el, callback));
		result.destroy();

		expect(result).toBeDefined();
		el.remove();
	});

	it("handles null element gracefully", async () => {
		const callback = vi.fn();
		const result = await mountComposable(() => useResizeObserver(null, callback));
		expect(result).toBeDefined();
	});
});
