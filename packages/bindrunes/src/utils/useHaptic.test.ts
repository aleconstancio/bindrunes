import { describe, expect, it } from "vitest";
import { useHaptic } from "./useHaptic";

describe("useHaptic", () => {
	it("returns haptic methods", () => {
		const haptic = useHaptic();
		expect(typeof haptic.light).toBe("function");
		expect(typeof haptic.medium).toBe("function");
		expect(typeof haptic.heavy).toBe("function");
		expect(typeof haptic.success).toBe("function");
		expect(typeof haptic.warning).toBe("function");
		expect(typeof haptic.error).toBe("function");
		expect(typeof haptic.selection).toBe("function");
		expect(typeof haptic.cancel).toBe("function");
	});

	it("does not throw in non-browser environment", () => {
		const haptic = useHaptic();
		expect(() => haptic.light()).not.toThrow();
		expect(() => haptic.success()).not.toThrow();
		expect(() => haptic.cancel()).not.toThrow();
	});
});
