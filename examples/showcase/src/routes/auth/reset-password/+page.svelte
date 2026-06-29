<script lang="ts">
	import { AuthLayout, ResetPassword } from "bindrunes/domains/auth";
	import { goto } from "$app/navigation";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<AuthLayout
	brandTitle="Reset Password"
	brandDescription="Create a new password for your account."
>
	<ResetPassword
		onSubmit={(data) => { console.log("Reset:", data); goto("/auth/login"); }}
		onBack={() => goto("/auth/login")}
	/>
</AuthLayout>
