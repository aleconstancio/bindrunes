import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Tabs from "./Tabs.svelte";

describe("Tabs", () => {
	it("renders without crashing", () => {
		const { container } = render(Tabs);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("custom class is merged", () => {
		const { container } = render(Tabs, { props: { class: "my-tabs" } });
		expect(container.firstElementChild?.className).toContain("my-tabs");
	});

	it("a11y: has no violations", async () => {
		const { container } = render(Tabs);
		await expectNoAxeViolations(container);
	});
});
