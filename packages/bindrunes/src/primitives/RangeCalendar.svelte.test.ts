import { render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";

vi.mock("bits-ui", async (importOriginal) => {
	const actual = await importOriginal<typeof import("bits-ui")>();
	return {
		...actual,
		RangeCalendar: {
			Root:
				actual.RangeCalendar?.Root ??
				(({ children }: { children?: (...args: any[]) => any }) => children?.()),
			Header: ({ children }: { children?: (...args: any[]) => any }) => children?.(),
			Grid: ({ children }: { children?: (...args: any[]) => any }) => children?.(),
			GridHead: ({ children }: { children?: (...args: any[]) => any }) => children?.(),
			GridRow: ({ children }: { children?: (...args: any[]) => any }) => children?.(),
			HeadCell: ({ children }: { children?: (...args: any[]) => any }) => children?.(),
			GridBody: ({ children }: { children?: (...args: any[]) => any }) => children?.(),
			Cell: ({ children }: { children?: (...args: any[]) => any }) => children?.(),
			Day: () => "",
		},
	};
});

const RangeCalendar = (await import("./RangeCalendar.svelte")).default;

describe("RangeCalendar", () => {
	it("renders the root element", () => {
		const { container } = render(RangeCalendar);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders without crashing", () => {
		const { container } = render(RangeCalendar);
		expect(container.firstElementChild).toBeTruthy();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(RangeCalendar);
		await expectNoAxeViolations(container);
	});
});
