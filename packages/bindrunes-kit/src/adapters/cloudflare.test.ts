import { describe, expect, it } from "vitest";
import { cloudflareConfig } from "./cloudflare";

describe("cloudflareConfig", () => {
	it("returns default config", () => {
		const config = cloudflareConfig();
		expect(config).toBeDefined();
		expect(config.adapter).toBe("adapter-cloudflare");
		expect(config.config.name).toBe("my-app");
		expect(config.config.routes).toBeUndefined();
	});

	it("accepts custom name", () => {
		const config = cloudflareConfig({ name: "custom-app" });
		expect(config.config.name).toBe("custom-app");
	});

	it("accepts custom routes", () => {
		const routes = { include: ["/api/*"], exclude: ["/admin/*"] };
		const config = cloudflareConfig({ routes });
		expect(config.config.routes).toEqual(routes);
	});

	it("accepts all options", () => {
		const config = cloudflareConfig({
			name: "full-app",
			routes: { include: ["/api/*"] },
		});
		expect(config.adapter).toBe("adapter-cloudflare");
		expect(config.config.name).toBe("full-app");
		expect(config.config.routes).toEqual({ include: ["/api/*"] });
	});
});
