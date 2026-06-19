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
});
