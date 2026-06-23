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

## Environment Variables

Set environment variables for your deployment target:

```bash
# API URL (SPA mode)
VITE_API_URL=https://api.yourdomain.com

# Session secret (if using server-side auth)
SESSION_SECRET=your-secret-key
```
