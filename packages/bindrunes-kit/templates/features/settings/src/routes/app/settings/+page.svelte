<script lang="ts">
import { Button, Card, PageHeader, Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from "bindrunes";
	import { useForm, useMutation, useQuery } from "bindrunes-kit/client";
	import { email as emailValidator, minLength, object, string } from "valibot";

	const profileForm = useForm({
		schema: object({
			name: string([minLength(1, "Name is required")]),
			email: string([emailValidator("Invalid email")]),
		}),
		initialValues: { name: "", email: "" },
		validateOn: "blur",
	});

	const passwordForm = useForm({
		schema: object({
			currentPassword: string([minLength(1, "Current password is required")]),
			newPassword: string([minLength(8, "Must be at least 8 characters")]),
			confirmPassword: string([minLength(1, "Please confirm your password")]),
		}),
		initialValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
		validateOn: "blur",
	});

	const profile = useQuery({
		key: "user-profile",
		fetcher: async () => {
			const res = await fetch("/api/auth/me");
			return res.json();
		},
		onSuccess: (data: { name: string; email: string }) => {
			profileForm.setFieldValue("name", data.name);
			profileForm.setFieldValue("email", data.email);
		},
	});

	const updateProfile = useMutation({
		mutator: async (vars: { name: string; email: string }) => {
			const res = await fetch("/api/auth/profile", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(vars),
			});
			if (!res.ok) throw new Error("Failed to update profile");
			return res.json();
		},
		invalidateKeys: ["user-profile"],
	});

	const changePassword = useMutation({
		mutator: async (vars: { currentPassword: string; newPassword: string }) => {
			const res = await fetch("/api/auth/password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(vars),
			});
			if (!res.ok) throw new Error("Failed to change password");
			return res.json();
		},
	});

	let activeTab = $state("profile");
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="p-6 space-y-6">
	<PageHeader title="Settings" description="Manage your account settings" />

	<Tabs bind:value={activeTab}>
		<TabsList>
			<TabsTrigger value="profile">Profile</TabsTrigger>
			<TabsTrigger value="password">Password</TabsTrigger>
			<TabsTrigger value="notifications">Notifications</TabsTrigger>
		</TabsList>

		<div class="mt-6">
			<TabsContent value="profile">
				<Card>
					<form
						onsubmit={(e) => {
							e.preventDefault();
							updateProfile.mutate(profileForm.values);
						}}
						class="space-y-4"
					>
						<h3 class="text-label-lg text-foreground">Profile Information</h3>

						<div class="space-y-2">
							<label for="name" class="text-body-sm font-medium text-foreground">Name</label>
							<input
								id="name"
								type="text"
								value={profileForm.values.name}
								oninput={(e) => profileForm.setFieldValue("name", e.currentTarget.value)}
								onblur={() => profileForm.setFieldTouched("name")}
								class="w-full rounded-[--radius] border border-border bg-background px-3 py-2 text-body-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							/>
							{#if profileForm.getFieldError("name")}
								<p class="text-body-xs text-destructive">{profileForm.getFieldError("name")}</p>
							{/if}
						</div>

						<div class="space-y-2">
							<label for="email" class="text-body-sm font-medium text-foreground">Email</label>
							<input
								id="email"
								type="email"
								value={profileForm.values.email}
								oninput={(e) => profileForm.setFieldValue("email", e.currentTarget.value)}
								onblur={() => profileForm.setFieldTouched("email")}
								class="w-full rounded-[--radius] border border-border bg-background px-3 py-2 text-body-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							/>
							{#if profileForm.getFieldError("email")}
								<p class="text-body-xs text-destructive">{profileForm.getFieldError("email")}</p>
							{/if}
						</div>

						<div class="flex justify-end gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								onclick={() => profileForm.reset()}
								disabled={!profileForm.isDirty}
							>
								Reset
							</Button>
							<Button
								type="submit"
								loading={updateProfile.isLoading}
								disabled={!profileForm.isDirty || !profileForm.isValid}
							>
								Save Changes
							</Button>
						</div>
					</form>
				</Card>
			</TabsContent>

			<TabsContent value="password">
				<Card>
					<form
						onsubmit={(e) => {
							e.preventDefault();
							if (passwordForm.values.newPassword !== passwordForm.values.confirmPassword) return;
							changePassword.mutate({
								currentPassword: passwordForm.values.currentPassword,
								newPassword: passwordForm.values.newPassword,
							});
						}}
						class="space-y-4"
					>
						<h3 class="text-label-lg text-foreground">Change Password</h3>

						<div class="space-y-2">
							<label for="current-password" class="text-body-sm font-medium text-foreground">
								Current Password
							</label>
							<input
								id="current-password"
								type="password"
								value={passwordForm.values.currentPassword}
								oninput={(e) => passwordForm.setFieldValue("currentPassword", e.currentTarget.value)}
								class="w-full rounded-[--radius] border border-border bg-background px-3 py-2 text-body-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							/>
						</div>

						<div class="space-y-2">
							<label for="new-password" class="text-body-sm font-medium text-foreground">
								New Password
							</label>
							<input
								id="new-password"
								type="password"
								value={passwordForm.values.newPassword}
								oninput={(e) => passwordForm.setFieldValue("newPassword", e.currentTarget.value)}
								class="w-full rounded-[--radius] border border-border bg-background px-3 py-2 text-body-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							/>
							{#if passwordForm.getFieldError("newPassword")}
								<p class="text-body-xs text-destructive">{passwordForm.getFieldError("newPassword")}</p>
							{/if}
						</div>

						<div class="space-y-2">
							<label for="confirm-password" class="text-body-sm font-medium text-foreground">
								Confirm New Password
							</label>
							<input
								id="confirm-password"
								type="password"
								value={passwordForm.values.confirmPassword}
								oninput={(e) => passwordForm.setFieldValue("confirmPassword", e.currentTarget.value)}
								class="w-full rounded-[--radius] border border-border bg-background px-3 py-2 text-body-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							/>
						</div>

						{#if changePassword.error}
							<p class="text-body-sm text-destructive">{changePassword.error.message}</p>
						{/if}
						{#if changePassword.isSuccess}
							<p class="text-body-sm text-success">Password updated successfully</p>
						{/if}

						<div class="flex justify-end pt-2">
							<Button
								type="submit"
								loading={changePassword.isLoading}
								disabled={!passwordForm.isValid}
							>
								Update Password
							</Button>
						</div>
					</form>
				</Card>
			</TabsContent>

			<TabsContent value="notifications">
				<Card>
					<div class="space-y-4">
						<h3 class="text-label-lg text-foreground">Notification Preferences</h3>
						<p class="text-body-sm text-muted-foreground">
							Configure how you receive notifications.
						</p>
						<div class="space-y-3">
							{#each ["Email notifications", "Push notifications", "Weekly digest", "Security alerts"] as label}
								<label class="flex items-center justify-between py-2">
									<span class="text-body-sm text-foreground">{label}</span>
									<input type="checkbox" class="h-4 w-4 rounded border-border accent-primary" />
								</label>
							{/each}
						</div>
					</div>
				</Card>
			</TabsContent>
		</div>
	</Tabs>
</div>
