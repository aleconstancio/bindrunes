// src/test-fixtures/scriptedRuns.ts
// Pre-canned Delta streams for SimulatorRuntime tests. Add new fixtures here;
// reference them by name from tests.

import type { Delta } from "../types/agent";

export type ScriptedRunId = "greeting" | "toolCall" | "reasoning" | "longReply" | "errors";

const greetingScript: Delta[] = [
	{ kind: "token", text: "Hello" },
	{ kind: "token", text: " there" },
	{ kind: "token", text: "!" },
	{ kind: "done", finishReason: "stop" },
];

const toolCallScript: Delta[] = [
	{ kind: "reasoning", text: "I need to look up the user." },
	{ kind: "tool_call", callId: "call_1", name: "lookupUser", args: { id: 42 } },
	{
		kind: "tool_result",
		callId: "call_1",
		result: { name: "Ada", email: "ada@example.com" },
	},
	{ kind: "token", text: "I found " },
	{ kind: "token", text: "Ada." },
	{ kind: "done", finishReason: "stop" },
];

const reasoningScript: Delta[] = [
	{ kind: "reasoning", text: "Let me think..." },
	{ kind: "reasoning", text: " ...step by step." },
	{ kind: "token", text: "Answer: 42." },
	{ kind: "done", finishReason: "stop" },
];

const longReplyScript: Delta[] = [
	{ kind: "token", text: "A" },
	{ kind: "token", text: "B" },
	{ kind: "token", text: "C" },
	{ kind: "token", text: "D" },
	{ kind: "token", text: "E" },
	{ kind: "done", finishReason: "stop" },
];

const errorScript: Delta[] = [
	{ kind: "token", text: "partial" },
	{ kind: "error", message: "rate limited", recoverable: true },
];

const SCRIPTS: Record<ScriptedRunId, Delta[]> = {
	greeting: greetingScript,
	toolCall: toolCallScript,
	reasoning: reasoningScript,
	longReply: longReplyScript,
	errors: errorScript,
};

export function scriptedRun(id: ScriptedRunId): Delta[] {
	const script = SCRIPTS[id];
	if (!script) {
		throw new Error(`Unknown scripted run: ${id}`);
	}
	return script;
}

export function listScriptedRuns(): ScriptedRunId[] {
	return Object.keys(SCRIPTS) as ScriptedRunId[];
}
