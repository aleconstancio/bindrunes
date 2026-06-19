import { describe, expect, it } from "vitest";
import { defaultTableFallbacks } from "./tableFallbacks";

describe("defaultTableFallbacks", () => {
	it("returns formatted page string for table.page", () => {
		const result = defaultTableFallbacks("table.page", { current: 3, total: 10 });
		expect(result).toBe("Page 3 of 10");
	});
	it("returns formatted perPage string for pagination.perPage", () => {
		const result = defaultTableFallbacks("pagination.perPage", { count: 25 });
		expect(result).toBe("25 per page");
	});
	it("returns the key itself for unknown keys", () => {
		expect(defaultTableFallbacks("unknown.key")).toBe("unknown.key");
	});
	it("handles missing params gracefully", () => {
		const result = defaultTableFallbacks("table.page");
		expect(result).toBe("Page ? of ?");
	});
});
