<script lang="ts">
	import { AuthLayout, TwoFactorAuth } from "bindrunes/boundrune";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<AuthLayout
	brandTitle="Two-Factor Authentication"
	brandDescription="Enter the code from your authenticator app."
>
	<TwoFactorAuth
		onSubmit={(code) => console.log("2FA code:", code)}
		onUseBackup={() => console.log("Use backup code")}
	/>
</AuthLayout>
