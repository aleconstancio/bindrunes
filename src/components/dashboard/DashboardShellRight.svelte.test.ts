import { describe, expect, it } from "vitest";
import DashboardShellRight from "./DashboardShellRight.svelte";

describe("DashboardShellRight", () => {
	it("exports a Svelte component", () => {
		expect(DashboardShellRight).toBeDefined();
	});

	it("is a function (Svelte component signature)", () => {
		expect(typeof DashboardShellRight).toBe("function");
	});
});
