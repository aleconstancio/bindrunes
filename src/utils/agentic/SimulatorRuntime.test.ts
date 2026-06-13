import { describe, expect, it } from "vitest";
import { scriptedRun } from "../../test-fixtures/scriptedRuns";
import type { Delta } from "../../types/agent";
import { SimulatorRuntime } from "./SimulatorRuntime";

async function collect<T>(iter: AsyncIterable<T>): Promise<T[]> {
	const out: T[] = [];
	for await (const item of iter) out.push(item);
	return out;
}

describe("SimulatorRuntime", () => {
	describe("shape", () => {
		it("exposes a tools array (empty for the simulator)", () => {
			const rt = new SimulatorRuntime({ script: [] });
			expect(Array.isArray(rt.tools)).toBe(true);
			expect(rt.tools).toEqual([]);
		});

		it("has no embed() function by default", () => {
			const rt = new SimulatorRuntime({ script: [] });
			expect((rt as any).embed).toBeUndefined();
		});
	});

	describe("complete()", () => {
		it("yields scripted deltas in order", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "Hello" },
				{ kind: "token", text: " world" },
				{ kind: "done", finishReason: "stop" },
			];
			const rt = new SimulatorRuntime({ script });
			const out = await collect(
				rt.complete({ messages: [] } as never, new AbortController().signal),
			);
			expect(out).toEqual(script);
		});

		it("ends cleanly when the script contains a done delta", async () => {
			const rt = new SimulatorRuntime({
				script: [
					{ kind: "token", text: "x" },
					{ kind: "done", finishReason: "stop" },
				],
			});
			const out = await collect(
				rt.complete({ messages: [] } as never, new AbortController().signal),
			);
			expect(out.at(-1)).toEqual({ kind: "done", finishReason: "stop" });
		});

		it("yields nothing when the script is empty", async () => {
			const rt = new SimulatorRuntime({ script: [] });
			const out = await collect(
				rt.complete({ messages: [] } as never, new AbortController().signal),
			);
			expect(out).toEqual([]);
		});

		it("synthesises an automatic done if the script does not end with one", async () => {
			const rt = new SimulatorRuntime({
				script: [{ kind: "token", text: "trailing" }],
			});
			const out = await collect(
				rt.complete({ messages: [] } as never, new AbortController().signal),
			);
			expect(out.at(-1)?.kind).toBe("done");
		});
	});

	describe("abort handling", () => {
		it("stops yielding when the AbortSignal is already aborted", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "a" },
				{ kind: "token", text: "b" },
				{ kind: "token", text: "c" },
				{ kind: "done", finishReason: "stop" },
			];
			const rt = new SimulatorRuntime({ script });
			const ac = new AbortController();
			ac.abort();
			const out = await collect(rt.complete({ messages: [] } as never, ac.signal));
			expect(out).toEqual([]);
		});

		it("yields a done(cancel) delta and stops when aborted mid-stream", async () => {
			const script: Delta[] = [
				{ kind: "token", text: "a" },
				{ kind: "token", text: "b" },
				{ kind: "token", text: "c" },
				{ kind: "done", finishReason: "stop" },
			];
			const rt = new SimulatorRuntime({ script });
			const ac = new AbortController();
			const iter = rt.complete({ messages: [] } as never, ac.signal);
			const collected: Delta[] = [];
			for await (const d of iter) {
				collected.push(d);
				if (collected.length === 1) ac.abort();
			}
			const last = collected.at(-1);
			expect(last?.kind).toBe("done");
			if (last?.kind === "done") {
				expect(last.finishReason).toBe("cancel");
			}
		});
	});

	describe("delay behaviour", () => {
		it("honours a per-delta delay (default 0)", async () => {
			const rt = new SimulatorRuntime({
				script: [
					{ kind: "token", text: "a" },
					{ kind: "token", text: "b" },
				],
			});
			const start = Date.now();
			await collect(rt.complete({ messages: [] } as never, new AbortController().signal));
			const elapsed = Date.now() - start;
			expect(elapsed).toBeLessThan(50);
		});

		it("waits the configured delay between deltas", async () => {
			const rt = new SimulatorRuntime({
				script: [
					{ kind: "token", text: "a" },
					{ kind: "token", text: "b" },
				],
				delayMs: 20,
			});
			const start = Date.now();
			await collect(rt.complete({ messages: [] } as never, new AbortController().signal));
			const elapsed = Date.now() - start;
			expect(elapsed).toBeGreaterThanOrEqual(30);
		});
	});

	describe("shared fixtures", () => {
		it("scriptedRun.greeting yields a friendly greeting", async () => {
			const script = scriptedRun("greeting");
			const rt = new SimulatorRuntime({ script });
			const out = await collect(
				rt.complete({ messages: [] } as never, new AbortController().signal),
			);
			const text = out
				.filter((d): d is Extract<Delta, { kind: "token" }> => d.kind === "token")
				.map((d) => d.text)
				.join("");
			expect(text.toLowerCase()).toContain("hello");
		});

		it("scriptedRun.toolCall yields a tool_call delta before done", async () => {
			const script = scriptedRun("toolCall");
			const rt = new SimulatorRuntime({ script });
			const out = await collect(
				rt.complete({ messages: [] } as never, new AbortController().signal),
			);
			const kinds = out.map((d) => d.kind);
			expect(kinds).toContain("tool_call");
			expect(kinds.at(-1)).toBe("done");
		});
	});

	describe("error delta handling", () => {
		it("yields an error delta when the script contains one and ends", async () => {
			const rt = new SimulatorRuntime({
				script: [
					{ kind: "token", text: "partial" },
					{ kind: "error", message: "rate limited", recoverable: true },
				],
			});
			const out = await collect(
				rt.complete({ messages: [] } as never, new AbortController().signal),
			);
			const kinds = out.map((d) => d.kind);
			expect(kinds).toContain("error");
			expect(kinds.at(-1)).toBe("error");
		});
	});

	describe("abort during delay", () => {
		it("yields a done(cancel) if aborted while sleeping between deltas", async () => {
			const rt = new SimulatorRuntime({
				script: [
					{ kind: "token", text: "a" },
					{ kind: "token", text: "b" },
					{ kind: "done", finishReason: "stop" },
				],
				delayMs: 40,
			});
			const ac = new AbortController();
			const iter = rt.complete({ messages: [] } as never, ac.signal);
			const out: Delta[] = [];
			for await (const d of iter) {
				out.push(d);
				// Abort after the first delta, while delay is in progress.
				if (out.length === 1) {
					setTimeout(() => ac.abort(), 5);
				}
			}
			const last = out.at(-1);
			expect(last?.kind).toBe("done");
			if (last?.kind === "done") {
				expect(last.finishReason).toBe("cancel");
			}
		});
	});
});
