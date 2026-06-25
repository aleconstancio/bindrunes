// src/utils/agentic/SimulatorRuntime.ts
// Reference implementation of the AgentRuntime contract for tests and offline
// development. Reads scripted Delta streams; respects AbortSignal; never
// touches the network.

import type { AgentRuntime, CompletionRequest, Delta, ToolSpec } from "../../types/agent";
import { isTerminalDelta } from "../../types/agent";

export interface SimulatorRuntimeOptions {
	readonly script: ReadonlyArray<Delta>;
	readonly delayMs?: number;
}

export class SimulatorRuntime implements AgentRuntime {
	readonly tools: ReadonlyArray<ToolSpec> = [];
	private readonly script: ReadonlyArray<Delta>;
	private readonly delayMs: number;

	constructor(options: SimulatorRuntimeOptions) {
		this.script = options.script;
		this.delayMs = options.delayMs ?? 0;
	}

	async *complete(_req: CompletionRequest, signal: AbortSignal): AsyncIterable<Delta> {
		if (signal.aborted) {
			return;
		}

		let cancelled = false;
		const onAbort = () => {
			cancelled = true;
		};
		signal.addEventListener("abort", onAbort, { once: true });

		try {
			if (this.script.length === 0) return;
			for (const delta of this.script) {
				if (cancelled) {
					yield { kind: "done", finishReason: "cancel" };
					return;
				}
				if (this.delayMs > 0) {
					await delay(this.delayMs, signal);
					if (cancelled) {
						yield { kind: "done", finishReason: "cancel" };
						return;
					}
				}
				yield delta;
				if (isTerminalDelta(delta)) return;
			}
			// Script had content but did not end with a terminal delta — synthesise one.
			if (!cancelled) {
				yield { kind: "done", finishReason: "stop" };
			}
		} finally {
			signal.removeEventListener("abort", onAbort);
		}
	}
}

function delay(ms: number, signal: AbortSignal): Promise<void> {
	return new Promise((resolve) => {
		if (signal.aborted) return resolve();
		const t = setTimeout(() => {
			signal.removeEventListener("abort", onAbort);
			resolve();
		}, ms);
		const onAbort = () => {
			clearTimeout(t);
			signal.removeEventListener("abort", onAbort);
			resolve();
		};
		signal.addEventListener("abort", onAbort, { once: true });
	});
}
