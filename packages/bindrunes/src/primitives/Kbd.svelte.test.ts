import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../helpers/axe";
import KbdHarness from "../components/__tests__/harness/KbdHarness.svelte";

describe("Kbd", () => {
	it("renders without crashing", () => {
		const { container } = render(KbdHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders a kbd element", () => {
		const { container } = render(KbdHarness);
		expect(container.querySelector("kbd")).toBeInTheDocument();
	});

	it("renders children content", () => {
		render(KbdHarness, { props: { text: "Ctrl" } });
		expect(screen.getByText("Ctrl")).toBeInTheDocument();
	});

	it("custom class is merged", () => {
		const { container } = render(KbdHarness, { props: { className: "my-kbd" } });
		expect(container.querySelector("kbd")?.className).toContain("my-kbd");
	});

	it("a11y: has no violations", async () => {
		const { container } = render(KbdHarness, { props: { text: "K" } });
		await expectNoAxeViolations(container);
	});
});
