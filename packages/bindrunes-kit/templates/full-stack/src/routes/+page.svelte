<script lang="ts">
import { PageSection, Button } from "bindrunes";
let { data } = $props();
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <div class="text-center space-y-6">
    <h1 class="text-display-1 text-foreground">Welcome</h1>
    <p class="text-body-lg text-muted-foreground">
      {#if data.session}
        Hello, {data.session.user.name ?? data.session.user.email}!
      {:else}
        Sign in to get started.
      {/if}
    </p>
    {#if !data.session}
      <Button href="/login">Sign In</Button>
    {/if}
  </div>
</PageSection>
