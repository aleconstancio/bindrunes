import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ForgotPassword from "./ForgotPassword.svelte";

describe("ForgotPassword", () => {
	it("renders title", () => {
		render(ForgotPassword);
		expect(screen.getByText("Forgot password")).toBeInTheDocument();
	});

	it("renders custom title", () => {
		render(ForgotPassword, { title: "Reset needed" });
		expect(screen.getByText("Reset needed")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(ForgotPassword);
		expect(screen.getByText(/Enter your email/)).toBeInTheDocument();
	});

	it("renders email input", () => {
		const { container } = render(ForgotPassword);
		expect(container.querySelector("input[type=email]")).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(ForgotPassword);
		expect(screen.getByRole("button", { name: /Send reset link/ })).toBeInTheDocument();
	});

	it("calls onSubmit with email", async () => {
		const fn = vi.fn();
		const { container } = render(ForgotPassword, { onSubmit: fn });
		await userEvent.type(container.querySelector("input[type=email]")!, "alice@test.com");
		await userEvent.click(screen.getByRole("button", { name: /Send reset link/ }));
		expect(fn).toHaveBeenCalledWith("alice@test.com");
	});

	it("renders back button", () => {
		render(ForgotPassword, { onBack: vi.fn() });
		expect(screen.getByText("Back to sign in")).toBeInTheDocument();
	});

	it("does not render back without handler", () => {
		render(ForgotPassword);
		expect(screen.queryByText("Back to sign in")).not.toBeInTheDocument();
	});

	it("shows sent confirmation", () => {
		render(ForgotPassword, { sent: true });
		expect(screen.getByText(/If an account with that email exists/)).toBeInTheDocument();
	});

	it("hides form when sent", () => {
		const { container } = render(ForgotPassword, { sent: true });
		expect(container.querySelector("input[type=email]")).not.toBeInTheDocument();
	});

	it("shows error message", () => {
		render(ForgotPassword, { error: "Something went wrong" });
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(ForgotPassword, { class: "my-forgot" });
		expect(container.firstElementChild?.className).toContain("my-forgot");
	});
});
