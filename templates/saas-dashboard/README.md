# SaaS Dashboard Template

A multi-page SaaS dashboard with stats overview, activity feed, and settings page with tabs.

## How to Run

```bash
bun install
bun run dev
```

## Key Components Used

- `Card` — Stats cards and content sections with header snippets
- `Badge` — Activity type badges
- `Button` — Navigation and action buttons
- `Separator` — Visual dividers between activity items
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — Settings page tab navigation
- `Input` — Form fields with label prop

## What It Demonstrates

- Multi-page routing with SvelteKit (`/dashboard`, `/settings`)
- Flat Tabs API with `bind:value` for tab state
- Card header snippet for custom header layouts
- Responsive stat card grid layout
- Settings form with multiple tab panels
