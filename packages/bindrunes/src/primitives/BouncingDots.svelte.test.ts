import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import BouncingDots from "./BouncingDots.svelte";

describe("BouncingDots", () => {
	it("renders the root element", () => {
		const { container } = render(BouncingDots);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders three dot spans", () => {
		const { container } = render(BouncingDots);
		const dots = container.querySelectorAll("span");
		expect(dots).toHaveLength(3);
	});

	it("applies custom class", () => {
		const { container } = render(BouncingDots, { props: { class: "my-dots" } });
		expect(container.firstElementChild?.className).toContain("my-dots");
	});

	it("applies custom color class", () => {
		const { container } = render(BouncingDots, { props: { color: "bg-primary" } });
		const dots = container.querySelectorAll("span");
		dots.forEach((dot) => {
			expect(dot.className).toContain("bg-primary");
		});
	});
});
