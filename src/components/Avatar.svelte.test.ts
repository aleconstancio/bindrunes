import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Avatar from "./Avatar.svelte";

describe("Avatar", () => {
	it("renders without crashing", () => {
		const { container } = render(Avatar);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("shows fallback text when no src", () => {
		render(Avatar, { props: { fallback: "AB" } });
		expect(screen.getByText("AB")).toBeInTheDocument();
	});

	it("size sm applies correct classes", () => {
		const { container } = render(Avatar, { props: { size: "sm" } });
		expect(container.firstElementChild?.className).toContain("h-10");
	});

	it("size md applies correct classes", () => {
		const { container } = render(Avatar, { props: { size: "md" } });
		expect(container.firstElementChild?.className).toContain("h-16");
	});

	it("size lg applies correct classes", () => {
		const { container } = render(Avatar, { props: { size: "lg" } });
		expect(container.firstElementChild?.className).toContain("h-24");
	});

	it("custom class is merged", () => {
		const { container } = render(Avatar, { props: { class: "my-avatar" } });
		expect(container.firstElementChild?.className).toContain("my-avatar");
	});

	it("a11y: has no violations", async () => {
		const { container } = render(Avatar, { props: { fallback: "A" } });
		await expectNoAxeViolations(container);
	});
});
