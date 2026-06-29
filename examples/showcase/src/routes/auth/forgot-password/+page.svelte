<script lang="ts">
	import { AuthLayout, ForgotPassword } from "bindrunes/domains/auth";
	import { goto } from "$app/navigation";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<AuthLayout
	brandTitle="Forgot Password"
	brandDescription="We'll help you reset your password."
>
	<ForgotPassword
		onSubmit={(email) => console.log("Forgot password:", email)}
		onBack={() => goto("/auth/login")}
	/>
</AuthLayout>
