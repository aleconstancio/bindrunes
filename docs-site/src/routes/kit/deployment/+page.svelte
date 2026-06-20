<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Deployment</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Deploy to Vercel, Firebase, Node.js, or Docker.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Vercel</h2>
      <p class="text-body text-muted-foreground mb-4">
        The default adapter is <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">@sveltejs/adapter-auto</code>, which works with Vercel out of the box.
      </p>
      <CodeSnippet language="bash" title="Terminal">
{`npm run build`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Firebase Hosting</h2>
      <p class="text-body text-muted-foreground mb-4">
        Use the <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">firebaseConfig</code> helper from bindrunes-kit:
      </p>
      <CodeSnippet language="ts" title="svelte.config.js">
{`import adapter from "@sveltejs/adapter-static";
import { firebaseConfig } from "bindrunes-kit/adapters/firebase";

const { config } = firebaseConfig({ site: "my-project" });

export default {
  kit: {
    adapter: adapter(config),
  },
};`}
      </CodeSnippet>
      <CodeSnippet language="bash" title="Deploy">
{`npm run build
firebase deploy`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Node.js Server</h2>
      <p class="text-body text-muted-foreground mb-4">Switch to <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">adapter-node</code>:</p>
      <CodeSnippet language="bash" title="Terminal">
{`npx sv add @sveltejs/adapter-node`}
      </CodeSnippet>
      <CodeSnippet language="ts" title="svelte.config.js">
{`import adapter from "@sveltejs/adapter-node";

export default {
  kit: {
    adapter: adapter({ out: "build" }),
  },
};`}
      </CodeSnippet>
      <CodeSnippet language="bash" title="Build and run">
{`npm run build
node build/index.js`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Docker</h2>
      <CodeSnippet language="dockerfile" title="Dockerfile">
{`FROM node:20-alpine AS builder
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
CMD ["node", "build/index.js"]`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Environment Variables</h2>
      <CodeSnippet language="bash" title=".env">
{`# API URL (SPA mode)
VITE_API_URL=https://api.yourdomain.com

# Session secret (if using server-side auth)
SESSION_SECRET=your-secret-key`}
      </CodeSnippet>
    </section>
  </div>
</div>
