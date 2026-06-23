import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import BillingDashboard from "./BillingDashboard.svelte";

describe("BillingDashboard", () => {
	it("renders without errors", () => {
		const { container } = render(BillingDashboard);
		expect(container).toBeTruthy();
	});

	it("renders with current plan", () => {
		const { container } = render(BillingDashboard, {
			props: {
				currentPlan: {
					name: "Pro",
					price: "$29",
					interval: "month",
					features: ["Unlimited projects", "Priority support"],
				},
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders with usage", () => {
		const { container } = render(BillingDashboard, {
			props: {
				usage: { label: "Storage", current: 75, max: 100, unit: "GB" },
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders with invoices", () => {
		const { container } = render(BillingDashboard, {
			props: {
				invoices: [
					{ id: "1", date: "2024-01-01", amount: "$29", status: "paid" },
					{ id: "2", date: "2024-02-01", amount: "$29", status: "pending" },
				],
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders with all props", () => {
		const { container } = render(BillingDashboard, {
			props: {
				currentPlan: {
					name: "Pro",
					price: "$29",
					interval: "month",
					features: ["Unlimited projects"],
				},
				usage: { label: "Storage", current: 75, max: 100, unit: "GB" },
				invoices: [{ id: "1", date: "2024-01-01", amount: "$29", status: "paid" }],
			},
		});
		expect(container).toBeTruthy();
	});
});
