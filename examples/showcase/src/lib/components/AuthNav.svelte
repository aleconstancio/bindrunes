<script lang="ts">
	import { page } from "$app/state";

	const steps = [
		{ href: "/auth/login", label: "Login" },
		{ href: "/auth/register", label: "Register" },
		{ href: "/auth/forgot-password", label: "Forgot" },
		{ href: "/auth/2fa", label: "2FA" },
		{ href: "/auth/email-verify", label: "Verify" },
		{ href: "/auth/reset-password", label: "Reset" },
		{ href: "/auth/split-layout", label: "Split Layout" },
	];
</script>

<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
	<div class="flex items-center gap-1 text-label-sm overflow-x-auto">
		<a href="/app" class="text-muted-foreground hover:text-foreground transition-colors shrink-0">&larr; App</a>
		<span class="text-muted-foreground/40">/</span>
		{#each steps as step, i}
			<a
				href={step.href}
				class="px-2 py-1 rounded-[--radius-sm] transition-colors shrink-0 {page.url.pathname === step.href
					? 'text-foreground bg-muted font-medium'
					: 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
			>
				{step.label}
			</a>
			{#if i < steps.length - 1}
				<span class="text-muted-foreground/40">/</span>
			{/if}
		{/each}
	</div>
</nav>
