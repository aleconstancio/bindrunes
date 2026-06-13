import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardShellHeader from "./DashboardShellHeader.svelte";

describe("DashboardShellHeader", () => {
	it("renders a header element", () => {
		const { container } = render(DashboardShellHeader, { resolvedTitle: "X" });
		const header = container.querySelector("header");
		expect(header).not.toBeNull();
	});

	it("renders resolved title in h1", () => {
		const { container } = render(DashboardShellHeader, { resolvedTitle: "My Page" });
		const h1 = container.querySelector("h1");
		expect(h1?.textContent).toBe("My Page");
	});

	it("renders header prefix", () => {
		render(DashboardShellHeader, { resolvedTitle: "X", headerPrefix: "Section" });
		expect(screen.getByText("Section")).toBeInTheDocument();
	});

	it("renders description when provided", () => {
		render(DashboardShellHeader, { resolvedTitle: "X", resolvedDescription: "desc" });
		expect(screen.getByText("desc")).toBeInTheDocument();
	});

	it("does not render description when not provided", () => {
		const { container } = render(DashboardShellHeader, { resolvedTitle: "X" });
		expect(container.querySelectorAll("p").length).toBe(0);
	});

	it("renders status chip when label is provided", () => {
		const { container } = render(DashboardShellHeader, {
			resolvedTitle: "X",
			statusChip: { label: "Online", variant: "success" },
		});
		expect(container.textContent).toContain("Online");
	});

	it("applies sticky header classes", () => {
		const { container } = render(DashboardShellHeader, { resolvedTitle: "X" });
		const header = container.querySelector("header");
		expect(header?.className).toContain("sticky");
		expect(header?.className).toContain("backdrop-blur");
	});
});
