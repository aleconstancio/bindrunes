<script lang="ts">
	import { goto } from "$app/navigation";
	import { LoginForm } from "bindrunes/boundrune";
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
	<a href="/app" class="text-body-sm text-muted-foreground hover:text-foreground transition-colors">&larr; Back to App</a>
</div>

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<LoginForm
		onSubmit={(data) => { console.log("Login:", data); goto("/dashboard"); }}
		onForgotPassword={() => goto("/auth/forgot-password")}
		onRegister={() => goto("/auth/register")}
	/>
</div>
