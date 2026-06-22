import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SocialLogin from "./SocialLogin.svelte";

describe("SocialLogin", () => {
	it("renders without errors", () => {
		const { container } = render(SocialLogin);
		expect(container).toBeTruthy();
	});

	it("renders google and github buttons by default", () => {
		render(SocialLogin);
		expect(screen.getByText("Continue with Google")).toBeInTheDocument();
		expect(screen.getByText("Continue with GitHub")).toBeInTheDocument();
	});

	it("renders apple button when configured", () => {
		render(SocialLogin, { providers: ["google", "github", "apple"] });
		expect(screen.getByText("Continue with Apple")).toBeInTheDocument();
	});

	it("renders divider label", () => {
		render(SocialLogin);
		expect(screen.getByText("or")).toBeInTheDocument();
	});

	it("renders custom divider label", () => {
		render(SocialLogin, { dividerLabel: "or continue with" });
		expect(screen.getByText("or continue with")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(SocialLogin, { class: "social-class" });
		expect(container.firstElementChild?.className).toContain("social-class");
	});
});
