<script lang="ts">
  import { goto } from "$app/navigation";
  import { LoginForm } from "bindrunes/domains/auth";

  function handleLogin(data: { email: string; password: string }) {
    console.log("Login:", data);
  }
</script>

<main class="flex min-h-screen items-center justify-center p-6">
  <LoginForm
    onSubmit={handleLogin}
    onRegister={() => goto("/signup")}
  />
</main>
