# AI Chatbot Template

A chat interface template built with bindrunes, demonstrating a sidebar conversation list with a main chat area.

## How to Run

```bash
bun install
bun run dev
```

## Key Components Used

- `Card` — Chat message bubbles
- `Button` — Send and action buttons
- `Badge` — Online status indicator
- `Avatar` — User/assistant avatars
- `Input` — Message input and search

## What It Demonstrates

- Flat bindrunes component APIs (no compound components)
- `AppProvider` layout wrapper pattern
- Two-column layout with sidebar and main content
- Form handling with `bind:value` on Input
- Conditional styling with Svelte `{#if}` blocks
