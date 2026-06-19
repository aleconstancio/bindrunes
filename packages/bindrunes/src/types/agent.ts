// src/types/agent.ts
// bindrunes agentic-chat contract types — the interchange surface.
// Pure declarations. No runtime. Consumers implement `AgentRuntime`;
// bindrunes ships a `SimulatorRuntime` for tests and offline dev.

declare const windowIdBrand: unique symbol;
export type WindowId = string & { readonly [windowIdBrand]: "WindowId" };

export const toWindowId = (s: string): WindowId => s as WindowId;

export type FinishReason = "stop" | "length" | "tool" | "cancel";

// ─── Streaming event union ────────────────────────────────────────────────────
// `complete()` yields these. Consumers must be prepared to handle any of them
// in any order, and may receive a `done` *without* seeing the model finish a
// sentence if the call is cancelled.

export type Delta =
	| { kind: "token"; text: string }
	| { kind: "tool_call"; callId: string; name: string; args: unknown }
	| { kind: "tool_result"; callId: string; result: unknown; isError?: boolean }
	| { kind: "reasoning"; text: string }
	| { kind: "usage"; prompt: number; completion: number }
	| { kind: "error"; message: string; recoverable: boolean }
	| { kind: "done"; finishReason: FinishReason };

export const isTerminalDelta = (d: Delta): boolean => d.kind === "done" || d.kind === "error";

// ─── Tool descriptions ────────────────────────────────────────────────────────

export interface ToolSpec {
	readonly name: string;
	readonly description: string;
	// The runtime-specific JSON Schema for the tool's arguments. Consumers
	// validate with valibot in their own tool implementations; this is the
	// model-facing shape.
	readonly parameters: Record<string, unknown>;
}

// ─── Completion request ──────────────────────────────────────────────────────

export interface Message {
	readonly role: "system" | "user" | "assistant" | "tool";
	readonly content: string;
	readonly name?: string;
	readonly toolCallId?: string;
}

export interface CompletionRequest {
	readonly messages: ReadonlyArray<Message>;
	readonly tools?: ReadonlyArray<ToolSpec>;
	readonly temperature?: number;
	readonly maxTokens?: number;
	readonly signal?: AbortSignal;
}

// ─── Runtime contract ─────────────────────────────────────────────────────────

export interface AgentRuntime {
	readonly tools: ReadonlyArray<ToolSpec>;
	complete(req: CompletionRequest, signal: AbortSignal): AsyncIterable<Delta>;
	embed?(input: string, signal: AbortSignal): Promise<Float32Array>;
}

// ─── Memory layer classification ──────────────────────────────────────────────

export type MemoryLayer = "working" | "episodic" | "semantic";

// ─── Semantic-memory reference ────────────────────────────────────────────────

export interface MemoryRef {
	readonly id: string;
	readonly preview: string;
	readonly estimatedTokens: number;
	readonly pinned: boolean;
}

// ─── Turn = one conversational exchange ──────────────────────────────────────

export type TurnRole = "user" | "assistant" | "system" | "tool";

export interface Turn {
	readonly id: string;
	readonly role: TurnRole;
	readonly content: string;
	readonly toolCalls?: ReadonlyArray<{
		readonly callId: string;
		readonly name: string;
		readonly args: unknown;
		readonly result?: unknown;
		readonly isError?: boolean;
	}>;
	readonly createdAt: number;
	readonly estimatedTokens: number;
	readonly memoryLayer: MemoryLayer;
}

// ─── Eviction policy ──────────────────────────────────────────────────────────

export type EvictionPolicy =
	| { kind: "sliding"; keepLast: number }
	| { kind: "pinned-summary"; summaryTurnIds: ReadonlyArray<string> }
	| { kind: "none" };

// ─── Window = first-class context window ──────────────────────────────────────

export interface Window<TState = unknown> {
	readonly id: WindowId;
	readonly parentId: WindowId | null;
	readonly state: TState;
	readonly turns: ReadonlyArray<Turn>;
	readonly semanticRefs: ReadonlyArray<MemoryRef>;
	readonly budget: { used: number; cap: number };
	readonly policy: EvictionPolicy;
	readonly lineage: { children: ReadonlyArray<WindowId> };
	readonly createdAt: number;
	readonly updatedAt: number;
}

// ─── Compaction (pure structural, no LLM in defaults) ────────────────────────

export interface CompactionPlan {
	readonly strategyId: string;
	readonly dropTurnIds: ReadonlyArray<string>;
	readonly pinnedTurnIds: ReadonlyArray<string>;
	readonly summary?: string;
	readonly estimatedTokensAfter: number;
}

export interface CompactionStrategy {
	readonly id: string;
	plan(window: Window, budget: { used: number; cap: number }): CompactionPlan;
	apply?(window: Window, plan: CompactionPlan): Promise<Window>;
}
