import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardTemplate from "./DashboardTemplate.svelte";

describe("DashboardTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(DashboardTemplate);
		expect(container).toBeTruthy();
	});

	it("renders with app name", () => {
		const { container } = render(DashboardTemplate, { props: { appName: "MyApp" } });
		expect(container.textContent).toContain("MyApp");
	});

	it("renders with title", () => {
		const { container } = render(DashboardTemplate, { props: { title: "Dashboard" } });
		expect(container.textContent).toContain("Dashboard");
	});

	it("applies class prop", () => {
		const { container } = render(DashboardTemplate, { props: { class: "dash-class" } });
		expect(container.firstElementChild?.className).toContain("dash-class");
	});
});
