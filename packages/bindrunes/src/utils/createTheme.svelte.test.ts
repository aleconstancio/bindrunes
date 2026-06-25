import { describe, expect, it } from "vitest";
import { createTheme } from "./createTheme.svelte";

describe("createTheme", () => {
	it("creates a theme from tokens (define mode)", () => {
		const theme = createTheme({
			name: "my-brand",
			tokens: {
				"--primary": "oklch(0.55 0.18 260)",
				"--background": "oklch(0.12 0.008 260)",
			},
		});

		expect(theme.tokens["--primary"]).toBe("oklch(0.55 0.18 260)");
		expect(theme.tokens["--background"]).toBe("oklch(0.12 0.008 260)");
		expect(typeof theme.toCSS).toBe("function");
		expect(typeof theme.apply).toBe("function");
	});

	it("creates a theme by extending a base (extend mode)", () => {
		const theme = createTheme({
			base: "dracula",
			tokens: {
				"--primary": "oklch(0.8 0.25 320)",
			},
		});

		expect(theme.tokens["--primary"]).toBe("oklch(0.8 0.25 320)");
		expect(theme.tokens["--background"]).toBe("oklch(0.05 0.01 290)");
	});

	it("generates valid CSS", () => {
		const theme = createTheme({
			name: "test",
			tokens: { "--primary": "oklch(0.5 0.1 260)" },
		});

		const css = theme.toCSS("[data-theme='test']");
		expect(css).toContain("[data-theme='test'] {");
		expect(css).toContain("--primary: oklch(0.5 0.1 260);");
		expect(css).toContain("}");
	});

	it("derives accent from primary when not provided", () => {
		const theme = createTheme({
			name: "test",
			tokens: {
				"--primary": "oklch(0.65 0.10 265)",
			},
		});

		expect(theme.tokens["--accent"]).toBeDefined();
		expect(theme.tokens["--accent"]).not.toBe(theme.tokens["--primary"]);
	});
});
