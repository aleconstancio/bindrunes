import { fireEvent, render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it } from "vitest";
import { useAesthetic } from "../utils/useAesthetic";
import ComposableHarness from "./__tests__/harness/ComposableHarness.svelte";
import AestheticTab from "./AestheticTab.svelte";

describe("AestheticTab", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-aesthetic");
	});

	async function mountAesthetic() {
		const state: { current: unknown } = { current: null };
		render(ComposableHarness, {
			props: {
				setup: () => ({
					aesthetic: useAesthetic(),
					render: AestheticTab,
				}),
				state,
			},
		});
		await tick();
		return state.current as {
			aesthetic: ReturnType<typeof useAesthetic>;
			render: typeof AestheticTab;
		};
	}

	it("renders the form aesthetic label", async () => {
		const a = await mountAesthetic();
		render(a.render, { aesthetic: a.aesthetic });
		expect(screen.getByText("Form aesthetic")).toBeInTheDocument();
	});

	it("renders all aesthetic options", async () => {
		const a = await mountAesthetic();
		render(a.render, { aesthetic: a.aesthetic });
		expect(screen.getByText("minimal")).toBeInTheDocument();
		expect(screen.getByText("glass")).toBeInTheDocument();
		expect(screen.getByText("bento")).toBeInTheDocument();
		expect(screen.getByText("expressive")).toBeInTheDocument();
	});

	it("shows description for minimal", async () => {
		const a = await mountAesthetic();
		render(a.render, { aesthetic: a.aesthetic });
		expect(screen.getByText(/Flat surfaces/)).toBeInTheDocument();
	});

	it("shows description for glass", async () => {
		const a = await mountAesthetic();
		render(a.render, { aesthetic: a.aesthetic });
		expect(screen.getByText(/Translucent surfaces/)).toBeInTheDocument();
	});

	it("shows description for bento", async () => {
		const a = await mountAesthetic();
		render(a.render, { aesthetic: a.aesthetic });
		expect(screen.getByText(/Rounded corners/)).toBeInTheDocument();
	});

	it("shows description for neon/expressive", async () => {
		const a = await mountAesthetic();
		render(a.render, { aesthetic: a.aesthetic });
		expect(screen.getByText(/Dramatic shadows/)).toBeInTheDocument();
	});

	it("clicking an aesthetic calls setAesthetic", async () => {
		const a = await mountAesthetic();
		render(a.render, { aesthetic: a.aesthetic });
		await fireEvent.click(screen.getByText("glass"));
		await tick();
		expect(a.aesthetic.aesthetic).toBe("glass");
	});
});
