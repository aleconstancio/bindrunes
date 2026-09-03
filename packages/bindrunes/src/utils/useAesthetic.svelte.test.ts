import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Harness from "../components/__tests__/harness/ComposableHarness.svelte";
import { useAesthetic } from "./useAesthetic";

describe("useAesthetic", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-aesthetic");
	});

	async function mountAesthetic(opts?: { default?: string }) {
		const state: { current: unknown } = { current: null };
		render(Harness, {
			props: { setup: () => useAesthetic(opts as any), state },
		});
		await tick();
		return state.current as ReturnType<typeof useAesthetic>;
	}

	it("defaults to minimal", async () => {
		const a = await mountAesthetic();
		expect(a.aesthetic).toBe("minimal");
	});

	it("sets data-aesthetic attribute on document element", async () => {
		await mountAesthetic();
		expect(document.documentElement.getAttribute("data-aesthetic")).toBe("minimal");
	});

	it("setAesthetic updates value and attribute", async () => {
		const a = await mountAesthetic();
		a.setAesthetic("glass");
		await tick();
		expect(a.aesthetic).toBe("glass");
		expect(document.documentElement.getAttribute("data-aesthetic")).toBe("glass");
	});

	it("persists to localStorage", async () => {
		const a = await mountAesthetic();
		a.setAesthetic("bento");
		await tick();
		expect(localStorage.getItem("urupe-ui_aesthetic")).toBe('"bento"');
	});

	it("restores from localStorage on next creation", async () => {
		localStorage.setItem("urupe-ui_aesthetic", '"expressive"');
		const a = await mountAesthetic();
		expect(a.aesthetic).toBe("expressive");
	});

	it("accepts a custom default via options", async () => {
		const a = await mountAesthetic({ default: "glass" });
		expect(a.aesthetic).toBe("glass");
	});

	it("exposes the full aesthetic list", async () => {
		const a = await mountAesthetic();
		expect(a.aesthetics).toEqual([
			"minimal",
			"glass",
			"bento",
			"expressive",
			"neon",
			"brutalist",
			"organic",
		]);
	});
});
