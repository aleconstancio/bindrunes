#!/usr/bin/env node
// scripts/build-clean.mjs
// Post-build cleanup: strip test files, harnesses, and stubs from dist/.
// Extracted from an inline node -e block in package.json (M0 hardening).

import { readdirSync, rmSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist", import.meta.url).pathname;
const REMOVED_DIRS = ["__tests__", "tests"];

const FILE_PATTERNS = [
	/\.test\.(ts|js|d\.ts|js\.map|d\.ts\.map)$/,
	/\.spec\.(ts|js|d\.ts|js\.map|d\.ts\.map)$/,
	/^Harness\.svelte(\.d\.ts(\.map)?)?(\.js(\.map)?)?$/,
	/^SidebarTestHarness\.svelte(\.d\.ts(\.map)?)?(\.js(\.map)?)?$/,
	/^bindrunes-stub\.(ts|d\.ts|js|js\.map|d\.ts\.map)$/,
];

function shouldRemoveFile(name) {
	return FILE_PATTERNS.some((re) => re.test(name));
}

let removedFiles = 0;
let removedDirs = 0;

function walk(dir) {
	let entries;
	try {
		entries = readdirSync(dir);
	} catch (err) {
		if (err.code === "ENOENT") return;
		throw err;
	}

	for (const entry of entries) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) {
			walk(full);
		} else if (stat.isFile() && shouldRemoveFile(entry)) {
			unlinkSync(full);
			removedFiles++;
		}
	}
}

walk(DIST);

for (const sub of REMOVED_DIRS) {
	const target = join(DIST, sub);
	try {
		rmSync(target, { recursive: true, force: true });
		removedDirs++;
	} catch {
		// dir didn't exist — fine
	}
}

console.log(`[build-clean] removed ${removedFiles} file(s) and ${removedDirs} dir(s) from dist/`);
