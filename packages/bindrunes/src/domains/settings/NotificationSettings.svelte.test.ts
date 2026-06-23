import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import NotificationSettings from "./NotificationSettings.svelte";

const prefs = [
	{
		id: "email-updates",
		label: "Email updates",
		description: "Receive email updates",
		email: true,
		push: false,
		inApp: true,
	},
	{
		id: "marketing",
		label: "Marketing",
		description: "Marketing emails",
		email: false,
		push: true,
		inApp: false,
	},
];

describe("NotificationSettings", () => {
	it("renders without errors", () => {
		const { container } = render(NotificationSettings);
		expect(container).toBeTruthy();
	});

	it("renders heading", () => {
		render(NotificationSettings);
		expect(screen.getByText("Notifications")).toBeInTheDocument();
	});

	it("renders preference labels", () => {
		render(NotificationSettings, { preferences: prefs });
		expect(screen.getByText("Email updates")).toBeInTheDocument();
		expect(screen.getByText("Marketing")).toBeInTheDocument();
	});

	it("renders save button when onSave provided", () => {
		render(NotificationSettings, { onSave: () => {} });
		expect(screen.getByText("Save preferences")).toBeInTheDocument();
	});

	it("does not render save button without onSave", () => {
		render(NotificationSettings);
		expect(screen.queryByText("Save preferences")).not.toBeInTheDocument();
	});
});
