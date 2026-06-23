import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RegisterForm from "./RegisterForm.svelte";

describe("RegisterForm", () => {
	it("renders title", () => {
		render(RegisterForm);
		expect(screen.getByText("Create an account")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(RegisterForm, { title: "Join us" });
		expect(screen.getByText("Join us")).toBeInTheDocument();
	});

	it("renders name input", () => {
		const { container } = render(RegisterForm);
		expect(container.querySelector("input[type=text]")).toBeInTheDocument();
	});

	it("renders email input", () => {
		const { container } = render(RegisterForm);
		expect(container.querySelector("input[type=email]")).toBeInTheDocument();
	});

	it("renders password input", () => {
		const { container } = render(RegisterForm);
		expect(container.querySelector("input[type=password]")).toBeInTheDocument();
	});

	it("renders confirm password input", () => {
		const { container } = render(RegisterForm);
		expect(container.querySelectorAll("input[type=password]").length).toBe(2);
	});

	it("renders submit button", () => {
		render(RegisterForm);
		expect(screen.getByRole("button", { name: /Create account/ })).toBeInTheDocument();
	});

	it("renders login link", () => {
		render(RegisterForm, { onLogin: vi.fn() });
		expect(screen.getByText("Sign in")).toBeInTheDocument();
	});

	it("does not render login without handler", () => {
		render(RegisterForm);
		expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
	});

	it("shows validation error for mismatched passwords", async () => {
		const { container } = render(RegisterForm);
		const passwords = container.querySelectorAll("input[type=password]");
		await userEvent.type(passwords[0], "secret123");
		await userEvent.type(passwords[1], "different");
		await userEvent.click(screen.getByRole("button", { name: /Create account/ }));
		expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
	});

	it("shows validation error for short password", async () => {
		const { container } = render(RegisterForm);
		const passwords = container.querySelectorAll("input[type=password]");
		await userEvent.type(passwords[0], "12345");
		await userEvent.type(passwords[1], "12345");
		await userEvent.click(screen.getByRole("button", { name: /Create account/ }));
		expect(screen.getByText("Password must be at least 6 characters.")).toBeInTheDocument();
	});

	it("calls onSubmit with valid data", async () => {
		const fn = vi.fn();
		const { container } = render(RegisterForm, { onSubmit: fn });
		await userEvent.type(container.querySelector("input[type=text]")!, "Alice");
		await userEvent.type(container.querySelector("input[type=email]")!, "alice@test.com");
		const passwords = container.querySelectorAll("input[type=password]");
		await userEvent.type(passwords[0], "secret123");
		await userEvent.type(passwords[1], "secret123");
		await userEvent.click(screen.getByRole("button", { name: /Create account/ }));
		expect(fn).toHaveBeenCalledWith({
			name: "Alice",
			email: "alice@test.com",
			password: "secret123",
		});
	});

	it("shows error message", () => {
		render(RegisterForm, { error: "Email already taken" });
		expect(screen.getByText("Email already taken")).toBeInTheDocument();
	});

	it("renders show/hide password toggles", () => {
		render(RegisterForm);
		const toggles = screen.getAllByLabelText("Show password");
		expect(toggles.length).toBe(2);
	});

	it("applies class prop", () => {
		const { container } = render(RegisterForm, { class: "my-register" });
		expect(container.firstElementChild?.className).toContain("my-register");
	});

	it("a11y: register form has no violations", async () => {
		const { container } = render(RegisterForm);
		const { expectNoAxeViolations } = await import("../../helpers/axe");
		await expectNoAxeViolations(container);
	});
});
