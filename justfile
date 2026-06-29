# bindrunes — Svelte 5 Component Library

set shell := ["bash", "-euo", "pipefail", "-c"]

# List available commands
default:
    @just --list

# ── Setup ──

[group('setup')]
# Install dependencies
setup:
    bun install

# ── Development ──

[group('development')]
# Watch mode for library development
dev:
    bun run dev

# ── Demos ──

[group('demos')]
# Run the showcase demo
demo:
    cd examples/showcase && bun run dev

[group('demos')]
# Run the landing demo
demo:landing:
    cd examples/landing && bun run dev

[group('demos')]
# Run the webapp demo
demo:webapp:
    cd examples/webapp && bun run dev

[group('demos')]
# Run library watch + all demos concurrently
dev:all:
    just dev &  just demo &  just demo:webapp &  just demo:landing &  wait

# ── Build ──

[group('build')]
# Build the library
build:
    bun run build

[group('build')]
# Clean build artifacts
clean:
    rm -rf dist .svelte-kit

# ── Code Quality ──

[group('quality')]
# Lint check
lint:
    bun run lint

[group('quality')]
# Auto-fix lint and formatting
lint:fix:
    bun run lint:fix

[group('quality')]
# Type check
check:
    bun run check

# ── Testing ──

[group('testing')]
# Run all tests
test:
    bun run test

[group('testing')]
# Run tests with coverage
test:coverage:
    bun run test:coverage

# ── Full Pipelines ──

[group('pipelines')]
# Run build + lint + type check + tests + size
validate:
    just build
    bun run lint
    bun run check
    bun run test
    bun run size

[group('pipelines')]
# Build + validate (used before publish)
prepublish:
    just build
    just validate

# ── Release ──

[group('release')]
# Create a changeset
changeset:
    bun run changeset

[group('release')]
# Version bump
release:version:
    bun run release:version

[group('release')]
# Publish to npm (builds + validates first)
release:publish:
    just prepublish
    bun run release:publish
