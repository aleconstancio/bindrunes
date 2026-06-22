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

	it("string width applies to all lines", () => {
		const { container } = render(Skeleton, { props: { width: "50%" } });
		const lines = container.querySelectorAll(".animate-shimmer");
		lines.forEach((line) => {
			expect((line as HTMLElement).style.width).toBe("50%");
		});
	});

	it("array width applies per-line widths", () => {
		const { container } = render(Skeleton, {
			props: { width: ["100%", "80%", "60%"], lines: 3 },
		});
		const lines = container.querySelectorAll(".animate-shimmer");
		expect((lines[0] as HTMLElement).style.width).toBe("100%");
		expect((lines[1] as HTMLElement).style.width).toBe("80%");
		expect((lines[2] as HTMLElement).style.width).toBe("60%");
	});

	it("array width with fewer entries falls back", () => {
		const { container } = render(Skeleton, {
			props: { width: ["50%"], lines: 3 },
		});
		const lines = container.querySelectorAll(".animate-shimmer");
		expect((lines[0] as HTMLElement).style.width).toBe("50%");
		expect((lines[2] as HTMLElement).style.width).toBe("50%");
	});

	it("renders 1 line", () => {
		const { container } = render(Skeleton, { props: { lines: 1 } });
		expect(container.querySelectorAll(".animate-shimmer")).toHaveLength(1);
	});
});
