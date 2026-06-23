export type RiskLevel = "critical" | "high" | "medium" | "low";
export type ChainStatus = "idle" | "running" | "waiting_gate" | "done" | "error";
export type StepStatus = "pending" | "executing" | "done" | "error";

export interface CopilotMessage {
	id: string;
	content: string;
	role: "user" | "agent";
	timestamp: Date;
	toolCalls?: CopilotToolCall[];
}

export interface CopilotToolCall {
	tool: string;
	status: StepStatus;
	result?: unknown;
	error?: string;
}

export interface CopilotChainStep {
	tool: string;
	description?: string;
	status: StepStatus;
}

export interface CopilotChain {
	name: string;
	status: ChainStatus;
	steps: CopilotChainStep[];
}

export interface SuggestionAction {
	label: string;
	tool: string;
	params?: Record<string, unknown>;
}

export interface CopilotSuggestion {
	id: string;
	title: string;
	description: string;
	risk: RiskLevel;
	actions: SuggestionAction[];
}

export interface CopilotContextLayer {
	name: string;
	tokens: number;
}

export interface CopilotArtifactRef {
	id: string;
	name: string;
	type: string;
}

export interface ToolCategory {
	id: string;
	label: string;
	tools: Array<{
		id: string;
		label: string;
		description: string;
		icon?: unknown;
		params: Record<string, unknown>;
	}>;
}

export interface DebateTurn {
	round: number;
	agent: "Analista" | "Crítico";
	content: string;
	approved?: boolean;
	confidence?: number;
	details?: string;
}
