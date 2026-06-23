import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ImageUpload from "./ImageUpload.svelte";

describe("ImageUpload", () => {
	it("renders without errors", () => {
		const { container } = render(ImageUpload);
		expect(container).toBeTruthy();
	});

	it("renders upload prompt", () => {
		render(ImageUpload);
		expect(screen.getByText("Click or drag to upload")).toBeInTheDocument();
	});

	it("renders file input", () => {
		const { container } = render(ImageUpload);
		const input = container.querySelector("input[type='file']");
		expect(input).toBeTruthy();
	});
});
