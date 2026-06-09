import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import CrudDetailSection from "./CrudDetailSection.svelte";

describe("CrudDetailSection", () => {
	it("renders sections as cards", () => {
		const sections = [
			{ label: "Name", value: "Alice" },
			{ label: "Email", value: "alice@test.com" },
		];
		render(CrudDetailSection, { sections });
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByText("alice@test.com")).toBeInTheDocument();
	});

	it("renders variant badges", () => {
		const sections = [{ label: "Status", value: "Active", variant: "success" as const }];
		render(CrudDetailSection, { sections });
		expect(screen.getByText("Active")).toBeInTheDocument();
	});

	it("renders empty for no sections", () => {
		const { container } = render(CrudDetailSection, { sections: [] });
		expect(container.querySelectorAll("[class*='rounded']").length).toBe(0);
	});

	it("applies class prop", () => {
		const { container } = render(CrudDetailSection, {
			sections: [{ label: "X", value: "Y" }],
			class: "my-detail",
		});
		expect(container.firstElementChild?.className).toContain("my-detail");
	});

	it("renders children when provided", () => {
		render(CrudDetailSection, {
			sections: [{ label: "X", value: "Y" }],
		});
		expect(screen.getByText("X")).toBeInTheDocument();
	});
});
