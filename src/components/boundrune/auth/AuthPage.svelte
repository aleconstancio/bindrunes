<script lang="ts">
import type { Snippet } from "svelte";
import type { AuthView } from "../types/auth";
import AuthLayout from "./AuthLayout.svelte";
import ForgotPassword from "./ForgotPassword.svelte";
import LoginForm from "./LoginForm.svelte";
import RegisterForm from "./RegisterForm.svelte";
import ResetPassword from "./ResetPassword.svelte";
import TwoFactorAuth from "./TwoFactorAuth.svelte";

let {
	view = "login" as AuthView,
	brandImage,
	brandTitle,
	brandDescription,
	onSubmit,
	onForgotPassword,
	onRegister,
	onResetPassword,
	onVerify2FA,
	header,
	beforeFields,
	afterFields,
	footer,
	children,
}: {
	view?: AuthView;
	brandImage?: string;
	brandTitle?: string;
	brandDescription?: string;
	onSubmit?: (data: Record<string, string>) => void | Promise<void>;
	onForgotPassword?: () => void;
	onRegister?: () => void;
	onResetPassword?: (data: Record<string, string>) => void | Promise<void>;
	onVerify2FA?: (code: string) => void | Promise<void>;
	header?: Snippet;
	beforeFields?: Snippet;
	afterFields?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<AuthLayout {brandImage} {brandTitle} {brandDescription}>
	{#if view === 'login'}
		<LoginForm {onSubmit} {onForgotPassword} {onRegister}>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</LoginForm>
	{:else if view === 'register'}
		<RegisterForm {onSubmit} onLogin={onForgotPassword}>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</RegisterForm>
	{:else if view === 'forgot-password'}
		<ForgotPassword onSubmit={onForgotPassword} onBack={onForgotPassword}>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ForgotPassword>
	{:else if view === 'reset-password'}
		<ResetPassword onSubmit={onResetPassword} onBack={onForgotPassword}>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ResetPassword>
	{:else if view === 'two-factor'}
		<TwoFactorAuth onSubmit={onVerify2FA}>
		</TwoFactorAuth>
	{/if}
	{#if children}{@render children()}{/if}
</AuthLayout>
