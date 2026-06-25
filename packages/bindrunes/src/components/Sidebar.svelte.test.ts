import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarContent from "../layouts/sidebar/SidebarContent.svelte";
import SidebarFooter from "../layouts/sidebar/SidebarFooter.svelte";
import SidebarGroup from "../layouts/sidebar/SidebarGroup.svelte";
import SidebarHeader from "../layouts/sidebar/SidebarHeader.svelte";
import SidebarMenu from "../layouts/sidebar/SidebarMenu.svelte";
import SidebarMenuBadge from "../layouts/sidebar/SidebarMenuBadge.svelte";
import SidebarMenuButton from "../layouts/sidebar/SidebarMenuButton.svelte";
import SidebarMenuItem from "../layouts/sidebar/SidebarMenuItem.svelte";
import SidebarMenuSkeleton from "../layouts/sidebar/SidebarMenuSkeleton.svelte";
import SidebarProvider from "../layouts/sidebar/SidebarProvider.svelte";
import SidebarSeparator from "../layouts/sidebar/SidebarSeparator.svelte";
import SidebarRailTestWrapper from "./__tests__/harness/SidebarRailTestWrapper.svelte";
import SidebarTestHarness from "./__tests__/harness/SidebarTestHarness.svelte";
import SidebarTriggerTestWrapper from "./__tests__/harness/SidebarTriggerTestWrapper.svelte";

describe("Sidebar standalone components", () => {
	it("SidebarGroup renders label", () => {
		render(SidebarGroup, { label: "Group 1" });
		expect(document.querySelector("span")?.textContent).toContain("Group 1");
	});

	it("SidebarGroup renders without label", () => {
		const { container } = render(SidebarGroup);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("SidebarMenu renders", () => {
		const { container } = render(SidebarMenu);
		expect(container.querySelector("nav")).toBeInTheDocument();
	});

	it("SidebarMenuItem renders", () => {
		const { container } = render(SidebarMenuItem);
		expect(container.firstElementChild?.className).toContain("group/menuitem");
	});

	it("SidebarMenuButton renders", () => {
		const { container } = render(SidebarMenuButton);
		expect(container.firstElementChild?.className).toContain("group/menubutton");
	});

	it("SidebarMenuButton applies active class when isActive", () => {
		const { container } = render(SidebarMenuButton, { isActive: true });
		expect(container.firstElementChild?.className).toContain("bg-sidebar-accent");
	});

	it("SidebarMenuBadge renders", () => {
		const { container } = render(SidebarMenuBadge);
		expect(container.firstElementChild?.className).toContain("rounded-[--radius-pill]");
	});

	it("SidebarMenuBadge applies ml-auto class", () => {
		const { container } = render(SidebarMenuBadge);
		expect(container.firstElementChild?.className).toContain("ml-auto");
	});

	it("SidebarMenuSkeleton renders", () => {
		const { container } = render(SidebarMenuSkeleton);
		expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
	});

	it("SidebarHeader renders", () => {
		const { container } = render(SidebarHeader);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("SidebarContent renders", () => {
		const { container } = render(SidebarContent);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("SidebarFooter renders", () => {
		const { container } = render(SidebarFooter);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("SidebarSeparator renders", () => {
		const { container } = render(SidebarSeparator);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("SidebarRail renders", () => {
		const { container } = render(SidebarRailTestWrapper);
		const rail = container.querySelector("[data-sidebar-rail]");
		expect(rail).toBeInTheDocument();
	});

	it("SidebarTrigger renders", () => {
		const { container } = render(SidebarTriggerTestWrapper);
		const trigger = container.querySelector("[aria-label='Toggle sidebar']");
		expect(trigger).toBeInTheDocument();
	});
});

describe("Sidebar context-dependent components", () => {
	it("SidebarProvider renders without crashing", () => {
		const { container } = render(SidebarProvider);
		expect(container).toBeInTheDocument();
	});

	it("Sidebar with side=right", () => {
		const { container } = render(SidebarTestHarness, { side: "right" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("Sidebar with variant=floating", () => {
		const { container } = render(SidebarTestHarness, { variant: "floating" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("Sidebar with variant=inset", () => {
		const { container } = render(SidebarTestHarness, { variant: "inset" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("Sidebar with collapsible=offcanvas", () => {
		const { container } = render(SidebarTestHarness, { collapsible: "offcanvas" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("Sidebar with collapsible=none", () => {
		const { container } = render(SidebarTestHarness, { collapsible: "none" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("Sidebar with collapsible=icon and open=true", () => {
		const { container } = render(SidebarTestHarness, { collapsible: "icon" });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
