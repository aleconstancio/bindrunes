import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import PinInput from "./PinInput.svelte";

describe("PinInput", () => {
	it("renders the root element", () => {
		const { container } = render(PinInput, { props: { length: 4 } });
		const root = container.firstElementChild;
		expect(root).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(PinInput, { props: { length: 4, class: "custom" } });
		expect(container.firstElementChild?.className).toContain("custom");
	});

	it("renders disabled state", () => {
		const { container } = render(PinInput, { props: { disabled: true, length: 4 } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with different length", () => {
		const { container } = render(PinInput, { props: { length: 6 } });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
