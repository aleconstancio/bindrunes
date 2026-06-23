export interface ChatMessage {
	id: string;
	content: string;
	sender: "user" | "assistant";
	timestamp?: string;
}

export interface ToolCall {
	id: string;
	name: string;
	args?: unknown;
	result?: unknown;
	status: "pending" | "completed" | "error";
}

export interface ReasoningStep {
	text: string;
	confidence?: number;
}

export interface ChatMemoryRef {
	id: string;
	preview: string;
	estimatedTokens: number;
	pinned: boolean;
}
