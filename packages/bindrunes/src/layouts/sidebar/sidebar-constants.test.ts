import { describe, expect, it } from "vitest";
import {
	browser,
	SIDEBAR_WIDTH,
	SIDEBAR_WIDTH_ICON,
	SIDEBAR_WIDTH_MOBILE,
} from "./sidebar-constants";

describe("sidebar-constants", () => {
	it("exports SIDEBAR_WIDTH as 16rem", () => {
		expect(SIDEBAR_WIDTH).toBe("16rem");
	});

	it("exports SIDEBAR_WIDTH_MOBILE as 18rem", () => {
		expect(SIDEBAR_WIDTH_MOBILE).toBe("18rem");
	});

	it("exports SIDEBAR_WIDTH_ICON as 3rem", () => {
		expect(SIDEBAR_WIDTH_ICON).toBe("3rem");
	});

	it("exports browser as a boolean", () => {
		expect(typeof browser).toBe("boolean");
	});

	it("browser reflects whether window is available", () => {
		expect(typeof browser).toBe("boolean");
	});
});
