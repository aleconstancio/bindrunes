<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
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

      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h4 class="text-title-2 text-foreground mb-2">Path Strategy</h4>
          <p class="text-body-sm text-muted-foreground mb-3">
            Locale is embedded in the URL prefix. Default strategy.
          </p>
          <CodeSnippet language="ts" title="hooks.server.ts">
{`const i18n = createServerI18n({
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
  strategy: "path",
});

export const handle = i18n.handle;`}
          </CodeSnippet>
          <p class="text-body-sm text-muted-foreground mt-2">
            Routes: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">/en/about</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">/pt-BR/about</code>
          </p>
        </div>

        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h4 class="text-title-2 text-foreground mb-2">Cookie Strategy</h4>
          <p class="text-body-sm text-muted-foreground mb-3">
            Reads locale from a <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">locale</code> cookie. Useful for SPA mode.
          </p>
          <CodeSnippet language="ts" title="hooks.server.ts">
{`const i18n = createServerI18n({
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
  strategy: "cookie",
});

export const handle = i18n.handle;`}
          </CodeSnippet>
          <p class="text-body-sm text-muted-foreground mt-2">
            Client sets: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">document.cookie = "locale=pt-BR"</code>
          </p>
        </div>

        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h4 class="text-title-2 text-foreground mb-2">Header Strategy</h4>
          <p class="text-body-sm text-muted-foreground mb-3">
            Uses the <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">Accept-Language</code> header from the browser. Automatic detection.
          </p>
          <CodeSnippet language="ts" title="hooks.server.ts">
{`const i18n = createServerI18n({
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
  strategy: "header",
});

export const handle = i18n.handle;`}
          </CodeSnippet>
        </div>
      </div>

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
      <p class="text-body text-muted-foreground mb-4">
        Create an i18n context with your translation dictionaries:
      </p>
      <CodeSnippet language="ts">
{`import { createI18nContext } from "urupe-ui";

createI18nContext({
  default: "en",
  dicts: { en: enDict, "pt-BR": ptBrDict },
});`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        Dictionaries are plain objects mapping keys to translated strings.
      </p>
      <CodeSnippet language="ts" title="en.ts">
{`export default {
  welcome: "Welcome",
  description: "This is your app",
  submit: "Submit",
} satisfies Record<string, string>;`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Usage in Components</h2>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { useI18n } from "urupe-ui";
  const t = useI18n();
</script>

<h1>{t("welcome")}</h1>
<p>{t("description")}</p>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Configuration Reference</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Option</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Type</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">locales</td>
              <td class="py-2 pr-4 font-mono text-xs">string[]</td>
              <td class="py-2">Supported locale codes</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">defaultLocale</td>
              <td class="py-2 pr-4 font-mono text-xs">string</td>
              <td class="py-2">Fallback locale</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">strategy</td>
              <td class="py-2 pr-4 font-mono text-xs">"path" | "cookie" | "header"</td>
              <td class="py-2">How to detect/set locale</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</div>
