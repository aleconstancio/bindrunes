<script lang="ts">
	import { PageHeader } from "bindrunes/layouts";
	import { Card, Button, Collapsible, CodeSnippet } from "bindrunes";
	import { ChatTemplate } from "bindrunes/layouts";
	import { ChatThread, ChatInput, ConversationList, TypingIndicator } from "bindrunes/domains/chat";
	import { RealtimeClient } from "bindrunes";
	import type { RealtimeEvent } from "bindrunes";

	const conversations = [
		{ id: "1", name: "Alice Johnson", lastMessage: "Hey, how's the project going?", timestamp: "2m", unread: 2 },
		{ id: "2", name: "Bob Smith", lastMessage: "The deployment is complete", timestamp: "15m" },
		{ id: "3", name: "Charlie Brown", lastMessage: "Can you review my PR?", timestamp: "1h" },
		{ id: "4", name: "Diana Prince", lastMessage: "Meeting at 3pm tomorrow", timestamp: "3h" },
	];

	const messages = [
		{ id: "1", content: "Hey! How's the new component library going?", sender: "user" as const, timestamp: "10:30 AM" },
		{ id: "2", content: "It's going great! We just added 32 new components across 12 categories.", sender: "assistant" as const, timestamp: "10:31 AM" },
		{ id: "3", content: "That's impressive! What categories did you add?", sender: "user" as const, timestamp: "10:32 AM" },
		{ id: "4", content: "We added e-commerce, media, calendar, and chat components. Plus improved the existing auth, dashboard, and settings patterns.", sender: "assistant" as const, timestamp: "10:33 AM" },
		{ id: "5", content: "Can't wait to try them out!", sender: "user" as const, timestamp: "10:34 AM" },
	];

	let selectedConversation = $state("1");
	let chatMessages = $state(messages);
	let isTyping = $state(false);
	let realtimeStatus = $state<RealtimeClient["status"]>("disconnected");
	let realtimeEvents = $state<RealtimeEvent[]>([]);

	function handleSend(message: string) {
		chatMessages = [...chatMessages, {
			id: String(chatMessages.length + 1),
			content: message,
			sender: "user",
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		}];

		isTyping = true;

		setTimeout(() => {
			isTyping = false;
			chatMessages = [...chatMessages, {
				id: String(chatMessages.length + 1),
				content: "Thanks for your message! I'm a demo assistant. In a real app, this would be connected to an AI backend.",
				sender: "assistant",
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			}];
		}, 1500);
	}

	// --- RealtimeClient mock demo ---
	const mockEvents: RealtimeEvent[] = [
		{ id: "evt-1", type: "message.new", data: { text: "Hello from SSE stream" }, seq: 1 },
		{ id: "evt-2", type: "user.typing", data: { userId: "alice" }, seq: 2 },
		{ id: "evt-3", type: "message.read", data: { messageId: "msg-42", readBy: "bob" }, seq: 3 },
		{ id: "evt-4", type: "presence.update", data: { userId: "alice", online: true }, seq: 4 },
		{ id: "evt-5", type: "SYNC_GAP", data: { reason: "sequence break" }, seq: 5 },
	];

	let mockClient: RealtimeClient | null = $state(null);
	let mockConnected = $state(false);
	let mockGapDetected = $state(false);
	let mockEventLog = $state<RealtimeEvent[]>([]);

	function startMockRealtime() {
		if (mockClient) return;

		let seq = 0;
		const interval = setInterval(() => {
			if (seq >= mockEvents.length) {
				clearInterval(interval);
				return;
			}
			const event = mockEvents[seq++];
			mockEventLog = [...mockEventLog, event];
			if (event.type === "SYNC_GAP") {
				mockGapDetected = true;
				setTimeout(() => { mockGapDetected = false; }, 5000);
			}
		}, 800);

		mockClient = new RealtimeClient({
			url: "https://example.com/sse",
			onEvent: () => {},
			onError: () => {},
		});

		// Force state for demo
		mockConnected = true;
		realtimeStatus = "connected";
	}

	function stopMockRealtime() {
		if (mockClient) {
			mockClient.disconnect();
			mockClient = null;
		}
		mockConnected = false;
		realtimeStatus = "disconnected";
		mockEventLog = [];
		mockGapDetected = false;
	}

	const statusColors: Record<string, string> = {
		connected: "bg-success",
		reconnecting: "bg-warning",
		degraded: "bg-warning",
		disconnected: "bg-muted",
	};
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Chat Components" description="AI chat interface with threads, messages, and conversation list" />

	<!-- Typing Indicator demo embedded in chat -->
	<Card padding class="max-w-2xl mx-auto">
		<h3 class="text-title-3 text-foreground mb-2">TypingIndicator</h3>
		<p class="text-body-sm text-muted-foreground mb-4">Animated dots shown while the assistant is composing a reply.</p>
		<div class="space-y-3 rounded-lg border border-border p-4 bg-background min-h-[60px]">
			{#if isTyping}
				<TypingIndicator />
			{:else}
				<p class="text-body-sm text-muted-foreground italic">Send a message to see the typing indicator…</p>
			{/if}
		</div>
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { ChatThread, ChatInput, TypingIndicator } from "bindrunes/domains/chat";\n\nlet isTyping = $state(false);\nlet messages = $state([]);\n\nfunction handleSend(message: string) {\n  messages = [...messages, { id: String(Date.now()), content: message, sender: "user", timestamp: "now" }];\n  isTyping = true;\n  setTimeout(() => {\n    isTyping = false;\n    messages = [...messages, { id: String(Date.now()), content: "Response", sender: "assistant", timestamp: "now" }];\n  }, 1500);\n}\n\n<ChatThread messages={messages} />\n{#if isTyping}\n  <TypingIndicator />\n{/if}\n<ChatInput onSend={handleSend} placeholder="Type a message..." />`}
				language="svelte"
				title="Chat Interface"
			/>
		</div>
	</Collapsible>

	<ChatTemplate title="Chat">
		{#snippet conversationList()}
			<div class="p-4">
				<h3 class="text-title-3 text-foreground mb-3">Conversations</h3>
				<ConversationList {conversations} bind:selectedId={selectedConversation} />
			</div>
		{/snippet}

		{#snippet chatHeader()}
			<h3 class="text-title-3 text-foreground">Chat</h3>
		{/snippet}

		<div class="flex flex-col h-full">
			<ChatThread messages={chatMessages} class="flex-1 min-h-0" />
			{#if isTyping}
				<div class="px-4 pb-2">
					<TypingIndicator />
				</div>
			{/if}
			<ChatInput onSend={handleSend} placeholder="Type a message..." />
		</div>
	</ChatTemplate>

	<!-- RealtimeClient mock -->
	<Card padding class="max-w-2xl mx-auto">
		<div class="flex items-center justify-between mb-2">
			<h3 class="text-title-3 text-foreground">RealtimeClient (Mock)</h3>
			<div class="flex items-center gap-2">
				<span class="inline-block w-2.5 h-2.5 rounded-full {statusColors[realtimeStatus]}"></span>
				<span class="text-body-sm text-muted-foreground capitalize">{realtimeStatus}</span>
			</div>
		</div>
		<p class="text-body-sm text-muted-foreground mb-4">Simulated SSE event stream with status tracking.</p>

		{#if !mockConnected}
			<Button variant="primary" size="sm" onclick={startMockRealtime}>Start Stream</Button>
		{:else}
			<div class="flex items-center gap-3 mb-4">
				<Button variant="destructive" size="sm" onclick={stopMockRealtime}>Stop Stream</Button>
				{#if mockGapDetected}
					<span class="text-label-xs text-warning font-medium">Sync gap detected</span>
				{/if}
			</div>
		{/if}

		<div class="rounded-lg border border-border bg-muted/30 p-3 max-h-[240px] overflow-y-auto font-mono text-label-xs space-y-1.5">
			{#if mockEventLog.length === 0}
				<p class="text-muted-foreground italic">No events yet.</p>
			{/if}
			{#each mockEventLog as event}
				<div class="flex items-start gap-2">
					<span class="text-muted-foreground">#{event.seq}</span>
					<span class="text-primary font-semibold">{event.type}</span>
					<span class="text-muted-foreground break-all">{JSON.stringify(event.data)}</span>
				</div>
			{/each}
		</div>
	</Card>
	<Collapsible>
		{#snippet trigger()}
			<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
		{/snippet}
		<div class="space-y-2 mt-2">
			<CodeSnippet
				code={`import { RealtimeClient } from "bindrunes";\nimport type { RealtimeEvent } from "bindrunes";\n\nconst client = new RealtimeClient({\n  url: "https://example.com/sse",\n  onEvent: (event) => console.log("Event:", event),\n  onError: (err) => console.error("Error:", err),\n});\n\nclient.connect();\n// Status: "connected" | "reconnecting" | "degraded" | "disconnected"\nconsole.log(client.status);\n\n// Cleanup\nclient.disconnect();`}
				language="svelte"
				title="RealtimeClient"
			/>
		</div>
	</Collapsible>
</div>
