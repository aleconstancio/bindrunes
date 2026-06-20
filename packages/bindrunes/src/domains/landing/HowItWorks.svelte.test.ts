import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import HowItWorks from "./HowItWorks.svelte";
import type { Step } from "./landing-types";

const steps: Step[] = [
	{ icon: "1", title: "Install", description: "npm install" },
	{ icon: "2", title: "Configure", description: "edit config" },
	{ icon: "3", title: "Use", description: "import components" },
];

describe("HowItWorks", () => {
	it("renders grid container", () => {
		const { container } = render(HowItWorks, { steps });
		expect(container.querySelector("div")?.className).toContain("grid");
	});

	it("renders all step titles", () => {
		render(HowItWorks, { steps });
		expect(screen.getByText("Install")).toBeInTheDocument();
		expect(screen.getByText("Configure")).toBeInTheDocument();
		expect(screen.getByText("Use")).toBeInTheDocument();
	});

	it("renders all step descriptions", () => {
		render(HowItWorks, { steps });
		expect(screen.getByText("npm install")).toBeInTheDocument();
		expect(screen.getByText("edit config")).toBeInTheDocument();
		expect(screen.getByText("import components")).toBeInTheDocument();
	});

	it("renders nothing for empty steps", () => {
		const { container } = render(HowItWorks, { steps: [] });
		expect(container.querySelectorAll("h3").length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(HowItWorks, { steps, class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});
});
