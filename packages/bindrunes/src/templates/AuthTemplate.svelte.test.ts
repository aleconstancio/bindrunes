import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AuthTemplate from "./AuthTemplate.svelte";

describe("AuthTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(AuthTemplate);
		expect(container).toBeTruthy();
	});

	it("renders login view by default", () => {
		render(AuthTemplate);
		expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
	});

	it("renders register view", () => {
		render(AuthTemplate, { props: { view: "register" } });
		expect(screen.getByRole("heading", { name: "Create an account" })).toBeInTheDocument();
	});

	it("renders forgot password view", () => {
		render(AuthTemplate, { props: { view: "forgot-password" } });
		expect(screen.getByRole("heading", { name: "Forgot password" })).toBeInTheDocument();
	});

	it("renders reset password view", () => {
		render(AuthTemplate, { props: { view: "reset-password" } });
		expect(screen.getByRole("heading", { name: "Reset password" })).toBeInTheDocument();
	});

	it("renders verify email view", () => {
		render(AuthTemplate, { props: { view: "verify-email", verifyEmail: "alice@test.com" } });
		expect(screen.getByText("alice@test.com")).toBeInTheDocument();
	});

	it("renders two-factor view", () => {
		render(AuthTemplate, { props: { view: "two-factor" } });
		expect(screen.getByText("Two-factor authentication")).toBeInTheDocument();
	});

	it("renders brand title in AuthLayout", () => {
		render(AuthTemplate, { props: { brandTitle: "My App" } });
		expect(screen.getAllByText("My App").length).toBeGreaterThan(0);
	});

	it("does not forward class prop (not supported)", () => {
		const { container } = render(AuthTemplate, { props: { class: "auth-tpl" } });
		expect(container.firstElementChild?.className).not.toContain("auth-tpl");
	});
});
