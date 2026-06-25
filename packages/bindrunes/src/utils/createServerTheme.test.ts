import { describe, expect, it } from "vitest";
import { createServerTheme } from "./createServerTheme";

describe("createServerTheme", () => {
	it("resolves theme tokens for a given theme name", () => {
		const theme = createServerTheme("editorial");
		expect(theme.tokens["--primary"]).toBeDefined();
		expect(theme.tokens["--background"]).toBeDefined();
	});

	it("returns CSS string for SSR embedding", () => {
		const theme = createServerTheme("dracula");
		const css = theme.toCSS();
		expect(css).toContain('[data-theme="dracula"]');
		expect(css).toContain("--primary:");
	});

	it("applies density multiplier", () => {
		const compact = createServerTheme("editorial", { density: "compact" });
		const spacious = createServerTheme("editorial", { density: "spacious" });
		expect(compact.tokens["--space-4"]).toBe("0.8rem");
		expect(spacious.tokens["--space-4"]).toBe("1.25rem");
	});

	it("merges custom overrides", () => {
		const theme = createServerTheme("editorial", {
			overrides: { "--primary": "oklch(0.5 0.2 260)" },
		});
		expect(theme.tokens["--primary"]).toBe("oklch(0.5 0.2 260)");
	});

	it("defaults to editorial when unknown theme name", () => {
		const theme = createServerTheme("nonexistent");
		expect(theme.tokens["--primary"]).toBe("oklch(0.65 0.10 265)");
	});
});
