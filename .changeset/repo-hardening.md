---
"bindrunes": patch
---

Harden the repo: add `SECURITY.md`, MIT `LICENSE`, Dependabot config
(npm + GitHub Actions), CodeQL workflow, and a Changesets release
pipeline. Extract the inline build-cleanup script from `package.json`
into `scripts/build-clean.mjs`. Pin `engines.bun` and `engines.node`.
Align `actions/checkout` and `oven-sh/setup-bun` across CI workflows.
Add `*.tsbuildinfo` and editor/OS artefacts to `.gitignore`.
