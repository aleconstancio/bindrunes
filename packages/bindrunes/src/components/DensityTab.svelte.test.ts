import { fireEvent, render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it } from "vitest";
import { useDensity } from "../utils/useDensity.svelte";
import ComposableHarness from "./__tests__/harness/ComposableHarness.svelte";
import DensityTab from "./DensityTab.svelte";

describe("DensityTab", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	async function mountDensity() {
		const state: { current: unknown } = { current: null };
		render(ComposableHarness, {
			props: {
				setup: () => ({
					density: useDensity(),
					render: DensityTab,
				}),
				state,
			},
		});
		await tick();
		return state.current as {
			density: ReturnType<typeof useDensity>;
			render: typeof DensityTab;
		};
	}

	it("renders the content density label", async () => {
		const d = await mountDensity();
		render(d.render, { density: d.density });
		expect(screen.getByText("Content density")).toBeInTheDocument();
	});

	it("renders all density options", async () => {
		const d = await mountDensity();
		render(d.render, { density: d.density });
		expect(screen.getByText("compact")).toBeInTheDocument();
		expect(screen.getByText("comfortable")).toBeInTheDocument();
		expect(screen.getByText("spacious")).toBeInTheDocument();
	});

	it("shows description for compact", async () => {
		const d = await mountDensity();
		render(d.render, { density: d.density });
		expect(screen.getByText(/Tighter spacing/)).toBeInTheDocument();
	});

	it("shows description for comfortable", async () => {
		const d = await mountDensity();
		render(d.render, { density: d.density });
		expect(screen.getByText(/Balanced spacing/)).toBeInTheDocument();
	});

	it("shows description for spacious", async () => {
		const d = await mountDensity();
		render(d.render, { density: d.density });
		expect(screen.getByText(/Generous spacing/)).toBeInTheDocument();
	});

	it("clicking a density calls setDensity", async () => {
		const d = await mountDensity();
		render(d.render, { density: d.density });
		await fireEvent.click(screen.getByText("compact"));
		await tick();
		expect(d.density.density).toBe("compact");
	});

	it("clicking spacious updates state", async () => {
		const d = await mountDensity();
		render(d.render, { density: d.density });
		await fireEvent.click(screen.getByText("spacious"));
		await tick();
		expect(d.density.density).toBe("spacious");
	});
});
