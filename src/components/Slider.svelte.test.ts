import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Slider from "./Slider.svelte";

describe("Slider", () => {
	it("renders the slider root", () => {
		const { container } = render(Slider);
		const track = container.firstElementChild;
		expect(track).toBeInTheDocument();
	});

	it("renders with custom min/max", () => {
		const { container } = render(Slider, { min: 0, max: 10, step: 2 });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders disabled state", () => {
		const { container } = render(Slider, { disabled: true });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(Slider, { class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});
});
