<script lang="ts">
	import { createSidebarState } from "bindrunes";
	import { DashboardShell } from "bindrunes";
	import { TabbedSettings } from "bindrunes/boundrune";
	import { ProfileSettings } from "bindrunes/boundrune";
	import { SecuritySettings } from "bindrunes/boundrune";
	import { NotificationSettings } from "bindrunes/boundrune";
	import { DangerZone } from "bindrunes/boundrune";

	const sidebar = createSidebarState(true);
	const navGroups = [
		{ label: "Main", items: [{ title: "Dashboard", to: "/dashboard", description: "Overview", icon: null }] },
	];

	const notifications = [
		{ id: "email", label: "Email Notifications", description: "Receive email for important updates", email: true, push: false, inApp: true },
		{ id: "marketing", label: "Marketing", description: "Product updates and offers", email: false, push: false, inApp: true },
		{ id: "security", label: "Security Alerts", description: "Critical security notifications", email: true, push: true, inApp: true },
	];
</script>

<DashboardShell {sidebar} {navGroups}>
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<h1 class="text-title-1 text-foreground mb-6">Settings</h1>
		<TabbedSettings>
			{#snippet profile()}
				<ProfileSettings
					name="John Doe"
					email="john@example.com"
					onSave={(data) => console.log("Save profile:", data)}
					onChangeAvatar={() => console.log("Change avatar")}
				/>
			{/snippet}

			{#snippet security()}
				<SecuritySettings
					onPasswordChange={(data) => console.log("Change password:", data)}
					onEnable2FA={() => console.log("Enable 2FA")}
				/>
			{/snippet}

			{#snippet notifications()}
				<NotificationSettings
					{notifications}
					onSave={(prefs) => console.log("Save notifications:", prefs)}
				/>
			{/snippet}

			{#snippet danger()}
				<DangerZone
					onDeactivate={() => console.log("Deactivate")}
					onDelete={() => console.log("Delete")}
					onTransfer={() => console.log("Transfer")}
				/>
			{/snippet}
		</TabbedSettings>
	</div>
</DashboardShell>
