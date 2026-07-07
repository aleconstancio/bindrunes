import { waitFor } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useTheme } from "./useTheme.svelte";

describe("useTheme", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-theme");
	});

	it("initializes with default theme (editorial)", async () => {
		const t = await mountComposable(() => useTheme());
		expect(t.theme).toBe("editorial");
	});

	it("exposes all 6 themes", async () => {
		const t = await mountComposable(() => useTheme());
		expect(t.themes.length).toBe(6);
		expect(t.themes).toContain("dracula");
		expect(t.themes).toContain("nord");
	});

	it("respects default option", async () => {
		const t = await mountComposable(() => useTheme({ default: "dracula" }));
		expect(t.theme).toBe("dracula");
	});

	it("setTheme updates current theme", async () => {
		const t = await mountComposable(() => useTheme());
		t.setTheme("nord");
		expect(t.theme).toBe("nord");
	});

	it("setTheme writes to data-theme attribute", async () => {
		const t = await mountComposable(() => useTheme());
		t.setTheme("catppuccin");
		await waitFor(() =>
			expect(document.documentElement.getAttribute("data-theme")).toBe("catppuccin"),
		);
	});

	it("setTheme persists to localStorage", async () => {
		const t = await mountComposable(() => useTheme());
		t.setTheme("github");
		await waitFor(() => expect(localStorage.getItem("bindrunes_theme")).toContain("github"));
	});

	it("reads initial theme from localStorage", async () => {
		localStorage.setItem("bindrunes_theme", JSON.stringify("rose-pine"));
		const t = await mountComposable(() => useTheme());
		expect(t.theme).toBe("rose-pine");
	});
});
