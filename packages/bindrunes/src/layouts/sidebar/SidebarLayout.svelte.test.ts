import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarLayout from "./SidebarLayout.svelte";

describe("SidebarLayout", () => {
	it("renders without crashing", () => {
		const { container } = render(SidebarLayout);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with content position", () => {
		const { container } = render(SidebarLayout, { position: "content" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with header position", () => {
		const { container } = render(SidebarLayout, { position: "header" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with footer position", () => {
		const { container } = render(SidebarLayout, { position: "footer" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with separator position", () => {
		const { container } = render(SidebarLayout, { position: "separator" });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
