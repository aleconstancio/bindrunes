<script lang="ts">
	import { AuthLayout, EmailVerification } from "bindrunes/boundrune";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<AuthLayout
	brandTitle="Verify Your Email"
	brandDescription="Check your inbox to verify your email address."
>
	<EmailVerification
		email="user@example.com"
		onResend={() => console.log("Resend verification")}
	/>
</AuthLayout>
