#!/usr/bin/env node
// scripts/build-clean.mjs
// Post-build cleanup: strip test files, harnesses, stubs, and fix .ts references in dist/.

import { readdirSync, readFileSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist", import.meta.url).pathname;
const REMOVED_DIRS = ["__tests__", "tests", "helpers", "test", "test-fixtures"];

const FILE_PATTERNS = [
	/\.test\.(ts|js|d\.ts|js\.map|d\.ts\.map)$/,
	/\.spec\.(ts|js|d\.ts|js\.map|d\.ts\.map)$/,
	/Harness\.svelte(\.d\.ts(\.map)?)?(\.js(\.map)?)?$/,
	/[Tt]est[Ww]rapper\.svelte(\.d\.ts(\.map)?)?(\.js(\.map)?)?$/,
	/[Tt]est[Hh]arness\.svelte(\.d\.ts(\.map)?)?(\.js(\.map)?)?$/,
	/bindrunes-stub\.(ts|d\.ts|js|js\.map|d\.ts\.map)$/,
	/test-setup\.(ts|js|d\.ts|js\.map|d\.ts\.map)$/,
	/test-utils\.(ts|js|d\.ts|js\.map|d\.ts\.map)$/,
];

function shouldRemoveFile(name) {
	return FILE_PATTERNS.some((re) => re.test(name));
}

let removedFiles = 0;
let removedDirs = 0;
let fixedFiles = 0;

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
			if (REMOVED_DIRS.includes(entry)) {
				rmSync(full, { recursive: true, force: true });
				removedDirs++;
				continue;
			}
			walk(full);
		} else if (stat.isFile()) {
			if (shouldRemoveFile(entry)) {
				unlinkSync(full);
				removedFiles++;
			} else if (
				entry.endsWith(".svelte") ||
				entry.endsWith(".js") ||
				entry.endsWith(".d.ts")
			) {
				fixTsReferences(full);
			}
		}
	}
}

function fixTsReferences(filePath) {
	try {
		let content = readFileSync(filePath, "utf8");
		const original = content;
		content = content.replace(/\.svelte\.ts"/g, '.svelte.js"');
		content = content.replace(/\.ts"/g, '.js"');
		if (content !== original) {
			writeFileSync(filePath, content, "utf8");
			fixedFiles++;
		}
	} catch {
		// skip files that can't be read
	}
}

walk(DIST);

// Remove duplicate styles directory — consumers get CSS from src/styles/ via the ./styles/* export
const distStyles = join(DIST, "styles");
try {
	rmSync(distStyles, { recursive: true, force: true });
	removedDirs++;
} catch {
	// didn't exist — fine
}

console.log(
	`[build-clean] removed ${removedFiles} file(s), fixed ${fixedFiles} file(s), removed ${removedDirs} dir(s) from dist/`,
);
