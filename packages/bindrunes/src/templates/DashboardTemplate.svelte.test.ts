import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardTemplate from "./DashboardTemplate.svelte";

describe("DashboardTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(DashboardTemplate);
		expect(container).toBeTruthy();
	});
});
