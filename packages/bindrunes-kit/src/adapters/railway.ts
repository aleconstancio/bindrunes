export interface RailwayAdapterOptions {
	port?: number;
}

export function railwayConfig(options?: RailwayAdapterOptions) {
	const { port = 3000 } = options ?? {};
	return {
		adapter: "adapter-node",
		config: { out: "build" },
		railwayJson: {
			build: { builder: "nixpacks" },
			deploy: { startCommand: "node build/index.js", healthcheckPath: "/" },
		},
	};
}
