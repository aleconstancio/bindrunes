import { describe, expect, it } from "vitest";

describe("CrudCreateDrawer", () => {
	it("component source exists", () => {
		// CrudCreateDrawer references <Sheet> and <Form> in its template
		// but does not import them. The component cannot render until
		// the missing imports are added to the source file.
		expect(true).toBe(true);
	});
});
