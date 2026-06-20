import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import RuleFootnote from "./RuleFootnote.svelte";

describe("RuleFootnote", () => {
	it("renders with default title", () => {
		const { getByText } = render(RuleFootnote);
		expect(getByText("Regra Crítica")).toBeTruthy();
	});

	it("renders custom title", () => {
		const { getByText } = render(RuleFootnote, {
			props: { title: "Custom Rule" },
		});
		expect(getByText("Custom Rule")).toBeTruthy();
	});

	it("renders description when provided", () => {
		const { getByText } = render(RuleFootnote, {
			props: { description: "Some description" },
		});
		expect(getByText("Some description")).toBeTruthy();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(RuleFootnote);
		await expectNoAxeViolations(container);
	});
});
