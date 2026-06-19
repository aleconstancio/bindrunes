<script lang="ts">
	import { AuthPage } from "bindrunes/boundrune/auth";
	import { createClientAuth } from "bindrunes-kit/client";

	const auth = createClientAuth({
		login: async (email, password) => {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) throw new Error("Invalid credentials");
			return res.json();
		},
		fetchProfile: async () => {
			const res = await fetch("/api/auth/me");
			if (!res.ok) return null;
			return res.json();
		},
	});

	let loading = $state(false);
	let error = $state<string | undefined>(undefined);

	async function handleLoginSubmit(data: { email: string; password: string }) {
		loading = true;
		error = undefined;
		try {
			await auth.login(data.email, data.password);
			window.location.href = "/app";
		} catch (err) {
			error = err instanceof Error ? err.message : "Login failed";
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<AuthPage
	view="login"
	brandTitle="Welcome back"
	brandDescription="Sign in to your account"
	onLoginSubmit={handleLoginSubmit}
	onRegister={() => (window.location.href = "/register")}
	onForgotPassword={() => (window.location.href = "/forgot-password")}
	{loading}
	{error}
/>
