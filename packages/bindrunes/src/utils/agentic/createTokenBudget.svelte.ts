import type { MemoryLayer } from "../../types/agent.js";

export interface TokenUsage {
	readonly prompt: number;
	readonly completion: number;
	readonly layer?: MemoryLayer;
}

export interface TokenBudgetPolicy {
	readonly cap: number;
}

export interface TokenBudget {
	readonly used: number;
	readonly cap: number;
	readonly remaining: number;
	readonly overflow: boolean;
	readonly working: number;
	readonly episodic: number;
	readonly semantic: number;
	record(usage: TokenUsage): void;
	reset(): void;
}

function roundToInt(n: number): number {
	return Math.round(n);
}

function layerToField(layer: MemoryLayer): "working" | "episodic" | "semantic" {
	return layer;
}

export function createTokenBudget(policy: TokenBudgetPolicy): TokenBudget {
	let used = $state(0);
	let working = $state(0);
	let episodic = $state(0);
	let semantic = $state(0);
	const cap = policy.cap;

	return {
		get used() {
			return used;
		},
		get cap() {
			return cap;
		},
		get remaining() {
			return Math.max(0, cap - used);
		},
		get overflow() {
			return used > cap;
		},
		get working() {
			return working;
		},
		get episodic() {
			return episodic;
		},
		get semantic() {
			return semantic;
		},
		record(usage) {
			const tokens = roundToInt(usage.prompt) + roundToInt(usage.completion);
			used += tokens;
			const layer = usage.layer ?? "episodic";
			switch (layerToField(layer)) {
				case "working":
					working += tokens;
					break;
				case "episodic":
					episodic += tokens;
					break;
				case "semantic":
					semantic += tokens;
					break;
			}
		},
		reset() {
			used = 0;
			working = 0;
			episodic = 0;
			semantic = 0;
		},
	};
}
