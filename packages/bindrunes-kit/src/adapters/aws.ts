export interface AwsAdapterOptions {
	runtime?: "nodejs20.x" | "nodejs22.x";
	region?: string;
	memory?: number;
	timeout?: number;
}

export function awsConfig(options?: AwsAdapterOptions) {
	const {
		runtime = "nodejs20.x",
		region = "us-east-1",
		memory = 1024,
		timeout = 30,
	} = options ?? {};

	return {
		adapter: "adapter-node",
		config: {
			runtime,
			region,
			memory,
			timeout,
		},
	};
}
