import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ToggleGroup from "./ToggleGroup.svelte";

describe("ToggleGroup", () => {
	const options = [
		{ value: "list", label: "List" },
		{ value: "grid", label: "Grid" },
	];

	it("renders all options as buttons", () => {
		render(ToggleGroup, { props: { options } });
		expect(screen.getByText("List")).toBeInTheDocument();
		expect(screen.getByText("Grid")).toBeInTheDocument();
	});

	it("renders with single mode", () => {
		const { container } = render(ToggleGroup, { props: { options, multiple: false } });
		const group = container.firstElementChild;
		expect(group).toBeInTheDocument();
	});

	it("renders with multiple mode", () => {
		const { container } = render(ToggleGroup, { props: { options, multiple: true } });
		const group = container.firstElementChild;
		expect(group).toBeInTheDocument();
	});

	it("renders the group element", () => {
		const { container } = render(ToggleGroup, { props: { options } });
		const group = container.firstElementChild;
		expect(group).toBeInTheDocument();
	});
});
