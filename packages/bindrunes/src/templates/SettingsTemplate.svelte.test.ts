import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SettingsTemplate from "./SettingsTemplate.svelte";

describe("SettingsTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(SettingsTemplate);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		render(SettingsTemplate);
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(SettingsTemplate, { props: { title: "Account Settings" } });
		expect(screen.getByText("Account Settings")).toBeInTheDocument();
	});

	it("renders tabs", () => {
		render(SettingsTemplate, {
			props: {
				tabs: [
					{ id: "profile", label: "Profile" },
					{ id: "security", label: "Security" },
				],
			},
		});
		expect(screen.getByText("Profile")).toBeInTheDocument();
		expect(screen.getByText("Security")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(SettingsTemplate, { props: { class: "settings-class" } });
		expect(container.firstElementChild?.className).toContain("settings-class");
	});
});
