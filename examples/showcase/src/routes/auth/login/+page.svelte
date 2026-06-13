<script lang="ts">
	import { goto } from "$app/navigation";
	import { LoginForm } from "bindrunes/boundrune";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<LoginForm
		onSubmit={(data) => { console.log("Login:", data); goto("/dashboard"); }}
		onForgotPassword={() => goto("/auth/forgot-password")}
		onRegister={() => goto("/auth/register")}
	/>
</div>
