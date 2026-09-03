<script lang="ts">
	import { goto } from "$app/navigation";
	import { AuthLayout, LoginForm } from "urupe-ui/domains/auth";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<AuthLayout
	brandTitle="Welcome Back"
	brandDescription="Sign in to your account to continue."
>
	<LoginForm
		onSubmit={(data) => { console.log("Login:", data); goto("/dashboard"); }}
		onForgotPassword={() => goto("/auth/forgot-password")}
		onRegister={() => goto("/auth/register")}
	/>
</AuthLayout>
