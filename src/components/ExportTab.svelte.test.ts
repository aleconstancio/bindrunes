import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import ExportTab from "./ExportTab.svelte";

describe("ExportTab", () => {
	it("renders the Generated CSS label", () => {
		render(ExportTab, { cssOutput: "" });
		expect(screen.getByText("Generated CSS")).toBeInTheDocument();
	});

	it("renders cssOutput in <pre><code>", () => {
		const { container } = render(ExportTab, { cssOutput: ":root { --primary: red; }" });
		const pre = container.querySelector("pre");
		expect(pre).not.toBeNull();
		expect(pre?.textContent?.trim()).toBe(":root { --primary: red; }");
	});

	it('shows "Copy CSS" when copied=false', () => {
		render(ExportTab, { cssOutput: "a", copied: false });
		expect(screen.getByText("Copy CSS")).toBeInTheDocument();
	});

	it('shows "Copied!" when copied=true', () => {
		render(ExportTab, { cssOutput: "a", copied: true });
		expect(screen.getByText("Copied!")).toBeInTheDocument();
	});

	it("renders Apply Theme button", () => {
		render(ExportTab, { cssOutput: "a" });
		expect(screen.getByText("Apply Theme")).toBeInTheDocument();
	});

	it("clicking Apply Theme calls onapply", async () => {
		const onapply = vi.fn();
		render(ExportTab, { cssOutput: "a", onapply });
		await fireEvent.click(screen.getByText("Apply Theme"));
		expect(onapply).toHaveBeenCalled();
	});

	it("clicking Copy CSS calls oncopy", async () => {
		const oncopy = vi.fn();
		render(ExportTab, { cssOutput: "a", oncopy });
		await fireEvent.click(screen.getByText("Copy CSS"));
		expect(oncopy).toHaveBeenCalled();
	});

	it("handles empty cssOutput", () => {
		const { container } = render(ExportTab, { cssOutput: "" });
		const pre = container.querySelector("pre");
		expect(pre?.textContent).toBe("");
	});
});
