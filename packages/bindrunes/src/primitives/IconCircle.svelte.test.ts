import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import IconCircleWrapper from "./_test/IconCircleWrapper.svelte";

describe("IconCircle", () => {
	it("renders", () => {
		const { container } = render(IconCircleWrapper);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders children content", () => {
		const { container } = render(IconCircleWrapper);
		expect(container.firstElementChild?.textContent).toContain("★");
	});

	it("sm size sets correct dimensions", () => {
		const { container } = render(IconCircleWrapper, { props: { size: "sm" } });
		expect(container.firstElementChild?.className).toContain("h-8");
		expect(container.firstElementChild?.className).toContain("w-8");
	});

	it("md size sets correct dimensions", () => {
		const { container } = render(IconCircleWrapper, { props: { size: "md" } });
		expect(container.firstElementChild?.className).toContain("h-10");
		expect(container.firstElementChild?.className).toContain("w-10");
	});

	it("lg size sets correct dimensions", () => {
		const { container } = render(IconCircleWrapper, { props: { size: "lg" } });
		expect(container.firstElementChild?.className).toContain("h-12");
		expect(container.firstElementChild?.className).toContain("w-12");
	});

	it("primary tone sets correct color", () => {
		const { container } = render(IconCircleWrapper, { props: { tone: "primary" } });
		expect(container.firstElementChild?.className).toContain("bg-primary/10");
		expect(container.firstElementChild?.className).toContain("text-primary");
	});

	it("destructive tone sets correct color", () => {
		const { container } = render(IconCircleWrapper, { props: { tone: "destructive" } });
		expect(container.firstElementChild?.className).toContain("bg-destructive/10");
		expect(container.firstElementChild?.className).toContain("text-destructive");
	});

	it("passes accessibility checks", async () => {
		const { container } = render(IconCircleWrapper);
		await expectNoAxeViolations(container);
	});
});
