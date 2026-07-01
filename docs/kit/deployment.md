# Deployment

## Vercel

The default adapter is `@sveltejs/adapter-auto`, which works with Vercel out of the box. Connect your repo to Vercel and it will detect SvelteKit automatically.

```bash
npm run build
```

## Firebase Hosting

Use the `firebaseConfig` helper from `bindrunes-kit`:

```ts
// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { firebaseConfig } from "bindrunes-kit/adapters/firebase";

const { config } = firebaseConfig({ site: "my-project" });

export default {
  kit: {
    adapter: adapter(config),
  },
};
```

Deploy:

```bash
npm run build
firebase deploy
```

## Node.js Server

Switch to `adapter-node`:

```bash
npx sv add @sveltejs/adapter-node
```

```ts
// svelte.config.js
import adapter from "@sveltejs/adapter-node";

export default {
  kit: {
    adapter: adapter({ out: "build" }),
  },
};
```

Build and run:

```bash
npm run build
node build/index.js
```

## Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["node", "build/index.js"]
```

## Monorepo Deployment (Vercel)

The bindrunes monorepo deploys the showcase app to Vercel on every push to main.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token (generate at vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Team/org ID (from `.vercel/project.json`) |
| `VERCEL_PROJECT_ID` | Project ID (from `.vercel/project.json`) |

### Build Pipeline

1. `bunx turbo run build --filter=bindrunes` — Build the library first (showcase depends on it)
2. `npx vercel pull --yes --environment=preview` — Link project and pull env config
3. `npx vercel build` — Build the showcase for Vercel
4. `npx vercel deploy --prebuilt` — Deploy the pre-built output

Preview deploys run on PRs. Production deploys run on push to `main`.

### Local Setup

```bash
cd examples/showcase
npx vercel link    # Links to the Vercel project
npx vercel         # Starts local dev with Vercel env
```

### Team Protection

If the Vercel team has deployment protection enabled, public URLs will redirect to login. Disable it at:
- Team settings: `vercel.com/<team>/~/settings/security`
- Or add the deployment URL to the allowlist

## Environment Variables

Set environment variables for your deployment target:

```bash
# API URL (SPA mode)
VITE_API_URL=https://api.yourdomain.com

# Session secret (if using server-side auth)
SESSION_SECRET=your-secret-key
```
