<script lang="ts">
import Button from "../../primitives/Button.svelte";

interface QuickAction {
	label: string;
	icon?: string;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "outline" | "ghost";
	loading?: boolean;
	disabled?: boolean;
}

let {
	actions = [] as QuickAction[],
	class: className = "",
}: {
	actions?: QuickAction[];
	class?: string;
} = $props();
</script>

<div class="flex flex-wrap items-center gap-2 {className}">
  {#each actions as action}
    <Button
      variant={action.variant ?? "outline"}
      size="sm"
      loading={action.loading}
      disabled={action.disabled}
      onclick={action.onClick}
    >
      {#if action.icon}
        <span class="mr-1.5">{action.icon}</span>
      {/if}
      {action.label}
    </Button>
  {/each}
</div>
