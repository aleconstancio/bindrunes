import { describe, expect, it } from "vitest";
import { dockerConfig } from "./docker";

describe("dockerConfig", () => {
	it("returns default config", () => {
		const config = dockerConfig();
		expect(config).toBeDefined();
		expect(config.adapter).toBe("adapter-node");
		expect(config.port).toBe(3000);
		expect(config.dockerfile).toContain("node:20-alpine");
		expect(config.dockerfile).toContain("EXPOSE 3000");
	});

	it("accepts custom nodeVersion", () => {
		const config = dockerConfig({ nodeVersion: "18-alpine" });
		expect(config.dockerfile).toContain("node:18-alpine");
		expect(config.port).toBe(3000);
	});

	it("accepts custom port", () => {
		const config = dockerConfig({ port: 8080 });
		expect(config.dockerfile).toContain("EXPOSE 8080");
		expect(config.port).toBe(8080);
	});

	it("accepts all options", () => {
		const config = dockerConfig({ nodeVersion: "22-slim", port: 4000 });
		expect(config.adapter).toBe("adapter-node");
		expect(config.dockerfile).toContain("node:22-slim");
		expect(config.dockerfile).toContain("EXPOSE 4000");
		expect(config.port).toBe(4000);
	});
});
