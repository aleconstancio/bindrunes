import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import MetaScrollable from "./MetaScrollable.svelte";

describe("MetaScrollable", () => {
	it("renders the root element", () => {
		const { container } = render(MetaScrollable);
		const el = container.firstElementChild;
		expect(el).toBeInTheDocument();
	});

	it("has overflow styling on root", () => {
		const { container } = render(MetaScrollable);
		const el = container.firstElementChild;
		expect(el).toHaveClass("overflow-y-auto");
	});

	it("applies custom class", () => {
		const { container } = render(MetaScrollable, { class: "h-96" });
		const el = container.firstElementChild;
		expect(el).toHaveClass("h-96");
	});

	it("has no a11y violations", async () => {
		const { container } = render(MetaScrollable);
		const results = await axe(container);
		expect(results.violations).toHaveLength(0);
	});
});
