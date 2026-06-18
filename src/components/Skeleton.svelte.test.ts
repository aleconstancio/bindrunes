import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Skeleton from "./Skeleton.svelte";

describe("Skeleton", () => {
	it("renders without crashing", () => {
		const { container } = render(Skeleton);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders default 3 lines", () => {
		const { container } = render(Skeleton);
		expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(3);
	});

	it("custom line count", () => {
		const { container } = render(Skeleton, { props: { lines: 5 } });
		expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(5);
	});

	it("custom class is merged", () => {
		const { container } = render(Skeleton, { props: { class: "my-skel" } });
		const el = container.querySelector(".animate-shimmer");
		expect(el?.className).toContain("my-skel");
	});

	it("a11y: has no violations", async () => {
		const { container } = render(Skeleton);
		await expectNoAxeViolations(container);
	});
});
