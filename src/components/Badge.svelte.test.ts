import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Badge from "./Badge.svelte";

describe("Badge", () => {
	it("renders the root element", () => {
		const { container } = render(Badge);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("default variant sets data-variant", () => {
		const { container } = render(Badge);
		expect(container.firstElementChild).toHaveAttribute("data-variant", "default");
	});

	it("primary variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "primary" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "primary");
	});

	it("secondary variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "secondary" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "secondary");
	});

	it("success variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "success" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "success");
	});

	it("warning variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "warning" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "warning");
	});

	it("destructive variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "destructive" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "destructive");
	});

	it("sets data-size attribute", () => {
		const { container } = render(Badge, { props: { size: "lg" } });
		expect(container.firstElementChild).toHaveAttribute("data-size", "lg");
	});
});
