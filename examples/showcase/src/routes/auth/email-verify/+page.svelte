<script lang="ts">
	import { EmailVerification } from "bindrunes/boundrune";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<EmailVerification
		email="user@example.com"
		onResend={() => console.log("Resend verification")}
	/>
</div>
