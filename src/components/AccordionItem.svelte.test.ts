import { describe, expect, it } from "vitest";
import AccordionItem from "./AccordionItem.svelte";

describe("AccordionItem", () => {
	it("exports a Svelte component", () => {
		expect(AccordionItem).toBeDefined();
	});

	it("component is a constructor (Svelte component signature)", () => {
		expect(typeof AccordionItem).toBe("function");
	});
});
