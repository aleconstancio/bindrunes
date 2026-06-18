import { render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, expect, it } from "vitest";
import PricingHarness from "../__tests__/harness/landing/PricingHarness.svelte";
import type { Plan } from "./landing-types";

const plans: Plan[] = [
	{
		name: "Free",
		monthly: 0,
		annual: 0,
		features: ["1 user"],
		cta: { label: "Start", href: "/free" },
	},
	{
		name: "Pro",
		monthly: 50,
		annual: 500,
		features: ["Unlimited", "Support"],
		cta: { label: "Buy", href: "/pro" },
		highlight: true,
	},
];

describe("PricingTable", () => {
	it("renders plans", async () => {
		render(PricingHarness, { plans });
		await tick();
		expect(screen.getByText("Free")).toBeInTheDocument();
		expect(screen.getByText("Pro")).toBeInTheDocument();
	});

	it("renders plan features", async () => {
		render(PricingHarness, { plans });
		await tick();
		expect(screen.getByText("1 user")).toBeInTheDocument();
		expect(screen.getByText("Unlimited")).toBeInTheDocument();
		expect(screen.getByText("Support")).toBeInTheDocument();
	});

	it("renders CTA buttons", async () => {
		render(PricingHarness, { plans });
		await tick();
		expect(screen.getByText("Start")).toBeInTheDocument();
		expect(screen.getByText("Buy")).toBeInTheDocument();
	});

	it('renders "Mais escolhido" badge for highlighted plan', async () => {
		render(PricingHarness, { plans });
		await tick();
		expect(screen.getByText("Mais escolhido")).toBeInTheDocument();
	});

	it("renders without toggle when showToggle=false", async () => {
		render(PricingHarness, { plans, showToggle: false });
		await tick();
		expect(screen.queryByText("Mensal")).not.toBeInTheDocument();
	});
});
