import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm.svelte";

describe("LoginForm", () => {
	it("renders title", () => {
		render(LoginForm);
		expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(LoginForm, { title: "Welcome back" });
		expect(screen.getByText("Welcome back")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(LoginForm);
		expect(screen.getByText(/Enter your credentials/)).toBeInTheDocument();
	});

	it("renders email input", () => {
		const { container } = render(LoginForm);
		expect(container.querySelector("input[type=email]")).toBeInTheDocument();
	});

	it("renders password input", () => {
		const { container } = render(LoginForm);
		expect(container.querySelector("input[type=password]")).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(LoginForm);
		expect(screen.getByRole("button", { name: /Sign in/ })).toBeInTheDocument();
	});

	it("renders forgot password link", () => {
		render(LoginForm, { onForgotPassword: vi.fn() });
		expect(screen.getByText("Forgot password?")).toBeInTheDocument();
	});

	it("does not render forgot password without handler", () => {
		render(LoginForm);
		expect(screen.queryByText("Forgot password?")).not.toBeInTheDocument();
	});

	it("renders register link", () => {
		render(LoginForm, { onRegister: vi.fn() });
		expect(screen.getByText("Create an account")).toBeInTheDocument();
	});

	it("does not render register without handler", () => {
		render(LoginForm);
		expect(screen.queryByText("Create an account")).not.toBeInTheDocument();
	});

	it("calls onSubmit with form data", async () => {
		const fn = vi.fn();
		const { container } = render(LoginForm, { onSubmit: fn });
		const email = container.querySelector("input[type=email]")!;
		const password = container.querySelector("input[type=password]")!;
		await userEvent.type(email, "alice@test.com");
		await userEvent.type(password, "secret123");
		await userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
		expect(fn).toHaveBeenCalledWith({ email: "alice@test.com", password: "secret123" });
	});

	it("shows error message", () => {
		render(LoginForm, { error: "Invalid credentials" });
		expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
	});

	it("renders show/hide password toggle", () => {
		render(LoginForm);
		expect(screen.getByLabelText("Show password")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(LoginForm, { class: "my-login" });
		expect(container.firstElementChild?.className).toContain("my-login");
	});

	it("a11y: login form has no violations", async () => {
		const { container } = render(LoginForm);
		const { expectNoAxeViolations } = await import("../../../helpers/axe");
		await expectNoAxeViolations(container);
	});
});
