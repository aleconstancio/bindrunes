<script lang="ts">
import Badge from "../../Badge.svelte";
import Card from "../../Card.svelte";
import DataTable from "../../DataTable.svelte";
import Switch from "../../Switch.svelte";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
}

interface Settings {
	maintenanceMode: boolean;
	allowSignUp: boolean;
}

interface ActivityLog {
	id: string;
	action: string;
	user: string;
	timestamp: string;
}

let {
	users = [],
	settings: incomingSettings = { maintenanceMode: false, allowSignUp: true },
	activityLogs = [],
	onUserAction = undefined as ((userId: string, action: string) => void) | undefined,
	onSettingsUpdate = undefined as ((settings: Settings) => void) | undefined,
	class: className = "",
}: {
	users?: User[];
	settings?: Settings;
	activityLogs?: ActivityLog[];
	onUserAction?: (userId: string, action: string) => void;
	onSettingsUpdate?: (settings: Settings) => void;
	class?: string;
} = $props();

// svelte-ignore state_referenced_locally
let maintenanceMode = $state(incomingSettings.maintenanceMode);
// svelte-ignore state_referenced_locally
let allowSignUp = $state(incomingSettings.allowSignUp);

$effect(() => {
	// svelte-ignore state_referenced_locally
	maintenanceMode = incomingSettings.maintenanceMode;
	// svelte-ignore state_referenced_locally
	allowSignUp = incomingSettings.allowSignUp;
});

$effect(() => {
	onSettingsUpdate?.({ maintenanceMode, allowSignUp });
});

const userColumns = [
	{ key: "name", label: "Name" },
	{ key: "email", label: "Email" },
	{ key: "role", label: "Role" },
];
</script>

<div class="space-y-6 {className}">
	<h1 class="text-display-2 text-foreground">Admin Dashboard</h1>

	<Card padding>
		<h2 class="text-title-2 text-foreground mb-4">User Management</h2>
		<DataTable columns={userColumns} rows={users as (User & Record<string, unknown>)[]} />
	</Card>

	<Card padding>
		<h2 class="text-title-2 text-foreground mb-4">System Settings</h2>
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-body-md text-foreground">Maintenance Mode</p>
					<p class="text-label-xs text-muted-foreground">Disable public access</p>
				</div>
				<Switch bind:checked={maintenanceMode} />
			</div>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-body-md text-foreground">Allow Sign Up</p>
					<p class="text-label-xs text-muted-foreground">Enable new user registration</p>
				</div>
				<Switch bind:checked={allowSignUp} />
			</div>
		</div>
	</Card>

	{#if activityLogs.length > 0}
		<Card padding>
			<h2 class="text-title-2 text-foreground mb-4">Activity Logs</h2>
			<div class="space-y-2">
				{#each activityLogs as log}
					<div class="flex items-center gap-3 text-body-sm">
						<Badge variant="secondary">{log.action}</Badge>
						<span class="text-foreground">{log.user}</span>
						<span class="text-muted-foreground">{log.timestamp}</span>
					</div>
				{/each}
			</div>
		</Card>
	{/if}
</div>
