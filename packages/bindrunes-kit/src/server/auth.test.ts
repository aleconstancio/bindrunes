import { describe, expect, it, vi } from "vitest";
import type { SessionData } from "./auth";
import { createServerAuth } from "./auth";

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
