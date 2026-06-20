import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import TimeField from "./TimeField.svelte";

describe("TimeField", () => {
	it("renders the root element", () => {
		const { container } = render(TimeField);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(TimeField);
		await expectNoAxeViolations(container);
	});
});
