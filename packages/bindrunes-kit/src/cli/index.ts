#!/usr/bin/env node

import { cp, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const __dirname = new URL(".", import.meta.url).pathname;
const TEMPLATES_DIR = join(__dirname, "..", "..", "templates");

type Mode = "full-stack" | "spa-backend";
type Feature = "auth" | "crud" | "billing" | "realtime" | "i18n" | "dashboard" | "settings";
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
		description: "SSE-based live data subscriptions",
	},
	{
		value: "i18n",
		label: "Internationalization",
		description: "Multi-language support, locale routing",
	},
	{ value: "dashboard", label: "Dashboard", description: "Admin dashboard with sidebar layout" },
	{ value: "settings", label: "Settings", description: "User settings and profile management" },
];

const DEPLOYMENTS: { value: Deployment; label: string; adapter: string }[] = [
	{ value: "vercel", label: "Vercel", adapter: "@sveltejs/adapter-vercel" },
	{ value: "firebase", label: "Firebase", adapter: "@sveltejs/adapter-auto" },
	{ value: "node", label: "Node.js (self-hosted)", adapter: "@sveltejs/adapter-node" },
	{ value: "docker", label: "Docker", adapter: "@sveltejs/adapter-node" },
];

const FEATURE_DEPS: Record<
	Feature,
	{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
> = {
	auth: {},
	crud: {},
	billing: { dependencies: { stripe: "^14.0.0" } },
	realtime: {},
	i18n: {},
	dashboard: {},
	settings: { dependencies: { valibot: "^1.0.0" } },
};

const FEATURE_DIRS: Record<Feature, string> = {
	auth: "auth-email",
	crud: "crud",
	billing: "billing",
	realtime: "realtime",
	i18n: "i18n",
	dashboard: "dashboard",
	settings: "settings",
};

function parseArgs(argv: string[]): { yes: boolean; template: Mode | null; name: string | null } {
	const args = argv.slice(2);
	let yes = false;
	let template: Mode | null = null;
	let name: string | null = null;

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--yes" || arg === "-y") {
			yes = true;
		} else if (arg === "--template" || arg === "-t") {
			const val = args[++i];
			if (val !== "full-stack" && val !== "spa-backend") {
				console.error(`Invalid template: ${val}. Use "full-stack" or "spa-backend".`);
				process.exit(1);
			}
			template = val;
		} else if (arg === "--help" || arg === "-h") {
			console.log(`
  create-bindrunes — Interactive Project Generator

  Usage:
    create-bindrunes [name] [options]

  Options:
    -y, --yes              Non-interactive mode (uses defaults)
    -t, --template <mode>  Template to use: full-stack, spa-backend
    -h, --help             Show this help message
`);
			process.exit(0);
		} else if (!arg.startsWith("-")) {
			name = arg;
		}
	}

	return { yes, template, name };
}

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

async function collectConfig(args: {
	yes: boolean;
	template: Mode | null;
	name: string | null;
}): Promise<ProjectConfig> {
	const rl = createInterface({ input: stdin, output: stdout });

	try {
		let name = args.name;
		if (!name) {
			name = await prompt(rl, "Project name: ");
			if (!name) {
				console.log("Project name is required.");
				process.exit(1);
			}
		}

		let mode: Mode;
		if (args.template) {
			mode = args.template;
			console.log(`Using template: ${mode}`);
		} else {
			mode = (await promptChoice(rl, "Select mode:", [
				{ value: "full-stack", label: "Full-stack (SSR + API routes)" },
				{ value: "spa-backend", label: "SPA + Backend (separate API)" },
			])) as Mode;
		}

		let features: Feature[];
		if (args.yes) {
			features = FEATURES.map((f) => f.value);
			console.log("Using all features (non-interactive mode)");
		} else {
			features = (await promptMultiSelect(rl, "Select features:", FEATURES)) as Feature[];
		}

		let deployment: Deployment;
		if (args.yes) {
			deployment = "vercel";
			console.log("Using Vercel deployment (non-interactive mode)");
		} else {
			deployment = (await promptChoice(rl, "Select deployment target:", DEPLOYMENTS)) as Deployment;
		}

		return { name, mode, features, deployment };
	} finally {
		rl.close();
	}
}

async function copyTemplate(targetDir: string, mode: Mode): Promise<void> {
	const templateDir = join(TEMPLATES_DIR, mode);
	await cp(templateDir, targetDir, { recursive: true });
}

async function copyFeatureFiles(targetDir: string, feature: Feature): Promise<void> {
	const featureDir = join(TEMPLATES_DIR, "features", FEATURE_DIRS[feature]);
	const entries = await readdirRecursive(featureDir);
	for (const entry of entries) {
		const src = join(featureDir, entry);
		const dest = join(targetDir, entry);
		await mkdir(join(dest, ".."), { recursive: true });
		await cp(src, dest);
	}
}

async function readdirRecursive(dir: string): Promise<string[]> {
	const { readdir, stat } = await import("node:fs/promises");
	const entries = await readdir(dir, { withFileTypes: true });
	const results: string[] = [];

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		const relativePath = relative(dir, fullPath);
		if (entry.isDirectory()) {
			const subEntries = await readdirRecursive(fullPath);
			results.push(...subEntries);
		} else {
			results.push(relativePath);
		}
	}

	return results;
}

async function patchPackageJson(targetDir: string, config: ProjectConfig): Promise<void> {
	const pkgPath = join(targetDir, "package.json");
	const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));

	pkg.name = config.name;

	const deploy = DEPLOYMENTS.find((d) => d.value === config.deployment);
	if (!deploy) throw new Error(`Unknown deployment: ${config.deployment}`);
	if (!pkg.devDependencies) pkg.devDependencies = {};
	pkg.devDependencies[deploy.adapter] = "^3.0.0";

	for (const feature of config.features) {
		const deps = FEATURE_DEPS[feature];
		if (deps.dependencies) {
			if (!pkg.dependencies) pkg.dependencies = {};
			Object.assign(pkg.dependencies, deps.dependencies);
		}
		if (deps.devDependencies) {
			if (!pkg.devDependencies) pkg.devDependencies = {};
			Object.assign(pkg.devDependencies, deps.devDependencies);
		}
	}

	await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
}

async function patchSvelteConfig(targetDir: string, config: ProjectConfig): Promise<void> {
	const configPath = join(targetDir, "svelte.config.js");
	const content = await readFile(configPath, "utf-8");

	const deploy = DEPLOYMENTS.find((d) => d.value === config.deployment);
	if (!deploy) throw new Error(`Unknown deployment: ${config.deployment}`);

	const patched = content.replace(
		'import adapter from "@sveltejs/adapter-auto";',
		`import adapter from "${deploy.adapter}";`,
	);

	await writeFile(configPath, patched);
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
		lines.push("# Realtime");
		lines.push("SSE_ENDPOINT=/api/events");
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
	console.log("\n  ⚡ create-bindrunes — Interactive Project Generator\n");

	const args = parseArgs(process.argv);
	const config = await collectConfig(args);

	console.log(`\n✔ Creating ${config.name} (${config.mode})\n`);

	const targetDir = join(process.cwd(), config.name);

	await copyTemplate(targetDir, config.mode);

	for (const feature of config.features) {
		console.log(`  • Adding ${feature}...`);
		await copyFeatureFiles(targetDir, feature);
	}

	await patchPackageJson(targetDir, config);
	await patchSvelteConfig(targetDir, config);
	await addEnvFile(targetDir, config);

	console.log(`\n✅ ${config.name} created!\n`);
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
