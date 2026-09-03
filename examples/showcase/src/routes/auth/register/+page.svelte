<script lang="ts">
	import { goto } from "$app/navigation";
	import { AuthLayout, RegisterForm } from "urupe-ui/domains/auth";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<AuthLayout
	brandTitle="Create Account"
	brandDescription="Get started with your free account today."
>
	<RegisterForm
		onSubmit={(data) => { console.log("Register:", data); goto("/dashboard"); }}
		onLogin={() => goto("/auth/login")}
	/>
</AuthLayout>
