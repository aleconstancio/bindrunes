<script lang="ts">
import AgentStatus from "./AgentStatus.svelte";
import ChatInput from "./ChatInput.svelte";
import ChatThread from "./ChatThread.svelte";
import MemoryDisplay from "./MemoryDisplay.svelte";
import ReasoningPanel from "./ReasoningPanel.svelte";
import ToolCallDisplay from "./ToolCallDisplay.svelte";
import TypingIndicator from "./TypingIndicator.svelte";
import type { ChatMemoryRef, ChatMessage, ReasoningStep, ToolCall } from "./types";

interface Props {
	messages?: ChatMessage[];
	toolCalls?: ToolCall[];
	reasoningSteps?: ReasoningStep[];
	memory?: {
		working: ChatMemoryRef[];
		episodic: ChatMemoryRef[];
		semantic: ChatMemoryRef[];
	};
	agentState?: "idle" | "thinking" | "executing" | "error";
	tokenUsage?: { prompt: number; completion: number };
	elapsedMs?: number;
	isTyping?: boolean;
	onSendMessage?: (message: string) => void;
	onCancel?: () => void;
	class?: string;
}

let {
	messages = [],
	toolCalls = [],
	reasoningSteps = [],
	memory = { working: [], episodic: [], semantic: [] },
	agentState = "idle",
	tokenUsage,
	elapsedMs,
	isTyping = false,
	onSendMessage,
	onCancel,
	class: className = "",
}: Props = $props();
</script>

<div class="flex h-full {className}">
	<!-- Main Chat Area -->
	<div class="flex-1 flex flex-col">
		<div class="flex-1 overflow-y-auto p-4">
			<ChatThread {messages} />
			{#if isTyping}
				<TypingIndicator />
			{/if}
		</div>
		<ChatInput onSend={onSendMessage} placeholder="Type a message..." />
	</div>

	<!-- Sidebar -->
	<div class="w-80 border-l border-border flex flex-col">
		<!-- Agent Status -->
		<div class="p-4 border-b border-border">
			<h3 class="text-title-3 text-foreground mb-2">Status</h3>
			<AgentStatus state={agentState} {tokenUsage} {elapsedMs} {onCancel} />
		</div>

		<!-- Tool Calls -->
		{#if toolCalls.length > 0}
			<div class="p-4 border-b border-border">
				<h3 class="text-title-3 text-foreground mb-2">Tool Calls</h3>
				<div class="space-y-2">
					{#each toolCalls as call}
						<ToolCallDisplay
							name={call.name}
							args={call.args}
							result={call.result}
							status={call.status}
						/>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Reasoning -->
		{#if reasoningSteps.length > 0}
			<div class="p-4 border-b border-border">
				<ReasoningPanel steps={reasoningSteps} />
			</div>
		{/if}

		<!-- Memory -->
		{#if memory.working.length > 0 || memory.episodic.length > 0 || memory.semantic.length > 0}
			<div class="p-4 flex-1 overflow-y-auto">
				<h3 class="text-title-3 text-foreground mb-2">Memory</h3>
				<MemoryDisplay
					working={memory.working}
					episodic={memory.episodic}
					semantic={memory.semantic}
				/>
			</div>
		{/if}
	</div>
</div>