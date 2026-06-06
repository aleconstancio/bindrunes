import { describe, expect, it } from "vitest";
import { readonlyGetters } from "../readonlyGetters";

describe("readonlyGetters", () => {
	it("returns an object with get accessors for all keys", () => {
		const state = { count: 0, name: "test" };
		const readonly = readonlyGetters(state);
		expect(readonly.count).toBe(0);
		expect(readonly.name).toBe("test");
	});

	it("reflects changes to the underlying state", () => {
		const state = { count: 0 };
		const readonly = readonlyGetters(state);
		expect(readonly.count).toBe(0);
		state.count = 5;
		expect(readonly.count).toBe(5);
	});

	it("does not allow direct assignment on the readonly wrapper", () => {
		const state = { count: 0 };
		const readonly = readonlyGetters(state);
		(readonly as any).count = 10;
		expect(state.count).toBe(0);
		expect(readonly.count).toBe(0);
	});

	it("preserves function properties", () => {
		const state = {
			count: 0,
			increment() {
				this.count++;
			},
		};
		const readonly = readonlyGetters(state);
		expect(typeof readonly.increment).toBe("function");
	});

	it("returns empty object for empty input", () => {
		const readonly = readonlyGetters({});
		expect(Object.keys(readonly)).toHaveLength(0);
	});
});
