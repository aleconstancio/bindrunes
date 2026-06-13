import { describe, expect, it } from "vitest";
import { semanticColors } from "./semanticColors";

describe("semanticColors", () => {
	it("has all 5 semantic color variants", () => {
		expect(Object.keys(semanticColors)).toEqual(
			expect.arrayContaining(["success", "warning", "destructive", "info", "neutral"]),
		);
		expect(Object.keys(semanticColors)).toHaveLength(5);
	});
	it("each variant has required properties", () => {
		for (const [name, variant] of Object.entries(semanticColors)) {
			expect(variant.bg, `${name}.bg`).toBeTruthy();
			expect(variant.text, `${name}.text`).toBeTruthy();
			expect(variant.border, `${name}.border`).toBeTruthy();
			expect(variant.cssVar, `${name}.cssVar`).toBeTruthy();
			expect(variant.dot, `${name}.dot`).toBeTruthy();
		}
	});
	it("success uses success CSS vars", () => {
		expect(semanticColors.success.cssVar).toBe("var(--success)");
		expect(semanticColors.success.bg).toBe("bg-success-soft");
	});
});
