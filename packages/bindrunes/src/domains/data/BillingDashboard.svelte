<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../Badge.svelte";
import Button from "../../Button.svelte";
import Card from "../../Card.svelte";
import Progress from "../../Progress.svelte";
import Block from "../Block.svelte";

interface BillingPlan {
	name: string;
	price: string;
	interval: string;
	features: string[];
}

interface Invoice {
	id: string;
	date: string;
	amount: string;
	status: "paid" | "pending" | "failed";
}

let {
	currentPlan = undefined as BillingPlan | undefined,
	usage = undefined as { label: string; current: number; max: number; unit: string } | undefined,
	invoices = [] as Invoice[],
	onUpgrade = undefined as (() => void) | undefined,
	onManage = undefined as (() => void) | undefined,
	class: className = "",
}: {
	currentPlan?: BillingPlan;
	usage?: { label: string; current: number; max: number; unit: string };
	invoices?: Invoice[];
	onUpgrade?: () => void;
	onManage?: () => void;
	class?: string;
} = $props();

const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
	paid: "success",
	pending: "warning",
	failed: "destructive",
};
</script>

<Block size="lg" spacing="compact" class={className}>
  <div class="space-y-8">
    <h1 class="text-title-1 text-foreground">Billing</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Current Plan -->
      {#if currentPlan}
        <Card padding>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-title-2 text-foreground">Current Plan</h3>
              <Badge variant="primary">{currentPlan.name}</Badge>
            </div>
            <div class="flex items-baseline gap-1">
              <span class="text-display-3 text-foreground">{currentPlan.price}</span>
              <span class="text-body-md text-muted-foreground">/{currentPlan.interval}</span>
            </div>
            <ul class="space-y-2">
              {#each currentPlan.features as feature}
                <li class="flex items-center gap-2 text-body-sm text-muted-foreground">
                  <span class="text-success">✓</span>
                  {feature}
                </li>
              {/each}
            </ul>
            <div class="flex gap-3 pt-2">
              {#if onUpgrade}
                <Button onclick={onUpgrade}>Upgrade Plan</Button>
              {/if}
              {#if onManage}
                <Button variant="ghost" onclick={onManage}>Manage</Button>
              {/if}
            </div>
          </div>
        </Card>
      {/if}

      <!-- Usage -->
      {#if usage}
        <Card padding>
          <div class="space-y-4">
            <h3 class="text-title-2 text-foreground">{usage.label}</h3>
            <Progress
              value={usage.current}
              max={usage.max}
              showValue
              variant={usage.current / usage.max > 0.9 ? "destructive" : "default"}
            />
            <p class="text-body-sm text-muted-foreground">
              {usage.current.toLocaleString()} / {usage.max.toLocaleString()} {usage.unit}
            </p>
          </div>
        </Card>
      {/if}
    </div>

    <!-- Invoices -->
    {#if invoices.length > 0}
      <Card padding>
        <h3 class="text-title-2 text-foreground mb-4">Invoice History</h3>
        <div class="space-y-3">
          {#each invoices as invoice}
            <div class="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div class="flex items-center gap-4">
                <span class="text-body-sm text-muted-foreground">{invoice.date}</span>
                <span class="text-label-md text-foreground">{invoice.amount}</span>
              </div>
              <Badge variant={statusVariant[invoice.status]} size="sm">{invoice.status}</Badge>
            </div>
          {/each}
        </div>
      </Card>
    {/if}
  </div>
</Block>
