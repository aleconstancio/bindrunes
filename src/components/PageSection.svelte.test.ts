import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import PageSection from "./PageSection.svelte";

describe("PageSection", () => {
	it("renders", () => {
		const { container } = render(PageSection);
		expect(container).toBeTruthy();
	});

	it("passes accessibility checks", async () => {
		const { container } = render(PageSection);
		await expectNoAxeViolations(container);
	});
});
