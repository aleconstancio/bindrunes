import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useClickOutside } from "./useClickOutside.svelte";

describe("useClickOutside", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("calls callback when clicking outside element", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		await mountComposable(() => useClickOutside(el, callback));

		document.body.click();
		expect(callback).toHaveBeenCalledTimes(1);

		el.remove();
	});

	it("does not call callback when clicking inside element", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		await mountComposable(() => useClickOutside(el, callback));

		el.click();
		expect(callback).not.toHaveBeenCalled();

		el.remove();
	});

	it("does not call callback when enabled=false", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		const result = await mountComposable(() => useClickOutside(el, callback, { enabled: false }));

		document.body.click();
		expect(callback).not.toHaveBeenCalled();

		result.setEnabled(true);
		document.body.click();
		expect(callback).toHaveBeenCalledTimes(1);

		el.remove();
	});

	it("destroy() removes listener", async () => {
		const callback = vi.fn();
		const el = document.createElement("div");
		document.body.appendChild(el);

		const result = await mountComposable(() => useClickOutside(el, callback));

		result.destroy();
		document.body.click();
		expect(callback).not.toHaveBeenCalled();

		el.remove();
	});
});
