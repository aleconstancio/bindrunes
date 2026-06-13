<script lang="ts">
	import { goto } from "$app/navigation";
	import { RegisterForm } from "bindrunes/boundrune";
	import AuthNav from "$lib/components/AuthNav.svelte";
</script>

<AuthNav />

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<RegisterForm
		onSubmit={(data) => { console.log("Register:", data); goto("/dashboard"); }}
		onLogin={() => goto("/auth/login")}
	/>
</div>
