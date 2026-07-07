# CRUD Admin Template

A user management CRUD interface with search, selection, and a create/edit dialog modal.

## How to Run

```bash
bun install
bun run dev
```

## Key Components Used

- `Card` — Content containers with header snippets
- `Dialog` — Create/edit modal with title, header, and actions snippets
- `Button` — Actions, toolbar, and form submit buttons
- `Badge` — Status and selection count indicators
- `Input` — Search and form fields with `bind:value`
- `Select` — Role dropdown with `options` array prop
- `Checkbox` — Row selection with `bind:checked`

## What It Demonstrates

- Flat Card API with `{#snippet header()}` pattern
- Flat Dialog API with `bind:open`, `title`, `header`, and `actions` snippets
- Select component with `options` array (not child `<option>` elements)
- Reactive filtering with `$derived`
- Set-based selection state management
