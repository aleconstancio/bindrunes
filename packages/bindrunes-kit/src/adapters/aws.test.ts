import { describe, expect, it } from "vitest";
import { awsConfig } from "./aws";

describe("awsConfig", () => {
	it("returns default config", () => {
		const result = awsConfig();
		expect(result.adapter).toBe("adapter-node");
		expect(result.config.runtime).toBe("nodejs20.x");
		expect(result.config.region).toBe("us-east-1");
		expect(result.config.memory).toBe(1024);
		expect(result.config.timeout).toBe(30);
	});

	it("accepts custom options", () => {
		const result = awsConfig({ runtime: "nodejs22.x", region: "eu-west-1", memory: 2048 });
		expect(result.config.runtime).toBe("nodejs22.x");
		expect(result.config.region).toBe("eu-west-1");
		expect(result.config.memory).toBe(2048);
	});

	it("accepts all options", () => {
		const result = awsConfig({
			runtime: "nodejs22.x",
			region: "ap-southeast-1",
			memory: 512,
			timeout: 60,
		});
		expect(result.adapter).toBe("adapter-node");
		expect(result.config.runtime).toBe("nodejs22.x");
		expect(result.config.region).toBe("ap-southeast-1");
		expect(result.config.memory).toBe(512);
		expect(result.config.timeout).toBe(60);
	});
});
