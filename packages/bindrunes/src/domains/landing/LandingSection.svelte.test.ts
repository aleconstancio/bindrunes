import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import LandingSection from "./LandingSection.svelte";

describe("LandingSection", () => {
	it("renders a section element", () => {
		const { container } = render(LandingSection, {});
		expect(container.querySelector("section")).not.toBeNull();
	});

	it("applies id when provided", () => {
		const { container } = render(LandingSection, { id: "features" });
		expect(container.querySelector("section")?.id).toBe("features");
	});

	it("applies class prop", () => {
		const { container } = render(LandingSection, { class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});

	it("applies size classes via MetaContainer", () => {
		const { container } = render(LandingSection, { size: "lg" });
		expect(container.querySelector("section")?.innerHTML).toContain("max-w-[var(--container-lg)]");
	});

	it("uses 2xl size via MetaContainer", () => {
		const { container } = render(LandingSection, { size: "2xl" });
		expect(container.querySelector("section")?.innerHTML).toContain("max-w-[var(--container-2xl)]");
	});

	it("uses full size via MetaContainer", () => {
		const { container } = render(LandingSection, { size: "full" });
		expect(container.querySelector("section")?.innerHTML).toContain("max-w-full");
	});

	it("uses default size via MetaContainer", () => {
		const { container } = render(LandingSection, {});
		expect(container.querySelector("section")?.innerHTML).toContain("max-w-[var(--container-xl)]");
	});
});
