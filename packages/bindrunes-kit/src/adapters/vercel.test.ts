import { describe, expect, it } from "vitest";
import { vercelConfig } from "./vercel";

describe("vercelConfig", () => {
	it("returns default config", () => {
		const config = vercelConfig();
		expect(config).toBeDefined();
		expect(config.adapter).toBe("adapter-vercel");
		expect(config.config.runtime).toBe("nodejs");
		expect(config.config.regions).toEqual(["iad1"]);
		expect(config.config.maxDuration).toBe(30);
	});

	it("accepts edge runtime", () => {
		const config = vercelConfig({ runtime: "edge" });
		expect(config.config.runtime).toBe("edge");
	});

	it("accepts custom regions", () => {
		const config = vercelConfig({ regions: ["sfo1", "iad1"] });
		expect(config.config.regions).toEqual(["sfo1", "iad1"]);
	});

	it("accepts custom maxDuration", () => {
		const config = vercelConfig({ maxDuration: 60 });
		expect(config.config.maxDuration).toBe(60);
	});

	it("accepts all options", () => {
		const config = vercelConfig({
			runtime: "edge",
			regions: ["cdg1", "hnd1"],
			maxDuration: 120,
		});
		expect(config.adapter).toBe("adapter-vercel");
		expect(config.config.runtime).toBe("edge");
		expect(config.config.regions).toEqual(["cdg1", "hnd1"]);
		expect(config.config.maxDuration).toBe(120);
	});
});
