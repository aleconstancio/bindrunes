import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import MetaScrollable from "../../src/components/MetaScrollable.svelte";

describe("MetaScrollable", () => {
	it("renders with overflow-y-auto", () => {
		const { container } = render(MetaScrollable);
		const el = container.querySelector(".overflow-y-auto");
		expect(el).toBeTruthy();
	});

	it("renders with thin scrollbar", () => {
		const { container } = render(MetaScrollable);
		const el = container.querySelector('[class*="scrollbar-width"]');
		expect(el).toBeTruthy();
	});

	it("applies custom class", () => {
		const { container } = render(MetaScrollable, { props: { class: "h-96" } });
		const el = container.querySelector(".h-96");
		expect(el).toBeTruthy();
	});

	it("has no a11y violations", async () => {
		const { container } = render(MetaScrollable);
		const results = await axe(container);
		expect(results.violations).toHaveLength(0);
	});
});
