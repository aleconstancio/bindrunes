#!/usr/bin/env node

import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, "..", "..", "templates");

type Mode = "full-stack" | "spa-backend";
type Feature = "auth" | "crud" | "billing" | "realtime" | "i18n";
type Deployment = "vercel" | "firebase" | "node" | "docker";

interface ProjectConfig {
	name: string;
	mode: Mode;
	features: Feature[];
	deployment: Deployment;
}

const FEATURES: { value: Feature; label: string; description: string }[] = [
	{ value: "auth", label: "Authentication", description: "Login, signup, session management" },
	{ value: "crud", label: "CRUD Operations", description: "Database models, API routes, forms" },
	{
		value: "billing",
		label: "Billing / Payments",
		description: "Stripe integration, pricing pages",
	},
	{
		value: "realtime",
		label: "Realtime Updates",
		description: "WebSocket subscriptions, live data",
	},
	{
		value: "i18n",
		label: "Internationalization",
		description: "Multi-language support, locale routing",
	},
];

const DEPLOYMENTS: { value: Deployment; label: string; adapter: string }[] = [
	{ value: "vercel", label: "Vercel", adapter: "@sveltejs/adapter-vercel" },
	{ value: "firebase", label: "Firebase", adapter: "@sveltejs/adapterfirebase" },
	{ value: "node", label: "Node.js (self-hosted)", adapter: "@sveltejs/adapter-node" },
	{ value: "docker", label: "Docker", adapter: "@sveltejs/adapter-node" },
];

async function prompt(rl: ReturnType<typeof createInterface>, question: string): Promise<string> {
	const answer = await rl.question(question);
	return answer.trim();
}

async function promptChoice(
	rl: ReturnType<typeof createInterface>,
	question: string,
	choices: { value: string; label: string }[],
): Promise<string> {
	console.log(`\n${question}`);
	choices.forEach((c, i) => {
		console.log(`  ${i + 1}) ${c.label}`);
	});

	while (true) {
		const answer = await prompt(rl, `\nSelect (1-${choices.length}): `);
		const idx = Number.parseInt(answer, 10) - 1;
		if (idx >= 0 && idx < choices.length) {
			return choices[idx].value;
		}
		console.log(`Invalid choice. Enter a number between 1 and ${choices.length}.`);
	}
}

async function promptMultiSelect(
	rl: ReturnType<typeof createInterface>,
	question: string,
	choices: { value: string; label: string; description: string }[],
): Promise<string[]> {
	console.log(`\n${question}`);
	choices.forEach((c, i) => {
		console.log(`  ${i + 1}) ${c.label} - ${c.description}`);
	});
	console.log(`  (enter comma-separated numbers, e.g. 1,3,5)`);

	while (true) {
		const answer = await prompt(rl, `\nSelect features: `);
		if (!answer) {
			console.log("Select at least one feature.");
			continue;
		}
		const indices = answer.split(",").map((s) => Number.parseInt(s.trim(), 10) - 1);
		const valid = indices.every((i) => i >= 0 && i < choices.length);
		if (valid) {
			return [...new Set(indices.map((i) => choices[i].value))];
		}
		console.log(`Invalid selection. Enter numbers between 1 and ${choices.length}.`);
	}
}

async function collectConfig(): Promise<ProjectConfig> {
	const rl = createInterface({ input: stdin, output: stdout });

	try {
		const args = process.argv.slice(2);
		let name = args[0];

		if (!name) {
			name = await prompt(rl, "Project name: ");
			if (!name) {
				console.log("Project name is required.");
				process.exit(1);
			}
		}

		const mode = (await promptChoice(rl, "Select mode:", [
			{ value: "full-stack", label: "Full-stack (SSR + API routes)" },
			{ value: "spa-backend", label: "SPA + Backend (separate API)" },
		])) as Mode;

		const features = (await promptMultiSelect(rl, "Select features:", FEATURES)) as Feature[];

		const deployment = (await promptChoice(
			rl,
			"Select deployment target:",
			DEPLOYMENTS,
		)) as Deployment;

		return { name, mode, features, deployment };
	} finally {
		rl.close();
	}
}

async function copyTemplate(targetDir: string, mode: Mode): Promise<void> {
	const templateDir = join(TEMPLATES_DIR, mode);
	await cp(templateDir, targetDir, { recursive: true });
}

async function patchPackageJson(targetDir: string, config: ProjectConfig): Promise<void> {
	const pkgPath = join(targetDir, "package.json");
	const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));

	pkg.name = config.name;

	const deploy = DEPLOYMENTS.find((d) => d.value === config.deployment);
	if (!deploy) throw new Error(`Unknown deployment: ${config.deployment}`);
	pkg.dependencies[deploy.adapter] = "^3.0.0";

	if (config.features.includes("auth")) {
		pkg.dependencies["lucia"] = "^3.0.0";
		pkg.dependencies["oslo"] = "^1.0.0";
	}
	if (config.features.includes("crud")) {
		pkg.dependencies["drizzle-orm"] = "^0.30.0";
		pkg.devDependencies["drizzle-kit"] = "^0.20.0";
		pkg.devDependencies[config.deployment === "firebase" ? "better-sqlite3" : "postgres"] =
			"^3.0.0";
	}
	if (config.features.includes("billing")) {
		pkg.dependencies["stripe"] = "^14.0.0";
	}
	if (config.features.includes("realtime")) {
		pkg.dependencies["ably"] = "^1.0.0";
	}
	if (config.features.includes("i18n")) {
		pkg.dependencies["@sveltejs/kit-plugin-i18n"] = "^1.0.0";
	}
	if (config.deployment === "docker") {
		pkg.devDependencies["@sveltejs/adapter-node"] = "^3.0.0";
	}

	await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
}

async function patchSvelteConfig(targetDir: string, config: ProjectConfig): Promise<void> {
	const configPath = join(targetDir, "svelte.config.js");
	let content = await readFile(configPath, "utf-8");

	const deploy = DEPLOYMENTS.find((d) => d.value === config.deployment);
	if (!deploy) throw new Error(`Unknown deployment: ${config.deployment}`);

	if (config.deployment === "docker" || config.deployment === "node") {
		content = content.replace(
			'import adapter from "@sveltejs/adapter-auto";',
			`import adapter from "${deploy.adapter}";`,
		);
	} else {
		content = content.replace(
			'import adapter from "@sveltejs/adapter-auto";',
			`import adapter from "${deploy.adapter}";`,
		);
	}

	await writeFile(configPath, content);
}

async function addAuthFiles(targetDir: string, mode: Mode): Promise<void> {
	const libDir = join(targetDir, "src", "lib");
	await mkdir(join(libDir, "auth"), { recursive: true });

	await writeFile(
		join(libDir, "auth", "index.ts"),
		`import { Lucia } from "lucia";
import { dev } from "$app/environment";

export const lucia = new Lucia({
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
`,
	);

	if (mode === "full-stack") {
		const hooksPath = join(targetDir, "src", "hooks.server.ts");
		await writeFile(
			hooksPath,
			`import { lucia } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.session = null;
    event.locals.user = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }
  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};

export const handle = sequence(auth);
`,
		);
	}

	const routesDir = join(targetDir, "src", "routes");
	await mkdir(join(routesDir, "login"), { recursive: true });

	await writeFile(
		join(routesDir, "login", "+page.svelte"),
		`<script lang="ts">
  import { PageSection, Button } from "bindrunes";
  import { enhance } from "$app/forms";
</script>

<PageSection size="lg" spacing="wide" reveal={false}>
  <form method="POST" use:enhance class="max-w-sm mx-auto space-y-4">
    <h1 class="text-display-2 text-foreground text-center">Sign In</h1>
    <input
      name="email"
      type="email"
      placeholder="Email"
      class="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
      required
    />
    <input
      name="password"
      type="password"
      placeholder="Password"
      class="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
      required
    />
    <Button type="submit" class="w-full">Sign In</Button>
  </form>
</PageSection>
`,
	);

	await writeFile(
		join(routesDir, "login", "+page.server.ts"),
		`import { lucia } from "$lib/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) {
    redirect(302, "/");
  }
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return fail(400, { error: "Email and password are required" });
    }

    // TODO: Implement actual user lookup and password verification
    // const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    // if (!user || !verifyPassword(user, password)) {
    //   return fail(400, { error: "Invalid email or password" });
    // }

    // const session = await lucia.createSession(user.id, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies.set(sessionCookie.name, sessionCookie.value, {
    //   path: ".",
    //   ...sessionCookie.attributes,
    // });

    redirect(302, "/");
  },
};
`,
	);
}

async function addCrudFiles(targetDir: string, mode: Mode): Promise<void> {
	const libDir = join(targetDir, "src", "lib");
	await mkdir(join(libDir, "db"), { recursive: true });

	await writeFile(
		join(libDir, "db", "schema.ts"),
		`import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
`,
	);

	const routesDir = join(targetDir, "src", "routes");
	await mkdir(join(routesDir, "posts"), { recursive: true });

	await writeFile(
		join(routesDir, "posts", "+page.svelte"),
		`<script lang="ts">
  import { PageSection, Button } from "bindrunes";
  let { data } = $props();
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1 class="text-display-1 text-foreground">Posts</h1>
    <Button href="/posts/new">New Post</Button>
    {#each data.posts as post}
      <div class="p-4 rounded-lg border border-border">
        <h2 class="text-heading-3 text-foreground">{post.title}</h2>
        <p class="text-body text-muted-foreground">{post.content}</p>
      </div>
    {/each}
  </div>
</PageSection>
`,
	);

	await writeFile(
		join(routesDir, "posts", "+page.server.ts"),
		`import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // TODO: Replace with actual database query
  const posts = [
    { id: "1", title: "First Post", content: "Hello world!" },
  ];
  return { posts };
};
`,
	);

	await mkdir(join(routesDir, "posts", "new"), { recursive: true });

	await writeFile(
		join(routesDir, "posts", "new", "+page.svelte"),
		`<script lang="ts">
  import { PageSection, Button } from "bindrunes";
  import { enhance } from "$app/forms";
</script>

<PageSection size="lg" spacing="wide" reveal={false}>
  <form method="POST" use:enhance class="max-w-lg mx-auto space-y-4">
    <h1 class="text-display-2 text-foreground text-center">New Post</h1>
    <input
      name="title"
      placeholder="Title"
      class="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
      required
    />
    <textarea
      name="content"
      placeholder="Content"
      rows="6"
      class="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
      required
    ></textarea>
    <Button type="submit" class="w-full">Create Post</Button>
  </form>
</PageSection>
`,
	);

	await writeFile(
		join(routesDir, "posts", "new", "+page.server.ts"),
		`import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // TODO: Insert into database
    // await db.insert(posts).values({ title, content });

    redirect(302, "/posts");
  },
};
`,
	);
}

async function addBillingFiles(targetDir: string): Promise<void> {
	const libDir = join(targetDir, "src", "lib");
	await mkdir(join(libDir, "billing"), { recursive: true });

	await writeFile(
		join(libDir, "billing", "stripe.ts"),
		`import Stripe from "stripe";

export const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
});
`,
	);

	const routesDir = join(targetDir, "src", "routes");
	await mkdir(join(routesDir, "pricing"), { recursive: true });

	await writeFile(
		join(routesDir, "pricing", "+page.svelte"),
		`<script lang="ts">
  import { PageSection, Button } from "bindrunes";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <div class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-display-1 text-foreground text-center">Pricing</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-lg border border-border space-y-4">
        <h2 class="text-heading-2 text-foreground">Free</h2>
        <p class="text-display-3 text-foreground">$0/mo</p>
        <ul class="space-y-2 text-body text-muted-foreground">
          <li>5 projects</li>
          <li>Basic features</li>
        </ul>
        <Button class="w-full" variant="outline">Get Started</Button>
      </div>
      <div class="p-6 rounded-lg border-2 border-primary space-y-4">
        <h2 class="text-heading-2 text-foreground">Pro</h2>
        <p class="text-display-3 text-foreground">$19/mo</p>
        <ul class="space-y-2 text-body text-muted-foreground">
          <li>Unlimited projects</li>
          <li>All features</li>
          <li>Priority support</li>
        </ul>
        <Button class="w-full">Upgrade</Button>
      </div>
      <div class="p-6 rounded-lg border border-border space-y-4">
        <h2 class="text-heading-2 text-foreground">Enterprise</h2>
        <p class="text-display-3 text-foreground">$49/mo</p>
        <ul class="space-y-2 text-body text-muted-foreground">
          <li>Everything in Pro</li>
          <li>Custom integrations</li>
          <li>Dedicated support</li>
        </ul>
        <Button class="w-full" variant="outline">Contact Sales</Button>
      </div>
    </div>
  </div>
</PageSection>
`,
	);

	await mkdir(join(routesDir, "api", "checkout"), { recursive: true });

	const checkoutContent = [
		`import { stripe } from "$lib/billing/stripe";`,
		`import { json } from "@sveltejs/kit";`,
		`import type { RequestHandler } from "./$types";`,
		``,
		`export const POST: RequestHandler = async ({ request }) => {`,
		`  const { priceId } = await request.json();`,
		``,
		`  const session = await stripe.checkout.sessions.create({`,
		`    mode: "subscription",`,
		`    payment_method_types: ["card"],`,
		`    line_items: [{ price: priceId, quantity: 1 }],`,
		`    success_url: request.headers.get("origin") + "/pricing?success=true",`,
		`    cancel_url: request.headers.get("origin") + "/pricing?canceled=true",`,
		`  });`,
		``,
		`  return json({ url: session.url });`,
		`};`,
	].join("\n");

	await writeFile(join(routesDir, "api", "checkout", "+server.ts"), checkoutContent);
}

async function addRealtimeFiles(targetDir: string): Promise<void> {
	const libDir = join(targetDir, "src", "lib");
	await mkdir(join(libDir, "realtime"), { recursive: true });

	await writeFile(
		join(libDir, "realtime", "index.ts"),
		`import Ably from "ably";

export const ably = new Ably.Realtime({
  key: import.meta.env.ABLY_API_KEY,
});
`,
	);

	const routesDir = join(targetDir, "src", "routes");
	await mkdir(join(routesDir, "live"), { recursive: true });

	const livePageContent = [
		`<script lang="ts">`,
		`  import { onMount } from "svelte";`,
		`  import { PageSection } from "bindrunes";`,
		`  import { ably } from "$lib/realtime";`,
		``,
		`  let messages = $state<Array<{ text: string; timestamp: string }>>([]);`,
		`  let channel: Ably.Types.RealtimeChannelPromise | null = $state(null);`,
		``,
		`  onMount(() => {`,
		`    channel = ably.channels.get("chat");`,
		`    channel.subscribe("message", (msg) => {`,
		`      messages = [...messages, { text: msg.data.text, timestamp: new Date().toLocaleTimeString() }];`,
		`    });`,
		`    return () => {`,
		`      channel?.unsubscribe();`,
		`    };`,
		`  });`,
		`</script>`,
		``,
		`<PageSection size="2xl" spacing="wide" reveal={false}>`,
		`  <div class="max-w-2xl mx-auto space-y-6">`,
		`    <h1 class="text-display-1 text-foreground">Live Updates</h1>`,
		`    <div class="space-y-2">`,
		`      {#each messages as msg}`,
		`        <div class="p-3 rounded-lg bg-muted">`,
		`          <span class="text-body text-foreground">{msg.text}</span>`,
		`          <span class="text-caption text-muted-foreground ml-2">{msg.timestamp}</span>`,
		`        </div>`,
		`      {/each}`,
		`      {#if messages.length === 0}`,
		`        <p class="text-body text-muted-foreground">Waiting for messages...</p>`,
		`      {/if}`,
		`    </div>`,
		`  </div>`,
		`</PageSection>`,
	].join("\n");

	await writeFile(join(routesDir, "live", "+page.svelte"), livePageContent);
}

async function addI18nFiles(targetDir: string): Promise<void> {
	const routesDir = join(targetDir, "src", "routes");

	await mkdir(join(routesDir, "[lang]"), { recursive: true });

	// Move existing page into [lang] directory
	const existingPage = join(routesDir, "+page.svelte");
	const existingLayout = join(routesDir, "+layout.svelte");
	const existingError = join(routesDir, "+error.svelte");
	const existingApp = join(targetDir, "src", "app.html");

	const langDir = join(routesDir, "[lang]");

	// Create lang-aware layout
	await writeFile(
		join(langDir, "+layout.svelte"),
		`<script lang="ts">
  import "../../app.css";
  import { AppProvider } from "bindrunes";
  let { children, data } = $props();
</script>

<AppProvider lang={data.lang}>
  {@render children()}
</AppProvider>
`,
	);

	await writeFile(
		join(langDir, "+layout.server.ts"),
		`import type { LayoutServerLoad } from "./$types";

const SUPPORTED = ["en", "es", "fr"];
const DEFAULT = "en";

export const load: LayoutServerLoad = async ({ params }) => {
  const lang = SUPPORTED.includes(params.lang) ? params.lang : DEFAULT;
  return { lang };
};
`,
	);

	await writeFile(
		join(langDir, "+page.svelte"),
		`<script lang="ts">
  import { PageSection, Button } from "bindrunes";
  let { data } = $props();
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <div class="text-center space-y-6">
    <h1 class="text-display-1 text-foreground">Welcome</h1>
    <p class="text-body-lg text-muted-foreground">
      Current language: {data.lang}
    </p>
    <div class="flex gap-2 justify-center">
      <Button href="/en">English</Button>
      <Button href="/es">Espa\u00f1ol</Button>
      <Button href="/fr">Fran\u00e7ais</Button>
    </div>
  </div>
</PageSection>
`,
	);

	await writeFile(
		join(langDir, "+error.svelte"),
		`<script lang="ts">
  import { page } from "$app/state";
  import { PageSection, Button } from "bindrunes";
</script>

<PageSection size="lg" spacing="wide" reveal={false}>
  <div class="text-center space-y-4">
    <h1 class="text-display-2 text-foreground">{$page.status}</h1>
    <p class="text-body-lg text-muted-foreground">{$page.error?.message}</p>
    <Button href="/">Go Home</Button>
  </div>
</PageSection>
`,
	);

	// Remove old root-level page files (they're now under [lang])
	const filesToRemove = [existingPage, existingLayout, existingError];
	for (const file of filesToRemove) {
		try {
			const { unlink } = await import("node:fs/promises");
			await unlink(file);
		} catch {
			// File doesn't exist, skip
		}
	}

	// Add a root redirect page
	await writeFile(
		join(routesDir, "+page.server.ts"),
		`import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  redirect(302, "/en");
};
`,
	);
}

async function addDockerFiles(targetDir: string): Promise<void> {
	await writeFile(
		join(targetDir, "Dockerfile"),
		`FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb* ./
RUN corepack enable && corepack prepare bun@latest --activate
COPY . .
RUN bun install
RUN bun run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
RUN npm install --production

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "build"]
`,
	);

	await writeFile(
		join(targetDir, ".dockerignore"),
		`node_modules
build
.svelte-kit
.git
*.md
`,
	);
}

async function addEnvFile(targetDir: string, config: ProjectConfig): Promise<void> {
	const lines: string[] = ["# Environment Variables", ""];

	if (config.features.includes("auth")) {
		lines.push("# Auth");
		lines.push("DATABASE_URL=postgresql://user:password@localhost:5432/mydb");
		lines.push("");
	}
	if (config.features.includes("billing")) {
		lines.push("# Billing (Stripe)");
		lines.push("STRIPE_SECRET_KEY=sk_test_...");
		lines.push("STRIPE_PUBLISHABLE_KEY=pk_test_...");
		lines.push("");
	}
	if (config.features.includes("realtime")) {
		lines.push("# Realtime (Ably)");
		lines.push("ABLY_API_KEY=...");
		lines.push("");
	}
	if (config.mode === "spa-backend") {
		lines.push("# API");
		lines.push("VITE_API_URL=http://localhost:8080");
		lines.push("");
	}

	if (lines.length > 1) {
		await writeFile(join(targetDir, ".env.example"), lines.join("\n"));
	}
}

async function main() {
	console.log("\n  \u26a1 create-bindrunes \u2014 Interactive Project Generator\n");

	const config = await collectConfig();

	console.log(`\n\u2714 Creating ${config.name} (${config.mode})\n`);

	const targetDir = join(process.cwd(), config.name);

	// 1. Copy base template
	await copyTemplate(targetDir, config.mode);

	// 2. Patch package.json with config
	await patchPackageJson(targetDir, config);

	// 3. Patch svelte.config.js with adapter
	await patchSvelteConfig(targetDir, config);

	// 4. Add feature files
	if (config.features.includes("auth")) {
		console.log("  \u2022 Adding authentication...");
		await addAuthFiles(targetDir, config.mode);
	}
	if (config.features.includes("crud")) {
		console.log("  \u2022 Adding CRUD operations...");
		await addCrudFiles(targetDir, config.mode);
	}
	if (config.features.includes("billing")) {
		console.log("  \u2022 Adding billing...");
		await addBillingFiles(targetDir);
	}
	if (config.features.includes("realtime")) {
		console.log("  \u2022 Adding realtime...");
		await addRealtimeFiles(targetDir);
	}
	if (config.features.includes("i18n")) {
		console.log("  \u2022 Adding internationalization...");
		await addI18nFiles(targetDir);
	}

	// 5. Add deployment files
	if (config.deployment === "docker") {
		console.log("  \u2022 Adding Docker setup...");
		await addDockerFiles(targetDir);
	}

	// 6. Add .env.example
	await addEnvFile(targetDir, config);

	// Summary
	console.log(`\n\u2705 ${config.name} created!\n`);
	console.log(`   cd ${config.name}`);
	console.log(`   bun install`);
	console.log(`   bun run dev`);

	if (config.deployment === "docker") {
		console.log(`\n   docker build -t ${config.name} .`);
		console.log(`   docker run -p 3000:3000 ${config.name}`);
	}

	console.log("");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
