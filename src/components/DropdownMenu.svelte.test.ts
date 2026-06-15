import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DropdownMenu from "./DropdownMenu.svelte";

describe("DropdownMenu", () => {
	const items = [
		{ label: "Edit", value: "edit" },
		{ label: "Delete", value: "delete" },
	];

	it("renders a trigger element", () => {
		const { container } = render(DropdownMenu, {
			slots: { children: "Open menu" },
		});
		const trigger = container.querySelector("[data-dropdown-menu-trigger]");
		expect(trigger).toBeInTheDocument();
	});

	it("renders with items prop", () => {
		const { container } = render(DropdownMenu, { props: { items } });
		expect(container.querySelector("[data-dropdown-menu-trigger]")).toBeInTheDocument();
	});

	it("renders without items", () => {
		const { container } = render(DropdownMenu, { props: { items: [] } });
		expect(container.querySelector("[data-dropdown-menu-trigger]")).toBeInTheDocument();
	});

	it("renders the dropdown root", () => {
		const { container } = render(DropdownMenu);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
