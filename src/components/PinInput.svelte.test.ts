import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import PinInput from "../../src/components/PinInput.svelte";

describe("PinInput", () => {
	it("renders without crashing", () => {
		const { container } = render(PinInput, { props: { length: 4 } });
		expect(container).toBeInTheDocument();
	});

	it("renders with different length", () => {
		const { container } = render(PinInput, { props: { length: 6 } });
		expect(container).toBeInTheDocument();
	});

	it("renders disabled state", () => {
		const { container } = render(PinInput, { props: { disabled: true, length: 4 } });
		expect(container).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(PinInput, { props: { length: 4, class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});
});
