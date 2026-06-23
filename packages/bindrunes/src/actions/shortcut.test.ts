import { describe, expect, it, vi } from "vitest";
import { shortcut } from "./shortcut";

function createMockElement(): HTMLElement {
	return document.createElement("div");
}

function pressKey(key: string, opts: { ctrl?: boolean; meta?: boolean } = {}): KeyboardEvent {
	const event = new KeyboardEvent("keydown", {
		key,
		bubbles: true,
		cancelable: true,
		ctrlKey: opts.ctrl ?? false,
		metaKey: opts.meta ?? false,
	});
	return event;
}

describe("shortcut action", () => {
	it("returns an object with destroy method", () => {
		const node = createMockElement();
		const result = shortcut(node, {
			key: "k",
			callback: () => {},
		});
		expect(result).toHaveProperty("destroy");
		expect(typeof result.destroy).toBe("function");
	});

	it("calls callback when matching key is pressed", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", callback: cb });

		window.dispatchEvent(pressKey("k"));
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it("does not call callback when non-matching key is pressed", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", callback: cb });

		window.dispatchEvent(pressKey("j"));
		expect(cb).not.toHaveBeenCalled();
	});

	it("calls callback when ctrl is required and ctrl is pressed", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", ctrl: true, callback: cb });

		window.dispatchEvent(pressKey("k", { ctrl: true }));
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it("calls callback when ctrl is required and meta is pressed", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", ctrl: true, callback: cb });

		window.dispatchEvent(pressKey("k", { meta: true }));
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it("does not call callback when ctrl is required but not pressed", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", ctrl: true, callback: cb });

		window.dispatchEvent(pressKey("k"));
		expect(cb).not.toHaveBeenCalled();
	});

	it("supports array of shortcuts", () => {
		const cb1 = vi.fn();
		const cb2 = vi.fn();
		const node = createMockElement();
		shortcut(node, [
			{ key: "k", ctrl: true, callback: cb1 },
			{ key: "Escape", callback: cb2 },
		]);

		window.dispatchEvent(pressKey("k", { ctrl: true }));
		expect(cb1).toHaveBeenCalledTimes(1);

		window.dispatchEvent(pressKey("Escape"));
		expect(cb2).toHaveBeenCalledTimes(1);
	});

	it("key matching is case-insensitive", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "Escape", callback: cb });

		window.dispatchEvent(pressKey("escape"));
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it("does not fire when input is focused", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", callback: cb });

		const input = document.createElement("input");
		document.body.appendChild(input);
		input.focus();

		window.dispatchEvent(pressKey("k"));
		expect(cb).not.toHaveBeenCalled();

		document.body.removeChild(input);
	});

	it("does not fire when textarea is focused", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", callback: cb });

		const ta = document.createElement("textarea");
		document.body.appendChild(ta);
		ta.focus();

		window.dispatchEvent(pressKey("k"));
		expect(cb).not.toHaveBeenCalled();

		document.body.removeChild(ta);
	});

	it("does not fire when select is focused", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", callback: cb });

		const sel = document.createElement("select");
		document.body.appendChild(sel);
		sel.focus();

		window.dispatchEvent(pressKey("k"));
		expect(cb).not.toHaveBeenCalled();

		document.body.removeChild(sel);
	});

	it("does not fire when contenteditable is focused", () => {
		const cb = vi.fn();
		const node = createMockElement();
		shortcut(node, { key: "k", callback: cb });

		const ce = document.createElement("div");
		ce.setAttribute("contenteditable", "true");
		document.body.appendChild(ce);
		ce.focus();

		window.dispatchEvent(pressKey("k"));
		expect(cb).not.toHaveBeenCalled();

		document.body.removeChild(ce);
	});

	it("destroy removes the event listener", () => {
		const cb = vi.fn();
		const node = createMockElement();
		const result = shortcut(node, { key: "k", callback: cb });

		window.dispatchEvent(pressKey("k"));
		expect(cb).toHaveBeenCalledTimes(1);

		(result as { destroy: () => void }).destroy();

		window.dispatchEvent(pressKey("k"));
		expect(cb).toHaveBeenCalledTimes(1);
	});
});
