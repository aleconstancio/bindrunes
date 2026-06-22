import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ReleaseNotes from "./ReleaseNotes.svelte";

const release = {
	version: "2.1.0",
	date: "2024-06-01",
	added: ["Dark mode", "Export feature"],
	changed: ["Updated UI"],
	fixed: ["Login issue"],
	removed: ["Legacy API"],
};

describe("ReleaseNotes", () => {
	it("renders without errors", () => {
		const { container } = render(ReleaseNotes);
		expect(container).toBeTruthy();
	});

	it("renders version", () => {
		render(ReleaseNotes, { release });
		expect(screen.getByText("v2.1.0")).toBeInTheDocument();
	});

	it("renders date", () => {
		render(ReleaseNotes, { release });
		expect(screen.getByText("2024-06-01")).toBeInTheDocument();
	});

	it("renders section badges", () => {
		render(ReleaseNotes, { release });
		expect(screen.getByText("Added")).toBeInTheDocument();
		expect(screen.getByText("Changed")).toBeInTheDocument();
		expect(screen.getByText("Fixed")).toBeInTheDocument();
		expect(screen.getByText("Removed")).toBeInTheDocument();
	});

	it("renders item descriptions", () => {
		render(ReleaseNotes, { release });
		expect(screen.getByText("Dark mode")).toBeInTheDocument();
		expect(screen.getByText("Export feature")).toBeInTheDocument();
		expect(screen.getByText("Updated UI")).toBeInTheDocument();
		expect(screen.getByText("Login issue")).toBeInTheDocument();
		expect(screen.getByText("Legacy API")).toBeInTheDocument();
	});

	it("renders nothing when no release provided", () => {
		const { container } = render(ReleaseNotes);
		expect(container.textContent).toBe("");
	});

	it("applies class prop", () => {
		const { container } = render(ReleaseNotes, { release, class: "notes-class" });
		expect(container.firstElementChild?.className).toContain("notes-class");
	});
});
