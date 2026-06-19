import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import RadioGroup from "./RadioGroup.svelte";

describe("RadioGroup", () => {
	const options = [
		{ value: "a", label: "Option A" },
		{ value: "b", label: "Option B" },
	];

	it("renders all options as labels", () => {
		render(RadioGroup, { props: { options } });
		expect(screen.getByText("Option A")).toBeInTheDocument();
		expect(screen.getByText("Option B")).toBeInTheDocument();
	});

	it("renders with a default value", () => {
		render(RadioGroup, { props: { options, value: "a" } });
		expect(screen.getByText("Option A")).toBeInTheDocument();
	});

	it("renders the group element", () => {
		const { container } = render(RadioGroup, { props: { options } });
		const group = container.firstElementChild;
		expect(group).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(RadioGroup, { props: { options, class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});
});
