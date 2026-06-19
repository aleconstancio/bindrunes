<script lang="ts">
	import { SettingsPage } from "bindrunes/boundrune";
	import { ProfileSettings } from "bindrunes/boundrune";
	import { SecuritySettings } from "bindrunes/boundrune";
	import { NotificationSettings } from "bindrunes/boundrune";
	import { DangerZone } from "bindrunes/boundrune";

	const tabs = [
		{ id: "profile", label: "Profile" },
		{ id: "security", label: "Security" },
		{ id: "notifications", label: "Notifications" },
		{ id: "danger", label: "Danger Zone" },
	];

	let activeTab = $state("profile");

	const notifications = [
		{ id: "email", label: "Email Notifications", description: "Receive email for important updates", email: true, push: false, inApp: true },
		{ id: "marketing", label: "Marketing", description: "Product updates and offers", email: false, push: false, inApp: true },
		{ id: "security", label: "Security Alerts", description: "Critical security notifications", email: true, push: true, inApp: true },
	];
</script>

<SettingsPage {tabs} bind:activeTab title="Settings">
	{#snippet tabContent(tab)}
		{#if tab.id === "profile"}
			<ProfileSettings
				name="John Doe"
				email="john@example.com"
				onSave={(data) => console.log("Save profile:", data)}
				onChangeAvatar={() => console.log("Change avatar")}
			/>
		{:else if tab.id === "security"}
			<SecuritySettings
				onPasswordChange={(data) => console.log("Change password:", data)}
				onEnable2FA={() => console.log("Enable 2FA")}
			/>
		{:else if tab.id === "notifications"}
			<NotificationSettings
				{notifications}
				onSave={(prefs) => console.log("Save notifications:", prefs)}
			/>
		{:else if tab.id === "danger"}
			<DangerZone
				onDeactivate={() => console.log("Deactivate")}
				onDelete={() => console.log("Delete")}
				onTransfer={() => console.log("Transfer")}
			/>
		{/if}
	{/snippet}
</SettingsPage>
