import { describe, expect, it, vi } from "vitest";
import type { SessionData } from "./auth";
import {
	clearSessionCookie,
	createOAuthHandler,
	createServerAuth,
	refreshToken,
	setSessionCookie,
	validateSession,
} from "./auth";

function mockEvent(cookieValue?: string) {
	return {
		cookies: {
			get: vi.fn(() => cookieValue),
			set: vi.fn(),
			delete: vi.fn(),
		},
		locals: {} as Record<string, unknown>,
	} as any;
}

const sampleSession: SessionData = {
	user: { id: "u1", email: "test@example.com" },
	expiresAt: Date.now() + 1000 * 60 * 60,
};

describe("createServerAuth", () => {
	describe("getSession", () => {
		it("returns null when no cookie", async () => {
			const auth = createServerAuth({ validate: async () => null });
			const event = mockEvent(undefined);
			expect(await auth.getSession(event)).toBeNull();
		});

		it("calls validate with cookie value", async () => {
			const validate = vi.fn().mockResolvedValue(sampleSession);
			const auth = createServerAuth({ validate });
			const event = mockEvent("tok_abc123");
			const result = await auth.getSession(event);
			expect(validate).toHaveBeenCalledWith("tok_abc123");
			expect(result).toEqual(sampleSession);
		});

		it("returns null when validate returns null", async () => {
			const auth = createServerAuth({ validate: async () => null });
			const event = mockEvent("bad_token");
			expect(await auth.getSession(event)).toBeNull();
		});

		it("returns null when validate throws", async () => {
			const auth = createServerAuth({
				validate: async () => {
					throw new Error("bad");
				},
			});
			const event = mockEvent("tok");
			expect(await auth.getSession(event)).toBeNull();
		});

		it("uses custom cookieName", async () => {
			const validate = vi.fn().mockResolvedValue(sampleSession);
			const auth = createServerAuth({
				cookieName: "my_session",
				validate,
			});
			const event = mockEvent("tok");
			await auth.getSession(event);
			expect(validate).toHaveBeenCalledWith("tok");
		});
	});

	describe("setSession", () => {
		it("sets JSON-serialized session in cookie", () => {
			const auth = createServerAuth({ validate: async () => null });
			const event = mockEvent(undefined);
			auth.setSession(event, sampleSession);

			const setCall = event.cookies.set as any;
			expect(setCall).toBeDefined();
		});

		it("uses default cookie name", () => {
			const auth = createServerAuth({ validate: async () => null });
			const event = mockEvent(undefined);
			auth.setSession(event, sampleSession);
			expect(event.cookies.set).toHaveBeenCalledWith(
				"bindrunes-session",
				JSON.stringify(sampleSession),
				expect.objectContaining({ path: "/", httpOnly: true, secure: true }),
			);
		});

		it("uses custom cookie name", () => {
			const auth = createServerAuth({
				cookieName: "custom",
				validate: async () => null,
			});
			const event = mockEvent(undefined);
			auth.setSession(event, sampleSession);
			expect(event.cookies.set).toHaveBeenCalledWith(
				"custom",
				JSON.stringify(sampleSession),
				expect.anything(),
			);
		});

		it("respects custom maxAge", () => {
			const auth = createServerAuth({
				maxAge: 3600,
				validate: async () => null,
			});
			const event = mockEvent(undefined);
			auth.setSession(event, sampleSession);
			expect(event.cookies.set).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				expect.objectContaining({ maxAge: 3600 }),
			);
		});
	});

	describe("deleteSession", () => {
		it("deletes cookie with maxAge 0", () => {
			const auth = createServerAuth({ validate: async () => null });
			const event = mockEvent(undefined);
			auth.deleteSession(event);
			expect(event.cookies.delete).toHaveBeenCalledWith(
				"bindrunes-session",
				expect.objectContaining({ path: "/", maxAge: 0 }),
			);
		});
	});

	describe("handle", () => {
		it("attaches session to event.locals", async () => {
			const auth = createServerAuth({
				validate: vi.fn().mockResolvedValue(sampleSession),
			});
			const event = mockEvent("tok");
			const resolve = vi.fn().mockResolvedValue(new Response("ok"));
			await auth.handle({ event, resolve } as any);
			expect(event.locals.session).toEqual(sampleSession);
		});

		it("attaches null when no cookie", async () => {
			const auth = createServerAuth({ validate: async () => null });
			const event = mockEvent(undefined);
			const resolve = vi.fn().mockResolvedValue(new Response("ok"));
			await auth.handle({ event, resolve } as any);
			expect(event.locals.session).toBeNull();
		});

		it("calls resolve with event", async () => {
			const auth = createServerAuth({ validate: async () => null });
			const event = mockEvent(undefined);
			const resolve = vi.fn().mockResolvedValue(new Response("ok"));
			await auth.handle({ event, resolve } as any);
			expect(resolve).toHaveBeenCalledWith(event);
		});
	});
});

describe("validateSession", () => {
	it("calls the validate function with the token", async () => {
		const validate = vi.fn().mockResolvedValue(sampleSession);
		const result = await validateSession("my-token", validate);
		expect(validate).toHaveBeenCalledWith("my-token");
		expect(result).toEqual(sampleSession);
	});

	it("returns null when validate returns null", async () => {
		const result = await validateSession("bad", async () => null);
		expect(result).toBeNull();
	});
});

describe("refreshToken", () => {
	it("calls refreshFn and returns the result", async () => {
		const refreshFn = vi.fn().mockResolvedValue({ token: "new", session: sampleSession });
		const result = await refreshToken("old-token", refreshFn);
		expect(refreshFn).toHaveBeenCalledWith("old-token");
		expect(result).toEqual({ token: "new", session: sampleSession });
	});

	it("returns null when refreshFn returns null", async () => {
		const result = await refreshToken("old", async () => null);
		expect(result).toBeNull();
	});

	it("returns null when refreshFn throws", async () => {
		const result = await refreshToken("tok", async () => {
			throw new Error("fail");
		});
		expect(result).toBeNull();
	});
});

describe("setSessionCookie", () => {
	it("sets cookie with default options", () => {
		const event = mockEvent();
		setSessionCookie(event, sampleSession);
		expect(event.cookies.set).toHaveBeenCalledWith(
			"bindrunes-session",
			JSON.stringify(sampleSession),
			expect.objectContaining({ path: "/", httpOnly: true, secure: true, sameSite: "lax" }),
		);
	});

	it("uses custom cookieName and maxAge", () => {
		const event = mockEvent();
		setSessionCookie(event, sampleSession, { cookieName: "custom", maxAge: 3600 });
		expect(event.cookies.set).toHaveBeenCalledWith(
			"custom",
			JSON.stringify(sampleSession),
			expect.objectContaining({ maxAge: 3600 }),
		);
	});
});

describe("clearSessionCookie", () => {
	it("deletes the default cookie", () => {
		const event = mockEvent();
		clearSessionCookie(event);
		expect(event.cookies.delete).toHaveBeenCalledWith(
			"bindrunes-session",
			expect.objectContaining({ path: "/", maxAge: 0 }),
		);
	});

	it("deletes a custom cookie", () => {
		const event = mockEvent();
		clearSessionCookie(event, "other-session");
		expect(event.cookies.delete).toHaveBeenCalledWith(
			"other-session",
			expect.objectContaining({ path: "/", maxAge: 0 }),
		);
	});
});

describe("createOAuthHandler", () => {
	it("returns provider and callbackUrl", () => {
		const handler = createOAuthHandler("github", { authorize: async () => null });
		expect(handler.provider).toBe("github");
		expect(handler.callbackUrl).toBe("/auth/callback");
	});

	it("uses custom callbackUrl", () => {
		const handler = createOAuthHandler("google", {
			authorize: async () => null,
			callbackUrl: "/my/callback",
		});
		expect(handler.callbackUrl).toBe("/my/callback");
	});

	it("handleCallback calls authorize and returns result", async () => {
		const authorize = vi.fn().mockResolvedValue({
			token: "tok",
			profile: { id: "1", email: "a@b.com", provider: "github" },
		});
		const handler = createOAuthHandler("github", { authorize });
		const result = await handler.handleCallback("code123");
		expect(authorize).toHaveBeenCalledWith("code123");
		expect(result?.token).toBe("tok");
	});

	it("handleCallback returns null when authorize throws", async () => {
		const handler = createOAuthHandler("github", {
			authorize: async () => {
				throw new Error("oauth error");
			},
		});
		const result = await handler.handleCallback("bad");
		expect(result).toBeNull();
	});

	it("handleCallback returns null when authorize returns null", async () => {
		const handler = createOAuthHandler("discord", { authorize: async () => null });
		const result = await handler.handleCallback("code");
		expect(result).toBeNull();
	});

	it("getAuthorizationUrl returns URL with provider and redirect_uri", () => {
		const handler = createOAuthHandler("microsoft", { authorize: async () => null });
		const url = handler.getAuthorizationUrl();
		expect(url).toContain("provider=microsoft");
		expect(url).toContain("redirect_uri=%2Fauth%2Fcallback");
	});

	it("getAuthorizationUrl includes state when provided", () => {
		const handler = createOAuthHandler("github", { authorize: async () => null });
		const url = handler.getAuthorizationUrl("my-state");
		expect(url).toContain("state=my-state");
	});

	it("getAuthorizationUrl omits state when not provided", () => {
		const handler = createOAuthHandler("github", { authorize: async () => null });
		const url = handler.getAuthorizationUrl();
		expect(url).not.toContain("state=");
	});
});
