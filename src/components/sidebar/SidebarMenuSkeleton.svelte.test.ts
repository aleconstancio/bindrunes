import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarMenuSkeleton from "./SidebarMenuSkeleton.svelte";

describe("SidebarMenuSkeleton", () => {
	it("renders skeleton placeholder", () => {
		const { container } = render(SidebarMenuSkeleton);
		const pulse = container.querySelector(".animate-pulse");
		expect(pulse).not.toBeNull();
	});

	it("renders without children", () => {
		const { container } = render(SidebarMenuSkeleton);
		expect(container.querySelector(".animate-pulse")).not.toBeNull();
	});

	it("renders the root element", () => {
		const { container } = render(SidebarMenuSkeleton);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
