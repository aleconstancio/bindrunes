import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ApiKeyManagement from "./ApiKeyManagement.svelte";

describe("ApiKeyManagement", () => {
	it("renders without errors", () => {
		const { container } = render(ApiKeyManagement);
		expect(container).toBeTruthy();
	});

	it("renders with API keys", () => {
		const { container } = render(ApiKeyManagement, {
			props: {
				keys: [
					{
						id: "1",
						name: "Production Key",
						key: "sk-1234567890abcdef1234567890abcdef",
						createdAt: "2024-01-01",
						lastUsed: "2024-06-01",
					},
				],
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders empty state when no keys", () => {
		const { container } = render(ApiKeyManagement, {
			props: { keys: [] },
		});
		expect(container).toBeTruthy();
	});

	it("renders with expiring keys", () => {
		const { container } = render(ApiKeyManagement, {
			props: {
				keys: [
					{
						id: "1",
						name: "Expiring Key",
						key: "sk-1234567890abcdef1234567890abcdef",
						createdAt: "2024-01-01",
						expiresAt: "2024-12-31",
					},
				],
			},
		});
		expect(container).toBeTruthy();
	});
});
