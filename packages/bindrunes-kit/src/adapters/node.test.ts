import { describe, expect, it } from "vitest";
import { nodeConfig } from "./node";

describe("nodeConfig", () => {
	it("returns default config", () => {
		const config = nodeConfig();
		expect(config).toBeDefined();
		expect(config.adapter).toBe("adapter-node");
		expect(config.config.out).toBe("build");
		expect(config.config.precompress).toBe(false);
		expect(config.config.env).toEqual([]);
	});

	it("accepts custom out directory", () => {
		const config = nodeConfig({ out: "dist" });
		expect(config.config.out).toBe("dist");
	});

	it("accepts precompress option", () => {
		const config = nodeConfig({ precompress: true });
		expect(config.config.precompress).toBe(true);
	});

	it("accepts custom env variables", () => {
		const config = nodeConfig({ env: ["DATABASE_URL", "API_KEY"] });
		expect(config.config.env).toEqual(["DATABASE_URL", "API_KEY"]);
	});

	it("accepts all options", () => {
		const config = nodeConfig({
			out: "output",
			precompress: true,
			env: ["VAR1", "VAR2"],
		});
		expect(config.adapter).toBe("adapter-node");
		expect(config.config.out).toBe("output");
		expect(config.config.precompress).toBe(true);
		expect(config.config.env).toEqual(["VAR1", "VAR2"]);
	});
});
