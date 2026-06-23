import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ResetPassword from "./ResetPassword.svelte";

describe("ResetPassword", () => {
	it("renders title", () => {
		render(ResetPassword);
		expect(screen.getByRole("heading", { name: "Reset password" })).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(ResetPassword, { title: "New password" });
		expect(screen.getByRole("heading", { name: "New password" })).toBeInTheDocument();
	});

	it("renders description", () => {
		render(ResetPassword);
		expect(screen.getByText(/Enter your new password/)).toBeInTheDocument();
	});

	it("renders new password input", () => {
		const { container } = render(ResetPassword);
		expect(container.querySelector("input[type=password]")).toBeInTheDocument();
	});

	it("renders confirm password input", () => {
		const { container } = render(ResetPassword);
		expect(container.querySelectorAll("input[type=password]").length).toBe(2);
	});

	it("renders submit button", () => {
		render(ResetPassword);
		expect(screen.getByRole("button", { name: /Reset password/ })).toBeInTheDocument();
	});

	it("calls onSubmit with password", async () => {
		const fn = vi.fn();
		const { container } = render(ResetPassword, { onSubmit: fn });
		const passwords = container.querySelectorAll("input[type=password]");
		await userEvent.type(passwords[0], "newpass123");
		await userEvent.type(passwords[1], "newpass123");
		await userEvent.click(screen.getByRole("button", { name: /Reset password/ }));
		expect(fn).toHaveBeenCalledWith({ password: "newpass123" });
	});

	it("shows validation error for mismatched passwords", async () => {
		const { container } = render(ResetPassword);
		const passwords = container.querySelectorAll("input[type=password]");
		await userEvent.type(passwords[0], "secret123");
		await userEvent.type(passwords[1], "different");
		await userEvent.click(screen.getByRole("button", { name: /Reset password/ }));
		expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
	});

	it("shows validation error for short password", async () => {
		const { container } = render(ResetPassword);
		const passwords = container.querySelectorAll("input[type=password]");
		await userEvent.type(passwords[0], "12345");
		await userEvent.type(passwords[1], "12345");
		await userEvent.click(screen.getByRole("button", { name: /Reset password/ }));
		expect(screen.getByText("Password must be at least 6 characters.")).toBeInTheDocument();
	});

	it("renders back button", () => {
		render(ResetPassword, { onBack: vi.fn() });
		expect(screen.getByText("Back to sign in")).toBeInTheDocument();
	});

	it("does not render back without handler", () => {
		render(ResetPassword);
		expect(screen.queryByText("Back to sign in")).not.toBeInTheDocument();
	});

	it("shows error message", () => {
		render(ResetPassword, { error: "Token expired" });
		expect(screen.getByText("Token expired")).toBeInTheDocument();
	});

	it("renders show/hide password toggles", () => {
		render(ResetPassword);
		const toggles = screen.getAllByLabelText("Show password");
		expect(toggles.length).toBe(2);
	});

	it("applies class prop", () => {
		const { container } = render(ResetPassword, { class: "my-reset" });
		expect(container.firstElementChild?.className).toContain("my-reset");
	});
});
