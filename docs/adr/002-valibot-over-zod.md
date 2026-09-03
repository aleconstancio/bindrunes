# ADR-002: Valibot Over Zod for Validation

## Status

Accepted

## Context

Form validation is a core requirement for a B2B SaaS component library. The two dominant TypeScript validation libraries are Zod and Valibot. Both provide schema definition, type inference, and runtime parsing.

Key considerations for a component library:
- **Bundle size**: Consumers install urupe-ui in their frontend. Every byte matters for initial load.
- **Type inference**: Validation schemas must infer TypeScript types for form state.
- **Tree-shaking**: Unused validation features should not appear in the production bundle.
- **Runtime performance**: Form validation runs on every interaction in data-heavy UIs.

## Decision

Use **Valibot** as the sole validation library. Zod is forbidden (documented in AGENTS.md and CONTRIBUTING.md).

### Rationale

| Factor | Zod | Valibot |
|--------|-----|---------|
| Bundle size (minified) | ~14 kB | ~1.5 kB |
| Tree-shaking | Partial | Full |
| API style | Monolithic object | Modular functions |
| TypeScript inference | Full | Full |
| Schema composition | `z.object()`, `z.union()` | `object()`, `union()` |
| Custom validation | `.refine()` | `.check()` |

Valibot's modular API means consumers only bundle the schemas they use. A form using `string()`, `email()`, and `minLength()` pulls in only those validators — not the entire library.

### Integration

```ts
import * as v from "valibot";

const schema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

const form = createForm({ schema });
// form.values is typed as { email: string; password: string }
```

`createForm` accepts Valibot schemas natively. No adapter layer is needed.

## Consequences

### Positive

- ~10 kB smaller bundle for consumers compared to Zod.
- Full tree-shaking: unused validators are eliminated.
- Consistent validation approach across all form components.
- `createForm` composable has deep Valibot integration (error messages, type inference).

### Negative

- Valibot is less widely known than Zod; contributors may need to learn it.
- Fewer community examples and Stack Overflow answers.
- Ecosystem plugins (e.g., form library adapters) are more limited.

### Mitigations

- `docs/composables.md` documents `createForm` with Valibot examples.
- `CONTRIBUTING.md` explicitly forbids Zod.
- Valibot's API is intentionally similar to Zod, reducing the learning curve.
