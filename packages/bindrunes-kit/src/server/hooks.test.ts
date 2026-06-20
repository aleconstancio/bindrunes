import { describe, expect, it, vi } from "vitest";
import { combineHooks, createAuthGuard, createCsrfGuard, createLocaleRedirect } from "./hooks";

function mockEvent(pathname = "/", session: any = null) {
	return {
		url: new URL(`http://localhost${pathname}`),
		locals: { session },
		request: { method: "GET", headers: new Headers() },
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
