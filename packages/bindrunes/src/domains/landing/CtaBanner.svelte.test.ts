import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CtaBanner from "./CtaBanner.svelte";

describe("CtaBanner", () => {
	it("renders without errors", () => {
		const { container } = render(CtaBanner);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		render(CtaBanner);
		expect(screen.getByText("Ready to get started?")).toBeInTheDocument();
	});

	it("renders default description", () => {
		render(CtaBanner);
		expect(screen.getByText(/Join thousands of teams/)).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(CtaBanner, { title: "Join Us" });
		expect(screen.getByText("Join Us")).toBeInTheDocument();
	});

	it("renders CTA button", () => {
		render(CtaBanner);
		expect(screen.getByText("Get started for free")).toBeInTheDocument();
	});

	it("renders secondary button when provided", () => {
		render(CtaBanner, { secondaryLabel: "Learn more", secondaryHref: "/learn" });
		expect(screen.getByText("Learn more")).toBeInTheDocument();
	});

	it("does not render secondary button without props", () => {
		render(CtaBanner);
		expect(screen.queryByText("Learn more")).not.toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CtaBanner, { class: "cta-class" });
		expect(container.firstElementChild?.className).toContain("cta-class");
	});
});
