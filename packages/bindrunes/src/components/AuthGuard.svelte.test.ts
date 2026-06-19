import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AuthGuardHarness from "./__tests__/harness/AuthGuardHarness.svelte";

describe("AuthGuard", () => {
	it("renders children when authenticated with no role/perm restrictions", () => {
		render(AuthGuardHarness, {
			props: { isAuthenticated: true, childrenText: "Protected content" },
		});
		expect(screen.getByText("Protected content")).toBeInTheDocument();
	});

	it("does not render children when not authenticated", () => {
		render(AuthGuardHarness, {
			props: { isAuthenticated: false, childrenText: "Protected content" },
		});
		expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
	});

	it("renders children when user has matching role", () => {
		render(AuthGuardHarness, {
			props: {
				isAuthenticated: true,
				roles: ["admin"],
				allowedRoles: ["admin"],
				childrenText: "Admin content",
			},
		});
		expect(screen.getByText("Admin content")).toBeInTheDocument();
	});

	it("does not render children when user lacks required role", () => {
		render(AuthGuardHarness, {
			props: {
				isAuthenticated: true,
				roles: ["superadmin"],
				allowedRoles: ["admin"],
				childrenText: "Admin content",
			},
		});
		expect(screen.queryByText("Admin content")).not.toBeInTheDocument();
	});
});
