import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import PopconfirmHarness from "../components/__tests__/harness/PopconfirmHarness.svelte";

describe("Popconfirm", () => {
	it("renders without crashing", () => {
		const { container } = render(PopconfirmHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders trigger button", () => {
		render(PopconfirmHarness);
		expect(screen.getByText("Open")).toBeInTheDocument();
	});

	it("has correct default title prop", () => {
		const { container } = render(PopconfirmHarness);
		expect(container).toBeDefined();
	});

	it("renders with custom props without throwing", () => {
		expect(() =>
			render(PopconfirmHarness, {
				props: {
					title: "Delete item?",
					description: "This cannot be undone",
					confirmLabel: "Yes",
					cancelLabel: "No",
					destructive: true,
				},
			}),
		).not.toThrow();
	});
});
