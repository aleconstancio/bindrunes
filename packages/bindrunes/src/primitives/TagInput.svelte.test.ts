import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TagInput from "./TagInput.svelte";

describe("TagInput", () => {
	it("renders initial tags via value prop", () => {
		render(TagInput, { value: ["svelte", "typescript"] });
		expect(screen.getByText("svelte")).toBeInTheDocument();
		expect(screen.getByText("typescript")).toBeInTheDocument();
	});

	it("renders placeholder", () => {
		render(TagInput, { placeholder: "Add a tag..." });
		expect(screen.getByPlaceholderText("Add a tag...")).toBeInTheDocument();
	});

	it("renders label when provided", () => {
		render(TagInput, { label: "Tags" });
		expect(screen.getByText("Tags")).toBeInTheDocument();
	});

	it("renders the root element", () => {
		const { container } = render(TagInput);
		const root = container.firstElementChild;
		expect(root).toBeInTheDocument();
	});

	it("renders without initial tags", () => {
		const { container } = render(TagInput);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
