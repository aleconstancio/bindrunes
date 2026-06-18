import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Harness from "../components/__tests__/harness/ComposableHarness.svelte";
import { createPrefersTheme } from "./createPrefersTheme.svelte";

describe("createPrefersTheme", () => {
	beforeEach(() => {
		document.documentElement.classList.remove("dark");
	});

	async function mountPrefersTheme() {
		const state: { current: unknown } = { current: null };
		render(Harness, {
			props: { setup: () => createPrefersTheme(), state },
		});
		await tick();
		return state.current as ReturnType<typeof createPrefersTheme>;
	}

	it("adds dark class when prefers-color-scheme: dark", async () => {
		window.matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: query === "(prefers-color-scheme: dark)",
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		}));

		await mountPrefersTheme();
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it("does not add dark class when prefers-color-scheme: light", async () => {
		window.matchMedia = vi.fn().mockImplementation(() => ({
			matches: false,
			media: "",
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		}));

		await mountPrefersTheme();
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});
});
