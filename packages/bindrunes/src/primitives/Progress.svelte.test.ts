import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Progress from "./Progress.svelte";

describe("Progress", () => {
	it("renders without crashing", () => {
		const { container } = render(Progress);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with a given value", () => {
		const { container } = render(Progress, { value: 50 });
		const root = container.querySelector('[role="progressbar"]');
		expect(root).toBeInTheDocument();
		expect(root?.getAttribute("aria-valuenow")).toBe("50");
	});

	it("default value 0", () => {
		const { container } = render(Progress);
		const root = container.querySelector('[role="progressbar"]');
		expect(root?.getAttribute("aria-valuenow")).toBe("0");
	});

	it("default max 100", () => {
		const { container } = render(Progress);
		const root = container.querySelector('[role="progressbar"]');
		expect(root?.getAttribute("aria-valuemax")).toBe("100");
	});

	it("custom max", () => {
		const { container } = render(Progress, { value: 50, max: 200 });
		const root = container.querySelector('[role="progressbar"]');
		expect(root?.getAttribute("aria-valuemax")).toBe("200");
	});

	it("value 0", () => {
		const { container } = render(Progress, { value: 0 });
		const root = container.querySelector('[role="progressbar"]');
		expect(root?.getAttribute("aria-valuenow")).toBe("0");
	});

	it("value 100", () => {
		const { container } = render(Progress, { value: 100 });
		const root = container.querySelector('[role="progressbar"]');
		expect(root?.getAttribute("aria-valuenow")).toBe("100");
	});

	it("default variant renders", () => {
		const { container } = render(Progress, { variant: "default" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("success variant renders", () => {
		const { container } = render(Progress, { value: 50, variant: "success" });
		expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
	});

	it("warning variant renders", () => {
		const { container } = render(Progress, { value: 50, variant: "warning" });
		expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
	});

	it("destructive variant renders", () => {
		const { container } = render(Progress, { value: 50, variant: "destructive" });
		expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
	});

	it("size sm applies small height", () => {
		const { container } = render(Progress, { size: "sm" });
		const root = container.querySelector('[role="progressbar"]')!;
		expect(root.className).toContain("h-1");
	});

	it("size md (default) applies medium height", () => {
		const { container } = render(Progress);
		const root = container.querySelector('[role="progressbar"]')!;
		expect(root.className).toContain("h-2");
	});

	it("size lg applies large height", () => {
		const { container } = render(Progress, { size: "lg" });
		const root = container.querySelector('[role="progressbar"]')!;
		expect(root.className).toContain("h-3");
	});
});
