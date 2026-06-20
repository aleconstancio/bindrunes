import { render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";

vi.mock("bits-ui", async (importOriginal) => {
	const actual = await importOriginal<typeof import("bits-ui")>();
	return {
		...actual,
		RangeCalendar: {
			Root: actual.RangeCalendar?.Root ?? (({ children }: { children?: unknown }) => children?.()),
			Header: ({ children }: { children?: unknown }) => children?.(),
			Grid: ({ children }: { children?: unknown }) => children?.(),
			GridHead: ({ children }: { children?: unknown }) => children?.(),
			GridRow: ({ children }: { children?: unknown }) => children?.(),
			HeadCell: ({ children }: { children?: unknown }) => children?.(),
			GridBody: ({ children }: { children?: unknown }) => children?.(),
			Cell: ({ children }: { children?: unknown }) => children?.(),
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
