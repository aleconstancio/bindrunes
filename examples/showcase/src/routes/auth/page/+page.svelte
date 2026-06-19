<script lang="ts">
import { AuthPage } from "bindrunes/boundrune";
import type { AuthView } from "bindrunes/boundrune/types/auth";

let view = $state<AuthView>("login");

function handleLogin(data: { email: string; password: string }) {
  console.log("Login:", data);
}

function handleRegister(data: { name: string; email: string; password: string }) {
  console.log("Register:", data);
}
</script>

<div class="flex gap-4 mb-8 p-4">
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'login'} onclick={() => view = 'login'}>Login</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'register'} onclick={() => view = 'register'}>Register</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'forgot-password'} onclick={() => view = 'forgot-password'}>Forgot</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'verify-email'} onclick={() => view = 'verify-email'}>Verify</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'two-factor'} onclick={() => view = 'two-factor'}>2FA</button>
</div>

<AuthPage
  {view}
  brandTitle="MyApp"
  brandDescription="Build something great."
  onLoginSubmit={handleLogin}
  onRegisterSubmit={handleRegister}
  onForgotPassword={() => console.log("forgot")}
  socialLogin={{ providers: ["google", "github"] }}
/>
