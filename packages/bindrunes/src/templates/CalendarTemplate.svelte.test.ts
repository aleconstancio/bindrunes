import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CalendarTemplate from "./CalendarTemplate.svelte";

describe("CalendarTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(CalendarTemplate);
		expect(container).toBeTruthy();
	});
});
