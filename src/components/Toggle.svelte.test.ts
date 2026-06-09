import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Toggle from "../../src/components/Toggle.svelte";

describe("Toggle", () => {
	it("renders without crashing", () => {
		const { container } = render(Toggle);
		expect(container).toBeInTheDocument();
	});

	it("renders disabled state", () => {
		const { container } = render(Toggle, { props: { disabled: true } });
		expect(container).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(Toggle, { props: { class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});
});
