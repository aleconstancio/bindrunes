import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import CodeSnippet from "./CodeSnippet.svelte";

describe("CodeSnippet", () => {
	it("renders code content", () => {
		const { getByText } = render(CodeSnippet, {
			props: { code: "const x = 1;" },
		});
		expect(getByText("const x = 1;")).toBeTruthy();
	});

	it("renders title when provided", () => {
		const { getByText } = render(CodeSnippet, {
			props: { code: "test", title: "Example.svelte" },
		});
		expect(getByText("Example.svelte")).toBeTruthy();
	});

	it("has a copy button", () => {
		const { getByRole } = render(CodeSnippet, {
			props: { code: "test" },
		});
		expect(getByRole("button", { name: /copy/i })).toBeTruthy();
	});

	it("passes accessibility checks", async () => {
		const { container } = render(CodeSnippet, {
			props: { code: "const x = 1;" },
		});
		await expectNoAxeViolations(container);
	});
});
