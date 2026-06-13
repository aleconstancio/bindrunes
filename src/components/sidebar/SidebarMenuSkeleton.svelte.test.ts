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

	it("has correct layout classes", () => {
		const { container } = render(SidebarMenuSkeleton);
		const wrapper = container.querySelector(".flex.items-center.gap-2");
		expect(wrapper).not.toBeNull();
	});
});
