import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DashboardHome from "./DashboardHome.svelte";

describe("DashboardHome", () => {
	it("renders without errors", () => {
		const { container } = render(DashboardHome);
		expect(container).toBeTruthy();
	});

	it("renders with stats", () => {
		const { container } = render(DashboardHome, {
			props: {
				stats: [
					{ label: "Users", value: "1,234" },
					{ label: "Revenue", value: "$5,678", variant: "success" },
				],
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders with custom title", () => {
		const { container } = render(DashboardHome, {
			props: { title: "My Dashboard" },
		});
		expect(container).toBeTruthy();
	});

	it("renders with empty stats", () => {
		const { container } = render(DashboardHome, {
			props: { stats: [] },
		});
		expect(container).toBeTruthy();
	});
});
