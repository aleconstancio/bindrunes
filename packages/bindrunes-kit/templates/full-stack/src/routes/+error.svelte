<script lang="ts">
import { page } from "$app/state";
import { PageSection, Button } from "bindrunes";
</script>

<PageSection size="lg" spacing="wide" reveal={false}>
  <div class="text-center space-y-4">
    <h1 class="text-display-2 text-foreground">{$page.status}</h1>
    <p class="text-body-lg text-muted-foreground">{$page.error?.message}</p>
    <Button href="/">Go Home</Button>
  </div>
</PageSection>
