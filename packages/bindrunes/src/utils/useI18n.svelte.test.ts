import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createI18nContext } from "./useI18n.svelte";

describe("createI18nContext", () => {
	it("creates a context and returns a t function", async () => {
		const t = (key: string) => `translated:${key}`;
		const ctx = await mountComposable(() => createI18nContext(t));
		expect(ctx).toBeDefined();
	});
});
