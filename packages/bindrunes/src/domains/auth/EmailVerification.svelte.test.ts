import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import EmailVerification from "./EmailVerification.svelte";

describe("EmailVerification", () => {
	it("renders without errors", () => {
		const { container } = render(EmailVerification);
		expect(container).toBeTruthy();
	});

	it("renders heading", () => {
		render(EmailVerification);
		expect(screen.getByText("Check your email")).toBeInTheDocument();
	});

	it("shows email when provided", () => {
		render(EmailVerification, { email: "alice@test.com" });
		expect(screen.getByText("alice@test.com")).toBeInTheDocument();
	});

	it("shows generic message when no email", () => {
		render(EmailVerification);
		expect(screen.getByText(/your email address/)).toBeInTheDocument();
	});

	it("shows resent message", () => {
		render(EmailVerification, { resent: true });
		expect(screen.getByText(/Verification email resent/)).toBeInTheDocument();
	});

	it("renders resend button when handler provided", () => {
		render(EmailVerification, { onResend: () => {} });
		expect(screen.getByText("Resend verification email")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(EmailVerification, { class: "verify-class" });
		expect(container.firstElementChild?.className).toContain("verify-class");
	});
});
