#!/usr/bin/env node

/**
 * Symlinks docs/*.md files into showcase routes as +page.md files.
 * This allows mdsvex to render markdown files as SvelteKit pages.
 *
 * Usage: node scripts/symlink-docs.mjs
 */

import { symlinkSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DOCS_DIR = join(ROOT, "..", "..", "docs");
const ROUTES_DIR = join(ROOT, "src", "routes", "docs");

// Map markdown files to route directories
// Key: .md filename (without extension), Value: route directory name
const DOC_TO_ROUTE = {
	"getting-started": "getting-started",
	"architecture": "architecture",
	"components": "components",
	"composables": "composables",
	"design-system": "design-system",
	"security": "security",
	"testing": "testing",
	"changelog": "changelog",
	"contributing": "contributing",
	"accessibility": "accessibility",
};

// Docs that exist in docs/ but don't have routes yet (or have different names)
const SKIP_DOCS = ["boundrunes", "component-states", "index", "landing", "ssr", "VPAT-2.4"];

console.log("Symlinking docs...\n");

let created = 0;
let skipped = 0;

for (const [docName, routeName] of Object.entries(DOC_TO_ROUTE)) {
	const mdFile = join(DOCS_DIR, `${docName}.md`);
	const routeDir = join(ROUTES_DIR, routeName);
	const symlinkPath = join(routeDir, "+page.md");

	if (!existsSync(mdFile)) {
		console.log(`⚠  Source not found: ${mdFile}`);
		skipped++;
		continue;
	}

	if (!existsSync(routeDir)) {
		console.log(`📁 Creating route directory: ${routeDir}`);
		mkdirSync(routeDir, { recursive: true });
	}

	// Remove existing symlink if present
	if (existsSync(symlinkPath)) {
		rmSync(symlinkPath);
	}

	try {
		// Create relative symlink from route to docs
		// From: src/routes/docs/<route>/+page.md
		// To:   ../../../../../../docs/<doc>.md (monorepo root's docs folder)
		const relativePath = join("..", "..", "..", "..", "..", "..", "docs", `${docName}.md`);
		symlinkSync(relativePath, symlinkPath);
		console.log(`✓  Created symlink: ${symlinkPath} -> ${relativePath}`);
		created++;
	} catch (err) {
		console.error(`✗  Failed to create symlink for ${docName}:`, err.message);
		skipped++;
	}
}

console.log(`\nDone: ${created} symlinks created, ${skipped} skipped`);
