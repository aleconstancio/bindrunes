import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CookieConsent from "./CookieConsent.svelte";

describe("CookieConsent", () => {
	it("renders without errors", () => {
		const { container } = render(CookieConsent);
		expect(container).toBeTruthy();
	});

	it("renders default message", () => {
		render(CookieConsent);
		expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
	});

	it("renders custom message", () => {
		render(CookieConsent, { message: "Custom cookie text" });
		expect(screen.getByText("Custom cookie text")).toBeInTheDocument();
	});

	it("renders action buttons", () => {
		render(CookieConsent);
		expect(screen.getByText("Accept all")).toBeInTheDocument();
		expect(screen.getByText("Reject all")).toBeInTheDocument();
	});

	it("renders customize button when handler provided", () => {
		render(CookieConsent, { onCustomize: () => {} });
		expect(screen.getByText("Customize")).toBeInTheDocument();
	});

	it("does not render customize button without handler", () => {
		render(CookieConsent);
		expect(screen.queryByText("Customize")).not.toBeInTheDocument();
	});

	it("does not render when visible is false", () => {
		render(CookieConsent, { visible: false });
		expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(CookieConsent, { class: "cookie-class" });
		expect(container.firstElementChild?.className).toContain("cookie-class");
	});
});
