export interface NavItem {
	label: string;
	href: string;
	items?: NavItem[];
}

export const docsNav: NavItem[] = [
	{
		label: "Getting Started",
		href: "/docs/getting-started",
	},
	{
		label: "Architecture",
		href: "/docs/architecture",
	},
	{
		label: "Components",
		href: "/docs/components",
	},
	{
		label: "Composables",
		href: "/docs/composables",
	},
	{
		label: "Design System",
		href: "/docs/design-system",
	},
	{
		label: "Security",
		href: "/docs/security",
	},
	{
		label: "Testing",
		href: "/docs/testing",
	},
	{
		label: "Changelog",
		href: "/docs/changelog",
	},
	{
		label: "Contributing",
		href: "/docs/contributing",
	},
	{
		label: "Playground",
		href: "/docs/playground/builder",
	},
];

export const kitNav: NavItem[] = [
	{ label: "Getting Started", href: "/kit/getting-started" },
	{ label: "Full-Stack Mode", href: "/kit/full-stack" },
	{ label: "SPA + Backend", href: "/kit/spa-backend" },
	{ label: "Authentication", href: "/kit/auth" },
	{ label: "Internationalization", href: "/kit/i18n" },
	{ label: "Deployment", href: "/kit/deployment" },
	{ label: "API Reference", href: "/kit/api-reference" },
];

export const migrationNav: NavItem[] = [
	{ label: "From shadcn-svelte", href: "/migration/shadcn-svelte" },
	{ label: "From melt-ui", href: "/migration/melt-ui" },
	{ label: "From Skeleton", href: "/migration/skeleton" },
];

export const examplesNav: NavItem[] = [
	{ label: "Showcase", href: "/examples/showcase" },
	{ label: "Webapp", href: "/examples/webapp" },
	{ label: "Landing", href: "/examples/landing" },
];
