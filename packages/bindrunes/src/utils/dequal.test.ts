import { describe, expect, it } from "vitest";
import { dequal } from "./dequal";

describe("dequal", () => {
	it("returns true for identical primitives", () => {
		expect(dequal(1, 1)).toBe(true);
		expect(dequal("a", "a")).toBe(true);
		expect(dequal(null, null)).toBe(true);
	});

	it("returns false for different primitives", () => {
		expect(dequal(1, 2)).toBe(false);
		expect(dequal("a", "b")).toBe(false);
	});

	it("compares arrays deeply", () => {
		expect(dequal([1, 2, 3], [1, 2, 3])).toBe(true);
		expect(dequal([1, 2, 3], [1, 2, 4])).toBe(false);
		expect(dequal([1, [2, 3]], [1, [2, 3]])).toBe(true);
	});

	it("compares objects deeply", () => {
		expect(dequal({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
		expect(dequal({ a: 1 }, { a: 2 })).toBe(false);
	});
});
