import { describe, expect, it } from "vitest";
import RangeCalendar from "./RangeCalendar.svelte";

describe("RangeCalendar", () => {
	it("exports a Svelte component", () => {
		expect(RangeCalendar).toBeDefined();
	});

	it("is a function (Svelte component signature)", () => {
		expect(typeof RangeCalendar).toBe("function");
	});
});
