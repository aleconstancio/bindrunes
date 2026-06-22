import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TwoFactorAuth from "./TwoFactorAuth.svelte";

describe("TwoFactorAuth", () => {
	it("renders without errors", () => {
		const { container } = render(TwoFactorAuth);
		expect(container).toBeTruthy();
	});

	it("renders heading", () => {
		render(TwoFactorAuth);
		expect(screen.getByText("Two-factor authentication")).toBeInTheDocument();
	});

	it("renders instruction text", () => {
		render(TwoFactorAuth);
		expect(screen.getByText(/Enter the 6-digit code/)).toBeInTheDocument();
	});

	it("renders verify button", () => {
		render(TwoFactorAuth);
		expect(screen.getByText("Verify")).toBeInTheDocument();
	});

	it("renders error message", () => {
		render(TwoFactorAuth, { error: "Invalid code" });
		expect(screen.getByText("Invalid code")).toBeInTheDocument();
	});

	it("renders backup code link when handler provided", () => {
		render(TwoFactorAuth, { onUseBackup: () => {} });
		expect(screen.getByText("Use a backup code")).toBeInTheDocument();
	});

	it("does not render backup code link without handler", () => {
		render(TwoFactorAuth);
		expect(screen.queryByText("Use a backup code")).not.toBeInTheDocument();
	});
});
