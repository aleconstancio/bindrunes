export interface CloudflareAdapterOptions {
	name?: string;
	routes?: { include?: string[]; exclude?: string[] };
}

export function cloudflareConfig(options?: CloudflareAdapterOptions) {
	const { name = "my-app", routes } = options ?? {};
	return {
		adapter: "adapter-cloudflare",
		config: { name, routes },
	};
}
