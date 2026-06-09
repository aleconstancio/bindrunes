import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SidebarTestHarness from "./SidebarTestHarness.svelte";
import Sidebar from "./sidebar/Sidebar.svelte";
import SidebarContent from "./sidebar/SidebarContent.svelte";
import SidebarFooter from "./sidebar/SidebarFooter.svelte";
import SidebarGroup from "./sidebar/SidebarGroup.svelte";
import SidebarHeader from "./sidebar/SidebarHeader.svelte";
import SidebarLayout from "./sidebar/SidebarLayout.svelte";
import SidebarMenu from "./sidebar/SidebarMenu.svelte";
import SidebarMenuBadge from "./sidebar/SidebarMenuBadge.svelte";
import SidebarMenuButton from "./sidebar/SidebarMenuButton.svelte";
import SidebarMenuItem from "./sidebar/SidebarMenuItem.svelte";
import SidebarMenuSkeleton from "./sidebar/SidebarMenuSkeleton.svelte";
import SidebarProvider from "./sidebar/SidebarProvider.svelte";
import SidebarRail from "./sidebar/SidebarRail.svelte";
import SidebarSeparator from "./sidebar/SidebarSeparator.svelte";
import SidebarTrigger from "./sidebar/SidebarTrigger.svelte";

describe("Sidebar standalone components", () => {
	it("SidebarLayout renders in header position", () => {
		const { container } = render(SidebarLayout, { position: "header" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("SidebarLayout renders in footer position", () => {
		const { container } = render(SidebarLayout, { position: "footer" });
		expect(container.firstElementChild!.className).toContain("border-t");
	});

	it("SidebarLayout renders in content position", () => {
		const { container } = render(SidebarLayout, { position: "content" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

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
		expect(container.firstElementChild!.className).toContain("group/menuitem");
	});

	it("SidebarMenuButton renders", () => {
		const { container } = render(SidebarMenuButton);
		expect(container.firstElementChild!.className).toContain("group/menubutton");
	});

	it("SidebarMenuButton applies active class when isActive", () => {
		const { container } = render(SidebarMenuButton, { isActive: true });
		expect(container.firstElementChild!.className).toContain("bg-sidebar-accent");
	});

	it("SidebarMenuBadge renders", () => {
		const { container } = render(SidebarMenuBadge);
		expect(container.firstElementChild!.className).toContain("rounded-full");
	});

	it("SidebarMenuBadge applies ml-auto class", () => {
		const { container } = render(SidebarMenuBadge);
		expect(container.firstElementChild!.className).toContain("ml-auto");
	});

	it("SidebarMenuSkeleton renders", () => {
		const { container } = render(SidebarMenuSkeleton);
		expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
	});

	it("SidebarLayout renders separator", () => {
		const { container } = render(SidebarLayout, { position: "separator" });
		expect(container.querySelector('[role="separator"]')).toBeInTheDocument();
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
		const { container } = render(SidebarRail);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("SidebarTrigger renders", () => {
		const { container } = render(SidebarTrigger);
		expect(container.firstElementChild).toBeInTheDocument();
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
