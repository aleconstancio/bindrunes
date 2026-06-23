import { describe, expect, it, vi } from "vitest";
import {
	combineHooks,
	createAuthGuard,
	createCorsHook,
	createCsrfGuard,
	createLocaleRedirect,
	createLogger,
	createRateLimit,
	createSecurityHeaders,
} from "./hooks";

function mockEvent(pathname = "/", session: any = null) {
	return {
		url: new URL(`http://localhost${pathname}`),
		locals: { session },
		request: { method: "GET", headers: new Headers() },
		getClientAddress: () => "127.0.0.1",
	} as any;
}

function resolveOk() {
	return vi.fn().mockResolvedValue(new Response("ok"));
}

describe("createAuthGuard", () => {
	it("redirects unauthenticated to login with redirect param", async () => {
		const handle = createAuthGuard();
		const event = mockEvent("/dashboard");
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe("/login?redirect=/dashboard");
	});

	it("does not redirect authenticated users", async () => {
		const handle = createAuthGuard();
		const event = mockEvent("/dashboard", { user: { id: "1" } });
		const resolve = resolveOk();
		await handle({ event, resolve } as any);

		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("redirects authenticated user away from login to appPath", async () => {
		const handle = createAuthGuard();
		const event = mockEvent("/login", { user: { id: "1" } });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe("/app");
	});

	it("redirects authenticated away from register to appPath", async () => {
		const handle = createAuthGuard();
		const event = mockEvent("/register", { user: { id: "1" } });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe("/app");
	});

	it("redirects authenticated away from forgot-password to appPath", async () => {
		const handle = createAuthGuard();
		const event = mockEvent("/forgot-password", { user: { id: "1" } });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe("/app");
	});

	it("allows unauthenticated to access auth routes", async () => {
		const handle = createAuthGuard();
		const event = mockEvent("/login", null);
		const resolve = resolveOk();
		await handle({ event, resolve } as any);

		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("allows unauthenticated to access register", async () => {
		const handle = createAuthGuard();
		const event = mockEvent("/register", null);
		const resolve = resolveOk();
		await handle({ event, resolve } as any);

		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("respects requireAuth=false (no guard)", async () => {
		const handle = createAuthGuard({ requireAuth: false });
		const event = mockEvent("/dashboard", null);
		const resolve = resolveOk();
		await handle({ event, resolve } as any);

		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("uses custom loginPath", async () => {
		const handle = createAuthGuard({ loginPath: "/auth/signin" });
		const event = mockEvent("/secret", null);
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.headers.get("Location")).toBe("/auth/signin?redirect=/secret");
	});

	it("uses custom appPath", async () => {
		const handle = createAuthGuard({ appPath: "/dashboard" });
		const event = mockEvent("/login", { user: { id: "1" } });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.headers.get("Location")).toBe("/dashboard");
	});
});

describe("createCsrfGuard", () => {
	it("allows GET requests", async () => {
		const handle = createCsrfGuard(["http://localhost:3000"]);
		const event = { request: { method: "GET", headers: new Headers() } } as any;
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalled();
	});

	it("allows POST with valid origin", async () => {
		const handle = createCsrfGuard(["http://localhost:3000"]);
		const event = {
			request: {
				method: "POST",
				headers: new Headers({ origin: "http://localhost:3000" }),
			},
		} as any;
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalled();
	});

	it("blocks POST with invalid origin", async () => {
		const handle = createCsrfGuard(["http://localhost:3000"]);
		const event = {
			request: {
				method: "POST",
				headers: new Headers({ origin: "http://evil.com" }),
			},
		} as any;
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(403);
		expect(resolve).not.toHaveBeenCalled();
	});

	it("allows POST with no origin header", async () => {
		const handle = createCsrfGuard(["http://localhost:3000"]);
		const event = {
			request: {
				method: "POST",
				headers: new Headers(),
			},
		} as any;
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalled();
	});
});

describe("createLocaleRedirect", () => {
	it("redirects bare path to locale prefix", async () => {
		const handle = createLocaleRedirect();
		const event = mockEvent("/_about");
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe("/en/_about");
	});

	it("does not redirect paths with locale prefix", async () => {
		const handle = createLocaleRedirect();
		const event = mockEvent("/en/_about");
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("does not redirect /api routes", async () => {
		const handle = createLocaleRedirect();
		const event = mockEvent("/api/health");
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("does not redirect static files", async () => {
		const handle = createLocaleRedirect();
		const event = mockEvent("/style.css");
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("uses custom default locale", async () => {
		const handle = createLocaleRedirect("de");
		const event = mockEvent("/_kontakt");
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);

		expect(res).toBeInstanceOf(Response);
		expect(res.headers.get("Location")).toBe("/de/_kontakt");
	});

	it("does not redirect root path with locale", async () => {
		const handle = createLocaleRedirect();
		const event = mockEvent("/en");
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalledWith(event);
	});

	it("handles region-style locale in URL", async () => {
		const handle = createLocaleRedirect();
		const event = mockEvent("/en-GB/about");
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalledWith(event);
	});
});

describe("combineHooks", () => {
	it("returns a handle function", () => {
		const handle = combineHooks();
		expect(typeof handle).toBe("function");
	});
});

describe("createRateLimit", () => {
	it("allows requests within the limit", async () => {
		const handle = createRateLimit({ max: 3, windowMs: 60_000 });
		const event = mockEvent();
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(200);
	});

	it("returns 429 when limit exceeded", async () => {
		const handle = createRateLimit({ max: 2, windowMs: 60_000 });
		const event = mockEvent();
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		await handle({ event, resolve } as any);
		const res = await handle({ event, resolve } as any);
		expect(res).toBeInstanceOf(Response);
		expect(res.status).toBe(429);
		const body = await res.json();
		expect(body.error).toBe("Too many requests");
		expect(body.retryAfter).toBeGreaterThan(0);
	});

	it("resets count after window expires", async () => {
		const handle = createRateLimit({ max: 1, windowMs: 1 });
		const event = mockEvent();
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		await new Promise((r) => setTimeout(r, 10));
		const res = await handle({ event, resolve } as any);
		expect(res.status).toBe(200);
	});

	it("uses custom message", async () => {
		const handle = createRateLimit({ max: 1, windowMs: 60_000, message: "slow down" });
		const event = mockEvent();
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		const res = await handle({ event, resolve } as any);
		const body = await res.json();
		expect(body.error).toBe("slow down");
	});

	it("uses custom keyGenerator", async () => {
		const keyGen = vi.fn().mockReturnValue("custom-key");
		const handle = createRateLimit({ max: 1, windowMs: 60_000, keyGenerator: keyGen });
		const event = mockEvent();
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		expect(keyGen).toHaveBeenCalled();
	});

	it("includes Retry-After header in 429 response", async () => {
		const handle = createRateLimit({ max: 1, windowMs: 60_000 });
		const event = mockEvent();
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Retry-After")).toBeTruthy();
	});

	it("sets Content-Type to application/json in 429", async () => {
		const handle = createRateLimit({ max: 1, windowMs: 60_000 });
		const event = mockEvent();
		const resolve = resolveOk();
		await handle({ event, resolve } as any);
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Content-Type")).toBe("application/json");
	});
});

describe("createCorsHook", () => {
	it("sets Access-Control-Allow-Origin to * by default", async () => {
		const handle = createCorsHook();
		const event = mockEvent();
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
	});

	it("returns 204 for OPTIONS preflight", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://example.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook();
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.status).toBe(204);
	});

	it("sets methods header from options", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://example.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook({ methods: ["GET", "POST"] });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Allow-Methods")).toBe("GET, POST");
	});

	it("sets allowed headers", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://example.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook({ allowedHeaders: ["X-Custom"] });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Allow-Headers")).toBe("X-Custom");
	});

	it("sets credentials header when enabled", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://example.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook({ credentials: true, origin: "http://example.com" });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Allow-Credentials")).toBe("true");
	});

	it("sets exposed headers", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://example.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook({ exposedHeaders: ["X-Request-Id"] });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Expose-Headers")).toBe("X-Request-Id");
	});

	it("sets max-age header", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://example.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook({ maxAge: 3600 });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Max-Age")).toBe("3600");
	});

	it("allows matching origin from array", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://a.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook({ origin: ["http://a.com", "http://b.com"] });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Allow-Origin")).toBe("http://a.com");
	});

	it("returns null origin when request origin not in allowed list", async () => {
		const event = {
			url: new URL("http://localhost/test"),
			request: { method: "OPTIONS", headers: new Headers({ origin: "http://evil.com" }) },
			locals: {},
		} as any;
		const handle = createCorsHook({ origin: ["http://a.com"], credentials: true });
		const resolve = resolveOk();
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
	});

	it("adds CORS headers to non-OPTIONS response", async () => {
		const event = mockEvent();
		const handle = createCorsHook();
		const resolve = vi.fn().mockResolvedValue(new Response("body", { status: 200 }));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
	});

	it("preserves existing response headers", async () => {
		const event = mockEvent();
		const handle = createCorsHook();
		const originalResponse = new Response("body", { status: 200, headers: { "X-Custom": "yes" } });
		const resolve = vi.fn().mockResolvedValue(originalResponse);
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("X-Custom")).toBe("yes");
		expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
	});
});

describe("createSecurityHeaders", () => {
	it("sets default security headers", async () => {
		const handle = createSecurityHeaders();
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Content-Security-Policy")).toContain("default-src 'self'");
		expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
		expect(res.headers.get("X-Frame-Options")).toBe("SAMEORIGIN");
		expect(res.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
		expect(res.headers.get("Strict-Transport-Security")).toContain("max-age=31536000");
		expect(res.headers.get("X-XSS-Protection")).toBe("1; mode=block");
	});

	it("disables X-Content-Type-Options when false", async () => {
		const handle = createSecurityHeaders({ contentTypeOptions: false });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("X-Content-Type-Options")).toBeNull();
	});

	it("disables X-Frame-Options when null", async () => {
		const handle = createSecurityHeaders({ frameOptions: null });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("X-Frame-Options")).toBeNull();
	});

	it("sets custom CSP", async () => {
		const handle = createSecurityHeaders({ contentSecurityPolicy: "img-src 'none'" });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Content-Security-Policy")).toBe("img-src 'none'");
	});

	it("sets permissions policy", async () => {
		const handle = createSecurityHeaders({
			permissionsPolicy: { camera: "none", microphone: "()" },
		});
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		const policy = res.headers.get("Permissions-Policy");
		expect(policy).toContain("camera=none");
		expect(policy).toContain("microphone=()");
	});

	it("disables X-XSS-Protection when false", async () => {
		const handle = createSecurityHeaders({ xssProtection: false });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("X-XSS-Protection")).toBeNull();
	});

	it("disables CSP when empty string", async () => {
		const handle = createSecurityHeaders({ contentSecurityPolicy: "" });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Content-Security-Policy")).toBeNull();
	});

	it("sets custom referrer policy", async () => {
		const handle = createSecurityHeaders({ referrerPolicy: "no-referrer" });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Referrer-Policy")).toBe("no-referrer");
	});

	it("sets custom HSTS", async () => {
		const handle = createSecurityHeaders({ strictTransportSecurity: "max-age=86400" });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		const res = await handle({ event, resolve } as any);
		expect(res.headers.get("Strict-Transport-Security")).toBe("max-age=86400");
	});

	it("preserves existing response status", async () => {
		const handle = createSecurityHeaders();
		const event = mockEvent();
		const resolve = vi
			.fn()
			.mockResolvedValue(new Response("ok", { status: 201, statusText: "Created" }));
		const res = await handle({ event, resolve } as any);
		expect(res.status).toBe(201);
		expect(res.statusText).toBe("Created");
	});
});

describe("createLogger", () => {
	it("calls logMethod with request details", async () => {
		const logMethod = vi.fn();
		const handle = createLogger({ logMethod });
		const event = mockEvent("/test");
		event.request = { method: "GET", headers: new Headers() } as any;
		const resolve = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
		await handle({ event, resolve } as any);
		expect(logMethod).toHaveBeenCalledTimes(1);
		const entry = logMethod.mock.calls[0][0];
		expect(entry.method).toBe("GET");
		expect(entry.url).toBe("/test");
		expect(entry.status).toBe(200);
		expect(entry.duration).toBeGreaterThanOrEqual(0);
		expect(entry.timestamp).toBeTruthy();
	});

	it("does not log ignored paths", async () => {
		const logMethod = vi.fn();
		const handle = createLogger({ logMethod, ignorePaths: ["/favicon"] });
		const event = mockEvent("/favicon.ico");
		event.request = { method: "GET", headers: new Headers() } as any;
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		await handle({ event, resolve } as any);
		expect(logMethod).not.toHaveBeenCalled();
	});

	it("passes origin and user-agent headers", async () => {
		const logMethod = vi.fn();
		const handle = createLogger({ logMethod });
		const event = mockEvent("/api");
		event.request = {
			method: "POST",
			headers: new Headers({ origin: "http://example.com", "user-agent": "test-agent" }),
		} as any;
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		await handle({ event, resolve } as any);
		const entry = logMethod.mock.calls[0][0];
		expect(entry.origin).toBe("http://example.com");
		expect(entry.userAgent).toBe("test-agent");
	});

	it("still resolves the request", async () => {
		const handle = createLogger({ logMethod: vi.fn() });
		const event = mockEvent();
		const resolve = vi.fn().mockResolvedValue(new Response("body"));
		const res = await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalled();
		expect(res.status).toBe(200);
	});
});
