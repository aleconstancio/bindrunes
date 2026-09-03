<script lang="ts">
import { page } from "$app/state";
import { Button, EmptyState } from "urupe-ui";
import { Home } from "lucide-svelte";
</script>

<div class="flex min-h-screen items-center justify-center p-6">
  <EmptyState
    icon={Home}
    title={page.status === 404 ? "Page not found" : "Something went wrong"}
    description={page.status === 404 ? "The page you're looking for doesn't exist." : "An unexpected error occurred. Please try again."}
  >
    {#snippet children()}
      <div class="mt-6">
        <Button href="/" variant="primary">Go Home</Button>
      </div>
    {/snippet}
  </EmptyState>
</div>
