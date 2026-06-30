<script lang="ts">
  import { Card, Button, Badge, Avatar, Input } from "bindrunes";
  import { Send, Plus, Search, Bot, User } from "lucide-svelte";

  const conversations = [
    { id: 1, title: "Getting started with Svelte 5", lastMessage: "2 min ago", active: true },
    { id: 2, title: "Debugging server-side rendering", lastMessage: "1 hour ago", active: false },
    { id: 3, title: "Optimizing bundle size", lastMessage: "3 hours ago", active: false },
    { id: 4, title: "Setting up authentication", lastMessage: "Yesterday", active: false },
  ];

  const messages = [
    { role: "user" as const, content: "How do I create a reusable component in Svelte 5?" },
    { role: "assistant" as const, content: "In Svelte 5, you create reusable components using runes. The $props() rune replaces the old export let syntax. You define the component's API by destructuring the props object with TypeScript types." },
    { role: "user" as const, content: "Can I use snippets for slot-like patterns?" },
    { role: "assistant" as const, content: "Yes! Svelte 5 snippets replace slots. Snippets are more powerful than slots because they can be passed as props and used with the @render tag." },
  ];

  let inputValue = $state("");
</script>

<div class="flex h-screen bg-background">
  <aside class="w-72 border-r border-border flex flex-col">
    <div class="p-4 border-b border-border">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-bold text-foreground">Chats</h2>
        <Button size="sm" variant="outline">
          <Plus class="h-4 w-4" />
        </Button>
      </div>
      <div class="relative">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search conversations..." class="pl-8" />
      </div>
    </div>
    <div class="flex-1 overflow-y-auto p-2">
      {#each conversations as convo}
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a
          href="/"
          class="flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors
            {convo.active
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
        >
          <Bot class="mt-0.5 h-4 w-4 shrink-0" />
          <div class="min-w-0">
            <p class="truncate font-medium">{convo.title}</p>
            <p class="text-xs {convo.active ? 'text-primary-foreground/70' : 'text-muted-foreground'}">{convo.lastMessage}</p>
          </div>
        </a>
      {/each}
    </div>
  </aside>

  <main class="flex flex-col flex-1">
    <header class="border-b border-border p-4 flex items-center gap-3">
      <Avatar>
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
          AI
        </div>
      </Avatar>
      <div>
        <h3 class="font-semibold text-foreground">AI Assistant</h3>
        <p class="text-xs text-muted-foreground">
          <Badge variant="success" class="mr-1">Online</Badge>
          Ready to help
        </p>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      {#each messages as msg}
        <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
          <div class="flex items-start gap-2 max-w-[70%]">
            {#if msg.role === 'assistant'}
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot class="h-4 w-4" />
              </div>
            {/if}
            <div class="rounded-lg px-4 py-2 text-sm {msg.role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'}">
              <p class="whitespace-pre-wrap">{msg.content}</p>
            </div>
            {#if msg.role === 'user'}
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <User class="h-4 w-4 text-muted-foreground" />
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <div class="border-t border-border p-4">
      <form
        class="flex items-center gap-2"
        onsubmit={(e) => {
          e.preventDefault();
          inputValue = "";
        }}
      >
        <Input
          bind:value={inputValue}
          placeholder="Type your message..."
          class="flex-1"
        />
        <Button type="submit" disabled={!inputValue.trim()}>
          <Send class="h-4 w-4" />
        </Button>
      </form>
    </div>
  </main>
</div>
