<script lang="ts">
	import { ResetPassword } from "bindrunes/boundrune";
	import { goto } from "$app/navigation";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<ResetPassword
		onSubmit={(data) => { console.log("Reset:", data); goto("/auth/login"); }}
		onBack={() => goto("/auth/login")}
	/>
</div>
