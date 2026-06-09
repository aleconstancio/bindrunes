import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Badge from "../../src/components/Badge.svelte";

describe("Badge", () => {
	it("renders without crashing", () => {
		const { container } = render(Badge);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("default variant applies bg-muted", () => {
		const { container } = render(Badge);
		expect(container.firstElementChild!.className).toContain("bg-muted");
	});

	it("primary variant applies bg-primary", () => {
		const { container } = render(Badge, { props: { variant: "primary" } });
		expect(container.firstElementChild!.className).toContain("bg-primary");
	});

	it("secondary variant applies bg-secondary", () => {
		const { container } = render(Badge, { props: { variant: "secondary" } });
		expect(container.firstElementChild!.className).toContain("bg-secondary");
	});

	it("success variant applies success-soft classes", () => {
		const { container } = render(Badge, { props: { variant: "success" } });
		expect(container.firstElementChild!.className).toContain("success-soft");
	});

	it("warning variant applies warning-soft classes", () => {
		const { container } = render(Badge, { props: { variant: "warning" } });
		expect(container.firstElementChild!.className).toContain("warning-soft");
	});

	it("destructive variant applies destructive classes", () => {
		const { container } = render(Badge, { props: { variant: "destructive" } });
		expect(container.firstElementChild!.className).toContain("destructive");
	});
});
