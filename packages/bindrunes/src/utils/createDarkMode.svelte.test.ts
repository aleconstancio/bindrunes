import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createDarkMode } from "./createDarkMode.svelte";

describe("createDarkMode", () => {
	let originalClass: string;

	beforeEach(() => {
		originalClass = document.documentElement.className;
		document.documentElement.classList.remove("light", "dark");
	});

	afterEach(() => {
		document.documentElement.className = originalClass;
	});

	it("exposes isDark getter", () => {
		const dm = createDarkMode();
		expect(typeof dm.isDark).toBe("boolean");
	});

	it("exposes mode getter", () => {
		const dm = createDarkMode();
		expect(["light", "dark", undefined]).toContain(dm.mode);
	});

	it("exposes toggle function", () => {
		const dm = createDarkMode();
		expect(typeof dm.toggle).toBe("function");
	});

	it("exposes set function", () => {
		const dm = createDarkMode();
		expect(typeof dm.set).toBe("function");
	});

	it("isDark is true when documentElement has .dark class", () => {
		document.documentElement.classList.add("dark");
		const dm = createDarkMode();
		expect(dm.isDark).toBe(true);
	});
});
