<script lang="ts">
	import { ForgotPassword } from "bindrunes/boundrune";
	import { goto } from "$app/navigation";
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
	<a href="/auth/login" class="text-body-sm text-muted-foreground hover:text-foreground transition-colors">&larr; Back to Auth</a>
</div>

<div class="min-h-[80vh] flex items-center justify-center p-8">
	<ForgotPassword
		onSubmit={(email) => console.log("Forgot password:", email)}
		onBack={() => goto("/auth/login")}
	/>
</div>
