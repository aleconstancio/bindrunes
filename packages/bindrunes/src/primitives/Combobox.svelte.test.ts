import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Combobox from "./Combobox.svelte";

const defaultOptions = [
	{ value: "svelte", label: "Svelte" },
	{ value: "react", label: "React" },
	{ value: "vue", label: "Vue" },
];

describe("Combobox", () => {
	it("renders without errors", () => {
		const { container } = render(Combobox);
		expect(container).toBeTruthy();
	});

	it("renders with options", () => {
		render(Combobox, { options: defaultOptions });
		const input = screen.getByRole("combobox");
		expect(input).toBeInTheDocument();
	});

	it("filters options based on input", async () => {
		render(Combobox, { options: defaultOptions });
		const input = screen.getByRole("combobox");
		await fireEvent.input(input, { target: { value: "sve" } });
		expect(input).toHaveValue("sve");
	});

	it("renders with placeholder", () => {
		render(Combobox, { placeholder: "Pick a framework" });
		expect(screen.getByPlaceholderText("Pick a framework")).toBeInTheDocument();
	});

	it("renders with aria-label", () => {
		render(Combobox, { ariaLabel: "Framework selector" });
		expect(screen.getByLabelText("Framework selector")).toBeInTheDocument();
	});

	it("can be disabled", () => {
		render(Combobox, { disabled: true });
		const input = screen.getByRole("combobox");
		expect(input).toBeDisabled();
	});

	it("renders with empty options list", () => {
		render(Combobox, { options: [] });
		const input = screen.getByRole("combobox");
		expect(input).toBeInTheDocument();
	});
});
