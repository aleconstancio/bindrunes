import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ContextMenu from "./ContextMenu.svelte";

describe("ContextMenu", () => {
	it("renders without errors", () => {
		const { container } = render(ContextMenu);
		expect(container).toBeTruthy();
	});

	it("renders trigger wrapper", () => {
		const { container } = render(ContextMenu);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with items config without throwing", () => {
		expect(() =>
			render(ContextMenu, {
				items: [
					{ label: "Copy", value: "copy" },
					{ label: "Paste", value: "paste" },
				],
			}),
		).not.toThrow();
	});

	it("renders with separator items without throwing", () => {
		expect(() =>
			render(ContextMenu, {
				items: [
					{ label: "Copy", value: "copy" },
					{ value: "sep", label: "", separator: true },
					{ label: "Paste", value: "paste" },
				],
			}),
		).not.toThrow();
	});

	it("renders with disabled items without throwing", () => {
		expect(() =>
			render(ContextMenu, {
				items: [{ label: "Cut", value: "cut", disabled: true }],
			}),
		).not.toThrow();
	});

	it("renders with empty items", () => {
		const { container } = render(ContextMenu, { items: [] });
		expect(container).toBeTruthy();
	});

	it("renders with onSelect callback", () => {
		expect(() =>
			render(ContextMenu, {
				items: [{ label: "Action", value: "action" }],
				onSelect: () => {},
			}),
		).not.toThrow();
	});
});
