import type { AgentRuntime, Turn } from "../../types/agent";
import type { WindowStore } from "./createWindowStore.svelte";

export type ToolHandler = (name: string, args: unknown) => Promise<unknown>;

export interface OrchestratorOptions {
	store: WindowStore;
	runtime: AgentRuntime;
	maxTurns?: number;
	timeout?: number;
	onTurnComplete?: (turn: Turn) => void;
	onToolCall?: (name: string, args: unknown) => void;
	toolHandler?: ToolHandler;
}

export interface OrchestratorResult {
	readonly status: "idle" | "running" | "completed" | "error" | "aborted";
	readonly currentTurn: number;
	readonly messages: ReadonlyArray<Turn>;
	readonly error: Error | null;
	start: (input: string) => void;
	abort: () => void;
}

function uid(prefix: string): string {
	const r = Math.random().toString(36).slice(2, 10);
	const t = Date.now().toString(36);
	return `${prefix}_${t}${r}`;
}

function estimateTokens(text: string): number {
	return Math.ceil(text.length / 4);
}

interface MutableToolCall {
	callId: string;
	name: string;
	args: unknown;
	result?: unknown;
	isError?: boolean;
}

export function useOrchestrator(options: OrchestratorOptions): OrchestratorResult {
	const {
		store,
		runtime,
		maxTurns = 10,
		timeout = 30000,
		onTurnComplete,
		onToolCall,
		toolHandler,
	} = options;

	let status = $state<"idle" | "running" | "completed" | "error" | "aborted">("idle");
	let currentTurn = $state(0);
	let error = $state<Error | null>(null);
	let abortController: AbortController | null = null;
	let turnTimer: ReturnType<typeof setTimeout> | null = null;

	function buildMessages() {
		const window = store.active;
		if (!window) return [];

		return window.turns.map((t) => ({
			role: t.role as "system" | "user" | "assistant" | "tool",
			content: t.content,
			toolCallId: t.toolCalls?.[0]?.callId,
		}));
	}

	function appendUserTurn(input: string): void {
		const window = store.active;
		if (!window) return;

		const turn: Turn = {
			id: uid("turn"),
			role: "user",
			content: input,
			createdAt: Date.now(),
			estimatedTokens: estimateTokens(input),
			memoryLayer: "working",
		};
		store.appendTurn(window.id, turn);
	}

	function appendAssistantTurn(content: string, toolCalls?: Turn["toolCalls"]): Turn {
		const window = store.active;
		if (!window) throw new Error("No active window");

		const turn: Turn = {
			id: uid("turn"),
			role: "assistant",
			content,
			toolCalls,
			createdAt: Date.now(),
			estimatedTokens: estimateTokens(content),
			memoryLayer: "working",
		};
		store.appendTurn(window.id, turn);
		return turn;
	}

	function appendToolTurn(callId: string, result: unknown): void {
		const window = store.active;
		if (!window) return;

		const turn: Turn = {
			id: uid("turn"),
			role: "tool",
			content: typeof result === "string" ? result : JSON.stringify(result),
			toolCalls: [{ callId, name: "", args: {}, result }],
			createdAt: Date.now(),
			estimatedTokens: estimateTokens(JSON.stringify(result)),
			memoryLayer: "working",
		};
		store.appendTurn(window.id, turn);
	}

	async function runLoop(input: string): Promise<void> {
		try {
			status = "running";
			abortController = new AbortController();
			const signal = abortController.signal;
			let timeoutError = false;

			appendUserTurn(input);

			for (let turn = 0; turn < maxTurns; turn++) {
				if (signal.aborted) {
					status = timeoutError ? "error" : "aborted";
					return;
				}

				currentTurn = turn + 1;
				const messages = buildMessages();

				let responseText = "";
				const toolCalls: MutableToolCall[] = [];

				// Start a timeout timer for this turn
				turnTimer = setTimeout(() => {
					timeoutError = true;
					error = new Error(`Turn timed out after ${timeout}ms`);
					abortController?.abort();
				}, timeout);

				try {
					const iterable = runtime.complete({ messages, tools: runtime.tools }, signal);
					for await (const delta of iterable) {
						if (signal.aborted) {
							status = timeoutError ? "error" : "aborted";
							return;
						}

						switch (delta.kind) {
							case "token":
								responseText += delta.text;
								break;
							case "tool_call":
								toolCalls.push({
									callId: delta.callId,
									name: delta.name,
									args: delta.args,
								});
								onToolCall?.(delta.name, delta.args);
								break;
							case "error":
								if (!delta.recoverable) {
									throw new Error(delta.message);
								}
								break;
							case "done":
								break;
						}
					}
				} finally {
					if (turnTimer !== null) {
						clearTimeout(turnTimer);
						turnTimer = null;
					}
				}

				const assistantTurn = appendAssistantTurn(
					responseText,
					toolCalls.length > 0 ? toolCalls : undefined,
				);
				onTurnComplete?.(assistantTurn);

				if (toolCalls.length === 0 || !toolHandler) {
					status = "completed";
					return;
				}

				for (const tc of toolCalls) {
					if (signal.aborted) {
						status = timeoutError ? "error" : "aborted";
						return;
					}

					try {
						const result = await toolHandler(tc.name, tc.args);
						appendToolTurn(tc.callId, result);
						tc.result = result;
					} catch (err) {
						appendToolTurn(tc.callId, { error: String(err) });
						tc.isError = true;
					}
				}
			}

			status = "completed";
		} catch (err) {
			error = err instanceof Error ? err : new Error(String(err));
			status = "error";
		} finally {
			if (turnTimer !== null) {
				clearTimeout(turnTimer);
				turnTimer = null;
			}
			abortController = null;
		}
	}

	return {
		get status() {
			return status;
		},
		get currentTurn() {
			return currentTurn;
		},
		get messages() {
			return store.active?.turns ?? [];
		},
		get error() {
			return error;
		},

		start(input: string) {
			if (status === "running") return;
			status = "idle";
			error = null;
			currentTurn = 0;
			runLoop(input);
		},

		abort() {
			abortController?.abort();
		},
	};
}
