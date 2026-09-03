<script lang="ts">
	import { AuthTemplate } from "urupe-ui/layouts";
	import { createClientAuth } from "bindrunes-kit/client";

	const auth = createClientAuth({
		login: async (email, password) => {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) throw new Error("Login failed after registration");
			return res.json();
		},
	});

	let loading = $state(false);
	let error = $state<string | undefined>(undefined);

	async function handleRegisterSubmit(data: { name: string; email: string; password: string }) {
		loading = true;
		error = undefined;
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			const body = await res.json();
			if (!res.ok) throw new Error(body.message ?? "Registration failed");
			const { token, user } = body;
			if (token) auth.setToken(token);
			if (user) auth.setUser(user);
			window.location.href = "/app";
		} catch (err) {
			error = err instanceof Error ? err.message : "Registration failed";
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Create Account</title>
</svelte:head>

<AuthTemplate
	view="register"
	brandTitle="Create your account"
	brandDescription="Get started in seconds"
	onRegisterSubmit={handleRegisterSubmit}
	onLogin={() => (window.location.href = "/login")}
	{loading}
	{error}
/>
