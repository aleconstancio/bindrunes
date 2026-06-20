import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Harness from "../components/__tests__/harness/ComposableHarness.svelte";
import { useDensity } from "./useDensity.svelte";

describe("useDensity", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-density");
	});

	async function mountDensity(opts?: { default?: string }) {
		const state: { current: unknown } = { current: null };
		render(Harness, {
			props: { setup: () => useDensity(opts as any), state },
		});
		await tick();
		return state.current as ReturnType<typeof useDensity>;
	}

	it("defaults to comfortable", async () => {
		const d = await mountDensity();
		expect(d.density).toBe("comfortable");
	});

	it("sets data-density attribute on document element", async () => {
		await mountDensity();
		expect(document.documentElement.getAttribute("data-density")).toBe("comfortable");
	});

	it("setDensity updates value and attribute", async () => {
		const d = await mountDensity();
		d.setDensity("compact");
		await tick();
		expect(d.density).toBe("compact");
		expect(document.documentElement.getAttribute("data-density")).toBe("compact");
	});

	it("persists to localStorage", async () => {
		const d = await mountDensity();
		d.setDensity("spacious");
		await tick();
		expect(localStorage.getItem("bindrunes_density")).toBe('"spacious"');
	});

	it("restores from localStorage on next creation", async () => {
		localStorage.setItem("bindrunes_density", '"compact"');
		const d = await mountDensity();
		expect(d.density).toBe("compact");
	});

	it("accepts a custom default via options", async () => {
		const d = await mountDensity({ default: "spacious" });
		expect(d.density).toBe("spacious");
	});

	it("exposes the full density list", async () => {
		const d = await mountDensity();
		expect(d.densities).toEqual(["compact", "comfortable", "spacious"]);
	});
});
