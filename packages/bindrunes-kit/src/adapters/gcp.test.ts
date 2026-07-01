import { describe, expect, it } from "vitest";
import { gcpConfig } from "./gcp";

describe("gcpConfig", () => {
	it("returns default config", () => {
		const result = gcpConfig();
		expect(result.adapter).toBe("adapter-node");
		expect(result.config.runtime).toBe("nodejs20");
		expect(result.config.region).toBe("us-central1");
		expect(result.config.memory).toBe("1Gi");
		expect(result.config.timeout).toBe("30s");
		expect(result.config.maxInstances).toBe(10);
	});

	it("accepts custom options", () => {
		const result = gcpConfig({ runtime: "nodejs22", region: "europe-west1" });
		expect(result.config.runtime).toBe("nodejs22");
		expect(result.config.region).toBe("europe-west1");
	});

	it("accepts all options", () => {
		const result = gcpConfig({
			runtime: "nodejs22",
			region: "asia-east1",
			memory: "2Gi",
			timeout: "60s",
			maxInstances: 20,
		});
		expect(result.adapter).toBe("adapter-node");
		expect(result.config.runtime).toBe("nodejs22");
		expect(result.config.region).toBe("asia-east1");
		expect(result.config.memory).toBe("2Gi");
		expect(result.config.timeout).toBe("60s");
		expect(result.config.maxInstances).toBe(20);
	});
});
