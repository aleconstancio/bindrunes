import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";

describe("createPersistedDataAttribute", () => {
	it("initializes with default value", async () => {
		const result = await mountComposable(() =>
			createPersistedDataAttribute({
				storageKey: "test-theme",
				attributeName: "data-theme",
				values: ["light", "dark"] as const,
				default: "light",
			}),
		);
		expect(result.value).toBe("light");
	});

	it("setValue() updates value", async () => {
		const result = await mountComposable(() =>
			createPersistedDataAttribute({
				storageKey: "test-theme-2",
				attributeName: "data-theme",
				values: ["light", "dark"] as const,
				default: "light",
			}),
		);
		result.setValue("dark");
		expect(result.value).toBe("dark");
	});

	it("exposes values array", async () => {
		const result = await mountComposable(() =>
			createPersistedDataAttribute({
				storageKey: "test-theme-3",
				attributeName: "data-theme",
				values: ["light", "dark", "auto"] as const,
				default: "light",
			}),
		);
		expect(result.values).toEqual(["light", "dark", "auto"]);
	});
});
