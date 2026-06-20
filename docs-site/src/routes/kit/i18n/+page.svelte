<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Internationalization</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Server-side locale detection and client translations.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Server-Side Detection</h2>
      <CodeSnippet language="ts">
{`import { createServerI18n, createLocaleRedirect } from "bindrunes-kit/server";

const i18n = createServerI18n({
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
  strategy: "path",  // "path" | "cookie" | "header"
});

// In hooks.server.ts
export const handle = i18n.handle;`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Strategies</h3>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><strong>path</strong> (default): Detects locale from URL prefix (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">/en/...</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">/pt-BR/...</code>)</li>
        <li><strong>cookie</strong>: Reads locale from a <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">locale</code> cookie</li>
        <li><strong>header</strong>: Uses Accept-Language header</li>
      </ul>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Locale Redirect</h3>
      <CodeSnippet language="ts">
{`import { createLocaleRedirect } from "bindrunes-kit/server";

const localeRedirect = createLocaleRedirect("en");

// In hooks.server.ts, use before i18n.handle
export const handle = localeRedirect;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        This redirects <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">example.com/about</code> to <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">example.com/en/about</code>.
      </p>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Accessing Locale in Load Functions</h3>
      <CodeSnippet language="ts">
{`export const load = async ({ locals }) => {
  // locals.locale — detected locale (always set)
  // locals.pathLocale — locale from URL path (null if not in URL)
  return {
    locale: locals.locale,
  };
};`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Client-Side Translations</h2>
      <CodeSnippet language="ts">
{`import { createI18nContext } from "bindrunes";

createI18nContext({
  default: "en",
  dicts: { en: enDict, "pt-BR": ptBrDict },
});`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Usage in Components</h2>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { useI18n } from "bindrunes";
  const t = useI18n();
</script>

<h1>{t("welcome")}</h1>
<p>{t("description")}</p>`}
      </CodeSnippet>
    </section>
  </div>
</div>
