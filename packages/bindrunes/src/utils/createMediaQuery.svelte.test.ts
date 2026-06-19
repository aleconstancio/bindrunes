import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createMediaQuery } from "./createMediaQuery.svelte";

describe("createMediaQuery", () => {
	it("returns matches as a boolean", async () => {
		const mq = await mountComposable(() => createMediaQuery({ query: "(min-width: 0px)" }));
		expect(typeof mq.matches).toBe("boolean");
	});

	it("returns stop as a function", async () => {
		const mq = await mountComposable(() => createMediaQuery({ query: "(min-width: 0px)" }));
		expect(typeof mq.stop).toBe("function");
	});

	it("stop() does not throw", async () => {
		const mq = await mountComposable(() => createMediaQuery({ query: "(min-width: 0px)" }));
		expect(() => mq.stop()).not.toThrow();
	});
});
