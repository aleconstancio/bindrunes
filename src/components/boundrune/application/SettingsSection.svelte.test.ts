import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import SettingsSection from "./SettingsSection.svelte";

describe("SettingsSection", () => {
	it("renders title", () => {
		render(SettingsSection, { title: "General" });
		expect(screen.getByText("General")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(SettingsSection, { title: "General", description: "Basic settings" });
		expect(screen.getByText("Basic settings")).toBeInTheDocument();
	});

	it("renders without description", () => {
		render(SettingsSection, { title: "General" });
		expect(screen.getByText("General")).toBeInTheDocument();
		expect(screen.queryByText("Basic settings")).not.toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(SettingsSection, { title: "X", class: "my-settings" });
		expect(container.firstElementChild?.className).toContain("my-settings");
	});

	it("renders in a card", () => {
		const { container } = render(SettingsSection, { title: "X" });
		expect(container.querySelector("[class*='border-border']")).not.toBeNull();
	});
});
