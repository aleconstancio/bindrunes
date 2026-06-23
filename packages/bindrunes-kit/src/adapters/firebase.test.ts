import { describe, expect, it } from "vitest";
import { firebaseConfig, generateFirebaseJson } from "./firebase";

describe("firebaseConfig", () => {
	it("returns default config", () => {
		const config = firebaseConfig();
		expect(config).toBeDefined();
		expect(config.adapter).toBe("adapter-static");
		expect(config.config.fallback).toBe("index.html");
		expect(config.config.precompress).toBe(true);
		expect(config.config.strict).toBe(true);
		expect(config.firebaseJson).toBeDefined();
		expect(config.firebaseJson.hosting.public).toBe("build");
	});

	it("returns firebase hosting config with rewrites", () => {
		const config = firebaseConfig();
		expect(config.firebaseJson.hosting.rewrites).toEqual([
			{ source: "**", destination: "/index.html" },
		]);
	});

	it("returns firebase hosting config with security headers", () => {
		const config = firebaseConfig();
		const headers = config.firebaseJson.hosting.headers[0].headers;
		expect(headers).toHaveLength(3);
		expect(headers.find((h: { key: string }) => h.key === "X-Content-Type-Options")).toBeDefined();
		expect(headers.find((h: { key: string }) => h.key === "X-Frame-Options")).toBeDefined();
		expect(headers.find((h: { key: string }) => h.key === "Referrer-Policy")).toBeDefined();
	});

	it("returns firebase hosting ignore list", () => {
		const config = firebaseConfig();
		expect(config.firebaseJson.hosting.ignore).toContain("**/node_modules/**");
	});
});

describe("generateFirebaseJson", () => {
	it("returns valid JSON string", () => {
		const json = generateFirebaseJson();
		const parsed = JSON.parse(json);
		expect(parsed.hosting).toBeDefined();
		expect(parsed.hosting.public).toBe("build");
	});

	it("returns same content as firebaseConfig().firebaseJson", () => {
		const json = generateFirebaseJson();
		const config = firebaseConfig();
		expect(JSON.parse(json)).toEqual(config.firebaseJson);
	});
});
