/**
 * Node.js adapter configuration helper.
 * Use with @sveltejs/adapter-node.
 */
export interface NodeAdapterOptions {
	out?: string;
	precompress?: boolean;
	env?: string[];
}

export function nodeConfig(options?: NodeAdapterOptions) {
	const { out = "build", precompress = false, env = [] } = options ?? {};

	return {
		adapter: "adapter-node",
		config: {
			out,
			precompress,
			env,
		},
	};
}
