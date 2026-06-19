import { describe, expect, it } from "vitest";
import type { Delta } from "./agent";
import { isTerminalDelta, toWindowId } from "./agent";

describe("agent.ts runtime helpers", () => {
	describe("toWindowId", () => {
		it("returns the input string branded as WindowId", () => {
			const id = toWindowId("abc-123");
			expect(id).toBe("abc-123");
		});

		it("accepts empty string", () => {
			const id = toWindowId("");
			expect(id).toBe("");
		});

		it("preserves exact string value", () => {
			const input = "w_1a2b3c";
			const id = toWindowId(input);
			expect(id).toBe(input);
		});
	});

	describe("isTerminalDelta", () => {
		it("returns true for done delta", () => {
			const delta: Delta = { kind: "done", finishReason: "stop" };
			expect(isTerminalDelta(delta)).toBe(true);
		});

		it("returns true for error delta", () => {
			const delta: Delta = { kind: "error", message: "failed", recoverable: false };
			expect(isTerminalDelta(delta)).toBe(true);
		});

		it("returns false for token delta", () => {
			const delta: Delta = { kind: "token", text: "hello" };
			expect(isTerminalDelta(delta)).toBe(false);
		});

		it("returns false for tool_call delta", () => {
			const delta: Delta = { kind: "tool_call", callId: "c1", name: "search", args: {} };
			expect(isTerminalDelta(delta)).toBe(false);
		});

		it("returns false for tool_result delta", () => {
			const delta: Delta = { kind: "tool_result", callId: "c1", result: "ok" };
			expect(isTerminalDelta(delta)).toBe(false);
		});

		it("returns false for reasoning delta", () => {
			const delta: Delta = { kind: "reasoning", text: "thinking..." };
			expect(isTerminalDelta(delta)).toBe(false);
		});

		it("returns false for usage delta", () => {
			const delta: Delta = { kind: "usage", prompt: 100, completion: 50 };
			expect(isTerminalDelta(delta)).toBe(false);
		});

		it("returns true for done with finishReason=length", () => {
			const delta: Delta = { kind: "done", finishReason: "length" };
			expect(isTerminalDelta(delta)).toBe(true);
		});

		it("returns true for done with finishReason=cancel", () => {
			const delta: Delta = { kind: "done", finishReason: "cancel" };
			expect(isTerminalDelta(delta)).toBe(true);
		});
	});
});
