import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ErrorBanner from "./ErrorBanner.svelte";

describe("ErrorBanner", () => {
	it("renders the root element", () => {
		const { container } = render(ErrorBanner, { props: { error: "Something went wrong" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("displays the error message", () => {
		const { getByText } = render(ErrorBanner, { props: { error: "Something went wrong" } });
		expect(getByText("Something went wrong")).toBeInTheDocument();
	});

	it("has role=alert", () => {
		const { container } = render(ErrorBanner, { props: { error: "Error" } });
		expect(container.firstElementChild).toHaveAttribute("role", "alert");
	});

	it("applies custom class", () => {
		const { container } = render(ErrorBanner, { props: { error: "Error", class: "my-banner" } });
		expect(container.firstElementChild?.className).toContain("my-banner");
	});
});
