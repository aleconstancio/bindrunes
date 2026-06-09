import { describe, expect, it } from "vitest";
import { createTokenBudget } from "./createTokenBudget.svelte";

describe("createTokenBudget", () => {
	describe("initial state", () => {
		it("starts with used=0 and remaining=cap when no usage recorded", () => {
			const b = createTokenBudget({ cap: 1000 });
			expect(b.used).toBe(0);
			expect(b.cap).toBe(1000);
			expect(b.remaining).toBe(1000);
			expect(b.overflow).toBe(false);
		});

		it("exposes the cap the policy declared", () => {
			const b = createTokenBudget({ cap: 4096 });
			expect(b.cap).toBe(4096);
		});
	});

	describe("record()", () => {
		it("accumulates prompt + completion tokens into used", () => {
			const b = createTokenBudget({ cap: 1000 });
			b.record({ prompt: 200, completion: 50 });
			expect(b.used).toBe(250);
			expect(b.remaining).toBe(750);
		});

		it("sums across multiple record() calls", () => {
			const b = createTokenBudget({ cap: 1000 });
			b.record({ prompt: 100, completion: 50 });
			b.record({ prompt: 200, completion: 100 });
			b.record({ prompt: 0, completion: 25 });
			expect(b.used).toBe(475);
		});

		it("marks overflow when used exceeds cap", () => {
			const b = createTokenBudget({ cap: 100 });
			b.record({ prompt: 80, completion: 50 });
			expect(b.used).toBe(130);
			expect(b.overflow).toBe(true);
			expect(b.remaining).toBe(0, "remaining never goes negative; clamps at 0");
		});

		it("zero usage deltas do not move used", () => {
			const b = createTokenBudget({ cap: 100 });
			b.record({ prompt: 0, completion: 0 });
			expect(b.used).toBe(0);
		});
	});

	describe("reset()", () => {
		it("returns used to 0 and clears overflow", () => {
			const b = createTokenBudget({ cap: 100 });
			b.record({ prompt: 80, completion: 50 });
			expect(b.overflow).toBe(true);
			b.reset();
			expect(b.used).toBe(0);
			expect(b.overflow).toBe(false);
			expect(b.remaining).toBe(100);
		});
	});

	describe("per-layer tracking", () => {
		it("tracks working / episodic / semantic independently when assigned to a layer", () => {
			const b = createTokenBudget({ cap: 1000 });
			b.record({ layer: "working", prompt: 100, completion: 0 });
			b.record({ layer: "episodic", prompt: 200, completion: 50 });
			b.record({ layer: "semantic", prompt: 0, completion: 300 });
			expect(b.used).toBe(650);
			expect(b.working).toBe(100);
			expect(b.episodic).toBe(250);
			expect(b.semantic).toBe(300);
		});

		it("layer defaults to 'episodic' when omitted (most common path)", () => {
			const b = createTokenBudget({ cap: 1000 });
			b.record({ prompt: 10, completion: 5 });
			expect(b.episodic).toBe(15);
			expect(b.working).toBe(0);
			expect(b.semantic).toBe(0);
		});
	});

	describe("edge cases", () => {
		it("accepts a 0 cap (always overflowing once anything is recorded)", () => {
			const b = createTokenBudget({ cap: 0 });
			b.record({ prompt: 1, completion: 0 });
			expect(b.overflow).toBe(true);
			expect(b.remaining).toBe(0);
		});

		it("rejects non-integer tokens (rounds to nearest)", () => {
			const b = createTokenBudget({ cap: 100 });
			b.record({ prompt: 10.4, completion: 5.6 });
			expect(b.used).toBe(16);
		});
	});
});
