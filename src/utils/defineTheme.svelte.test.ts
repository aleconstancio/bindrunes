import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Harness from "../ComposableHarness.svelte";
import { defineTheme } from "./defineTheme.svelte";

describe("defineTheme", () => {
	beforeEach(() => {
		document.head.querySelectorAll("style[data-bindrunes-theme]").forEach((el) => el.remove());
	});

	async function mountTheme(options: Record<string, unknown> = {}) {
		const state: { current: unknown } = { current: null };
		const applyImmediately = options.applyImmediately !== false;
		render(Harness, {
			props: {
				setup: () => {
					const t = defineTheme(
						(options.name as string) ?? "test-theme",
						(options.tokens as Record<string, string>) ?? {
							"--primary": "oklch(0.50 0.15 250)",
						},
					);
					if (applyImmediately) t.apply();
					return t;
				},
				state,
			},
		});
		await tick();
		return state.current as ReturnType<typeof defineTheme>;
	}

	it("creates a style element with data-bindrunes-theme attribute", async () => {
		await mountTheme({ name: "corporate" });
		const style = document.head.querySelector('style[data-bindrunes-theme="corporate"]');
		expect(style).toBeInTheDocument();
	});

	it("populates the CSS content with the given tokens", async () => {
		await mountTheme({
			name: "test-theme",
			tokens: {
				"--primary": "oklch(0.50 0.15 250)",
				"--background": "oklch(0.15 0.01 250)",
			},
		});
		const style = document.head.querySelector('style[data-bindrunes-theme="test-theme"]');
		expect(style?.textContent).toContain("--primary: oklch(0.50 0.15 250)");
		expect(style?.textContent).toContain("--background: oklch(0.15 0.01 250)");
	});

	it("remove() removes the style element", async () => {
		const t = await mountTheme({ name: "temp" });
		expect(document.head.querySelector('style[data-bindrunes-theme="temp"]')).toBeInTheDocument();
		t.remove();
		expect(
			document.head.querySelector('style[data-bindrunes-theme="temp"]'),
		).not.toBeInTheDocument();
	});

	it("scopes tokens to the data-theme selector", async () => {
		await mountTheme({
			name: "scoped",
			tokens: { "--primary": "oklch(0.5 0.1 0)" },
		});
		const style = document.head.querySelector('style[data-bindrunes-theme="scoped"]');
		expect(style?.textContent).toMatch(/\[data-theme="scoped"\]/);
	});

	it("survives server-side (no window)", async () => {
		const originalWindow = global.window;
		const state: { current: unknown } = { current: null };
		(global as any).window = undefined;
		try {
			const ssr = defineTheme("ssr", { "--primary": "oklch(0.5 0.1 0)" });
			ssr.apply();
			ssr.remove();
		} finally {
			(global as any).window = originalWindow;
		}
	});
});
