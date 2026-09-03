<script lang="ts">
	import { PageHeader, Tabs, TabsContent, TabsList, TabsTrigger } from "urupe-ui/layouts";
	import { Button, Input, Label, Card } from "urupe-ui";
	import { AdvancedTable, ExportFlow, FacetedSearch, ImportFlow, WizardForm, CrudForm, CrudFormDrawer, CrudFormModal, CrudDeleteConfirm, CrudDetailDrawer } from "urupe-ui/domains/data";
	import { useForm, useQuery, useMutation } from "urupe-ui";
	import * as v from "valibot";

	let activeTab = $state("wizard");

	// ── WizardForm Demo ──
	let wizardStep = $state(0);
	let wizardLoading = $state(false);
	let wizardResult = $state("");
	const wizardSteps = [
		{ id: "personal", title: "Personal Info", description: "Enter your basic information" },
		{ id: "address", title: "Address", description: "Where should we send the package?" },
		{ id: "review", title: "Review", description: "Check everything before submitting" },
	];
	let wizardData = $state({ name: "", email: "", street: "", city: "" });

	function wizardNext() {
		if (wizardStep < wizardSteps.length - 1) wizardStep++;
	}
	function wizardPrev() {
		if (wizardStep > 0) wizardStep--;
	}
	function wizardSubmit() {
		wizardLoading = true;
		setTimeout(() => {
			wizardLoading = false;
			wizardResult = JSON.stringify(wizardData, null, 2);
			wizardStep = 0;
			wizardData = { name: "", email: "", street: "", city: "" };
		}, 1500);
	}

	// ── ExportFlow Demo ──
	let lastExport = $state("");
	function handleExport(format: string) {
		lastExport = format;
	}

	// ── ImportFlow Demo ──
	let importOpen = $state(false);
	let importLoading = $state(false);
	let importedFile = $state("");
	function handleImport(file: File) {
		importLoading = true;
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				importLoading = false;
				importedFile = file.name;
				importOpen = false;
				resolve();
			}, 1500);
		});
	}

	// ── AdvancedTable Demo ──
	const tableColumns = [
		{ key: "name", label: "Name", sortable: true },
		{ key: "email", label: "Email", sortable: true },
		{ key: "role", label: "Role" },
		{ key: "status", label: "Status" },
	];
	const allRows = [
		{ id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
		{ id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
		{ id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "Inactive" },
		{ id: "4", name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active" },
		{ id: "5", name: "Eve Wilson", email: "eve@example.com", role: "Editor", status: "Pending" },
		{ id: "6", name: "Frank Castle", email: "frank@example.com", role: "Viewer", status: "Active" },
		{ id: "7", name: "Grace Hopper", email: "grace@example.com", role: "Admin", status: "Active" },
		{ id: "8", name: "Hank Pym", email: "hank@example.com", role: "Editor", status: "Inactive" },
	];
	let tableSearch = $state("");
	let tableSort = $state(null);
	let tablePage = $state(1);
	let selectedRows = $state(new Set<string | number>());
	const rowsPerPage = 4;

	let filteredTableRows = $derived.by(() => {
		let rows = [...allRows];
		if (tableSearch) {
			const q = tableSearch.toLowerCase();
			rows = rows.filter((r) =>
				r.name.toLowerCase().includes(q) ||
				r.email.toLowerCase().includes(q) ||
				r.role.toLowerCase().includes(q)
			);
		}
		if (tableSort) {
			const { key, direction } = tableSort as { key: string; direction: string };
			rows.sort((a, b) => {
				const av = (a as Record<string, unknown>)[key] ?? "";
				const bv = (b as Record<string, unknown>)[key] ?? "";
				return direction === "asc"
					? String(av).localeCompare(String(bv))
					: String(bv).localeCompare(String(av));
			});
		}
		return rows;
	});
	let pagedTableRows = $derived(
		filteredTableRows.slice((tablePage - 1) * rowsPerPage, tablePage * rowsPerPage)
	);
	let tableTotalPages = $derived(Math.max(1, Math.ceil(filteredTableRows.length / rowsPerPage)));

	// ── FacetedSearch Demo ──
	const facetedFilters = [
		{
			key: "role",
			label: "All Roles",
			options: [
				{ label: "Admin", value: "Admin" },
				{ label: "Editor", value: "Editor" },
				{ label: "Viewer", value: "Viewer" },
			],
		},
		{
			key: "status",
			label: "All Statuses",
			options: [
				{ label: "Active", value: "Active" },
				{ label: "Inactive", value: "Inactive" },
				{ label: "Pending", value: "Pending" },
			],
		},
	];
	let facetedSearch = $state("");
	let facetedActiveFilters = $state<Record<string, string>>({});

	let facetedRows = $derived.by(() => {
		let rows = [...allRows];
		if (facetedSearch) {
			const q = facetedSearch.toLowerCase();
			rows = rows.filter((r) =>
				r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
			);
		}
		for (const [key, value] of Object.entries(facetedActiveFilters)) {
			if (value) rows = rows.filter((r) => (r as Record<string, unknown>)[key] === value);
		}
		return rows;
	});

	// ── useForm Demo ──
	const contactSchema = {
		fullName: v.pipe(v.string(), v.minLength(2, "Name must be at least 2 characters")),
		email: v.pipe(v.string(), v.email("Please enter a valid email")),
		message: v.pipe(v.string(), v.minLength(10, "Message must be at least 10 characters")),
	};
	const contactForm = useForm({
		schema: contactSchema,
		initialValues: { fullName: "", email: "", message: "" },
		onSubmit: (values) => {
			contactSubmitResult = JSON.stringify(values, null, 2);
			contactForm.reset();
		},
	});
	let contactSubmitResult = $state("");

	// ── useQuery/useMutation Demo ──
	let mockTodoId = $state(0);
	const todosQuery = useQuery<{ id: number; title: string; completed: boolean }[]>({
		key: "demo-todos",
		fetcher: () =>
			new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{ id: 1, title: "Learn Svelte 5 runes", completed: true },
						{ id: 2, title: "Build a component library", completed: false },
						{ id: 3, title: "Write documentation", completed: false },
					]);
				}, 800);
			}),
		staleTime: 30_000,
	});

	const addTodoMutation = useMutation<{ id: number; title: string; completed: boolean }, string>({
		mutator: (title) =>
			new Promise((resolve) => {
				setTimeout(() => {
					resolve({ id: ++mockTodoId, title, completed: false });
				}, 600);
			}),
		onSuccess: () => {
			todosQuery.refetch();
		},
		invalidateKeys: ["demo-todos"],
	});

	let newTodoTitle = $state("");
	function handleAddTodo() {
		if (!newTodoTitle.trim()) return;
		addTodoMutation.mutate(newTodoTitle.trim());
		newTodoTitle = "";
	}

	// ── CRUD Component Demos ──
	const crudItemSchema = {
		name: v.pipe(v.string(), v.minLength(2, "Name must be at least 2 characters")),
		email: v.pipe(v.string(), v.email("Please enter a valid email")),
		role: v.pipe(v.string(), v.minLength(1, "Role is required")),
	};

	let crudFormLoading = $state(false);
	let crudSubmitResult = $state("");

	function handleCrudSubmit(e: SubmitEvent) {
		e.preventDefault();
		crudFormLoading = true;
		setTimeout(() => {
			crudFormLoading = false;
			crudSubmitResult = "Submitted successfully!";
			crudCreateForm.reset();
		}, 1000);
	}

	const crudCreateForm = useForm({
		schema: crudItemSchema,
		initialValues: { name: "", email: "", role: "" },
		onSubmit: (values) => {
			crudSubmitResult = JSON.stringify(values, null, 2);
			crudCreateForm.reset();
		},
	});

	const crudEditForm = useForm({
		schema: crudItemSchema,
		initialValues: { name: "Jane Smith", email: "jane@example.com", role: "Editor" },
		onSubmit: (values) => {
			crudSubmitResult = JSON.stringify(values, null, 2);
		},
	});

	let crudCreateDrawerOpen = $state(false);
	let crudCreateModalOpen = $state(false);
	let crudEditDrawerOpen = $state(false);
	let crudEditModalOpen = $state(false);
	let crudDeleteOpen = $state(false);
	let crudDetailOpen = $state(false);

	const mockItemSections = [
		{ label: "Name", value: "Alice Johnson" },
		{ label: "Email", value: "alice@example.com" },
		{ label: "Role", value: "Admin", variant: "primary" as const },
		{ label: "Status", value: "Active", variant: "success" as const },
	];
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Data Components" description="CRUD tables, forms, wizards, import/export, and data fetching" />

	<Tabs bind:value={activeTab}>
		<TabsList class="overflow-x-auto">
			<TabsTrigger value="wizard">Wizard</TabsTrigger>
			<TabsTrigger value="export">Export</TabsTrigger>
			<TabsTrigger value="import">Import</TabsTrigger>
			<TabsTrigger value="table">AdvancedTable</TabsTrigger>
			<TabsTrigger value="faceted">FacetedSearch</TabsTrigger>
			<TabsTrigger value="form">useForm</TabsTrigger>
			<TabsTrigger value="query">Query/Mutation</TabsTrigger>
			<TabsTrigger value="crud-create">CrudForm (create)</TabsTrigger>
			<TabsTrigger value="crud-create-drawer">CrudFormDrawer (create)</TabsTrigger>
			<TabsTrigger value="crud-create-modal">CrudFormModal (create)</TabsTrigger>
			<TabsTrigger value="crud-edit">CrudForm (edit)</TabsTrigger>
			<TabsTrigger value="crud-edit-drawer">CrudFormDrawer (edit)</TabsTrigger>
			<TabsTrigger value="crud-edit-modal">CrudFormModal (edit)</TabsTrigger>
			<TabsTrigger value="crud-delete">CrudDeleteConfirm</TabsTrigger>
			<TabsTrigger value="crud-detail">CrudDetailDrawer</TabsTrigger>
		</TabsList>

		<TabsContent value="wizard">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">WizardForm</h2>
				<p class="text-body-sm text-muted-foreground">Multi-step form wizard with progress tracking</p>
				<WizardForm
					steps={wizardSteps}
					bind:currentStep={wizardStep}
					onNext={wizardNext}
					onPrev={wizardPrev}
					onSubmit={wizardSubmit}
					loading={wizardLoading}
				>
					{#if wizardStep === 0}
						<div class="space-y-4">
							<div>
								<Label for="wiz-name">Full Name</Label>
								<Input name="wiz-name" bind:value={wizardData.name} placeholder="Jane Doe" />
							</div>
							<div>
								<Label for="wiz-email">Email</Label>
								<Input name="wiz-email" type="email" bind:value={wizardData.email} placeholder="jane@example.com" />
							</div>
						</div>
					{:else if wizardStep === 1}
						<div class="space-y-4">
							<div>
								<Label for="wiz-street">Street Address</Label>
								<Input name="wiz-street" bind:value={wizardData.street} placeholder="123 Main St" />
							</div>
							<div>
								<Label for="wiz-city">City</Label>
								<Input name="wiz-city" bind:value={wizardData.city} placeholder="Springfield" />
							</div>
						</div>
					{:else}
						<Card padding>
							<div class="space-y-2 text-body-sm">
								<p><strong>Name:</strong> {wizardData.name || '—'}</p>
								<p><strong>Email:</strong> {wizardData.email || '—'}</p>
								<p><strong>Address:</strong> {wizardData.street || '—'}, {wizardData.city || '—'}</p>
							</div>
						</Card>
					{/if}
				</WizardForm>
				{#if wizardResult}
					<Card padding>
						<h3 class="text-label-md text-foreground mb-2">Submitted Data</h3>
						<pre class="text-body-sm text-muted-foreground whitespace-pre-wrap">{wizardResult}</pre>
					</Card>
				{/if}
			</div>
		</TabsContent>

		<TabsContent value="export">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">ExportFlow</h2>
				<p class="text-body-sm text-muted-foreground">Dropdown menu for data export in multiple formats</p>
				<Card padding>
					<div class="flex items-center gap-4">
						<ExportFlow onExport={handleExport} />
						{#if lastExport}
							<span class="text-body-sm text-muted-foreground">
								Last export: <strong class="text-foreground">{lastExport.toUpperCase()}</strong>
							</span>
						{/if}
					</div>
				</Card>
				<div class="text-body-sm text-muted-foreground">
					Formats available: CSV, JSON, PDF, Excel
				</div>
			</div>
		</TabsContent>

		<TabsContent value="import">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">ImportFlow</h2>
				<p class="text-body-sm text-muted-foreground">File import dialog with drag-and-drop and preview</p>
				<Card padding>
					<div class="flex items-center gap-4">
						<Button onclick={() => (importOpen = true)}>Open Import Dialog</Button>
						{#if importedFile}
							<span class="text-body-sm text-muted-foreground">
								Imported: <strong class="text-foreground">{importedFile}</strong>
							</span>
						{/if}
					</div>
				</Card>
				<ImportFlow
					bind:open={importOpen}
					onUpload={handleImport}
					loading={importLoading}
				>
					{#snippet preview()}
						<Card padding>
							<p class="text-body-sm text-muted-foreground">Preview of imported data would appear here.</p>
						</Card>
					{/snippet}
				</ImportFlow>
			</div>
		</TabsContent>

		<TabsContent value="table">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">AdvancedTable</h2>
				<p class="text-body-sm text-muted-foreground">Searchable, sortable, paginated table with row selection</p>
				<AdvancedTable
					columns={tableColumns}
					rows={pagedTableRows}
					bind:searchValue={tableSearch}
					bind:sort={tableSort}
					searchPlaceholder="Search users..."
					createLabel="Add User"
					onCreate={() => console.log("Create user")}
					onRowClick={(row: Record<string, unknown>) => console.log("Row click:", row)}
					currentPage={tablePage}
					totalPages={tableTotalPages}
					onPageChange={(p: number) => (tablePage = p)}
					selectable
					bind:selectedRows
					rowIdKey="id"
				/>
			</div>
		</TabsContent>

		<TabsContent value="faceted">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">FacetedSearch</h2>
				<p class="text-body-sm text-muted-foreground">Search input with faceted dropdown filters</p>
				<FacetedSearch
					searchPlaceholder="Search by name or email..."
					filters={facetedFilters}
					bind:searchValue={facetedSearch}
					bind:activeFilters={facetedActiveFilters}
				/>
				<div class="rounded-[--radius] border border-border overflow-hidden">
					<table class="w-full text-body-sm">
						<thead>
							<tr class="bg-muted border-b border-border">
								<th class="text-left px-4 py-2 text-label-sm text-muted-foreground">Name</th>
								<th class="text-left px-4 py-2 text-label-sm text-muted-foreground">Email</th>
								<th class="text-left px-4 py-2 text-label-sm text-muted-foreground">Role</th>
								<th class="text-left px-4 py-2 text-label-sm text-muted-foreground">Status</th>
							</tr>
						</thead>
						<tbody>
							{#each facetedRows as row}
								<tr class="border-b border-border hover:bg-muted/50">
									<td class="px-4 py-2 text-foreground">{row.name}</td>
									<td class="px-4 py-2 text-muted-foreground">{row.email}</td>
									<td class="px-4 py-2 text-muted-foreground">{row.role}</td>
									<td class="px-4 py-2 text-muted-foreground">{row.status}</td>
								</tr>
							{:else}
								<tr>
									<td colspan="4" class="px-4 py-8 text-center text-muted-foreground">No results found.</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<p class="text-body-sm text-muted-foreground">
					{facetedRows.length} of {allRows.length} users shown
				</p>
			</div>
		</TabsContent>

		<TabsContent value="form">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">useForm</h2>
				<p class="text-body-sm text-muted-foreground">Live form with valibot schema validation, dirty tracking, and error states</p>
				<div class="max-w-lg">
					<form onsubmit={contactForm.handleSubmit} class="space-y-4">
						<div>
							<Label for="cf-name">Full Name</Label>
							<Input
								name="cf-name"
								bind:value={contactForm.values.fullName}
								placeholder="Jane Doe"
							/>
							{#if contactForm.errors.fullName}
								<p class="text-body-sm text-destructive mt-1">{contactForm.errors.fullName}</p>
							{/if}
						</div>
						<div>
							<Label for="cf-email">Email</Label>
							<Input
								name="cf-email"
								type="email"
								bind:value={contactForm.values.email}
								placeholder="jane@example.com"
							/>
							{#if contactForm.errors.email}
								<p class="text-body-sm text-destructive mt-1">{contactForm.errors.email}</p>
							{/if}
						</div>
						<div>
							<Label for="cf-message">Message</Label>
							<Input
								name="cf-message"
								type="textarea"
								bind:value={contactForm.values.message}
								placeholder="Tell us what you need help with..."
							/>
							{#if contactForm.errors.message}
								<p class="text-body-sm text-destructive mt-1">{contactForm.errors.message}</p>
							{/if}
						</div>
						<div class="flex items-center gap-3">
							<Button type="submit" disabled={contactForm.isSubmitting}>
								{contactForm.isSubmitting ? 'Sending...' : 'Send Message'}
							</Button>
							<Button variant="ghost" type="button" onclick={() => contactForm.reset()}>Reset</Button>
							<span class="text-body-sm text-muted-foreground">
								{contactForm.isDirty ? 'Modified' : 'Clean'}
							</span>
						</div>
					</form>
				</div>
				{#if contactSubmitResult}
					<Card padding>
						<h3 class="text-label-md text-foreground mb-2">Submitted Values</h3>
						<pre class="text-body-sm text-muted-foreground whitespace-pre-wrap">{contactSubmitResult}</pre>
					</Card>
				{/if}
			</div>
		</TabsContent>

		<TabsContent value="query">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">useQuery / useMutation</h2>
				<p class="text-body-sm text-muted-foreground">Reactive data fetching with caching and mutations with invalidation</p>

				<div class="max-w-lg space-y-4">
					<Card padding>
						<div class="flex items-center justify-between mb-3">
							<h3 class="text-label-md text-foreground">Todos</h3>
							<Button variant="ghost" size="sm" onclick={() => todosQuery.refetch()} disabled={todosQuery.isFetching}>
								{todosQuery.isFetching ? 'Refreshing...' : 'Refresh'}
							</Button>
						</div>
						{#if todosQuery.isLoading}
							<div class="space-y-2">
								<div class="h-10 bg-muted rounded animate-pulse"></div>
								<div class="h-10 bg-muted rounded animate-pulse"></div>
								<div class="h-10 bg-muted rounded animate-pulse"></div>
							</div>
						{:else if todosQuery.isError}
							<p class="text-body-sm text-destructive">{todosQuery.error?.message}</p>
						{:else}
							<ul class="space-y-2">
								{#each (todosQuery.data ?? []) as todo}
									<li class="flex items-center gap-3 px-3 py-2 rounded-[--radius] bg-muted/50">
										<span class="text-body-sm {todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}">
											{todo.title}
										</span>
										{#if todo.completed}
											<span class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Done</span>
										{/if}
									</li>
								{/each}
							</ul>
							<p class="text-body-sm text-muted-foreground mt-2">
								Status: {todosQuery.status} | Stale: {todosQuery.isStale}
							</p>
						{/if}
					</Card>

					<Card padding>
						<h3 class="text-label-md text-foreground mb-3">Add Todo</h3>
						<div class="flex gap-2">
							<Input
								name="new-todo"
								bind:value={newTodoTitle}
								placeholder="New todo..."
							/>
							<Button onclick={handleAddTodo} disabled={addTodoMutation.isLoading || !newTodoTitle.trim()}>
								{addTodoMutation.isLoading ? 'Adding...' : 'Add'}
							</Button>
						</div>
						{#if addTodoMutation.isSuccess}
							<p class="text-body-sm text-primary mt-2">Added: {addTodoMutation.data?.title}</p>
						{:else if addTodoMutation.isError}
							<p class="text-body-sm text-destructive mt-2">{addTodoMutation.error?.message}</p>
						{/if}
					</Card>
				</div>
			</div>
		</TabsContent>

		<TabsContent value="crud-create">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudForm (create mode)</h2>
				<p class="text-body-sm text-muted-foreground">Inline create form with title, description, and validation</p>
				<div class="max-w-lg">
					<CrudForm
						mode="create"
						config={{ title: "Create New User", description: "Fill in the details to create a new user account", submitLabel: "Create User" }}
						form={crudCreateForm}
						onSubmit={handleCrudSubmit}
						loading={crudFormLoading}
					>
						<div class="space-y-4">
							<div>
								<Label for="crud-name">Name</Label>
								<Input name="crud-name" bind:value={crudCreateForm.values.name} placeholder="Jane Doe" />
								{#if crudCreateForm.errors.name}
									<p class="text-body-sm text-destructive mt-1">{crudCreateForm.errors.name}</p>
								{/if}
							</div>
							<div>
								<Label for="crud-email">Email</Label>
								<Input name="crud-email" type="email" bind:value={crudCreateForm.values.email} placeholder="jane@example.com" />
								{#if crudCreateForm.errors.email}
									<p class="text-body-sm text-destructive mt-1">{crudCreateForm.errors.email}</p>
								{/if}
							</div>
							<div>
								<Label for="crud-role">Role</Label>
								<Input name="crud-role" bind:value={crudCreateForm.values.role} placeholder="Admin, Editor, Viewer" />
								{#if crudCreateForm.errors.role}
									<p class="text-body-sm text-destructive mt-1">{crudCreateForm.errors.role}</p>
								{/if}
							</div>
						</div>
					</CrudForm>
				</div>
				{#if crudSubmitResult}
					<Card padding>
						<h3 class="text-label-md text-foreground mb-2">Submitted</h3>
						<pre class="text-body-sm text-muted-foreground whitespace-pre-wrap">{crudSubmitResult}</pre>
					</Card>
				{/if}
			</div>
		</TabsContent>

		<TabsContent value="crud-create-drawer">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudFormDrawer (create mode)</h2>
				<p class="text-body-sm text-muted-foreground">Side drawer for creating a new record</p>
				<Card padding>
					<Button onclick={() => (crudCreateDrawerOpen = true)}>Open Create Drawer</Button>
				</Card>
				<CrudFormDrawer
					mode="create"
					bind:open={crudCreateDrawerOpen}
					config={{ title: "Create New User", submitLabel: "Create" }}
					loading={false}
				>
					<div class="space-y-4">
						<div>
							<Label for="drawer-name">Name</Label>
							<Input name="drawer-name" placeholder="Jane Doe" />
						</div>
						<div>
							<Label for="drawer-email">Email</Label>
							<Input name="drawer-email" type="email" placeholder="jane@example.com" />
						</div>
					</div>
				</CrudFormDrawer>
			</div>
		</TabsContent>

		<TabsContent value="crud-create-modal">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudFormModal (create mode)</h2>
				<p class="text-body-sm text-muted-foreground">Modal dialog for creating a new record</p>
				<Card padding>
					<Button onclick={() => (crudCreateModalOpen = true)}>Open Create Modal</Button>
				</Card>
				<CrudFormModal
					mode="create"
					bind:open={crudCreateModalOpen}
					config={{ title: "Create New User", submitLabel: "Create" }}
					loading={false}
				>
					<div class="space-y-4">
						<div>
							<Label for="modal-name">Name</Label>
							<Input name="modal-name" placeholder="Jane Doe" />
						</div>
						<div>
							<Label for="modal-email">Email</Label>
							<Input name="modal-email" type="email" placeholder="jane@example.com" />
						</div>
					</div>
				</CrudFormModal>
			</div>
		</TabsContent>

		<TabsContent value="crud-edit">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudForm (edit mode)</h2>
				<p class="text-body-sm text-muted-foreground">Inline edit form pre-populated with existing data</p>
				<div class="max-w-lg">
					<CrudForm
						mode="edit"
						config={{ title: "Edit User", description: "Update user account details", submitLabel: "Save Changes" }}
						form={crudEditForm}
						onSubmit={(e) => { e.preventDefault(); crudEditForm.handleSubmit(); }}
						loading={false}
					>
						<div class="space-y-4">
							<div>
								<Label for="edit-name">Name</Label>
								<Input name="edit-name" bind:value={crudEditForm.values.name} />
								{#if crudEditForm.errors.name}
									<p class="text-body-sm text-destructive mt-1">{crudEditForm.errors.name}</p>
								{/if}
							</div>
							<div>
								<Label for="edit-email">Email</Label>
								<Input name="edit-email" type="email" bind:value={crudEditForm.values.email} />
								{#if crudEditForm.errors.email}
									<p class="text-body-sm text-destructive mt-1">{crudEditForm.errors.email}</p>
								{/if}
							</div>
							<div>
								<Label for="edit-role">Role</Label>
								<Input name="edit-role" bind:value={crudEditForm.values.role} />
								{#if crudEditForm.errors.role}
									<p class="text-body-sm text-destructive mt-1">{crudEditForm.errors.role}</p>
								{/if}
							</div>
						</div>
					</CrudForm>
				</div>
			</div>
		</TabsContent>

		<TabsContent value="crud-edit-drawer">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudFormDrawer (edit mode)</h2>
				<p class="text-body-sm text-muted-foreground">Side drawer for editing an existing record</p>
				<Card padding>
					<Button onclick={() => (crudEditDrawerOpen = true)}>Open Edit Drawer</Button>
				</Card>
				<CrudFormDrawer
					mode="edit"
					bind:open={crudEditDrawerOpen}
					config={{ title: "Edit User", submitLabel: "Update" }}
					loading={false}
				>
					<div class="space-y-4">
						<div>
							<Label for="edit-drawer-name">Name</Label>
							<Input name="edit-drawer-name" value="Jane Smith" />
						</div>
						<div>
							<Label for="edit-drawer-email">Email</Label>
							<Input name="edit-drawer-email" type="email" value="jane@example.com" />
						</div>
					</div>
				</CrudFormDrawer>
			</div>
		</TabsContent>

		<TabsContent value="crud-edit-modal">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudFormModal (edit mode)</h2>
				<p class="text-body-sm text-muted-foreground">Modal dialog for editing an existing record</p>
				<Card padding>
					<Button onclick={() => (crudEditModalOpen = true)}>Open Edit Modal</Button>
				</Card>
				<CrudFormModal
					mode="edit"
					bind:open={crudEditModalOpen}
					config={{ title: "Edit User", submitLabel: "Update" }}
					loading={false}
				>
					<div class="space-y-4">
						<div>
							<Label for="edit-modal-name">Name</Label>
							<Input name="edit-modal-name" value="Jane Smith" />
						</div>
						<div>
							<Label for="edit-modal-email">Email</Label>
							<Input name="edit-modal-email" type="email" value="jane@example.com" />
						</div>
					</div>
				</CrudFormModal>
			</div>
		</TabsContent>

		<TabsContent value="crud-delete">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudDeleteConfirm</h2>
				<p class="text-body-sm text-muted-foreground">Confirmation dialog for destructive delete actions</p>
				<Card padding>
					<Button variant="destructive" onclick={() => (crudDeleteOpen = true)}>Delete User</Button>
				</Card>
				<CrudDeleteConfirm
					bind:open={crudDeleteOpen}
					title="Delete User"
					description="Are you sure you want to delete this user?"
					itemName="Alice Johnson"
					onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1000))}
					confirmLabel="Delete User"
				/>
			</div>
		</TabsContent>

		<TabsContent value="crud-detail">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground">CrudDetailDrawer</h2>
				<p class="text-body-sm text-muted-foreground">Side drawer for viewing record details with labeled sections</p>
				<Card padding>
					<Button onclick={() => (crudDetailOpen = true)}>View User Details</Button>
				</Card>
				<CrudDetailDrawer
					bind:open={crudDetailOpen}
					title="User Details"
					sections={mockItemSections}
				>
					<p class="text-body-sm text-muted-foreground">Additional notes or custom content can go here.</p>
				</CrudDetailDrawer>
			</div>
		</TabsContent>
	</Tabs>
</div>
