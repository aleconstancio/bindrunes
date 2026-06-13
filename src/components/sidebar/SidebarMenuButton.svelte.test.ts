import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SidebarMenuButton from "./SidebarMenuButton.svelte";

describe("SidebarMenuButton", () => {
	it("renders as div by default", () => {
		const { container } = render(SidebarMenuButton, { slots: { children: "Item" } });
		const div = container.querySelector("div");
		expect(div).not.toBeNull();
	});

	it("renders as anchor when href provided", () => {
		const { container } = render(SidebarMenuButton, {
			href: "/dashboard",
			slots: { children: "Link" },
		});
		const link = container.querySelector("a");
		expect(link).not.toBeNull();
		expect(link).toHaveAttribute("href", "/dashboard");
	});

	it("renders as button when onclick provided", () => {
		const { container } = render(SidebarMenuButton, {
			onclick: () => {},
			slots: { children: "Click me" },
		});
		const btn = container.querySelector("button");
		expect(btn).not.toBeNull();
	});

	it("isActive applies active class", () => {
		const { container } = render(SidebarMenuButton, {
			isActive: true,
			slots: { children: "Active" },
		});
		const el = container.querySelector("[data-active='true']");
		expect(el).not.toBeNull();
		expect(el?.className).toContain("bg-sidebar-accent");
	});

	it("onclick is called on click", async () => {
		const fn = vi.fn();
		const { container } = render(SidebarMenuButton, {
			onclick: fn,
			slots: { children: "Click" },
		});
		await userEvent.click(container.querySelector("button")!);
		expect(fn).toHaveBeenCalled();
	});
});
