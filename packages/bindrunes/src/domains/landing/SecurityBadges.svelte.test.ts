import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SecurityBadges from "./SecurityBadges.svelte";

const badges = [
	{ label: "SOC 2", icon: "🔒", description: "Certified compliant" },
	{ label: "GDPR", icon: "📋", description: "Privacy ready" },
];

describe("SecurityBadges", () => {
	it("renders without errors", () => {
		const { container } = render(SecurityBadges);
		expect(container).toBeTruthy();
	});

	it("renders title", () => {
		render(SecurityBadges);
		expect(screen.getByText("Trusted & Secure")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(SecurityBadges, { title: "Compliance" });
		expect(screen.getByText("Compliance")).toBeInTheDocument();
	});

	it("renders badge labels", () => {
		render(SecurityBadges, { badges });
		expect(screen.getByText("SOC 2")).toBeInTheDocument();
		expect(screen.getByText("GDPR")).toBeInTheDocument();
	});

	it("renders badge descriptions", () => {
		render(SecurityBadges, { badges });
		expect(screen.getByText("Certified compliant")).toBeInTheDocument();
		expect(screen.getByText("Privacy ready")).toBeInTheDocument();
	});

	it("renders badge icons", () => {
		render(SecurityBadges, { badges });
		expect(screen.getByText("🔒")).toBeInTheDocument();
		expect(screen.getByText("📋")).toBeInTheDocument();
	});

	it("renders empty for no badges", () => {
		const { container } = render(SecurityBadges, { badges: [] });
		expect(container.querySelectorAll("[class*=flex-col]").length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(SecurityBadges, { class: "badge-class" });
		expect(container.firstElementChild?.className).toContain("badge-class");
	});
});
