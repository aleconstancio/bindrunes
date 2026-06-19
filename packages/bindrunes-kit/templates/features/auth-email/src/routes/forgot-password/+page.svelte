<script lang="ts">
	import { AuthPage } from "bindrunes/boundrune/auth";

	let loading = $state(false);
	let submitted = $state(false);

	async function handleForgotSubmit(email: string) {
		loading = true;
		try {
			await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			submitted = true;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Forgot Password</title>
</svelte:head>

{#if submitted}
	<div class="flex min-h-screen items-center justify-center p-4">
		<div class="w-full max-w-sm text-center space-y-4">
			<h1 class="text-title-1 text-foreground">Check your email</h1>
			<p class="text-body-md text-muted-foreground">
				If an account exists with that email, you'll receive a password reset link shortly.
			</p>
			<a href="/login" class="text-body-sm text-primary hover:underline">Back to login</a>
		</div>
	</div>
{:else}
	<AuthPage
		view="forgot-password"
		brandTitle="Reset your password"
		brandDescription="We'll send you a reset link"
		onForgotSubmit={handleForgotSubmit}
		onForgotPassword={() => (window.location.href = "/login")}
		{loading}
	/>
{/if}
