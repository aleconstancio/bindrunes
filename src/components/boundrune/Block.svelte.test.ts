import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Block from "./Block.svelte";

describe("Block", () => {
	it("renders a section element", () => {
		const { container } = render(Block);
		expect(container.querySelector("section")).not.toBeNull();
	});

	it("applies id when provided", () => {
		const { container } = render(Block, { id: "my-section" });
		expect(container.querySelector("section")?.id).toBe("my-section");
	});

	it("applies class prop", () => {
		const { container } = render(Block, { class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});

	it("applies size via MetaContainer", () => {
		const { container } = render(Block, { size: "lg" });
		expect(container.querySelector("section")?.innerHTML).toContain(
			"max-w-[var(--container-lg)]",
		);
	});

	it("applies size full", () => {
		const { container } = render(Block, { size: "full" });
		expect(container.querySelector("section")?.innerHTML).toContain("max-w-full");
	});

	it("defaults to xl size", () => {
		const { container } = render(Block);
		expect(container.querySelector("section")?.innerHTML).toContain(
			"max-w-[var(--container-xl)]",
		);
	});

	it("applies compact spacing", () => {
		const { container } = render(Block, { spacing: "compact" });
		expect(container.firstElementChild?.className).toContain("py-8");
	});

	it("applies normal spacing (default)", () => {
		const { container } = render(Block);
		expect(container.firstElementChild?.className).toContain("py-16");
	});

	it("applies wide spacing", () => {
		const { container } = render(Block, { spacing: "wide" });
		expect(container.firstElementChild?.className).toContain("py-24");
	});

	it("applies muted background", () => {
		const { container } = render(Block, { background: "muted" });
		expect(container.firstElementChild?.className).toContain("bg-muted");
	});

	it("applies gradient background", () => {
		const { container } = render(Block, { background: "gradient" });
		expect(container.firstElementChild?.className).toContain("bg-gradient-to-b");
	});

	it("no background class by default", () => {
		const { container } = render(Block);
		expect(container.firstElementChild?.className).not.toContain("bg-muted");
		expect(container.firstElementChild?.className).not.toContain("bg-gradient");
	});
});
