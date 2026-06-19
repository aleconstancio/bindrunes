export interface DockerAdapterOptions {
	nodeVersion?: string;
	port?: number;
}

export function dockerConfig(options?: DockerAdapterOptions) {
	const { nodeVersion = "20-alpine", port = 3000 } = options ?? {};
	return {
		adapter: "adapter-node",
		dockerfile: `FROM node:${nodeVersion} AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:${nodeVersion}
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE ${port}
CMD ["node", "build/index.js"]`,
		port,
	};
}
