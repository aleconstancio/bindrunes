import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Alert from "./Alert.svelte";

describe("Alert", () => {
	it("renders title and description", () => {
		render(Alert, { props: { title: "Warning!", description: "Something went wrong" } });
		expect(screen.getByText("Warning!")).toBeInTheDocument();
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});

	it("info variant sets data-variant", () => {
		const { container } = render(Alert, { props: { title: "Info", variant: "info" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "info");
	});

	it("warning variant sets data-variant", () => {
		const { container } = render(Alert, { props: { title: "Warning", variant: "warning" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "warning");
	});

	it("destructive variant sets data-variant", () => {
		const { container } = render(Alert, { props: { title: "Error", variant: "destructive" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "destructive");
	});

	it("success variant sets data-variant", () => {
		const { container } = render(Alert, { props: { title: "OK", variant: "success" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "success");
	});

	it("closable renders dismiss button", () => {
		render(Alert, { props: { title: "Close me", closable: true } });
		expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
	});
});
