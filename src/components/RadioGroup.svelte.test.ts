import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import RadioGroup from "../../src/components/RadioGroup.svelte";

describe("RadioGroup", () => {
	const options = [
		{ value: "a", label: "Option A" },
		{ value: "b", label: "Option B" },
	];

	it("renders all options", () => {
		render(RadioGroup, { props: { options } });
		expect(screen.getByText("Option A")).toBeInTheDocument();
		expect(screen.getByText("Option B")).toBeInTheDocument();
	});

	it("renders with a default value", () => {
		render(RadioGroup, { props: { options, value: "a" } });
		expect(screen.getByText("Option A")).toBeInTheDocument();
	});

	it("renders with custom class", () => {
		const { container } = render(RadioGroup, { props: { options, class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});
});
