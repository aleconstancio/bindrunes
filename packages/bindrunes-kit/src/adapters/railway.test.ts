import { describe, expect, it } from "vitest";
import { railwayConfig } from "./railway";

describe("railwayConfig", () => {
	it("returns default config", () => {
		const config = railwayConfig();
		expect(config).toBeDefined();
		expect(config.adapter).toBe("adapter-node");
		expect(config.config.out).toBe("build");
		expect(config.railwayJson).toBeDefined();
		expect(config.railwayJson.build.builder).toBe("nixpacks");
		expect(config.railwayJson.deploy.startCommand).toBe("node build/index.js");
		expect(config.railwayJson.deploy.healthcheckPath).toBe("/");
	});

	it("returns railway build config", () => {
		const config = railwayConfig();
		expect(config.railwayJson.build).toEqual({ builder: "nixpacks" });
	});

	it("returns railway deploy config", () => {
		const config = railwayConfig();
		expect(config.railwayJson.deploy).toEqual({
			startCommand: "node build/index.js",
			healthcheckPath: "/",
		});
	});

	it("accepts options without error", () => {
		const config = railwayConfig({ port: 8080 });
		expect(config.adapter).toBe("adapter-node");
		expect(config.railwayJson).toBeDefined();
	});
});
