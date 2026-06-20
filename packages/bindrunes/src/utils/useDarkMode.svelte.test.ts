import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useDarkMode } from "./useDarkMode.svelte";

describe("useDarkMode", () => {
	let originalClass: string;

	beforeEach(() => {
		originalClass = document.documentElement.className;
		document.documentElement.classList.remove("light", "dark");
	});

	afterEach(() => {
		document.documentElement.className = originalClass;
	});

	it("exposes isDark getter", () => {
		const dm = useDarkMode();
		expect(typeof dm.isDark).toBe("boolean");
	});

	it("exposes mode getter", () => {
		const dm = useDarkMode();
		expect(["light", "dark", undefined]).toContain(dm.mode);
	});

	it("exposes toggle function", () => {
		const dm = useDarkMode();
		expect(typeof dm.toggle).toBe("function");
	});

	it("exposes set function", () => {
		const dm = useDarkMode();
		expect(typeof dm.set).toBe("function");
	});

	it("isDark is true when documentElement has .dark class", () => {
		document.documentElement.classList.add("dark");
		const dm = useDarkMode();
		expect(dm.isDark).toBe(true);
	});
});
