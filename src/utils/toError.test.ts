import { describe, expect, it } from "vitest";
import { toError } from "./toError";

describe("toError", () => {
	it("returns the same Error if given an Error", () => {
		const err = new Error("test");
		expect(toError(err)).toBe(err);
	});
	it("wraps a string into an Error", () => {
		const result = toError("something went wrong");
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("something went wrong");
	});
	it("wraps a number into an Error", () => {
		const result = toError(42);
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("42");
	});
	it("wraps null into an Error", () => {
		const result = toError(null);
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("null");
	});
	it("wraps undefined into an Error", () => {
		const result = toError(undefined);
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("undefined");
	});
});
