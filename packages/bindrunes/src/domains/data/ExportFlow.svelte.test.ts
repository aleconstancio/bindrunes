import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ExportFlow from "./ExportFlow.svelte";

describe("ExportFlow", () => {
	it("renders without errors", () => {
		const { container } = render(ExportFlow);
		expect(container).toBeTruthy();
	});

	it("renders export button", () => {
		render(ExportFlow);
		expect(screen.getByText("Export")).toBeInTheDocument();
	});
});
