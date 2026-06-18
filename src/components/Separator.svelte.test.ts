import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Separator from "./Separator.svelte";

describe("Separator", () => {
	it("renders without crashing", () => {
		const { container } = render(Separator);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("horizontal orientation has border-b class", () => {
		const { container } = render(Separator, { props: { orientation: "horizontal" } });
		expect(container.firstElementChild?.className).toContain("border-b");
	});

	it("vertical orientation has border-l class", () => {
		const { container } = render(Separator, { props: { orientation: "vertical" } });
		expect(container.firstElementChild?.className).toContain("border-l");
	});

	it("custom class is merged", () => {
		const { container } = render(Separator, { props: { class: "my-sep" } });
		expect(container.firstElementChild?.className).toContain("my-sep");
	});

	it("is decorative", () => {
		const { container } = render(Separator);
		expect(container.firstElementChild).toHaveAttribute("role", "none");
	});

	it("a11y: has no violations", async () => {
		const { container } = render(Separator);
		await expectNoAxeViolations(container);
	});
});
