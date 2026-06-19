import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarSeparator from "./SidebarSeparator.svelte";

describe("SidebarSeparator", () => {
	it("renders a separator div", () => {
		const { container } = render(SidebarSeparator);
		const div = container.querySelector("div");
		expect(div).not.toBeNull();
	});

	it("has role=separator for a11y", () => {
		const { container } = render(SidebarSeparator);
		const div = container.querySelector("div");
		expect(div).toHaveAttribute("role", "separator");
	});

	it("renders the root element", () => {
		const { container } = render(SidebarSeparator);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
