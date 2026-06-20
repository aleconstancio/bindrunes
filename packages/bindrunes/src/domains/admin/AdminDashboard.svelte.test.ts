import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AdminDashboard from "./AdminDashboard.svelte";

describe("AdminDashboard", () => {
	it("renders user management table", () => {
		const users = [
			{ id: "1", name: "Alice", email: "alice@example.com", role: "admin" },
			{ id: "2", name: "Bob", email: "bob@example.com", role: "user" },
		];
		render(AdminDashboard, { props: { users } });
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
	});

	it("renders system settings", () => {
		const settings = { maintenanceMode: false, allowSignUp: true };
		render(AdminDashboard, { props: { settings } });
		expect(screen.getByText("System Settings")).toBeInTheDocument();
	});

	it("renders the heading Admin Dashboard", () => {
		render(AdminDashboard);
		expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
	});

	it("renders settings toggles with correct labels", () => {
		render(AdminDashboard);
		expect(screen.getByText("Maintenance Mode")).toBeInTheDocument();
		expect(screen.getByText("Allow Sign Up")).toBeInTheDocument();
	});

	it("renders activity logs when provided", () => {
		const activityLogs = [
			{ id: "1", action: "login", user: "Alice", timestamp: "2024-01-01" },
			{ id: "2", action: "logout", user: "Bob", timestamp: "2024-01-02" },
		];
		render(AdminDashboard, { props: { activityLogs } });
		expect(screen.getByText("Activity Logs")).toBeInTheDocument();
		expect(screen.getByText("login")).toBeInTheDocument();
		expect(screen.getByText("logout")).toBeInTheDocument();
	});

	it("applies the class prop", () => {
		render(AdminDashboard, { props: { class: "custom-class" } });
		const container = screen.getByText("Admin Dashboard").closest("div");
		expect(container?.className).toContain("custom-class");
	});
});
