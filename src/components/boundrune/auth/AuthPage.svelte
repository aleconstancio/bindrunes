<script lang="ts">
import type { Snippet } from "svelte";
import type { AuthView } from "../types/auth";
import AuthLayout from "./AuthLayout.svelte";
import EmailVerification from "./EmailVerification.svelte";
import ForgotPassword from "./ForgotPassword.svelte";
import LoginForm from "./LoginForm.svelte";
import RegisterForm from "./RegisterForm.svelte";
import ResetPassword from "./ResetPassword.svelte";
import SocialLogin from "./SocialLogin.svelte";
import TwoFactorAuth from "./TwoFactorAuth.svelte";

let {
	view = "login" as AuthView,
	brandImage,
	brandTitle,
	brandDescription,
	onLoginSubmit,
	onForgotPassword,
	onRegister,
	onRegisterSubmit,
	onLogin,
	onForgotSubmit,
	onResetSubmit,
	onTwoFactorSubmit,
	onUseBackup,
	verifyEmail,
	onResendEmail,
	socialLogin,
	loading = false,
	error = undefined as string | undefined,
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
	onLoginSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
	onForgotPassword?: () => void;
	onRegister?: () => void;
	onRegisterSubmit?: (data: {
		name: string;
		email: string;
		password: string;
	}) => void | Promise<void>;
	onLogin?: () => void;
	onForgotSubmit?: (email: string) => void | Promise<void>;
	onResetSubmit?: (data: { password: string }) => void | Promise<void>;
	onTwoFactorSubmit?: (code: string) => void | Promise<void>;
	onUseBackup?: () => void;
	verifyEmail?: string;
	onResendEmail?: () => void;
	socialLogin?: {
		onGoogle?: () => void;
		onGitHub?: () => void;
		onApple?: () => void;
		providers?: ("google" | "github" | "apple")[];
	};
	loading?: boolean;
	error?: string;
	header?: Snippet;
	beforeFields?: Snippet;
	afterFields?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<AuthLayout {brandImage} {brandTitle} {brandDescription}>
	{#if view === 'login'}
		<LoginForm
			onSubmit={onLoginSubmit}
			{onForgotPassword}
			{onRegister}
			{loading}
			{error}
		>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if socialLogin}
				<SocialLogin {...socialLogin} />
			{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</LoginForm>
	{:else if view === 'register'}
		<RegisterForm
			onSubmit={onRegisterSubmit}
			onLogin={onLogin ?? onRegister}
			{loading}
			{error}
		>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if socialLogin}
				<SocialLogin {...socialLogin} />
			{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</RegisterForm>
	{:else if view === 'forgot-password'}
		<ForgotPassword
			onSubmit={onForgotSubmit}
			onBack={onForgotPassword}
			{loading}
		>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ForgotPassword>
	{:else if view === 'reset-password'}
		<ResetPassword
			onSubmit={onResetSubmit}
			onBack={onForgotPassword}
			{loading}
			{error}
		>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ResetPassword>
	{:else if view === 'verify-email'}
		<EmailVerification
			email={verifyEmail ?? ''}
			onResend={onResendEmail}
			{loading}
		/>
	{:else if view === 'two-factor'}
		<TwoFactorAuth
			onSubmit={onTwoFactorSubmit}
			{onUseBackup}
			{loading}
			{error}
		/>
	{/if}
	{#if children}{@render children()}{/if}
</AuthLayout>
