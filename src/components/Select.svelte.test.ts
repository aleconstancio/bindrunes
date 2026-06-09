import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Select from "../../src/components/Select.svelte";

describe("Select", () => {
	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
	];

	it("renders label when provided", () => {
		render(Select, { props: { label: "Choose", options } });
		expect(screen.getByText("Choose")).toBeInTheDocument();
	});

	it("shows error message", () => {
		render(Select, { props: { error: "Required", options } });
		expect(screen.getByText("Required")).toBeInTheDocument();
	});

	it("renders a trigger element", () => {
		const { container } = render(Select, { props: { options } });
		const trigger = container.querySelector("[data-select-trigger]");
		expect(trigger).toBeInTheDocument();
	});
});
