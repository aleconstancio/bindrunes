import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import UserManagement from "./UserManagement.svelte";

describe("UserManagement", () => {
	it("renders without errors", () => {
		const { container } = render(UserManagement);
		expect(container).toBeTruthy();
	});

	it("renders with users", () => {
		const { container } = render(UserManagement, {
			props: {
				users: [
					{
						id: "1",
						name: "Alice",
						email: "alice@example.com",
						role: "admin",
						status: "active",
					},
				],
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders with custom title", () => {
		const { container } = render(UserManagement, {
			props: { title: "Team Members" },
		});
		expect(container).toBeTruthy();
	});

	it("renders loading state", () => {
		const { container } = render(UserManagement, {
			props: { loading: true },
		});
		expect(container).toBeTruthy();
	});

	it("renders empty state", () => {
		const { container } = render(UserManagement, {
			props: { users: [] },
		});
		expect(container).toBeTruthy();
	});
});
