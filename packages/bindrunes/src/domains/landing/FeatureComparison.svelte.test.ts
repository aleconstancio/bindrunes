import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import FeatureComparison from "./FeatureComparison.svelte";

const plans = [{ name: "Free" }, { name: "Pro", highlight: true }];
const features = [
	{ name: "Storage", plans: { Free: "5GB", Pro: "100GB" } },
	{ name: "Support", plans: { Free: false, Pro: true } },
	{ name: "API", plans: { Free: false, Pro: "yes" } },
];

describe("FeatureComparison", () => {
	it("renders a table", () => {
		const { container } = render(FeatureComparison, { plans, features });
		expect(container.querySelector("table")).not.toBeNull();
	});

	it("renders plan names in headers", () => {
		render(FeatureComparison, { plans, features });
		expect(screen.getByText("Free")).toBeInTheDocument();
		expect(screen.getByText("Pro")).toBeInTheDocument();
	});

	it("renders feature names", () => {
		render(FeatureComparison, { plans, features });
		expect(screen.getByText("Storage")).toBeInTheDocument();
		expect(screen.getByText("Support")).toBeInTheDocument();
		expect(screen.getByText("API")).toBeInTheDocument();
	});

	it("renders string values as text", () => {
		render(FeatureComparison, { plans, features });
		expect(screen.getByText("5GB")).toBeInTheDocument();
		expect(screen.getByText("100GB")).toBeInTheDocument();
	});

	it('renders default "Recurso" header in pt-BR', () => {
		render(FeatureComparison, { plans, features });
		expect(screen.getByText("Recurso")).toBeInTheDocument();
	});

	it("uses custom feature translation", () => {
		const t = (k: string) => (k === "landing.FeatureComparison.feature" ? "Feature" : k);
		render(FeatureComparison, { plans, features, t });
		expect(screen.getByText("Feature")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(FeatureComparison, { plans, features, class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});
});
