export interface GcpAdapterOptions {
	runtime?: "nodejs20" | "nodejs22";
	region?: string;
	memory?: string;
	timeout?: string;
	maxInstances?: number;
}

export function gcpConfig(options?: GcpAdapterOptions) {
	const {
		runtime = "nodejs20",
		region = "us-central1",
		memory = "1Gi",
		timeout = "30s",
		maxInstances = 10,
	} = options ?? {};

	return {
		adapter: "adapter-node",
		config: {
			runtime,
			region,
			memory,
			timeout,
			maxInstances,
		},
	};
}
