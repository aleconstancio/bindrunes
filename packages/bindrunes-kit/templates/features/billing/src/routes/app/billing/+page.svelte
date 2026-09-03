<script lang="ts">
	import { Badge, Button, Card, PageHeader, Spinner } from "urupe-ui";
	import { useMutation, useQuery } from "bindrunes-kit/client";

	interface Plan {
		id: string;
		name: string;
		price: number;
		interval: "month" | "year";
		features: string[];
	}

	interface Subscription {
		planId: string;
		status: "active" | "canceled" | "past_due";
		currentPeriodEnd: string;
	}

	const plans = useQuery<Plan[]>({
		key: "billing-plans",
		fetcher: async () => {
			const res = await fetch("/api/billing/plans");
			return res.json();
		},
	});

	const subscription = useQuery<Subscription | null>({
		key: "billing-subscription",
		fetcher: async () => {
			const res = await fetch("/api/billing/subscription");
			if (!res.ok) return null;
			return res.json();
		},
	});

	const checkout = useMutation({
		mutator: async (planId: string) => {
			const res = await fetch("/api/billing/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ planId }),
			});
			return res.json() as Promise<{ url: string }>;
		},
	});

	const cancel = useMutation({
		mutator: async () => {
			await fetch("/api/billing/subscription", { method: "DELETE" });
		},
		invalidateKeys: ["billing-subscription"],
	});

	function formatPrice(cents: number) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(cents / 100);
	}

	const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
		active: "success",
		past_due: "warning",
		canceled: "destructive",
	};
</script>

<svelte:head>
	<title>Billing</title>
</svelte:head>

<div class="p-6 space-y-6">
	<PageHeader title="Billing" description="Manage your subscription and payment" />

	{#if subscription.isLoading}
		<div class="flex justify-center py-12">
			<Spinner />
		</div>
	{:else if subscription.data}
		<Card>
			<div class="flex items-start justify-between gap-4">
				<div class="space-y-1">
					<h3 class="text-label-lg text-foreground">Current Plan</h3>
					<p class="text-headline-2 text-foreground">
						{plans.data?.find((p) => p.id === subscription.data?.planId)?.name ?? "Unknown"}
					</p>
					<p class="text-body-sm text-muted-foreground">
						Renews {new Date(subscription.data.currentPeriodEnd).toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</p>
				</div>
				<Badge variant={statusVariant[subscription.data.status] ?? "default"}>
					{subscription.data.status.replace("_", " ")}
				</Badge>
			</div>
			{#snippet footer()}
				<div class="flex gap-2">
					<Button variant="outline" size="sm">Update Payment Method</Button>
					<Button variant="ghost" size="sm" onclick={() => cancel.mutate()}>
						Cancel Subscription
					</Button>
				</div>
			{/snippet}
		</Card>
	{/if}

	{#if plans.data}
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			{#each plans.data as plan}
				<Card
					variant={subscription.data?.planId === plan.id ? "surface" : "outlined"}
					interactive={subscription.data?.planId !== plan.id}
					onclick={() => {
						if (subscription.data?.planId !== plan.id) {
							checkout.mutate(plan.id);
						}
					}}
				>
					<div class="space-y-4">
						<div>
							<h3 class="text-label-lg text-foreground">{plan.name}</h3>
							<p class="text-headline-2 text-foreground mt-1">
								{formatPrice(plan.price)}
								<span class="text-body-sm text-muted-foreground">/{plan.interval}</span>
							</p>
						</div>
						<ul class="space-y-2">
							{#each plan.features as feature}
								<li class="text-body-sm text-muted-foreground flex items-start gap-2">
									<span class="text-success mt-0.5">&#10003;</span>
									{feature}
								</li>
							{/each}
						</ul>
						{#if subscription.data?.planId === plan.id}
							<Badge variant="primary" class="w-full justify-center">Current Plan</Badge>
						{:else}
							<Button
								variant="primary"
								fullWidth
								loading={checkout.isLoading}
							>
								{subscription.data ? "Switch Plan" : "Get Started"}
							</Button>
						{/if}
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
