<script lang="ts">
	import { ForgotPassword } from "bindrunes/boundrune";
	import { goto } from "$app/navigation";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<ForgotPassword
		onSubmit={(email) => console.log("Forgot password:", email)}
		onBack={() => goto("/auth/login")}
	/>
</div>
