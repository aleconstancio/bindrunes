/**
 * Vercel adapter configuration helper.
 * Use with @sveltejs/adapter-vercel.
 */
export interface VercelAdapterOptions {
	runtime?: "edge" | "nodejs";
	regions?: string[];
	maxDuration?: number;
}

export function vercelConfig(options?: VercelAdapterOptions) {
	const { runtime = "nodejs", regions = ["iad1"], maxDuration = 30 } = options ?? {};

	return {
		adapter: "adapter-vercel",
		config: {
			runtime,
			regions,
			maxDuration,
		},
	};
}
