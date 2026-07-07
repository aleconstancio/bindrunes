# E-commerce Storefront Template

A product listing page and product detail page for an online store.

## How to Run

```bash
bun install
bun run dev
```

## Key Components Used

- `Card` — Product cards with header snippets for image and content
- `Button` — Add to Cart, Buy Now, and navigation buttons
- `Badge` — Product badges (Best Seller, New, etc.) and discount labels
- `Separator` — Visual dividers
- `Input` — Search bar in header

## What It Demonstrates

- Flat Card API with `{#snippet header()}` for product image sections
- Dynamic routing with SvelteKit (`/product/[id]`)
- Star rating display with conditional classes
- Responsive product grid layout
- Sticky header with backdrop blur
