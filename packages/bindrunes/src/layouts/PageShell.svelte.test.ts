import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import PageShell from "./PageShell.svelte";

describe("PageShell", () => {
	it("renders", () => {
		const { container } = render(PageShell);
		expect(container).toBeTruthy();
	});

	it("passes accessibility checks", async () => {
		const { container } = render(PageShell);
		await expectNoAxeViolations(container);
	});
});
