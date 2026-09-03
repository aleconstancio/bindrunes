<script lang="ts">
  import { goto } from "$app/navigation";
  import { RegisterForm } from "urupe-ui/domains/auth";

  function handleRegister(data: { name: string; email: string; password: string }) {
    console.log("Register:", data);
  }
</script>

<main class="flex min-h-screen items-center justify-center p-6">
  <RegisterForm
    onSubmit={handleRegister}
    onLogin={() => goto("/login")}
  />
</main>
