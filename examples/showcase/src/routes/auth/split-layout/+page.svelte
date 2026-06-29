<script lang="ts">
	import { AuthLayout, LoginForm } from "bindrunes/domains/auth";
	import { goto } from "$app/navigation";
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
	<a href="/auth/login" class="text-body-sm text-muted-foreground hover:text-foreground transition-colors">&larr; Back to Auth</a>
</div>

<AuthLayout
	brandTitle="bindrunes"
	brandDescription="A modern Svelte 5 component library for building beautiful applications."
>
	<LoginForm
		onSubmit={(data) => { console.log("Login:", data); goto("/dashboard"); }}
		onRegister={() => goto("/auth/register")}
	/>
</AuthLayout>
