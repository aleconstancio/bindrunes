import { describe, expect, it } from "vitest";
import { isSafeRedirect } from "./url";

describe("isSafeRedirect", () => {
	it.each([
		"/home",
		"/users/1",
		"/path?q=1",
		"/dashboard/settings",
	])("accepts relative path: %s", (url) => {
		expect(isSafeRedirect(url)).toBe(true);
	});

	it.each([
		"",
		"//evil.com",
		"http://evil.com",
		"javascript:alert(1)",
		"data:text/html,evil",
	])("rejects unsafe url: %s", (url) => {
		expect(isSafeRedirect(url)).toBe(false);
	});

	it("accepts deep relative paths", () => {
		expect(isSafeRedirect("/a/b/c/d/e/f")).toBe(true);
	});

	it("rejects ftp scheme", () => {
		expect(isSafeRedirect("ftp://example.com")).toBe(false);
	});

	it("rejects mailto scheme", () => {
		expect(isSafeRedirect("mailto:test@example.com")).toBe(false);
	});

	it("rejects single-slash protocol-relative", () => {
		expect(isSafeRedirect("//")).toBe(false);
		expect(isSafeRedirect("//foo")).toBe(false);
	});
});
