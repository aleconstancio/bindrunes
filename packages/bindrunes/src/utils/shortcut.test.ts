import { afterEach, describe, expect, it, vi } from "vitest";
import { shortcut } from "../actions/shortcut";

describe("shortcut", () => {
	const cleanups: Array<() => void> = [];

	afterEach(() => {
		cleanups.forEach((fn) => fn());
		cleanups.length = 0;
	});

	it("calls callback when matching key is pressed", () => {
		const callback = vi.fn();
		const node = document.createElement("div");
		const action = shortcut(node, { key: "Escape", callback });
		if (action?.destroy) cleanups.push(() => action.destroy());

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
		expect(callback).toHaveBeenCalledOnce();
	});

	it("does not call callback for non-matching key", () => {
		const callback = vi.fn();
		const node = document.createElement("div");
		const action = shortcut(node, { key: "Escape", callback });
		if (action?.destroy) cleanups.push(() => action.destroy());

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
		expect(callback).not.toHaveBeenCalled();
	});

	it("calls callback with ctrl modifier", () => {
		const callback = vi.fn();
		const node = document.createElement("div");
		const action = shortcut(node, { key: "k", ctrl: true, callback });
		if (action?.destroy) cleanups.push(() => action.destroy());

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
		expect(callback).toHaveBeenCalledOnce();
	});

	it("does not call callback when ctrl expected but not pressed", () => {
		const callback = vi.fn();
		const node = document.createElement("div");
		const action = shortcut(node, { key: "k", ctrl: true, callback });
		if (action?.destroy) cleanups.push(() => action.destroy());

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: false }));
		expect(callback).not.toHaveBeenCalled();
	});

	it("handles array of shortcuts", () => {
		const cb1 = vi.fn();
		const cb2 = vi.fn();
		const node = document.createElement("div");
		const action = shortcut(node, [
			{ key: "a", callback: cb1 },
			{ key: "b", callback: cb2 },
		]);
		if (action?.destroy) cleanups.push(() => action.destroy());

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
		expect(cb1).toHaveBeenCalledOnce();
		expect(cb2).not.toHaveBeenCalled();

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "b" }));
		expect(cb2).toHaveBeenCalledOnce();
	});

	it("stops listening after destroy", () => {
		const callback = vi.fn();
		const node = document.createElement("div");
		const action = shortcut(node, { key: "Escape", callback });

		action?.destroy?.();
		window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
		expect(callback).not.toHaveBeenCalled();
	});

	it("skips callback when input element is focused", () => {
		const callback = vi.fn();
		const node = document.createElement("div");
		const input = document.createElement("input");
		document.body.appendChild(input);
		input.focus();

		const action = shortcut(node, { key: "Escape", callback });
		if (action?.destroy) cleanups.push(() => action.destroy());

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
		expect(callback).not.toHaveBeenCalled();

		document.body.removeChild(input);
	});
});
