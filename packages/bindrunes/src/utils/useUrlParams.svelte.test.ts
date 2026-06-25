import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useUrlParams } from "./useUrlParams";

describe("useUrlParams", () => {
	it("getParam returns null for missing param", async () => {
		const params = await mountComposable(() => useUrlParams());
		expect(params.getParam("nonexistent")).toBeNull();
	});

	it("getParams returns empty object on clean URL", async () => {
		const params = await mountComposable(() => useUrlParams());
		expect(params.getParams()).toEqual({});
	});

	it("setParam adds a search param", async () => {
		const params = await mountComposable(() => useUrlParams());
		params.setParam("foo", "bar");
		expect(window.location.search).toContain("foo=bar");
	});

	it("setParam removes param when value is null", async () => {
		const params = await mountComposable(() => useUrlParams());
		params.setParam("foo", "bar");
		params.setParam("foo", null);
		expect(window.location.search).not.toContain("foo");
	});

	it("setParam removes param when value is empty string", async () => {
		const params = await mountComposable(() => useUrlParams());
		params.setParam("foo", "bar");
		params.setParam("foo", "");
		expect(window.location.search).not.toContain("foo");
	});

	it("setParams sets multiple params at once", async () => {
		const params = await mountComposable(() => useUrlParams());
		params.setParams({ a: "1", b: "2" });
		const all = params.getParams();
		expect(all.a).toBe("1");
		expect(all.b).toBe("2");
	});

	it("clearParams removes all search params", async () => {
		const params = await mountComposable(() => useUrlParams());
		params.setParam("a", "1");
		params.setParam("b", "2");
		params.clearParams();
		expect(window.location.search).toBe("");
	});
});
