import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CalendarTemplate from "./CalendarTemplate.svelte";

describe("CalendarTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(CalendarTemplate);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		const { container } = render(CalendarTemplate);
		expect(container.textContent).toContain("Calendar");
	});

	it("renders custom title", () => {
		const { container } = render(CalendarTemplate, { props: { title: "My Calendar" } });
		expect(container.textContent).toContain("My Calendar");
	});

	it("applies class prop", () => {
		const { container } = render(CalendarTemplate, { props: { class: "cal-class" } });
		expect(container.firstElementChild?.className).toContain("cal-class");
	});
});
