import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CopilotContextSidebar from "./CopilotContextSidebar.svelte";

describe("CopilotContextSidebar", () => {
	it("renders token usage bar when loaded", () => {
		const { getByText } = render(CopilotContextSidebar, {
			props: {
				contextLoaded: true,
				contextTokens: 5000,
				maxTokens: 10000,
				contextLayers: [{ name: "System", tokens: 2000 }],
				status: "connected",
			},
		});
		expect(getByText("Tokens Utilizados")).toBeTruthy();
	});

	it("shows unloaded state", () => {
		const { getByText } = render(CopilotContextSidebar, {
			props: {
				contextLoaded: false,
				contextTokens: 0,
				maxTokens: 10000,
				contextLayers: [],
				status: "disconnected",
			},
		});
		expect(getByText("Contexto não carregado")).toBeTruthy();
	});

	it("renders context layers", () => {
		const { getByText } = render(CopilotContextSidebar, {
			props: {
				contextLoaded: true,
				contextTokens: 3000,
				maxTokens: 10000,
				contextLayers: [
					{ name: "System", tokens: 1000 },
					{ name: "Publication", tokens: 2000 },
				],
				status: "connected",
			},
		});
		expect(getByText("System")).toBeTruthy();
		expect(getByText("Publication")).toBeTruthy();
	});
});
