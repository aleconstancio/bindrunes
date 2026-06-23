import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SecuritySettings from "./SecuritySettings.svelte";

describe("SecuritySettings", () => {
	it("renders without errors", () => {
		const { container } = render(SecuritySettings);
		expect(container).toBeTruthy();
	});

	it("renders change password heading", () => {
		render(SecuritySettings);
		expect(screen.getByText("Change Password")).toBeInTheDocument();
	});

	it("renders 2FA heading", () => {
		render(SecuritySettings);
		expect(screen.getByText("Two-Factor Authentication")).toBeInTheDocument();
	});

	it("renders enable 2FA button when onEnable2FA provided", () => {
		render(SecuritySettings, { onEnable2FA: () => {} });
		expect(screen.getByText("Enable 2FA")).toBeInTheDocument();
	});

	it("renders manage button when 2FA already enabled", () => {
		render(SecuritySettings, { onEnable2FA: () => {}, twoFactorEnabled: true });
		expect(screen.getByText("Manage")).toBeInTheDocument();
	});

	it("renders update password button", () => {
		render(SecuritySettings);
		expect(screen.getByText("Update password")).toBeInTheDocument();
	});
});
