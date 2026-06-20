export interface Message {
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

export interface MemoryRef {
	id: string;
	preview: string;
	tokens: number;
}
