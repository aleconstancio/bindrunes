import { describe, expect, it } from "vitest";
import en from "./en";

describe("i18n/en", () => {
	it("exports a non-empty dictionary", () => {
		expect(typeof en).toBe("object");
		expect(Object.keys(en).length).toBeGreaterThan(0);
	});

	it("has expected common keys", () => {
		expect(en["common.reload"]).toBe("Reload");
		expect(en["common.loading"]).toBe("Loading");
		expect(en["common.save"]).toBe("Save");
		expect(en["common.search"]).toBe("Search");
		expect(en["common.home"]).toBe("Home");
		expect(en["common.logout"]).toBe("Log out");
	});

	it("has expected form keys", () => {
		expect(en["form.Form.submit"]).toBe("Save");
		expect(en["form.Form.success"]).toBe("Saved successfully!");
		expect(en["form.Form.error"]).toBe("Error saving.");
	});

	it("has expected error keys", () => {
		expect(en["error.ErrorBoundary.title"]).toBe("Something went wrong");
		expect(en["error.ErrorBoundary.retry"]).toBe("Reload");
	});

	it("has expected theme keys", () => {
		expect(en["theme.ThemeToggle.light"]).toBe("Light Mode");
		expect(en["theme.ThemeToggle.dark"]).toBe("Dark Mode");
	});

	it("has expected dashboard keys", () => {
		expect(en["dashboard.RuleFootnote.title"]).toBe("Critical Rule");
		expect(en["dashboard.DashboardShell.defaultTitle"]).toBe("Home");
	});

	it("has expected omnibar keys", () => {
		expect(en["omnibar.Omnibar.placeholder"]).toBe("Search commands, routes, memory...");
	});

	it("all values are strings", () => {
		for (const [key, value] of Object.entries(en)) {
			expect(typeof value).toBe("string");
		}
	});
});
