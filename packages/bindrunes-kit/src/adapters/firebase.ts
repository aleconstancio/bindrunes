/**
 * Firebase Hosting adapter configuration helper.
 * Use with @sveltejs/adapter-static for SPA deployment.
 */
export interface FirebaseAdapterOptions {
	site?: string;
	trailingSlash?: boolean;
}

export function firebaseConfig(options?: FirebaseAdapterOptions) {
	const _options = options ?? {};

	return {
		adapter: "adapter-static",
		config: {
			fallback: "index.html",
			precompress: true,
			strict: true,
		},
		firebaseJson: {
			hosting: {
				public: "build",
				ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
				rewrites: [{ source: "**", destination: "/index.html" }],
				headers: [
					{
						source: "**",
						headers: [
							{ key: "X-Content-Type-Options", value: "nosniff" },
							{ key: "X-Frame-Options", value: "DENY" },
							{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
						],
					},
				],
			},
		},
	};
}

export function generateFirebaseJson(options?: FirebaseAdapterOptions): string {
	return JSON.stringify(firebaseConfig(options).firebaseJson, null, 2);
}
