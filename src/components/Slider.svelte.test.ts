import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Slider from "../../src/components/Slider.svelte";

describe("Slider", () => {
	it("renders without crashing", () => {
		const { container } = render(Slider);
		expect(container).toBeInTheDocument();
	});

	it("renders with custom min/max/step", () => {
		const { container } = render(Slider, { props: { min: 0, max: 10, step: 2 } });
		expect(container).toBeInTheDocument();
	});

	it("renders disabled state", () => {
		const { container } = render(Slider, { props: { disabled: true } });
		expect(container).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(Slider, { props: { class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});
});
