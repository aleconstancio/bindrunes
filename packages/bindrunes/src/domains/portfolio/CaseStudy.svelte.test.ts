import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CaseStudy from "./CaseStudy.svelte";

describe("CaseStudy", () => {
	it("renders without errors", () => {
		const { container } = render(CaseStudy);
		expect(container).toBeTruthy();
	});

	it("renders title", () => {
		render(CaseStudy, { title: "My Project" });
		expect(screen.getByText("My Project")).toBeInTheDocument();
	});

	it("renders subtitle", () => {
		render(CaseStudy, { subtitle: "A case study" });
		expect(screen.getByText("A case study")).toBeInTheDocument();
	});

	it("renders client", () => {
		render(CaseStudy, { client: "Acme Corp" });
		expect(screen.getByText("Acme Corp")).toBeInTheDocument();
	});

	it("renders results", () => {
		const results = [
			{ label: "Revenue", value: "+50%" },
			{ label: "Users", value: "10K" },
		];
		render(CaseStudy, { results });
		expect(screen.getByText("+50%")).toBeInTheDocument();
		expect(screen.getByText("10K")).toBeInTheDocument();
	});

	it("renders cover image", () => {
		const { container } = render(CaseStudy, { coverImage: "cover.jpg", title: "Test" });
		const img = container.querySelector("img");
		expect(img).toBeTruthy();
	});
});
