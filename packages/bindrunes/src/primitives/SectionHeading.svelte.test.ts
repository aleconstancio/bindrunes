import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import SectionHeading from "./SectionHeading.svelte";

describe("SectionHeading", () => {
	it("renders title", () => {
		render(SectionHeading, { props: { title: "My Section" } });
		expect(screen.getByText("My Section")).toBeInTheDocument();
	});

	it("renders eyebrow when provided", () => {
		render(SectionHeading, { props: { title: "Title", eyebrow: "Label" } });
		expect(screen.getByText("Label")).toBeInTheDocument();
	});

	it("does not render eyebrow when omitted", () => {
		render(SectionHeading, { props: { title: "Title" } });
		expect(screen.queryByText("Label")).not.toBeInTheDocument();
	});

	it("renders description when provided", () => {
		render(SectionHeading, { props: { title: "Title", description: "A description" } });
		expect(screen.getByText("A description")).toBeInTheDocument();
	});

	it("does not render description when omitted", () => {
		render(SectionHeading, { props: { title: "Title" } });
		expect(screen.queryByText("A description")).not.toBeInTheDocument();
	});

	it("center align adds text-center class", () => {
		const { container } = render(SectionHeading, {
			props: { title: "Title", align: "center" },
		});
		expect(container.firstElementChild?.className).toContain("text-center");
	});

	it("left align does not add text-center class", () => {
		const { container } = render(SectionHeading, {
			props: { title: "Title", align: "left" },
		});
		expect(container.firstElementChild?.className).not.toContain("text-center");
	});

	it("passes accessibility checks", async () => {
		const { container } = render(SectionHeading, {
			props: { title: "Accessible Title", description: "Description" },
		});
		await expectNoAxeViolations(container);
	});
});
