<script lang="ts">
	import { TwoFactorAuth } from "bindrunes/boundrune";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<TwoFactorAuth
		onSubmit={(code) => console.log("2FA code:", code)}
		onUseBackup={() => console.log("Use backup code")}
	/>
</div>
